/**
 * MindStormer Global Academy (MSA-500)
 * Comprehensive Form Validation, Accessibility, Gamification, K-8 Modules & Parent Dashboard Test Suite
 * Executed locally before Git stage & push
 */

const fs = require('fs');
const path = require('path');
const {
  PasswordRules,
  validateEmail,
  validatePassword,
  validateRequired
} = require('../assets/js/form-validation');
const { studentData } = require('../assets/js/parent');

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

console.log('🧪 Running MSA-500 Quality Gate, Accessibility, Gamification, K-8 & Guardian Portal Tests...\n');

// 1. Password Rule Unit Tests
console.log('📋 [1/9] Testing Password Validation Rules:');

const validPass = validatePassword('Stormer@2026');
assert(validPass.isValid === true, 'Strong password with uppercase, number, symbol, and 8+ chars passes');
assert(validPass.rules.length === true, 'Password meets length requirement (>= 8)');
assert(validPass.rules.upper === true, 'Password meets uppercase requirement');
assert(validPass.rules.num === true, 'Password meets numeric requirement');
assert(validPass.rules.spec === true, 'Password meets symbol requirement');

const shortPass = validatePassword('St@1');
assert(shortPass.isValid === false, 'Short password (< 8 chars) fails');
assert(shortPass.rules.length === false, 'Length rule accurately flags short password');

const noUpper = validatePassword('stormer@2026');
assert(noUpper.isValid === false, 'Password lacking uppercase fails');
assert(noUpper.rules.upper === false, 'Uppercase rule accurately flags missing uppercase');

const noNum = validatePassword('Stormer@Academy');
assert(noNum.isValid === false, 'Password lacking numbers fails');
assert(noNum.rules.num === false, 'Number rule accurately flags missing numeric digit');

const noSpec = validatePassword('Stormer2026');
assert(noSpec.isValid === false, 'Password lacking symbols fails');
assert(noSpec.rules.spec === false, 'Symbol rule accurately flags missing symbol');

const emptyPass = validatePassword('');
assert(emptyPass.isValid === false, 'Empty password fails');

// 2. Email Validation Unit Tests
console.log('\n📋 [2/9] Testing Email Address Validation:');

assert(validateEmail('student@mindstormer.com') === true, 'Standard corporate email is valid');
assert(validateEmail('parent.alex+1@mayndstormir.org') === true, 'Email with plus-addressing and dots is valid');
assert(validateEmail('user@sub.domain.edu') === true, 'Multi-part domain email is valid');

assert(validateEmail('notanemail') === false, 'Plain string without @ is rejected');
assert(validateEmail('user@') === false, 'Missing domain is rejected');
assert(validateEmail('@domain.com') === false, 'Missing user is rejected');
assert(validateEmail('user@domain') === false, 'Missing TLD is rejected');
assert(validateEmail('') === false, 'Empty email string is rejected');
assert(validateEmail('   ') === false, 'Whitespace email string is rejected');

// 3. Required Field Validation Unit Tests
console.log('\n📋 [3/9] Testing Required Field Validator:');

assert(validateRequired('Alex') === true, 'Non-empty string is valid');
assert(validateRequired('   Alex  ') === true, 'String with trimmed content is valid');
assert(validateRequired('') === false, 'Empty string fails required check');
assert(validateRequired('   ') === false, 'Whitespace-only string fails required check');

// 4. SCSS Design Token & Embed Architecture Verification
console.log('\n📋 [4/9] Testing SCSS Design Token Files & Simulation Embed Classes:');

const scssFiles = [
  'scss/_variables.scss',
  'scss/_buttons.scss',
  'scss/_cards.scss',
  'scss/_dashboard.scss',
  'scss/main.scss'
];

scssFiles.forEach((file) => {
  const fullPath = path.resolve(__dirname, '..', file);
  assert(fs.existsSync(fullPath), `SCSS file exists: ${file}`);
  const content = fs.readFileSync(fullPath, 'utf8');
  assert(content.length > 50, `${file} is non-empty and well-structured`);
});

const cardsScssContent = fs.readFileSync(path.resolve(__dirname, '..', 'scss/_cards.scss'), 'utf8');
assert(cardsScssContent.includes('.simulation-embed-container'), 'scss/_cards.scss defines .simulation-embed-container');
assert(cardsScssContent.includes('.lab-header-tactile'), 'scss/_cards.scss defines .lab-header-tactile');
assert(cardsScssContent.includes('.lab-iframe-wrapper'), 'scss/_cards.scss defines .lab-iframe-wrapper');
assert(cardsScssContent.includes('aspect-ratio: 16 / 9'), 'scss/_cards.scss enforces 16:9 aspect ratio zero-shift containment');
assert(cardsScssContent.includes('@supports not (aspect-ratio: 16 / 9)'), 'scss/_cards.scss provides legacy aspect-ratio fallback');
assert(cardsScssContent.includes('.lab-facade-cover'), 'scss/_cards.scss defines .lab-facade-cover');
assert(cardsScssContent.includes('.lab-fallback-card'), 'scss/_cards.scss defines .lab-fallback-card');

const mainScssContent = fs.readFileSync(path.resolve(__dirname, '..', 'scss/main.scss'), 'utf8');
assert(mainScssContent.includes("@import 'variables'"), 'main.scss imports variables');
assert(mainScssContent.includes("@import 'buttons'"), 'main.scss imports buttons');
assert(mainScssContent.includes("@import 'cards'"), 'main.scss imports cards');
assert(mainScssContent.includes("@import 'dashboard'"), 'main.scss imports dashboard');

// 5. Template Static Accessibility & Lifecycle Hooks
console.log('\n📋 [5/9] Testing Mustache Template Accessibility & Lifecycle Hooks:');

const mustacheTemplates = [
  'templates/mustache/login.mustache',
  'templates/mustache/signup.mustache',
  'templates/mustache/dashboard.mustache',
  'templates/mustache/parent_login.mustache',
  'templates/mustache/parent_signup.mustache',
  'templates/mustache/parent_dashboard.mustache'
];

mustacheTemplates.forEach((templatePath) => {
  const fullPath = path.resolve(__dirname, '..', templatePath);
  assert(fs.existsSync(fullPath), `Template file exists: ${templatePath}`);
  
  const content = fs.readFileSync(fullPath, 'utf8');

  // Check Moodle standard body lifecycle hooks
  assert(
    content.includes('{{{ output.standard_top_of_body_html }}}'),
    `${templatePath} includes output.standard_top_of_body_html`
  );
  assert(
    content.includes('{{{ output.standard_end_of_body_html }}}'),
    `${templatePath} includes output.standard_end_of_body_html`
  );

  // Check Semantic Landmarks
  assert(content.includes('role="banner"'), `${templatePath} has header role="banner"`);
  assert(content.includes('role="main"'), `${templatePath} has main role="main"`);
  assert(content.includes('role="contentinfo"'), `${templatePath} has footer role="contentinfo"`);
});

// Check Auth Template Specifics (Labels, ARIA, and Password Toggles)
const authTemplates = [
  'templates/mustache/login.mustache',
  'templates/mustache/signup.mustache',
  'templates/mustache/parent_login.mustache',
  'templates/mustache/parent_signup.mustache'
];

authTemplates.forEach((templatePath) => {
  const fullPath = path.resolve(__dirname, '..', templatePath);
  const content = fs.readFileSync(fullPath, 'utf8');

  assert(content.includes('aria-required="true"'), `${templatePath} contains aria-required fields`);
  assert(content.includes('data-toggle-password'), `${templatePath} contains accessible password toggle button`);
  assert(content.includes('aria-label='), `${templatePath} contains explicit ARIA labels`);
});

// Check Registration Checklists (aria-live region)
const registrationTemplates = [
  'templates/mustache/signup.mustache',
  'templates/mustache/parent_signup.mustache'
];

registrationTemplates.forEach((templatePath) => {
  const fullPath = path.resolve(__dirname, '..', templatePath);
  const content = fs.readFileSync(fullPath, 'utf8');

  assert(
    content.includes('aria-live="polite"'),
    `${templatePath} has password checklist with aria-live="polite"`
  );
  assert(
    content.includes('rule-length') && content.includes('rule-upper') && content.includes('rule-num') && content.includes('rule-spec'),
    `${templatePath} contains all 4 visual password rule feedback elements`
  );
});

// 6. Gamification Bar Partial & Dashboard Integration
console.log('\n📋 [6/9] Testing Gamification Bar Partial:');

const gamificationPaths = [
  'theme/boost/templates/gamification_bar.mustache',
  'templates/mustache/gamification_bar.mustache'
];

gamificationPaths.forEach((partialPath) => {
  const fullPath = path.resolve(__dirname, '..', partialPath);
  assert(fs.existsSync(fullPath), `Gamification partial exists: ${partialPath}`);

  const content = fs.readFileSync(fullPath, 'utf8');
  assert(content.includes('role="region"'), `${partialPath} has landmark role="region"`);
  assert(content.includes('aria-label="Student Gamification and Daily Progress"'), `${partialPath} has accessible region label`);
  assert(content.includes('role="status"'), `${partialPath} has dynamic status announcements`);
  assert(content.includes('role="progressbar"'), `${partialPath} has accessible progressbar`);
  assert(content.includes('role="group"'), `${partialPath} groups weekly streak schedule`);
  assert(content.includes('sr-only'), `${partialPath} provides screen reader day indicators`);
});

const dashboardTemplateContent = fs.readFileSync(
  path.resolve(__dirname, '..', 'templates/mustache/dashboard.mustache'),
  'utf8'
);
assert(
  dashboardTemplateContent.includes('{{> theme_boost/gamification_bar }}'),
  'dashboard.mustache includes {{> theme_boost/gamification_bar }} partial'
);

// 7. K-8 Academic Tier Badges & PhET Simulation Embed Verification
console.log('\n📋 [7/9] Testing K-8 Course Module Cards & PhET / Tinkercad Simulation Embed Containers:');

assert(
  dashboardTemplateContent.includes('Junior Secondary (JSS 1–3)'),
  'dashboard.mustache contains Junior Secondary (JSS 1–3) badge'
);
assert(
  dashboardTemplateContent.includes('Intermediate (Primary 4–6)'),
  'dashboard.mustache contains Intermediate (Primary 4–6) badge'
);
assert(
  dashboardTemplateContent.includes('Foundational (Primary 1–3)'),
  'dashboard.mustache contains Foundational (Primary 1–3) badge'
);
assert(
  dashboardTemplateContent.includes('class="simulation-embed-container'),
  'dashboard.mustache contains simulation-embed-container'
);
assert(
  dashboardTemplateContent.includes('class="lab-iframe-wrapper'),
  'dashboard.mustache contains lab-iframe-wrapper'
);
assert(
  dashboardTemplateContent.includes('class="lab-facade-cover"'),
  'dashboard.mustache contains Click-to-Load lab-facade-cover'
);
assert(
  dashboardTemplateContent.includes('id="btn-launch-sim"'),
  'dashboard.mustache contains simulation launch button'
);
assert(
  dashboardTemplateContent.includes('class="lab-fallback-card"'),
  'dashboard.mustache contains offline lab-fallback-card'
);
assert(
  dashboardTemplateContent.includes('phet.colorado.edu'),
  'dashboard.mustache embeds PhET interactive simulation'
);
assert(
  dashboardTemplateContent.includes('title="PhET Circuit Construction Kit: DC Interactive Simulation"'),
  'dashboard.mustache simulation iframe has accessible title'
);

// 8. Guardian Portal Ward Selector & Performance Cards Verification
console.log('\n📋 [8/9] Testing Guardian Portal Dynamic Ward Selector & Performance Cards:');

assert(studentData.student_g2 !== undefined, 'parent.js includes student_g2 dataset (Foundational)');
assert(studentData.student_g5 !== undefined, 'parent.js includes student_g5 dataset (Intermediate)');
assert(studentData.student_g7 !== undefined, 'parent.js includes student_g7 dataset (Junior Secondary)');
assert(studentData.student_g2.caScore === '36.0 / 40', 'student_g2 has continuous assessment 40% weighting');
assert(studentData.student_g2.examScore === '49.0 / 60', 'student_g2 has exam 60% weighting');
assert(studentData.student_g2.gateStatus.includes('Cleared'), 'student_g2 has 80% Mastery Gate cleared');

const parentDashboardTemplateContent = fs.readFileSync(
  path.resolve(__dirname, '..', 'templates/mustache/parent_dashboard.mustache'),
  'utf8'
);

assert(
  parentDashboardTemplateContent.includes('data-student-selector'),
  'parent_dashboard.mustache has data-student-selector attribute'
);
assert(
  parentDashboardTemplateContent.includes('aria-live="polite"'),
  'parent_dashboard.mustache overview card has aria-live="polite" for dynamic student switching'
);
assert(
  parentDashboardTemplateContent.includes('data-student-name'),
  'parent_dashboard.mustache has data-student-name attribute'
);
assert(
  parentDashboardTemplateContent.includes('data-student-tier'),
  'parent_dashboard.mustache has data-student-tier attribute'
);
assert(
  parentDashboardTemplateContent.includes('data-student-gate'),
  'parent_dashboard.mustache has data-student-gate attribute'
);
assert(
  parentDashboardTemplateContent.includes('data-student-ca'),
  'parent_dashboard.mustache has data-student-ca attribute'
);
assert(
  parentDashboardTemplateContent.includes('data-student-exam'),
  'parent_dashboard.mustache has data-student-exam attribute'
);
assert(
  parentDashboardTemplateContent.includes('data-transcript-link'),
  'parent_dashboard.mustache has data-transcript-link attribute'
);
assert(
  parentDashboardTemplateContent.includes('grade/report/user/index.php'),
  'parent_dashboard.mustache links to Moodle official grade transcript route'
);

// 9. Static Preview HTML Accessibility & Integration
console.log('\n📋 [9/9] Testing Static Preview HTML Accessibility & Integration:');

const htmlPages = [
  'index.html',
  'login.html',
  'signup.html',
  'parent-login.html',
  'parent-signup.html',
  'dashboard.html',
  'parent-dashboard.html'
];

htmlPages.forEach((htmlPath) => {
  const fullPath = path.resolve(__dirname, '..', htmlPath);
  assert(fs.existsSync(fullPath), `HTML page exists: ${htmlPath}`);

  const content = fs.readFileSync(fullPath, 'utf8');
  assert(content.includes('role="main"'), `${htmlPath} has main role="main"`);
  assert(content.includes('role="contentinfo"'), `${htmlPath} has footer role="contentinfo"`);
});

// Check Mobile Drawer and Landmarks in index.html
const indexHtmlContent = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
assert(indexHtmlContent.includes('id="mobile-menu-btn"'), 'index.html contains mobile hamburger button');
assert(indexHtmlContent.includes('id="mobile-menu-drawer"'), 'index.html contains accessible mobile navigation drawer');
assert(indexHtmlContent.includes('aria-expanded="false"'), 'index.html mobile button has initial aria-expanded="false"');

// Check Gamification & Simulation in dashboard.html
const dashboardHtmlContent = fs.readFileSync(path.resolve(__dirname, '..', 'dashboard.html'), 'utf8');
assert(
  dashboardHtmlContent.includes('aria-label="Student Gamification and Daily Progress"'),
  'dashboard.html contains gamification and daily progress region'
);
assert(
  dashboardHtmlContent.includes('class="simulation-embed-container'),
  'dashboard.html contains simulation-embed-container'
);
assert(
  dashboardHtmlContent.includes('class="lab-facade-cover"'),
  'dashboard.html contains Click-to-Load lab-facade-cover'
);
assert(
  dashboardHtmlContent.includes('phet.colorado.edu'),
  'dashboard.html contains PhET simulation iframe'
);

// Check Parent Dashboard HTML
const parentDashboardHtmlContent = fs.readFileSync(path.resolve(__dirname, '..', 'parent-dashboard.html'), 'utf8');
assert(
  parentDashboardHtmlContent.includes('data-student-selector'),
  'parent-dashboard.html contains student selector'
);
assert(
  parentDashboardHtmlContent.includes('aria-live="polite"'),
  'parent-dashboard.html contains aria-live polite region'
);
assert(
  parentDashboardHtmlContent.includes('data-student-name'),
  'parent-dashboard.html contains data-student-name'
);
assert(
  parentDashboardHtmlContent.includes('data-transcript-link'),
  'parent-dashboard.html contains data-transcript-link'
);

// Summary Report
console.log('\n========================================');
console.log(`📊 Test Summary: ${passedTests} passed, ${failedTests} failed.`);
console.log('========================================\n');

if (failedTests > 0) {
  console.error('❌ Quality Gate FAILED. Refactoring needed before git push.');
  process.exit(1);
} else {
  console.log('✨ All quality gate, accessibility, gamification, K-8 tiers, simulation embed, and guardian portal checks PASSED (0 errors).');
  process.exit(0);
}
