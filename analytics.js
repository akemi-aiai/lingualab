const Analytics = {
    init() {
        if (!localStorage.getItem('ll_research_data')) {
            const studentId = 'STU-' + Math.random().toString(36).substr(2, 5).toUpperCase();
            this.resetWeeklyData(studentId);
        }
        this.startTimer();
    },

    resetWeeklyData(existingId) {
        const id = existingId || JSON.parse(localStorage.getItem('ll_research_data')).studentId;
        localStorage.setItem('ll_research_data', JSON.stringify({
            studentId: id,
            startDate: new Date().toISOString(),
            dailyActivity: {}, 
            wordDifficulty: {}, 
            totalWordsAtStart: parseInt(localStorage.getItem('learned_words_total')) || 0,
            totalXPAtStart: (parseInt(localStorage.getItem('ll_score')) || 0) + (parseInt(localStorage.getItem('vocab_points')) || 0)
        }));
    },

    getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    },

    logWordClick(wordId) {
        let data = JSON.parse(localStorage.getItem('ll_research_data'));
        let today = this.getCurrentDate();
        
        // Запись сложности слова
        data.wordDifficulty[wordId] = (data.wordDifficulty[wordId] || 0) + 1;
        
        // Запись активности
        if (!data.dailyActivity[today]) data.dailyActivity[today] = { time: 0, clicks: 0 };
        data.dailyActivity[today].clicks++;
        
        localStorage.setItem('ll_research_data', JSON.stringify(data));
    },

    startTimer() {
        setInterval(() => {
            let data = JSON.parse(localStorage.getItem('ll_research_data'));
            let today = this.getCurrentDate();
            if (!data.dailyActivity[today]) data.dailyActivity[today] = { time: 0, clicks: 0 };
            data.dailyActivity[today].time += 10; 
            localStorage.setItem('ll_research_data', JSON.stringify(data));
        }, 10000);
    }
};
Analytics.init();
