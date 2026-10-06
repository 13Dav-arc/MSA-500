# Project Context: MindStormer Academy (MSA-500) LMS

## 1. Project Overview & Architecture
MindStormer Global Academy (MSA) is an enterprise K–8 / Junior Secondary (JSS 1–3) Learning Management System built around the official **NERDC (Nigerian Educational Research and Development Council)** national curriculum framework running on **Moodle 4.x** (Ubuntu VPS, Nginx, PHP-FPM, MySQL at `/var/www/msa/moodle/`).
The platform has completely scrapped all third-party virtual lab simulations (PhET Colorado, Tinkercad, Colorado WebGL) in favor of rigorous, structured NERDC curriculum delivery, continuous assessment, and official examination grading.
The active frontend theme is built on top of **Theme Boost** utilizing custom Mustache templates (`theme/boost/templates/`), vanilla JavaScript, and the **Maynd Stormir Institutional Design System** (`assets/css/main.css` and `theme/boost/style/moodle.css`).

---

## 2. Team Roles & Division of Labor

### Olamiposi (Lead Frontend Developer & UI/UX Architect):
* **Strict Frontend Boundary:** Restricted 100% to frontend repository assets (`templates/mustache/`, `theme/boost/templates/`, `scss/`, `assets/css/`, `assets/js/`, `previews/`, `docs/`, `tests/`).
* **Zero Backend Mutations:** Never modify backend PHP layout routers (`drawers.php`), execute server database scripts, alter Moodle core configuration via CLI, or write client-side error suppression listeners to mask backend state issues.
* **Backend Handover Protocol:** All server, database, or PHP routing requirements must be formally documented and handed off to Inioluwa via structured runbooks (`inioluwa_vps_handover_runbook.md`).
* **Design System Governance:** Enforces the Maynd Stormir light institutional theme across all views: Deep Navy (`#0F172A`), Cobalt Blue (`#1D4ED8`), Canvas (`#F8FAFC`), Slate borders (`#E2E8F0`), Plus Jakarta Sans (headings), and Inter (body).
* **De-Gamification & Simulation Scrapping:** Zero cartoon badges, zero XP bars, zero game streaks, zero virtual lab simulations. All progress is communicated via executive academic metrics and formative pacing indicators.
* **Accessibility & Parity:** Maintains strict WCAG 2.1 AA compliance (semantic landmarks, high contrast, 48px touch targets, 3px focus rings) and 100% bilateral parity between `assets/css/main.css` and `theme/boost/style/moodle.css`.

### Inioluwa (Backend & Infrastructure Engineer):
* **Server & VPS Administration:** Manages Ubuntu VPS, Nginx web server, PHP-FPM, Moodle CLI, and course uploads.
* **Layout & Block Architecture:** Manages dedicated server-side layout routing (`theme/boost/layout/msa_dashboard.php`) to disengage Moodle's native block manager (`$PAGE->blocks->show_only_fake_blocks(true);`) on `/my/`, eliminating rogue AMD block crashes (`block_recentlyaccesseditems`).
* **Database & Gradebook State:** Manages `msa_provision.php` bulk account linking (`user_to_mentor`), quiz slot assignments in `mdl_quiz_slots`, attempt reset workflows, and the 40% Continuous Assessment / 60% Term Examination aggregation engine.
* **CSS & Certificate Integration:** Injects global stylesheet links via Moodle admin `additionalhtmlhead` and maps dynamic PDF transcripts via `mod_customcert`.

### Adeyemi Ajifowowe (Project Stakeholder / Lead):
* Final milestone review, business logic governance, and brand alignment approval.

---

## 3. Current System State & Architectural Guardrails

1. **Strict Additive Overlay CI/CD Deployment:**
   - GitHub Actions (`.github/workflows/deploy.yml`) deploys templates and styles to the VPS strictly via additive file sync (`rsync -av` without `--delete`).
   - **Critical Guardrail:** Never execute destructive `git checkout`, `git reset`, or `rsync --delete` commands against `moodle/theme/boost/templates/` on the server, as this will wipe custom templates.
2. **Dashboard Block AMD Crash Elimination:**
   - Moodle core's `block_recentlyaccesseditems` and `block_timeline` AMD initializers throw unhandled `addEventListener` null errors when their block containers are absent from custom dashboards.
   - This defect is permanently resolved at the server layout level via `msa_dashboard.php` (`$PAGE->blocks->show_only_fake_blocks(true);`). Speculative mock DOM containers and client-side error suppression listeners in frontend code are strictly prohibited.
3. **Dual-Mirrored CSS Architecture:**
   - Theme Boost hardcodes `$THEME->sheets = [];`, and passing compiled CSS into Moodle's `theme_boost | scss` setting via `cfg.php` fails because Moodle's internal `scssphp` compiler breaks on modern CSS/Tailwind syntax.
   - Styling is precompiled locally into `assets/css/main.css` and mirrored with 100% bit-for-bit parity to `theme/boost/style/moodle.css`.
   - The stylesheet covers the marketing landing page, student/parent portals, custom dashboard, core subpages (`/user/profile.php`, `/user/preferences.php`), and the change password form (`/login/change_password.php`).
4. **Gradebook & CA Engine:**
   - Weighted Mean of Grades aggregation: Continuous Assessment (40%) and Term Examinations (60%).
5. **Interactive Simulations Permanently Scrapped:**
   - Virtual lab simulations (PhET Colorado, Tinkercad, WebGL) are completely decommissioned. Focus is 100% on the official NERDC curriculum subjects, structured instructional lessons, and continuous assessment / terminal examination pools.

---

## 4. Current Frontend & Curriculum Scope (Active Deliverables)

1. **Curriculum Ingestion Pipeline & Architecture:**
   - Separation of concerns between `curriculum-src/` (Markdown authoring) and `content/` (compiled Moodle artifacts).
   - Enforce Moodle VPS constraints via `scripts/compile-curriculum.js`: 100% `<div>` containers (zero `<section>`/`<article>`), Iconify API `<img>` tags (zero inline `<svg>`), `/top/` question bank hierarchy, explicit `<defaultgrade>1.0</defaultgrade>`, and `{{PENDING_CMID}}` placeholders.
   - Scaffold engine: `scripts/scaffold-curriculum-tree.js` can re-scaffold full term trees on demand in <1s.
2. **Delivered Academic Modules (JSS 1 Basic Science - Full 3-Term Session):**
   - **Term 01:** 4 authored modules (Weeks 01–02 lessons and assessments, Midterm CA pool with 30 Qs, and Terminal Examination pool with 50 Qs — total 80 Qs).
   - **Term 02:** Fully authored and compiled (Weeks 01–09 lessons, 9 weekly quizzes of 20 Qs each, Midterm pool with 20 Qs, and Terminal Examination pool with 50 Qs — total 210 Qs in Term 02).
   - **Term 03:** Fully authored and compiled assessment pools for annual cumulative validation (Midterm CA pool with 20 Qs, and Terminal Examination pool with 50 Qs — total 70 Qs).
   - **Full Sessional Scope:** 360 official NERDC assessment questions staged across Terms 1, 2, and 3 in Course 146 to power the annual PDF transcript engine.
   - **NERDC Curriculum Framework:** 14 junior secondary subjects mapped across 4 curriculum clusters:
     - *Cluster 1: Basic Science & Technology (BST)* — Basic Science, Basic Technology, Computer Studies, Physical & Health Education.
     - *Cluster 2: Religion & National Values (RNV)* — Civic Education, Security Education, Social Studies, Christian/Islamic Religious Studies.
     - *Cluster 3: Pre-Vocational Studies (PVS)* — Agricultural Science, Home Economics, Business Studies.
     - *Cluster 4: Core Standalone Disciplines (CORE)* — Mathematics, English Studies, Cultural & Creative Arts, French Language.
     - Accompanied by 139 high-resolution retina course covers in `img/course-covers/`.
3. **Enterprise Design System & Subpage Refinement:**
   - Standardized card layouts, 48px touch targets, and typography hierarchy across `/user/profile.php`, `/user/preferences.php`, and `/login/change_password.php`.
   - Clutter suppression active: question mark help tooltips, external documentation links, and empty block regions are suppressed via CSS.
4. **Standardized A4 Print-Ready Reports (`previews/`):**
   - Terminal Continuous Assessment Report (`report-card-preview.html` / `report-card.mustache`).
   - Mid-Term Performance Progress Report (`midterm-preview.html`).
   - Annual Cumulative Summary Report (`annual-preview.html`).
5. **Post-Registration Authentication Gateway:**
   - Check Email screen (`check-email-confirmation.mustache` / `previews/check-email-confirmation.html`).
   - Registration Confirmed screen (`registration-confirmed.mustache` / `previews/registration-confirmed.html`).
6. **Course UI Architecture & Modern Frontend Routing:**
   - Multi-term collapsible accordion cards for Course Root (`#page-course-view-topics:not(.single-section)`) with Section 0 Syllabus Hero, Term status badges, and cobalt active-term highlight.
   - Single-Section view (`.single-section`) with 56px interactive activity rows (`.activity-item`), differentiated color pods for lessons (blue), quizzes (purple), and resources (slate), and de-gamified formative completion badges.
   - Sticky breadcrumbs and navigation bar (`#page-navbar`) with glassmorphic blur backdrop, Plus Jakarta Sans typography, and clean chevron dividers.
   - Dashboard deep-linking: Fast-Resume CTA and course cards directly route to active sections (`course/view.php?id=146&section=2`).
   - Modularized SCSS in `scss/_course.scss`, precompiled into `assets/css/main.css` and mirrored bit-for-bit to `theme/boost/style/moodle.css`.

---

## 5. Agent Instructions & Quality Gate Constraints

* **Strict Frontend Boundary:** Maintain all work within `templates/*.mustache`, `theme/boost/templates/*.mustache`, `scss/*`, `assets/*`, `previews/*`, `docs/*`, and test files. Never attempt backend PHP router or database changes.
* **No Speculative Workarounds:** Do not inject dummy HTML elements or client-side error suppression listeners to mask backend state issues.
* **Bilateral CSS Parity:** Any change to `assets/css/main.css` MUST be mirrored to `theme/boost/style/moodle.css`. Always verify zero diff:
  ```powershell
  fc.exe "assets\css\main.css" "theme\boost\style\moodle.css"
  ```
* **Automated Quality Gate:** Always run `npm test` and verify that all **1,139 assertions pass with 0 failures** before completing tasks:
  - `tests/curriculum-ingestion.test.js`: 490 passed, 0 failed.
  - `tests/form-validation.test.js`: 649 passed, 0 failed.
* **WCAG 2.1 AA Accessibility:** Maintain semantic landmarks, high contrast ratios (minimum 4.5:1), screen-reader live regions, and 3px keyboard focus rings (`outline: 3px solid rgba(29, 78, 216, 0.25)`).
