---
layout: default
title: Grammar Magic
---

<style>
  :root{
    --primary:#2563eb;
    --accent:#f97316;
    --bg:#f8fafc;
    --card:#ffffff;
    --text:#0f172a;
    --muted:#64748b;
    --navy:#1f4e79;
    --radius:18px;
  }

  *{ box-sizing:border-box; }
  .wrap{
    max-width:1100px;
    margin:0 auto;
    padding:44px 8% 70px;
  }

  /* HERO */
  .hero{
    background:linear-gradient(135deg,#2563eb,#7c3aed);
    color:#fff;
    border-radius:24px;
    padding:32px 26px;
    box-shadow:0 14px 34px rgba(0,0,0,.12);
  }
  .hero h1{
    margin:0 0 10px;
    font-size:clamp(26px,3vw,38px);
    line-height:1.15;
    letter-spacing:-.02em;
  }
  .hero p{
    margin:0;
    max-width:820px;
    color:rgba(255,255,255,.92);
    font-size:16px;
    line-height:1.6;
  }

  /* ACTION BUTTONS */
  .actions{
    display:flex;
    flex-wrap:wrap;
    gap:12px;
    margin-top:18px;
  }
  .btn{
    border:0;
    cursor:pointer;
    font-weight:800;
    border-radius:999px;
    padding:12px 16px;
    background:rgba(255,255,255,.18);
    color:#fff;
    transition:transform .18s ease, background .18s ease, filter .18s ease;
    user-select:none;
  }
  .btn:hover{ transform:translateY(-2px); filter:brightness(.98); }
  .btn:focus-visible{
    outline:3px solid rgba(255,255,255,.55);
    outline-offset:3px;
  }
  .btn.primary{
    background:var(--accent);
    color:#fff;
  }

  /* GRID */
  .section-title{
    margin:24px 0 12px;
    font-size:18px;
    font-weight:900;
    color:var(--text);
  }
  .grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:16px;
    margin-top:10px;
  }
  .card{
    background:var(--card);
    border-radius:var(--radius);
    padding:16px 16px 14px;
    box-shadow:0 6px 24px rgba(0,0,0,.06);
    border:1px solid rgba(15,23,42,.06);
    transition:transform .2s ease, box-shadow .2s ease;
  }
  .card:hover{
    transform:translateY(-4px);
    box-shadow:0 12px 34px rgba(0,0,0,.10);
  }
  .badge{
    display:inline-flex;
    align-items:center;
    gap:8px;
    padding:6px 10px;
    border-radius:999px;
    font-size:12px;
    font-weight:900;
    background:rgba(37,99,235,.10);
    color:var(--primary);
    margin-bottom:10px;
  }
  .card h3{
    margin:0 0 6px;
    font-size:16px;
    line-height:1.3;
    color:var(--text);
  }
  .card p{
    margin:0 0 10px;
    font-size:14px;
    color:var(--muted);
    line-height:1.5;
  }
  .meta{
    display:flex;
    flex-wrap:wrap;
    gap:8px;
  }
  .pill{
    font-size:12px;
    font-weight:800;
    color:#334155;
    background:#f1f5f9;
    padding:6px 10px;
    border-radius:999px;
  }
  .card-btns{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    margin-top:10px;
  }
  .mini{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    gap:8px;
    padding:10px 12px;
    border-radius:14px;
    font-weight:900;
    border:1px solid rgba(15,23,42,.08);
    background:#fff;
    color:var(--text);
    cursor:pointer;
    transition:transform .18s ease, background .18s ease;
  }
  .mini:hover{ transform:translateY(-2px); background:#f8fafc; }
  .mini:focus-visible{
    outline:3px solid rgba(37,99,235,.35);
    outline-offset:3px;
  }

  /* GAME PANEL */
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
    align-items:flex-start;
    justify-content:space-between;
    gap:14px;
    flex-wrap:wrap;
  }
  .panel h2{
    margin:0;
    font-size:18px;
    font-weight:900;
    color:var(--text);
  }
  .panel p{
    margin:6px 0 0;
    color:var(--muted);
    font-size:14px;
  }
  .score{
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    align-items:center;
    font-weight:900;
    color:#0f172a;
  }
  .score span{
    background:#f1f5f9;
    border-radius:999px;
    padding:8px 12px;
    font-size:12px;
  }
  .game{
    margin-top:14px;
    display:grid;
    grid-template-columns: 1fr;
    gap:12px;
  }
  .prompt{
    font-size:16px;
    font-weight:900;
    color:var(--text);
  }
  .choices{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:10px;
  }
  .choice{
    padding:14px 12px;
    border-radius:16px;
    border:1px solid rgba(15,23,42,.10);
    background:#fff;
    cursor:pointer;
    font-weight:900;
    transition:transform .18s ease, background .18s ease, border-color .18s ease;
  }
  .choice:hover{ transform:translateY(-2px); background:#f8fafc; }
  .choice.correct{
    border-color: rgba(34,197,94,.55);
    background: rgba(34,197,94,.08);
  }
  .choice.wrong{
    border-color: rgba(239,68,68,.55);
    background: rgba(239,68,68,.08);
  }

  .feedback{
    min-height:22px;
    font-weight:900;
  }

  .panel-actions{
    display:flex;
    gap:10px;
    flex-wrap:wrap;
    margin-top:6px;
  }
  .secondary{
    background:#0f172a;
    color:#fff;
    border:0;
    padding:10px 14px;
    border-radius:14px;
    font-weight:900;
    cursor:pointer;
    transition:transform .18s ease, filter .18s ease;
  }
  .secondary:hover{ transform:translateY(-2px); filter:brightness(.98); }
  .secondary:focus-visible{
    outline:3px solid rgba(37,99,235,.35);
    outline-offset:3px;
  }

  /* BACK */
  .back{
    display:flex;
    justify-content:center;
    margin-top:22px;
  }
  .back a{
    display:inline-block;
    padding:12px 18px;
    background:var(--navy);
    color:#fff;
    border-radius:14px;
    font-weight:900;
    transition:transform .18s ease, background .18s ease;
  }
  .back a:hover{ transform:translateY(-2px); background:#163857; }
  .back a:focus-visible{
    outline:3px solid rgba(37,99,235,.35);
    outline-offset:3px;
  }

  @media (max-width: 992px){
    .wrap{ padding:36px 6% 60px; }
    .grid{ grid-template-columns:repeat(2,1fr); }
    .choices{ grid-template-columns:1fr; }
  }
  @media (max-width: 600px){
    .grid{ grid-template-columns:1fr; }
    .hero{ padding:26px 18px; }
  }
</style>

<div class="wrap">

  <section class="hero" aria-label="Grammar Magic">
    <h1>Grammar Magic</h1>
    <p>
      Tiny grammar games for kids (4–7). Tap, listen, choose, and build sentences — simple and fun.
    </p>

    <div class="actions" aria-label="Quick actions">
      <button class="btn primary" id="btnPlay">🎮 Let’s Play</button>
      <button class="btn" id="btnListen">🔊 Listen</button>
      <button class="btn" id="btnBuild">🪄 Build</button>
      <button class="btn" id="btnMatch">🧩 Match</button>
      <button class="btn" id="btnFix">🐣 Fix</button>
    </div>
  </section>

  <h2 class="section-title">Choose a topic</h2>

  <section class="grid" aria-label="Grammar topics">

    <article class="card">
      <div class="badge">✨ Talk About Today</div>
      <h3>Present Tense</h3>
      <p>Daily routines: “I like…”, “She goes…”.</p>
      <div class="meta">
        <span class="pill">A1</span><span class="pill">5 min</span><span class="pill">Kids 4–7</span>
      </div>
      <div class="card-btns">
        <button class="mini" data-mode="choose" data-topic="present">🎯 Choose</button>
        <button class="mini" data-mode="build" data-topic="present">🪄 Build</button>
        <button class="mini" data-mode="listen" data-topic="present">🔊 Listen</button>
      </div>
    </article>

    <article class="card">
      <div class="badge">📖 Yesterday Story</div>
      <h3>Past Tense</h3>
      <p>Yesterday stories: “I played…”, “We watched…”.</p>
      <div class="meta">
        <span class="pill">A1–A2</span><span class="pill">6 min</span><span class="pill">Stories</span>
      </div>
      <div class="card-btns">
        <button class="mini" data-mode="choose" data-topic="past">🎯 Choose</button>
        <button class="mini" data-mode="build" data-topic="past">🪄 Build</button>
        <button class="mini" data-mode="listen" data-topic="past">🔊 Listen</button>
      </div>
    </article>

    <article class="card">
      <div class="badge">🌟 If… Then Game</div>
      <h3>If Game (Conditionals)</h3>
      <p>Simple “If… then…” logic with fun examples.</p>
      <div class="meta">
        <span class="pill">A2</span><span class="pill">7 min</span><span class="pill">Logic</span>
      </div>
      <div class="card-btns">
        <button class="mini" data-mode="choose" data-topic="if">🎯 Choose</button>
        <button class="mini" data-mode="build" data-topic="if">🪄 Build</button>
        <button class="mini" data-mode="listen" data-topic="if">🔊 Listen</button>
      </div>
    </article>

  </section>

  <section class="panel" aria-live="polite">
    <div class="panel-top">
      <div>
        <h2 id="panelTitle">🎮 Let’s Play</h2>
        <p id="panelDesc">Tap “Let’s Play” to start. Choose the correct sentence.</p>
      </div>

      <div class="score" aria-label="Score">
        <span id="topicBadge">Topic: Mixed</span>
        <span id="scoreBadge">Score: 0</span>
        <span id="streakBadge">Streak: 0</span>
      </div>
    </div>

    <div class="game">
      <div class="prompt" id="prompt">Ready?</div>

      <div class="choices" id="choices" aria-label="Answer choices">
        <!-- buttons inserted by JS -->
      </div>

      <div class="feedback" id="feedback"></div>

      <div class="panel-actions">
        <button class="secondary" id="btnNext">Next ▶</button>
        <button class="secondary" id="btnReset">Reset ↺</button>
      </div>
    </div>
  </section>

  <div class="back">
    <a href="/lingualab/">← Back to the Lab</a>
  </div>

</div>

<script>
  // Simple kid-friendly grammar game: Choose the correct sentence
  const BANK = {
    present: [
      { prompt: "Choose the correct sentence:", choices: ["He go to school.", "He goes to school.", "He going to school."], correct: 1 },
      { prompt: "Choose the correct sentence:", choices: ["I likes apples.", "I like apples.", "I liking apples."], correct: 1 },
      { prompt: "Choose the correct sentence:", choices: ["She play every day.", "She plays every day.", "She playing every day."], correct: 1 }
    ],
    past: [
      { prompt: "Choose the correct sentence:", choices: ["I play yesterday.", "I played yesterday.", "I playing yesterday."], correct: 1 },
      { prompt: "Choose the correct sentence:", choices: ["We watch a movie.", "We watched a movie.", "We watches a movie."], correct: 1 },
      { prompt: "Choose the correct sentence:", choices: ["He goed home.", "He went home.", "He goes home."], correct: 1 }
    ],
    if: [
      { prompt: "Choose the correct sentence:", choices: ["If it rains, I take an umbrella.", "If it rains, I takes an umbrella.", "If it rains, I took an umbrella."], correct: 0 },
      { prompt: "Choose the correct sentence:", choices: ["If I am hungry, I eat.", "If I hungry, I eat.", "If I am hungry, I eats."], correct: 0 },
      { prompt: "Choose the correct sentence:", choices: ["If you are tired, you sleep.", "If you are tired, you sleeps.", "If you are tired, you sleeping."], correct: 0 }
    ]
  };

  // State
  let mode = "choose";          // choose | listen | build | match | fix (we’ll keep choose interactive now)
  let topic = "mixed";          // present | past | if | mixed
  let score = 0;
  let streak = 0;
  let current = null;

  const elTitle = document.getElementById("panelTitle");
  const elDesc = document.getElementById("panelDesc");
  const elPrompt = document.getElementById("prompt");
  const elChoices = document.getElementById("choices");
  const elFeedback = document.getElementById("feedback");
  const elTopicBadge = document.getElementById("topicBadge");
  const elScoreBadge = document.getElementById("scoreBadge");
  const elStreakBadge = document.getElementById("streakBadge");

  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickQuestion(){
    const keys = topic === "mixed" ? Object.keys(BANK) : [topic];
    const t = keys[Math.floor(Math.random()*keys.length)];
    const q = BANK[t][Math.floor(Math.random()*BANK[t].length)];
    return { ...q, topic: t };
  }

  function setBadges(){
    const label = topic === "mixed" ? "Mixed" : topic.toUpperCase();
    elTopicBadge.textContent = "Topic: " + label;
    elScoreBadge.textContent = "Score: " + score;
    elStreakBadge.textContent = "Streak: " + streak;
  }

  function clearChoiceClasses(){
    [...elChoices.querySelectorAll("button")].forEach(b=>{
      b.classList.remove("correct","wrong");
      b.disabled = false;
    });
  }

  function renderQuestion(){
    current = pickQuestion();
    elFeedback.textContent = "";
    elPrompt.textContent = current.prompt;

    // Build choice buttons
    elChoices.innerHTML = "";
    const order = current.choices.map((text, idx)=>({text, idx}));
    // Keep order stable for kids (no shuffle) — you can enable shuffle if you want:
    // const final = shuffle(order);
    const final = order;

    final.forEach((c)=>{
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.type = "button";
      btn.textContent = c.text;
      btn.addEventListener("click", ()=>onChoose(c.idx, btn));
      elChoices.appendChild(btn);
    });

    setBadges();
  }

  function onChoose(chosenIdx, btn){
    const buttons = [...elChoices.querySelectorAll("button")];
    buttons.forEach(b=> b.disabled = true);

    const isCorrect = chosenIdx === current.correct;
    if(isCorrect){
      btn.classList.add("correct");
      score += 1;
      streak += 1;
      elFeedback.textContent = "✅ Great job!";
    }else{
      btn.classList.add("wrong");
      streak = 0;
      elFeedback.textContent = "❌ Try again next time!";
      // highlight correct
      const correctBtn = buttons[current.correct];
      if(correctBtn) correctBtn.classList.add("correct");
    }
    setBadges();
  }

  function setPanel(modeName, topicName){
    mode = modeName;
    topic = topicName || "mixed";

    const prettyTopic = topic === "mixed" ? "Mixed" : topic.toUpperCase();

    if(mode === "choose"){
      elTitle.textContent = "🎯 Choose the Right One";
      elDesc.textContent = "Pick the best sentence. Quick and fun!";
    }else if(mode === "listen"){
      elTitle.textContent = "🔊 Listen Mode";
      elDesc.textContent = "Tap a sentence to hear it (browser voice).";
    }else if(mode === "build"){
      elTitle.textContent = "🪄 Build a Sentence";
      elDesc.textContent = "Coming next: drag words to build a sentence.";
    }else if(mode === "match"){
      elTitle.textContent = "🧩 Match";
      elDesc.textContent = "Coming next: match words to pictures.";
    }else if(mode === "fix"){
      elTitle.textContent = "🐣 Fix the Sentence";
      elDesc.textContent = "Coming next: find and fix the mistake.";
    }

    elTopicBadge.textContent = "Topic: " + prettyTopic;

    // For now interactive game is choose; listen uses speech synthesis on click
    renderQuestion();
    if(mode === "listen"){
      enableListenMode();
    }
  }

  function speak(text){
    try{
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.95;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }catch(e){
      // no-op
    }
  }

  function enableListenMode(){
    const buttons = [...elChoices.querySelectorAll("button")];
    buttons.forEach((b)=>{
      b.disabled = false;
      b.onclick = () => speak(b.textContent);
    });
    elFeedback.textContent = "Tap any sentence to listen 🔊";
  }

  // Top hero buttons
  document.getElementById("btnPlay").addEventListener("click", ()=>setPanel("choose","mixed"));
  document.getElementById("btnListen").addEventListener("click", ()=>setPanel("listen","mixed"));
  document.getElementById("btnBuild").addEventListener("click", ()=>setPanel("build","mixed"));
  document.getElementById("btnMatch").addEventListener("click", ()=>setPanel("match","mixed"));
  document.getElementById("btnFix").addEventListener("click", ()=>setPanel("fix","mixed"));

  // Card mini buttons
  document.querySelectorAll(".mini").forEach((btn)=>{
    btn.addEventListener("click", ()=>{
      const m = btn.getAttribute("data-mode");
      const t = btn.getAttribute("data-topic");
      setPanel(m, t);
      window.scrollTo({ top: document.querySelector(".panel").offsetTop - 20, behavior:"smooth" });
    });
  });

  // Panel buttons
  document.getElementById("btnNext").addEventListener("click", ()=>{
    if(mode === "listen"){
      renderQuestion();
      enableListenMode();
    }else{
      renderQuestion();
    }
  });

  document.getElementById("btnReset").addEventListener("click", ()=>{
    score = 0;
    streak = 0;
    renderQuestion();
    if(mode === "listen") enableListenMode();
  });

  // Initial
  setPanel("choose","mixed");
</script>
