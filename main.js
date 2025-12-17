function openDay(dayNumber, course) {
  const lesson = course.lessons[dayNumber];

  let html = `<h3>Day ${dayNumber}: ${lesson.title}</h3>`;

  // 1️⃣ Видео
  if (lesson.videos) {
    lesson.videos.forEach(video => {
      html += `
        <div class="video-block">
          <iframe 
            src="${video.url}" 
            width="640" 
            height="360" 
            allowfullscreen>
          </iframe>
        </div>
      `;
    });
  }

  // 2️⃣ Текст под видео
  if (lesson.content) {
    html += `<div class="lesson-text">${lesson.content}</div>`;
  }

  // 3️⃣ Кнопка теста
  if (lesson.exercises) {
    html += `
      <button onclick="startTest(${dayNumber}, '${course.id}')">
        Start Test
      </button>
    `;
  }

  dayContent.innerHTML = html;
}
function startTest(dayNumber, courseId) {
  const course = window.courses.find(c => c.id === courseId);
  const lesson = course.lessons[dayNumber];
  const exercise = lesson.exercises[0];

  let html = `<h3>${exercise.name}</h3>`;

  exercise.questions.forEach((q, index) => {
    html += `
      <div class="question">
        <p>${index + 1}. ${q.question}</p>
        <input type="text" id="q${index}">
      </div>
    `;
  });

  html += `<button onclick="checkAnswers(${dayNumber}, '${courseId}')">Check answers</button>`;

  dayContent.innerHTML = html;
}
function checkAnswers(dayNumber, courseId) {
  const course = window.courses.find(c => c.id === courseId);
  const lesson = course.lessons[dayNumber];
  const exercise = lesson.exercises[0];

  let correct = 0;

  exercise.questions.forEach((q, index) => {
    const userAnswer = document.getElementById(`q${index}`).value.trim().toLowerCase();
    const correctAnswer = q.answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      correct++;
    }
  });

  alert(`Result: ${correct} / ${exercise.questions.length}`);
}

