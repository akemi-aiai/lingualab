const Analytics = {
    STORAGE_KEY: 'll_research_data',
    RESEARCH_TIMEZONE: 'Asia/Shanghai',

    init() {
        this.ensureDataset();
        this.ensureCurrentWeek();
        this.startTimer();
    },

    ensureDataset() {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (!raw) {
            const studentId = this.generateStudentId();
            this.resetWeeklyData(studentId);
        }
    },

    generateStudentId() {
        return 'STU-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    },

    getData() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
        } catch (e) {
            return null;
        }
    },

    saveData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    getTotalXP() {
        return (parseInt(localStorage.getItem('ll_score'), 10) || 0) +
               (parseInt(localStorage.getItem('vocab_points'), 10) || 0);
    },

    getResearchDateKey(date = new Date()) {
        return new Intl.DateTimeFormat('en-CA', {
            timeZone: this.RESEARCH_TIMEZONE,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    },

    parseDateKey(dateKey) {
        const [y, m, d] = String(dateKey).split('-').map(Number);
        return Date.UTC(y, m - 1, d);
    },

    daysBetween(startKey, endKey) {
        const diff = this.parseDateKey(endKey) - this.parseDateKey(startKey);
        return Math.floor(diff / 86400000);
    },

    resetWeeklyData(existingId) {
        const oldData = this.getData();
        const studentId = existingId || oldData?.studentId || this.generateStudentId();

        const fresh = {
            studentId,
            timezone: this.RESEARCH_TIMEZONE,
            weekStart: this.getResearchDateKey(),
            dailyActivity: {},
            wordDifficulty: {},
            totalXPAtStart: this.getTotalXP()
        };

        this.saveData(fresh);
    },

    ensureCurrentWeek() {
        let data = this.getData();
        if (!data) {
            this.resetWeeklyData();
            return;
        }

        if (!data.weekStart) {
            data.weekStart = this.getResearchDateKey();
            data.timezone = data.timezone || this.RESEARCH_TIMEZONE;
            data.dailyActivity = data.dailyActivity || {};
            data.wordDifficulty = data.wordDifficulty || {};
            data.totalXPAtStart = Number(data.totalXPAtStart || 0);
            this.saveData(data);
            return;
        }

        const today = this.getResearchDateKey();
        const ageInDays = this.daysBetween(data.weekStart, today);

        if (ageInDays >= 7) {
            this.resetWeeklyData(data.studentId);
        }
    },

    ensureTodayRecord() {
        this.ensureCurrentWeek();
        const data = this.getData();
        const today = this.getResearchDateKey();

        if (!data.dailyActivity[today]) {
            data.dailyActivity[today] = {
                time: 0,
                clicks: 0,
                words: []
            };
            this.saveData(data);
        }

        return { data, today };
    },

    logWordClick(wordId) {
        if (!wordId) return;

        const { data, today } = this.ensureTodayRecord();

        data.wordDifficulty[wordId] = (data.wordDifficulty[wordId] || 0) + 1;
        data.dailyActivity[today].clicks += 1;

        if (!data.dailyActivity[today].words.includes(wordId)) {
            data.dailyActivity[today].words.push(wordId);
        }

        this.saveData(data);
    },

    startTimer() {
        setInterval(() => {
            const { data, today } = this.ensureTodayRecord();
            data.dailyActivity[today].time += 10;
            this.saveData(data);
        }, 10000);
    },

    getWeeklyLog() {
        this.ensureCurrentWeek();
        const data = this.getData();
        const result = {};

        Object.entries(data.dailyActivity || {}).forEach(([dateKey, day]) => {
            const offset = this.daysBetween(data.weekStart, dateKey);
            if (offset >= 0 && offset < 7) {
                result[dateKey] = {
                    time: Number(day.time || 0),
                    clicks: Number(day.clicks || 0),
                    words: Array.isArray(day.words) ? [...new Set(day.words)] : []
                };
            }
        });

        return result;
    },

    getWeeklySummary(parentRate = 0) {
        const data = this.getData();
        const weeklyLog = this.getWeeklyLog();

        let totalSeconds = 0;
        let activeDays = 0;
        const uniqueWords = new Set();

        Object.values(weeklyLog).forEach(day => {
            const seconds = Number(day.time || 0);
            const clicks = Number(day.clicks || 0);
            const words = Array.isArray(day.words) ? day.words : [];

            totalSeconds += seconds;

            if (seconds > 0 || clicks > 0 || words.length > 0) {
                activeDays += 1;
            }

            words.forEach(word => uniqueWords.add(word));
        });

        return {
            id: data.studentId,
            weekStart: data.weekStart,
            timezone: data.timezone,
            activeDays,
            newXP: Math.max(0, this.getTotalXP() - Number(data.totalXPAtStart || 0)),
            newW: uniqueWords.size,
            star: activeDays >= 5,
            rate: Number(parentRate || 0),
            diff: data.wordDifficulty || {},
            log: weeklyLog
        };
    },

    encodeWeeklyReport(parentRate = 0) {
        const report = this.getWeeklySummary(parentRate);
        const json = JSON.stringify(report);

        const bytes = new TextEncoder().encode(json);
        let binary = '';
        bytes.forEach(b => binary += String.fromCharCode(b));

        return 'LL-REPORT:' + btoa(binary);
    }
};

Analytics.init();
