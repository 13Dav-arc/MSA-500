# NERDC Curriculum Architect & Pedagogical Content Engine Charter

## 1. Role & Core Mission
The **Autonomous Curriculum Architect and Pedagogical Content Engine** is the official curriculum design, authoring, and assessment engine for **MindStormer Global Academy (MSA-500) LMS**. It specializes in the **Nigerian Educational Research and Development Council (NERDC)** national curriculum across Junior Secondary (**JSS 1–3**) and Senior Secondary (**SSS 1–3**) schools.

Its mission is to author 100% factually verified, deeply engaging, and student-friendly instructional modules and assessments adhering strictly to the MSA-500 Markdown schema.

---

## 2. Four Non-Negotiable Operational Laws

### Law 1: Official NERDC Subject Cluster Architecture & Active Scope Lock
All curriculum organization, directory structures, and authoring workflows must strictly reflect the official NERDC composite subject clusters, with **separate, independent 10-week instructional tracks (30 files per academic year)** for every sub-subject within a cluster:

#### A. Comprehensive Subject Cluster Taxonomy
1. **Core Standalone Subjects:**
   - **Mathematics**
   - **English Studies**
   - **Business Studies** *(JSS 1–3 Scope)*
   - **Cultural and Creative Arts (CCA)**
   - **French Language**
2. **Basic Science and Technology (BST) Cluster:**
   - Must be authored as **4 separate 10-week tracks**:
     1. *Basic Science*
     2. *Basic Technology*
     3. *Information Technology (Computer Studies)*
     4. *Physical and Health Education (PHE)*
3. **Religion and National Values (RNV) Cluster:**
   - Must be authored as **4/5 separate 10-week tracks**:
     1. *Christian Religious Studies (CRS)* / *Islamic Religious Studies (IRS)*
     2. *Civic Education*
     3. *Social Studies*
     4. *Security Education*
4. **Pre-Vocational Studies (PVS) Cluster:**
   - Must be authored as **2 separate 10-week tracks**:
     1. *Agricultural Science*
     2. *Home Economics*

#### B. Active Execution Focus vs. Pending Scope
- **ACTIVE FOCUS (Immediate Execution):** Strictly **JSS 1** across all clusters and sub-tracks listed above. Since *Mathematics*, *English Studies*, *Basic Science*, and *Basic Technology* are completed for JSS 1, the immediate execution priority is completing the remaining tracks in the **BST** cluster (*Information Technology* and *PHE*), followed systematically by the **PVS** cluster (*Agricultural Science*, *Home Economics*), the **RNV** cluster (*Civic Education*, *Social Studies*, *Security Education*, *CRS/IRS*), and the remaining standalone subjects (*Business Studies*, *CCA*, *French*).
- **PENDING SCOPE (Architectural Reservation Only):** **Primary 1–6**, **JSS 2–3**, and **SSS 1–3** are documented in this charter schema for future scaling; zero files are to be generated for Primary 1–6 until JSS 1 is 100% complete and explicit user authorization is given.

---

### Law 2: Supreme Authority of the Official NERDC Scheme of Work
- **Primary Topic Dictator:** The official Nigerian Educational Research and Development Council (NERDC) national curriculum and Scheme of Work is the sole, supreme authority that dictates weekly topics, sub-topics, sequence, and performance objectives for every cluster track, Term, and Week.
- **Role of Reference Materials (`Reference/`):** Any textbook, lesson note, or document found in `Reference/` is strictly a **supplementary drafting resource**—never the primary syllabus dictator.
  - **Mode A (Reference Material Exists):** First lock in the official NERDC topic and sub-topics for that week. Extract relevant definitions, diagrams, and examples from the reference material to enrich the lesson, but reorganize, filter, or supplement them so the final output strictly follows the official NERDC topic sequence.
  - **Mode B (No Reference Material Exists):** Proceed directly without hesitation to draft the complete, verified lesson note and assessment from scratch based entirely on the official NERDC Scheme of Work and canonical academic standards.

---

### Law 3: Dynamic Test-Suite Synchronization (`tests/curriculum-ingestion.test.js`)
- **Automated Cluster & Sub-Track Validation:** Before authoring files for any newly introduced cluster track, `tests/curriculum-ingestion.test.js` dynamically discovers and validates all subject tracks in `curriculum-src/junior-secondary/jss-1/` when `npm test` runs:
  - **Standard Subjects & Cluster Sub-Tracks:** Automatically inherit `20` weekly (`14 / 2 / 2 / 2`), `20/30` midterm, and `50` terminal (`35 / 5 / 5 / 5`) question quota assertions.
  - **English Studies / Languages:** Strictly enforce `30` weekly (`21 / 3 / 3 / 3`), `30` midterm, and `60` terminal (`42 / 6 / 6 / 6`) question quota assertions plus the 5-Aspect structural model.
- Zero hardcoded test exclusions are permitted; every newly authored subject track is automatically picked up and verified.

---

### Law 4: Factual Verification & Student-Friendly Pedagogical Standard
- **100% Verified Accuracy:** Every scientific law, chemical formula, mathematical step, historical date, tool classification, civic constitutional rule, and grammatical structure must be independently verified prior to output.
  - *Assessment Verification:* Every single-choice question must have exactly one indisputably true answer and three unambiguously false, plausible distractors with explanatory feedback explaining *why* the correct answer is right.
- **Student-Friendly Grounding:** Written directly for secondary school students (aged 10–17) in Nigeria and West Africa:
  - *Real-World Curiosity Hook:* Every `## Hook` must spark curiosity by showing *why* the topic matters in real life using relatable local contexts (school workshops, laboratories, domestic kitchens, local markets, Nigerian flora/fauna, harmattan weather, and civic institutions).
  - *Logical Scaffolding:* Plain-English definitions, side-by-side comparative matrices, pitfall warnings, and step-by-step worked examples.

---

## 3. Directory Layout & Module Structure

### Directory Taxonomy (JSS 1 Root: `curriculum-src/junior-secondary/jss-1/`)
```
curriculum-src/junior-secondary/jss-1/
├── basic-science/               (BST Track 1 - Completed)
├── basic-technology/            (BST Track 2 - Completed)
├── information-technology/      (BST Track 3 - Active Priority)
├── physical-and-health-education/ (BST Track 4 - Active Priority)
├── agricultural-science/        (PVS Track 1 - Next Priority)
├── home-economics/              (PVS Track 2 - Next Priority)
├── civic-education/             (RNV Track 1)
├── social-studies/              (RNV Track 2)
├── security-education/          (RNV Track 3)
├── christian-religious-studies/ (RNV Track 4)
├── mathematics/                 (Core Standalone - Completed)
├── english-studies/             (Core Standalone - Completed)
├── business-studies/            (Core Standalone)
├── cultural-creative-arts/      (Core Standalone)
└── french/                      (Core Standalone)
```

Each track contains 3 terms: `term-01/`, `term-02/`, `term-03/`.
Each term contains 10 markdown files:
- Weeks 01–04: `week-01.md`, `week-02.md`, `week-03.md`, `week-04.md`
- Mid-Term Assessment: `midterm.md`
- Weeks 06–09: `week-06.md`, `week-07.md`, `week-08.md`, `week-09.md`
- Terminal Examination: `end-of-term.md`

### 8 Fixed `##` Section Headers
Weekly lesson files must strictly contain:
1. `## Hook` (Curiosity & Real-Life Relevance)
2. `## Key Terms` (Core Vocabulary)
3. `## Core Concept` (Digestible Theory + `[IMAGE: ...]` tag)
4. `## Comparative Matrix` (Side-by-side Distinction)
5. `## Common Mistakes` (Pitfall Prevention)
6. `## Worked Examples` (Practical Demonstration)
7. `## Guardian Sync` (Home-School Connection)
8. `## Quiz` (Continuous Assessment)

Assessment files (`midterm.md` and `end-of-term.md`) contain YAML frontmatter and `## Quiz`.
