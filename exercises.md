---
layout: default
title: Fun Homework
---

# Fun Homework

Here you can find exercises.

{% raw %}
<style>
/* Общая сетка календаря */
.calendar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 40px;
}

/* Карточка месяца */
.month-card {
  background: #1f4e79;
  padding: 25px;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

/* Ховер эффект */
.month-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}

/* Панель недель */
.weeks {
  display: none;
  background: #ffffff;
  border-radius: 15px;
  margin-top: 10px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
}

/* Сетка для недель */
.week-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Карточка недели */
.week-box {
  background: #f4f8fb;
  padding: 12px;
  border-left: 4px solid #1f4e79;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
}

.winter { background: linear-gradient(135deg, #7DA9D6, #A7C7E7); }
.spring { background: linear-gradient(135deg, #95D5B2, #B7E4C7); }
.summer { background: linear-gradient(135deg, #FFD24C, #FFE69A); }
.autumn { background: linear-gradient(135deg, #E76F51, #F4A261); }
</style>

<div class="calendar">...</div>
  <!-- January -->
  <div>
    <div class="month-card winter" onclick="toggleWeeks('jan')">January</div>
    <div id="jan" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>


  <!-- February -->
  <div>
    <div class="month-card winter" onclick="toggleWeeks('feb')">February</div>
    <div id="feb" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- March -->
  <div>
    <div class="month-card spring" onclick="toggleWeeks('mar')">March</div>
    <div id="mar" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- April -->
  <div>
    <div class="month-card spring" onclick="toggleWeeks('apr')">April</div>
    <div id="apr" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- May -->
  <div>
    <div class="month-card spring" onclick="toggleWeeks('may')">May</div>
    <div id="may" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- June -->
  <div>
    <div class="month-card summer" onclick="toggleWeeks('jun')">June</div>
    <div id="jun" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- July -->
  <div>
    <div class="month-card summer" onclick="toggleWeeks('jul')">July</div>
    <div id="jul" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- August -->
  <div>
    <div class="month-card summer" onclick="toggleWeeks('aug')">August</div>
    <div id="aug" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- September -->
  <div>
    <div class="month-card autumn" onclick="toggleWeeks('sep')">September</div>
    <div id="sep" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- October -->
  <div>
    <div class="month-card autumn" onclick="toggleWeeks('oct')">October</div>
    <div id="oct" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- November -->
  <div>
    <div class="month-card autumn" onclick="toggleWeeks('nov')">November</div>
    <div id="nov" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>

  <!-- December -->
  <div>
    <div class="month-card winter" onclick="toggleWeeks('dec')">December</div>
    <div id="dec" class="weeks">
      <div class="week-grid">
        <a class="week-box" href="/homework/january/week1">Week 1</a>
        <a class="week-box" href="/homework/january/week2">Week 2</a>
        <a class="week-box" href="/homework/january/week3">Week 3</a>
        <a class="week-box" href="/homework/january/week4">Week 4</a>
      </div>
    </div>
  </div>


<script>
function toggleWeeks(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === "block" ? "none" : "block";
}
</script>
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
