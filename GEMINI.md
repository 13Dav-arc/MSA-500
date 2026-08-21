# Project Context: MindStormer Academy (MSA-500) LMS

## 1. Project Overview & Architecture
MindStormer Global Academy (MSA) is a custom K–8/JSS 3 STEM-focused LMS running on **Moodle 4.x** (Ubuntu VPS, Nginx, PHP-FPM, MySQL). The active frontend theme is built on top of **Theme Boost** utilizing custom Mustache templates (`.mustache`), vanilla JavaScript, and Tailwind CSS / custom tactile CSS utility classes.

---

## 2. Team Roles & Division of Labor
* **Olamiposi (Lead Frontend Developer & UI/UX Architect):**
  - Owns all Mustache templates (`theme/boost/templates/`), client-side JavaScript, UI assets, and CSS styling.
  - In charge of WCAG 2.1 AA accessibility standards, tactile/Duolingo-style UI components, responsive layout consistency, and client-side form validation.
  - Implements gamification visual elements (XP counters, Level Up! badges, progress tracks) and K–8 course card UI components.
* **Inioluwa (Backend & Infrastructure Engineer):**
  - Manages VPS server administration, Nginx configurations, Moodle CLI engines, and database migrations.
  - Configures backend routing (`classes/output/core_renderer.php`, `layout/login.php`), user role provisioning (`user_to_mentor`), gradebook aggregation, and custom plugins (`mod_attendance`, `mod_customcert`).
* **Yemi (Project Stakeholder / Lead):**
  - Oversees sprint milestones and milestone approvals.

---

## 3. Current Backend State & Implemented Plumbings
The backend infrastructure is fully deployed and configured:
1. **Dynamic Authentication Routing:** `theme/boost/layout/login.php` routes student and parent portals via `?role=parent` parameters directly to custom standalone Mustache templates (`login`, `parent_login`, `signup`, `parent_signup`).
2. **Gradebook & CA Engine:** Standardized aggregation set to **Weighted Mean of Grades** split into **Continuous Assessment (40%)** and **Term Examinations (60%)**.
3. **Automated Tracking & Reporting:** `mod_attendance` handles daily login tracking; `mod_customcert` generates dynamic PDF report cards mapped to gradebook categories.
4. **Account Provisioning:** `msa_provision.php` CLI engine creates accounts in bulk and establishes parent-ward relationships (`user_to_mentor`).
5. **Interactive Embed Policies:** HTML5 simulation filters are active, supporting inline embeds for PhET Interactive Simulations and Tinkercad labs.

---

## 4. Current Frontend Scope (Sprint Deliverables)
We are integrating the next phase of student and guardian dashboards:
1. **Gamification & Engagement UI:**
   - Duolingo-style XP badges, streak counters, and "Level Up!" modal/banner components.
   - Dynamic progress meters reflecting module completion.
2. **K–8 & JSS 3 Course Display:**
   - Tactile course cards and track banners for Primary 1 to JSS 3 subject templates.
   - Clean containment for PhET / Tinkercad iframe widgets without layout shifts.
3. **Parent Dashboard Interface:**
   - Ward performance card templates displaying CA/Exam weighted progress and dynamic report card download links.

---

## 5. Agent Instructions & Constraints
When generating code, modifying files, or planning tasks:
* **Strict Frontend Focus:** Do not alter core Moodle PHP backend logic, schema tables, or server configs unless explicitly instructed. Keep modifications contained to `templates/*.mustache`, `src/js/*`, and CSS/SCSS files.
* **Theme Styling Rules:**
  - Student Views: Primary Blue (`#2563EB`), Tactile Card Borders (`border-b-4` / `border-b-6`), Playful STEM Gamification.
  - Guardian Views: Emerald Green (`#059669`), Clean Dashboard Grids, Data-Focused Cards.
* **No Legacy Moodle Overwrites:** Ensure templates remain standalone and do not trigger recursive `{{{ output.main_content }}}` nesting bugs.
* **Accessibility (WCAG 2.1 AA):** All interactive elements must maintain proper ARIA attributes, semantic landmarks, high-contrast ratios, and full keyboard navigability.
* **Autonomous Execution:** When tasked with building or refactoring a template or JS component, verify syntax, ensure context variable bindings match Moodle requirements, and provide clean, modular code.
