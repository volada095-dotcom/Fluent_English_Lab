const coursesList = document.getElementById("courses-list");
const courseView = document.getElementById("course-view");
const courseTitle = document.getElementById("course-title");
const daysList = document.getElementById("days-list");
const dayContent = document.getElementById("day-content");
const backBtn = document.getElementById("back-btn");

// Показ курсов
function renderCourses() {
  coursesList.innerHTML = "";
  window.courses.forEach(course => {
    const div = document.createElement("div");
    div.className = "course-card";
    div.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
    `;
    div.onclick = () => openCourse(course);
    coursesList.appendChild(div);
  });
}

// Открыть курс
function openCourse(course) {
  coursesList.classList.add("hidden");
  courseView.classList.remove("hidden");

  courseTitle.textContent = course.title;
  daysList.innerHTML = "";
  dayContent.innerHTML = "";

  course.days.forEach(d => {
    const btn = document.createElement("button");
    btn.textContent = `Day ${d.day}`;
    btn.onclick = () => openDay(d);
    daysList.appendChild(btn);
  });
}

// Открыть день
function openDay(day) {
  dayContent.innerHTML = `
    <h3>Day ${day.day}: ${day.title}</h3>
    ${day.content}
  `;
}

// Назад
backBtn.onclick = () => {
  courseView.classList.add("hidden");
  coursesList.classList.remove("hidden");
};

renderCourses();
