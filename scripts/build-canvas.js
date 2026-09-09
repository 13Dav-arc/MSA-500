const fs = require('fs');
const path = require('path');

// 1. Icon Definitions per Discipline with Tier-Graduated Stroke & Geometry
const icons = {
  'basic-science': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M26 12h12M32 12v12l10 18a4 4 0 01-3.5 6H25.5A4 4 0 0122 42l10-18V12" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="28" cy="38" r="3" fill="currentColor"/>
      <circle cx="36" cy="42" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-sky-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(30 32 32)" stroke="currentColor" stroke-opacity="0.7"/>
      <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(-30 32 32)" stroke="currentColor" stroke-opacity="0.7"/>
      <circle cx="32" cy="32" r="5" fill="currentColor"/>
      <circle cx="46" cy="24" r="2.5" fill="currentColor"/>
      <circle cx="18" cy="40" r="2.5" fill="currentColor"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-sky-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(30 32 32)"/>
      <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(-30 32 32)"/>
      <ellipse cx="32" cy="32" rx="26" ry="10" transform="rotate(90 32 32)"/>
      <circle cx="32" cy="32" r="5" fill="currentColor"/>
      <circle cx="48" cy="22" r="2" fill="currentColor"/>
      <circle cx="16" cy="42" r="2" fill="currentColor"/>
      <circle cx="32" cy="8" r="2" fill="currentColor"/>
    </svg>`
  },

  'basic-technology': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor" fill-opacity="0.2"/>
      <path d="M32 10v6M32 48v6M10 32h6M48 32h6M17 17l4.5 4.5M42.5 42.5l4.5 4.5M17 47l4.5-4.5M42.5 21.5l4.5-4.5"/>
      <circle cx="32" cy="32" r="5" fill="currentColor"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-blue-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="28" r="10" fill="currentColor" fill-opacity="0.15"/>
      <path d="M28 12v6M28 38v6M12 28h6M38 28h6M17 17l4 4M35 35l4 4M17 39l4-4M35 21l4-4"/>
      <circle cx="44" cy="44" r="6"/>
      <path d="M44 34v4M44 50v4M34 44h4M50 44h4"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-blue-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l4 6 7-2 1 7 7 2-2 7 6 4-4 6 2 7-7 1-1 7-7-2-4 6-4-6-7 2-1-7-7-2 2-7-6-4 4-6-2-7 7-1 1-7 7 2 4-6z" fill="currentColor" fill-opacity="0.15"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 20v24M20 32h24"/>
    </svg>`
  },

  'computer-studies': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="32" rx="6" fill="currentColor" fill-opacity="0.2"/>
      <path d="M24 44v8h16v-8M16 52h32"/>
      <circle cx="24" cy="28" r="3" fill="currentColor"/>
      <circle cx="40" cy="28" r="3" fill="currentColor"/>
      <path d="M28 34c1.5 2 6.5 2 8 0"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-cyan-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="10" width="48" height="34" rx="4" fill="currentColor" fill-opacity="0.15"/>
      <path d="M8 36h48M22 44l-4 10h28l-4-10M20 22l6 5-6 5M30 32h10"/>
      <circle cx="48" cy="18" r="2" fill="currentColor"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-cyan-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="14" width="36" height="36" rx="4" fill="currentColor" fill-opacity="0.15"/>
      <path d="M22 14V8M32 14V8M42 14V8M22 56v-6M32 56v-6M42 56v-6M14 22H8M14 32H8M14 42H8M56 22h-6M56 32h-6M56 42h-6"/>
      <rect x="24" y="24" width="16" height="16" rx="2"/>
      <path d="M28 32h8M32 28v8"/>
    </svg>`
  },

  'physical-health-education': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 16c-6-10-18-4-18 6 0 12 18 24 18 24s18-12 18-24c0-10-12-16-18-6z" fill="currentColor" fill-opacity="0.25"/>
      <path d="M20 32h6l4-8 5 14 4-6h5"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-teal-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l18 8v16c0 14-18 24-18 24S14 46 14 32V16l18-8z" fill="currentColor" fill-opacity="0.15"/>
      <path d="M18 32h6l4-8 6 16 4-10 4 4h4"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-teal-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="14" r="6"/>
      <path d="M20 30l8-4 4 10-6 18M32 26l8-4 8 10M36 36l6 18"/>
      <path d="M12 44h10l4-6 6 12 4-6h12" stroke-opacity="0.6"/>
    </svg>`
  },

  'civic-education': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12L12 24h40L32 12z" fill="currentColor" fill-opacity="0.25"/>
      <path d="M18 24v22M32 24v22M46 24v22M12 46h40M8 52h48"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-emerald-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10L10 22h44L32 10zM14 22v24M23 22v24M32 22v24M41 22v24M50 22v24M10 46h44M8 52h48"/>
      <circle cx="32" cy="16" r="2.5" fill="currentColor"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-emerald-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10v44M16 22h32M16 22l-6 12a6 6 0 0012 0l-6-12zM48 22l-6 12a6 6 0 0012 0l-6-12z" fill="currentColor" fill-opacity="0.2"/>
      <path d="M22 54h20"/>
    </svg>`
  },

  'social-studies': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22" fill="currentColor" fill-opacity="0.2"/>
      <path d="M10 32h44M32 10a28 28 0 010 44M32 10a28 28 0 000 44"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-emerald-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <ellipse cx="32" cy="32" rx="12" ry="24"/>
      <path d="M8 32h48M14 18h36M14 46h36"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-emerald-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <path d="M32 10v44M10 32h44"/>
      <circle cx="20" cy="24" r="4" fill="currentColor"/>
      <circle cx="44" cy="24" r="4" fill="currentColor"/>
      <circle cx="32" cy="44" r="4" fill="currentColor"/>
      <path d="M20 24l12 20 12-20"/>
    </svg>`
  },

  'security-education': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10L14 18v16c0 14 18 20 18 20s18-6 18-20V18L32 10z" fill="currentColor" fill-opacity="0.25"/>
      <circle cx="32" cy="30" r="4" fill="currentColor"/>
      <path d="M32 34v6"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-emerald-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8L12 16v18c0 16 20 22 20 22s20-6 20-22V16L32 8z"/>
      <rect x="25" y="28" width="14" height="12" rx="3" fill="currentColor" fill-opacity="0.2"/>
      <path d="M28 28v-4a4 4 0 018 0v4"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-emerald-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8L12 16v18c0 16 20 22 20 22s20-6 20-22V16L32 8z"/>
      <path d="M24 32l6 6 12-12"/>
    </svg>`
  },

  'religious-studies': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22c8-4 16-4 20 2 4-6 12-6 20-2v26c-8-4-16-4-20 2-4-6-12-6-20-2V22z" fill="currentColor" fill-opacity="0.25"/>
      <path d="M32 24v26M32 10v6M24 13l4 3M40 13l-4 3"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-emerald-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 20c8-4 18-4 22 2 4-6 14-6 22-2v30c-8-4-18-4-22 2-4-6-14-6-22-2V20z"/>
      <path d="M32 22v30M32 8v6M22 11l4 3M42 11l-4 3"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-emerald-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22c8-4 16-4 20 2 4-6 12-6 20-2v26c-8-4-16-4-20 2-4-6-12-6-20-2V22z"/>
      <path d="M32 24v26"/>
      <path d="M32 8v6M20 12l4 4M44 12l-4 4"/>
    </svg>`
  },

  'agricultural-science': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 52V26M32 26c0-8 8-14 16-14 0 10-6 16-16 14zM32 36c0-8-8-12-14-12 0 10 6 14 14 12z" fill="currentColor" fill-opacity="0.25"/>
      <path d="M18 52h28"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-purple-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 54V24M32 24c0-8 8-14 18-14 0 10-6 18-18 14zM32 34c0-8-8-12-16-12 0 10 6 16 16 12zM32 44c0-6 6-10 14-10 0 8-5 12-14 10zM18 54h28"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-purple-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 54V20"/>
      <path d="M32 20c0-6 8-10 14-10-1 8-6 12-14 10zM32 28c0-6-8-10-14-10 1 8 6 12 14 10zM32 36c0-6 8-10 14-10-1 8-6 12-14 10zM32 44c0-6-8-10-14-10 1 8 6 12 14 10z" fill="currentColor" fill-opacity="0.2"/>
      <path d="M16 54h32"/>
    </svg>`
  },

  'home-economics': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 30l18-14 18 14v20a4 4 0 01-4 4H18a4 4 0 01-4-4V30z" fill="currentColor" fill-opacity="0.25"/>
      <path d="M26 50V34h12v16"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-fuchsia-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28l20-16 20 16v24a4 4 0 01-4 4H16a4 4 0 01-4-4V28z"/>
      <path d="M26 56V36h12v20M24 24h16M32 18v6"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-fuchsia-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 28l18-14 18 14v22a4 4 0 01-4 4H18a4 4 0 01-4-4V28z"/>
      <circle cx="32" cy="34" r="6" fill="currentColor" fill-opacity="0.2"/>
      <path d="M28 44h8"/>
    </svg>`
  },

  'mathematics': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 18h12M24 12v12M36 18h12M18 42h12M36 38l12 12M48 38L36 50"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-blue-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16h40M12 16l24 20-24 12h40M42 36l10 10M52 36L42 46"/>
      <circle cx="20" cy="48" r="1.5" fill="currentColor"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-blue-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 16h36M14 16l22 18-22 14h36"/>
      <path d="M40 34l8 8M48 34l-8 8M32 10v4M22 52v4"/>
    </svg>`
  },

  'english-studies': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20c8-4 16-4 20 2 4-6 12-6 20-2v24c-8-4-16-4-20 2-4-6-12-6-20-2V20z" fill="currentColor" fill-opacity="0.25"/>
      <path d="M32 22v26M22 28h4M40 28h4"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-sky-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 16h36M14 26h28M14 36h36M14 46h24" stroke-opacity="0.5"/>
      <path d="M42 12l12 12-24 26H18v-12L42 12z"/>
      <path d="M38 16l8 8"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-sky-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 16h36M14 26h30M14 36h36M14 46h24"/>
      <path d="M40 14l10 10-20 22H20v-10L40 14z" fill="currentColor" fill-opacity="0.2"/>
    </svg>`
  },

  'french-language': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 18h36a4 4 0 014 4v18a4 4 0 01-4 4H28l-10 8v-8h-4a4 4 0 01-4-4V22a4 4 0 014-4z" fill="currentColor" fill-opacity="0.25"/>
      <path d="M26 30h12M26 36h8"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-indigo-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16h40a4 4 0 014 4v20a4 4 0 01-4 4H26l-10 8v-8h-4a4 4 0 01-4-4V20a4 4 0 014-4z"/>
      <path d="M24 26h16M24 34h10"/>
      <path d="M32 10l-4 6h8l-4-6z" fill="currentColor"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-indigo-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10L24 50M32 10l8 40M20 50h24M25 36h14"/>
      <circle cx="32" cy="10" r="2" fill="currentColor"/>
    </svg>`
  },

  'cultural-creative-arts': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="24" cy="26" r="3.5" fill="currentColor"/>
      <circle cx="40" cy="26" r="3.5" fill="currentColor"/>
      <circle cx="32" cy="40" r="3.5" fill="currentColor"/>
      <path d="M46 16l4 4"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-amber-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10C18.7 10 8 20.7 8 34c0 10.6 8.2 19.3 18.8 20 2.2.1 4-1.6 4-3.8 0-1.2-.5-2.3-.5-3.5 0-2.8 2.2-5 5-5h4.7c7.7 0 14-6.3 14-14 0-13.3-10.7-24-24-24z"/>
      <circle cx="20" cy="24" r="3" fill="currentColor"/>
      <circle cx="32" cy="20" r="3" fill="currentColor"/>
      <circle cx="44" cy="26" r="3" fill="currentColor"/>
      <circle cx="24" cy="36" r="3" fill="currentColor"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-amber-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20c0 14 8 26 20 26s20-12 20-26H12z" fill="currentColor" fill-opacity="0.2"/>
      <path d="M22 28a2 2 0 104 0 2 2 0 00-4 0zM38 28a2 2 0 104 0 2 2 0 00-4 0zM24 38c2 3 12 3 16 0"/>
      <path d="M32 8v6M20 10l4 4M44 10l-4 4"/>
    </svg>`
  },

  'business-studies': {
    foundational: `<svg class="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" fill-opacity="0.25"/>
      <path d="M32 20v24M24 26c2-3 14-3 16 0s-2 6-8 6-10 3-8 6 14 3 16 0"/>
    </svg>`,
    upper: `<svg class="w-16 h-16 text-amber-200" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 52V12M10 52h44M18 42l10-14 8 8 16-18M42 18h10v10"/>
      <circle cx="28" cy="28" r="3" fill="currentColor"/>
      <circle cx="36" cy="36" r="3" fill="currentColor"/>
      <circle cx="52" cy="18" r="3" fill="currentColor"/>
    </svg>`,
    jss: `<svg class="w-16 h-16 text-amber-300" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="30" rx="3" fill="currentColor" fill-opacity="0.15"/>
      <path d="M24 20v-6a4 4 0 014-4h8a4 4 0 014 4v6M12 34h40M30 34v4h4v-4"/>
    </svg>`
  }
};

// 2. Discipline Metadata
const subjects = [
  { slug: 'basic-science', name: 'Basic Science', cluster: 'BST' },
  { slug: 'basic-technology', name: 'Basic Technology', cluster: 'BST' },
  { slug: 'computer-studies', name: 'Computer Studies', cluster: 'BST' },
  { slug: 'physical-health-education', name: 'Physical & Health Education', cluster: 'BST' },
  { slug: 'civic-education', name: 'Civic Education', cluster: 'RNV' },
  { slug: 'social-studies', name: 'Social Studies', cluster: 'RNV' },
  { slug: 'security-education', name: 'Security Education', cluster: 'RNV' },
  { slug: 'religious-studies', name: 'Christian / Islamic Religious Studies', cluster: 'RNV' },
  { slug: 'agricultural-science', name: 'Agricultural Science', cluster: 'PVS' },
  { slug: 'home-economics', name: 'Home Economics', cluster: 'PVS' },
  { slug: 'mathematics', name: 'Mathematics', cluster: 'CORE' },
  { slug: 'english-studies', name: 'English Studies', cluster: 'CORE' },
  { slug: 'french-language', name: 'French Language', cluster: 'CORE' },
  { slug: 'cultural-creative-arts', name: 'Cultural & Creative Arts', cluster: 'CORE' },
  { slug: 'business-studies', name: 'Business Studies', cluster: 'CORE' }
];

// 3. Tiers & Visual Configuration
const tiers = [
  {
    id: 'foundational',
    name: 'Foundational Tier',
    iconVariant: 'foundational',
    desc: 'Primary 1 to Primary 3 • Soft, Playful & Friendly',
    badgeStyle: 'bg-white/25 text-white border border-white/40 px-4 py-1.5 rounded-full font-heading font-black text-xs tracking-wider uppercase',
    tagStyle: 'bg-white/15 text-white/90 border border-white/20 px-3.5 py-1.5 rounded-full font-body text-xs font-semibold',
    podStyle: 'w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/35 shadow-lg flex items-center justify-center',
    cardRadius: 'rounded-3xl border-2 border-white/20',
    footerBrand: 'text-white/90 font-heading font-bold text-sm tracking-wider uppercase',
    getGradient: (cluster, slug) => {
      if (cluster === 'BST') return 'from-[#1D4ED8] via-[#2563EB] to-[#38BDF8]';
      if (cluster === 'RNV') return 'from-[#047857] via-[#059669] to-[#34D399]';
      if (cluster === 'PVS') return 'from-[#6D28D9] via-[#7C3AED] to-[#C084FC]';
      // CORE
      if (slug === 'cultural-creative-arts' || slug === 'business-studies') {
        return 'from-[#B45309] via-[#D97706] to-[#FBBF24]';
      }
      return 'from-[#1E40AF] via-[#2563EB] to-[#60A5FA]';
    },
    grades: [
      { id: 'primary-1', badge: 'PRIMARY 1' },
      { id: 'primary-2', badge: 'PRIMARY 2' },
      { id: 'primary-3', badge: 'PRIMARY 3' }
    ]
  },
  {
    id: 'upper-primary',
    name: 'Upper Primary Tier',
    iconVariant: 'upper',
    desc: 'Primary 4 to Primary 6 • Structured & Vibrant Dual-Tones',
    badgeStyle: 'bg-white/20 text-white border border-white/30 px-3.5 py-1.5 rounded-xl font-heading font-black text-xs tracking-wider uppercase',
    tagStyle: 'bg-white/10 text-white/80 border border-white/15 px-3 py-1.5 rounded-xl font-body text-xs font-semibold',
    podStyle: 'w-30 h-30 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/25 shadow-xl flex items-center justify-center',
    cardRadius: 'rounded-2xl border-2 border-white/20',
    footerBrand: 'text-white/80 font-body font-semibold text-sm tracking-wider uppercase',
    getGradient: (cluster, slug) => {
      if (cluster === 'BST') return 'from-[#1E3A8A] via-[#1D4ED8] to-[#0284C7]';
      if (cluster === 'RNV') return 'from-[#065F46] via-[#047857] to-[#0D9488]';
      if (cluster === 'PVS') return 'from-[#4C1D95] via-[#6D28D9] to-[#7C3AED]';
      // CORE
      if (slug === 'cultural-creative-arts' || slug === 'business-studies') {
        return 'from-[#78350F] via-[#B45309] to-[#D97706]';
      }
      return 'from-[#1E293B] via-[#1E3A8A] to-[#2563EB]';
    },
    grades: [
      { id: 'primary-4', badge: 'PRIMARY 4' },
      { id: 'primary-5', badge: 'PRIMARY 5' },
      { id: 'primary-6', badge: 'PRIMARY 6' }
    ]
  },
  {
    id: 'junior-secondary',
    name: 'Junior Secondary Tier',
    iconVariant: 'jss',
    desc: 'JSS 1 to JSS 3 • Mature, Sleek & Pre-Secondary Midnight Surfaces',
    badgeStyle: 'bg-slate-900/90 text-white border border-slate-600/80 px-3 py-1.5 rounded-lg font-heading font-black text-xs tracking-wider uppercase',
    tagStyle: 'bg-slate-900/80 text-slate-300 border border-slate-700/80 px-3 py-1.5 rounded-lg font-body text-xs font-semibold',
    podStyle: 'w-28 h-28 rounded-xl bg-slate-900/85 backdrop-blur-md border-2 border-slate-600/70 shadow-2xl flex items-center justify-center',
    cardRadius: 'rounded-xl border-2 border-slate-700/80',
    footerBrand: 'text-slate-300 font-body font-semibold text-sm tracking-wider uppercase',
    getGradient: (cluster, slug) => {
      if (cluster === 'BST') return 'from-[#0A0F1D] via-[#152238] to-[#1E3A8A]';
      if (cluster === 'RNV') return 'from-[#0A0F1D] via-[#0B251E] to-[#065F46]';
      if (cluster === 'PVS') return 'from-[#0A0F1D] via-[#200F35] to-[#4C1D95]';
      // CORE
      if (slug === 'cultural-creative-arts' || slug === 'business-studies') {
        return 'from-[#0A0F1D] via-[#2D1A07] to-[#78350F]';
      }
      return 'from-[#0A0F1D] via-[#111827] to-[#1E293B]';
    },
    grades: [
      { id: 'jss-1', badge: 'JSS 1' },
      { id: 'jss-2', badge: 'JSS 2' },
      { id: 'jss-3', badge: 'JSS 3' }
    ]
  }
];

// 4. Cluster Badges
const clusterBadges = [
  {
    slug: 'icon-bst',
    code: 'BST',
    title: 'Basic Science & Technology',
    gradient: 'from-[#1D4ED8] to-[#38BDF8]',
    border: 'border-white/30',
    svg: `<svg class="w-12 h-12 text-white" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(30 24 24)"/>
      <ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(-30 24 24)"/>
      <circle cx="24" cy="24" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    slug: 'icon-rnv',
    code: 'RNV',
    title: 'Religion & National Values',
    gradient: 'from-[#047857] to-[#34D399]',
    border: 'border-white/30',
    svg: `<svg class="w-12 h-12 text-white" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 6l14 6v12c0 11-14 18-14 18S10 35 10 24V12l14-6z" fill="currentColor" fill-opacity="0.2"/>
      <path d="M18 24h12M24 18v12"/>
    </svg>`
  },
  {
    slug: 'icon-pvs',
    code: 'PVS',
    title: 'Pre-Vocational Studies',
    gradient: 'from-[#6D28D9] to-[#C084FC]',
    border: 'border-white/30',
    svg: `<svg class="w-12 h-12 text-white" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 38V16M24 16c0-5 6-9 12-9 0 6-5 11-12 9zM24 25c0-5-6-8-11-8 0 6 5 10 11 8z" fill="currentColor" fill-opacity="0.2"/>
      <path d="M14 38h20"/>
    </svg>`
  },
  {
    slug: 'icon-core',
    code: 'CORE',
    title: 'Core Standalone Disciplines',
    gradient: 'from-[#B45309] to-[#FBBF24]',
    border: 'border-white/30',
    svg: `<svg class="w-12 h-12 text-white" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 12h28M10 12l16 14-16 10h28"/>
      <circle cx="34" cy="36" r="2.5" fill="currentColor"/>
    </svg>`
  }
];

// Helper to render course cover
function renderCourseCover(tier, grade, subject) {
  const assetPath = `course-covers/${tier.id}/${grade.id}/${subject.slug}`;
  const gradient = tier.getGradient(subject.cluster, subject.slug);
  const icon = icons[subject.slug][tier.iconVariant];

  return `
    <div class="asset-item-wrapper flex flex-col items-start" data-tier="${tier.id}" data-grade="${grade.id}" data-cluster="${subject.cluster}">
      <!-- Exact 800x450 Container for Playwright Capture -->
      <div data-asset="${assetPath}" 
           class="course-cover-card relative ${tier.cardRadius} overflow-hidden bg-gradient-to-br ${gradient} text-white shadow-2xl flex flex-col justify-between p-8" 
           style="width: 800px; height: 450px; min-width: 800px; min-height: 450px; max-width: 800px; max-height: 450px; box-sizing: border-box;">

        <!-- HEADER ZONE -->
        <div class="relative z-10 flex items-center justify-between">
          <!-- Top-Left: ONLY Grade Level -->
          <span class="${tier.badgeStyle}">
            ${grade.badge}
          </span>

          <!-- Top-Right: Simplified Tag -->
          <span class="${tier.tagStyle}">
            Full Session (Terms 1–3)
          </span>
        </div>

        <!-- HERO / ICON ZONE -->
        <div class="relative z-10 flex flex-col items-center justify-center my-auto">
          <div class="${tier.podStyle}">
            ${icon}
          </div>
        </div>

        <!-- FOOTER ZONE -->
        <div class="relative z-10 flex flex-col justify-end">
          <h3 class="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-2 drop-shadow-sm">
            ${subject.name}
          </h3>
          <div>
            <span class="${tier.footerBrand}">
              MindStormer Global Academy
            </span>
          </div>
        </div>

      </div>

      <!-- Preview Slug Label -->
      <div class="slug-bar mt-2 text-[11px] font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center justify-between" style="width: 800px; box-sizing: border-box;">
        <span class="text-slate-300">staged-assets/${assetPath}.png</span>
        <span class="text-blue-400 font-bold">800×450 (16:9)</span>
      </div>
    </div>
  `;
}

// Helper to render cluster badge
function renderClusterBadge(badge) {
  const assetPath = `cluster-icons/${badge.slug}`;
  return `
    <div class="asset-item-wrapper flex flex-col items-center" data-tier="badges" data-grade="badges" data-cluster="${badge.code}">
      <!-- Exact 128x128 Container for Playwright Capture -->
      <div data-asset="${assetPath}" 
           class="cluster-badge-card relative rounded-2xl overflow-hidden border-2 ${badge.border} bg-gradient-to-br ${badge.gradient} text-white shadow-xl flex flex-col items-center justify-center p-3" 
           style="width: 128px; height: 128px; min-width: 128px; min-height: 128px; max-width: 128px; max-height: 128px; box-sizing: border-box;">
        
        <div class="w-12 h-12 flex items-center justify-center mb-0.5">
          ${badge.svg}
        </div>
        <div class="font-heading font-black text-sm tracking-wider uppercase text-white">${badge.code}</div>
        <div class="font-body text-[8.5px] font-bold text-white/90 uppercase tracking-tight text-center leading-none mt-0.5">${badge.title}</div>
      </div>

      <!-- Preview Slug Label -->
      <div class="slug-bar mt-2 text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 text-center" style="width: 128px;">
        ${badge.slug}.png
      </div>
    </div>
  `;
}

// Assemble full HTML
let totalCards = 0;
let cardsHtml = '';

// 1. Cluster Badges Section
cardsHtml += `
  <section id="section-badges" class="space-y-6 pt-4">
    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
      <div>
        <h2 class="text-xl font-heading font-black text-white">Standalone Cluster Identity Badges</h2>
        <p class="text-xs text-slate-400 font-body">1:1 Square Badges (128 × 128 px) for LMS Cluster Headers & Report Cards</p>
      </div>
      <span class="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-lg text-xs font-bold font-mono">4 Assets</span>
    </div>
    <div class="flex flex-wrap gap-8 items-start">
      ${clusterBadges.map(b => {
        totalCards++;
        return renderClusterBadge(b);
      }).join('')}
    </div>
  </section>
`;

// 2. Course Covers Sections
tiers.forEach(tier => {
  cardsHtml += `
    <section id="section-${tier.id}" class="space-y-8 pt-8 border-t-2 border-slate-800">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-3 py-0.5 rounded text-[10px] font-heading font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">${tier.name}</span>
            <span class="text-xs text-slate-400 font-body">${tier.desc}</span>
          </div>
          <h2 class="text-2xl font-heading font-black text-white">${tier.name} Course Covers</h2>
        </div>
        <span class="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-lg text-xs font-bold font-mono">
          ${tier.grades.length * subjects.length} Assets (3 Grades × 15 Subjects)
        </span>
      </div>
  `;

  tier.grades.forEach(grade => {
    cardsHtml += `
      <div id="grade-${grade.id}" class="space-y-4 pt-2">
        <div class="flex items-center justify-between bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
          <div class="flex items-center gap-3">
            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
            <h3 class="font-heading font-black text-lg text-white">${grade.badge}</h3>
            <span class="text-slate-500 font-mono text-xs">•</span>
            <span class="text-xs font-body text-slate-400">15 Simplified Student-Friendly Covers</span>
          </div>
          <span class="text-xs font-mono text-blue-400 font-bold">15 Course Covers</span>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          ${subjects.map(subject => {
            totalCards++;
            return renderCourseCover(tier, grade, subject);
          }).join('')}
        </div>
      </div>
    `;
  });

  cardsHtml += `</section>`;
});

const fullHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth bg-slate-950 text-slate-100">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MSA-500 Course Asset Staging Canvas | MindStormer Global Academy</title>
  
  <!-- Google Fonts: Plus Jakarta Sans & Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Plus Jakarta Sans', 'sans-serif'],
            body: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <style>
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Plus Jakarta Sans', sans-serif; }

    /* Scaling utility for gallery overview */
    .canvas-scale-50 .asset-item-wrapper {
      transform: scale(0.5);
      transform-origin: top left;
      margin-bottom: -210px;
      margin-right: -380px;
    }
    .canvas-scale-50 .cluster-badge-card {
      transform: scale(0.85);
      transform-origin: top left;
    }

    /* Headless isolation guarantee */
    [data-asset] {
      box-sizing: border-box !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  </style>
</head>
<body class="bg-[#0B0F19] text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white pb-24">

  <!-- STICKY TOP CONTROL PANEL -->
  <header class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row items-center justify-between gap-4">
      
      <!-- Brand & Metric -->
      <div class="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-[#0F172A] border border-blue-500/40 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md">
            MS
          </div>
          <div>
            <div class="text-sm font-black font-heading text-white tracking-tight flex items-center gap-2">
              <span>MSA-500 ASSET STAGING CANVAS</span>
              <span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9.5px] font-mono px-2 py-0.5 rounded font-bold uppercase">REFINED THEME</span>
            </div>
            <div class="text-[11px] font-medium text-slate-400">139 Simplified Kid-Friendly Course Covers & Cluster Badges</div>
          </div>
        </div>

        <span class="lg:hidden font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
          ${totalCards} Assets
        </span>
      </div>

      <!-- Controls: Filter Tabs & Scale Toggle -->
      <div class="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-center lg:justify-end text-xs font-bold">
        
        <!-- Primary Tier Tabs -->
        <div class="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1">
          <button type="button" data-filter-tier="all" class="filter-tier-btn px-3 py-1.5 rounded-lg transition-colors bg-blue-600 text-white">All (${totalCards})</button>
          <button type="button" data-filter-tier="badges" class="filter-tier-btn px-3 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">Badges (4)</button>
          <button type="button" data-filter-tier="foundational" class="filter-tier-btn px-3 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">P1–P3 (45)</button>
          <button type="button" data-filter-tier="upper-primary" class="filter-tier-btn px-3 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">P4–P6 (45)</button>
          <button type="button" data-filter-tier="junior-secondary" class="filter-tier-btn px-3 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">JSS 1–3 (45)</button>
        </div>

        <!-- Cluster Secondary Filter -->
        <div class="hidden sm:flex bg-slate-950 p-1 rounded-xl border border-slate-800 items-center gap-1">
          <button type="button" data-filter-cluster="all" class="filter-cluster-btn px-2.5 py-1.5 rounded-lg transition-colors bg-slate-800 text-white">All Clusters</button>
          <button type="button" data-filter-cluster="BST" class="filter-cluster-btn px-2.5 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">BST</button>
          <button type="button" data-filter-cluster="RNV" class="filter-cluster-btn px-2.5 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">RNV</button>
          <button type="button" data-filter-cluster="PVS" class="filter-cluster-btn px-2.5 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">PVS</button>
          <button type="button" data-filter-cluster="CORE" class="filter-cluster-btn px-2.5 py-1.5 rounded-lg transition-colors text-slate-400 hover:text-white">Core</button>
        </div>

        <!-- Scale Toggle Button -->
        <button id="toggle-scale-btn" type="button" class="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
          <span id="scale-label">50% Grid Mode</span>
        </button>

      </div>

    </div>
  </header>

  <!-- CANVAS MAIN CONTAINER -->
  <main id="canvas-container" class="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12 transition-all">
    ${cardsHtml}
  </main>

  <!-- CLIENT CONTROLLER SCRIPT -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const tierButtons = document.querySelectorAll('.filter-tier-btn');
      const clusterButtons = document.querySelectorAll('.filter-cluster-btn');
      const scaleBtn = document.getElementById('toggle-scale-btn');
      const scaleLabel = document.getElementById('scale-label');
      const container = document.getElementById('canvas-container');
      const assetItems = document.querySelectorAll('.asset-item-wrapper');

      let activeTier = 'all';
      let activeCluster = 'all';

      function applyFilters() {
        assetItems.forEach(item => {
          const itemTier = item.getAttribute('data-tier');
          const itemCluster = item.getAttribute('data-cluster');

          const matchesTier = (activeTier === 'all') || (itemTier === activeTier);
          const matchesCluster = (activeCluster === 'all') || (itemCluster === activeCluster);

          if (matchesTier && matchesCluster) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      }

      tierButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          tierButtons.forEach(b => {
            b.classList.remove('bg-blue-600', 'text-white');
            b.classList.add('text-slate-400');
          });
          btn.classList.add('bg-blue-600', 'text-white');
          btn.classList.remove('text-slate-400');
          activeTier = btn.getAttribute('data-filter-tier');
          applyFilters();
        });
      });

      clusterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          clusterButtons.forEach(b => {
            b.classList.remove('bg-slate-800', 'text-white');
            b.classList.add('text-slate-400');
          });
          btn.classList.add('bg-slate-800', 'text-white');
          btn.classList.remove('text-slate-400');
          activeCluster = btn.getAttribute('data-filter-cluster');
          applyFilters();
        });
      });

      // Scale Toggle (50% compact mode vs 100% actual size)
      let isScaled = false;
      if (scaleBtn) {
        scaleBtn.addEventListener('click', () => {
          isScaled = !isScaled;
          if (isScaled) {
            container.classList.add('canvas-scale-50');
            scaleLabel.textContent = '100% Native Size';
          } else {
            container.classList.remove('canvas-scale-50');
            scaleLabel.textContent = '50% Grid Mode';
          }
        });
      }

      // Global helper for headless test execution (guarantees all items are visible)
      window.__showAllAssets = function() {
        assetItems.forEach(item => { item.style.display = 'flex'; });
        container.classList.remove('canvas-scale-50');
      };
    });
  </script>

</body>
</html>
`;

// Write to staging-canvas.html
const outputPath = path.resolve(__dirname, '../staging-canvas.html');
fs.writeFileSync(outputPath, fullHtml, 'utf8');
console.log(`Successfully generated staging-canvas.html with ${totalCards} refined assets!`);
