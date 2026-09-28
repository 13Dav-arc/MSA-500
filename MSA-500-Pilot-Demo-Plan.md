# MSA-500 — JSS1 Basic Science Pilot Demo
## Technical Plan & Role Documentation

**Purpose:** A scoped, fast proof-of-concept for Yemi — Week 1, Week 2, a midterm test, and an end-of-term test for JSS1 Basic Science, demonstrating the full student loop (login → lesson → assessment → real graded report) without committing to all 10 weeks upfront.

**Status:** Approved by Yemi (pilot route). Icon set decision: [icones.js.org](https://icones.js.org/) icon sets, replacing emoji throughout.

---

## 1. Scope of This Demo

| Item | Included? |
|---|---|
| Week 1 — Sanitation (lesson + quiz) | Yes |
| Week 2 — Nutrition & Balanced Diet (lesson + quiz) | Yes |
| Midterm test (covers Weeks 1–2) | Yes |
| End-of-term test (terminal) | Yes |
| Weeks 3–10 | Not yet — placeholder only on the syllabus page |
| Full report card wired to real grades | Yes — this is the most convincing proof point for Yemi |

---

## 2. Corrected Content Schema

This supersedes the earlier draft schema. Three fixes are baked in below:
1. The Moodle category-declaration node is now included directly in the `quiz.xml` template (previously missing).
2. Each question explicitly sets a default grade of 1.0.
3. Icons replace emoji, and an explicit image/alt-text slot is added for accessibility.

### 2.1 Directory Structure (Source Repository & Separation of Concerns)

```
MSA-500/
├── curriculum-src/                                # AUTHORING SOURCE (Committed to Git)
│   └── junior-secondary/
│       └── jss-1/
│           └── basic-science/
│               ├── term-01/
│               │   ├── week-01.md
│               │   ├── week-02.md
│               │   ├── midterm.md
│               │   └── end-of-term.md
│               ├── term-02/
│               └── term-03/
│
└── content/                                       # COMPILED MOODLE ARTIFACTS (Committed for Ini)
    └── junior-secondary/
        └── jss-1/
            └── basic-science/
                ├── term-01/
                │   ├── week-01/
                │   │   ├── lesson.html
                │   │   └── quiz.xml
                │   ├── week-02/
                │   │   ├── lesson.html
                │   │   └── quiz.xml
                │   ├── midterm/
                │   │   └── quiz.xml
                │   └── end-of-term/
                │       └── quiz.xml
                ├── term-02/
                └── term-03/
```

This structure decouples raw human-authored source files (`curriculum-src/`) from compiled Moodle production assets (`content/`). Moodle does not auto-discover this structure — each compiled file is imported by Ini per the procedure in Section 4.

### 2.2 Lesson Layout (`lesson.html`)

```html
<div class="msa-lesson-canvas">
  <div class="msa-lesson-card">

    <!-- SLOT 1: Metadata & Grading Weight Pill -->
    <header class="msa-meta-bar">
      <span class="msa-pill msa-pill-subject">{{GRADE}} - {{SUBJECT}}</span>
      <span class="msa-pill msa-pill-weight">{{ASSESSMENT_CATEGORY}} ({{WEIGHT_PERCENT}}% Weight)</span>
    </header>

    <!-- SLOT 2: Title & Executive Summary -->
    <h1 class="msa-lesson-title">Week {{WEEK_NUM}}: {{TOPIC_TITLE}}</h1>
    <p class="msa-lesson-subtitle">{{LESSON_SUBTITLE}}</p>

    <!-- SLOT 3: The Real-World Hook -->
    <section class="msa-hook-card">
      <div class="msa-hook-header">
        <span class="msa-icon" data-icon="{{HOOK_ICON_NAME}}" aria-hidden="true"></span>
        Why This Matters to You
      </div>
      <p class="msa-hook-body">{{REAL_WORLD_HOOK_TEXT}}</p>
    </section>

    <!-- SLOT 4: Key Terms Glossary -->
    <section class="msa-section">
      <h2 class="msa-section-title">
        <span class="msa-icon" data-icon="{{GLOSSARY_ICON_NAME}}" aria-hidden="true"></span>
        Key Terms
      </h2>
      <div class="msa-glossary-grid">
        <!-- Repeated 3-5 times -->
        <article class="msa-term-card">
          <strong class="msa-term-title">{{TERM_NAME}}</strong>
          <span class="msa-term-def">{{TERM_DEFINITION}}</span>
        </article>
      </div>
    </section>

    <!-- SLOT 5: Core Conceptual Content -->
    <section class="msa-section msa-prose">
      <h2 class="msa-section-title">{{CORE_CONCEPT_HEADING}}</h2>
      {{CORE_CONCEPT_HTML_CONTENT}}
      <!-- Image slot, repeat as needed -->
      <figure class="msa-figure">
        <img src="{{IMAGE_URL}}" alt="{{IMAGE_ALT_TEXT}}" class="msa-figure-img" />
        <figcaption class="msa-figure-caption">{{IMAGE_CAPTION}}</figcaption>
      </figure>
    </section>

    <!-- SLOT 6: Structured Comparative Matrix -->
    <section class="msa-section">
      <h2 class="msa-section-title">{{MATRIX_HEADING}}</h2>
      <div class="msa-matrix-grid">
        <!-- 2-4 Method/Classification Pods -->
        <article class="msa-matrix-card">
          <span class="msa-matrix-label">{{SUB_METHOD_OR_CLASS}}</span>
          <h3 class="msa-matrix-title">{{METHOD_NAME}}</h3>
          <p class="msa-matrix-body">{{METHOD_DESCRIPTION}}</p>
        </article>
      </div>
    </section>

    <!-- SLOT 7: Common Mistakes -->
    <section class="msa-section">
      <h2 class="msa-section-title">Common Mistakes to Avoid</h2>
      <div class="msa-callout msa-callout-error">
        <span class="msa-callout-badge">
          <span class="msa-icon" data-icon="{{ERROR_ICON_NAME}}" aria-hidden="true"></span>
          Common Mistake
        </span>
        <p class="msa-callout-text">{{MISCONCEPTION_STATEMENT}}</p>
      </div>
      <div class="msa-callout msa-callout-success">
        <span class="msa-callout-badge">
          <span class="msa-icon" data-icon="{{CHECK_ICON_NAME}}" aria-hidden="true"></span>
          Scientific Fact
        </span>
        <p class="msa-callout-text">{{FACT_CORRECTION}}</p>
      </div>
    </section>

    <!-- SLOT 8: Worked Examples -->
    <section class="msa-section">
      <h2 class="msa-section-title">Worked Examples</h2>
      <div class="msa-scenarios-container">
        <article class="msa-scenario-card">
          <h3 class="msa-scenario-title">Example {{SCENARIO_LETTER}}: {{SCENARIO_LABEL}}</h3>
          <p><strong>Context:</strong> {{SCENARIO_CONTEXT}}</p>
          <p><strong>Problem:</strong> {{SCENARIO_PROBLEM}}</p>
          <p class="msa-scenario-fix"><strong>Fix:</strong> {{SCENARIO_SOLUTION}}</p>
        </article>
      </div>
    </section>

    <!-- SLOT 9: Home Application & Guardian Sync -->
    <section class="msa-sync-card">
      <div class="msa-sync-header">
        <span class="msa-icon" data-icon="{{GUARDIAN_ICON_NAME}}" aria-hidden="true"></span>
        Home Application & Guardian Sync
      </div>
      <p class="msa-sync-body">{{GUARDIAN_PROMPT_TEXT}}</p>
    </section>

    <!-- SLOT 10: Terminal Action CTA -->
    <footer class="msa-cta-footer">
      <a href="{{MOODLE_QUIZ_URL}}" class="msa-primary-btn">
        Take Week {{WEEK_NUM}} Assessment (20 Questions)
        <span class="msa-icon" data-icon="{{ARROW_ICON_NAME}}" aria-hidden="true"></span>
      </a>
      <span class="msa-cta-subtext">
        1 Attempt Allowed - Passing Score: 50% (10/20) - Auto-Submitted at 1:55 PM
      </span>
    </footer>

  </div>
</div>
```

**Icon implementation note:** Since Moodle strips inline `<script>` execution contexts unpredictably, don't rely on an icon web font loaded via JS. The safest path with icones.js.org is to export the specific icons you need as inline SVG (icones.js.org supports direct SVG export per icon) and either (a) inline the SVG markup directly in place of the `data-icon` span, or (b) reference them as static SVG files uploaded to Moodle's file storage and pulled via `<img>`. Confirm which approach survives the content-cleaner test in Section 4, Step 1 before committing to one.

### 2.3 Assessment Schema (`quiz.xml`)

**Every quiz.xml file must start with the category declaration** — incorporating the `/top/` segment and multi-term taxonomy confirmed by Ini:

```xml
<?xml version="1.0" ?>
<quiz>

  <question type="category">
    <category>
      <text>$course$/top/JSS1_Basic_Science/Term_{{TERM_NUM}}/Week_{{WEEK_NUM}}_{{TOPIC_SLUG}}</text>
    </category>
  </question>

  <!-- Individual questions follow -->

</quiz>
```

**Category URI Patterns by Assessment Type:**
- Weekly Quiz: `$course$/top/JSS1_Basic_Science/Term_01/Week_02_Nutrition_and_Balanced_Diet`
- Midterm CA Quiz: `$course$/top/JSS1_Basic_Science/Term_01/Midterm_Assessment`
- Terminal Examination: `$course$/top/JSS1_Basic_Science/Term_01/Terminal_Examination`

**20 questions total, 100% auto-graded, distributed as:**
- Q01-14: Single-choice multiple choice (4 options, 1 correct)
- Q15-16: True/False
- Q17-18: Multi-select comprehension (2 correct at +50% each, 2 distractors at -50% each)
- Q19-20: Relational matching (3 sub-questions each)

**Every question must explicitly set:**
```xml
<defaultgrade>1.0</defaultgrade>
```
This is not automatic — without it, matching questions (with 3 sub-parts) may not weigh the same as single-choice questions, breaking the "10/20 = 50% passing" assumption.

Standard question-type XML blocks (single-choice, true/false, multi-select, matching) — unchanged from the original draft, each requires `<generalfeedback>` and per-answer `<feedback>` text so students get an explanation regardless of right/wrong.

---

## 3. Necessary Pages/Artifacts for This Demo

1. Course container — "JSS1 Basic Science" (Ini)
2. Week 1 — `week-01.md` (authoring) -> `lesson.html` + `quiz.xml` in `content/.../term-01/week-01/` (Sanitation) (Olamiposi)
3. Week 2 — `week-02.md` (authoring) -> `lesson.html` + `quiz.xml` in `content/.../term-01/week-02/` (Nutrition & Balanced Diet) (Olamiposi)
4. Midterm test — `midterm.md` (authoring) -> standalone `mod_quiz` `quiz.xml`, covering Weeks 1-2 (Olamiposi writes source, Ini imports/configures)
5. End-of-term test — `end-of-term.md` (authoring) -> standalone terminal `mod_quiz` `quiz.xml` (Olamiposi writes source, Ini imports/configures)
6. Course overview/syllabus page — shows the full intended 10-week shape, Weeks 1-2 live, Weeks 3-10 marked "coming soon" (Olamiposi)
7. One populated report card — wired to real computed grades from the two real quizzes, not demo data (Ini backend + Olamiposi template)

---

## 4. Role Documentation

### Olamiposi — Frontend & Content

**Sequence matters — steps 1-2 must happen before content-writing starts:**

1. Build the theme SCSS partial (`_msa-lesson-components.scss`) for every `.msa-*` class in Section 2.2, using existing "Enterprise Corporate Theme" design tokens (colors, type, spacing) — do not invent a new visual language for this
2. Resolve the icon implementation (Iconify API `<img>` tags) per the note in Section 2.2 and Ingestion Schema Section 3.3
3. Write Week 1 authoring markdown (`curriculum-src/.../term-01/week-01.md`) and compile to `lesson.html` + `quiz.xml` under `content/.../term-01/week-01/` (Sanitation), using the corrected schema
4. Write Week 2 authoring markdown (`curriculum-src/.../term-01/week-02.md`) and compile to `lesson.html` + `quiz.xml` under `content/.../term-01/week-02/` (Nutrition & Balanced Diet)
5. Write the midterm authoring markdown (`curriculum-src/.../term-01/midterm.md`) and compile to `quiz.xml` under `content/.../term-01/midterm/` (covering Weeks 1-2 content)
6. Write the end-of-term authoring markdown (`curriculum-src/.../term-01/end-of-term.md`) and compile to `quiz.xml` under `content/.../term-01/end-of-term/`
7. Build the course overview/syllabus page (Weeks 1-2 live, 3-10 "coming soon")
8. Once Ini's course container exists (Section 4, Ini Step 2): verify banner/badge/card rendering inside the real Moodle environment, not just locally
9. Finalize the 40% CA / 60% Exam gradebook weight setup on the frontend/reporting side, once Ini confirms the category split (see Ini Step 5)

### Ini — Backend & Systems

**Step 1 blocks everything else — do this first:**

1. Do a single test import: one dummy question in `quiz.xml` with the category node from Section 2.3, and one small `lesson.html` snippet with a `<section>` tag, a `.msa-` class, and one icon implementation from Olamiposi's Step 2. Confirm: (a) the category path syntax that actually works on this Moodle version, (b) whether HTML5 semantic tags survive the content cleaner, (c) whether the chosen icon approach renders. Report findings back before any further content is written against untested assumptions.
2. Create the course container ("JSS1 Basic Science") and the content activities: 2x `mod_page` (Week 1, Week 2), 2x `mod_quiz` (weekly assessments), 1x `mod_quiz` (midterm), 1x `mod_quiz` (end-of-term)
3. Set completion rules: `mod_page` = "must view to complete," `mod_quiz` = "must receive passing grade"
4. Set quiz settings on each: 1 attempt allowed, "open attempts submitted automatically" at 1:55 PM
5. Confirm the grade-category split with Yemi and configure it: standard assumption is weekly quizzes + midterm feed the 40% CA bucket, end-of-term feeds the 60% Exam bucket — do not assume this without Yemi's explicit sign-off, since it directly determines the report card's final numbers
6. Set each imported question's default grade to 1.0 explicitly (per Section 2.3) — verify this in the question bank after import, don't assume the XML setting alone guarantees it
7. Wire the report card template (`midterm-preview.html` / `report-card-preview.html`) to pull real computed grades from the gradebook, replacing demo/placeholder data
8. Create one test student account, enrolled in the course, so the full loop (login -> Week 1 -> Week 2 -> midterm -> report) can be walked through end-to-end before the demo to Yemi

---

## 5. Open Question to Confirm with Yemi Before Finalizing

The 40% CA / 60% Exam split between which specific assessments count as "CA" vs. "Exam" is currently an assumption (weekly quizzes + midterm = CA, end-of-term = Exam). This should be explicitly confirmed, not inferred, since it directly affects every student's final grade calculation once this scales beyond the pilot.
