# MindStormer Global Academy (MSA-500) LMS

Official enterprise repository for **MindStormer Global Academy** (`msa.mayndstormir.com`), an enterprise K–8 / Junior Secondary (JSS 1–3) STEM-focused Learning Management System built on **Moodle 4.x** (Ubuntu VPS, Nginx, PHP-FPM, MySQL).

Engineered with the **Maynd Stormir Enterprise Corporate Theme** aligned with `mayndstomir.com`, the platform replaces casual gamification mechanics with rigorous academic indicators: a **40% Continuous Assessment (CA) / 60% Terminal Examination** framework, strict WCAG 2.1 AA accessibility standards, 139 retina-resolution course visual assets, and high-trust Parent Transparency Portals.

---

## 1. Core Architectural Pillars

- **Maynd Stormir Corporate Visual Standard**: Executive Navy (`#0F172A`), Slate (`#334155`), Cobalt (`#1D4ED8`), and Emerald (`#047857`) surfaces. Zero informal emojis, cartoon badges, or XP counters.
- **NERDC 4-Cluster Framework**: Complete 15-subject curriculum structure spanning Foundational Primary (Grades 1–3), Upper Primary (Grades 4–6), and Junior Secondary (JSS 1–3).
- **Dual-Assessment Tracking**: 40% Continuous Assessment (weekly laboratory submissions, quizzes, and class activities) paired with 60% Terminal Examinations.
- **Headless Course Asset Extraction**: 139 retina-grade (`@2x`, 1600×900 covers & 256×256 badges) assets generated and extracted via Playwright from a unified staging canvas.
- **A4 Single-Page Print Report Cards**: High-density, print-accurate report cards engineered for Moodle PDF generators (`mod_customcert` / Dompdf / TCPDF) without page overflow.
- **Post-Registration Verification Workflows**: Full Moodle-native Mustache and self-contained HTML fallback screens for email verification and account activation.

---

## 2. NERDC 4-Cluster Curriculum Architecture

The academic curriculum covers 15 NERDC subjects organized into four core clusters across Grades 1–9:

| Academic Cluster | Acronym | Core Subjects | Assessment Weighting |
|---|---|---|---|
| **Basic Science & Technology** | `BST` | Basic Science, Basic Technology, Information Technology (Computer Studies), Physical & Health Education (PHE) | 40% CA + 60% Exam |
| **Pre-Vocational Studies** | `PVS` | Agricultural Science, Home Economics | 40% CA + 60% Exam |
| **National Values Education** | `NVE` | Civic Education, Social Studies, Security Education | 40% CA + 60% Exam |
| **Core Languages & General Disciplines** | `CLG` | Mathematics, English Studies, Cultural & Creative Arts (CCA), Business Studies, Christian Religious Studies (CRS) / Islamic Studies (IRS) | 40% CA + 60% Exam |

---

## 3. High-Resolution Visual Asset Pipeline (`img/`)

The repository features 139 retina-quality (`@2x DPI`) PNG assets located directly in `img/`, extracted via Node.js + Playwright from `staging-canvas.html`:

- **Course Covers (1600 × 900 px)**: 108 distinct course cards featuring tier-specific visual graduation (soft inviting curves for Primary 1–3, vibrant dual-tones for Primary 4–6, and mature midnight/cobalt technical styling for JSS 1–3).
- **Cluster & Subject Badges (256 × 256 px)**: 27 crisp vector-rendered subject pods for navigation and gradebook category displays.
- **Tier Hero Assets (1200 × 675 px)**: 4 master curriculum banners representing Foundational, Upper Primary, Junior Secondary, and Full Curriculum tracks.

### Re-Extracting Assets:
```bash
# Launch headless extraction with 500ms font rasterization buffer
node scripts/export-assets.js
```

---

## 4. Single-Page A4 Academic Report Cards

Three print-optimized report card layouts are available in both standalone preview HTML and Moodle template formats:

1. **Terminal Continuous Assessment Report (`report-card-preview.html` / `report-card.mustache`)**:
   - Single-page A4 format containing 15 subjects with 40% CA / 60% Exam breakdown, teacher remarks, grading scales, and digital principal seal.
2. **Mid-Term Performance Progress Report (`midterm-preview.html`)**:
   - Formative mid-session evaluation tracking attendance, behavioral milestones, and CA progress leading into the 80% mastery gate.
3. **Annual Cumulative Summary Report (`annual-preview.html`)**:
   - Comprehensive multi-term transcript displaying Term 1, Term 2, and Term 3 averages, cumulative scores, promotion status, and academic honors.

---

## 5. Post-Registration Authentication Gateway

MindStormer Global Academy implements branded confirmation interfaces for post-registration workflows:

1. **Check Your Email Screen (`check-email-confirmation.mustache` / `check-email-confirmation.html`)**:
   - Informs users of the cryptographic activation token dispatched to their inbox.
   - Features kid-friendly and parent-friendly troubleshooting steps, resend triggers, and accessible inline Lucide vector SVGs.
2. **Account Confirmed Screen (`registration-confirmed.mustache` / `registration-confirmed.html`)**:
   - Greets verified students and guardians, confirms 15 NERDC course workspace setup, and provides direct routing into `dashboard.html` (`/my/`).

Full integration instructions for Inioluwa (Backend Engineer) are documented in [`docs/POST_REGISTRATION_MOODLE_INTEGRATION.md`](docs/POST_REGISTRATION_MOODLE_INTEGRATION.md).

---

## 6. Repository Layout

```text
MSA-500/
├── index.html                           # Enterprise Marketing & Curriculum Landing Page
├── login.html                           # Student Portal Sign In
├── signup.html                          # Student Registration & Cohort Onboarding
├── dashboard.html                       # Student Academic Workspace & Lab Modules
├── parent-login.html                    # Guardian Portal Sign In
├── parent-signup.html                   # Guardian Onboarding & Ward Linking
├── parent-dashboard.html                # Guardian Transparency Dashboard & Transcripts
├── check-email-confirmation.html        # Post-Registration "Check Email" Screen (Standalone)
├── registration-confirmed.html          # Post-Registration "Confirmed" Welcome Screen (Standalone)
├── staging-canvas.html                  # Master Visual Asset Canvas (All 139 Covers & Badges)
│
├── previews/                            # Browser-Ready Standalone Previews
│   ├── check-email-confirmation.html    # Email Pending Standalone Preview
│   ├── registration-confirmed.html      # Account Confirmed Standalone Preview
│   ├── report-card-preview.html         # Terminal Report Card (A4 Print Preview)
│   ├── midterm-preview.html             # Mid-Term Report Card (A4 Print Preview)
│   └── annual-preview.html              # Annual Cumulative Report Card (A4 Print Preview)
│
├── templates/mustache/                  # Reference Moodle Mustache Templates
│   ├── login.mustache                   # Student & Parent Login
│   ├── signup.mustache                  # Account Registration
│   ├── dashboard.mustache               # Student Dashboard & Course Grid
│   ├── parent-ward-grades.mustache      # Guardian Gradebook & Ward Progress
│   ├── virtual-lab-embed.mustache       # PhET & Tinkercad Zero-CLS Simulation Embeds
│   ├── report-card.mustache             # Printable Report Card Template
│   ├── check-email-confirmation.mustache# Pending Activation Moodle Screen
│   └── registration-confirmed.mustache  # Activation Success Moodle Screen
│
├── theme/boost/templates/               # Production Theme Boost Directory (Exact Mirrored Parity)
│   ├── login.mustache
│   ├── signup.mustache
│   ├── dashboard.mustache
│   ├── parent-ward-grades.mustache
│   ├── virtual-lab-embed.mustache
│   ├── report-card.mustache
│   ├── check-email-confirmation.mustache
│   └── registration-confirmed.mustache
│
├── img/                                 # 139 Retina Course PNGs (@2x DPI, 1600x900 & 256x256)
├── scripts/
│   ├── build-canvas.js                  # Generator for staging-canvas.html
│   └── export-assets.js                 # Playwright 2x Retina Asset Extraction Engine
│
├── tests/
│   └── form-validation.test.js          # Jest Enterprise Test Suite (570+ Passing Assertions)
│
└── docs/
    ├── UI_UX_ENTERPRISE_DESIGN_SYSTEM.md # Enterprise Tokens, Typography & WCAG Contracts
    └── POST_REGISTRATION_MOODLE_INTEGRATION.md # Dual-Path Moodle Deployment Guide
```

---

## 7. Verification & Quality Gates

The platform enforces strict automated test verification via Jest and JSDOM:

```bash
# Execute full validation suite (570+ assertions)
npm test
```

### Key Verification Checks:
- **Zero Gamification**: Ensures XP counters, streaks, and casual emojis are completely absent.
- **Accessibility & Contrast**: Confirms semantic landmarks, `min-h-[48px]` interactive touch targets, and ARIA attributes.
- **Template Parity**: Asserts 100% cryptographic SHA-256 parity between `templates/mustache/` and `theme/boost/templates/`.
- **Asset Integrity**: Validates the presence of 139 retina PNG course assets under `img/`.
- **Form Safety**: Tests RFC-compliant email validators, password entropy meters, and role parameter preservation (`?role=parent`).

---

## 8. Team Roles & Division of Labor

- **Olamiposi (Creative / Frontend Lead & UI/UX Architect):**
  - Owns Mustache templates, client-side scripts, Tailwind styling, WCAG 2.1 AA accessibility, and enterprise design tokens.
- **Inioluwa (Systems & Backend Infrastructure Engineer):**
  - Manages Ubuntu VPS administration, Nginx, PHP-FPM, Moodle CLI engines (`msa_provision.php`), gradebook aggregation, and customcert PDF engines.
- **Adeyemi Ajifowowe (Project Stakeholder & Operations Lead):**
  - Milestone review, curriculum standard enforcement, and institutional brand alignment.