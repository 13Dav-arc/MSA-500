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
  parseQuizQuestions
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
const srcFiles = ['week-01.md', 'week-02.md', 'midterm.md', 'end-of-term.md'];
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
  'midterm.md': { total: 30, single: 20, tf: 4, ms: 3, match: 3 },
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

  // Check Slot 10 CTA Live Moodle URL
  const expectedQuizUrls = {
    'week-01': 'https://msa.mayndstomir.com/moodle/mod/quiz/view.php?id=278',
    'week-02': 'https://msa.mayndstomir.com/moodle/mod/quiz/view.php?id=279'
  };
  assert(html.includes(`href="${expectedQuizUrls[w]}"`) && !html.includes('{{PENDING_CMID}}'), `${w}: Slot 10 CTA links to live Moodle quiz URL (${expectedQuizUrls[w]}) and no placeholder remains`);

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
  { folder: 'midterm', totalQ: 30, category: '$course$/top/JSS1_Basic_Science/Term_01/Midterm_Assessment' },
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
  assert(html.includes('{{PENDING_CMID}}'), `Term 02 ${w}: Slot 10 CTA includes {{PENDING_CMID}} placeholder for staging`);

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
console.log('\n📋 [7/8] Auditing Term 03 Markdown Source Files & Question Distribution:');
const CURRICULUM_SRC_T3 = path.join(REPO_ROOT, 'curriculum-src', 'junior-secondary', 'jss-1', 'basic-science', 'term-03');
const CONTENT_DIST_T3 = path.join(REPO_ROOT, 'content', 'junior-secondary', 'jss-1', 'basic-science', 'term-03');

const t3ExpectedCounts = {
  'midterm.md': { total: 20, single: 14, tf: 2, ms: 2, match: 2 },
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
  assert(sections['Quiz'] !== undefined, `Term 03 ${fileName}: Assessment contains mandatory '## Quiz' section`);

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
console.log('\n📋 [8/8] Validating Compiled Term 03 quiz.xml Question Banks & Moodle Categories:');
const t3QuizConfigs = [
  { folder: 'midterm', totalQ: 20, category: '$course$/top/JSS1_Basic_Science/Term_03/Midterm_Assessment' },
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

console.log(`\n==================================================`);
console.log(`Curriculum Test Results: ${passedTests} passed, ${failedTests} failed`);
console.log(`==================================================\n`);

if (failedTests > 0) {
  process.exit(1);
}
