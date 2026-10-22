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
6. **Question Compilation Cardinal Rule:**
   - All standard subjects (Basic Science, Mathematics, Basic Technology, etc.): strictly **20 questions** for weekly lesson quizzes (`14/2/2/2`) and **50 questions** for terminal examinations (`35/5/5/5`).
   - English Studies (`english-studies`): strictly **30 questions** for weekly lesson quizzes / midterm CA (`21/3/3/3`) and **60 questions** for terminal examinations (`42/6/6/6`).
   - Programmatically validated by `validateQuestionCount()` in `scripts/compile-curriculum.js`.
7. **Four Non-Negotiable Operational Laws of the Curriculum Engine (`docs/NERDC_CURRICULUM_ENGINE_CHARTER.md`):**
   - **Law 1 (Subject Cluster Architecture & JSS 1 Active Scope Lock):** 14 subjects organized across 4 clusters (Core Standalone, BST, RNV, PVS), each with independent 10-week tracks (30 files/yr). Active focus is strictly locked to **JSS 1** (immediate priority: complete remaining BST tracks *information-technology* and *physical-and-health-education*, followed by PVS, RNV, and Core). Primary 1–6, JSS 2–3, and SSS 1–3 are architectural reservations pending explicit user authorization.
   - **Law 2 (Supreme Authority of NERDC Scheme of Work):** NERDC national syllabus is the sole topic/sequence dictator. Materials in `Reference/` are supplementary drafting aids (Mode A). Mode B proceeds autonomously from canonical NERDC standards.
   - **Law 3 (Dynamic Test-Suite Synchronization):** `tests/curriculum-ingestion.test.js` dynamically discovers and validates all JSS 1 cluster sub-tracks without hardcoded array exclusions.
   - **Law 4 (Factual Verification & Student-Friendly Pedagogical Standard):** 100% verified accuracy; single-choice questions have exactly one correct answer and three plausible distractors with explanatory feedback. Every `## Hook` must spark curiosity by demonstrating *why* the topic matters in real life with relatable Nigerian/West African contexts.

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
   - **Mathematics, English Studies & Basic Technology Scaffolding (JSS 1, Terms 1–3):**
     - Complete 3-term directory trees provisioned under `curriculum-src/junior-secondary/jss-1/mathematics/`, `curriculum-src/junior-secondary/jss-1/english-studies/`, and `curriculum-src/junior-secondary/jss-1/basic-technology/` (30 empty 0-byte `.md` files per subject).
     - **English Studies 5-Aspect Authoring Addendum:** Enforces weekly 5-discipline integration within the 8 fixed `##` headers (`docs/ENGLISH_STUDIES_AUTHORING_ADDENDUM.md`): Speech Work, Structure, Comprehension & Vocabulary, Composition, and Literature-in-English. Includes mandatory tri-part self-contained Aspect 3 reading comprehension blocks (3-paragraph passage in `>` 250–350 words, 5 guided questions with model responses, 5–8 target vocabulary words) and self-contained quote stems in `## Quiz`. Assessment scaling: strictly 30 questions weekly (21/3/3/3), 30 questions midterm CA, and 60 questions terminal exam (42/6/6/6).
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
* **Automated Quality Gate:** Always run `npm test` and verify that all **10,456 assertions pass with 0 failures** before completing tasks:
  - `tests/curriculum-ingestion.test.js`: 9,807 passed, 0 failed.
  - `tests/form-validation.test.js`: 649 passed, 0 failed.
* **Non-Redirecting Slot 10 Assessment Notice Architecture:** Slot 10 in all weekly `lesson.html` files must feature a visible, prominent institutional notice (`.msa-assessment-notice`) reminding students to take their assessment on their course dashboard or module activity list without page redirection. Zero `<a href="...">` links or buttons are permitted in Slot 10. Question quotas (`30 Questions` / `15/30` for English Studies; `20 Questions` / `10/20` for standard subjects) must be dynamically rendered.
* **Question Count Enforcement:** When compiling questions, all subjects apart from English Studies strictly require 20 questions for weekly quizzes and 50 questions for terminal exams; English Studies strictly requires 30 questions for weekly/midterm quizzes and 60 questions for terminal exams. Never bypass `validateQuestionCount()`.
* **Topic-Accurate Lesson Imagery Architecture:** Every lesson in `curriculum-src/` and compiled `lesson.html` must feature an authentic, high-resolution educational image or diagram that precisely matches the lesson's core topic and the specific `alt`/`caption` description. Reusing generic or hardcoded duplicate placeholders across unrelated topics is strictly prohibited. Image URLs must be mapped via the curated `LESSON_IMAGE_CATALOG` in `scripts/compile-curriculum.js` or specified via explicit `src` attributes in the markdown `[IMAGE: ...]` tag.
* **WCAG 2.1 AA Accessibility:** Maintain semantic landmarks, high contrast ratios (minimum 4.5:1), screen-reader live regions, and 3px keyboard focus rings (`outline: 3px solid rgba(29, 78, 216, 0.25)`).
