---
layout: default
title: LinguaLab
---

<!-- Навигация -->
<style>
/* Навигация Flex */
.nav-container {
  display: flex;
  justify-content: center; /* Центрируем кнопки по горизонтали */
  flex-wrap: wrap;         /* Перенос кнопок на новую строку при маленьком экране */
  margin-bottom: 20px;
}

/* Кнопки */
.nav-button {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  background-color: #1f4e79;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: transform 0.2s ease; /* только подъем при hover, без смены цвета */
}

/* Hover-эффект: только движение, без смены цвета */
.nav-button:hover {
  transform: translateY(-2px);
}

/* Медиазапрос для мобильных */
@media (max-width: 600px) {
  .nav-container {
    flex-direction: column; /* Кнопки в колонку */
    align-items: center;
  }
}
</style>

<div style="text-align: center; margin-bottom: 20px;">
  <a class="nav-button" href="grammar">Grammar Magic</a>
  <a class="nav-button" href="vocabulary">Word Bank</a>
  <a class="nav-button" href="exercises">Fun Homework</a>
  <a class="nav-button" href="parents">Wiki Parents</a>
</div>

# Welcome to LinguaLab!

LinguaLab is an **interactive website for learning English**. 

The goal of this project is to make learning English **simple, engaging, and enjoyable** for students.

---

## Quick Access Sections

- **Grammar Magic** – learn rules and examples  
- **Word Bank** – expand your vocabulary  
- **Fun Homework** – practice your skills with interactive quizzes  

---

## Tips

Parents can access a **special section with articles and guidance** on supporting their child’s English learning. This includes:

- Tips for practicing English at home  
- Advice on motivating children  
- Useful resources and exercises for parents to help their kids  

Click the **Wiki Parents** button above to explore this section.
