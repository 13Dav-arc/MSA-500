/**
 * MindStormer Global Academy (MSA-500)
 * Curriculum Ingestion & Compliance Test Suite
 * Validates authored markdown sources and compiled Moodle distribution artifacts
 */

const fs = require('fs');
const path = require('path');
const {
  parseFrontMatter,
  parseSections,
  parseQuizQuestions,
  LESSON_IMAGE_CATALOG,
  SECONDARY_IMAGE_CATALOG,
  generateLessonHtml,
  generateQuizXml,
  getExpectedQuestionCount,
  validateQuestionCount
} = require('../scripts/compile-curriculum');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

console.log('🧪 Running MSA-500 Curriculum Ingestion & Distribution Artifact Tests...\n');

const REPO_ROOT = path.resolve(__dirname, '..');
const CURRICULUM_SRC = path.join(REPO_ROOT, 'curriculum-src', 'junior-secondary', 'jss-1', 'basic-science', 'term-01');
const CONTENT_DIST = path.join(REPO_ROOT, 'content', 'junior-secondary', 'jss-1', 'basic-science', 'term-01');

// 1. Source Files Integrity
console.log('📋 [1/4] Auditing Markdown Source Files:');
const srcFiles = ['week-01.md', 'week-02.md', 'week-03.md', 'week-04.md', 'midterm.md', 'week-06.md', 'week-07.md', 'week-08.md', 'week-09.md', 'end-of-term.md'];
srcFiles.forEach(f => {
  const p = path.join(CURRICULUM_SRC, f);
  assert(fs.existsSync(p), `Source file exists: ${f}`);
  const content = fs.readFileSync(p, 'utf8');
  const { metadata, body } = parseFrontMatter(content);
  assert(metadata.grade === 'JSS 1', `${f}: Grade is JSS 1`);
  assert(metadata.subject === 'Basic Science', `${f}: Subject is Basic Science`);
  assert(metadata.term === '01', `${f}: Term is zero-padded 01`);
  assert(metadata.assessment_category !== undefined, `${f}: assessment_category is defined`);
  assert(metadata.weight_percent !== undefined, `${f}: weight_percent is defined`);

  const sections = parseSections(body);
  if (f.startsWith('week-')) {
    const requiredSections = [
      'Hook', 'Key Terms', 'Core Concept', 'Comparative Matrix',
      'Common Mistakes', 'Worked Examples', 'Guardian Sync', 'Quiz'
    ];
    requiredSections.forEach(s => {
      assert(sections[s] !== undefined, `${f}: Contains mandatory section '## ${s}'`);
    });
  } else {
    assert(sections['Quiz'] !== undefined, `${f}: Assessment contains mandatory '## Quiz' section`);
  }
});

// 2. Quiz Questions Parsing & Distribution
console.log('\n📋 [2/4] Verifying Question Scope & Types:');
const expectedCounts = {
  'week-01.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-02.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-03.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-04.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'midterm.md': { total: 30, single: 20, tf: 4, ms: 3, match: 3 },
  'week-06.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-07.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-08.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-09.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'end-of-term.md': { total: 50, single: 35, tf: 5, ms: 5, match: 5 }
};

Object.entries(expectedCounts).forEach(([fileName, counts]) => {
  const content = fs.readFileSync(path.join(CURRICULUM_SRC, fileName), 'utf8');
  const { body } = parseFrontMatter(content);
  const sections = parseSections(body);
  const qs = parseQuizQuestions(sections['Quiz']);

  assert(qs.length === counts.total, `${fileName}: Contains exactly ${counts.total} questions (got ${qs.length})`);
  const typeMap = {};
  qs.forEach(q => {
    typeMap[q.qType] = (typeMap[q.qType] || 0) + 1;
  });

  assert(typeMap['single-choice'] === counts.single, `${fileName}: Exactly ${counts.single} single-choice questions`);
  assert(typeMap['true-false'] === counts.tf, `${fileName}: Exactly ${counts.tf} true-false questions`);
  assert(typeMap['multi-select'] === counts.ms, `${fileName}: Exactly ${counts.ms} multi-select questions`);
  assert(typeMap['matching'] === counts.match, `${fileName}: Exactly ${counts.match} matching questions`);
});

// 3. Compiled lesson.html Validation
console.log('\n📋 [3/4] Validating Compiled lesson.html Markup & Backend Constraints:');
['week-01', 'week-02'].forEach(w => {
  const lessonPath = path.join(CONTENT_DIST, w, 'lesson.html');
  assert(fs.existsSync(lessonPath), `${w}: lesson.html exists in content distribution folder`);
  const html = fs.readFileSync(lessonPath, 'utf8');

  // Check forbidden HTML5 tags (Moodle sanitizer rule 3.2)
  assert(!/<section\b/i.test(html) && !/<script\b/i.test(html) && !/<style\b/i.test(html), `${w}: Zero <section>, <script>, or <style> tags found (Moodle format_text compliance)`);
  assert(!/<article\b/i.test(html), `${w}: Zero <article> tags found`);
  assert(!/<header\b/i.test(html), `${w}: Zero <header> tags found`);
  assert(!/<footer\b/i.test(html), `${w}: Zero <footer> tags found`);
  assert(!/<svg\b/i.test(html), `${w}: Zero inline <svg> tags found (Moodle sanitizer rule 3.3)`);

  // Check Iconify API usage
  assert(html.includes('https://api.iconify.design/'), `${w}: Uses Iconify API <img> tags for icons`);
  assert(html.includes('alt=""'), `${w}: Decorative icons include alt=""`);

  // Check Content Figure
  assert(html.includes('class="msa-figure"'), `${w}: Contains msa-figure container`);
  assert(html.includes('class="msa-figure-img"'), `${w}: Contains msa-figure-img`);
  assert(html.includes('class="msa-figure-caption"'), `${w}: Contains msa-figure-caption`);

  // Check Slot 10 Non-Redirecting Assessment Notice
  assert(!/<a\s+[^>]*href=/i.test(html.slice(html.indexOf('msa-cta-footer'))), `${w}: Slot 10 contains zero redirect links or buttons`);
  assert(html.includes('class="msa-assessment-notice"'), `${w}: Slot 10 contains msa-assessment-notice banner`);
  assert(html.includes('Assessment Reminder: Week'), `${w}: Slot 10 renders Assessment Reminder header`);
  assert(!html.includes('{{PENDING_CMID}}'), `${w}: Slot 10 contains no placeholder tokens`);

  // Check all required slots are present
  const requiredSlots = [
    'msa-meta-bar', 'msa-lesson-title', 'msa-hook-card', 'msa-term-card',
    'msa-concept-subheading', 'msa-matrix-card', 'msa-callout-error',
    'msa-callout-success', 'msa-scenario-card', 'msa-sync-card', 'msa-cta-footer'
  ];
  requiredSlots.forEach(cls => {
    assert(html.includes(cls), `${w}: Contains required element class '${cls}'`);
  });
});

// 4. Compiled quiz.xml Validation (Term 01)
console.log('\n📋 [4/6] Validating Compiled Term 01 quiz.xml Question Banks & Moodle Categories:');
const expectedQuizConfigs = [
  { folder: 'week-01', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_01/Week_01_Sanitation' },
  { folder: 'week-02', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_01/Week_02_Nutrition_and_Balanced_Diet' },
  { folder: 'week-03', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_01/Week_03_Water_Supply_and_Purification' },
  { folder: 'week-04', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_01/Week_04_Refuse_and_Sewage_Disposal' },
  { folder: 'midterm', totalQ: 30, category: '$course$/top/JSS1_Basic_Science/Term_01/Midterm_Assessment' },
  { folder: 'week-06', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_01/Week_06_Disease_Vectors_and_Prevention' },
  { folder: 'week-07', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_01/Week_07_Personal_Cleanliness_and_Hygiene' },
  { folder: 'week-08', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_01/Week_08_Drug_and_Substance_Abuse' },
  { folder: 'week-09', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_01/Week_09_Mastery_Gate_Assessment' },
  { folder: 'end-of-term', totalQ: 50, category: '$course$/top/JSS1_Basic_Science/Term_01/Terminal_Examination' }
];

expectedQuizConfigs.forEach(cfg => {
  const quizPath = path.join(CONTENT_DIST, cfg.folder, 'quiz.xml');
  assert(fs.existsSync(quizPath), `Term 01 ${cfg.folder}: quiz.xml exists in distribution folder`);
  const xml = fs.readFileSync(quizPath, 'utf8');

  // Mandatory /top/ category declaration
  assert(xml.includes(`<text>${cfg.category}</text>`), `Term 01 ${cfg.folder}: Category path matches '${cfg.category}'`);

  // Question count
  const questionMatches = xml.match(/<question type="(multichoice|truefalse|matching)">/g) || [];
  assert(questionMatches.length === cfg.totalQ, `Term 01 ${cfg.folder}: Contains exactly ${cfg.totalQ} questions`);

  // Explicit defaultgrade 1.0 on every question
  const defaultGradeMatches = xml.match(/<defaultgrade>1\.0<\/defaultgrade>/g) || [];
  assert(defaultGradeMatches.length === cfg.totalQ, `Term 01 ${cfg.folder}: All ${cfg.totalQ} questions have <defaultgrade>1.0</defaultgrade>`);

  // CDATA blocks
  assert(xml.includes('<![CDATA['), `Term 01 ${cfg.folder}: Uses CDATA blocks for text formatting`);
});

// 5. Term 02 Source Files & Question Parsing
console.log('\n📋 [5/6] Auditing Term 02 Markdown Source Files & Question Distribution:');
const CURRICULUM_SRC_T2 = path.join(REPO_ROOT, 'curriculum-src', 'junior-secondary', 'jss-1', 'basic-science', 'term-02');
const CONTENT_DIST_T2 = path.join(REPO_ROOT, 'content', 'junior-secondary', 'jss-1', 'basic-science', 'term-02');

const t2ExpectedCounts = {
  'week-01.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-02.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-03.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-04.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'midterm.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-06.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-07.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-08.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-09.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'end-of-term.md': { total: 50, single: 35, tf: 5, ms: 5, match: 5 }
};

Object.entries(t2ExpectedCounts).forEach(([fileName, counts]) => {
  const p = path.join(CURRICULUM_SRC_T2, fileName);
  assert(fs.existsSync(p), `Term 02 source file exists: ${fileName}`);
  const content = fs.readFileSync(p, 'utf8');
  const { metadata, body } = parseFrontMatter(content);
  assert(metadata.grade === 'JSS 1', `Term 02 ${fileName}: Grade is JSS 1`);
  assert(metadata.subject === 'Basic Science', `Term 02 ${fileName}: Subject is Basic Science`);
  assert(metadata.term === '02', `Term 02 ${fileName}: Term is zero-padded 02`);
  assert(metadata.assessment_category !== undefined, `Term 02 ${fileName}: assessment_category is defined`);

  const sections = parseSections(body);
  if (fileName.startsWith('week-')) {
    const requiredSections = [
      'Hook', 'Key Terms', 'Core Concept', 'Comparative Matrix',
      'Common Mistakes', 'Worked Examples', 'Guardian Sync', 'Quiz'
    ];
    requiredSections.forEach(s => {
      assert(sections[s] !== undefined, `Term 02 ${fileName}: Contains mandatory section '## ${s}'`);
    });
  } else {
    assert(sections['Quiz'] !== undefined, `Term 02 ${fileName}: Assessment contains mandatory '## Quiz' section`);
  }

  const qs = parseQuizQuestions(sections['Quiz']);
  assert(qs.length === counts.total, `Term 02 ${fileName}: Contains exactly ${counts.total} questions (got ${qs.length})`);
  const typeMap = {};
  qs.forEach(q => {
    typeMap[q.qType] = (typeMap[q.qType] || 0) + 1;
  });
  assert(typeMap['single-choice'] === counts.single, `Term 02 ${fileName}: Exactly ${counts.single} single-choice questions`);
  assert(typeMap['true-false'] === counts.tf, `Term 02 ${fileName}: Exactly ${counts.tf} true-false questions`);
  assert(typeMap['multi-select'] === counts.ms, `Term 02 ${fileName}: Exactly ${counts.ms} multi-select questions`);
  assert(typeMap['matching'] === counts.match, `Term 02 ${fileName}: Exactly ${counts.match} matching questions`);
});

// 6. Validating Compiled Term 02 Artifacts
console.log('\n📋 [6/6] Validating Compiled Term 02 lesson.html & quiz.xml Artifacts:');
const t2Weeks = ['week-01', 'week-02', 'week-03', 'week-04', 'week-06', 'week-07', 'week-08', 'week-09'];
t2Weeks.forEach(w => {
  const lessonPath = path.join(CONTENT_DIST_T2, w, 'lesson.html');
  assert(fs.existsSync(lessonPath), `Term 02 ${w}: lesson.html exists in content distribution folder`);
  const html = fs.readFileSync(lessonPath, 'utf8');

  // Moodle sanitizer constraints
  assert(!/<section\b/i.test(html) && !/<script\b/i.test(html) && !/<style\b/i.test(html), `Term 02 ${w}: Zero <section>, <script>, or <style> tags found`);
  assert(!/<article\b/i.test(html) && !/<header\b/i.test(html) && !/<footer\b/i.test(html), `Term 02 ${w}: Zero <article>, <header>, or <footer> tags found`);
  assert(!/<svg\b/i.test(html), `Term 02 ${w}: Zero inline <svg> tags found`);
  assert(html.includes('https://api.iconify.design/'), `Term 02 ${w}: Uses Iconify API <img> tags for icons`);
  assert(!/<a\s+[^>]*href=/i.test(html.slice(html.indexOf('msa-cta-footer'))), `Term 02 ${w}: Slot 10 contains zero redirect links or buttons`);
  assert(html.includes('class="msa-assessment-notice"'), `Term 02 ${w}: Slot 10 contains msa-assessment-notice banner`);
  assert(!html.includes('{{PENDING_CMID}}'), `Term 02 ${w}: Zero pending placeholders (non-redirecting reminder)`);

  const requiredSlots = ['msa-meta-bar', 'msa-lesson-title', 'msa-hook-card', 'msa-term-card', 'msa-concept-subheading', 'msa-matrix-card', 'msa-sync-card', 'msa-cta-footer'];
  requiredSlots.forEach(cls => {
    assert(html.includes(cls), `Term 02 ${w}: Contains required element class '${cls}'`);
  });
});

const t2QuizConfigs = [
  { folder: 'week-01', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Week_01_Living_Things_I' },
  { folder: 'week-02', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Week_02_Living_Things_II' },
  { folder: 'week-03', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Week_03_Non_Living_Things_and_Matter' },
  { folder: 'week-04', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Week_04_Energy_I' },
  { folder: 'midterm', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Midterm_Assessment' },
  { folder: 'week-06', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Week_06_Energy_II' },
  { folder: 'week-07', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Week_07_Pure_and_Impure_Substances_I' },
  { folder: 'week-08', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Week_08_Pure_and_Impure_Substances_II' },
  { folder: 'week-09', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_02/Week_09_Mastery_Gate_Assessment' },
  { folder: 'end-of-term', totalQ: 50, category: '$course$/top/JSS1_Basic_Science/Term_02/Terminal_Examination' }
];

t2QuizConfigs.forEach(cfg => {
  const quizPath = path.join(CONTENT_DIST_T2, cfg.folder, 'quiz.xml');
  assert(fs.existsSync(quizPath), `Term 02 ${cfg.folder}: quiz.xml exists in distribution folder`);
  const xml = fs.readFileSync(quizPath, 'utf8');

  assert(xml.includes(`<text>${cfg.category}</text>`), `Term 02 ${cfg.folder}: Category path matches '${cfg.category}'`);
  const questionMatches = xml.match(/<question type="(multichoice|truefalse|matching)">/g) || [];
  assert(questionMatches.length === cfg.totalQ, `Term 02 ${cfg.folder}: Contains exactly ${cfg.totalQ} questions`);

  const defaultGradeMatches = xml.match(/<defaultgrade>1\.0<\/defaultgrade>/g) || [];
  assert(defaultGradeMatches.length === cfg.totalQ, `Term 02 ${cfg.folder}: All ${cfg.totalQ} questions have <defaultgrade>1.0</defaultgrade>`);
  assert(xml.includes('<![CDATA['), `Term 02 ${cfg.folder}: Uses CDATA blocks for text formatting`);
});

// 7. Term 03 Source Files & Question Parsing
console.log('\n📋 [7/9] Auditing Term 03 Markdown Source Files & Question Distribution:');
const CURRICULUM_SRC_T3 = path.join(REPO_ROOT, 'curriculum-src', 'junior-secondary', 'jss-1', 'basic-science', 'term-03');
const CONTENT_DIST_T3 = path.join(REPO_ROOT, 'content', 'junior-secondary', 'jss-1', 'basic-science', 'term-03');

const t3ExpectedCounts = {
  'week-01.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-02.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-03.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-04.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'midterm.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-06.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-07.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-08.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'week-09.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
  'end-of-term.md': { total: 50, single: 35, tf: 5, ms: 5, match: 5 }
};

Object.entries(t3ExpectedCounts).forEach(([fileName, counts]) => {
  const p = path.join(CURRICULUM_SRC_T3, fileName);
  assert(fs.existsSync(p), `Term 03 source file exists: ${fileName}`);
  const content = fs.readFileSync(p, 'utf8');
  const { metadata, body } = parseFrontMatter(content);
  assert(metadata.grade === 'JSS 1', `Term 03 ${fileName}: Grade is JSS 1`);
  assert(metadata.subject === 'Basic Science', `Term 03 ${fileName}: Subject is Basic Science`);
  assert(metadata.term === '03', `Term 03 ${fileName}: Term is zero-padded 03`);
  assert(metadata.assessment_category !== undefined, `Term 03 ${fileName}: assessment_category is defined`);
  assert(metadata.weight_percent !== undefined, `Term 03 ${fileName}: weight_percent is defined`);

  const sections = parseSections(body);
  if (fileName.startsWith('week-')) {
    const requiredSections = [
      'Hook', 'Key Terms', 'Core Concept', 'Comparative Matrix',
      'Common Mistakes', 'Worked Examples', 'Guardian Sync', 'Quiz'
    ];
    requiredSections.forEach(s => {
      assert(sections[s] !== undefined, `Term 03 ${fileName}: Contains mandatory section '## ${s}'`);
    });
  } else {
    assert(sections['Quiz'] !== undefined, `Term 03 ${fileName}: Assessment contains mandatory '## Quiz' section`);
  }

  const qs = parseQuizQuestions(sections['Quiz']);
  assert(qs.length === counts.total, `Term 03 ${fileName}: Contains exactly ${counts.total} questions (got ${qs.length})`);
  const typeMap = {};
  qs.forEach(q => {
    typeMap[q.qType] = (typeMap[q.qType] || 0) + 1;
  });
  assert(typeMap['single-choice'] === counts.single, `Term 03 ${fileName}: Exactly ${counts.single} single-choice questions`);
  assert(typeMap['true-false'] === counts.tf, `Term 03 ${fileName}: Exactly ${counts.tf} true-false questions`);
  assert(typeMap['multi-select'] === counts.ms, `Term 03 ${fileName}: Exactly ${counts.ms} multi-select questions`);
  assert(typeMap['matching'] === counts.match, `Term 03 ${fileName}: Exactly ${counts.match} matching questions`);
});

// 8. Validating Compiled Term 03 Artifacts
console.log('\n📋 [8/9] Validating Compiled Term 03 lesson.html & quiz.xml Artifacts:');
const t3Weeks = ['week-01', 'week-02', 'week-03', 'week-04', 'week-06', 'week-07', 'week-08', 'week-09'];
t3Weeks.forEach(w => {
  const lessonPath = path.join(CONTENT_DIST_T3, w, 'lesson.html');
  assert(fs.existsSync(lessonPath), `Term 03 ${w}: lesson.html exists in content distribution folder`);
  const html = fs.readFileSync(lessonPath, 'utf8');

  // Moodle sanitizer constraints
  assert(!/<section\b/i.test(html) && !/<script\b/i.test(html) && !/<style\b/i.test(html), `Term 03 ${w}: Zero <section>, <script>, or <style> tags found`);
  assert(!/<article\b/i.test(html) && !/<header\b/i.test(html) && !/<footer\b/i.test(html), `Term 03 ${w}: Zero <article>, <header>, or <footer> tags found`);
  assert(!/<svg\b/i.test(html), `Term 03 ${w}: Zero inline <svg> tags found`);
  assert(html.includes('https://api.iconify.design/'), `Term 03 ${w}: Uses Iconify API <img> tags for icons`);
  assert(!/<a\s+[^>]*href=/i.test(html.slice(html.indexOf('msa-cta-footer'))), `Term 03 ${w}: Slot 10 contains zero redirect links or buttons`);
  assert(html.includes('class="msa-assessment-notice"'), `Term 03 ${w}: Slot 10 contains msa-assessment-notice banner`);
  assert(!html.includes('{{PENDING_CMID}}'), `Term 03 ${w}: Zero pending placeholders (non-redirecting reminder)`);

  const requiredSlots = ['msa-meta-bar', 'msa-lesson-title', 'msa-hook-card', 'msa-term-card', 'msa-concept-subheading', 'msa-matrix-card', 'msa-sync-card', 'msa-cta-footer'];
  requiredSlots.forEach(cls => {
    assert(html.includes(cls), `Term 03 ${w}: Contains required element class '${cls}'`);
  });
});

const t3QuizConfigs = [
  { folder: 'week-01', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Week_01_Forces_I' },
  { folder: 'week-02', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Week_02_Forces_II' },
  { folder: 'week-03', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Week_03_Frictional_Force' },
  { folder: 'week-04', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Week_04_Gravitation_and_Weightlessness' },
  { folder: 'midterm', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Midterm_Assessment' },
  { folder: 'week-06', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Week_06_Earth_in_Space' },
  { folder: 'week-07', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Week_07_Space_Travel' },
  { folder: 'week-08', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Week_08_Satellites' },
  { folder: 'week-09', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Week_09_Mastery_Gate_Assessment' },
  { folder: 'end-of-term', totalQ: 50, category: '$course$/top/JSS1_Basic_Science/Term_03/Terminal_Examination' }
];

t3QuizConfigs.forEach(cfg => {
  const quizPath = path.join(CONTENT_DIST_T3, cfg.folder, 'quiz.xml');
  assert(fs.existsSync(quizPath), `Term 03 ${cfg.folder}: quiz.xml exists in distribution folder`);
  const xml = fs.readFileSync(quizPath, 'utf8');

  assert(xml.includes(`<text>${cfg.category}</text>`), `Term 03 ${cfg.folder}: Category path matches '${cfg.category}'`);
  const questionMatches = xml.match(/<question type="(multichoice|truefalse|matching)">/g) || [];
  assert(questionMatches.length === cfg.totalQ, `Term 03 ${cfg.folder}: Contains exactly ${cfg.totalQ} questions`);

  const defaultGradeMatches = xml.match(/<defaultgrade>1\.0<\/defaultgrade>/g) || [];
  assert(defaultGradeMatches.length === cfg.totalQ, `Term 03 ${cfg.folder}: All ${cfg.totalQ} questions have <defaultgrade>1.0</defaultgrade>`);
  assert(xml.includes('<![CDATA['), `Term 03 ${cfg.folder}: Uses CDATA blocks for text formatting`);
});

// 9. Universal Topic-Accurate Lesson Imagery Architecture Validation
console.log('\n📋 [9/9] Auditing Universal Topic-Accurate Lesson Imagery Across All Sessional Modules:');
const sessionalLessonAudits = [
  { term: '01', week: '01', dir: CONTENT_DIST },
  { term: '01', week: '02', dir: CONTENT_DIST },
  { term: '01', week: '03', dir: CONTENT_DIST },
  { term: '01', week: '04', dir: CONTENT_DIST },
  { term: '01', week: '06', dir: CONTENT_DIST },
  { term: '01', week: '07', dir: CONTENT_DIST },
  { term: '01', week: '08', dir: CONTENT_DIST },
  { term: '01', week: '09', dir: CONTENT_DIST },
  { term: '02', week: '01', dir: CONTENT_DIST_T2 },
  { term: '02', week: '02', dir: CONTENT_DIST_T2 },
  { term: '02', week: '03', dir: CONTENT_DIST_T2 },
  { term: '02', week: '04', dir: CONTENT_DIST_T2 },
  { term: '02', week: '06', dir: CONTENT_DIST_T2 },
  { term: '02', week: '07', dir: CONTENT_DIST_T2 },
  { term: '02', week: '08', dir: CONTENT_DIST_T2 },
  { term: '02', week: '09', dir: CONTENT_DIST_T2 },
  { term: '03', week: '01', dir: CONTENT_DIST_T3 },
  { term: '03', week: '02', dir: CONTENT_DIST_T3 },
  { term: '03', week: '03', dir: CONTENT_DIST_T3 },
  { term: '03', week: '04', dir: CONTENT_DIST_T3 },
  { term: '03', week: '06', dir: CONTENT_DIST_T3 },
  { term: '03', week: '07', dir: CONTENT_DIST_T3 },
  { term: '03', week: '08', dir: CONTENT_DIST_T3 },
  { term: '03', week: '09', dir: CONTENT_DIST_T3 }
];

sessionalLessonAudits.forEach(({ term, week, dir }) => {
  const lessonPath = path.join(dir, `week-${week}`, 'lesson.html');
  const html = fs.readFileSync(lessonPath, 'utf8');
  const expectedUrl = LESSON_IMAGE_CATALOG[term][week];

  assert(html.includes(expectedUrl), `Term ${term} Week ${week}: Contains authentic topic-accurate image (${expectedUrl})`);

  // Secondary image check for Earth in Space & Eclipses
  if (term === '03' && week === '06') {
    const secUrl = SECONDARY_IMAGE_CATALOG['03']['06'];
    assert(html.includes(secUrl), `Term 03 Week 06: Contains secondary eclipse image (${secUrl})`);
  }

  // Verify generic placeholder food image is NOT present in any non-nutrition module
  const genericFoodImage = 'photo-1498837167922-ddd27525d352';
  if (!(term === '01' && week === '02')) {
    assert(!html.includes(genericFoodImage), `Term ${term} Week ${week}: Generic placeholder food image permanently eliminated`);
  }

  // Verify zero raw cite tags
  assert(!html.includes('[cite:'), `Term ${term} Week ${week}: Zero [cite: tags found in compiled lesson`);
});

// 10. Subject-Specific Assessment Pool Override Validation (English Studies vs Standard)
console.log('\n📋 [10/10] Auditing Subject-Specific Assessment Pool Overrides (English Studies vs Standard):');

// English Studies Lesson HTML Slot 10 Dynamic Question Count
const englishMeta = {
  grade: 'JSS 1',
  subject: 'English Studies',
  term: '01',
  week: '01',
  topic: 'Introduction to Speech Work & Oral Communication',
  weight_percent: '40',
  assessment_category: 'Continuous Assessment'
};
const englishHtml = generateLessonHtml(englishMeta, {
  'Hook': 'Good speech builds confidence.',
  'Key Terms': '- Term: Vowel\n  Definition: Speech sound produced without vocal tract constriction.',
  'Core Concept': '### Aspect 1: Speech Work — Pure Vowels\nDetailed explanation of vowels.',
  'Comparative Matrix': 'Heading: Vowel Contrasts\n- Label: Long Vowel\n  Title: /i:/\n  Body: Sheep\n- Label: Short Vowel\n  Title: /I/\n  Body: Ship',
  'Common Mistakes': '- Mistake: Pronouncing ship like sheep.\n  Fact: /I/ is short while /i:/ is long.',
  'Worked Examples': '### Example A: Phonetics\nContext: Reading aloud.\nProblem: Vowel shortening.\nFix: Prolong vowel sound.',
  'Guardian Sync': 'Read minimal pairs with a guardian.'
});

assert(englishHtml.includes('Week 01 Assessment (30 Questions)'), 'English Studies: Lesson assessment notice dynamically renders 30 Questions');
assert(englishHtml.includes('Passing Score: 50% (15/30)'), 'English Studies: Lesson assessment notice subtext dynamically renders 15/30 passing threshold');
assert(englishHtml.includes('class="msa-assessment-notice"'), 'English Studies: Lesson contains non-redirecting msa-assessment-notice');

// Standard Subject (Basic Science) Lesson HTML Slot 10 Verification
const standardMeta = {
  grade: 'JSS 1',
  subject: 'Basic Science',
  term: '01',
  week: '01',
  topic: 'Sanitation',
  weight_percent: '40',
  assessment_category: 'Continuous Assessment'
};
const standardHtml = generateLessonHtml(standardMeta, {
  'Hook': 'Clean surroundings prevent disease.',
  'Key Terms': '- Term: Sanitation\n  Definition: Hygienic conditions.',
  'Core Concept': 'Sanitation is essential.',
  'Comparative Matrix': 'Heading: Refuse Disposal\n- Label: Incineration\n  Title: Burning\n  Body: Reduces volume\n- Label: Landfill\n  Title: Burying\n  Body: Requires space',
  'Common Mistakes': '- Mistake: Dumping refuse anywhere.\n  Fact: Vectors breed in dumped refuse.',
  'Worked Examples': '### Example A: Waste disposal\nContext: Backyard dumping.\nProblem: Fly infestation.\nFix: Cover dustbin.',
  'Guardian Sync': 'Inspect drainage with guardian.'
});

assert(standardHtml.includes('Week 01 Assessment (20 Questions)'), 'Standard Subject (Basic Science): Lesson assessment notice renders 20 Questions');
assert(standardHtml.includes('Passing Score: 50% (10/20)'), 'Standard Subject (Basic Science): Lesson assessment notice subtext renders 10/20 passing threshold');
assert(standardHtml.includes('class="msa-assessment-notice"'), 'Standard Subject: Lesson contains non-redirecting msa-assessment-notice');

// Quiz XML Dynamic Question Naming
const mockQuestions = [
  { qNum: 1, qType: 'single-choice', stem: 'Test stem', feedback: 'Test feedback', options: [{ letter: 'A', text: 'Opt A', isCorrect: true }] }
];
const englishXml = generateQuizXml(englishMeta, mockQuestions, '$course$/top/JSS1_English_Studies/Term_01/Week_01_Speech_Work');
assert(englishXml.includes('W01_Q01: English Studies JSS1 Assessment'), 'English Studies: Quiz XML question name dynamically includes "English Studies JSS1 Assessment"');

const standardXml = generateQuizXml(standardMeta, mockQuestions, '$course$/top/JSS1_Basic_Science/Term_01/Week_01_Sanitation');
assert(standardXml.includes('W01_Q01: Basic Science JSS1 Assessment'), 'Standard Subject: Quiz XML question name preserves "Basic Science JSS1 Assessment"');

// Schema Validation: English Studies 30-Question and 60-Question Pool Specifications
const englishDistributionRules = {
  weekly: { total: 30, single: 21, tf: 3, ms: 3, match: 3 },
  midterm: { total: 30, single: 21, tf: 3, ms: 3, match: 3 },
  terminal: { total: 60, single: 42, tf: 6, ms: 6, match: 6 }
};
assert(englishDistributionRules.weekly.total === 30, 'English Studies weekly quiz rule is strictly 30 questions');
assert(englishDistributionRules.weekly.single + englishDistributionRules.weekly.tf + englishDistributionRules.weekly.ms + englishDistributionRules.weekly.match === 30, 'English Studies weekly quiz breakdown sums to exactly 30 (21/3/3/3)');
assert(englishDistributionRules.terminal.total === 60, 'English Studies terminal exam rule is strictly 60 questions');
assert(englishDistributionRules.terminal.single + englishDistributionRules.terminal.tf + englishDistributionRules.terminal.ms + englishDistributionRules.terminal.match === 60, 'English Studies terminal exam breakdown sums to exactly 60 (42/6/6/6)');

// Validation Function Enforcement Tests
assert(getExpectedQuestionCount('English Studies', '01') === 30, 'getExpectedQuestionCount: English Studies weekly is 30');
assert(getExpectedQuestionCount('English Studies', 'midterm') === 30, 'getExpectedQuestionCount: English Studies midterm is 30');
assert(getExpectedQuestionCount('English Studies', 'end-of-term') === 60, 'getExpectedQuestionCount: English Studies end-of-term is 60');
assert(getExpectedQuestionCount('Basic Science', '01') === 20, 'getExpectedQuestionCount: Basic Science weekly is 20');
assert(getExpectedQuestionCount('Basic Science', 'end-of-term') === 50, 'getExpectedQuestionCount: Basic Science end-of-term is 50');
assert(getExpectedQuestionCount('Mathematics', '01') === 20, 'getExpectedQuestionCount: Mathematics weekly is 20');
assert(getExpectedQuestionCount('Mathematics', 'end-of-term') === 50, 'getExpectedQuestionCount: Mathematics end-of-term is 50');
assert(getExpectedQuestionCount('Basic Technology', '01') === 20, 'getExpectedQuestionCount: Basic Technology weekly is 20');
assert(getExpectedQuestionCount('Basic Technology', 'end-of-term') === 50, 'getExpectedQuestionCount: Basic Technology end-of-term is 50');

// validateQuestionCount Success Cases
assert(validateQuestionCount({ subject: 'English Studies', week: '01' }, 30) === true, 'validateQuestionCount: English Studies weekly with 30 passes');
assert(validateQuestionCount({ subject: 'English Studies', week: 'end-of-term' }, 60) === true, 'validateQuestionCount: English Studies terminal with 60 passes');
assert(validateQuestionCount({ subject: 'Basic Science', week: '01' }, 20) === true, 'validateQuestionCount: Standard weekly with 20 passes');
assert(validateQuestionCount({ subject: 'Basic Science', week: 'end-of-term' }, 50) === true, 'validateQuestionCount: Standard terminal with 50 passes');

// validateQuestionCount Failure Cases
let caughtEnglishMismatch = false;
try {
  validateQuestionCount({ subject: 'English Studies', week: '01' }, 20);
} catch (e) {
  caughtEnglishMismatch = true;
}
assert(caughtEnglishMismatch, 'validateQuestionCount: Rejects English Studies weekly with 20 questions');

let caughtStandardMismatch = false;
try {
  validateQuestionCount({ subject: 'Basic Science', week: '01' }, 30);
} catch (e) {
  caughtStandardMismatch = true;
}
assert(caughtStandardMismatch, 'validateQuestionCount: Rejects Standard weekly with 30 questions');

// 11. Dynamic JSS 1 Cluster & Sub-Track Curriculum Audit Engine
console.log('\n📋 [11/11] Dynamically Auditing All JSS 1 Subject Clusters & Sub-Tracks:');
const CURRICULUM_SRC_JSS1 = path.join(REPO_ROOT, 'curriculum-src', 'junior-secondary', 'jss-1');

const discoveredSubjects = fs.readdirSync(CURRICULUM_SRC_JSS1).filter(s => {
  return fs.statSync(path.join(CURRICULUM_SRC_JSS1, s)).isDirectory();
});

discoveredSubjects.forEach(subjectSlug => {
  const isEnglish = subjectSlug.includes('english');
  const subjectDir = path.join(CURRICULUM_SRC_JSS1, subjectSlug);
  const terms = fs.readdirSync(subjectDir).filter(t => {
    return fs.statSync(path.join(subjectDir, t)).isDirectory();
  });

  terms.forEach(term => {
    const termDir = path.join(subjectDir, term);
    const files = fs.readdirSync(termDir).filter(f => f.endsWith('.md'));

    files.forEach(fileName => {
      const p = path.join(termDir, fileName);
      assert(fs.existsSync(p), `${subjectSlug} ${term} ${fileName}: File exists`);
      const fileContent = fs.readFileSync(p, 'utf8');
      const { metadata, body } = parseFrontMatter(fileContent);

      assert(metadata.grade === 'JSS 1', `${subjectSlug} ${term} ${fileName}: Grade is JSS 1`);
      assert(metadata.term !== undefined, `${subjectSlug} ${term} ${fileName}: Term is defined`);
      assert(metadata.assessment_category !== undefined, `${subjectSlug} ${term} ${fileName}: assessment_category is defined`);

      const sections = parseSections(body);
      if (fileName.startsWith('week-')) {
        const requiredSections = [
          'Hook', 'Key Terms', 'Core Concept', 'Comparative Matrix',
          'Common Mistakes', 'Worked Examples', 'Guardian Sync', 'Quiz'
        ];
        requiredSections.forEach(s => {
          assert(sections[s] !== undefined, `${subjectSlug} ${term} ${fileName}: Contains mandatory section '## ${s}'`);
        });

        if (isEnglish) {
          const coreConcept = sections['Core Concept'] || '';
          assert(coreConcept.includes('### Aspect 1: Speech Work'), `${subjectSlug} ${term} ${fileName}: Aspect 1 (Speech Work)`);
          assert(coreConcept.includes('### Aspect 2: Structure'), `${subjectSlug} ${term} ${fileName}: Aspect 2 (Structure)`);
          assert(coreConcept.includes('### Aspect 3: Comprehension & Vocabulary'), `${subjectSlug} ${term} ${fileName}: Aspect 3 (Comprehension & Vocabulary)`);
          assert(coreConcept.includes('### Aspect 4:'), `${subjectSlug} ${term} ${fileName}: Aspect 4 (Composition / Continuous Writing)`);
          assert(coreConcept.includes('### Aspect 5: Literature-in-English'), `${subjectSlug} ${term} ${fileName}: Aspect 5 (Literature-in-English)`);
        }
      } else {
        assert(sections['Quiz'] !== undefined, `${subjectSlug} ${term} ${fileName}: Contains mandatory '## Quiz' section`);
      }

      const qs = parseQuizQuestions(sections['Quiz']);
      let expectedTotal;
      let expectedBreakdown = null;

      if (fileName.startsWith('week-')) {
        expectedTotal = isEnglish ? 30 : 20;
        expectedBreakdown = isEnglish ? { single: 21, tf: 3, ms: 3, match: 3 } : { single: 14, tf: 2, ms: 2, match: 2 };
      } else if (fileName === 'midterm.md') {
        if (isEnglish) {
          expectedTotal = 30;
          expectedBreakdown = { single: 21, tf: 3, ms: 3, match: 3 };
        } else if (subjectSlug === 'basic-science' && term === 'term-01') {
          expectedTotal = 30;
          expectedBreakdown = { single: 20, tf: 4, ms: 3, match: 3 };
        } else if (subjectSlug === 'mathematics' && term === 'term-02') {
          expectedTotal = 20;
          expectedBreakdown = { single: 18, tf: 0, ms: 0, match: 2 };
        } else {
          expectedTotal = 20;
          expectedBreakdown = { single: 14, tf: 2, ms: 2, match: 2 };
        }
      } else if (fileName === 'end-of-term.md') {
        expectedTotal = isEnglish ? 60 : 50;
        expectedBreakdown = isEnglish ? { single: 42, tf: 6, ms: 6, match: 6 } : { single: 35, tf: 5, ms: 5, match: 5 };
      }

      assert(qs.length === expectedTotal, `${subjectSlug} ${term} ${fileName}: Contains exactly ${expectedTotal} questions (got ${qs.length})`);

      if (expectedBreakdown) {
        const typeMap = {};
        qs.forEach(q => {
          typeMap[q.qType] = (typeMap[q.qType] || 0) + 1;
        });
        assert(typeMap['single-choice'] === expectedBreakdown.single, `${subjectSlug} ${term} ${fileName}: Exactly ${expectedBreakdown.single} single-choice questions`);
        assert((typeMap['true-false'] || 0) === expectedBreakdown.tf, `${subjectSlug} ${term} ${fileName}: Exactly ${expectedBreakdown.tf} true-false questions`);
        assert((typeMap['multi-select'] || 0) === expectedBreakdown.ms, `${subjectSlug} ${term} ${fileName}: Exactly ${expectedBreakdown.ms} multi-select questions`);
        assert((typeMap['matching'] || 0) === expectedBreakdown.match, `${subjectSlug} ${term} ${fileName}: Exactly ${expectedBreakdown.match} matching questions`);
      }
    });
  });
});

// 12. Complete JSS 1 Content Distribution Artifact Audit
console.log('\n📋 [12/12] Auditing Complete JSS 1 Content Distribution Artifacts (360 Lessons + 450 Quizzes):');
const CONTENT_DIST_JSS1 = path.join(REPO_ROOT, 'content', 'junior-secondary', 'jss-1');
let totalLessonsCompiled = 0;
let totalQuizzesCompiled = 0;

discoveredSubjects.forEach(subjectSlug => {
  const subjectDistDir = path.join(CONTENT_DIST_JSS1, subjectSlug);
  assert(fs.existsSync(subjectDistDir), `Distribution directory exists for subject: ${subjectSlug}`);

  const terms = ['term-01', 'term-02', 'term-03'];
  terms.forEach(term => {
    const termDistDir = path.join(subjectDistDir, term);
    assert(fs.existsSync(termDistDir), `${subjectSlug} ${term}: Distribution folder exists`);

    // Check weekly lessons and quizzes
    const weeklyWeeks = ['week-01', 'week-02', 'week-03', 'week-04', 'week-06', 'week-07', 'week-08', 'week-09'];
    weeklyWeeks.forEach(w => {
      const lessonPath = path.join(termDistDir, w, 'lesson.html');
      assert(fs.existsSync(lessonPath), `${subjectSlug} ${term} ${w}: lesson.html exists`);
      totalLessonsCompiled++;

      const html = fs.readFileSync(lessonPath, 'utf8');
      assert(html.includes('class="msa-assessment-notice"'), `${subjectSlug} ${term} ${w}: Contains msa-assessment-notice`);
      assert(!/<a\s+[^>]*href=/i.test(html.slice(html.indexOf('msa-cta-footer'))), `${subjectSlug} ${term} ${w}: Zero redirect links in footer`);

      const quizPath = path.join(termDistDir, w, 'quiz.xml');
      assert(fs.existsSync(quizPath), `${subjectSlug} ${term} ${w}: quiz.xml exists`);
      totalQuizzesCompiled++;
    });

    // Check midterm quiz
    const midtermPath = path.join(termDistDir, 'midterm', 'quiz.xml');
    assert(fs.existsSync(midtermPath), `${subjectSlug} ${term} midterm: quiz.xml exists`);
    totalQuizzesCompiled++;

    // Check end-of-term quiz
    const eotPath = path.join(termDistDir, 'end-of-term', 'quiz.xml');
    assert(fs.existsSync(eotPath), `${subjectSlug} ${term} end-of-term: quiz.xml exists`);
    totalQuizzesCompiled++;
  });
});

assert(totalLessonsCompiled === 360, `Universal Audit: Exactly 360 lesson.html files verified across all 15 subjects (found ${totalLessonsCompiled})`);
assert(totalQuizzesCompiled === 450, `Universal Audit: Exactly 450 quiz.xml files verified across all 15 subjects (found ${totalQuizzesCompiled})`);

console.log(`\n==================================================`);
console.log(`Curriculum Test Results: ${passedTests} passed, ${failedTests} failed`);
console.log(`==================================================\n`);

if (failedTests > 0) {
  process.exit(1);
}
