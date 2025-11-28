---
layout: default
title: Wiki Parents
---
{% raw %}
<style>
.nav-button {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  background-color: #6ca0dc; /* фон под Architect */
  color: white;              /* текст всегда белый */
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.accordion {
  background-color: #6ca0dc;
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
  border-left: 2px solid #6ca0dc;
  border-right: 2px solid #6ca0dc;
  border-bottom: 2px solid #6ca0dc;
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
<button class="accordion">Academic Papers</button>
<div class="panel">
  <ul>
    <li><a href="https://cyberleninka.ru/article/n/organizational-and-methodological-support-of-preschoolers-thinking-skills-development-during-problem-foreign-language-teaching/viewer"> Kartashova Valentina N., Volynkina Natalia V. (2021) ORGANIZATIONAL AND METHODOLOGICAL SUPPORT OF PRESCHOOLERS’ THINKING SKILLS DEVELOPMENT DURING PROBLEM FOREIGN LANGUAGE TEACHING</a></li>
    <li><a href="https://cyberleninka.ru/article/n/comprehension-of-idiomatic-expressions-by-russian-speaking-typically-developing-children/viewer"> by Eliseeva Nadezda N (2017) Comprehension of idiomatic expressions by Russian speaking typically developing children</a></li>
    <li><a href="https://srcd.onlinelibrary.wiley.com/doi/pdfdirect/10.1111/cdev.13575)">Philippine Courtier, Marie-Line Gardes (2021) Effects of Montessori Education on the Academic, Cognitive, and Social Development of Disadvantaged Preschoolers: A Randomized Controlled Study in the French Public‐School System</a></li>
    <li><a href="https://cyberleninka.ru/article/n/constructing-a-russian-language-version-of-the-international-early-reading-assessment-tool/viewer">Alina Ivanova (2019) Constructing a Russian-Language Version of the International Early Reading Assessment Tool</a></li>
    <li><a href="https://cyberleninka.ru/article/n/psihologicheskoe-razvitie-doshkolnikov-v-proektnoy-deyatelnosti-obzor-empiricheskih-issledovaniy/viewer">Плотникова В. А (2023) Психологическое развитие дошкольников в проектной деятельности: обзор эмпирических исследований</a></li>
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
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");

      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
</script>
{% endraw %}

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
