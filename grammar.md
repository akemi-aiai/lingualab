<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Grammar Magic — LinguaLab</title>

  <meta name="description" content="Grammar Magic — bright grammar games with listening for kids 4–7." />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap" rel="stylesheet" />

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
      padding-top:86px;
    }
    a{ color:inherit; text-decoration:none; }
    a:focus-visible, button:focus-visible{
      outline:3px solid rgba(37,99,235,.45);
      outline-offset:3px;
      border-radius:14px;
    }

    /* NAV (same vibe as main) */
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
      position:relative;
      overflow:hidden;
      border-radius:24px;
      background:linear-gradient(135deg,#2563eb,#7c3aed);
      color:#fff;
      padding: 30px 26px;
      box-shadow:0 14px 34px rgba(0,0,0,.12);
    }
    .hero::after{
      content:"";
      position:absolute;
      inset:-40px -40px auto auto;
      width:220px;
      height:220px;
      border-radius:50%;
      background:rgba(255,255,255,.12);
      filter: blur(0px);
      transform: rotate(10deg);
    }
    .hero-top{
      display:flex;
      justify-content:space-between;
      gap:14px;
      flex-wrap:wrap;
      align-items:flex-start;
    }
    .hero h1{
      margin:0 0 10px;
      font-size:clamp(26px,3vw,40px);
      line-height:1.12;
      letter-spacing:-.02em;
    }
    .hero p{
      margin:0;
      max-width:820px;
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
      user-select:none;
      white-space:nowrap;
    }

    /* Controls */
    .controls{
      margin-top:14px;
      display:flex;
      gap:12px;
      flex-wrap:wrap;
      align-items:center;
      justify-content:space-between;
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
      transition: transform .18s ease, filter .18s ease, background .18s ease;
      user-select:none;
    }
    .chip:hover{ transform:translateY(-2px); filter:brightness(.98); }
    .chip.active{
      background:var(--accent);
      color:#fff;
    }

    .mode-btn{
      border:0;
      cursor:pointer;
      font-weight:900;
      border-radius:16px;
      padding:12px 14px;
      background:rgba(255,255,255,.18);
      color:#fff;
      transition: transform .18s ease, filter .18s ease, background .18s ease;
      user-select:none;
      display:inline-flex;
      align-items:center;
      gap:10px;
    }
    .mode-btn:hover{ transform:translateY(-2px); filter:brightness(.98); }
    .mode-btn.active{
      background:rgba(255,255,255,.30);
    }

    /* Game panel */
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
    }

    .score{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      align-items:center;
      justify-content:flex-end;
      font-weight:1000;
    }
    .score span{
      background:#f1f5f9;
      border-radius:999px;
      padding:8px 12px;
      font-size:12px;
      white-space:nowrap;
    }

    /* Big cards for kids */
    .cards{
      margin-top:14px;
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap:12px;
    }
    .big-card{
      border:0;
      cursor:pointer;
      background:#fff;
      border-radius:20px;
      padding:14px 14px 16px;
      box-shadow:0 10px 24px rgba(0,0,0,.08);
      border:1px solid rgba(15,23,42,.06);
      transition: transform .16s ease, box-shadow .16s ease, background .16s ease;
      text-align:left;
      position:relative;
      overflow:hidden;
      min-height:130px;
    }
    .big-card:hover{ transform:translateY(-3px); box-shadow:0 14px 28px rgba(0,0,0,.12); }
    .big-card .emoji{
      font-size:34px;
      line-height:1;
      margin-bottom:10px;
    }
    .big-card .txt{
      font-size:16px;
      font-weight:1000;
      line-height:1.2;
    }
    .big-card .hint{
      margin-top:8px;
      color:var(--muted);
      font-size:13px;
      font-weight:800;
    }

    .big-card.good{
      background: rgba(22,163,74,.06);
      border-color: rgba(22,163,74,.22);
    }
    .big-card.bad{
      background: rgba(239,68,68,.06);
      border-color: rgba(239,68,68,.22);
    }

    /* Prompt */
    .prompt{
      margin-top:14px;
      font-size:18px;
      font-weight:1000;
      display:flex;
      gap:10px;
      align-items:center;
      flex-wrap:wrap;
    }
    .prompt .bubble{
      display:inline-flex;
      align-items:center;
      gap:10px;
      background: #eef2ff;
      padding:10px 12px;
      border-radius:16px;
      font-weight:1000;
    }

    /* Build area */
    .build-wrap{
      margin-top:12px;
      display:grid;
      grid-template-columns: 1fr;
      gap:12px;
    }

    .built{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      padding:12px;
      border:2px dashed rgba(37,99,235,.25);
      border-radius:18px;
      min-height:62px;
      align-items:center;
      background:#fafcff;
    }
    .slot-hint{
      color:var(--muted);
      font-weight:900;
      font-size:14px;
    }

    .tile-row{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
    }
    .tile{
      border:0;
      cursor:pointer;
      background:#fff;
      border-radius:16px;
      padding:12px 14px;
      font-weight:1000;
      box-shadow:0 10px 22px rgba(0,0,0,.08);
      border:1px solid rgba(15,23,42,.06);
      transition: transform .14s ease, filter .14s ease;
      user-select:none;
    }
    .tile:hover{ transform:translateY(-2px); filter:brightness(.99); }

    .tile.small{
      padding:10px 12px;
      border-radius:14px;
      box-shadow:none;
      border:1px solid rgba(15,23,42,.08);
      background:#fff;
    }

    /* Buttons */
    .row-actions{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin-top:8px;
    }
    .btn{
      border:0;
      cursor:pointer;
      border-radius:16px;
      padding:12px 14px;
      font-weight:1000;
      transition: transform .16s ease, filter .16s ease, background .16s ease;
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

    .feedback{
      min-height:24px;
      font-weight:1000;
      margin-top:10px;
      font-size:16px;
    }
    .feedback.good{ color:var(--good); }
    .feedback.bad{ color:var(--bad); }

    /* Stars (reward) */
    .stars{
      display:inline-flex;
      gap:6px;
      align-items:center;
      margin-left:6px;
    }
    .star{
      width:18px; height:18px;
      border-radius:6px;
      background:#e2e8f0;
      display:inline-block;
      position:relative;
      overflow:hidden;
    }
    .star.on{
      background: #fde047;
      box-shadow: 0 6px 18px rgba(253,224,71,.45);
      animation: pop .18s ease-out;
    }
    @keyframes pop{
      from{ transform: scale(.9); }
      to{ transform: scale(1); }
    }

    /* Footer (same vibe as main) */
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

    /* Mobile */
    @media (max-width: 992px){
      .navbar{ padding:12px 18px; }
      .wrap{ padding:36px 6% 60px; }
      .cards{ grid-template-columns: 1fr; }
    }
    @media (max-width: 600px){
      body{ padding-top:104px; }
      .navbar{ padding:10px 14px; flex-wrap:wrap; }
      .navbar-right{ width:100%; justify-content:center; }
      .hero{ padding: 24px 18px; }
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
    <section class="hero" aria-label="Grammar Magic">
      <div class="hero-top">
        <div>
          <h1>Grammar Magic ✨</h1>
          <p>Bright mini games for kids (4–5). Tap, listen, choose, and build tiny sentences.</p>
        </div>

        <div class="hero-badges" aria-label="Rewards">
          <span class="badge">Listening ON</span>
          <span class="badge">Stars: <span class="stars" id="stars"></span></span>
        </div>
      </div>

      <div class="controls" aria-label="Controls">
        <div class="seg" aria-label="Topics">
          <button class="chip active" data-topic="today">Today</button>
          <button class="chip" data-topic="yesterday">Yesterday</button>
          <button class="chip" data-topic="if"> If</button>
        </div>

        <div class="seg" aria-label="Modes">
          <button class="mode-btn active" data-mode="listen">Listen & Tap</button>
          <button class="mode-btn" data-mode="choose">Choose</button>
          <button class="mode-btn" data-mode="build">Build</button>
        </div>
      </div>
    </section>

    <!-- GAME PANEL -->
    <section class="panel" aria-live="polite">
      <div class="panel-top">
        <div>
          <h2 class="panel-title" id="panelTitle">Listen & Tap</h2>
          <div class="panel-sub" id="panelSub">Tap a card — it will speak. Great for 4–5 years.</div>
        </div>
        <div class="score">
          <span id="topicBadge">Topic: TODAY</span>
          <span id="scoreBadge">Score: 0</span>
          <span id="streakBadge">Streak: 0</span>
        </div>
      </div>

      <!-- Prompt -->
      <div class="prompt" id="prompt">
        <span class="bubble">Tap a card!</span>
      </div>

      <!-- LISTEN/CHOOSE cards -->
      <div class="cards" id="cards"></div>

      <!-- BUILD mode UI -->
      <div class="build-wrap" id="buildArea" style="display:none;">
        <div class="prompt">
          <span class="bubble">🪄 Build a sentence!</span>
          <button class="btn btn-light" id="btnBuildListen" type="button">Listen</button>
        </div>

        <div class="built" id="built">
          <span class="slot-hint" id="builtHint">Tap tiles to add words here…</span>
        </div>

        <div class="tile-row" id="tiles"></div>

        <div class="row-actions">
          <button class="btn btn-accent" id="btnCheckBuild" type="button">Check</button>
          <button class="btn btn-light" id="btnClearBuild" type="button">Clear</button>
          <button class="btn btn-dark" id="btnNextBuild" type="button">Next</button>
        </div>
      </div>

      <div class="row-actions" id="commonActions">
        <button class="btn btn-primary" id="btnListen" type="button">Listen</button>
        <button class="btn btn-dark" id="btnNext" type="button">Next</button>
        <button class="btn btn-light" id="btnReset" type="button">Reset</button>
      </div>

      <div class="feedback" id="feedback"></div>
    </section>

    <div style="display:flex; justify-content:center; margin-top:20px;">
      <a class="btn btn-dark" href="/lingualab/" style="text-decoration:none;">← Back to the Lab</a>
    </div>
  </main>

  <footer>
    <p>© 2026 LinguaLab. All Rights Reserved.</p>
    <p>
      <a href="privacy.html">Privacy Policy</a> |
      <a href="terms.html">Terms of Use</a>
    </p>
    <p>
      All educational materials, design, and content are protected by copyright law. Unauthorized copying,
      distribution, or reproduction is prohibited. Some ideas and exercises are inspired by <strong>TOT Longman®</strong>.
      All content on this site is original. TOT Longman® is a registered trademark. We do not claim ownership of TOT Longman materials.
    </p>
  </footer>

  <script>
    // ---------- Data (very simple for 4–5) ----------
    const BANK = {
      today: [
        {
          emoji: "🐶",
          say: "He goes to school.",
          correct: "He goes to school.",
          wrong: ["He go to school.", "He going to school."],
          build: ["He","goes","to","school"],
          tips: "goes (with he/she)"
        },
        {
          emoji: "🍎",
          say: "I like apples.",
          correct: "I like apples.",
          wrong: ["I likes apples.", "I liking apples."],
          build: ["I","like","apples"],
          tips: "I like…"
        },
        {
          emoji: "🎈",
          say: "She plays every day.",
          correct: "She plays every day.",
          wrong: ["She play every day.", "She playing every day."],
          build: ["She","plays","every","day"],
          tips: "plays (with she)"
        }
      ],
      yesterday: [
        {
          emoji: "⚽️",
          say: "I played yesterday.",
          correct: "I played yesterday.",
          wrong: ["I play yesterday.", "I playing yesterday."],
          build: ["I","played","yesterday"],
          tips: "played = yesterday"
        },
        {
          emoji: "🎬",
          say: "We watched a movie.",
          correct: "We watched a movie.",
          wrong: ["We watch a movie.", "We watches a movie."],
          build: ["We","watched","a","movie"],
          tips: "watched (past)"
        },
        {
          emoji: "🏠",
          say: "He went home.",
          correct: "He went home.",
          wrong: ["He goed home.", "He goes home."],
          build: ["He","went","home"],
          tips: "went (not goed)"
        }
      ],
      if: [
        {
          emoji: "☔️",
          say: "If it rains, I take an umbrella.",
          correct: "If it rains, I take an umbrella.",
          wrong: ["If it rains, I takes an umbrella.", "If it rains, I took an umbrella."],
          build: ["If","it","rains,","I","take","an","umbrella"],
          tips: "If… I take…"
        },
        {
          emoji: "😴",
          say: "If you are tired, you sleep.",
          correct: "If you are tired, you sleep.",
          wrong: ["If you are tired, you sleeps.", "If you are tired, you sleeping."],
          build: ["If","you","are","tired,","you","sleep"],
          tips: "are (you are)"
        },
        {
          emoji: "🍪",
          say: "If I am hungry, I eat.",
          correct: "If I am hungry, I eat.",
          wrong: ["If I hungry, I eat.", "If I am hungry, I eats."],
          build: ["If","I","am","hungry,","I","eat"],
          tips: "I am…"
        }
      ]
    };

    // ---------- State ----------
    let topic = "today";
    let mode = "listen"; // listen | choose | build
    let score = 0;
    let streak = 0;
    let stars = 0;       // reward (0..5)
    let current = null;

    // Build state
    let builtWords = [];

    // ---------- Elements ----------
    const elTopicBadge = document.getElementById("topicBadge");
    const elScore = document.getElementById("scoreBadge");
    const elStreak = document.getElementById("streakBadge");
    const elTitle = document.getElementById("panelTitle");
    const elSub = document.getElementById("panelSub");
    const elPrompt = document.getElementById("prompt");
    const elCards = document.getElementById("cards");
    const elFeedback = document.getElementById("feedback");
    const elStars = document.getElementById("stars");

    const elCommonActions = document.getElementById("commonActions");
    const btnListen = document.getElementById("btnListen");
    const btnNext = document.getElementById("btnNext");
    const btnReset = document.getElementById("btnReset");

    const elBuildArea = document.getElementById("buildArea");
    const elBuilt = document.getElementById("built");
    const elBuiltHint = document.getElementById("builtHint");
    const elTiles = document.getElementById("tiles");
    const btnBuildListen = document.getElementById("btnBuildListen");
    const btnCheckBuild = document.getElementById("btnCheckBuild");
    const btnClearBuild = document.getElementById("btnClearBuild");
    const btnNextBuild = document.getElementById("btnNextBuild");

    // ---------- Helpers ----------
    function pick(){
      const arr = BANK[topic];
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function speak(text){
      try{
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        u.rate = 0.92; // a bit slower for kids
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }catch(e){}
    }

    function setBadges(){
      elTopicBadge.textContent = "Topic: " + topic.toUpperCase();
      elScore.textContent = "Score: " + score;
      elStreak.textContent = "Streak: " + streak;
    }

    function setFeedback(text, kind){
      elFeedback.textContent = text;
      elFeedback.className = "feedback " + (kind || "");
    }

    function addStar(){
      stars = Math.min(5, stars + 1);
      renderStars();
    }

    function resetStars(){
      stars = 0;
      renderStars();
    }

    function renderStars(){
      elStars.innerHTML = "";
      for(let i=0;i<5;i++){
        const s = document.createElement("span");
        s.className = "star" + (i < stars ? " on" : "");
        elStars.appendChild(s);
      }
    }

    // ---------- Render modes ----------
    function render(){
      setBadges();
      setFeedback("", "");

      current = pick();

      // shared listen button always reads "correct" version
      btnListen.onclick = () => speak(current.say);

      if(mode === "listen"){
        elTitle.textContent = "Listen & Tap";
        elSub.textContent = "Tap a card — it will speak. No pressure, just listening!";
        elBuildArea.style.display = "none";
        elCommonActions.style.display = "flex";

        elPrompt.innerHTML = `<span class="bubble"> Tap a card!</span> <span class="bubble"> ${current.tips}</span>`;
        renderListenCards();
      }

      if(mode === "choose"){
        elTitle.textContent = "Choose the Right One";
        elSub.textContent = "Pick the correct sentence. Win stars!";
        elBuildArea.style.display = "none";
        elCommonActions.style.display = "flex";

        elPrompt.innerHTML = `<span class="bubble">${current.emoji} Choose!</span> <span class="bubble">💡 ${current.tips}</span>`;
        renderChooseCards();
      }

      if(mode === "build"){
        elTitle.textContent = "Build a Sentence";
        elSub.textContent = "Tap tiles to build. Then check";
        elCommonActions.style.display = "none";
        elBuildArea.style.display = "grid";

        elPrompt.innerHTML = ""; // build has its own prompt
        startBuild();
      }
    }

    function renderListenCards(){
      elCards.innerHTML = "";
      // In listen mode, cards are the correct sentence + two simple variants (still clickable)
      const texts = [current.correct, ...current.wrong];
      // Keep order stable for small kids: correct in the middle
      const ordered = [texts[1], texts[0], texts[2]];

      ordered.forEach((t)=>{
        const card = document.createElement("button");
        card.type = "button";
        card.className = "big-card";
        card.innerHTML = `
          <div class="emoji">${current.emoji}</div>
          <div class="txt">${t}</div>
          <div class="hint">Tap to listen</div>
        `;
        card.onclick = () => {
          speak(t);
          card.animate([{transform:"scale(1)"},{transform:"scale(1.03)"},{transform:"scale(1)"}], {duration:180});
        };
        elCards.appendChild(card);
      });
    }

    function renderChooseCards(){
      elCards.innerHTML = "";

      // 3 options: 1 correct + 2 wrong
      const options = [current.correct, ...current.wrong];

      // Shuffle a bit (but not too chaotic)
      const shuffled = options
        .map(v => ({ v, r: Math.random() }))
        .sort((a,b)=>a.r-b.r)
        .map(x=>x.v);

      shuffled.forEach((t)=>{
        const card = document.createElement("button");
        card.type = "button";
        card.className = "big-card";
        card.innerHTML = `
          <div class="emoji">${current.emoji}</div>
          <div class="txt">${t}</div>
          <div class="hint">Tap one</div>
        `;

        card.onclick = () => {
          // lock
          [...elCards.querySelectorAll("button")].forEach(b=> b.disabled = true);

          if(t === current.correct){
            card.classList.add("good");
            score += 1;
            streak += 1;
            addStar();
            setFeedback("Great job!", "good");
            speak(current.correct);
          }else{
            card.classList.add("bad");
            streak = 0;
            setFeedback("Oops! Listen and try again.", "bad");
            speak(current.correct);

            // show correct one too
            [...elCards.querySelectorAll("button")].forEach(b=>{
              const txt = b.querySelector(".txt")?.textContent || "";
              if(txt === current.correct) b.classList.add("good");
            });
          }
          setBadges();
        };

        elCards.appendChild(card);
      });
    }

    function startBuild(){
      // new build question
      current = pick();
      builtWords = [];

      btnBuildListen.onclick = () => speak(current.say);

      renderBuilt();
      renderTiles();

      setBadges();
      setFeedback("", "");
    }

    function renderBuilt(){
      elBuilt.innerHTML = "";

      if(builtWords.length === 0){
        const hint = document.createElement("span");
        hint.className = "slot-hint";
        hint.textContent = "Tap tiles to add words here…";
        elBuilt.appendChild(hint);
        return;
      }

      builtWords.forEach((w, idx)=>{
        const t = document.createElement("button");
        t.type = "button";
        t.className = "tile small";
        t.textContent = w;
        t.title = "Tap to remove";
        t.onclick = () => {
          builtWords.splice(idx, 1);
          renderBuilt();
        };
        elBuilt.appendChild(t);
      });
    }

    function renderTiles(){
      elTiles.innerHTML = "";

      // create tiles in random order (fun)
      const tiles = current.build
        .map(v => ({ v, r: Math.random() }))
        .sort((a,b)=>a.r-b.r)
        .map(x=>x.v);

      tiles.forEach((w)=>{
        const t = document.createElement("button");
        t.type = "button";
        t.className = "tile";
        t.textContent = w;
        t.onclick = () => {
          builtWords.push(w);
          renderBuilt();
        };
        elTiles.appendChild(t);
      });

      btnClearBuild.onclick = () => {
        builtWords = [];
        renderBuilt();
        setFeedback("", "");
      };

      btnNextBuild.onclick = () => startBuild();

      btnCheckBuild.onclick = () => {
        const built = builtWords.join(" ").replace(/\s+/g," ").trim();
        const target = current.build.join(" ").replace(/\s+/g," ").trim();

        if(built === target){
          score += 1;
          streak += 1;
          addStar();
          setBadges();
          setFeedback("Perfect!", "good");
          speak(current.say);
          // tiny celebration
          elBuilt.animate([{transform:"scale(1)"},{transform:"scale(1.03)"},{transform:"scale(1)"}], {duration:200});
        }else{
          streak = 0;
          setBadges();
          setFeedback("❌ Not yet. Tap 🔊 and try again!", "bad");
          speak(current.say);
        }
      };
    }

    // ---------- Mode/Topic switching ----------
    function setTopic(newTopic){
      topic = newTopic;
      document.querySelectorAll(".chip").forEach(b=>{
        b.classList.toggle("active", b.dataset.topic === newTopic);
      });
      render();
    }

    function setMode(newMode){
      mode = newMode;
      document.querySelectorAll(".mode-btn").forEach(b=>{
        b.classList.toggle("active", b.dataset.mode === newMode);
      });
      render();
    }

    // Chips
    document.querySelectorAll(".chip").forEach(btn=>{
      btn.addEventListener("click", ()=> setTopic(btn.dataset.topic));
    });

    // Modes
    document.querySelectorAll(".mode-btn").forEach(btn=>{
      btn.addEventListener("click", ()=> setMode(btn.dataset.mode));
    });

    // Common actions
    btnNext.addEventListener("click", ()=> render());
    btnReset.addEventListener("click", ()=>{
      score = 0; streak = 0;
      resetStars();
      setBadges();
      render();
    });

    // ---------- Init ----------
    renderStars();
    setTopic("today");
    setMode("listen");
  </script>
</body>
</html>
