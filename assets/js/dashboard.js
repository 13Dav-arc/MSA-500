/**
 * Student Dashboard Interactive Logic
 * Location: assets/js/dashboard.js
 */

document.addEventListener('DOMContentLoaded', () => {
  animateXPBars();
  initBadgeHoverEffects();
});

function animateXPBars() {
  const progressBars = document.querySelectorAll('[data-progress-val]');

  progressBars.forEach((bar) => {
    const targetWidth = bar.getAttribute('data-progress-val') || '0%';
    bar.style.width = '0%';
    bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';

    requestAnimationFrame(() => {
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 150);
    });
  });
}

function initBadgeHoverEffects() {
  const badges = document.querySelectorAll('[data-badge]');

  badges.forEach((badge) => {
    badge.addEventListener('click', () => {
      const badgeTitle = badge.getAttribute('data-badge-title') || 'Achievement Badge';
      const badgeDesc = badge.getAttribute('data-badge-desc') || 'Keep completing modules to level up!';
      alert(`🏆 ${badgeTitle}\n${badgeDesc}`);
    });
  });
}