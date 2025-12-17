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
