# Project Context: MindStormer Academy (MSA-500) LMS

## 1. Project Overview & Architecture
MindStormer Global Academy (MSA) is an enterprise K–8 / JSS 3 STEM-focused LMS running on **Moodle 4.x** (Ubuntu VPS, Nginx, PHP-FPM, MySQL). The active frontend theme is built on top of **Theme Boost** utilizing custom Mustache templates (`.mustache`), vanilla JavaScript, and Tailwind CSS / custom corporate CSS utility classes.

---

## 2. Team Roles & Division of Labor
* **Olamiposi (Lead Frontend Developer & UI/UX Architect):**
  - Owns all Mustache templates (`theme/boost/templates/`), client-side JavaScript, UI assets, and CSS/SCSS styling.
  - Enforces the **Maynd Stormir Enterprise Corporate Theme** across all student and guardian surfaces.
  - Strips all playful/gamified elements (XP counters, flame streaks, level-up badges, informal emojis) in favor of executive academic metrics.
  - Maintains strict WCAG 2.1 AA accessibility compliance and writes the final UI/UX theme transition documentation.
* **Inioluwa (Backend & Infrastructure Engineer):**
  - Manages VPS server administration, Nginx configurations, Moodle CLI engines, and course module uploads.
  - Manages `msa_provision.php` bulk account linking (`user_to_mentor`), gradebook aggregation (40% CA / 60% Exam), and dynamic report cards (`mod_customcert`).
* **Adeyemi Ajifowowe (Project Stakeholder / Lead):**
  - Final milestone review and corporate brand alignment approval.

---

## 3. Current Backend State
1. **Dynamic Authentication Routing:** `theme/boost/layout/login.php` routes student and parent portals via `?role=parent` parameters directly to custom standalone Mustache templates.
2. **Gradebook & CA Engine:** Standardized aggregation set to **Weighted Mean of Grades** split into **Continuous Assessment (40%)** and **Term Examinations (60%)**.
3. **Automated Tracking & Reporting:** `mod_attendance` handles daily login tracking; `mod_customcert` generates dynamic PDF report cards mapped to gradebook categories.
4. **Account Provisioning:** `msa_provision.php` CLI engine creates accounts in bulk and establishes parent-ward relationships (`user_to_mentor`).
5. **Interactive Embed Policies:** HTML5 simulation filters are active, supporting inline embeds for PhET Interactive Simulations and Tinkercad labs.

---

## 4. Current Frontend & Curriculum Scope (Active Deliverables)
1. **Curriculum Ingestion Pipeline & Architecture:**
   - Maintain the `curriculum-src/` (authoring) to `content/` (compiled Moodle artifacts) separation of concerns.
   - Enforce Moodle VPS constraints via `scripts/compile-curriculum.js`: 100% `<div>` containers (zero `<section>`/`<article>`), external Iconify API `<img>` tags (zero inline `<svg>`), `/top/` question bank hierarchy, explicit `<defaultgrade>1.0</defaultgrade>`, and `{{PENDING_CMID}}` CTA placeholders.
   - Maintain authoritative documentation in `docs/COURSE_INGESTION_SCHEMA.md` and `docs/CONTENT_AUTHORING_TEMPLATE.md`.
2. **Pilot Academic Module Delivery:**
   - JSS 1 Basic Science Term 01: Weeks 01–02 lessons and assessments, Midterm CA pool (30 Qs), and Terminal Examination pool (50 Qs).
   - Course Overview & 10-Week Syllabus interface with scheduled modules.
3. **Enterprise Design System & Authentication Continuity:**
   - Enforce Maynd Stormir light institutional design system across all views.
   - Maintain `docs/UI_UX_ENTERPRISE_DESIGN_SYSTEM.md` and `docs/POST_REGISTRATION_MOODLE_INTEGRATION.md`.

---

## 5. Agent Instructions & Constraints
* **Brand Rule:** Strict enterprise corporate look matching `mayndstomir.com`. No cartoon badges, no XP systems, no game mechanics.
* **Scope Boundary:** Keep modifications within `templates/*.mustache`, `scss/*`, `src/js/*`, `docs/*`, and test files. Do not alter backend PHP logic.
* **Accessibility (WCAG 2.1 AA):** Maintain semantic landmarks, high contrast ratios, screen-reader live regions, and keyboard focus rings (`outline: 3px solid`).
