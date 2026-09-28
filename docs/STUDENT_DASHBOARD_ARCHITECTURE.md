# MindStormer Global Academy (MSA-500) Student Learning Dashboard & NERDC Curriculum Architecture Specification

## 1. Executive Summary & Curriculum Identity

MindStormer Global Academy (MSA) is an enterprise K–8 / Junior Secondary (JSS 1–3) Learning Management System running on **Moodle 4.x** (Ubuntu VPS, Nginx, PHP-FPM, MySQL, Theme Boost).

This document serves as the authoritative technical specification and design standard for the **Student Learning Dashboard** (`/my/`). It unifies frontend template engineering, backend data ingestion, visual assets, and curriculum delivery under the official **Nigerian Educational Research and Development Council (NERDC)** Universal Basic Education (UBE) standard.

### 1.1 Core Institutional Directives
1. **NERDC 4-Cluster Framework**: All student learning surfaces and gradebook metrics reflect the national curriculum clusters: **Basic Science & Technology (BST)**, **Pre-Vocational Studies (PVS)**, **National Values Education (NVE)**, and **Core Languages & General Disciplines (CLG)**.
2. **Class-Only Scoping (No Cohorts)**: Students belong strictly to their academic **Class** (e.g. `Class: JSS 1`). All arbitrary cohort subdivisions ("Emerald", "Ruby") are decommissioned to ensure direct alignment with Nigerian basic school administration.
3. **De-gamified Executive Standard**: Strict enterprise corporate visual language matching `mayndstomir.com`. No cartoon badges, flame streaks, or casual emojis. Academic excellence is conveyed through tabular figures, continuous assessment standing (40%), examination targets (60%), and the **80% Mastery Gate**.
4. **PhET Lab Decommissioning**: Third-party virtual STEM simulation iframes, Colorado WebGL scripts, and obsolete STEM buzzwords are completely scrapped in favor of direct, frictionless access to weekly lessons and quizzes.
5. **Retina Image Asset Pipeline**: Visual engagement is powered by 15 pre-rendered retina course covers (`1600 × 900 px`, 16:9) in `img/course-covers/junior-secondary/jss-1/` and 256px vector cluster icons in `img/cluster-icons/`.

---

## 2. The 7 Core Display Zones of the Learning Dashboard

The student dashboard is structured into **seven purposeful, non-distracting zones** that guide the student through their academic day:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ ZONE 1: Executive Top Navigation & Global Identity Bar                                │
│         [Logo]  |  [Active Term: 2026/2027]  [Attendance: 98.4%]  |  [Student Avatar ▾]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 2: Morning Briefing & Fast-Resume Hero Card                                      │
│         "Welcome back, Alex • Class: JSS 1"                                            │
│         ┌────────────────────────────────────────────────────────────────────┐         │
│         │ ACTIVE LESSON: Week 02 — Nutrition & Balanced Diet (Basic Science) │         │
│         │ Term Progress: Week 2 of 10 • 80% Gate Pending                      │         │
│         │ [ Continue Lesson ➔ ]                                             │         │
│         └────────────────────────────────────────────────────────────────────┘         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 3: Continuous Assessment & Mastery Gate Metrics Strip                             │
│         [ CA Standing: 36.0/40 ]  [ Exam Target: 54/60 ]  [ 80% Gate: Cleared ✓ ]      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 4: THE CORE — NERDC Enrolled Subjects Grid (Class: JSS 1)                         │
│         Filter Tabs: [All (15)] [BST Cluster] [PVS Cluster] [NVE Cluster] [CLG Core]  │
│         ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐      │
│         │ Basic Science (146) │  │ Basic Technology    │  │ Computer Studies    │ ...  │
│         │ [Retina Cover 16:9] │  │ [Retina Cover 16:9] │  │ [Retina Cover 16:9] │      │
│         │ CA: 88.5% (Cleared) │  │ CA: 82.0% (Cleared) │  │ CA: 78.0% (Pending) │      │
│         │ [ Enter Course ➔ ]  │  │ [ Enter Course ➔ ]  │  │ [ Enter Course ➔ ]  │      │
│         └─────────────────────┘  └─────────────────────┘  └─────────────────────┘      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 5: Academic Milestones & Assessment Timeline                                     │
│         • Friday 1:55 PM: Week 02 CA Quiz Auto-Submission Lockout                     │
│         • Midterm Assessment: 30 Questions Comprehensive CA Pool                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 6: Guardian Sync & Home Application Banner                                        │
│         Linked Mentor: Dr. Johnson • Tonight's Sync: Water Storage Inspection         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ZONE 7: Moodle Core Feed & Activity Stream ({{{ output.main_content }}})               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Zone 1: Executive Top Navigation & Global Identity Bar
- Standardized dark squircle brand mark (`#0F172A`, `w-10 h-10 rounded-xl`).
- Direct brand logo routing to `{{{ config.wwwroot }}}/index.html`.
- Formal status chips: `Active Term: 2026/2027` and `Curriculum Progress: 85%`.
- **Student Profile & Settings Trigger Pill**: Includes student initials (`AJ`), class indicator (`Class: JSS 1`), and triggers the Slide-Over Settings Drawer (`aria-haspopup="dialog"`).

### Zone 2: Morning Briefing & Fast-Resume Hero Card
- **Personalized Header**: `"Welcome back, [Full Name] • Class: JSS 1"`.
- **Fast-Resume Widget**: High-contrast, card-within-card component identifying the student's active weekly module:
  - Subject: **Basic Science** (BST Cluster).
  - Active Week: **Week 02: Nutrition and Balanced Diet**.
  - Current Status: `In Progress • 80% Mastery Gate Pending`.
  - Immediate Action CTA: `<a href="{{{ config.wwwroot }}}/course/view.php?id=146" class="btn-enterprise-primary"><span>Continue Lesson</span> ...</a>`.

### Zone 3: Continuous Assessment & Mastery Gate Metrics Strip
Four formal academic indicators with tabular lining figures (`font-variant-numeric: tabular-nums`):
1. **Academic Class Standing**: `Class: JSS 1` (Grade 7 Universal Basic Education).
2. **Continuous Assessment (40%)**: `36.0 / 40.0` with verified `80% Mastery Gate: Cleared ✓` badge.
3. **Examination Target (60%)**: `54.0 / 60.0` scheduled terminal examination weight.
4. **Verified Attendance Standing**: `98.4%` daily login and attendance record.

### Zone 4: The Core — NERDC Enrolled Subjects Grid (Class: JSS 1)
- Prominently positioned **above the fold**.
- Filter tabs for the 4 NERDC clusters: `All Subjects (15)`, `BST Cluster`, `PVS Cluster`, `NVE Cluster`, `CLG Core`.
- Each subject card displays:
  - 16:9 Retina Cover Image (from `img/course-covers/junior-secondary/jss-1/`).
  - Cluster Pill badge (e.g. `BST Cluster` with blue dot).
  - Subject Title & 2-line curriculum description.
  - Term Continuous Assessment progress bar and score.
  - Active `<a href="{{{ config.wwwroot }}}/course/view.php?id={id}" class="btn-enterprise-primary">Enter Course</a>` button.

### Zone 5: Academic Milestones & Assessment Timeline
- Weekly quiz auto-lockouts (e.g. Friday 1:55 PM auto-submission rule prior to the 2:00 PM lockout).
- Formative Midterm Assessment window (30-question pool covering Weeks 1–5).
- Terminal Examination schedule (50-question pool covering the 10-week syllabus).

### Zone 6: Guardian Sync & Home Application Banner
- Transparency card displaying the student's linked guardian/mentor (`user_to_mentor`).
- Highlights the current week's practical home sync assignment (e.g. inspecting domestic water storage and kitchen hygiene).

### Zone 7: Moodle Core Feed & Activity Stream (`{{{ output.main_content }}}`)
- Placed cleanly at the base of the dashboard.
- Renders native Moodle blocks (course calendar, announcements, teacher messages) styled with corporate `.card-enterprise` rules.

---

## 3. NERDC 4-Cluster Curriculum Architecture (JSS 1)

The curriculum covers 15 standardized NERDC subjects across four functional clusters:

| Academic Cluster | Code | Subjects Included (JSS 1) | Target Course Link (Pilot) |
|---|---|---|---|
| **Basic Science & Technology** | `BST` | • Basic Science<br>• Basic Technology<br>• Information Technology (Computer Studies)<br>• Physical & Health Education (PHE) | `/course/view.php?id=146` (Basic Science) |
| **Pre-Vocational Studies** | `PVS` | • Agricultural Science<br>• Home Economics | `/course/view.php?id=151` |
| **National Values Education** | `NVE` | • Civic Education<br>• Social Studies<br>• Security Education | `/course/view.php?id=153` |
| **Core Languages & General Disciplines** | `CLG` | • Mathematics<br>• English Studies<br>• Business Studies<br>• Cultural & Creative Arts (CCA)<br>• French Language<br>• Christian / Islamic Religious Studies | `/course/view.php?id=149` (Math)<br>`/course/view.php?id=150` (English) |

---

## 4. Retina Image Asset Pipeline (`img/`)

The repository includes 15 pre-rendered `@2x DPI` retina course covers specifically for JSS 1, located in `img/course-covers/junior-secondary/jss-1/`.

```
img/
├── cluster-icons/
│   ├── icon-bst.png               # 256x256 Retina Cluster Badge (BST)
│   ├── icon-pvs.png               # 256x256 Retina Cluster Badge (PVS)
│   ├── icon-rnv.png               # 256x256 Retina Cluster Badge (NVE/RNV)
│   └── icon-core.png              # 256x256 Retina Cluster Badge (CLG/Core)
└── course-covers/
    └── junior-secondary/
        └── jss-1/
            ├── basic-science.png             # Course 146 (Active Pilot)
            ├── basic-technology.png          # Course 147
            ├── computer-studies.png          # Information Technology
            ├── mathematics.png               # Mathematics
            ├── english-studies.png           # English Studies
            ├── agricultural-science.png      # Agricultural Science
            ├── business-studies.png          # Business Studies
            ├── civic-education.png           # Civic Education
            ├── cultural-creative-arts.png    # Cultural & Creative Arts
            ├── french-language.png           # French Language
            ├── home-economics.png            # Home Economics
            ├── physical-health-education.png # Physical & Health Education
            ├── religious-studies.png         # CRS / IRS
            ├── security-education.png        # Security Education
            └── social-studies.png            # Social Studies
```

### 4.1 Card Markup Specification
Every course card in `dashboard.mustache` and `dashboard.html` adheres to this exact markup:

```html
<div class="card-enterprise overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200">
  
  <!-- 16:9 Retina Cover Image -->
  <div class="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden">
    <img src="{{{ config.wwwroot }}}/img/course-covers/junior-secondary/jss-1/basic-science.png" 
         alt="JSS 1 Basic Science Course Cover" 
         class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
         loading="lazy" />
    
    <!-- Cluster Tag Badge -->
    <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/80">
      <span class="w-2 h-2 rounded-full bg-blue-400"></span>
      <span class="text-[10px] font-black text-white uppercase tracking-wider">BST Cluster</span>
    </div>
  </div>

  <!-- Content & Performance Area -->
  <div class="p-5 flex-1 flex flex-col justify-between">
    <div>
      <h3 class="text-base font-black text-[#0F172A] font-heading mb-1">Basic Science</h3>
      <p class="text-xs text-slate-500 font-medium mb-4 line-clamp-2">Environmental sanitation, nutrition, disease vectors, and balanced energy systems.</p>
    </div>

    <!-- 40% CA Progress Indicator -->
    <div>
      <div class="flex justify-between items-center text-[10px] font-bold text-slate-600 mb-1.5">
        <span>Continuous Assessment (40%)</span>
        <span class="text-emerald-700 font-extrabold">88.5% (Cleared ✓)</span>
      </div>
      <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
        <div class="bg-emerald-600 h-full rounded-full" style="width: 88.5%;"></div>
      </div>

      <!-- Action Button -->
      <a href="{{{ config.wwwroot }}}/course/view.php?id=146" 
         class="btn-enterprise-primary w-full mt-4 justify-between" 
         aria-label="Enter JSS 1 Basic Science Course">
        <span>Enter Course</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </a>
    </div>
  </div>

</div>
```

---

## 5. Inioluwa Backend Integration Contract (`$templatecontext`)

Inioluwa (Backend Engineer) populates the following typed schema in `theme/boost/layout/` when rendering `theme_boost/dashboard`:

```json
{
  "sitename": "MindStormer Global Academy",
  "sesskey": "abc123xyz",
  "config": {
    "wwwroot": "https://msa.mayndstomir.com/moodle"
  },
  "user": {
    "id": 42,
    "fullname": "Alex Johnson",
    "firstname": "Alex",
    "lastname": "Johnson",
    "email": "alex.johnson@student.msa.edu.ng",
    "student_id": "MSA/2026/JSS1/0142",
    "class_name": "JSS 1",
    "avatar_initials": "AJ"
  },
  "guardian": {
    "has_linked_guardian": true,
    "fullname": "Dr. Sarah Johnson",
    "relationship": "Parent / Legal Guardian",
    "email": "s.johnson@example.com",
    "phone": "+234 803 123 4567",
    "linking_verified": true
  },
  "academic_standing": {
    "active_term": "Term 01 (2026/2027)",
    "ca_score": "36.0",
    "ca_max": "40.0",
    "ca_percent": "90.0%",
    "exam_target": "54.0",
    "exam_max": "60.0",
    "gate_cleared": true,
    "gate_status_text": "80% Mastery Gate: Cleared ✓",
    "attendance_percent": "98.4%",
    "attendance_status": "Verified Present"
  },
  "fast_resume": {
    "has_active_lesson": true,
    "subject_name": "Basic Science",
    "cluster_code": "BST",
    "week_number": "02",
    "topic_title": "Nutrition and Balanced Diet",
    "progress_percent": 65,
    "action_url": "https://msa.mayndstomir.com/moodle/course/view.php?id=146"
  },
  "enrolled_courses": [
    {
      "id": 146,
      "fullname": "Basic Science",
      "cluster_code": "BST",
      "cluster_name": "Basic Science & Technology",
      "cover_img": "img/course-covers/junior-secondary/jss-1/basic-science.png",
      "ca_score": "88.5%",
      "ca_cleared": true,
      "current_week": "Week 02",
      "current_topic": "Nutrition and Balanced Diet",
      "course_url": "https://msa.mayndstomir.com/moodle/course/view.php?id=146"
    }
  ]
}
```

### Dual-Resilience Standard
If `$templatecontext['enrolled_courses']` is provided from Moodle via `enrol_get_all_users_courses($USER->id, true)`, the template iterates dynamically over the array. If running in static preview (`dashboard.html`) or during offline testing, the template falls back to deterministic JSS 1 default courses without throwing errors or rendering empty holes.

---

## 6. Student Profile & Settings Drawer Subsystem

To keep students focused on learning without navigating away to disconnected administrative screens, the dashboard features an accessible **Slide-Over Settings Drawer**:

### 6.1 Trigger & Header Placement
Positioned on the far right of the top navigation bar:
```html
<button type="button" 
        id="btn-open-settings" 
        aria-haspopup="dialog" 
        aria-expanded="false" 
        aria-controls="student-settings-drawer" 
        class="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg text-white text-xs font-bold transition-colors">
  <div class="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-black text-xs">AJ</div>
  <span class="hidden sm:inline">Settings</span>
  <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
</button>
```

### 6.2 Settings Drawer Sections
1. **Academic Credentials & Identity**:
   - Full Name: `Alex Johnson`
   - Class Level: `Class: JSS 1`
   - Admission / Student ID: `MSA/2026/JSS1/0142`
   - Registered Email: `alex.johnson@student.msa.edu.ng`
2. **Security & Credentials Management**:
   - Action Button: `<a href="{{{ config.wwwroot }}}/login/change_password.php" class="btn-enterprise-outline w-full">Change Password</a>`
   - Explanatory copy on the MSA-500 strong password requirement.
3. **Linked Guardian Transparency (`user_to_mentor`)**:
   - Displays verified linked parent/guardian name: `Dr. Sarah Johnson`.
   - Contact email and phone number.
   - Status badge: `Verified Account Linked ✓`.
4. **Preferences & Accessibility**:
   - Direct link to Moodle user preferences: `<a href="{{{ config.wwwroot }}}/user/preferences.php">Moodle System Preferences ➔</a>`.

### 6.3 Accessibility Contracts (WCAG 2.1 AA)
- Focus is trapped inside the drawer when open.
- Pressing `Escape` closes the drawer and restores focus to `#btn-open-settings`.
- Backdrop click closes the drawer with a smooth CSS glide transition.

---

## 7. PhET Simulation & Obsolete STEM Decommissioning Mandate

The previous experimental PhET Circuit Construction Kit embed has been permanently scrapped:
1. **Container Removed**: `.simulation-embed-container` and its children (`.lab-iframe-wrapper`, `.lab-facade-cover`, `.lab-fallback-card`) are purged.
2. **No Colorado Iframes**: No external requests to `phet.colorado.edu` exist on any student surface.
3. **Zero Cumulative Layout Shift**: Eliminates the 16:9 iframe jump and prevents mobile scroll-trapping.
4. **Terminology Cleaned**: Phrasing such as *"virtual STEM laboratory modules"* is eliminated in favor of *"Universal Basic Education (UBE) • NERDC Curriculum Subjects"*.

---

## 8. Quality Assurance & Test Verification

All changes are verified against the automated quality gate:

```bash
# Execute full validation suite (725+ passing assertions)
npm test
```

### Enforced Assertion Contracts:
1. `docs/STUDENT_DASHBOARD_ARCHITECTURE.md` exists and documents NERDC 4-Cluster architecture.
2. `dashboard.mustache` contains 0 PhET simulation iframes or obsolete simulation classes.
3. `dashboard.mustache` contains 0 informal emojis (🔥, 🏆, 🚀).
4. `dashboard.mustache` enforces Class-only scoping (`Class: JSS 1`) with zero cohort tags.
5. `dashboard.mustache` contains direct links to Moodle Course ID 146 (`/course/view.php?id=146`).
6. `dashboard.mustache` integrates the retina image pipeline (`img/course-covers/junior-secondary/jss-1/`).
