/**
 * MindStormer Global Academy (MSA-500)
 * Student Dashboard Interactive Logic & Formative Metric Controls
 * Location: assets/js/dashboard.js
 */

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    animateAssessmentProgress();
    enrichCourseDeepLinks();
  });
}

/**
 * Smoothly animates continuous assessment and curriculum progress bars
 */
function animateAssessmentProgress() {
  if (typeof document === 'undefined') return;
  const progressBars = document.querySelectorAll('[role="progressbar"] > div:last-child, [data-progress-val]');

  progressBars.forEach((bar) => {
    const targetWidth = bar.getAttribute('data-progress-val') || bar.style.width || (bar.classList.value.match(/w-\[(\d+%)\]/) ? bar.classList.value.match(/w-\[(\d+%)\]/)[1] : null);
    if (targetWidth) {
      bar.style.width = '0%';
      bar.style.transition = 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

      requestAnimationFrame(() => {
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 100);
      });
    }
  });
}

/**
 * Non-blocking accessible toast notification utility for enterprise alerts
 * @param {string} message - Notification text
 * @param {'info'|'success'|'warning'} type - Semantic notification level
 */
function showEnterpriseToast(message, type = 'info') {
  if (typeof document === 'undefined') return;
  let container = document.getElementById('msa-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'msa-toast-container';
    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', 'System Notifications');
    container.setAttribute('aria-live', 'polite');
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const borderColors = {
    info: 'border-blue-600 bg-[#0F172A] text-white',
    success: 'border-emerald-600 bg-[#0F172A] text-white',
    warning: 'border-amber-500 bg-[#0F172A] text-white'
  };

  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border-l-4 shadow-xl text-xs font-semibold max-w-sm transition-all duration-300 transform translate-y-2 opacity-0 ${borderColors[type] || borderColors.info}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * Enriches dashboard course links with active section parameters if not present
 */
function enrichCourseDeepLinks() {
  if (typeof document === 'undefined') return;
  const courseLinks = document.querySelectorAll('.msa-btn-resume, [data-course-id]');
  courseLinks.forEach((link) => {
    const activeSection = link.getAttribute('data-active-section');
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;

    if (activeSection && !href.includes('section=')) {
      const separator = href.includes('?') ? '&' : '?';
      link.setAttribute('href', `${href}${separator}section=${encodeURIComponent(activeSection)}`);
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    animateAssessmentProgress,
    showEnterpriseToast,
    enrichCourseDeepLinks
  };
}
