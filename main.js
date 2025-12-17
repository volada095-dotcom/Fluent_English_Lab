const coursesList = document.getElementById("courses-list");
const courseView = document.getElementById("course-view");
const courseTitle = document.getElementById("course-title");
const daysList = document.getElementById("days-list");
const dayContent = document.getElementById("day-content");
const backBtn = document.getElementById("back-btn");

/* ---------- COURSES SCREEN ---------- */

function getProgress(course) {
  const completed = Object.keys(course.lessons).length;
  return Math.floor((completed / 30) * 100);
}

function renderCourses() {
  coursesList.innerHTML = "";

  window.courses.forEach(course => {
    const progress = getProgress(course);

    const card = document.createElement("div");
    card.className = "course-card";

    card.innerHTML = `
      <h3>${course.title}</h3>

      <div class="progress-bar">
        <div class="progress" style="width:${progress}%"></div>
      </div>

      <p class="progress-text">${progress}% COMPLETE</p>

      <button class="course-btn">
        ${progress > 0 ? "Continue" : "Start Course"}
      </button>
    `;

    card.querySelector("button").onclick = () => openCourse(course);

    coursesList.appendChild(card);
  });
}

/* ---------- COURSE ---------- */

function openCourse(course) {
  coursesList.classList.add("hidden");
  courseView.classList.remove("hidden");

  courseTitle.textContent = course.title;
  daysList.innerHTML = "";
  dayContent.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Day ${i}`;

    if (course.lessons[i]) {
      btn.onclick = () => openDay(i, course);
    } else {
      btn.disabled = true;
    }

    daysList.appendChild(btn);
  }
}

function openDay(dayNumber, course) {
  const lesson = course.lessons[dayNumber];
  let html = `<h3>Day ${dayNumber}: ${lesson.title}</h3>`;

  if (lesson.videos) {
    lesson.videos.forEach(v => {
      html += `
        <iframe src="${v.url}" width="640" height="360" allowfullscreen></iframe>
      `;
    });
  }

  if (lesson.content) {
    html += `<div class="lesson-text">${lesson.content}</div>`;
  }

  if (lesson.exercises) {
    html += `<button onclick="startTest(${dayNumber}, '${course.id}')">Start Test</button>`;
  }

  dayContent.innerHTML = html;
}

backBtn.onclick = () => {
  courseView.classList.add("hidden");
  coursesList.classList.remove("hidden");
};

renderCourses();
