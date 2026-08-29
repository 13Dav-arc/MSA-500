# MindStormer Global Academy (MSA-500) Enterprise UI/UX Design System

## 1. Core Engineering Identity & Visual Standard

MindStormer Global Academy (MSA) is an enterprise K–8 / Junior Secondary (JSS 1–3) STEM-focused Learning Management System built on **Moodle 4.x** (Theme Boost, Nginx, PHP-FPM, MySQL). 

This design system codifies the **Maynd Stormir Enterprise Corporate Theme** aligned with `mayndstomir.com`. It establishes an executive, highly authoritative visual language for educational institutions, parents, and students by prioritizing rigorous academic indicators (Continuous Assessment 40% / Examination 60%) over casual gamified elements (XP counters, flame streaks, level-up badges, informal emojis).

### 1.1 Brand Palette Tokens
All surfaces strictly enforce semantic contrast compliant with WCAG 2.1 AA (minimum 4.5:1 for body copy and 3.0:1 for large display elements):

| Token Name | Hex Code | RGB | Role / Application Context |
|---|---|---|---|
| **Executive Navy** | `#0F172A` | `rgb(15, 23, 42)` | Header landmarks, primary headings, dark laboratory frames, hero badges |
| **Deep Slate** | `#1E293B` | `rgb(30, 41, 59)` | Secondary dark containers, header chip backgrounds, footer borders |
| **Slate Body** | `#334155` | `rgb(51, 65, 85)` | Primary form labels, body text, secondary copy, table headers |
| **Slate Muted** | `#64748B` | `rgb(100, 116, 139)` | Subtext, metadata tags, gate boundary labels |
| **Slate Border** | `#E2E8F0` | `rgb(226, 232, 240)` | Surface card borders, structural grid dividers |
| **Cobalt Primary** | `#1D4ED8` | `rgb(29, 78, 216)` | Student primary actions, interactive links, active progress fills |
| **Cobalt Hover** | `#1E40AF` | `rgb(30, 64, 175)` | Interactive button hover and active states |
| **Emerald Accent** | `#047857` | `rgb(4, 120, 87)` | Guardian portal actions, 40% CA mastery indicators, passing gates |
| **Emerald Hover** | `#065F46` | `rgb(6, 95, 70)` | Guardian interactive hover states |
| **Emerald Light** | `#ECFDF5` | `rgb(236, 253, 245)` | Status pill background for cleared assessments |
| **Amber Warning** | `#D97706` | `rgb(217, 119, 6)` | 80% Mastery Gate boundary markers, in-progress indicators |
| **Purple Tier** | `#7C3AED` | `rgb(124, 58, 237)` | Junior Secondary (JSS 1–3) curriculum tier tags |
| **Light Canvas** | `#F8FAFC` | `rgb(248, 250, 252)` | Universal page background (`html, body`) |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Card and modal surface background |

### 1.2 Typography System & Tabular Lining Figures
- **Display & Heading Font**: `Plus Jakarta Sans`, sans-serif (Weights: `700 Bold`, `800 ExtraBold`, `900 Black`).
- **Body & Data Table Font**: `Inter`, sans-serif (Weights: `400 Regular`, `500 Medium`, `600 SemiBold`, `700 Bold`).
- **Numeric Figures**: Tabular lining figures (`font-variant-numeric: tabular-nums`) across grade tables, percentages, metrics, and assessment scores.

### 1.3 Component Card Surfaces
High-end corporate surfaces use crisp borders and subtle elevation:
```css
.card-enterprise {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 1rem; /* 16px */
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.05);
}
```

---

## 2. Universal Navigation & Direct Logo Routing

### 2.1 Standardized Brand Logo
Every student, guardian, authentication, and marketing surface features an identical standardized brand mark:
- **Container Box**: Deep slate rounded box (`w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center text-white font-black text-base border border-slate-700 shadow-sm`).
- **Typography**: `MAYND STORMIR` paired with the brand accent keyword (`ACADEMY` in `#1D4ED8` on student views, or `GUARDIAN PORTAL` in `#047857` on guardian views).
- **Direct Logo Routing**: The top-left logo anchor strictly links directly to `index.html` (or `{{{ config.wwwroot }}}/index.html` in Moodle Mustache templates) across all views without exception.

---

## 3. Strict Spacing, Padding & Layout Consistency

- **Form Containers**: Fluid responsive padding `p-4 sm:p-6 md:p-8 lg:p-10` with max-width `max-w-md` for authentication cards and `max-w-2xl` for registration cards.
- **Multi-Column Grid Collapse**: All `grid-cols-2` and `grid-cols-3` layouts collapse cleanly to single-column `grid-cols-1` on screens `< 768px` with consistent `gap-y-4` and `gap-x-5`.
- **Form Field Stacking**: Form groups consistently use `space-y-4` or `space-y-5`, with `0.375rem` label `margin-bottom` and uppercase `0.75rem` bold labels (`font-weight: 700; letter-spacing: 0.05em;`).

---

## 4. Flawless Mobile Responsiveness & Viewport Lock

### 4.1 Viewport Architecture & Anti-Collapse Contracts
To eliminate mobile layout collapse, floating footers, and erratic jumping caused by dynamic mobile URL bars:
- **Base CSS**:
  ```css
  html, body {
    min-height: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: #F8FAFC !important;
    font-family: 'Inter', sans-serif;
  }
  ```
- **Top-Level Wrapper**: `<div class="min-h-[100dvh] flex flex-col justify-between w-full overflow-x-hidden">`.
- **Main Landmark Area**: `<main id="main-content" role="main" class="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 w-full">`.
- **Sticky Bottom Footer**: `<footer role="contentinfo" class="w-full bg-[#0F172A] text-slate-400 text-center text-xs py-4 border-t border-slate-800 mt-auto">`.

### 4.2 Mobile Touch Ergonomics & Proportions
- **48px Touch Target Standard**: Minimum interactive height of `48px` (`min-h-[48px]`) across all inputs, dropdown selectors, action buttons, password toggles, and navigation links.
- **Fluid Buttons**: Responsive classes `w-full sm:w-auto py-2.5 px-5 sm:py-3 min-h-[48px] text-xs sm:text-sm font-bold inline-flex items-center justify-center rounded-xl`.
- **Responsive Headings**: Fluid hero headers `text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-snug`.
- **Auto-Zoom Prevention**: Form input font size set to `text-base sm:text-sm` (font-size ≥ 16px on mobile screens `< 640px`) to prevent iOS Safari and Android Chrome from triggering auto-zoom on field focus.

---

## 5. Form Interaction, Autofill & Asset Integrity

### 5.1 Password Visibility Toggle
- Wrap password fields in `<div class="relative flex items-center w-full">`.
- Position the toggle button strictly with `absolute right-3 top-1/2 -translate-y-1/2` so it remains perfectly centered within the input field.
- Accessible toggle logic implemented in `assets/js/form-validation.js` updating `aria-pressed`, `aria-label`, and swapping dynamic Eye (`M2.458 12...`) and Eye-Slash (`M13.875 18.825...`) SVG icons with live screen reader announcements.

### 5.2 Absolute Asset Paths in Mustache Templates
All script and style tags in Moodle Mustache templates use absolute wwwroot paths:
- `<script src="{{{ config.wwwroot }}}/assets/js/form-validation.js" defer></script>`
- `<script src="{{{ config.wwwroot }}}/theme/boost/javascript/parent.js"></script>`

### 5.3 W3C Standard Browser Autofill Tokens
All input fields explicitly declare standard W3C autocomplete tokens:
- **Username**: `autocomplete="username"`
- **Student Email**: `autocomplete="email"`
- **Guardian Email**: `autocomplete="email"`
- **Login Password**: `autocomplete="current-password"`
- **Registration Password**: `autocomplete="new-password"`
- **First Name**: `autocomplete="given-name"`
- **Last Name**: `autocomplete="family-name"`
- **Guardian Full Name**: `autocomplete="name"`
- **City / Town**: `autocomplete="address-level2"`
- **Country**: `autocomplete="country"`

### 5.4 Post-Login Redirection (`wantsurl`) Directives
- **Student Portal Login (`login.mustache`)**:
  `<input type="hidden" name="wantsurl" value="{{{ config.wwwroot }}}/my/">`
- **Guardian Portal Login (`parent_login.mustache`)**:
  `<input type="hidden" name="wantsurl" value="{{{ config.wwwroot }}}/grade/report/user/index.php">`

---

## 6. Academic Performance & Weighted Assessment Architecture

MindStormer Global Academy adheres to a strict formal weighting system across continuous assessment and term examinations:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   TOTAL TERM GRADE AGGREGATION (100%)                  │
├───────────────────────────────────┬────────────────────────────────────┤
│   CONTINUOUS ASSESSMENT (40%)     │       TERM EXAMINATION (60%)       │
├───────────────────────────────────┼────────────────────────────────────┤
│ • Weekly Lab Simulations (20%)    │ • Practical Virtual Exam (30%)     │
│ • Module Quizzes & Drills (20%)   │ • Comprehensive Theory Exam (30%)  │
│ ➔ 80% Mastery Gate Clearance      │ ➔ Standard Letter Grading (A - F)  │
└───────────────────────────────────┴────────────────────────────────────┘
```

### The 80% Mastery Gate Rule
Every curriculum module features an embedded **80% Continuous Assessment Gate**:
- Scores >= 80.0% render an **Emerald Cleared Indicator** (`Cleared ✓`).
- Scores < 80.0% render an **Amber Remediation Warning** (`X% to 80% Gate`).

---

## 7. Interactive Embed Containment & Virtual Laboratory

### Responsive Virtual Laboratory Container (`.simulation-embed-container`)
- **Zero Cumulative Layout Shift (CLS = 0)**: 16:9 aspect ratio (`aspect-ratio: 16 / 9; min-height: 360px`) with `@supports not (aspect-ratio: 16 / 9) { padding-bottom: 56.25%; }` progressive fallback.
- **Click-to-Load Facade Pattern**: Lightweight preview cover (`.lab-facade-cover`) that prevents initial WebGL context memory pressure on low-end tablets and eliminates mobile scroll trapping.
- **Accessible Fullscreen Control**: Cross-browser fullscreen trigger with keyboard support.
- **Offline Fallback Notice**: Built-in retry mechanism (`.lab-fallback-card`) if third-party CDN servers (PhET Colorado / Tinkercad) are unreachable.

---

## 8. Architectural De-Gamification Rationale

| Feature Area | Legacy Gamified State | Maynd Stormir Enterprise State | Strategic & Architectural Rationale |
|---|---|---|---|
| **Header Status** | Streak fire emoji (`🔥 7 Days`), XP counter (`🏆 1,850 XP`) | `Active Term: 2026/2027`, `Curriculum Progress: 85%` | Establishes institutional credibility with school boards, educational ministries, and parents. |
| **Card Styling** | 3D tactile buttons (`border-b-6`, cartoon elevation) | Clean corporate surfaces (`1px solid #E2E8F0`, subtle shadow) | Reduces visual noise and aligns with professional desktop/tablet web applications. |
| **Iconography** | Informal Unicode emojis (`🔥`, `🏆`, `🚀`, `🎓`, `⚡`) | Inline monochrome SVG icons (Heroicons / Lucide style) | Eliminates platform emoji rendering inconsistencies (iOS vs Android vs Windows) and preserves serious academic tone. |
| **Progress Metrics** | "Level Up!" badges, XP meters | Continuous Assessment (40%), Exam Weighting (60%), 80% Gate Trajectory | Directly mirrors British/Nigerian K–12 and WAEC/BECE institutional grading standards. |
| **Ward Selector** | Casual nickname streak chips | Dynamic Student ID, Tier Badge, Official PDF Transcript Route | Supports multi-ward parent monitoring with verified academic records. |

---

## 9. Accessibility Contracts (WCAG 2.1 AA Compliance)

1. **Semantic Landmarks**: Every surface features explicit `<header role="banner">`, `<main role="main">`, `<nav role="navigation">`, `<section role="region">`, and `<footer role="contentinfo">`.
2. **Dynamic Live Regions**:
   - Authentication password rules: `<div id="password-rules" role="region" aria-live="polite">`.
   - Guardian ward switcher overview card: `<section aria-live="polite" aria-atomic="true">` to announce student metric updates.
3. **Form Controls**: All inputs feature matching `<label for="...">`, `aria-required="true"`, `aria-invalid="true"` error bindings, and accessible password visibility toggles (`aria-pressed`, `aria-label`).
4. **Screen Reader Utilities**: Visual badge icons and markers provide assistive context via `.sr-only` descriptions.
5. **Keyboard Focus**: High-contrast 3px focus rings (`outline: 3px solid #1D4ED8; outline-offset: 2px;` or `#047857` for guardian surfaces).

---

## 10. Verification & Quality Gates

1. **Bilateral Template Parity**: All 6 Mustache templates must maintain identical parity between `templates/mustache/*.mustache` and `theme/boost/templates/*.mustache`.
2. **Static Preview Parity**: Maintain 1:1 preview alignment across `index.html`, `login.html`, `parent-login.html`, `signup.html`, `parent-signup.html`, `dashboard.html`, and `parent-dashboard.html`.
3. **Automated Test Suite (`tests/form-validation.test.js`)**:
   - Asserts `min-h-[100dvh]` viewport anti-collapse tokens.
   - Asserts `min-h-[48px]` interactive touch targets.
   - Asserts zero informal Unicode emojis in `index.html`.
   - Asserts postback `wantsurl` and W3C `autocomplete` attributes.
   - Asserts 100% bilateral parity across all 6 core Mustache templates.
4. **Pass Criteria**: `npm test` must pass 100% of test suites with 0 errors prior to deployment.
