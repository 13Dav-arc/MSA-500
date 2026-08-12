/**
 * Parent Portal Dynamic Selector Logic
 * Location: assets/js/parent.js
 */

const studentData = {
  alex: {
    name: "Alex O.",
    avgScore: "84.5%",
    streak: "7 Days Active 🔥",
    caScore: "35.2 / 40",
    examScore: "49.3 / 60"
  },
  maya: {
    name: "Maya O.",
    avgScore: "91.2%",
    streak: "12 Days Active 🔥",
    caScore: "38.5 / 40",
    examScore: "52.7 / 60"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.querySelector('[data-student-selector]');
  if (selector) {
    selector.addEventListener('change', (e) => {
      const selectedKey = e.target.value;
      if (studentData[selectedKey]) {
        updateParentView(studentData[selectedKey]);
      }
    });
  }
});

function updateParentView(data) {
  const nameEl = document.querySelector('[data-student-name]');
  const avgEl = document.querySelector('[data-student-avg]');
  const streakEl = document.querySelector('[data-student-streak]');
  const caEl = document.querySelector('[data-student-ca]');
  const examEl = document.querySelector('[data-student-exam]');

  if (nameEl) nameEl.textContent = data.name;
  if (avgEl) avgEl.textContent = data.avgScore;
  if (streakEl) streakEl.textContent = data.streak;
  if (caEl) caEl.textContent = data.caScore;
  if (examEl) examEl.textContent = data.examScore;
}