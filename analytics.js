(() => {
  if (
    window.Analytics &&
    window.Analytics.DB_VERSION >= 7
  ) {
    return;
  }

  const Analytics = {
    STORAGE_KEY: 'll_research_data',
    DB_VERSION: 7,
    RESEARCH_TIMEZONE: 'Asia/Shanghai',
    TIMER_STEP_SECONDS: 10,
    SESSION_TIMEOUT_SECONDS: 30 * 60,
    SESSION_STORAGE_KEY: 'll_research_session_v1',

    init() {
      if (this._initialized) return;
      this._initialized = true;

      this.options = {
        trackTime: true,
        countSession: true,
        ...(window.LL_ANALYTICS_OPTIONS || {})
      };

      this.ensureDataset();
      this.ensureCurrentWeek();

      if (
        this.options.trackTime ||
        this.options.countSession
      ) {
        this.bindActivityListeners();
      }

      if (this.options.countSession) {
        this.markSessionStart();
      }

      if (this.options.trackTime) {
        this.startTimer();
      }
    },

    bindActivityListeners() {
      let lastTouchAt = 0;

      const touchSession = () => {
        const now = Date.now();

        if (now - lastTouchAt < 5000) return;

        lastTouchAt = now;
        this.touchSessionState();
      };

      [
        'click',
        'touchstart',
        'keydown',
        'mousemove',
        'scroll'
      ].forEach(eventName => {
        window.addEventListener(
          eventName,
          touchSession,
          { passive: true }
        );
      });

      document.addEventListener(
        'visibilitychange',
        () => {
          if (document.hidden) {
            if (
              this.options.trackTime ||
              this.options.countSession
            ) {
              this.touchSessionState();
            }

            return;
          }

          if (this.options.countSession) {
            this.markSessionStart();
          }
        }
      );
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
      const weekday = new Intl.DateTimeFormat(
        'en-US',
        {
          timeZone: this.RESEARCH_TIMEZONE,
          weekday: 'short'
        }
      ).format(date);

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
      const [year, month, day] = String(dateKey)
        .split('-')
        .map(Number);

      return Date.UTC(year, month - 1, day);
    },

    addDays(dateKey, days) {
      const milliseconds =
        this.parseDateKey(dateKey) +
        days * 86400000;

      return new Date(milliseconds)
        .toISOString()
        .slice(0, 10);
    },

    getResearchWeekStart(date = new Date()) {
      const dateKey =
        this.getResearchDateKey(date);

      const weekday =
        this.getResearchWeekdayIndex(date);

      const differenceToMonday =
        weekday === 0 ? -6 : 1 - weekday;

      return this.addDays(
        dateKey,
        differenceToMonday
      );
    },

    getResearchWeekTuesday(date = new Date()) {
      return this.addDays(
        this.getResearchWeekStart(date),
        1
      );
    },

    normalizeStringArray(value) {
      if (!Array.isArray(value)) return [];

      return [
        ...new Set(
          value
            .filter(item =>
              item !== null &&
              item !== undefined
            )
            .map(item =>
              String(item).trim()
            )
            .filter(Boolean)
        )
      ];
    },

    safeNumber(value) {
      const number = Number(value);

      return Number.isFinite(number)
        ? number
        : 0;
    },

    generateStudentId() {
      return (
        'STU-' +
        Math.random()
          .toString(36)
          .slice(2, 7)
          .toUpperCase()
      );
    },

    getData() {
      try {
        const raw = localStorage.getItem(
          this.STORAGE_KEY
        );

        return raw
          ? JSON.parse(raw)
          : null;
      } catch (error) {
        console.error(
          'LinguaLab analytics: cannot read data.',
          error
        );

        return null;
      }
    },

    saveData(data) {
      try {
        localStorage.setItem(
          this.STORAGE_KEY,
          JSON.stringify(data)
        );

        return true;
      } catch (error) {
        console.error(
          'LinguaLab analytics: cannot save data.',
          error
        );

        return false;
      }
    },

    getScoreBreakdown() {
      let grammarPoints = 0;
      let vocabularyPoints = 0;

      try {
        grammarPoints =
          parseInt(
            localStorage.getItem('ll_score'),
            10
          ) || 0;

        vocabularyPoints =
          parseInt(
            localStorage.getItem(
              'vocab_points'
            ),
            10
          ) || 0;
      } catch (error) {
        console.error(
          'LinguaLab analytics: cannot read scores.',
          error
        );
      }

      const safeGrammarPoints =
        Math.max(0, grammarPoints);

      const safeVocabularyPoints =
        Math.max(0, vocabularyPoints);

      return {
        grammarPoints:
          safeGrammarPoints,

        vocabularyPoints:
          safeVocabularyPoints,

        totalXP:
          safeGrammarPoints +
          safeVocabularyPoints
      };
    },

    getTotalXP() {
      return this
        .getScoreBreakdown()
        .totalXP;
    },

    createEmptyDayRecord() {
      return {
        time: 0,
        clicks: 0,
        cardOpens: 0,
        audioPlays: 0,

        words: [],
        reviewedWords: [],
        wordsExposed: [],
        categoriesVisited: [],

        sessionsCount: 0,

        grammar: {
          attempts: 0,
          incorrect: 0,
          correct: 0,
          firstAttemptTotal: 0,
          firstAttemptCorrect: 0
        }
      };
    },

    createFreshWeeklyData(studentId) {
      const scores =
        this.getScoreBreakdown();

      return {
        dbVersion:
          this.DB_VERSION,

        studentId:
          studentId ||
          this.generateStudentId(),

        timezone:
          this.RESEARCH_TIMEZONE,

        weekStart:
          this.getResearchWeekStart(),

        reportAnchorTuesday:
          this.getResearchWeekTuesday(),

        /*
          Баллы на начало недели.

          Накопительные баллы не сбрасываются.
          Эти значения используются только
          для подсчёта недельного прироста.
        */
        totalXPAtStart:
          scores.totalXP,

        grammarPointsAtStart:
          scores.grammarPoints,

        vocabularyPointsAtStart:
          scores.vocabularyPoints,

        dailyActivity: {},
        interactionHeatmap: {},
        audioHeatmap: {},

        grammar: {
          bySentence: {},
          byTopic: {}
        }
      };
    },

    resetWeeklyData(existingId) {
      const oldData =
        this.getData();

      const studentId =
        existingId ||
        oldData?.studentId ||
        this.generateStudentId();

      this.saveData(
        this.createFreshWeeklyData(
          studentId
        )
      );
    },

    normalizeGrammarSentence(item = {}) {
      return {
        topic:
          String(
            item.topic ||
            'general'
          ),

        prompt:
          String(
            item.prompt ||
            ''
          ),

        correctAnswer:
          String(
            item.correctAnswer ||
            ''
          ),

        attempts:
          this.safeNumber(
            item.attempts
          ),

        incorrect:
          this.safeNumber(
            item.incorrect
          ),

        correct:
          this.safeNumber(
            item.correct
          ),

        firstAttemptTotal:
          this.safeNumber(
            item.firstAttemptTotal
          ),

        firstAttemptCorrect:
          this.safeNumber(
            item.firstAttemptCorrect
          ),

        lastSelected:
          String(
            item.lastSelected ||
            ''
          )
      };
    },

    normalizeGrammarTopic(item = {}) {
      return {
        attempts:
          this.safeNumber(
            item.attempts
          ),

        incorrect:
          this.safeNumber(
            item.incorrect
          ),

        correct:
          this.safeNumber(
            item.correct
          ),

        firstAttemptTotal:
          this.safeNumber(
            item.firstAttemptTotal
          ),

        firstAttemptCorrect:
          this.safeNumber(
            item.firstAttemptCorrect
          )
      };
    },

    migrateLegacyData(data) {
      const upgraded =
        data &&
        typeof data === 'object'
          ? data
          : {};

      const scores =
        this.getScoreBreakdown();

      upgraded.dbVersion =
        this.DB_VERSION;

      upgraded.studentId =
        upgraded.studentId ||
        this.generateStudentId();

      upgraded.timezone =
        upgraded.timezone ||
        this.RESEARCH_TIMEZONE;

      upgraded.weekStart =
        upgraded.weekStart ||
        this.getResearchWeekStart();

      upgraded.reportAnchorTuesday =
        upgraded.reportAnchorTuesday ||
        this.addDays(
          upgraded.weekStart,
          1
        );

      const hasTotalStart =
        Number.isFinite(
          Number(
            upgraded.totalXPAtStart
          )
        );

      const hasGrammarStart =
        Number.isFinite(
          Number(
            upgraded.grammarPointsAtStart
          )
        );

      const hasVocabularyStart =
        Number.isFinite(
          Number(
            upgraded
              .vocabularyPointsAtStart
          )
        );

      if (!hasTotalStart) {
        upgraded.totalXPAtStart =
          scores.totalXP;

        upgraded.grammarPointsAtStart =
          scores.grammarPoints;

        upgraded.vocabularyPointsAtStart =
          scores.vocabularyPoints;
      } else {
        upgraded.totalXPAtStart =
          this.safeNumber(
            upgraded.totalXPAtStart
          );

        upgraded.grammarPointsAtStart =
          hasGrammarStart
            ? this.safeNumber(
                upgraded
                  .grammarPointsAtStart
              )
            : Math.min(
                upgraded.totalXPAtStart,
                scores.grammarPoints
              );

        upgraded.vocabularyPointsAtStart =
          hasVocabularyStart
            ? this.safeNumber(
                upgraded
                  .vocabularyPointsAtStart
              )
            : Math.max(
                0,
                upgraded.totalXPAtStart -
                  upgraded
                    .grammarPointsAtStart
              );
      }

      upgraded.dailyActivity =
        upgraded.dailyActivity &&
        typeof upgraded.dailyActivity ===
          'object' &&
        !Array.isArray(
          upgraded.dailyActivity
        )
          ? upgraded.dailyActivity
          : {};

      const legacyInteractionHeatmap =
        upgraded.interactionHeatmap ||
        upgraded.wordDifficulty;

      upgraded.interactionHeatmap =
        legacyInteractionHeatmap &&
        typeof legacyInteractionHeatmap ===
          'object' &&
        !Array.isArray(
          legacyInteractionHeatmap
        )
          ? legacyInteractionHeatmap
          : {};

      upgraded.audioHeatmap =
        upgraded.audioHeatmap &&
        typeof upgraded.audioHeatmap ===
          'object' &&
        !Array.isArray(
          upgraded.audioHeatmap
        )
          ? upgraded.audioHeatmap
          : {};

      upgraded.grammar =
        upgraded.grammar &&
        typeof upgraded.grammar ===
          'object' &&
        !Array.isArray(
          upgraded.grammar
        )
          ? upgraded.grammar
          : {};

      upgraded.grammar.bySentence =
        upgraded.grammar.bySentence &&
        typeof upgraded.grammar
          .bySentence === 'object' &&
        !Array.isArray(
          upgraded.grammar.bySentence
        )
          ? upgraded.grammar.bySentence
          : {};

      upgraded.grammar.byTopic =
        upgraded.grammar.byTopic &&
        typeof upgraded.grammar
          .byTopic === 'object' &&
        !Array.isArray(
          upgraded.grammar.byTopic
        )
          ? upgraded.grammar.byTopic
          : {};

      Object.entries(
        upgraded.dailyActivity
      ).forEach(([dateKey, day]) => {
        const cardOpens =
          this.safeNumber(
            day?.cardOpens ??
            day?.clicks
          );

        const normalized =
          this.createEmptyDayRecord();

        normalized.time =
          this.safeNumber(
            day?.time ??
            day?.activeTimeSeconds
          );

        normalized.clicks =
          cardOpens;

        normalized.cardOpens =
          cardOpens;

        normalized.audioPlays =
          this.safeNumber(
            day?.audioPlays
          );

        normalized.words =
          this.normalizeStringArray(
            day?.words
          );

        normalized.reviewedWords =
          this.normalizeStringArray(
            day?.reviewedWords ||
            day?.words
          );

        normalized.wordsExposed =
          this.normalizeStringArray(
            day?.wordsExposed ||
            day?.words
          );

        normalized.categoriesVisited =
          this.normalizeStringArray(
            day?.categoriesVisited
          );

        normalized.sessionsCount =
          this.safeNumber(
            day?.sessionsCount
          );

        normalized.grammar = {
          attempts:
            this.safeNumber(
              day?.grammar?.attempts
            ),

          incorrect:
            this.safeNumber(
              day?.grammar?.incorrect
            ),

          correct:
            this.safeNumber(
              day?.grammar?.correct
            ),

          firstAttemptTotal:
            this.safeNumber(
              day?.grammar
                ?.firstAttemptTotal
            ),

          firstAttemptCorrect:
            this.safeNumber(
              day?.grammar
                ?.firstAttemptCorrect
            )
        };

        upgraded.dailyActivity[
          dateKey
        ] = normalized;
      });

      Object.entries(
        upgraded.grammar.bySentence
      ).forEach(([key, item]) => {
        upgraded.grammar.bySentence[
          key
        ] =
          this.normalizeGrammarSentence(
            item
          );
      });

      Object.entries(
        upgraded.grammar.byTopic
      ).forEach(([key, item]) => {
        upgraded.grammar.byTopic[
          key
        ] =
          this.normalizeGrammarTopic(
            item
          );
      });

      delete upgraded.wordDifficulty;

      return upgraded;
    },

    ensureDataset() {
      const data =
        this.getData();

      if (!data) {
        this.resetWeeklyData();
        return;
      }

      const needsMigration =
        !data.dbVersion ||
        data.dbVersion <
          this.DB_VERSION ||
        data.wordDifficulty ||
        !data.dailyActivity ||
        typeof data.dailyActivity !==
          'object' ||
        Array.isArray(
          data.dailyActivity
        ) ||
        !data.interactionHeatmap ||
        typeof data.interactionHeatmap !==
          'object' ||
        Array.isArray(
          data.interactionHeatmap
        ) ||
        !data.audioHeatmap ||
        typeof data.audioHeatmap !==
          'object' ||
        Array.isArray(
          data.audioHeatmap
        ) ||
        !data.grammar ||
        typeof data.grammar !==
          'object' ||
        !data.grammar.bySentence ||
        typeof data.grammar.bySentence !==
          'object' ||
        !data.grammar.byTopic ||
        typeof data.grammar.byTopic !==
          'object' ||
        !Number.isFinite(
          Number(
            data.totalXPAtStart
          )
        ) ||
        !Number.isFinite(
          Number(
            data.grammarPointsAtStart
          )
        ) ||
        !Number.isFinite(
          Number(
            data.vocabularyPointsAtStart
          )
        );

      if (needsMigration) {
        this.saveData(
          this.migrateLegacyData(
            data
          )
        );
      }
    },

    ensureCurrentWeek() {
      const data =
        this.getData();

      if (!data) {
        this.resetWeeklyData();
        return;
      }

      const currentWeekStart =
        this.getResearchWeekStart();

      if (
        data.weekStart !==
        currentWeekStart
      ) {
        /*
          Сбрасывается только недельная
          аналитика: время, карточки,
          слова и грамматика.

          ll_score и vocab_points
          не удаляются.
        */
        this.resetWeeklyData(
          data.studentId
        );

        try {
          sessionStorage.removeItem(
            this.SESSION_STORAGE_KEY
          );
        } catch (error) {
          /*
            sessionStorage может быть
            недоступен в строгом режиме.
          */
        }
      }
    },

    ensureTodayRecord() {
      this.ensureCurrentWeek();

      let data =
        this.getData();

      if (!data) {
        data =
          this.createFreshWeeklyData();

        this.saveData(data);
      }

      if (
        !data.dailyActivity ||
        typeof data.dailyActivity !==
          'object'
      ) {
        data.dailyActivity = {};
      }

      const today =
        this.getResearchDateKey();

      if (!data.dailyActivity[today]) {
        data.dailyActivity[today] =
          this.createEmptyDayRecord();
      } else {
        const existing =
          data.dailyActivity[today];

        const normalized =
          this.createEmptyDayRecord();

        normalized.time =
          this.safeNumber(
            existing.time
          );

        normalized.cardOpens =
          this.safeNumber(
            existing.cardOpens ??
            existing.clicks
          );

        normalized.clicks =
          normalized.cardOpens;

        normalized.audioPlays =
          this.safeNumber(
            existing.audioPlays
          );

        normalized.words =
          this.normalizeStringArray(
            existing.words
          );

        normalized.reviewedWords =
          this.normalizeStringArray(
            existing.reviewedWords ||
            existing.words
          );

        normalized.wordsExposed =
          this.normalizeStringArray(
            existing.wordsExposed ||
            existing.words
          );

        normalized.categoriesVisited =
          this.normalizeStringArray(
            existing.categoriesVisited
          );

        normalized.sessionsCount =
          this.safeNumber(
            existing.sessionsCount
          );

        normalized.grammar = {
          attempts:
            this.safeNumber(
              existing.grammar
                ?.attempts
            ),

          incorrect:
            this.safeNumber(
              existing.grammar
                ?.incorrect
            ),

          correct:
            this.safeNumber(
              existing.grammar
                ?.correct
            ),

          firstAttemptTotal:
            this.safeNumber(
              existing.grammar
                ?.firstAttemptTotal
            ),

          firstAttemptCorrect:
            this.safeNumber(
              existing.grammar
                ?.firstAttemptCorrect
            )
        };

        data.dailyActivity[
          today
        ] = normalized;
      }

      this.saveData(data);

      return {
        data,
        today
      };
    },

    getSessionState() {
      try {
        const raw =
          sessionStorage.getItem(
            this.SESSION_STORAGE_KEY
          );

        return raw
          ? JSON.parse(raw)
          : null;
      } catch (error) {
        return null;
      }
    },

    saveSessionState(state) {
      try {
        sessionStorage.setItem(
          this.SESSION_STORAGE_KEY,
          JSON.stringify(state)
        );
      } catch (error) {
        /*
          Аналитика продолжает работать
          без sessionStorage.
        */
      }
    },

touchSessionState() {
  if (document.hidden) return;

  const data = this.getData();
  if (!data) return;

  const now = Date.now();
  const today = this.getResearchDateKey();
  const previous = this.getSessionState();
  const timeoutMs = this.SESSION_TIMEOUT_SECONDS * 1000;

  const sessionExpired =
    !previous ||
    previous.studentId !== data.studentId ||
    previous.weekStart !== data.weekStart ||
    previous.dateKey !== today ||
    now - this.safeNumber(previous.lastSeenAt) > timeoutMs;

  if (this.options?.countSession && sessionExpired) {
    this.markSessionStart();
    return;
  }

  this.saveSessionState({
    studentId: data.studentId,
    weekStart: data.weekStart,
    dateKey: today,
    lastSeenAt: now
  });
},

    markSessionStart() {
      if (document.hidden) return;

      const {
        data,
        today
      } = this.ensureTodayRecord();

      const now =
        Date.now();

      const previous =
        this.getSessionState();

      const sessionTimeoutMs =
        this.SESSION_TIMEOUT_SECONDS *
        1000;

      const continuesExistingSession =
        Boolean(
          previous &&
          previous.studentId ===
            data.studentId &&
          previous.weekStart ===
            data.weekStart &&
          previous.dateKey ===
            today &&
          now -
            this.safeNumber(
              previous.lastSeenAt
            ) <=
            sessionTimeoutMs
        );

      if (!continuesExistingSession) {
        data.dailyActivity[
          today
        ].sessionsCount += 1;

        this.saveData(data);
      }

      this.saveSessionState({
        studentId:
          data.studentId,

        weekStart:
          data.weekStart,

        dateKey:
          today,

        lastSeenAt:
          now
      });
    },

    startTimer() {
      if (this._timerId) return;

      this._timerId =
        setInterval(() => {
          if (document.hidden) return;

          const {
            data,
            today
          } =
            this.ensureTodayRecord();

          data.dailyActivity[
            today
          ].time +=
            this.TIMER_STEP_SECONDS;

          this.saveData(data);
          this.touchSessionState();
        }, this.TIMER_STEP_SECONDS * 1000);
    },

    addReviewedWord(day, wordId) {
      if (
        !day.reviewedWords.includes(
          wordId
        )
      ) {
        day.reviewedWords.push(
          wordId
        );
      }
    },

    logWordReview(
      wordId,
      source = 'flip'
    ) {
      if (!wordId) return null;

      const normalizedWordId =
        String(wordId);

      const normalizedSource =
        String(
          source || 'flip'
        ).toLowerCase();

      const {
        data,
        today
      } =
        this.ensureTodayRecord();

      const day =
        data.dailyActivity[today];

      if (
        !data.interactionHeatmap ||
        typeof data.interactionHeatmap !==
          'object'
      ) {
        data.interactionHeatmap = {};
      }

      if (
        !data.audioHeatmap ||
        typeof data.audioHeatmap !==
          'object'
      ) {
        data.audioHeatmap = {};
      }

      if (
        normalizedSource ===
        'audio'
      ) {
        day.audioPlays += 1;

        data.audioHeatmap[
          normalizedWordId
        ] =
          this.safeNumber(
            data.audioHeatmap[
              normalizedWordId
            ]
          ) + 1;

        this.addReviewedWord(
          day,
          normalizedWordId
        );
      } else {
        day.cardOpens += 1;
        day.clicks =
          day.cardOpens;

        data.interactionHeatmap[
          normalizedWordId
        ] =
          this.safeNumber(
            data.interactionHeatmap[
              normalizedWordId
            ]
          ) + 1;

        this.addReviewedWord(
          day,
          normalizedWordId
        );
      }

      this.saveData(data);
      this.touchSessionState();

      return {
        wordId:
          normalizedWordId,

        source:
          normalizedSource
      };
    },

    logWordClick(wordId) {
      return this.logWordReview(
        wordId,
        'click'
      );
    },

    logWordFlip(wordId) {
      return this.logWordReview(
        wordId,
        'flip'
      );
    },

    logWordAudio(wordId) {
      return this.logWordReview(
        wordId,
        'audio'
      );
    },

    logWordsExposed(
      words = [],
      category = ''
    ) {
      const {
        data,
        today
      } =
        this.ensureTodayRecord();

      const day =
        data.dailyActivity[today];

      words.forEach(word => {
        const id =
          String(
            word?.id ||
            word?.w ||
            word?.en ||
            word ||
            ''
          );

        if (
          id &&
          id !== 'undefined' &&
          !day.wordsExposed.includes(
            id
          )
        ) {
          day.wordsExposed.push(id);
        }
      });

      if (
        category &&
        !day.categoriesVisited.includes(
          String(category)
        )
      ) {
        day.categoriesVisited.push(
          String(category)
        );
      }

      this.saveData(data);
      this.touchSessionState();
    },

    logGrammarAttempt({
      topic,
      sentenceId,
      prompt,
      selected,
      correctAnswer,
      isCorrect,
      attemptNo = 1,
      isFirstAttempt =
        attemptNo === 1
    }) {
      const dataTopic =
        String(
          topic ||
          'general'
        );

      const dataPrompt =
        String(
          prompt ||
          ''
        );

      const key =
        String(
          sentenceId ||
          `${dataTopic}::${dataPrompt}`
        );

      const correct =
        Boolean(isCorrect);

      const firstAttempt =
        Boolean(isFirstAttempt);

      const {
        data,
        today
      } =
        this.ensureTodayRecord();

      const day =
        data.dailyActivity[today];

      if (
        !data.grammar ||
        typeof data.grammar !==
          'object'
      ) {
        data.grammar = {
          bySentence: {},
          byTopic: {}
        };
      }

      if (
        !data.grammar.bySentence ||
        typeof data.grammar.bySentence !==
          'object'
      ) {
        data.grammar.bySentence = {};
      }

      if (
        !data.grammar.byTopic ||
        typeof data.grammar.byTopic !==
          'object'
      ) {
        data.grammar.byTopic = {};
      }

      if (
        !data.grammar.bySentence[key]
      ) {
        data.grammar.bySentence[key] =
          this.normalizeGrammarSentence({
            topic:
              dataTopic,

            prompt:
              dataPrompt,

            correctAnswer
          });
      }

      if (
        !data.grammar.byTopic[
          dataTopic
        ]
      ) {
        data.grammar.byTopic[
          dataTopic
        ] =
          this.normalizeGrammarTopic();
      }

      const sentenceStats =
        data.grammar.bySentence[key];

      const topicStats =
        data.grammar.byTopic[
          dataTopic
        ];

      sentenceStats.attempts += 1;

      sentenceStats.lastSelected =
        String(
          selected ||
          ''
        );

      topicStats.attempts += 1;
      day.grammar.attempts += 1;

      if (firstAttempt) {
        sentenceStats
          .firstAttemptTotal += 1;

        topicStats
          .firstAttemptTotal += 1;

        day.grammar
          .firstAttemptTotal += 1;

        if (correct) {
          sentenceStats
            .firstAttemptCorrect += 1;

          topicStats
            .firstAttemptCorrect += 1;

          day.grammar
            .firstAttemptCorrect += 1;
        }
      }

      if (correct) {
        sentenceStats.correct += 1;
        topicStats.correct += 1;
        day.grammar.correct += 1;
      } else {
        sentenceStats.incorrect += 1;
        topicStats.incorrect += 1;
        day.grammar.incorrect += 1;
      }

      this.saveData(data);
      this.touchSessionState();
    },

    getWeeklyLog() {
      this.ensureCurrentWeek();

      const data =
        this.getData();

      if (!data) return {};

      const result = {};

      Object.entries(
        data.dailyActivity || {}
      ).forEach(([dateKey, day]) => {
        const offset =
          Math.floor(
            (
              this.parseDateKey(dateKey) -
              this.parseDateKey(
                data.weekStart
              )
            ) /
            86400000
          );

        if (
          offset < 0 ||
          offset >= 7
        ) {
          return;
        }

        const cardOpens =
          this.safeNumber(
            day?.cardOpens ??
            day?.clicks
          );

        result[dateKey] = {
          time:
            this.safeNumber(
              day?.time
            ),

          activeTimeSeconds:
            this.safeNumber(
              day?.time
            ),

          clicks:
            cardOpens,

          cardOpens,

          audioPlays:
            this.safeNumber(
              day?.audioPlays
            ),

          words:
            this.normalizeStringArray(
              day?.words
            ),

          reviewedWords:
            this.normalizeStringArray(
              day?.reviewedWords ||
              day?.words
            ),

          wordsExposed:
            this.normalizeStringArray(
              day?.wordsExposed ||
              day?.words
            ),

          categoriesVisited:
            this.normalizeStringArray(
              day?.categoriesVisited
            ),

          sessionsCount:
            this.safeNumber(
              day?.sessionsCount
            ),

          grammar: {
            attempts:
              this.safeNumber(
                day?.grammar
                  ?.attempts
              ),

            incorrect:
              this.safeNumber(
                day?.grammar
                  ?.incorrect
              ),

            correct:
              this.safeNumber(
                day?.grammar
                  ?.correct
              ),

            firstAttemptTotal:
              this.safeNumber(
                day?.grammar
                  ?.firstAttemptTotal
              ),

            firstAttemptCorrect:
              this.safeNumber(
                day?.grammar
                  ?.firstAttemptCorrect
              )
          }
        };
      });

      return result;
    },

    getWeeklyGrammarSummary() {
      this.ensureCurrentWeek();

      const data =
        this.getData();

      if (!data) {
        return {
          bySentence: {},
          byTopic: {}
        };
      }

      const bySentence = {};
      const byTopic = {};

      Object.entries(
        data.grammar?.bySentence ||
        {}
      ).forEach(([key, item]) => {
        const normalized =
          this.normalizeGrammarSentence(
            item
          );

        bySentence[key] = {
          ...normalized,

          successRate:
            normalized.attempts
              ? Math.round(
                  (
                    normalized.correct /
                    normalized.attempts
                  ) *
                  100
                )
              : 0,

          firstAttemptSuccessRate:
            normalized
              .firstAttemptTotal
              ? Math.round(
                  (
                    normalized
                      .firstAttemptCorrect /
                    normalized
                      .firstAttemptTotal
                  ) *
                  100
                )
              : null
        };
      });

      Object.entries(
        data.grammar?.byTopic ||
        {}
      ).forEach(([topic, item]) => {
        const normalized =
          this.normalizeGrammarTopic(
            item
          );

        byTopic[String(topic)] = {
          ...normalized,

          successRate:
            normalized.attempts
              ? Math.round(
                  (
                    normalized.correct /
                    normalized.attempts
                  ) *
                  100
                )
              : 0,

          firstAttemptSuccessRate:
            normalized
              .firstAttemptTotal
              ? Math.round(
                  (
                    normalized
                      .firstAttemptCorrect /
                    normalized
                      .firstAttemptTotal
                  ) *
                  100
                )
              : null
        };
      });

      return {
        bySentence,
        byTopic
      };
    },

    getWeeklySummary(parentRate = 0) {
      this.ensureCurrentWeek();

      let data =
        this.getData();

      if (!data) {
        data =
          this.createFreshWeeklyData();

        this.saveData(data);
      }

      const weeklyLog =
        this.getWeeklyLog();

      const grammar =
        this.getWeeklyGrammarSummary();

      const scores =
        this.getScoreBreakdown();

      let totalSeconds = 0;
      let activeDays = 0;
      let sessionsCount = 0;
      let cardOpens = 0;
      let audioPlays = 0;

      let grammarAttempts = 0;
      let grammarIncorrect = 0;
      let grammarCorrect = 0;

      let grammarFirstAttemptTotal = 0;
      let grammarFirstAttemptCorrect = 0;

      const exposedWords =
        new Set();

      const reviewedWords =
        new Set();

      Object.values(
        weeklyLog
      ).forEach(day => {
        const seconds =
          this.safeNumber(
            day?.activeTimeSeconds ??
            day?.time
          );

        const dayCardOpens =
          this.safeNumber(
            day?.cardOpens ??
            day?.clicks
          );

        const dayAudioPlays =
          this.safeNumber(
            day?.audioPlays
          );

        const words =
          Array.isArray(
            day?.wordsExposed
          )
            ? day.wordsExposed
            : Array.isArray(
                day?.words
              )
            ? day.words
            : [];

        const reviewed =
          Array.isArray(
            day?.reviewedWords
          )
            ? day.reviewedWords
            : [];

        const dayGrammarAttempts =
          this.safeNumber(
            day?.grammar
              ?.attempts
          );

        totalSeconds +=
          seconds;

        sessionsCount +=
          this.safeNumber(
            day?.sessionsCount
          );

        cardOpens +=
          dayCardOpens;

        audioPlays +=
          dayAudioPlays;

        grammarAttempts +=
          dayGrammarAttempts;

        grammarIncorrect +=
          this.safeNumber(
            day?.grammar
              ?.incorrect
          );

        grammarCorrect +=
          this.safeNumber(
            day?.grammar
              ?.correct
          );

        grammarFirstAttemptTotal +=
          this.safeNumber(
            day?.grammar
              ?.firstAttemptTotal
          );

        grammarFirstAttemptCorrect +=
          this.safeNumber(
            day?.grammar
              ?.firstAttemptCorrect
          );

        if (
          seconds > 0 ||
          dayCardOpens > 0 ||
          dayAudioPlays > 0 ||
          words.length > 0 ||
          reviewed.length > 0 ||
          dayGrammarAttempts > 0
        ) {
          activeDays += 1;
        }

        words.forEach(word =>
          exposedWords.add(
            String(word)
          )
        );

        reviewed.forEach(word =>
          reviewedWords.add(
            String(word)
          )
        );
      });

      const heatmapValues =
        Object.values(
          data.interactionHeatmap ||
          {}
        ).map(count =>
          this.safeNumber(count)
        );

      const repeatedReviewedWords =
        heatmapValues.filter(
          count => count > 1
        ).length;

      const repeatedCardOpens =
        heatmapValues.reduce(
          (sum, count) =>
            sum +
            Math.max(
              0,
              count - 1
            ),
          0
        );

      const newXP =
        Math.max(
          0,
          scores.totalXP -
          this.safeNumber(
            data.totalXPAtStart
          )
        );

      const grammarPointsGained =
        Math.max(
          0,
          scores.grammarPoints -
          this.safeNumber(
            data.grammarPointsAtStart
          )
        );

      const vocabularyPointsGained =
        Math.max(
          0,
          scores.vocabularyPoints -
          this.safeNumber(
            data.vocabularyPointsAtStart
          )
        );

      const generatedAt =
        new Date();

      return {
        id:
          data.studentId,

        studentId:
          data.studentId,

        dbVersion:
          data.dbVersion ||
          this.DB_VERSION,

        weekStart:
          data.weekStart,

        reportAnchorTuesday:
          data.reportAnchorTuesday,

        timezone:
          data.timezone ||
          this.RESEARCH_TIMEZONE,

        generatedAtRaw:
          generatedAt.toString(),

        generatedAtUTC:
          generatedAt.toISOString(),

        localDateKey:
          this.getResearchDateKey(
            generatedAt
          ),

        activeDays,

        sessionsCount,

        activeTimeMinutes:
          Math.floor(
            totalSeconds / 60
          ),

        activeTimeSeconds:
          totalSeconds,

        /*
          Накопительные баллы.
          Используются деревом и
          не сбрасываются каждую неделю.
        */
        totalXP:
          scores.totalXP,

        totalPoints:
          scores.totalXP,

        grammarPointsTotal:
          scores.grammarPoints,

        grammarPoints:
          scores.grammarPoints,

        vocabularyPointsTotal:
          scores.vocabularyPoints,

        vocabularyPoints:
          scores.vocabularyPoints,

        /*
          Недельный прирост баллов.
        */
        totalXPAtWeekStart:
          this.safeNumber(
            data.totalXPAtStart
          ),

        newXP,

        pointsGained:
          newXP,

        grammarPointsGained,

        vocabularyPointsGained,

        newW:
          exposedWords.size,

        wordsExposed:
          exposedWords.size,

        reviewedWords:
          reviewedWords.size,

        cardOpens,

        audioPlays,

        repeatedReviewedWords,

        repeatedCardOpens,

        rate:
          this.safeNumber(
            parentRate
          ),

        parentRate:
          this.safeNumber(
            parentRate
          ),

        grammarAttempts,

        incorrectGrammarAttempts:
          grammarIncorrect,

        correctGrammarAttempts:
          grammarCorrect,

        grammarSuccessRate:
          grammarAttempts
            ? Math.round(
                (
                  grammarCorrect /
                  grammarAttempts
                ) *
                100
              )
            : 0,

        grammarFirstAttemptTotal,

        grammarFirstAttemptCorrect,

        grammarFirstAttemptSuccessRate:
          grammarFirstAttemptTotal
            ? Math.round(
                (
                  grammarFirstAttemptCorrect /
                  grammarFirstAttemptTotal
                ) *
                100
              )
            : null,

        interactionHeatmap:
          data.interactionHeatmap ||
          {},

        audioHeatmap:
          data.audioHeatmap ||
          {},

        diff:
          data.interactionHeatmap ||
          {},

        grammar,

        log:
          weeklyLog
      };
    },

    encodeWeeklyReport(
      parentRate = 0
    ) {
      const report =
        this.getWeeklySummary(
          parentRate
        );

      const json =
        JSON.stringify(report);

      const bytes =
        new TextEncoder().encode(
          json
        );

      let binary = '';

      bytes.forEach(byte => {
        binary +=
          String.fromCharCode(
            byte
          );
      });

      return (
        'LL-REPORT:' +
        btoa(binary)
      );
    }
  };

  window.Analytics = Analytics;
  Analytics.init();
})();
