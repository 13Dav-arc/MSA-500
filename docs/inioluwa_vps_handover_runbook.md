# Backend Handover Runbook: JSS 1 Basic Science Annual Cumulative Pilot Validation & VPS Integration

**To:** Inioluwa (Backend & Infrastructure Engineer)  
**From:** Olamiposi (Lead Frontend Developer & UI/UX Architect)  
**Date:** October 6, 2026  
**Subject:** Full 3-Term Assessment Ingestion (Course 146), Term 3 CA Normalization, Cluster Taxonomy Alignment & End-of-Session Transcript Stress-Testing  

---

## 1. Executive Context & Sessional Pivot

Following the strategic pivot directed by Adeyemi (Yemi), the pilot validation has expanded from a single term to the **entire 3-term academic year for JSS 1 Basic Science (Course 146)**. The immediate objective is to validate and stress-test the automated **End-of-Session (Annual Cumulative) PDF transcript engine** (`mod_customcert`) by executing a test student attempt across all 3 terms of assessments.

* **Single Pilot Container:** All pilot validation lives strictly in **Course 146**. Do NOT introduce phantom course IDs (e.g. Course 147 is deferred until Course 146 validation succeeds).
* **Rapid Assessment Ingestion:** High-volume lesson note prose has been bypassed in favor of staging official question banks across all 3 terms so you can purge temporary simulation clones in Term 3 and run authentic grade aggregation.
* **Assessment Weighting Standard:** Every term observes strictly **40% Continuous Assessment (CA) / 60% Terminal Examination**. Annual cumulative score is the arithmetic mean of Terms 1, 2, and 3.

---

## 2. Settled Curriculum Cluster Taxonomy

To ensure seamless category hierarchy alignment in Moodle without future schema friction, the institutional 4-cluster taxonomy is formally finalized as:

1. **`BST` — Basic Science and Technology:**
   * Basic Science (Course 146 Pilot Container)
   * Basic Technology
   * Computer Studies / ICT
   * Physical and Health Education (PHE)
2. **`RNV` — Religion and National Values:**
   * Civic Education
   * Security Education
   * Social Studies
   * Christian / Islamic Religious Studies
3. **`PVS` — Pre-Vocational Studies:**
   * Agricultural Science
   * Home Economics
   * Business Studies
4. **`CORE` — Core Standalone Disciplines:**
   * Mathematics
   * English Studies
   * Cultural and Creative Arts (CCA)
   * French Language

> **Operational Sequence:** You do **not** need to recategorize all 139 existing courses immediately. Complete Course 146 annual validation first. During this pilot phase, pass the shortname fallback map in `msa_dashboard_context.php`.

---

## 3. Question Bank Artifacts for Term 03 (Authored & Compiled)

The official Term 03 question banks have been authored, validated against NERDC standards, compiled into Moodle Question Bank XML, and verified with 0 test failures:

| Assessment Module | Source File | Distribution Path | Question Count | XML Category Path |
| :--- | :--- | :--- | :---: | :--- |
| **Term 3 Midterm CA** | `curriculum-src/.../term-03/midterm.md` | `content/.../term-03/midterm/quiz.xml` | **20 Qs** | `$course$/top/JSS1_Basic_Science/Term_03/Midterm_Assessment` |
| **Term 3 Terminal Exam** | `curriculum-src/.../term-03/end-of-term.md` | `content/.../term-03/end-of-term/quiz.xml` | **50 Qs** | `$course$/top/JSS1_Basic_Science/Term_03/Terminal_Examination` |

* **XML Guarantees:** 100% compliant Moodle XML format, mandatory `/top/` hierarchy, CDATA content wrappers, and explicit `<defaultgrade>1.0</defaultgrade>` on every question item.

---

## 4. VPS Staging & Question Import Steps

### Step 4.1: Pull Latest Repository Commits
```bash
cd /var/www/msa/moodle
git pull origin main
```

### Step 4.2: Import Term 03 Question Banks via Moodle Web UI or CLI
1. Navigate to **Course 146 > Question bank > Import**.
2. File format: **Moodle XML format**.
3. Import `content/junior-secondary/jss-1/basic-science/term-03/midterm/quiz.xml` (Midterm Assessment category, 20 questions).
4. Import `content/junior-secondary/jss-1/basic-science/term-03/end-of-term/quiz.xml` (Terminal Examination category, 50 questions).

### Step 4.3: Create Quiz Activities in Course 146 Section 3 (Term 3)
1. In **Section 3 (Term 3)**, add two quiz activities:
   * **Term 3 Midterm Assessment** (Link all 20 questions from `Term_03/Midterm_Assessment` into `mdl_quiz_slots`).
   * **Term 3 Terminal Examination** (Link all 50 questions from `Term_03/Terminal_Examination` into `mdl_quiz_slots`).

---

## 5. Gradebook Normalization & Aggregation Architecture

### 5.1 Critical Requirement: Term 3 CA Normalization (40%)
* **The Problem:** Term 1 CA includes multiple weekly quizzes plus the midterm. However, Term 3 CA only contains the Midterm assessment (20 questions = raw score 20).
* **Mandatory Gradebook Rule:** The Moodle gradebook aggregation strategy inside the **Term 3 Continuous Assessment** category must automatically normalize the raw score to **40.0%**.
  * **Option A (Category Maximum):** Set the subcategory "Term 3 Continuous Assessment (40%)" Maximum Grade = `40.0`. Set aggregation to **Simple Weighted Mean of Grades** or **Mean of Grades**. Moodle will automatically scale the raw 20/20 (or percentage score) to 40.0.
  * **Option B (Weighted Mean):** In Course 146 Gradebook Setup, assign a category weight of `40.0` to the CA subcategory and `60.0` to the Terminal Exam subcategory.
* **Term 3 Terminal Examination:** Maximum Grade = `60.0`. The 50 questions are scaled to 60.0.
* **Result:** Term 3 Total = CA (max 40) + Exam (max 60) = 100%.

### 5.2 Annual Cumulative Session Calculation
* Term 1 Category Weight: **33.33%** (or simple mean of the 3 terms).
* Term 2 Category Weight: **33.33%**.
* Term 3 Category Weight: **33.33%**.
$$\text{Annual Cumulative Score} = \frac{\text{Term 1 Total} + \text{Term 2 Total} + \text{Term 3 Total}}{3}$$

---

## 6. Dashboard Dynamic Context Contract (`msa_dashboard_context.php`)

### 6.1 Mustache Syntax Correction: `course_count`
> **Important Syntax Note:** Moodle's Mustache parser does **not** support JavaScript property chaining like `{{ courses.length }}`. The template expects an integer property named `course_count`:
```mustache
<span class="text-xs font-semibold text-slate-500">{{ course_count }} Subjects</span>
```
Ensure your PHP context builder sets `'course_count' => count($cluster['courses'])` when constructing cluster arrays.

### 6.2 Fallback Map Implementation in `msa_dashboard_context.php`
Until the 139-course category tree is linked, inject the fallback map directly into the `curriculum_clusters` array so the template renders cleanly without breaking:

```php
$cluster_data = [
    [
        'cluster_code'        => 'BST',
        'cluster_name'        => 'Basic Science & Technology',
        'cluster_description' => 'Integrated STEM foundational sciences, technical literacy, computing, and physical wellbeing.',
        'cluster_badge_color' => 'blue',
        'course_count'        => 1,
        'courses'             => [
            [
                'id'             => 146,
                'fullname'       => 'Basic Science & Technology (Pilot)',
                'shortname'      => 'JSS1-BST',
                'cluster_code'   => 'BST',
                'active_section' => 2,
                'course_url'     => $CFG->wwwroot . '/course/view.php?id=146&section=2',
                'ca_score'       => '36.0 / 40',
                'ca_cleared'     => true,
                'current_topic'  => 'Living Things & Life Processes',
                'is_active'      => true,
                'cover_img'      => '/img/course-covers/junior-secondary/jss-1/basic-science.png'
            ]
        ]
    ]
];
$templatecontext['has_clusters'] = true;
$templatecontext['curriculum_clusters'] = $cluster_data;
```

---

## 7. Annual Cumulative PDF Transcript Stress-Test Protocol (`mod_customcert`)

1. **Test Student Provisioning:**
   * Select or create a dedicated test student account (e.g. `student.pilot@mayndstormir.com`).
   * Enroll the student in Course 146.
2. **Execute Attempt Pipeline Across All 3 Terms:**
   * **Term 1:** Complete W01, W02, Midterm (CMID 280), and Terminal Exam (CMID 281). (e.g., target 85% overall).
   * **Term 2:** Complete staged assessments (e.g., target 88% overall).
   * **Term 3:** Complete Term 3 Midterm (20 Qs) and Term 3 Terminal Exam (50 Qs) (e.g., target 92% overall).
3. **Verify Gradebook Aggregation:**
   * Check User Report in Course 146:
     * Term 1 Total: CA (40) + Exam (60) = Correctly aggregated.
     * Term 2 Total: CA (40) + Exam (60) = Correctly aggregated.
     * Term 3 Total: CA (normalized to 40) + Exam (normalized to 60) = Correctly aggregated.
     * Course Final Grade: Arithmetic average of Terms 1, 2, and 3.
4. **Trigger PDF Generation:**
   * Access the End-of-Session certificate activity (`mod_customcert`).
   * Download the generated PDF transcript.
   * Verify that the PDF displays authentic non-zero scores for Term 1, Term 2, Term 3, and the final Annual Cumulative GPA.

---

## 8. Quality Gate & Automated Verification State

The frontend repository currently satisfies all enterprise quality gates:
* **Curriculum Test Suite:** `tests/curriculum-ingestion.test.js` — **490 assertions passed, 0 failures**.
* **Form Validation Test Suite:** `tests/form-validation.test.js` — **649 assertions passed, 0 failures**.
* **Total Assertions:** **1,139 passed, 0 failed** (`npm test`).
* **Bilateral CSS Parity:** `assets/css/main.css` and `theme/boost/style/moodle.css` maintain 100% bit-for-bit parity (`fc.exe` = 0 diff).
* **Template Parity:** `templates/mustache/dashboard.mustache` and `theme/boost/templates/dashboard.mustache` maintain 100% bit-for-bit parity (`fc.exe` = 0 diff).
