/**
 * MindStormer Global Academy (MSA-500)
 * Guardian Portal Dynamic Student Selector & Performance Engine
 * Location: assets/js/parent.js
 */

const studentData = {
  student_g2: {
    id: "g2_101",
    name: "Tobi O. (Grade 2)",
    grade: "Grade 2 Module Track • Academic Term 2026/2027",
    tierName: "Foundational Tier (Primary 1–3)",
    tierClass: "bg-amber-50 text-amber-800 border-amber-300",
    avgScore: "85.0%",
    gateStatus: "Cleared ✓",
    gateClass: "text-emerald-700",
    caScore: "36.0 / 40",
    examScore: "49.0 / 60",
    transcriptUrl: "templates/report-card-template.html?student=student_g2"
  },
  student_g5: {
    id: "g5_204",
    name: "Maya O. (Grade 5)",
    grade: "Grade 5 Module Track • Academic Term 2026/2027",
    tierName: "Intermediate Tier (Primary 4–6)",
    tierClass: "bg-blue-50 text-blue-800 border-blue-300",
    avgScore: "80.5%",
    gateStatus: "Cleared ✓",
    gateClass: "text-emerald-700",
    caScore: "34.5 / 40",
    examScore: "46.0 / 60",
    transcriptUrl: "templates/report-card-template.html?student=student_g5"
  },
  student_g7: {
    id: "g7_309",
    name: "Alex O. (Grade 7)",
    grade: "Grade 7 (Junior Secondary 1) • Academic Term 2026/2027",
    tierName: "Junior Secondary (JSS 1–3)",
    tierClass: "bg-purple-50 text-purple-800 border-purple-300",
    avgScore: "92.0%",
    gateStatus: "Cleared ✓",
    gateClass: "text-emerald-700",
    caScore: "38.0 / 40",
    examScore: "54.0 / 60",
    transcriptUrl: "templates/report-card-template.html?student=student_g7"
  },
  alex: {
    id: "g7_309",
    name: "Alex O. (Grade 7)",
    grade: "Grade 7 (Junior Secondary 1) • Academic Term 2026/2027",
    tierName: "Junior Secondary (JSS 1–3)",
    tierClass: "bg-purple-50 text-purple-800 border-purple-300",
    avgScore: "92.0%",
    gateStatus: "Cleared ✓",
    gateClass: "text-emerald-700",
    caScore: "38.0 / 40",
    examScore: "54.0 / 60",
    transcriptUrl: "templates/report-card-template.html?student=alex"
  },
  maya: {
    id: "g5_204",
    name: "Maya O. (Grade 5)",
    grade: "Grade 5 Module Track • Academic Term 2026/2027",
    tierName: "Intermediate Tier (Primary 4–6)",
    tierClass: "bg-blue-50 text-blue-800 border-blue-300",
    avgScore: "80.5%",
    gateStatus: "Cleared ✓",
    gateClass: "text-emerald-700",
    caScore: "34.5 / 40",
    examScore: "46.0 / 60",
    transcriptUrl: "templates/report-card-template.html?student=maya"
  }
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const selector = document.querySelector('[data-student-selector]');
    if (selector) {
      selector.addEventListener('change', (e) => {
        const selectedKey = e.target.value;
        if (studentData[selectedKey]) {
          updateParentView(studentData[selectedKey]);
        }
      });

      // Initialize with selected value
      if (studentData[selector.value]) {
        updateParentView(studentData[selector.value]);
      }
    }
  });
}

function updateParentView(data) {
  const nameEl = document.querySelector('[data-student-name]');
  const gradeEl = document.querySelector('[data-student-grade]');
  const tierEl = document.querySelector('[data-student-tier]');
  const avgEl = document.querySelector('[data-student-avg]');
  const gateEl = document.querySelector('[data-student-gate]');
  const caEl = document.querySelector('[data-student-ca]');
  const examEl = document.querySelector('[data-student-exam]');
  const transcriptLink = document.querySelector('[data-transcript-link]');

  if (nameEl) nameEl.textContent = data.name;
  if (gradeEl) gradeEl.textContent = data.grade;
  if (avgEl) avgEl.textContent = data.avgScore;
  if (gateEl) {
    gateEl.textContent = data.gateStatus;
    gateEl.className = `text-2xl font-black ${data.gateClass} mt-0.5`;
  }
  if (caEl) caEl.textContent = data.caScore;
  if (examEl) examEl.textContent = data.examScore;

  if (tierEl) {
    tierEl.textContent = data.tierName;
    tierEl.className = `border text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-wider ${data.tierClass}`;
  }

  if (transcriptLink) {
    if (transcriptLink.dataset.baseUrl) {
      transcriptLink.href = `${transcriptLink.dataset.baseUrl}?student_id=${data.id}`;
    } else {
      transcriptLink.href = data.transcriptUrl;
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { studentData, updateParentView };
}