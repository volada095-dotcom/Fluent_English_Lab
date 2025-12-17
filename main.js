const coursesContainer = document.getElementById("courses");
const lessonSection = document.getElementById("lesson");
const lessonContent = document.getElementById("lesson-content");
const nextBtn = document.getElementById("next-day");

let currentCourse = null;
let currentDay = 1;

function getProgress(id) {
  return JSON.parse(localStorage.getItem(id)) || { day: 1 };
}

function saveProgress(id, day) {
  localStorage.setItem(id, JSON.stringify({ day }));
}

function renderCourses() {
  coursesContainer.innerHTML = "";

  courses.forEach(course => {
    const progress = getProgress(course.id);
    const percent = Math.floor((progress.day - 1) / course.days * 100);

    const card = document.createElement("div");
    card.className = "course-card";

    card.innerHTML = `
      <h2>${course.title}</h2>
      <div class="progress"><div style="width:${percent}%"></div></div>
      <p>${percent}% complete</p>
      <button>${progress.day > 1 ? "Continue" : "Start Course"}</button>
    `;

    card.querySelector("button").onclick = () => {
      openLesson(course, progress.day);
    };

    coursesContainer.appendChild(card);
  });
}

function openLesson(course, day) {
  currentCourse = course;
  currentDay = day;

  coursesContainer.style.display = "none";
  lessonSection.style.display = "block";

  const lesson = course.lessons[day];
  if (!lesson) {
    alert("Course completed 🎉");
    goBack();
    return;
  }

  lessonContent.innerHTML = `
    <h2>${lesson.title}</h2>
    <p>${lesson.content}</p>
    <iframe src="${lesson.video}" allowfullscreen></iframe>
  `;

  saveProgress(course.id, day);
}

nextBtn.onclick = () => {
  openLesson(currentCourse, currentDay + 1);
};

function goBack() {
  lessonSection.style.display = "none";
  coursesContainer.style.display = "flex";
  renderCourses();
}

renderCourses();
