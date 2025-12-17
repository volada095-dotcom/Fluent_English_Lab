// ====== ДОСТУП К ЭЛЕМЕНТАМ ======
const coursesContainer = document.getElementById("courses");
const lessonPage = document.getElementById("lesson-page");
const lessonBox = document.getElementById("lesson");
const daysList = document.getElementById("days-list");
const nextBtn = document.getElementById("next-btn");

// ====== ДАННЫЕ ======
let currentCourse = null;
let currentDay = 1;

// ====== LOCAL STORAGE ======
function getProgress(courseId) {
  const data = localStorage.getItem(courseId);
  return data ? JSON.parse(data) : { day: 1 };
}

function saveProgress(courseId, day) {
  local
