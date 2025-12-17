function openCourse(course) {
  coursesList.classList.add("hidden");
  courseView.classList.remove("hidden");

  courseTitle.textContent = course.title;
  daysList.innerHTML = "";
  dayContent.innerHTML = "";

  const totalDays = 30;

  for (let i = 1; i <= totalDays; i++) {
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
