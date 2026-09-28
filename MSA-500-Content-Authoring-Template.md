# MSA-500 — Content Authoring Template (`curriculum-src/` Specification)
## How weekly content is handed to the coding agent

**Purpose:** This defines the exact format for authoring markdown files (`week-[XX].md`, `midterm.md`, `end-of-term.md`) residing in the `curriculum-src/` directory tree — the files a content author (human or AI) writes by hand. The coding agent reads each source markdown file and deterministically generates compiled Moodle distribution artifacts (`lesson.html` and `quiz.xml`) in `content/`, per the rules in `MSA-500-Course-Ingestion-Schema.md`. The content author never touches HTML or XML directly.

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

---

## 3. Section-by-Section Format

### `## Hook`
Plain prose, 2-4 sentences. Maps directly to Slot 3 (Real-World Hook).

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
Exactly 20 questions, each a `###` sub-heading in the form `### Q{N} [{type}]`, where `{type}` is one of `single-choice`, `true-false`, `multi-select`, or `matching`. **Question numbers and types must follow the fixed distribution: Q1-14 single-choice, Q15-16 true-false, Q17-18 multi-select, Q19-20 matching.** The agent should reject a file that doesn't match this distribution exactly.

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
4. Converts the 20 `## Quiz` sub-sections into the 20 corresponding `<question>` blocks in `quiz.xml`, including the category node, `<defaultgrade>1.0</defaultgrade>` on every question, and CDATA-wrapped text throughout
5. Leaves the Slot 10 CTA `href` as an explicit placeholder token (e.g. `{{PENDING_CMID}}`) — never a guessed URL — per the post-import step in the ingestion schema

---

## 5. Content Author Checklist

- [ ] `term` present in YAML front matter and zero-padded (`01`, `02`, `03`)
- [ ] `week` present in YAML front matter and zero-padded (`01`–`10`, or `midterm`, `end-of-term`)
- [ ] File stored in matching `curriculum-src/[tier]/[grade]/[subject]/term-[XX]/` folder
- [ ] All 8 section headers present, in order, nothing renamed (weekly lessons)
- [ ] Exactly 3-5 Key Terms, 2-4 Comparative Matrix items, 2-3 Worked Examples
- [ ] Exactly 20 quiz questions, in the fixed type distribution (14/2/2/2), correctly numbered
- [ ] Every multi-select question has exactly 2 correct + 2 incorrect options
- [ ] Every matching question has exactly 3 pairs
- [ ] Every content image has a real `alt` description — never left blank
