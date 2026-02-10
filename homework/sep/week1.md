---
layout: default
title: September — Week 1
---

# Unit 1: My family

Home Practice for Kids｜課後練習
## Greetings Practice 打招呼練習

Practice saying “Hi” and “Please sit down.”
Ask your child to sit down and greet you.
Use a puppet or toy — let the child take the puppet and say “Hi!”
Repeat until the child can say it naturally.

中文：
練習說 Hi 和 Please sit down。
請孩子坐好， 和他/她互相打招呼。
用手偶或玩具示範， 讓孩子接過手偶並說 Hi！
重複練習直到孩子能自然地說出口。


## Task:

Say a word to your child: “daddy” or “mommy.”
Your child must show the correct flashcard and say the line from the song:
“Good morning, daddy.”
“Good morning, mommy.”

中文：
請家長說一個單詞：daddy 或 mommy
孩子要舉起正確的單詞卡， 並唱出歌曲中的句子：
“Good morning, daddy.”
“Good morning, mommy.”

給孩子多多鼓勵喔！

## Stand Up and Sing 起立唱歌練習

Play the sing-along version.
Tell your child: “Stand up, please.”
Sing and do the gestures together.
Focus on fun, not perfection.

中文：
播放跟唱版歌曲。
對孩子說：Stand up, please
一起唱歌做動作。
不需要要求完全正確， 重點是好玩＋有參與。


## Topic Vocabulary
- family
- daddy
- mommy

<h2>🧩 Let's play a game</h2>
<p>Find: 爸爸</p>

<div id="letters"></div>
<p id="result"></p>

<button onclick="restart()">Play one more time?</button>

<script>
const correct = "daddy";
let current = "";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function render() {
  const container = document.getElementById("letters");
  container.innerHTML = "";
  shuffle(correct.split("")).forEach(l => {
    const btn = document.createElement("button");
    btn.textContent = l;
    btn.style.margin = "5px";
    btn.onclick = () => addLetter(l);
    container.appendChild(btn);
  });
}

function addLetter(l) {
  current += l;
  if (current.length > correct.length) {
    current = "";
    document.getElementById("result").innerText = "It's pk, try again!";
    return;
  }
  if (current === correct) {
    document.getElementById("result").innerHTML =
      "🎉 Правильно! <br><a href='https://t.me/YourBotUsername' target='_blank'>Получить награду в Telegram 🎁</a>";
  } else {
    document.getElementById("result").innerText = current;
  }
}

function restart() {
  current = "";
  document.getElementById("result").innerText = "";
  render();
}

render();
</script>



<audio controls>
  <source src="/lingualab/homework/sep/Track 3.mp3" type="audio/mpeg">
</audio>
<audio controls>
  <source src="/lingualab/homework/sep/Track 4.mp3" type="audio/mpeg">
</audio>

---

<a href="/lingualab/exercises">← Back to Homework</a>
