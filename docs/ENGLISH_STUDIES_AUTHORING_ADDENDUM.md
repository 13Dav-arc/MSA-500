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
