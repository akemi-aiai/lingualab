<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Word Bank — Unit 1: My Family | LinguaLab</title>

  <meta name="description" content="LinguaLab Word Bank — Unit 1: My Family. Flashcards with listening, quiz, and matching game." />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

  <style>
    :root{
      --primary:#2563eb;
      --accent:#f97316;
      --bg:#f8fafc;
      --card:#ffffff;
      --text:#0f172a;
      --muted:#64748b;
      --navy:#1f4e79;
      --good:#16a34a;
      --bad:#ef4444;
      --radius:18px;
    }

    *{ box-sizing:border-box; margin:0; padding:0; }
    html{ scroll-behavior:smooth; }
    body{
      font-family:'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background:var(--bg);
      color:var(--text);
      line-height:1.6;
      padding-top:86px; /* fixed navbar */
    }
    a{ color:inherit; text-decoration:none; }
    a:focus-visible, button:focus-visible{
      outline:3px solid rgba(37,99,235,.45);
      outline-offset:3px;
      border-radius:14px;
    }

    /* NAV (like home) */
    .navbar{
      position: fixed;
      top:0; left:0;
      width:100%;
      z-index:1000;
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:16px;
      padding: 12px 40px;
      background:#fff;
      box-shadow:0 4px 20px rgba(0,0,0,0.05);
    }
    .navbar-left{
      display:flex;
      align-items:center;
      gap:10px;
      min-width:max-content;
    }
    .nav-logo{ height:54px; width:auto; display:block; }
    .nav-title{
      font-size:20px;
      font-weight:900;
      color:var(--navy);
      letter-spacing:.2px;
    }
    .navbar-right{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      justify-content:flex-end;
    }
    .navbar-right a{
      color:var(--navy);
      font-weight:800;
      padding:8px 12px;
      border-radius:12px;
      transition: background .2s ease, color .2s ease, transform .2s ease;
    }
    .navbar-right a:hover{
      background:var(--navy);
      color:#fff;
      transform:translateY(-1px);
    }

    /* Layout */
    .wrap{
      max-width:1100px;
      margin:0 auto;
      padding: 44px 8% 70px;
    }

    /* HERO */
    .hero{
      padding:28px 24px;
      border-radius:24px;
      background:linear-gradient(135deg,#2563eb,#7c3aed);
      color:#fff;
      box-shadow:0 14px 34px rgba(0,0,0,.12);
    }
    .hero-top{
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
      gap:14px;
      flex-wrap:wrap;
    }
    .hero h1{
      margin:0 0 8px;
      font-size:clamp(24px,3vw,38px);
      line-height:1.12;
      letter-spacing:-.02em;
    }
    .hero p{
      margin:0;
      max-width:840px;
      color:rgba(255,255,255,.92);
      font-size:16px;
    }
    .hero-badges{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      justify-content:flex-end;
    }
    .badge{
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:10px 12px;
      border-radius:999px;
      font-weight:900;
      font-size:12px;
      background:rgba(255,255,255,.18);
      white-space:nowrap;
      user-select:none;
    }

    /* Mode + stats */
    .bar{
      margin-top:14px;
      display:flex;
      gap:12px;
      flex-wrap:wrap;
      justify-content:space-between;
      align-items:center;
    }
    .seg{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
    }
    .chip{
      border:0;
      cursor:pointer;
      font-weight:900;
      border-radius:999px;
      padding:12px 14px;
      background:#fff;
      color:var(--text);
      box-shadow:0 10px 22px rgba(0,0,0,.10);
      transition:transform .18s ease, filter .18s ease, background .18s ease;
      user-select:none;
    }
    .chip:hover{ transform:translateY(-2px); filter:brightness(.98); }
    .chip.active{ background:var(--accent); color:#fff; }

    .stat{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
      justify-content:flex-end;
      font-weight:1000;
    }
    .stat span{
      background:rgba(255,255,255,.18);
      border-radius:999px;
      padding:10px 12px;
      font-size:12px;
      color:#fff;
      white-space:nowrap;
    }

    /* Panel */
    .panel{
      margin-top:18px;
      background:#fff;
      border-radius:22px;
      padding:18px 16px;
      box-shadow:0 6px 24px rgba(0,0,0,.06);
      border:1px solid rgba(15,23,42,.06);
    }
    .panel-top{
      display:flex;
      justify-content:space-between;
      align-items:flex-start;
      gap:12px;
      flex-wrap:wrap;
    }
    .panel-title{
      font-weight:1000;
      font-size:18px;
      margin:0;
      display:flex;
      align-items:center;
      gap:10px;
    }
    .panel-sub{
      margin-top:6px;
      color:var(--muted);
      font-size:14px;
      font-weight:700;
    }
    .panel-right{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
      justify-content:flex-end;
    }

    /* Buttons */
    .btn{
      border:0;
      cursor:pointer;
      border-radius:16px;
      padding:12px 14px;
      font-weight:1000;
      transition:transform .16s ease, filter .16s ease, background .16s ease;
      user-select:none;
      display:inline-flex;
      align-items:center;
      gap:10px;
    }
    .btn:hover{ transform:translateY(-2px); filter:brightness(.98); }
    .btn-primary{ background:var(--primary); color:#fff; }
    .btn-accent{ background:var(--accent); color:#fff; }
    .btn-dark{ background:#0f172a; color:#fff; }
    .btn-light{ background:#f1f5f9; color:var(--text); }
    .btn-ghost{
      background:#fff;
      color:var(--text);
      border:1px solid rgba(15,23,42,.12);
    }

    /* Flashcard */
    .card-wrap{
      margin-top:14px;
      display:grid;
      grid-template-columns: 1fr;
      gap:12px;
      justify-items:center;
    }
    .flip{
      width:min(420px, 100%);
      height:320px;
      perspective:1000px;
    }
    .inner{
      position:relative;
      width:100%;
      height:100%;
      transform-style:preserve-3d;
      transition:transform .6s cubic-bezier(.4,0,.2,1);
    }
    .inner.flipped{ transform:rotateY(180deg); }

    .face{
      position:absolute;
      inset:0;
      border-radius:22px;
      backface-visibility:hidden;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      padding:18px;
      text-align:center;
      box-shadow:0 12px 28px rgba(0,0,0,.10);
      border:1px solid rgba(15,23,42,.06);
      cursor:pointer;
      user-select:none;
    }
    .front{
      background:linear-gradient(145deg, #ffffff, #f1f5ff);
    }
    .back{
      transform:rotateY(180deg);
      background:linear-gradient(145deg, #ffffff, #f0fff8);
    }

    .svg{
      width:96px;
      height:96px;
      margin-bottom:10px;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .word{
      font-size:34px;
      font-weight:1000;
      letter-spacing:-.02em;
    }
    .tap{
      margin-top:10px;
      font-size:12px;
      font-weight:900;
      color:var(--muted);
    }
    .zh{
      font-size:44px;
      font-weight:1000;
      color:#0f766e;
      line-height:1.1;
    }
    .py{
      margin-top:6px;
      color:var(--muted);
      font-weight:800;
    }
    .phrase{
      margin-top:10px;
      color:#1f2937;
      font-weight:900;
      font-size:14px;
      opacity:.8;
    }

    /* Progress */
    .progress{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
      justify-content:center;
      margin-top:6px;
      color:var(--muted);
      font-weight:900;
    }
    .dots{
      display:flex;
      gap:8px;
      justify-content:center;
      margin-top:10px;
    }
    .dot{
      width:10px;
      height:10px;
      border-radius:999px;
      background:#e2e8f0;
      cursor:pointer;
      transition:transform .15s ease, background .15s ease;
    }
    .dot.active{
      background:var(--primary);
      transform:scale(1.25);
    }

    /* Quiz */
    .quiz{
      margin-top:14px;
      display:none;
    }
    .quiz-box{
      padding:16px;
      border-radius:22px;
      background:#fff;
      border:1px solid rgba(15,23,42,.06);
      box-shadow:0 10px 26px rgba(0,0,0,.08);
      text-align:center;
    }
    .quiz-prompt{
      font-size:28px;
      font-weight:1000;
      margin:8px 0 14px;
    }
    .grid2{
      display:grid;
      grid-template-columns: repeat(2, 1fr);
      gap:10px;
      margin-top:12px;
    }
    .option{
      padding:12px 12px;
      border-radius:16px;
      border:1px solid rgba(15,23,42,.10);
      background:#fff;
      cursor:pointer;
      font-weight:1000;
      transition:transform .15s ease, filter .15s ease, background .15s ease, border-color .15s ease;
    }
    .option:hover{ transform:translateY(-2px); filter:brightness(.99); }
    .option.good{ background:rgba(22,163,74,.08); border-color:rgba(22,163,74,.35); }
    .option.bad{ background:rgba(239,68,68,.08); border-color:rgba(239,68,68,.35); }

    /* Match */
    .match{
      margin-top:14px;
      display:none;
    }
    .match-box{
      padding:16px;
      border-radius:22px;
      background:#fff;
      border:1px solid rgba(15,23,42,.06);
      box-shadow:0 10px 26px rgba(0,0,0,.08);
    }
    .match-grid{
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap:12px;
      margin-top:12px;
    }
    .col{
      display:flex;
      flex-direction:column;
      gap:10px;
    }
    .m-btn{
      padding:12px 12px;
      border-radius:16px;
      border:1px solid rgba(15,23,42,.10);
      background:#fff;
      cursor:pointer;
      font-weight:1000;
      text-align:left;
      transition:transform .15s ease, background .15s ease, border-color .15s ease;
    }
    .m-btn:hover{ transform:translateY(-2px); }
    .m-btn.selected{ border-color:rgba(37,99,235,.55); background:rgba(37,99,235,.06); }
    .m-btn.matched{ border-color:rgba(22,163,74,.45); background:rgba(22,163,74,.06); cursor:default; }

    .feedback{
      min-height:24px;
      margin-top:10px;
      font-weight:1000;
    }
    .feedback.good{ color:var(--good); }
    .feedback.bad{ color:var(--bad); }

    /* Footer (like main) */
    footer{
      background:#0f172a;
      color:#e2e8f0;
      padding:40px 8%;
      text-align:center;
      font-size:14px;
      margin-top: 30px;
    }
    footer a{ color:#93c5fd; font-weight:700; }
    footer p{ margin:10px auto; max-width:980px; color:#cbd5e1; }

    @media (max-width: 992px){
      .navbar{ padding:12px 18px; }
      .wrap{ padding:36px 6% 60px; }
    }
    @media (max-width: 600px){
      body{ padding-top:104px; }
      .navbar{ padding:10px 14px; flex-wrap:wrap; }
      .navbar-right{ width:100%; justify-content:center; }
      .match-grid{ grid-template-columns:1fr; }
    }
  </style>
</head>

<body>
  <!-- NAV -->
  <header class="navbar">
    <div class="navbar-left">
      <img src="assets/img/logo.png" alt="LinguaLab Logo" class="nav-logo" />
      <span class="nav-title">LinguaLab</span>
    </div>

    <nav class="navbar-right" aria-label="Primary navigation">
      <a href="grammar.html">Grammar Magic</a>
      <a href="vocabulary.html">Word Bank</a>
      <a href="exercises.html">Fun Homework</a>
      <a href="parents.html">Wiki Parents</a>
    </nav>
  </header>

  <main class="wrap">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-top">
        <div>
          <h1>Word Bank — Unit 1: My Family 👨‍👩‍👧‍👦</h1>
          <p>Flashcards with listening 🔊 + mini quiz + matching game. Tap and learn!</p>
        </div>
        <div class="hero-badges">
          <span class="badge">🎧 Listening ON</span>
          <span class="badge" id="badgeProgress">📌 1 / 6</span>
          <span class="badge" id="badgeScore">⭐ Score: 0</span>
        </div>
      </div>

      <div class="bar">
        <div class="seg" aria-label="Modes">
          <button class="chip active" id="modeLearn" type="button">📖 Learn</button>
          <button class="chip" id="modeQuiz" type="button">🧩 Quiz</button>
          <button class="chip" id="modeMatch" type="button">🔗 Match</button>
        </div>

        <div class="stat" aria-label="Quick stats">
          <span id="statStars">Stars: ☆☆☆☆☆</span>
          <span id="statStreak">Streak: 0</span>
        </div>
      </div>
    </section>

    <!-- PANEL -->
    <section class="panel" aria-live="polite">
      <div class="panel-top">
        <div>
          <h2 class="panel-title" id="panelTitle">📖 Learn</h2>
          <div class="panel-sub" id="panelSub">Tap the card to flip. Use 🔊 to listen.</div>
        </div>

        <div class="panel-right">
          <button class="btn btn-ghost" id="btnPrev" type="button" aria-label="Previous">←</button>
          <button class="btn btn-primary" id="btnSpeak" type="button" aria-label="Listen">🔊 Listen</button>
          <button class="btn btn-ghost" id="btnNext" type="button" aria-label="Next">→</button>
        </div>
      </div>

      <!-- LEARN -->
      <section id="learnSection">
        <div class="card-wrap">
          <div class="flip" id="flipCard" aria-label="Flashcard">
            <div class="inner" id="inner">
              <div class="face front" id="frontFace" role="button" tabindex="0">
                <div class="svg" id="cardSvg"></div>
                <div class="word" id="enWord">Mommy</div>
                <div class="tap">Tap to flip ✨</div>
              </div>

              <div class="face back" id="backFace" role="button" tabindex="0">
                <div class="zh" id="zhWord">妈妈</div>
                <div class="py" id="pyWord">māma</div>
                <div class="word" style="font-size:22px; margin-top:8px;" id="enBack">Mommy</div>
                <div class="phrase" id="phrase">"I love my mommy!"</div>
                <div class="tap">Tap to flip
