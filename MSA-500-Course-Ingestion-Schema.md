# MSA-500 — Course Content Ingestion Schema
## Reference specification for the coding agent

**Audience:** This document is written for an AI coding agent (or a human engineer) responsible for building the tooling that moves subject content from the source repository into a live Moodle 4.x course. It assumes no prior context.

**Authority note:** The Moodle-specific constraints in Section 3 are confirmed facts from a real test import performed by the systems engineer (Inioluwa) against the live Moodle instance. They are not assumptions — do not deviate from them without a new test confirming otherwise.

---

## 1. What This Pipeline Does

For every (grade, subject, term, week) combination, source content is authored in `curriculum-src/` as human-readable markdown (`week-[XX].md`), which the automated compiler transforms into two distribution files in `content/`:
- `lesson.html` — a self-contained HTML fragment, pasted into a Moodle `mod_page` activity
- `quiz.xml` — a Moodle-native XML question bank file, imported into a Moodle `mod_quiz` activity

The agent's job is to take these source files per term and week and produce a live, correctly-linked pair of Moodle activities inside the correct course and category.

---

## 2. Directory Structure (Source Repository & Separation of Concerns)

This structure exists in the git repository only. **Moodle does not read this folder structure directly** — nothing here is auto-discovered by Moodle. Every file must be explicitly imported via the procedure in Section 5.

To maintain clean separation between authoring sources and compiled Moodle production assets, the repository decouples files into `curriculum-src/` (raw source) and `content/` (compiled distribution):

```
MSA-500/
├── curriculum-src/                                # AUTHORING SOURCE (Committed to Git)
│   └── [grade-tier-slug]/                         # e.g., junior-secondary
│       └── [grade-level-slug]/                    # e.g., jss-1
│           └── [subject-slug]/                    # e.g., basic-science
│               ├── term-01/
│               │   ├── week-01.md
│               │   ├── week-02.md
│               │   ├── midterm.md
│               │   └── end-of-term.md
│               ├── term-02/
│               └── term-03/
│
└── content/                                       # COMPILED MOODLE ARTIFACTS (Committed for Ini)
    └── [grade-tier-slug]/
        └── [grade-level-slug]/
            └── [subject-slug]/
                ├── term-01/
                │   ├── week-01/
                │   │   ├── lesson.html            # mod_page markup
                │   │   └── quiz.xml               # mod_quiz XML
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

**Naming rules:**
- All slugs are lowercase, hyphen-separated, no spaces
- Term folders are zero-padded two digits: `term-01`, `term-02`, `term-03`
- Authoring markdown files under `curriculum-src/` use flat filenames: `week-01.md`, `week-02.md`, `midterm.md`, `end-of-term.md`
- Compiled week folders under `content/` are zero-padded two digits: `week-01/`, `week-02/`
- `midterm` and `end-of-term` folders under `content/` never contain a `lesson.html` — they are assessment-only checkpoints, not weekly instructional content

---

## 3. Confirmed Moodle Constraints (Do Not Deviate)

These three rules were established by an actual test import against the live Moodle instance, not derived from documentation alone. Any content generation logic must enforce all three.

### 3.1 Question bank category path requires a `/top/` segment & multi-term taxonomy

The category-declaration node inside every `quiz.xml` must use this exact path format incorporating the term segment:

#### Weekly Quiz:
```xml
<question type="category">
  <category>
    <text>$course$/top/[GRADE_SLUG]_[SUBJECT_SLUG]/Term_[XX]/Week_[XX]_[TOPIC_SLUG]</text>
  </category>
</question>
```

*Example (confirmed working):* `$course$/top/JSS1_Basic_Science/Term_01/Week_02_Nutrition_and_Balanced_Diet`

#### Midterm CA Quiz:
```xml
<question type="category">
  <category>
    <text>$course$/top/[GRADE_SLUG]_[SUBJECT_SLUG]/Term_[XX]/Midterm_Assessment</text>
  </category>
</question>
```

*Example:* `$course$/top/JSS1_Basic_Science/Term_01/Midterm_Assessment`

#### Terminal Examination:
```xml
<question type="category">
  <category>
    <text>$course$/top/[GRADE_SLUG]_[SUBJECT_SLUG]/Term_[XX]/Terminal_Examination</text>
  </category>
</question>
```

*Example:* `$course$/top/JSS1_Basic_Science/Term_01/Terminal_Examination`

This node must be the first `<question>` element in the file, before any real question definitions — every subsequent question in the file is filed under this category until a new category node appears.

### 3.2 `<section>` tags are stripped — use `<div>` instead

Moodle's content sanitizer (`format_text()`) strips `<section>`, and likely other HTML5 semantic landmark tags on this Moodle version. **All structural containers in `lesson.html` must use `<div>`**, never `<section>`, `<article>`, or `<footer>`. Semantic meaning is preserved via class names (e.g. `.msa-hook-card`), not via tag choice.

### 3.3 Inline SVG does not survive — use uploaded `<img>` icons

Icons must not be pasted as inline `<svg>...</svg>` markup — it does not survive the sanitizer. Icons are sourced from [icones.js.org](https://icones.js.org/) and referenced as external image requests, e.g.:

```html
<img src="https://api.iconify.design/lucide:sparkles.svg?color=%232563eb" width="16" height="16" alt="" />
```

This is the pattern already validated in the Week 2 draft — continue using the Iconify API URL format (`api.iconify.design/{collection}:{icon-name}.svg?color={hex}`) rather than downloading and re-hosting icon files, unless Ini specifies otherwise.

---

## 4. `lesson.html` — Structural Schema

The canonical, validated reference implementation is the Week 2 (Nutrition & Balanced Diet) file already produced. Its structure is the template going forward:

- All styling is **inline via the `style` attribute on every element** — not dependent on a theme stylesheet. This is a deliberate choice: it guarantees consistent visual output regardless of whether Moodle's active theme defines matching CSS, at the cost of making a future global redesign require touching every generated file individually. `.msa-*` class names are still included on elements for semantic/automation purposes (e.g. a future script could target them), but they carry no visual weight themselves — the inline `style` attribute is what actually renders.
- 10 fixed slots, in fixed order (see Section 4.1). Every `lesson.html` must contain all 10 — none are optional.
- Color/typography values used in the Week 2 reference (carry these forward for consistency across weeks): background `#F8FAFC`, card white `#FFFFFF` with `#E2E8F0` border, primary text `#0F172A`/`#1E293B`, secondary text `#475569`/`#64748B`, accent blue `#2563EB`, success green `#047857`/`#059669`, error red `#DC2626`/`#BE123C`, font family `'Inter'`/`'Plus Jakarta Sans'`.

### 4.1 The 10 Slots

| # | Slot | Purpose |
|---|---|---|
| 1 | Meta bar | Grade/subject pill + CA-or-Exam weight pill |
| 2 | Title & subtitle | Week number, topic title, one-line orientation |
| 3 | Real-world hook | Why this topic matters, in relatable local terms |
| 4 | Key terms glossary | 3-5 term/definition card grid |
| 5 | Core concept | The main explanatory content, with inline image/figure slots as needed |
| 6 | Comparative matrix | 2-4 card grid for classifications, methods, or comparisons |
| 7 | Common mistakes | Myth (red) vs. Fact (green) callout pair |
| 8 | Worked examples | 2-3 scenario cards: Context / Problem / Fix |
| 9 | Guardian sync | A prompt for the parent/guardian to do with the student at home |
| 10 | Terminal CTA | Button linking to the week's quiz — **see Section 6 for the URL caveat** |

### 4.2 Accessibility requirement (non-negotiable per MSA-500's existing WCAG 2.1 AA standard)

Every `<img>` tag — icon or content image — must have a populated, meaningful `alt` attribute, except purely decorative icons (like the ones next to section headers), which should use `alt=""` deliberately (already done correctly in the Week 2 reference). Any content-bearing image (a diagram, a photo) must never use `alt=""`.

---

## 5. `quiz.xml` — Structural Schema

- Exactly 20 questions per weekly/midterm/end-of-term quiz, no exceptions
- Distribution: Q1-14 single-choice multichoice, Q15-16 true/false, Q17-18 multi-select (2 correct at +50% each, 2 distractors at -50% each), Q19-20 matching (3 sub-questions each)
- **Every single question must include `<defaultgrade>1.0</defaultgrade>`** — this is not automatic, and without it, the "10/20 = 50% passing" assumption breaks, since matching questions have multiple sub-parts that could otherwise be weighted differently
- Every question requires `<generalfeedback>` (shown regardless of answer) and, where practical, per-answer `<feedback>` — no question should leave a student without an explanation of the correct answer
- Zero essay or open-text questions, ever — the platform has no teacher to grade free text, so every question type must be one of the four deterministic types above
- All question text, feedback, and answers must be wrapped in `<![CDATA[...]]>` blocks
- The category-declaration node from Section 3.1 must be present and correct in every file

---

## 6. Post-Import Step: Resolving the Quiz URL (Critical — Do Not Skip)

The Terminal CTA button in `lesson.html` (Slot 10) links to the week's quiz:

```html
<a href="{{QUIZ_URL}}" class="msa-primary-btn">Take Week {{N}} Assessment ...</a>
```

**`{{QUIZ_URL}}` cannot be known at content-authoring time.** A real Moodle quiz URL takes the form `https://msa.mayndstomir.com/mod/quiz/view.php?id={cmid}`, where `{cmid}` is a numeric course-module ID that Moodle assigns automatically **only after** the quiz activity is created inside the course. It does not exist before that point, and it is not derivable from the week number, subject slug, or any naming convention — it is arbitrary, assigned in creation order across the whole course.

**Correct sequence:**
1. `quiz.xml` is imported into the Question Bank (creates the category + questions, but not yet a quiz activity a student can take)
2. Ini (or the agent, if this becomes scripted) creates the actual `mod_quiz` activity in the course, pulls in the imported questions, and configures grading/attempts/timing
3. Moodle assigns a `cmid` to that new activity — **only now does a real URL exist**
4. `lesson.html`'s CTA button is updated with that real `cmid` before the page goes live to students

**Never publish a `lesson.html` with a placeholder/slug URL (e.g. `?id=COURSE146_W2_QUIZ`) as if it were final** — the Week 2 draft did this, and it must be caught and corrected in this exact step before that page is shown to any real student, or the button will 404.

---

## 7. How Content Is Accessed — Summary Flow

```
Student clicks course card on dashboard
   -> Moodle course page (Course ID 146: JSS1 Basic Science)
      -> mod_page "Week N" (renders lesson.html content)
         -> student reads through Slots 1-9
            -> Slot 10 CTA button -> mod_quiz "Week N Assessment"
               (URL resolved per Section 6 -- real cmid, not a slug)
               -> student attempts quiz (1 attempt, 20 questions,
                  auto-submitted at 1:55 PM per the platform-wide
                  2:00 PM lockout)
                  -> Moodle gradebook records the score
                     -> feeds into the 40% CA / 60% Exam split
                        -> automated PDF transcript engine picks up
                           the gradebook value (already verified
                           working against test account "ini7j")
```

---

## 8. Checklist Before Any Week Is Considered "Import-Ready"

- [ ] Authored in `curriculum-src/` and compiled to corresponding `content/` term folder
- [ ] `lesson.html` contains all 10 slots, uses `<div>` only (no `<section>`/`<article>`/`<footer>`)
- [ ] All icons are `<img>` tags pointing to the Iconify API, none inline `<svg>`
- [ ] Every content image has a real `alt` value; every decorative icon has `alt=""`
- [ ] `quiz.xml` contains exactly 20 questions in the fixed type distribution
- [ ] The category node is present, correct, uses the `/top/` path format, and includes the `Term_[XX]` segment
- [ ] Every question has `<defaultgrade>1.0</defaultgrade>`
- [ ] The CTA button's URL is flagged as a **placeholder pending Section 6** until the real `cmid` is substituted post-import
