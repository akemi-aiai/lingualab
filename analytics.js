const Analytics = {
  STORAGE_KEY: 'll_research_data',
  ARCHIVE_KEY: 'll_research_weekly_archive',
  DB_VERSION: 5,
  RESEARCH_TIMEZONE: 'Asia/Shanghai',
  TIMER_STEP_SECONDS: 10,

  init() {
    this.ensureDataset();
    this.ensureCurrentWeek();

    this.lastActivityAt = Date.now();
    this.sessionOpen = false;

    this.bindActivityListeners();
    this.markSessionStart();
    this.startTimer();
  },

  bindActivityListeners() {
    const markActive = () => {
      this.lastActivityAt = Date.now();
    };

    ['click', 'touchstart', 'keydown', 'mousemove', 'scroll'].forEach((eventName) => {
      window.addEventListener(eventName, markActive, { passive: true });
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.sessionOpen = false;
      } else {
        this.lastActivityAt = Date.now();
        this.markSessionStart();
      }
    });
  },

  getResearchDateKey(date = new Date()) {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: this.RESEARCH_TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  },

  getResearchWeekdayIndex(date = new Date()) {
    const weekday = new Intl.DateTimeFormat('en-US', {
      timeZone: this.RESEARCH_TIMEZONE,
      weekday: 'short'
    }).format(date);

    return {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6
    }[weekday] ?? 0;
  },

  parseDateKey(dateKey) {
    const [y, m, d] = String(dateKey).split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  },

  addDays(dateKey, days) {
    const ms = this.parseDateKey(dateKey) + days * 86400000;
    return new Date(ms).toISOString().slice(0, 10);
  },

  getResearchWeekStart(date = new Date()) {
    const key = this.getResearchDateKey(date);
    const weekday = this.getResearchWeekdayIndex(date);
    const diffToMonday = weekday === 0 ? -6 : 1 - weekday;
    return this.addDays(key, diffToMonday);
  },

  getResearchWeekTuesday(date = new Date()) {
    return this.addDays(this.getResearchWeekStart(date), 1);
  },

  normalizeStringArray(value) {
    if (!Array.isArray(value)) return [];
    return [...new Set(value.map((item) => String(item)))];
  },

  safeNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
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

  resetWeeklyData(existingId) {
    const oldData = this.getData();
    const studentId = existingId || oldData?.studentId || this.generateStudentId();

    const fresh = {
      dbVersion: this.DB_VERSION,
      studentId,
      timezone: this.RESEARCH_TIMEZONE,
      weekStart: this.getResearchWeekStart(),
      reportAnchorTuesday: this.getResearchWeekTuesday(),
      totalXPAtStart: this.getTotalXP(),
      dailyActivity: {},
      interactionHeatmap: {},
      grammar: {
        bySentence: {},
        byTopic: {}
      }
    };

    this.saveData(fresh);
  },

  migrateLegacyData(data) {
    const upgraded = data || {};

    upgraded.dbVersion = this.DB_VERSION;
    upgraded.studentId = upgraded.studentId || this.generateStudentId();
    upgraded.timezone = upgraded.timezone || this.RESEARCH_TIMEZONE;
    upgraded.weekStart = upgraded.weekStart || this.getResearchWeekStart();
    upgraded.reportAnchorTuesday = upgraded.reportAnchorTuesday || this.addDays(upgraded.weekStart, 1);
    upgraded.totalXPAtStart = this.safeNumber(upgraded.totalXPAtStart);
    upgraded.dailyActivity = upgraded.dailyActivity || {};
    upgraded.interactionHeatmap = upgraded.interactionHeatmap || upgraded.wordDifficulty || {};
    upgraded.grammar = upgraded.grammar || { bySentence: {}, byTopic: {} };

    Object.entries(upgraded.dailyActivity).forEach(([dateKey, day]) => {
      upgraded.dailyActivity[dateKey] = {
        time: this.safeNumber(day?.time),
        clicks: this.safeNumber(day?.clicks),
        words: this.normalizeStringArray(day?.words),
        reviewedWords: this.normalizeStringArray(day?.reviewedWords || day?.words),
        wordsExposed: this.normalizeStringArray(day?.wordsExposed || day?.words),
        categoriesVisited: this.normalizeStringArray(day?.categoriesVisited),
        sessionsCount: this.safeNumber(day?.sessionsCount),
        grammar: {
          attempts: this.safeNumber(day?.grammar?.attempts),
          incorrect: this.safeNumber(day?.grammar?.incorrect),
          correct: this.safeNumber(day?.grammar?.correct)
        }
      };
    });

    delete upgraded.wordDifficulty;
    return upgraded;
  },

  ensureDataset() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      this.resetWeeklyData();
      return;
    }

    const data = this.getData();
    if (!data) {
      this.resetWeeklyData();
      return;
    }

    if (!data.dbVersion || data.dbVersion < this.DB_VERSION || data.wordDifficulty) {
      this.saveData(this.migrateLegacyData(data));
    }
  },

  ensureCurrentWeek() {
    const data = this.getData();
    if (!data) {
      this.resetWeeklyData();
      return;
    }

    const currentWeekStart = this.getResearchWeekStart();
    if (data.weekStart !== currentWeekStart) {
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
          words: [],
          reviewedWords: [],
          wordsExposed: [],
          categoriesVisited: [],
          sessionsCount: 0,
          grammar: {
            attempts: 0,
            incorrect: 0,
            correct: 0
          }
        };
      }
    
      this.saveData(data);
      return { data, today };
    },

  markSessionStart() {
    if (document.hidden || this.sessionOpen) return;

    const { data, today } = this.ensureTodayRecord();
    data.dailyActivity[today].sessionsCount += 1;
    this.saveData(data);
    this.sessionOpen = true;
  },

  startTimer() {
    setInterval(() => {
      if (document.hidden) return;

      const { data, today } = this.ensureTodayRecord();
      data.dailyActivity[today].time += this.TIMER_STEP_SECONDS;
      this.saveData(data);
    }, this.TIMER_STEP_SECONDS * 1000);
  },

  logWordReview(wordId, source = 'flip') {
    if (!wordId) return;
  
    const normalizedWordId = String(wordId);
    const { data, today } = this.ensureTodayRecord();
    const day = data.dailyActivity[today];
  
    data.interactionHeatmap[normalizedWordId] =
      this.safeNumber(data.interactionHeatmap[normalizedWordId]) + 1;
  
    day.clicks += 1;
  
    if (!day.reviewedWords.includes(normalizedWordId)) {
      day.reviewedWords.push(normalizedWordId);
    }

    this.saveData(data);
    return { wordId: normalizedWordId, source };
  },

  logWordClick(wordId) {
    return this.logWordReview(wordId, 'click');
  },

  logWordAudio(wordId) {
    return this.logWordReview(wordId, 'audio');
  },

  logWordsExposed(words = [], category = '') {
  const { data, today } = this.ensureTodayRecord();
  const day = data.dailyActivity[today];

  if (!day.wordsExposed) day.wordsExposed = [];
  if (!day.categoriesVisited) day.categoriesVisited = [];

  words.forEach(word => {
    const id = String(word.id || word.w || word.en || word);
    if (id && id !== 'undefined' && !day.wordsExposed.includes(id)) {
      day.wordsExposed.push(id);
    }
  });

  if (category && !day.categoriesVisited.includes(category)) {
    day.categoriesVisited.push(category);
  }

  this.saveData(data);
},

  logGrammarAttempt({
      topic,
      sentenceId,
      prompt,
      selected,
      correctAnswer,
      isCorrect,
      attemptNo = 1,
      isFirstAttempt = attemptNo === 1
    }) {
    const dataTopic = String(topic || 'general');
    const dataPrompt = String(prompt || '');
    const key = String(sentenceId || `${dataTopic}::${dataPrompt}`);
    const correct = Boolean(isCorrect);

    const { data, today } = this.ensureTodayRecord();
    const day = data.dailyActivity[today];

    if (!data.grammar.bySentence[key]) {
      data.grammar.bySentence[key] = {
        topic: dataTopic,
        prompt: dataPrompt,
        correctAnswer: String(correctAnswer || ''),
        attempts: 0,
        incorrect: 0,
        correct: 0,
        lastSelected: ''
      };
    }

    if (!data.grammar.byTopic[dataTopic]) {
      data.grammar.byTopic[dataTopic] = {
        attempts: 0,
        incorrect: 0,
        firstAttemptTotal: 0,
        firstAttemptCorrect: 0,
        correct: 0
      };
    }
    if (isFirstAttempt) {
      data.grammar.bySentence[key].firstAttemptTotal += 1;
      data.grammar.byTopic[dataTopic].firstAttemptTotal += 1;
    
      if (correct) {
        data.grammar.bySentence[key].firstAttemptCorrect += 1;
        data.grammar.byTopic[dataTopic].firstAttemptCorrect += 1;
      }
    }

    data.grammar.bySentence[key].attempts += 1;
    data.grammar.bySentence[key].lastSelected = String(selected || '');
    data.grammar.byTopic[dataTopic].attempts += 1;
    day.grammar.attempts += 1;

    if (correct) {
      data.grammar.bySentence[key].correct += 1;
      data.grammar.byTopic[dataTopic].correct += 1;
      day.grammar.correct += 1;
    } else {
      data.grammar.bySentence[key].incorrect += 1;
      data.grammar.byTopic[dataTopic].incorrect += 1;
      day.grammar.incorrect += 1;
    }

    this.saveData(data);
  },

  getWeeklyLog() {
    this.ensureCurrentWeek();
    const data = this.getData();
    const result = {};

    Object.entries(data.dailyActivity || {}).forEach(([dateKey, day]) => {
      const offset = Math.floor((this.parseDateKey(dateKey) - this.parseDateKey(data.weekStart)) / 86400000);

      if (offset >= 0 && offset < 7) {
        result[dateKey] = {
          time: this.safeNumber(day?.time),
          clicks: this.safeNumber(day?.clicks),
          words: this.normalizeStringArray(day?.words),
          reviewedWords: this.normalizeStringArray(day?.reviewedWords || day?.words),
          wordsExposed: this.normalizeStringArray(day?.wordsExposed || day?.words),
          categoriesVisited: this.normalizeStringArray(day?.categoriesVisited),
          sessionsCount: this.safeNumber(day?.sessionsCount),
          grammar: {
            attempts: this.safeNumber(day?.grammar?.attempts),
            incorrect: this.safeNumber(day?.grammar?.incorrect),
            correct: this.safeNumber(day?.grammar?.correct)
          }
        };
      }
    });

    return result;
  },

  getWeeklyGrammarSummary() {
    const data = this.getData();
    const bySentence = {};
    const byTopic = {};

    Object.entries(data.grammar?.bySentence || {}).forEach(([key, item]) => {
      const attempts = this.safeNumber(item?.attempts);
      const correct = this.safeNumber(item?.correct);
      const incorrect = this.safeNumber(item?.incorrect);

      bySentence[key] = {
        topic: String(item?.topic || 'general'),
        prompt: String(item?.prompt || ''),
        correctAnswer: String(item?.correctAnswer || ''),
        attempts,
        incorrect,
        correct,
        firstAttemptTotal: 0,
        firstAttemptCorrect: 0,
        lastSelected: String(item?.lastSelected || ''),
        successRate: attempts ? Math.round((correct / attempts) * 100) : 0
      };
    });

    Object.entries(data.grammar?.byTopic || {}).forEach(([topic, item]) => {
      const attempts = this.safeNumber(item?.attempts);
      const correct = this.safeNumber(item?.correct);
      const incorrect = this.safeNumber(item?.incorrect);

      byTopic[String(topic)] = {
        attempts,
        incorrect,
        correct,
        successRate: attempts ? Math.round((correct / attempts) * 100) : 0
      };
    });

    return { bySentence, byTopic };
  },

  getWeeklySummary(parentRate = 0) {
    this.ensureCurrentWeek();

    const data = this.getData();
    const weeklyLog = this.getWeeklyLog();
    const grammar = this.getWeeklyGrammarSummary();

    let totalSeconds = 0;
    let activeDays = 0;
    let sessionsCount = 0;

    const exposedWords = new Set();
    const reviewedWords = new Set();

    Object.values(weeklyLog).forEach((day) => {
      const seconds = this.safeNumber(day?.time);
      const clicks = this.safeNumber(day?.clicks);
      const words = Array.isArray(day?.wordsExposed)
      ? day.wordsExposed
      : (Array.isArray(day?.words) ? day.words : []);
      const reviewed = Array.isArray(day?.reviewedWords) ? day.reviewedWords : [];

      totalSeconds += seconds;
      sessionsCount += this.safeNumber(day?.sessionsCount);

      if (seconds > 0 || clicks > 0 || words.length > 0) {
        activeDays += 1;
      }

      words.forEach((word) => exposedWords.add(String(word)));
      reviewed.forEach((word) => reviewedWords.add(String(word)));
    });

    const now = new Date();
    const activeMinutes = Math.floor(totalSeconds / 60);
    const masteredWords = reviewedWords.size;
    const gainedXP = Math.max(0, this.getTotalXP() - this.safeNumber(data.totalXPAtStart));

    return {
      id: data.studentId,
      studentId: data.studentId,
      dbVersion: data.dbVersion || this.DB_VERSION,
      weekStart: data.weekStart,
      reportAnchorTuesday: data.reportAnchorTuesday || this.addDays(data.weekStart, 1),
      timezone: data.timezone || this.RESEARCH_TIMEZONE,

      reportDate: this.getResearchDateKey(now),
      generatedAtRaw: String(now),
      generatedAtUTC: now.toISOString(),
      localDateKey: this.getResearchDateKey(now),

      activeDays,
      sessionsCount,
      avgSessionLengthMinutes: sessionsCount ? Math.round((activeMinutes / sessionsCount) * 10) / 10 : 0,
      activeTimeMinutes: activeMinutes,

      newXP: gainedXP,
      newW: exposedWords.size,
      reviewedWords: reviewedWords.size,
      masteredWords,
      pointsPerActiveMinute: activeMinutes ? Math.round((gainedXP / activeMinutes) * 100) / 100 : 0,
      learningEfficiencyIndex: activeMinutes ? Math.round((masteredWords / activeMinutes) * 100) / 100 : 0,

      rate: this.safeNumber(parentRate),
      star: activeDays >= 5,

      interactionHeatmap: data.interactionHeatmap || {},
      diff: data.interactionHeatmap || {},
      grammar,
      log: weeklyLog
    };
  },

  encodeWeeklyReport(parentRate = 0) {
    const report = this.getWeeklySummary(parentRate);
    const json = JSON.stringify(report);
    const bytes = new TextEncoder().encode(json);

    let binary = '';
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });

    return 'LL-REPORT:' + btoa(binary);
  }
};
window.Analytics = Analytics;
Analytics.init();
