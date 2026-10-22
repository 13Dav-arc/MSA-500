# MSA-500 — Content Authoring Template (`curriculum-src/` Specification)
## How weekly content is handed to the coding agent

**Purpose:** This defines the exact format for authoring markdown files (`week-[XX].md`, `midterm.md`, `end-of-term.md`) residing in the `curriculum-src/` directory tree — the files a content author (human or AI) writes by hand. The coding agent reads each source markdown file and deterministically generates compiled Moodle distribution artifacts (`lesson.html` and `quiz.xml`) in `content/`, per the rules in `COURSE_INGESTION_SCHEMA.md`. The content author never touches HTML or XML directly.

**Core principle:** Every section below uses a fixed header and a fixed internal structure. The coding agent should treat any deviation from these headers/structure as a parse error to flag, not something to guess around — consistency here is what makes automatic generation reliable across 10+ weeks written at different times, possibly by different people.

---

## 1. File-Level Metadata (YAML front matter)

Every authoring file under `curriculum-src/` starts with this block, exactly:

```yaml
---
grade: JSS 1
subject: Basic Science
term: 01
week: 02
topic: Nutrition & Balanced Diet
assessment_category: Continuous Assessment
weight_percent: 40
---
```

- `term` is mandatory and always two digits, zero-padded (`01`, `02`, `03`)
- `week` is always two digits, zero-padded (`02`, not `2`)
- For midterm and end-of-term exam source files, `term` remains mandatory (`01`, `02`, `03`), while `week` is set to `week: midterm` or `week: end-of-term` (with `topic` omitted)

---

## 2. Section Headers (Fixed, In This Order)

The agent expects exactly these eight `##` headers, in this order, for a weekly lesson file. Nothing is optional — a missing section is a parse error, not a section to skip.

```markdown
## Hook
## Key Terms
## Core Concept
## Comparative Matrix
## Common Mistakes
## Worked Examples
## Guardian Sync
## Quiz
```

(Midterm/end-of-term files contain only `## Quiz` — no lesson sections.)

### Question Scope & Distribution Rules:
- **Weekly Lesson Quizzes (`week-[XX].md`):** Exactly **20 questions** (14 single-choice, 2 true-false, 2 multi-select, 2 matching) for standard subjects; scaled to **30 questions** (`21/3/3/3`) for `English Studies` (see Section 4.1 & Section 6 Addendum).
- **Midterm Assessment (`midterm.md`):** Exactly **20 to 30 questions** (formative continuous assessment pool); strictly **30 questions** (`21/3/3/3`) for `English Studies`.
- **Terminal Examination (`end-of-term.md`):** Strictly and universally **50 questions** (35 single-choice, 5 true-false, 5 multi-select, 5 matching) carrying 60% overall term weight for standard subjects; scaled to **60 questions** (`42/6/6/6`) for `English Studies`.

---

## 3. Section-by-Section Format

### `## Hook`
Plain prose, 2-4 sentences. Maps directly to Slot 3 (Real-World Hook).
**Curiosity Mandate (Operational Law 4):** Every hook must spark student curiosity by showing *why* the topic matters in real life. Ground the opening in relatable Nigerian and West African environments (domestic kitchens, school workshops, local markets, hospitals, farm ecology, sports, harmattan weather) to answer the fundamental student question: *"Why do I need to learn this?"* Avoid dry encyclopedia definitions.

```markdown
## Hook
Have you ever wondered why eating only a large mound of plain garri leaves
you feeling tired two hours later? Your body needs biological building
blocks, not just bulk.
```

### `## Key Terms`
A bullet list, 3-5 items, each with exactly this two-line shape:

```markdown
## Key Terms
- Term: Nutrition
  Definition: The process by which living organisms take in and use food substances for growth, energy, and repair.
- Term: Balanced Diet
  Definition: A meal containing all six classes of food in correct proportion.
```

### `## Core Concept`
One or more `###` sub-headings, each with free-form markdown content. Use an `[IMAGE: alt="..." caption="..."]` marker on its own line anywhere an image belongs — the agent converts this into the Slot 5 `<figure>` block. Never leave `alt` empty here; these are content images, not decorative icons.

```markdown
## Core Concept
### The Six Classes of Food & Nigerian Sources
1. **Carbohydrates:** primary fuel source. *Local sources:* garri, fufu, yam.
2. **Proteins:** builds and repairs tissue. *Local sources:* beans, crayfish, eggs.

[IMAGE: alt="Diagram of the six food classes with Nigerian food examples" caption="The six classes of food"]
```

### `## Comparative Matrix`
A short heading line, then a bullet list of 2-4 items, each with three fields:

```markdown
## Comparative Matrix
Heading: Deficiency Disorders & Clinical Signs
- Label: Protein Deficiency
  Title: Kwashiorkor
  Body: Swollen abdomen, cracked skin, thinning reddish hair, growth retardation.
- Label: Vitamin C Deficiency
  Title: Scurvy
  Body: Bleeding gums, loose teeth, delayed wound healing.
```

### `## Common Mistakes`
One or more mistake/fact pairs:

```markdown
## Common Mistakes
- Mistake: Eating until full guarantees a balanced diet.
  Fact: Fullness is usually just carbohydrate volume. Balance needs proportionate protein, fat, vitamins, and minerals too.
```

### `## Worked Examples`
2-3 examples, each a `###` sub-heading with three fixed fields:

```markdown
## Worked Examples
### Example A: The Carbohydrate Imbalance Trap
Context: A student eats bread, rice, and garri all day with no protein source.
Problem: Over 85% carbohydrate intake, near-zero protein, causing fatigue.
Fix: Add boiled beans or fish at lunch, and crayfish/ugwu to the evening soup.
```

### `## Guardian Sync`
Plain prose, 1-3 sentences — the parent/guardian take-home prompt.

```markdown
## Guardian Sync
Review tonight's dinner plate with your guardian. Identify which of the six
food classes are present, and discuss what's missing.
```

### `## Quiz`
Exactly 20 questions (or 30 questions for English Studies), each a `###` sub-heading in the form `### Q{N} [{type}]`, where `{type}` is one of `single-choice`, `true-false`, `multi-select`, or `matching`. **Question numbers and types must follow the fixed distribution: Q1-14 single-choice, Q15-16 true-false, Q17-18 multi-select, Q19-20 matching (for standard subjects; see Section 4.1 & Section 6 for English Studies).** The agent should reject a file that doesn't match this distribution exactly.

**single-choice format:**
```markdown
### Q1 [single-choice]
Stem: A balanced diet is best defined as a diet that:
A) Contains all six classes of food in correct proportion (correct)
B) Contains mostly carbohydrates for energy
C) Consists entirely of fruits and vegetables
D) Provides enough bulk to fill the stomach
Feedback: A balanced diet supplies all six nutrient classes in correct proportion for healthy metabolism.
```
(Mark the correct option inline with `(correct)`. The agent generates per-answer `<feedback>` from the general `Feedback:` line if no per-option feedback is given; add `Feedback-A:`, `Feedback-B:` etc. lines for per-option feedback where it adds real value.)

**true-false format:**
```markdown
### Q15 [true-false]
Statement: Eating until full guarantees a balanced diet.
Answer: false
Feedback: Fullness is usually just carbohydrate volume, not balance.
```

**multi-select format (always exactly 2 correct, 2 incorrect):**
```markdown
### Q17 [multi-select]
Stem: Select TWO nutrient classes that function as energy sources:
Correct: Carbohydrates, Fats and Oils
Incorrect: Vitamins, Mineral Salts
Feedback: Carbohydrates and fats provide energy; vitamins and minerals are protective, not energy-giving.
```

**matching format (always exactly 3 pairs):**
```markdown
### Q19 [matching]
Stem: Match each nutrient class with its local Nigerian source:
Pairs:
- Carbohydrate -> Cassava (Garri/Fufu)
- Protein -> Cowpeas (Beans)
- Vitamins and Minerals -> Ugwu (Fluted Pumpkin Leaves)
Feedback: Garri is a carbohydrate; beans are a protein; ugwu provides vitamins and minerals.
```

---

## 4. What the Agent Does With This File

1. Parses front matter -> fills Slot 1 (meta bar) and the Moodle XML category path:
   - Weekly Quiz: `$course$/top/{grade}_{subject}/Term_{term}/Week_{week}_{topic-slug}`
   - Midterm CA Quiz: `$course$/top/{grade}_{subject}/Term_{term}/Midterm_Assessment`
   - Terminal Examination: `$course$/top/{grade}_{subject}/Term_{term}/Terminal_Examination`
2. Maps each `##` section directly onto its corresponding `lesson.html` slot, applying the fixed inline-style values already established in the Week 2 reference file (Section 4 of the ingestion schema) — the content author never specifies colors, fonts, or layout, only content
3. Converts every `[IMAGE: ...]` marker into a `<figure>` block with the given `alt`/`caption`
4. Converts the 20 `## Quiz` sub-sections (or 30/60 for English Studies, per Section 4.1 & Section 6) into the corresponding `<question>` blocks in `quiz.xml`, including the category node, `<defaultgrade>1.0</defaultgrade>` on every question, and CDATA-wrapped text throughout
5. Leaves the Slot 10 CTA `href` as an explicit placeholder token (e.g. `{{PENDING_CMID}}`) — never a guessed URL — per the post-import step in the ingestion schema

### 4.1 Subject-Specific Assessment Pool Override (`english-studies`)

Because English Studies comprises five integrated NERDC sub-disciplines (Speech Work, Structure, Comprehension, Composition, and Literature), its question pools are scaled by 1.5x to ensure valid diagnostic coverage per aspect:

| Artifact Type | Standard Subjects | English Studies (`english-studies`) | Type Breakdown (`single` / `tf` / `multi` / `match`) |
| :--- | :--- | :--- | :--- |
| Weekly Lesson (`week-XX.md`) | 20 Questions | **30 Questions** | `21` / `3` / `3` / `3` |
| Mid-Term Gate (`midterm.md`) | 20–30 Questions | **30 Questions** | `21` / `3` / `3` / `3` |
| Terminal Exam (`end-of-term.md`) | 50 Questions | **60 Questions** | `42` / `6` / `6` / `6` |

---

## 5. Content Author Checklist

- [ ] `term` present in YAML front matter and zero-padded (`01`, `02`, `03`)
- [ ] `week` present in YAML front matter and zero-padded (`01`–`10`, or `midterm`, `end-of-term`)
- [ ] File stored in matching `curriculum-src/[tier]/[grade]/[subject]/term-[XX]/` folder
- [ ] All 8 section headers present, in order, nothing renamed (weekly lessons)
- [ ] Exactly 3-5 Key Terms, 2-4 Comparative Matrix items, 2-3 Worked Examples
- [ ] Exactly 20 quiz questions (or 30 questions for English Studies), in the fixed type distribution, correctly numbered
- [ ] Every multi-select question has exactly 2 correct + 2 incorrect options
- [ ] Every matching question has exactly 3 pairs
- [ ] Every content image has a real `alt` description — never left blank

---

## 6. Subject Addendum — English Studies (`english-studies`) Authoring Specification

# MSA-500 ADDENDUM: English Studies (`english-studies`) Authoring Specification

**Scope:** Applies strictly when `subject: English Studies`. All global MSA-500 outer structural rules (YAML front matter, the 8 fixed `##` headers in exact order, and exact Moodle XML question syntax) remain strictly enforced so the downstream HTML/XML compiler parses without error.

#### 1. `## Hook`
Write 2–4 engaging sentences that weave together the week's communicative theme—connecting how clear pronunciation (Speech Work), accurate grammar (Structure), critical reading (Comprehension), expressive writing (Composition), and storytelling (Literature) work together in real life.

#### 2. `## Key Terms` (Strictly 5 Items — 1 Per Aspect)
Provide exactly 5 terms in the standard two-line `- Term:` / `  Definition:` format, mapped 1-to-1 across the five aspects:
1. One Phonetics/Oral English term (Speech Work)
2. One Grammatical term (Structure)
3. One Vocabulary/Register term (Comprehension)
4. One Essay/Letter Writing term (Composition)
5. One Literary term or device (Literature)

#### 3. `## Core Concept` (Strictly 5 `###` Sub-Headings)
Organize the main instructional body into these exact five `###` sub-headings in order:

- **`### Aspect 1: Speech Work — [Topic]`**
  Detail the place and manner of articulation, voicing state, spelling symbols, and a Markdown table of contrasting minimal pairs or word positions (Initial, Medial, Final).

- **`### Aspect 2: Structure — [Topic]`**
  Explain the grammatical rules, classifications, and sentence patterns with clear, contextualized examples.

- **`### Aspect 3: Comprehension & Vocabulary — [Passage Title]`**
  Because students learning online do not have external physical textbooks in front of them, you MUST author a complete, self-contained reading comprehension block structured into three sub-parts:
  1. **Reading Passage:** Author a rich, multi-paragraph reading passage (**3 paragraphs, 250–350 words total**) formatted inside blockquotes (`>`) and built around the week's official NERDC comprehension theme/title.
  2. **Guided Comprehension Questions & Model Responses:** Provide **5 comprehension questions** right below the passage (covering factual recall, inference, author's mood/purpose, grammatical structure, and vocabulary in context), each paired with a clear *Model Answer* so students can practice answering comprehension questions before taking the quiz.
  3. **Target Vocabulary in Context:** List **5 to 8 key vocabulary/register words** drawn directly from the passage, specifying their part of speech and contextual meaning.

- **`### Aspect 4: Composition — [Topic]`**
  Provide the writing rules, structural format/blueprint (e.g., formal/informal letter addresses, salutations, headings, subscriptions, or essay paragraph outlines), and a brief model excerpt or template.

- **`### Aspect 5: Literature-in-English — [Topic]`**
  Cover the literary genre, oral tradition (myths/legends), poetic devices/figures of speech, or thematic/character analysis of the recommended text.

*(Note: Place at least one `[IMAGE: alt="..." caption="..."]` marker inside `## Core Concept`).*

#### 4. `## Comparative Matrix` (3–5 Items)
Use the standard `Heading:` and `Label:` / `Title:` / `Body:` format to contrast core language pairs from the week (e.g., Voiceless vs Voiced consonants, Tense contrasts, Formal vs Informal Letters, or Literary Genres).

#### 5. `## Common Mistakes` (3–5 Pairs)
Use the standard `- Mistake:` / `  Fact:` format targeting common Nigerian English pronunciation interference, grammatical concord/tense errors, and letter/essay formatting pitfalls.

#### 6. `## Worked Examples` (Strictly 3 Items)
Use the standard `### Example X:` with `Context:` / `Problem:` / `Fix:` mapped across:
- `### Example A: Phonetic Identification (Speech Work)`
- `### Example B: Grammatical Application (Structure)`
- `### Example C: Writing & Literary Application (Composition / Literature)`

#### 7. `## Guardian Sync`
Write 1–3 sentences giving a practical spoken and written home activity (e.g., practicing minimal pairs aloud, reading the comprehension passage together, and reviewing a letter layout or story theme with a guardian).

#### 8. `## Quiz` — English Studies Question Distributions
Because Moodle quizzes display one question at a time on a separate screen from the lesson, any comprehension question in `## Quiz` must include a brief 1–2 sentence context reference or quote in its `Stem:` so it is self-contained.

- **Weekly Quizzes (`week-01.md` to `week-09.md`) & Mid-Term (`midterm.md`):** Strictly **30 Questions** (`21` single-choice, `3` true-false, `3` multi-select, `3` matching), balanced evenly across all 5 aspects (6 questions per aspect):
  - `Q1–Q4 [single-choice]`: Speech Work
  - `Q5–Q9 [single-choice]`: Structure / Grammar
  - `Q10–Q13 [single-choice]`: Comprehension & Vocabulary (based on Aspect 3's passage)
  - `Q14–Q17 [single-choice]`: Composition / Continuous Writing
  - `Q18–Q21 [single-choice]`: Literature-in-English
  - `Q22–Q24 [true-false]`: Spanning Speech Work, Structure, and Literature/Composition
  - `Q25–Q27 [multi-select]`: 2 correct + 2 incorrect options spanning Phonetics, Grammar, and Literature/Composition
  - `Q28–Q30 [matching]`: 3 pairs each spanning Phonetics, Grammar, and Literature/Composition

- **Terminal Examination (`end-of-term.md`, Week 10):** Strictly **60 Questions** (`42` single-choice, `6` true-false, `6` multi-select, `6` matching), balanced evenly across all 5 aspects (12 questions per aspect):
  - `Q1–Q9 [single-choice]`: Speech Work (9)
  - `Q10–Q18 [single-choice]`: Structure / Grammar (9)
  - `Q19–Q26 [single-choice]`: Comprehension & Vocabulary / Register (8)
  - `Q27–Q34 [single-choice]`: Composition & Letter/Speech Writing (8)
  - `Q35–Q42 [single-choice]`: Literature-in-English (8)
  - `Q43–Q48 [true-false]`: 6 questions spanning all 5 aspects
  - `Q49–Q54 [multi-select]`: 6 questions spanning all 5 aspects (2 correct, 2 incorrect each)
  - `Q55–Q60 [matching]`: 6 questions spanning all 5 aspects (3 pairs each)
