---
layout: default
title: Word Bank
---

# Word Bank

Welcome to your Word Bank! Here you can find all the key vocabulary for our units. Review, practice, and play with the words to make learning English fun and easy.

{% raw %}
<style>
/* Сетка для всех Unit */
.unit-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

/* Кнопки-юниты */
.unit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1f4e79, #3a6ea5); /* архитектурная палитра */
  color: white;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  border-radius: 15px;
  text-decoration: none;
  aspect-ratio: 1/1; /* квадрат */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  cursor: pointer;
}

/* Эффект наведения */
.unit-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 12px 25px rgba(0,0,0,0.25);
  background: linear-gradient(135deg, #3a6ea5, #1f4e79);
}

/* Адаптивность */
@media (max-width: 800px) {
  .unit-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .unit-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="unit-grid">
  <a href="/homework/unit1" class="unit-button">Unit 1</a>
  <a href="/homework/unit2" class="unit-button">Unit 2</a>
  <a href="/homework/unit3" class="unit-button">Unit 3</a>
  <a href="/homework/unit4" class="unit-button">Unit 4</a>
  <a href="/homework/unit5" class="unit-button">Unit 5</a>
  <a href="/homework/unit6" class="unit-button">Unit 6</a>
  <a href="/homework/unit7" class="unit-button">Unit 7</a>
  <a href="/homework/unit8" class="unit-button">Unit 8</a>
  <a href="/homework/unit9" class="unit-button">Unit 9</a>
  <a href="/homework/unit10" class="unit-button">Unit 10</a>
  <a href="/homework/unit11" class="unit-button">Unit 11</a>
  <a href="/homework/unit12" class="unit-button">Unit 12</a>
  <a href="/homework/unit13" class="unit-button">Unit 13</a>
  <a href="/homework/unit14" class="unit-button">Unit 14</a>
  <a href="/homework/unit15" class="unit-button">Unit 15</a>
  <a href="/homework/unit16" class="unit-button">Unit 16</a>
  <a href="/homework/unit17" class="unit-button">Unit 17</a>
  <a href="/homework/unit18" class="unit-button">Unit 18</a>
  <a href="/homework/unit19" class="unit-button">Unit 19</a>
  <a href="/homework/unit20" class="unit-button">Unit 20</a>
</div>
{% endraw %}

---

<!-- Кнопка назад -->
<div style="text-align: center; margin-top: 20px;">
  <a href="/lingualab/" style="
    display: inline-block;
    padding: 10px 20px;
    background-color: #1f4e79;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  " onmouseover="this.style.backgroundColor='#163857'" onmouseout="this.style.backgroundColor='#1f4e79'">
    Back to the Lab
  </a>
</div>

