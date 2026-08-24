# MindStormer Global Academy (MSA-500) Enterprise UI/UX Design System

## 1. Executive Summary & Brand Positioning
MindStormer Global Academy (MSA) is an enterprise K–8 / Junior Secondary (JSS 1–3) STEM-focused Learning Management System built on **Moodle 4.x** (Theme Boost, Nginx, PHP-FPM, MySQL). 

This design system codifies the **Maynd Stormir Enterprise Corporate Theme** aligned with `mayndstomir.com`. It establishes an executive, highly authoritative visual language for educational institutions, parents, and students by prioritizing rigorous academic indicators (Continuous Assessment 40% / Examination 60%) over casual gamified elements (XP counters, flame streaks, level-up badges, informal emojis).

---

## 2. Design Tokens & Color Architecture

The color system enforces strict semantic meaning across student and guardian portals, maintaining WCAG 2.1 AA contrast ratios (minimum 4.5:1 for body copy and 3.0:1 for large display elements).

### Core Palette Tokens

| Token Name | Hex Code | RGB | Role / Application Context |
|---|---|---|---|
| **Executive Navy** | `#0F172A` | `rgb(15, 23, 42)` | Header landmarks, primary headings, dark laboratory frames |
| **Deep Slate** | `#1E293B` | `rgb(30, 41, 59)` | Secondary dark containers, header chip backgrounds |
| **Slate Body** | `#334155` | `rgb(51, 65, 85)` | Primary labels, secondary copy, table headers |
| **Slate Muted** | `#64748B` | `rgb(100, 116, 139)` | Subtext, metadata tags, gate boundary labels |
| **Slate Border** | `#E2E8F0` | `rgb(226, 232, 240)` | Surface card borders, structural grid dividers |
| **Cobalt Primary** | `#1D4ED8` | `rgb(29, 78, 216)` | Student primary actions, interactive links, active progress fills |
| **Cobalt Hover** | `#1E40AF` | `rgb(30, 64, 175)` | Interactive button hover and active states |
| **Emerald Accent** | `#047857` | `rgb(4, 120, 87)` | Guardian portal actions, 40% CA mastery indicators, passing gates |
| **Emerald Light** | `#ECFDF5` | `rgb(236, 253, 245)` | Status pill background for cleared assessments |
| **Amber Warning** | `#D97706` | `rgb(217, 119, 6)` | 80% Mastery Gate boundary markers, in-progress indicators |
| **Purple Tier** | `#7C3AED` | `rgb(124, 58, 237)` | Junior Secondary (JSS 1–3) curriculum tier tags |
| **Light Canvas** | `#F8FAFC` | `rgb(248, 250, 252)` | Universal page background |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Card and modal surface background |

---

## 3. Typography System & Hierarchy

The typography pairs an authoritative geometric display font with a highly legible humanist sans-serif for dense academic gradebooks and technical STEM descriptions.

* **Display & Heading Font**: `Plus Jakarta Sans`, sans-serif (Weights: `700 Bold`, `800 ExtraBold`, `900 Black`)
* **Body & Data Table Font**: `Inter`, sans-serif (Weights: `400 Regular`, `500 Medium`, `600 SemiBold`, `700 Bold`)
* **Numeric Figures**: Tabular lining figures (`font-variant-numeric: tabular-nums`) across grade tables, percentages, and assessment scores.

### Type Scale Specification

| Element | Size | Weight | Tracking | Line Height |
|---|---|---|---|---|
| **Page Title (H1)** | `1.875rem` (30px) / `1.5rem` (24px mobile) | 900 | `-0.025em` | `1.2` |
| **Section Header (H2)** | `1.125rem` (18px) | 800 | `-0.02em` | `1.3` |
| **Card Header (H3)** | `1.0rem` (16px) | 800 | `-0.015em` | `1.4` |
| **Form Label** | `0.75rem` (12px) | 700 | `+0.05em` | `1.0` (Uppercase) |
| **Body Text** | `0.875rem` (14px) | 500 | `0` | `1.5` |
| **Data Metric Large** | `1.5rem` (24px) / `2.0rem` (32px) | 900 | `-0.02em` | `1.0` |
| **Micro Tag / Chip** | `0.625rem` (10px) / `0.6875rem` (11px) | 800 | `+0.05em` | `1.0` (Uppercase) |

---

## 4. Academic Performance & Weighted Assessment Architecture

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
* Scores >= 80.0% render an **Emerald Cleared Indicator** (`Cleared ✓`).
* Scores < 80.0% render an **Amber Remediation Warning** (`X% to 80% Gate`).

---

## 5. Component Specifications

### 5.1 Executive Academic Status Cards (`.metric-card-corporate`)
Replaces casual XP cards with 4 standardized executive indicators:
1. **Curriculum Tier**: Primary 1–3 (Foundational), Primary 4–6 (Intermediate), or JSS 1–3 (Junior Secondary).
2. **Continuous Assessment (40%)**: Metric score formatted as `XX.X / 40` with 80% gate indicator.
3. **Term Examination Weighting (60%)**: Metric score formatted as `XX.X / 60` with scheduling status.
4. **Attendance Standing**: Verified percentage calculated from `mod_attendance` daily login records.

### 5.2 Responsive Virtual Laboratory Container (`.simulation-embed-container`)
* **Zero Cumulative Layout Shift (CLS = 0)**: 16:9 aspect ratio (`aspect-ratio: 16 / 9; min-height: 360px`) with `@supports not (aspect-ratio: 16/9) { padding-bottom: 56.25%; }` progressive fallback.
* **Click-to-Load Facade Pattern**: Lightweight preview cover (`.lab-facade-cover`) that prevents initial WebGL context memory pressure on low-end school tablets and eliminates mobile scroll trapping.
* **Accessible Fullscreen Control**: Cross-browser fullscreen trigger with keyboard support.
* **Offline Fallback Notice**: Built-in retry mechanism (`.lab-fallback-card`) if third-party CDN servers (PhET Colorado / Tinkercad) are unreachable.

### 5.3 Button System (`.btn-enterprise-*`)
* Minimum touch target: `44px × 44px`.
* Solid, high-contrast states with subtle elevation on hover (`translateY(-1px)`).
* Strict WCAG keyboard focus ring: `outline: 3px solid [theme-color]; outline-offset: 2px;`.

---

## 6. Accessibility Contracts (WCAG 2.1 AA Compliance)

1. **Semantic Landmarks**: Every surface features explicit `<header role="banner">`, `<main role="main">`, `<nav role="navigation">`, `<section role="region">`, and `<footer role="contentinfo">`.
2. **Dynamic Live Regions**:
   - Authentication password rules: `<div id="password-rules" role="region" aria-live="polite">`.
   - Guardian ward switcher overview card: `<section aria-live="polite" aria-atomic="true">` to announce student metric updates.
3. **Form Controls**: All inputs feature explicit matching `<label for="...">`, `aria-required="true"`, `aria-invalid="true"` error bindings, and accessible password visibility toggles (`aria-pressed`, `aria-label`).
4. **Screen Reader Utilities**: Visual badge icons and markers provide assistive context via `.sr-only` descriptions.

---

## 7. Architectural De-Gamification Rationale

| Feature Area | Legacy Gamified State | Maynd Stormir Enterprise State | Strategic & Architectural Rationale |
|---|---|---|---|
| **Header Status** | Streak fire emoji (`🔥 7 Days`), XP counter (`🏆 1,850 XP`) | `Active Term: 2026/2027`, `Curriculum Progress: 85%` | Establishes institutional credibility with school boards, educational ministries, and parents. |
| **Card Styling** | 3D tactile buttons (`border-b-6`, cartoon elevation) | Clean corporate surfaces (`1px solid #E2E8F0`, subtle shadow) | Reduces visual noise and aligns with professional desktop/tablet web applications. |
| **Iconography** | Informal Unicode emojis (`🔥`, `🏆`, `🚀`, `🎓`, `⚡`) | Inline monochrome SVG icons (Heroicons / Lucide style) | Eliminates platform emoji rendering inconsistencies (iOS vs Android vs Windows) and preserves serious academic tone. |
| **Progress Metrics** | "Level Up!" badges, XP meters | Continuous Assessment (40%), Exam Weighting (60%), 80% Gate Trajectory | Directly mirrors British/Nigerian K–12 and WAEC/BECE institutional grading standards. |
| **Ward Selector** | Casual nickname streak chips | Dynamic Student ID, Tier Badge, Official PDF Transcript Route | Supports multi-ward parent monitoring with verified academic records. |
