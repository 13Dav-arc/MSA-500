/**
 * MindStormer Global Academy (MSA-500)
 * Maynd Stormir Enterprise Corporate Theme Quality Gate & Test Suite
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

console.log('🧪 Running MSA-500 Enterprise Corporate Quality Gate & Accessibility Tests...\n');

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

// 4. SCSS Design Token & Corporate Embed Architecture Verification
console.log('\n📋 [4/9] Testing SCSS Design Token Files & Enterprise Simulation Embed Classes:');

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

// Check standalone compiled CSS files
const mainCssPath = path.resolve(__dirname, '..', 'assets/css/main.css');
assert(fs.existsSync(mainCssPath), 'assets/css/main.css exists');
const mainCssContent = fs.readFileSync(mainCssPath, 'utf8');
assert(mainCssContent.includes('--msa-cobalt'), 'assets/css/main.css defines corporate color tokens');
assert(mainCssContent.includes('.card-enterprise'), 'assets/css/main.css defines .card-enterprise');
assert(mainCssContent.includes('.btn-enterprise-primary'), 'assets/css/main.css defines .btn-enterprise-primary');

const moodleCssPath = path.resolve(__dirname, '..', 'theme/boost/style/moodle.css');
assert(fs.existsSync(moodleCssPath), 'theme/boost/style/moodle.css exists');

// Check dashboard.js de-gamification and interactive controls
const dashboardJsPath = path.resolve(__dirname, '..', 'assets/js/dashboard.js');
assert(fs.existsSync(dashboardJsPath), 'assets/js/dashboard.js exists');
const dashboardJsContent = fs.readFileSync(dashboardJsPath, 'utf8');
assert(!dashboardJsContent.includes('animateXPBars'), 'dashboard.js has removed legacy animateXPBars');
assert(!dashboardJsContent.includes('alert('), 'dashboard.js has removed blocking browser alert()');
assert(!dashboardJsContent.includes('🏆'), 'dashboard.js has removed trophy emoji');
assert(dashboardJsContent.includes('animateAssessmentProgress'), 'dashboard.js defines animateAssessmentProgress');
assert(dashboardJsContent.includes('initSimulationControls'), 'dashboard.js defines initSimulationControls');
assert(dashboardJsContent.includes('showEnterpriseToast'), 'dashboard.js defines showEnterpriseToast');

// 5. Template Static Accessibility & Lifecycle Hooks
console.log('\n📋 [5/9] Testing Mustache Template Accessibility & Lifecycle Hooks:');

const mustacheTemplates = [
  'templates/mustache/login.mustache',
  'templates/mustache/signup.mustache',
  'templates/mustache/dashboard.mustache',
  'templates/mustache/parent_login.mustache',
  'templates/mustache/parent_signup.mustache',
  'templates/mustache/parent_dashboard.mustache',
  'theme/boost/templates/login.mustache',
  'theme/boost/templates/signup.mustache',
  'theme/boost/templates/dashboard.mustache',
  'theme/boost/templates/parent_login.mustache',
  'theme/boost/templates/parent_signup.mustache',
  'theme/boost/templates/parent_dashboard.mustache'
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

  // Check Semantic Landmarks and WCAG Skip Links
  assert(content.includes('role="banner"'), `${templatePath} has header role="banner"`);
  assert(content.includes('role="main"'), `${templatePath} has main role="main"`);
  assert(content.includes('id="main-content"'), `${templatePath} has main id="main-content" landmark target`);
  assert(content.includes('href="#main-content"'), `${templatePath} contains WCAG 2.1 AA Skip to main content link`);
  assert(content.includes('role="contentinfo"'), `${templatePath} has footer role="contentinfo"`);
});

// Assert gamification_bar.mustache is completely removed from both template directories
assert(
  !fs.existsSync(path.resolve(__dirname, '..', 'theme/boost/templates/gamification_bar.mustache')),
  'theme/boost/templates/gamification_bar.mustache dead code is removed'
);
assert(
  !fs.existsSync(path.resolve(__dirname, '..', 'templates/mustache/gamification_bar.mustache')),
  'templates/mustache/gamification_bar.mustache dead code is removed'
);

// Check Report Card PDF Template Corporate Tokens & Domain
const reportCardPath = path.resolve(__dirname, '..', 'templates/report-card-template.html');
assert(fs.existsSync(reportCardPath), 'templates/report-card-template.html exists');
const reportCardContent = fs.readFileSync(reportCardPath, 'utf8');
assert(reportCardContent.includes('#0F172A'), 'report-card-template.html applies Executive Navy #0F172A');
assert(reportCardContent.includes('#1D4ED8'), 'report-card-template.html applies Cobalt Primary #1D4ED8');
assert(reportCardContent.includes('#047857'), 'report-card-template.html applies Emerald Accent #047857');
assert(reportCardContent.includes('msa.mayndstomir.com'), 'report-card-template.html standardizes canonical domain msa.mayndstomir.com');
assert(reportCardContent.includes('font-variant-numeric: tabular-nums'), 'report-card-template.html enforces tabular lining figures');

// Check Form Validation Password Toggle SVG Swapping
const formValJsContent = fs.readFileSync(path.resolve(__dirname, '..', 'assets/js/form-validation.js'), 'utf8');
assert(formValJsContent.includes('M13.875 18.825'), 'form-validation.js contains Eye-Slash dynamic SVG toggle');
assert(formValJsContent.includes('M2.458 12'), 'form-validation.js contains Eye dynamic SVG toggle');
assert(formValJsContent.includes('Password text visible'), 'form-validation.js announces live screen reader state');

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

// 6. Enterprise De-Gamification & Academic Status Strip Verification
console.log('\n📋 [6/9] Testing Enterprise De-Gamification & Executive Metric Strips:');

const dashboardTemplateContent = fs.readFileSync(
  path.resolve(__dirname, '..', 'templates/mustache/dashboard.mustache'),
  'utf8'
);

// Assert gamification bar partial is removed from active template
assert(
  !dashboardTemplateContent.includes('{{> theme_boost/gamification_bar }}'),
  'dashboard.mustache does NOT include legacy gamification_bar partial'
);
assert(
  !dashboardTemplateContent.includes('🔥') && !dashboardTemplateContent.includes('🏆') && !dashboardTemplateContent.includes('🚀'),
  'dashboard.mustache has completely stripped informal emojis (🔥, 🏆, 🚀)'
);

// Assert formal academic status indicators are present
assert(
  dashboardTemplateContent.includes('Active Term: 2026/2027'),
  'dashboard.mustache includes formal Active Term header chip'
);
assert(
  dashboardTemplateContent.includes('Curriculum Progress: 85%'),
  'dashboard.mustache includes Curriculum Progress header metric'
);
assert(
  dashboardTemplateContent.includes('Continuous Assessment (40%)'),
  'dashboard.mustache includes 40% Continuous Assessment metric card'
);
assert(
  dashboardTemplateContent.includes('Exam / Practical (60%)'),
  'dashboard.mustache includes 60% Exam Weighting metric card'
);
assert(
  dashboardTemplateContent.includes('Attendance Standing'),
  'dashboard.mustache includes Attendance Standing metric card'
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

// 8. Guardian Portal Dynamic Ward Selector & Performance Cards Verification
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

// 9. Static Preview HTML & Enterprise Design System Documentation Verification
console.log('\n📋 [9/9] Testing Static Preview HTML Accessibility & Enterprise Documentation:');

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
  assert(content.includes('id="main-content"'), `${htmlPath} has main id="main-content" landmark target`);
  assert(content.includes('href="#main-content"'), `${htmlPath} contains WCAG 2.1 AA Skip to main content link`);
  assert(content.includes('role="contentinfo"'), `${htmlPath} has footer role="contentinfo"`);
});

// Check Mobile Drawer and Landmarks in index.html
const indexHtmlContent = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
assert(indexHtmlContent.includes('id="mobile-menu-btn"'), 'index.html contains mobile hamburger button');
assert(indexHtmlContent.includes('id="mobile-menu-drawer"'), 'index.html contains accessible mobile navigation drawer');
assert(indexHtmlContent.includes('aria-expanded="false"'), 'index.html mobile button has initial aria-expanded="false"');

// Check Simulation & De-gamification in dashboard.html
const dashboardHtmlContent = fs.readFileSync(path.resolve(__dirname, '..', 'dashboard.html'), 'utf8');
assert(
  !dashboardHtmlContent.includes('🔥 7 Days Streak'),
  'dashboard.html has removed streak fire emoji'
);
assert(
  dashboardHtmlContent.includes('Active Term: 2026/2027'),
  'dashboard.html contains formal Active Term status chip'
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

// Check Enterprise Asset Showcase & Export Script
const previewAssetsPath = path.resolve(__dirname, '..', 'assets/img/preview-assets.html');
assert(fs.existsSync(previewAssetsPath), 'assets/img/preview-assets.html exists');
const previewAssetsContent = fs.readFileSync(previewAssetsPath, 'utf8');
assert(previewAssetsContent.includes('badge-foundational-tier'), 'preview-assets.html defines badge-foundational-tier');
assert(previewAssetsContent.includes('badge-intermediate-tier'), 'preview-assets.html defines badge-intermediate-tier');
assert(previewAssetsContent.includes('badge-junior-secondary'), 'preview-assets.html defines badge-junior-secondary');

const exportAssetsPath = path.resolve(__dirname, '..', 'export-assets.js');
assert(fs.existsSync(exportAssetsPath), 'export-assets.js exists');
const exportAssetsContent = fs.readFileSync(exportAssetsPath, 'utf8');
assert(exportAssetsContent.includes('badge-foundational-tier'), 'export-assets.js exports institutional foundational badge');

// Check Design System Documentation Exists
const docPath = path.resolve(__dirname, '..', 'docs/UI_UX_ENTERPRISE_DESIGN_SYSTEM.md');
assert(fs.existsSync(docPath), 'docs/UI_UX_ENTERPRISE_DESIGN_SYSTEM.md exists');
const docContent = fs.readFileSync(docPath, 'utf8');
assert(docContent.includes('Maynd Stormir Enterprise Corporate Theme'), 'Design system doc documents corporate theme');
assert(docContent.includes('CONTINUOUS ASSESSMENT (40%)'), 'Design system doc specifies 40% CA weighting');
assert(docContent.includes('TERM EXAMINATION (60%)'), 'Design system doc specifies 60% Exam weighting');
assert(docContent.includes('WCAG 2.1 AA Compliance'), 'Design system doc covers WCAG 2.1 AA accessibility contract');

// 10. Automated CI/CD Deployment Pipeline & Theme Sync Verification
console.log('\n📋 [10/10] Testing CI/CD Deployment Pipeline & Moodle Theme Sync:');

const deployYmlPath = path.resolve(__dirname, '..', '.github/workflows/deploy.yml');
assert(fs.existsSync(deployYmlPath), '.github/workflows/deploy.yml exists');
const deployYmlContent = fs.readFileSync(deployYmlPath, 'utf8');

assert(
  deployYmlContent.includes('git reset --hard origin/main'),
  'deploy.yml enforces clean git reset --hard on VPS'
);
assert(
  deployYmlContent.includes('git clean -fd -e moodledata -e moodle/config.php'),
  'deploy.yml preserves runtime session data with git clean exclusions'
);
assert(
  deployYmlContent.includes('sudo mkdir -p moodle/theme/boost/templates'),
  'deploy.yml verifies theme target directories exist with sudo'
);
assert(
  deployYmlContent.includes('sudo rsync -av --delete theme/boost/templates/ moodle/theme/boost/templates/'),
  'deploy.yml synchronizes templates with sudo and --delete pruning'
);
assert(
  !deployYmlContent.includes('theme/boost/layout'),
  'deploy.yml restricts sync to frontend and does NOT overwrite backend PHP layout'
);
assert(
  deployYmlContent.includes('sudo chown -R www-data:www-data moodle/theme/boost/'),
  'deploy.yml enforces atomic www-data ownership with sudo'
);
assert(
  deployYmlContent.includes('sudo -u www-data php moodle/admin/cli/purge_caches.php'),
  'deploy.yml executes purge_caches as www-data to prevent cache permission lockouts'
);

// Check .gitignore contains runtime exclusions
const gitignorePath = path.resolve(__dirname, '..', '.gitignore');
assert(fs.existsSync(gitignorePath), '.gitignore exists');
const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
assert(gitignoreContent.includes('moodledata/'), '.gitignore tracks moodledata/ exclusion');
assert(gitignoreContent.includes('moodle/config.php'), '.gitignore tracks moodle/config.php exclusion');

// Verify all 6 core templates exist in theme/boost/templates/
const coreTemplateNames = [
  'login.mustache',
  'signup.mustache',
  'parent_login.mustache',
  'parent_signup.mustache',
  'dashboard.mustache',
  'parent_dashboard.mustache'
];

coreTemplateNames.forEach((tpl) => {
  const boostTplPath = path.resolve(__dirname, '..', 'theme/boost/templates', tpl);
  const mustacheTplPath = path.resolve(__dirname, '..', 'templates/mustache', tpl);
  assert(fs.existsSync(boostTplPath), `theme/boost/templates/${tpl} exists`);
  assert(fs.existsSync(mustacheTplPath), `templates/mustache/${tpl} exists`);
});

// Summary Report
console.log('\n========================================');
console.log(`📊 Test Summary: ${passedTests} passed, ${failedTests} failed.`);
console.log('========================================\n');

if (failedTests > 0) {
  console.error('❌ Quality Gate FAILED. Refactoring needed before git push.');
  process.exit(1);
} else {
  console.log('✨ All enterprise quality gate, accessibility, de-gamification, K-8 tiers, simulation embed, guardian portal, and documentation checks PASSED (0 errors).');
  process.exit(0);
}
