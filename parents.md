---
layout: default
title: Wiki Parents
---

<style>
.nav-button {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  background-color: #1f4e79; /* фон под Architect */
  color: white;              /* текст всегда белый */
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.accordion {
  background-color: #1f4e79;
  color: white;
  cursor: pointer;
  padding: 10px 15px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 16px;
  border-radius:5px;
  margin-bottom: 5px;
  transition: background-color 0.3s;
}

.accordion:hover {
  background-color: #163857;
}

.panel {
  padding: 10px 15px;
  display: none;
  background-color: #f4f8fb;
  border-left: 2px solid #1f4e79;
  border-right: 2px solid #1f4e79;
  border-bottom: 2px solid #1f4e79;
  border-radius: 0 0 5px 5px;
  margin-bottom: 10px;
}

  @media (max-width: 600px) {
  .nav-container {
    flex-direction: column; /* Кнопки в колонку */
    align-items: center;
  }
}
</style>

<h2>Reading Corner</h2>
<button class="accordion">Homework & Study</button>
<div class="panel">
  <ul>
    <li><a href="https://example.com/article1">How to support your child at home</a></li>
    <li><a href="https://example.com/article2">Effective English learning strategies</a></li>
  </ul>
</div>

<button class="accordion">Motivation & Engagement</button>
<div class="panel">
  <ul>
    <li><a href="https://example.com/article3">Fun ways to practice English</a></li>
    <li><a href="https://example.com/article4">Keeping children motivated</a></li>
  </ul>
</div>

<button class="accordion">Learning Routine</button>
<div class="panel">
  <ul>
    <li>Create a quiet and comfortable space</li>
    <li>Minimize distractions</li>
  </ul>
</div>

<script>
var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.style.display = (panel.style.display === "block") ? "none" : "block";
  });
}
</script>


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
