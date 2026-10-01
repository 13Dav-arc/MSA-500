/**
 * MindStormer Global Academy (MSA-500)
 * Curriculum Scaffolding Script
 * Generates directory tree and empty placeholder files for all 15 JSS 1 subjects across 3 terms.
 * Protects pre-existing authored files from overwrite.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const BASE_DIR = path.join(REPO_ROOT, 'curriculum-src', 'junior-secondary', 'jss-1');

const SUBJECTS = [
  'agricultural-science',
  'basic-science',
  'basic-technology',
  'business-studies',
  'civic-education',
  'computer-studies',
  'cultural-creative-arts',
  'english-studies',
  'french-language',
  'home-economics',
  'mathematics',
  'physical-health-education',
  'religious-studies',
  'security-education',
  'social-studies'
];

const TERMS = ['term-01', 'term-02', 'term-03'];

const FILES = [
  'week-01.md',
  'week-02.md',
  'week-03.md',
  'week-04.md',
  'midterm.md',
  'week-06.md',
  'week-07.md',
  'week-08.md',
  'week-09.md',
  'end-of-term.md'
];

console.log('🚀 Launching JSS 1 Curriculum Scaffolding (15 Subjects × 3 Terms)...\n');

let createdDirs = 0;
let createdFiles = 0;
let preservedFiles = 0;

SUBJECTS.forEach(subject => {
  TERMS.forEach(term => {
    const dirPath = path.join(BASE_DIR, subject, term);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      createdDirs++;
    }

    FILES.forEach(file => {
      const filePath = path.join(dirPath, file);
      if (fs.existsSync(filePath)) {
        preservedFiles++;
      } else {
        fs.writeFileSync(filePath, '', 'utf8'); // Pure 0-byte empty markdown file (Option 2)
        createdFiles++;
      }
    });
  });
});

console.log('🏁 Scaffolding Complete!');
console.log(`- Subjects: ${SUBJECTS.length}`);
console.log(`- Term Directories Configured: ${SUBJECTS.length * TERMS.length}`);
console.log(`- New Directories Created: ${createdDirs}`);
console.log(`- New 0-Byte Markdown Files Created: ${createdFiles}`);
console.log(`- Pre-Existing Authored Files Preserved: ${preservedFiles}`);
