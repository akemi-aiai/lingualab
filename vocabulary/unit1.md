---
layout: default
title: Unit 1
---

# Unit 1: My family

<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LinguaLab Flashcard Game</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="/_sdk/element_sdk.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      box-sizing: border-box;
      font-family: 'Nunito', sans-serif;
    }

    .card-flip {
      perspective: 1000px;
    }

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
    }

    .card-inner.flipped {
      transform: rotateY(180deg);
    }

    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 1.5rem;
    }

    .card-back {
      transform: rotateY(180deg);
    }

    @keyframes floatIn {
      from { opacity: 0; transform: translateY(30px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    @keyframes popIn {
      0% { transform: scale(0); opacity: 0; }
      70% { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    @keyframes confetti-fall {
      0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
      100% { transform: translateY(120px) rotate(720deg); opacity: 0; }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(255, 170, 50, 0.3); }
      50% { box-shadow: 0 0 40px rgba(255, 170, 50, 0.6); }
    }

    @keyframes star-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-float-in {
      animation: floatIn 0.5s ease-out forwards;
    }

    .animate-pop {
      animation: popIn 0.4s ease-out forwards;
    }

    .animate-shake {
      animation: shake 0.5s ease-in-out;
    }

    .animate-slide-up {
      animation: slideUp 0.4s ease-out forwards;
    }

    .shimmer-text {
      background: linear-gradient(90deg, #ff6b35, #ffd700, #ff6b35);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }

    .confetti-piece {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 2px;
      animation: confetti-fall 1.5s ease-out forwards;
    }

    .progress-ring {
      transition: stroke-dashoffset 0.5s ease-in-out;
    }

    .hint-bubble {
      position: relative;
    }

    .hint-bubble::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid #fff8e7;
    }

    .mode-btn.active {
      transform: scale(1.05);
    }

    .option-btn {
      transition: all 0.2s ease;
    }

    .option-btn:hover {
      transform: translateY(-2px);
    }

    .option-btn.correct {
      animation: popIn 0.3s ease-out;
    }

    .option-btn.wrong {
      animation: shake 0.4s ease-in-out;
    }

    .star-earned {
      animation: star-spin 0.6s ease-out, popIn 0.4s ease-out;
    }

    .bg-pattern {
      background-image:
        radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 70%);
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #d4a574; border-radius: 3px; }
  </style>
</head>
<body class="h-full m-0 p-0">
  <div id="app" class="h-full w-full overflow-auto bg-pattern" style="background-color: #1a1a2e;">
    <!-- Header -->
    <header class="w-full px-4 pt-5 pb-3">
      <div class="max-w-2xl mx-auto text-center">
        <h1 id="app-title" class="text-3xl md:text-4xl font-black shimmer-text tracking-tight" style="animation-delay: 0.1s;">
          LinguaLab
        </h1>
        <p id="subtitle" class="mt-1 text-sm font-semibold" style="color: #4ecdc4; opacity: 0.9;">
          English · 中文 · Vocabulary Builder
        </p>
      </div>
    </header>

    <main class="w-full px-4 pb-8">
      <div class="max-w-2xl mx-auto">

        <!-- Score & Stats Bar -->
        <div id="stats-bar" class="flex items-center justify-between rounded-2xl px-4 py-3 mb-4 animate-float-in" style="background: rgba(255,255,255,0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08);">
          <div class="flex items-center gap-2">
            <div class="relative w-10 h-10">
              <svg class="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3"/>
                <circle id="progress-circle" class="progress-ring" cx="18" cy="18" r="15.5" fill="none" stroke="#ffd700" stroke-width="3" stroke-dasharray="97.4" stroke-dashoffset="97.4" stroke-linecap="round"/>
              </svg>
              <span id="progress-text" class="absolute inset-0 flex items-center justify-center text-xs font-bold" style="color: #ffd700;">0%</span>
            </div>
            <div>
              <p class="text-xs font-semibold" style="color: rgba(255,255,255,0.5);">Progress</p>
              <p id="card-counter" class="text-sm font-bold" style="color: #fff;">1 / 6</p>
            </div>
          </div>

          <div class="flex items-center gap-1" id="stars-container">
            <span class="text-xs font-bold mr-1" style="color: #ffd700;">Stars:</span>
            <span id="stars-display" style="color: rgba(255,255,255,0.3);">☆☆☆☆☆</span>
          </div>

          <div class="text-right">
            <p class="text-xs font-semibold" style="color: rgba(255,255,255,0.5);">Score</p>
            <p id="score-display" class="text-lg font-black" style="color: #ff6b35;">0</p>
          </div>
        </div>

        <!-- Mode Selector -->
        <div class="flex gap-2 mb-4 justify-center flex-wrap" id="mode-selector">
          <button onclick="setMode('learn')" class="mode-btn active px-4 py-2 rounded-xl text-sm font-bold transition-all" style="background: #ff6b35; color: #fff;" id="mode-learn">
            📖 Learn
          </button>
          <button onclick="setMode('quiz')" class="mode-btn px-4 py-2 rounded-xl text-sm font-bold transition-all" style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);" id="mode-quiz">
            🧩 Quiz
          </button>
          <button onclick="setMode('match')" class="mode-btn px-4 py-2 rounded-xl text-sm font-bold transition-all" style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);" id="mode-match">
            🔗 Match
          </button>
        </div>

        <!-- LEARN MODE -->
        <section id="learn-section" class="animate-float-in">
          <!-- Flashcard -->
          <div class="card-flip mx-auto" style="max-width: 400px; height: 320px;" id="flashcard-container">
            <div class="card-inner" id="card-inner">
              <div class="card-front flex flex-col items-center justify-center p-6 cursor-pointer" style="background: linear-gradient(145deg, #2a2a4a, #1e1e3a); border: 2px solid rgba(255,107,53,0.3);" onclick="flipCard()">
                <div id="card-svg" class="mb-3"></div>
                <p id="card-english" class="text-3xl font-black" style="color: #fff;"></p>
                <p class="text-xs mt-2 font-semibold" style="color: rgba(255,255,255,0.35);">Tap to flip ✨</p>
              </div>
              <div class="card-back flex flex-col items-center justify-center p-6 cursor-pointer" style="background: linear-gradient(145deg, #1e3a2a, #1a2e3a); border: 2px solid rgba(78,205,196,0.3);" onclick="flipCard()">
                <p id="card-chinese" class="text-4xl font-bold mb-2" style="font-family: 'Noto Sans SC', sans-serif; color: #4ecdc4;"></p>
                <p id="card-pinyin" class="text-lg mb-1" style="color: rgba(255,255,255,0.6);"></p>
                <p id="card-english-back" class="text-xl font-bold" style="color: #ffd700;"></p>
                <p id="card-phrase" class="text-sm mt-2 italic" style="color: rgba(255,255,255,0.4);"></p>
              </div>
            </div>
          </div>

          <!-- Hint Area -->
          <div id="hint-area" class="mt-4 text-center" style="min-height: 48px;">
            <button id="hint-btn" onclick="showHint()" class="px-5 py-2 rounded-xl text-sm font-bold transition-all" style="background: rgba(255,215,0,0.15); color: #ffd700; border: 1px solid rgba(255,215,0,0.3);">
              💡 Hint (-5 pts)
            </button>
            <div id="hint-text" class="hidden mt-2 hint-bubble inline-block px-4 py-2 rounded-xl text-sm font-semibold" style="background: #fff8e7; color: #8b6914;"></div>
          </div>

          <!-- Navigation -->
          <nav class="flex items-center justify-center gap-4 mt-5">
            <button onclick="prevCard()" class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all" style="background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.1);" aria-label="Previous card">
              ←
            </button>
            <button onclick="speakWord()" class="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all" style="background: rgba(78,205,196,0.15); border: 1px solid rgba(78,205,196,0.3);" aria-label="Listen to pronunciation">
              🔊
            </button>
            <button onclick="nextCard()" class="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all" style="background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.1);" aria-label="Next card">
              →
            </button>
          </nav>

          <!-- Word dots indicator -->
          <div id="dots-container" class="flex justify-center gap-2 mt-4"></div>
        </section>

        <!-- QUIZ MODE -->
        <section id="quiz-section" class="hidden animate-float-in">
          <div class="rounded-2xl p-6 text-center" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);">
            <p class="text-sm font-semibold mb-2" style="color: rgba(255,255,255,0.4);">What is this word?</p>
            <div id="quiz-svg" class="flex justify-center mb-3"></div>
            <p id="quiz-prompt" class="text-3xl font-black mb-6" style="color: #fff;"></p>
            <div id="quiz-options" class="grid grid-cols-2 gap-3"></div>
            <div id="quiz-feedback" class="mt-4 text-lg font-bold hidden"></div>
            <button id="quiz-next" onclick="nextQuiz()" class="hidden mt-4 px-6 py-2 rounded-xl font-bold text-sm transition-all" style="background: #ff6b35; color: #fff;">
              Next Question →
            </button>
          </div>
          <div class="mt-4 text-center">
            <p class="text-sm font-semibold" style="color: rgba(255,255,255,0.4);">
              Streak: <span id="streak-display" class="font-black" style="color: #ffd700;">0 🔥</span>
            </p>
          </div>
        </section>

        <!-- MATCH MODE -->
        <section id="match-section" class="hidden animate-float-in">
          <div class="rounded-2xl p-4" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);">
            <p class="text-center text-sm font-semibold mb-3" style="color: rgba(255,255,255,0.4);">Match English with 中文</p>
            <div class="flex gap-4 justify-center flex-wrap" id="match-area">
              <div id="match-english" class="flex flex-col gap-2 flex-1" style="min-width: 130px;"></div>
              <div id="match-chinese" class="flex flex-col gap-2 flex-1" style="min-width: 130px;"></div>
            </div>
            <div id="match-feedback" class="mt-3 text-center text-sm font-bold hidden"></div>
            <div class="text-center mt-3">
              <p class="text-xs" style="color: rgba(255,255,255,0.3);">
                Timer: <span id="match-timer" class="font-bold" style="color: #4ecdc4;">0s</span>
              </p>
              <button onclick="resetMatch()" class="mt-2 px-4 py-1.5 rounded-lg text-xs font-bold" style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6);">🔄 Reset</button>
            </div>
          </div>
        </section>

        <!-- COMPLETION SCREEN -->
        <section id="completion-section" class="hidden animate-float-in">
          <div class="rounded-2xl p-8 text-center" style="background: linear-gradient(145deg, #2a2a4a, #1e1e3a); border: 2px solid rgba(255,215,0,0.3);">
            <div id="confetti-container" class="relative" style="height: 0; overflow: visible;"></div>
            <p class="text-5xl mb-4">🎉</p>
            <h2 class="text-2xl font-black mb-2" style="color: #ffd700;">Amazing Work!</h2>
            <p class="text-sm mb-4" style="color: rgba(255,255,255,0.6);">You completed all flashcards!</p>
            <div class="flex justify-center gap-6 mb-4">
              <div>
                <p class="text-3xl font-black" style="color: #ff6b35;" id="final-score">0</p>
                <p class="text-xs" style="color: rgba(255,255,255,0.4);">Points</p>
              </div>
              <div>
                <p class="text-3xl font-black" style="color: #4ecdc4;" id="final-streak">0</p>
                <p class="text-xs" style="color: rgba(255,255,255,0.4);">Best Streak</p>
              </div>
            </div>
            <button onclick="restartGame()" class="px-8 py-3 rounded-xl font-bold transition-all" style="background: #ff6b35; color: #fff;">
              Play Again
            </button>
          </div>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full text-center pb-6 px-4">
      <p class="text-xs" style="color: rgba(255,255,255,0.2);">
        Made with love for LinguaLab · Week 1
      </p>
    </footer>
  </div>

  <script>
    // ===== VOCABULARY DATA =====
    const vocabulary = [
      {
        english: "Mommy",
        chinese: "妈妈",
        pinyin: "māma",
        hint: "She takes care of you and loves you!",
        phrase: "I love my mommy!",
        svg: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="28" r="14" fill="#ffb6c1"/><circle cx="35" cy="25" r="2" fill="#333"/><circle cx="45" cy="25" r="2" fill="#333"/><path d="M36 31 Q40 35 44 31" stroke="#e75480" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M30 18 Q32 8 40 10 Q48 8 50 18" fill="#4a2c2a" stroke="none"/><rect x="30" y="42" width="20" height="28" rx="8" fill="#e75480"/><line x1="30" y1="52" x2="22" y2="62" stroke="#ffb6c1" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="52" x2="58" y2="62" stroke="#ffb6c1" stroke-width="4" stroke-linecap="round"/><circle cx="40" cy="28" r="14" fill="none" stroke="#e75480" stroke-width="0.5" opacity="0.3"/><text x="40" y="78" text-anchor="middle" fill="#e75480" font-size="6" font-weight="bold">♥</text></svg>`
      },
      {
        english: "Daddy",
        chinese: "爸爸",
        pinyin: "bàba",
        hint: "He's the man of the family!",
        phrase: "Daddy is strong!",
        svg: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="28" r="14" fill="#f4c28c"/><circle cx="35" cy="25" r="2" fill="#333"/><circle cx="45" cy="25" r="2" fill="#333"/><path d="M36 32 Q40 35 44 32" stroke="#b87333" stroke-width="1.5" fill="none" stroke-linecap="round"/><rect x="28" y="12" width="24" height="10" rx="4" fill="#2c5f8a"/><rect x="30" y="42" width="20" height="28" rx="8" fill="#2c5f8a"/><line x1="30" y1="52" x2="22" y2="64" stroke="#f4c28c" stroke-width="4" stroke-linecap="round"/><line x1="50" y1="52" x2="58" y2="64" stroke="#f4c28c" stroke-width="4" stroke-linecap="round"/><rect x="33" y="50" width="14" height="3" rx="1" fill="#c9a84c"/><text x="40" y="78" text-anchor="middle" fill="#2c5f8a" font-size="6" font-weight="bold">★</text></svg>`
      },
      {
        english: "Brother",
        chinese: "哥哥/弟弟",
        pinyin: "gēge / dìdi",
        hint: "A boy who shares the same parents as you!",
        phrase: "My brother plays with me.",
        svg: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="30" r="12" fill="#ffe0bd"/><circle cx="36" cy="28" r="1.8" fill="#333"/><circle cx="44" cy="28" r="1.8" fill="#333"/><path d="M37 33 Q40 36 43 33" stroke="#d4883a" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M30 22 Q34 14 40 16 Q46 14 50 22" fill="#5b3a1a"/><rect x="32" y="42" width="16" height="24" rx="6" fill="#48b265"/><line x1="32" y1="50" x2="24" y2="58" stroke="#ffe0bd" stroke-width="3.5" stroke-linecap="round"/><line x1="48" y1="50" x2="56" y2="58" stroke="#ffe0bd" stroke-width="3.5" stroke-linecap="round"/><circle cx="56" cy="58" r="5" fill="#f4a836" stroke="#d4883a" stroke-width="1"/><text x="40" y="78" text-anchor="middle" fill="#48b265" font-size="6" font-weight="bold">⚽</text></svg>`
      },
      {
        english: "Sister",
        chinese: "姐姐/妹妹",
        pinyin: "jiějie / mèimei",
        hint: "A girl who shares the same parents as you!",
        phrase: "My sister is kind.",
        svg: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="28" r="12" fill="#ffe0bd"/><circle cx="36" cy="26" r="1.8" fill="#333"/><circle cx="44" cy="26" r="1.8" fill="#333"/><path d="M37 31 Q40 34 43 31" stroke="#c96b8b" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M28 22 Q30 12 40 14 Q50 12 52 22 L50 28 Q48 18 40 20 Q32 18 30 28 Z" fill="#6b3a5a"/><circle cx="30" cy="18" r="3" fill="#ff69b4"/><rect x="32" y="40" width="16" height="22" rx="6" fill="#d65db1"/><path d="M32 52 L28 62 L52 62 L48 52" fill="#d65db1"/><line x1="32" y1="48" x2="24" y2="56" stroke="#ffe0bd" stroke-width="3.5" stroke-linecap="round"/><line x1="48" y1="48" x2="56" y2="56" stroke="#ffe0bd" stroke-width="3.5" stroke-linecap="round"/><text x="40" y="78" text-anchor="middle" fill="#d65db1" font-size="6" font-weight="bold">🌷</text></svg>`
      },
      {
        english: "Family",
        chinese: "家庭",
        pinyin: "jiātíng",
        hint: "All your loved ones together!",
        phrase: "I love my family!",
        svg: `<svg width="80" height="80" viewBox="0 0 80 80"><path d="M40 10 L60 30 L56 30 L56 55 L24 55 L24 30 L20 30 Z" fill="#c9784e" stroke="#a0603a" stroke-width="1"/><rect x="28" y="32" width="8" height="8" rx="1" fill="#87ceeb"/><rect x="44" y="32" width="8" height="8" rx="1" fill="#87ceeb"/><rect x="36" y="42" width="8" height="13" rx="1" fill="#8b5e3c"/><circle cx="40" cy="47" r="1" fill="#ffd700"/><path d="M40 10 L40 5" stroke="#a0603a" stroke-width="1.5"/><circle cx="40" cy="3" r="2" fill="#ff6b35"/><circle cx="20" cy="60" r="5" fill="#ffe0bd"/><rect x="17" y="65" width="6" height="10" rx="2" fill="#e75480"/><circle cx="30" cy="62" r="4" fill="#ffe0bd"/><rect x="28" y="66" width="5" height="8" rx="2" fill="#48b265"/><circle cx="50" cy="62" r="4" fill="#ffe0bd"/><rect x="48" y="66" width="5" height="8" rx="2" fill="#d65db1"/><circle cx="60" cy="60" r="5" fill="#f4c28c"/><rect x="57" y="65" width="6" height="10" rx="2" fill="#2c5f8a"/><text x="40" y="78" text-anchor="middle" fill="#c9784e" font-size="6" font-weight="bold">🏠</text></svg>`
      },
      {
        english: "Good Morning!",
        chinese: "早上好！",
        pinyin: "zǎoshang hǎo!",
        hint: "You say this when you wake up! ☀️",
        phrase: "Good morning, everyone!",
        isPhrase: true,
        svg: `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="16" fill="#ffd700"/><circle cx="36" cy="37" r="2" fill="#333"/><circle cx="44" cy="37" r="2" fill="#333"/><path d="M34 44 Q40 50 46 44" stroke="#f4a836" stroke-width="2" fill="none" stroke-linecap="round"/><line x1="40" y1="16" x2="40" y2="10" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/><line x1="40" y1="64" x2="40" y2="70" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/><line x1="16" y1="40" x2="10" y2="40" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/><line x1="64" y1="40" x2="70" y2="40" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/><line x1="22" y1="22" x2="17" y2="17" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/><line x1="58" y1="22" x2="63" y2="17" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/><line x1="22" y1="58" x2="17" y2="63" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/><line x1="58" y1="58" x2="63" y2="63" stroke="#ffd700" stroke-width="2" stroke-linecap="round"/><text x="40" y="78" text-anchor="middle" fill="#ffd700" font-size="5" font-weight="bold">Good Morning!</text></svg>`
      }
    ];

    // ===== GAME STATE =====
    let currentIndex = 0;
    let score = 0;
    let streak = 0;
    let bestStreak = 0;
    let hintsUsed = 0;
    let currentMode = 'learn';
    let isFlipped = false;
    let quizAnswered = false;
    let matchSelected = null;
    let matchPairs = 0;
    let matchTimerInterval = null;
    let matchTime = 0;
    let starsEarned = 0;

    // ===== DEFAULT CONFIG =====
    const defaultConfig = {
      app_title: "🌸 LinguaLab 🌸",
      subtitle_text: "English · 中文 · Vocabulary Builder",
      background_color: "#1a1a2e",
      surface_color: "#2a2a4a",
      text_color: "#ffffff",
      primary_action_color: "#ff6b35",
      secondary_action_color: "#4ecdc4"
    };

    // ===== ELEMENT SDK =====
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        const bg = config.background_color || defaultConfig.background_color;
        const surface = config.surface_color || defaultConfig.surface_color;
        const text = config.text_color || defaultConfig.text_color;
        const primary = config.primary_action_color || defaultConfig.primary_action_color;
        const secondary = config.secondary_action_color || defaultConfig.secondary_action_color;
        const fontFamily = config.font_family ? `${config.font_family}, Nunito, sans-serif` : "'Nunito', sans-serif";
        const baseSize = config.font_size || 16;

        // Background
        const app = document.getElementById('app');
        app.style.backgroundColor = bg;

        // Title
        const titleEl = document.getElementById('app-title');
        titleEl.textContent = config.app_title || defaultConfig.app_title;
        titleEl.style.fontFamily = fontFamily;
        titleEl.style.fontSize = `${baseSize * 2}px`;

        // Subtitle
        const subEl = document.getElementById('subtitle');
        subEl.textContent = config.subtitle_text || defaultConfig.subtitle_text;
        subEl.style.color = secondary;
        subEl.style.fontFamily = fontFamily;
        subEl.style.fontSize = `${baseSize * 0.85}px`;

        // Stats bar
        const statsBar = document.getElementById('stats-bar');
        statsBar.style.background = `rgba(255,255,255,0.06)`;

        // Score display
        const scoreDisplay = document.getElementById('score-display');
        scoreDisplay.style.color = primary;

        // Card styling
        const cardFront = document.querySelector('.card-front');
        if (cardFront) {
          cardFront.style.background = `linear-gradient(145deg, ${surface}, ${bg})`;
          cardFront.style.borderColor = `${primary}50`;
        }
        const cardBack = document.querySelector('.card-back');
        if (cardBack) {
          cardBack.style.borderColor = `${secondary}50`;
        }

        // Card text
        const cardEng = document.getElementById('card-english');
        if (cardEng) {
          cardEng.style.color = text;
          cardEng.style.fontFamily = fontFamily;
          cardEng.style.fontSize = `${baseSize * 1.8}px`;
        }

        const cardChn = document.getElementById('card-chinese');
        if (cardChn) cardChn.style.color = secondary;

        const cardEngBack = document.getElementById('card-english-back');
        if (cardEngBack) cardEngBack.style.color = '#ffd700';

        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
          if (btn.classList.contains('active')) {
            btn.style.background = primary;
            btn.style.color = '#fff';
          } else {
            btn.style.background = 'rgba(255,255,255,0.08)';
            btn.style.color = 'rgba(255,255,255,0.6)';
          }
          btn.style.fontFamily = fontFamily;
          btn.style.fontSize = `${baseSize * 0.85}px`;
        });

        // Hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
          hintBtn.style.background = 'rgba(255,215,0,0.15)';
          hintBtn.style.color = '#ffd700';
        }

        // Progress circle
        const progressCircle = document.getElementById('progress-circle');
        if (progressCircle) progressCircle.style.stroke = '#ffd700';

        // Nav buttons
        document.querySelectorAll('nav button').forEach(btn => {
          btn.style.fontFamily = fontFamily;
        });

        // Quiz section
        const quizPrompt = document.getElementById('quiz-prompt');
        if (quizPrompt) {
          quizPrompt.style.color = text;
          quizPrompt.style.fontFamily = fontFamily;
        }

        // Apply font to body for general inheritance
        document.body.style.fontFamily = fontFamily;

        // Dots
        document.querySelectorAll('.dot-indicator').forEach((dot, i) => {
          if (i === currentIndex) {
            dot.style.background = primary;
          }
        });
      },
      mapToCapabilities: (config) => ({
        recolorables: [
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); }
          },
          {
            get: () => config.surface_color || defaultConfig.surface_color,
            set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); }
          },
          {
            get: () => config.primary_action_color || defaultConfig.primary_action_color,
            set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); }
          },
          {
            get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
            set: (v) => { config.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => config.font_family || defaultConfig.font_family || 'Nunito',
          set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
        },
        fontSizeable: {
          get: () => config.font_size || 16,
          set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
        }
      }),
      mapToEditPanelValues: (config) => new Map([
        ["app_title", config.app_title || defaultConfig.app_title],
        ["subtitle_text", config.subtitle_text || defaultConfig.subtitle_text]
      ])
    });

    // ===== RENDER CARD =====
    function renderCard() {
      const word = vocabulary[currentIndex];
      document.getElementById('card-svg').innerHTML = word.svg;
      document.getElementById('card-english').textContent = word.english;
      document.getElementById('card-chinese').textContent = word.chinese;
      document.getElementById('card-pinyin').textContent = word.pinyin;
      document.getElementById('card-english-back').textContent = word.english;
      document.getElementById('card-phrase').textContent = `"${word.phrase}"`;

      // Reset flip
      isFlipped = false;
      document.getElementById('card-inner').classList.remove('flipped');

      // Reset hint
      document.getElementById('hint-text').classList.add('hidden');
      document.getElementById('hint-btn').classList.remove('hidden');

      // Update counter
      document.getElementById('card-counter').textContent = `${currentIndex + 1} / ${vocabulary.length}`;

      // Update progress
      const progress = ((currentIndex + 1) / vocabulary.length) * 100;
      const circumference = 97.4;
      const offset = circumference - (progress / 100) * circumference;
      document.getElementById('progress-circle').style.strokeDashoffset = offset;
      document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;

      // Update dots
      renderDots();

      // Animate card
      const container = document.getElementById('flashcard-container');
      container.classList.remove('animate-float-in');
      void container.offsetWidth;
      container.classList.add('animate-float-in');
    }

    function renderDots() {
      const container = document.getElementById('dots-container');
      container.innerHTML = '';
      const config = window.elementSdk.config || {};
      const primary = config.primary_action_color || defaultConfig.primary_action_color;
      vocabulary.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dot-indicator w-2.5 h-2.5 rounded-full transition-all cursor-pointer';
        dot.style.background = i === currentIndex ? primary : 'rgba(255,255,255,0.15)';
        dot.style.transform = i === currentIndex ? 'scale(1.3)' : 'scale(1)';
        dot.onclick = () => { currentIndex = i; renderCard(); };
        container.appendChild(dot);
      });
    }

    function flipCard() {
      isFlipped = !isFlipped;
      const inner = document.getElementById('card-inner');
      if (isFlipped) {
        inner.classList.add('flipped');
        addScore(10);
      } else {
        inner.classList.remove('flipped');
      }
    }

    function nextCard() {
      if (currentIndex < vocabulary.length - 1) {
        currentIndex++;
        renderCard();
      } else {
        showCompletion();
      }
    }

    function prevCard() {
 



---

<a href="/lingualab/exercises">← Back to Homework</a>
