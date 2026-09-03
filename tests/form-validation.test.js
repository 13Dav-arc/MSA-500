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
  validateRequired,
  initPasswordToggles,
  handlePasswordToggleClick
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

// 3b. Password Visibility Toggle Unit Tests
console.log('\n📋 [3b/9] Testing Password Visibility Toggle Engine:');

// Mock DOM elements for toggle test
const mockInput = { type: 'password', id: 'mock-pass' };
const mockEyeOpen = {
  classes: new Set(['pw-eye-open', 'w-5', 'h-5', 'block']),
  classList: {
    toggle(cls, state) {
      if (state) mockEyeOpen.classes.add(cls);
      else mockEyeOpen.classes.delete(cls);
    },
    contains(cls) { return mockEyeOpen.classes.has(cls); }
  }
};
const mockEyeSlash = {
  classes: new Set(['pw-eye-slash', 'w-5', 'h-5', 'hidden']),
  classList: {
    toggle(cls, state) {
      if (state) mockEyeSlash.classes.add(cls);
      else mockEyeSlash.classes.delete(cls);
    },
    contains(cls) { return mockEyeSlash.classes.has(cls); }
  }
};
const mockAttributes = {
  'data-pw-toggle': 'mock-pass',
  'aria-pressed': 'false',
  'aria-label': 'Show password'
};
const mockButton = {
  getAttribute(attr) { return mockAttributes[attr]; },
  setAttribute(attr, val) { mockAttributes[attr] = String(val); },
  querySelector(sel) {
    if (sel.includes('pw-eye-open')) return mockEyeOpen;
    if (sel.includes('pw-eye-slash')) return mockEyeSlash;
    return null;
  },
  closest() {
    return {
      querySelector() { return mockInput; }
    };
  }
};

// Test first click (reveal password)
handlePasswordToggleClick(mockButton);
assert(mockInput.type === 'text', 'Password toggle switches input type from password to text');
assert(mockAttributes['aria-pressed'] === 'true', 'Password toggle updates aria-pressed to true');
assert(mockAttributes['aria-label'] === 'Hide password', 'Password toggle updates aria-label to Hide password');
assert(mockEyeOpen.classList.contains('hidden'), 'Open eye icon is hidden when password is text');
assert(mockEyeSlash.classList.contains('block'), 'Slash eye icon is visible when password is text');

// Test second click (conceal password)
handlePasswordToggleClick(mockButton);
assert(mockInput.type === 'password', 'Password toggle switches input type back to password');
assert(mockAttributes['aria-pressed'] === 'false', 'Password toggle resets aria-pressed to false');
assert(mockAttributes['aria-label'] === 'Show password', 'Password toggle resets aria-label to Show password');
assert(mockEyeOpen.classList.contains('block'), 'Open eye icon is visible when password is hidden');
assert(mockEyeSlash.classList.contains('hidden'), 'Slash eye icon is hidden when password is hidden');

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

  // Check Moodle standard lifecycle hooks
  assert(
    content.includes('{{{ output.standard_head_html }}}'),
    `${templatePath} includes output.standard_head_html`
  );
  assert(
    content.includes('{{{ output.standard_top_of_body_html }}}'),
    `${templatePath} includes output.standard_top_of_body_html`
  );
  if (templatePath.includes('dashboard')) {
    assert(
      content.includes('{{{ output.standard_end_of_body_html }}}'),
      `${templatePath} includes output.standard_end_of_body_html`
    );
  }

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

// Check Form Validation Password Toggle Engine
const formValJsContent = fs.readFileSync(path.resolve(__dirname, '..', 'assets/js/form-validation.js'), 'utf8');
assert(formValJsContent.includes('.pw-eye-slash'), 'form-validation.js targets .pw-eye-slash dynamic SVG toggle');
assert(formValJsContent.includes('.pw-eye-open'), 'form-validation.js targets .pw-eye-open dynamic SVG toggle');
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
  assert(content.includes('data-pw-toggle'), `${templatePath} contains accessible password toggle button`);
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
  !deployYmlContent.includes('rsync -av --delete theme/boost/layout/'),
  'deploy.yml does NOT blanket-overwrite or wipe backend layout directory'
);
assert(
  deployYmlContent.includes('sudo cp theme/boost/layout/login.php moodle/theme/boost/layout/login.php'),
  'deploy.yml safely syncs login.php layout file directly'
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

// Verify theme/boost/layout/login.php enterprise router
const layoutLoginPath = path.resolve(__dirname, '..', 'theme/boost/layout/login.php');
assert(fs.existsSync(layoutLoginPath), 'theme/boost/layout/login.php exists');
const layoutLoginContent = fs.readFileSync(layoutLoginPath, 'utf8');
assert(layoutLoginContent.includes('optional_param(\'role\', \'\', PARAM_ALPHA) === \'parent\''), 'login.php extracts role=parent safely');
assert(layoutLoginContent.includes('$PAGE->pagetype === \'login-signup\''), 'login.php checks $PAGE->pagetype for signup');
assert(layoutLoginContent.includes('signup.php'), 'login.php checks SCRIPT_NAME for signup');
assert(layoutLoginContent.includes('$SESSION->loginerrormsg'), 'login.php captures $SESSION->loginerrormsg flash error');
assert(layoutLoginContent.includes('theme_boost/parent_signup'), 'login.php routes to theme_boost/parent_signup');
assert(layoutLoginContent.includes('theme_boost/signup'), 'login.php routes to theme_boost/signup');
assert(layoutLoginContent.includes('render_from_template'), 'login.php renders custom standalone Mustache templates');
assert(layoutLoginContent.includes('<?php echo $OUTPUT->main_content(); ?>'), 'login.php contains the literal <?php echo $OUTPUT->main_content(); ?> tag required by Moodle static analysis');
assert(layoutLoginContent.includes('display: none !important;') && layoutLoginContent.includes('aria-hidden="true"'), 'login.php encapsulates main_content in a hidden container to prevent visual form leakage');
assert(layoutLoginContent.includes('echo $OUTPUT->standard_end_of_body_html()'), 'login.php echoes standard_end_of_body_html directly in layout stream to cleanly resolve tokens');
assert(layoutLoginContent.includes('\\core\\session\\manager::get_login_token()'), 'login.php passes CSRF logintoken via session manager');

// Verify all 6 core templates exist in theme/boost/templates/ and have 100% content parity
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
  
  const boostContent = fs.readFileSync(boostTplPath, 'utf8');
  const mustacheContent = fs.readFileSync(mustacheTplPath, 'utf8');
  assert(boostContent === mustacheContent, `templates/mustache/${tpl} and theme/boost/templates/${tpl} have 100% bilateral parity`);
});

// 11. Mobile Responsiveness, Autofill Standards, Routing & Zero-Emoji Landing Page Verification
console.log('\n📋 [11/11] Testing Mobile Responsiveness, Native Autofill & Index De-Gamification:');

// Assert index.html is completely de-gamified (no emojis)
const indexContent = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
const emojisToCheck = ['⚡', '🚀', '🧪', '🔋', '💡', '🔬', '📊', '🎮', '🔥', '🏆', '🎓'];
emojisToCheck.forEach(emoji => {
  assert(!indexContent.includes(emoji), `index.html contains zero informal emojis (${emoji})`);
});
assert(indexContent.includes('min-h-[100dvh]'), 'index.html enforces min-h-[100dvh] anti-collapse container');
assert(indexContent.includes('overflow-x-hidden'), 'index.html enforces overflow-x-hidden');
assert(indexContent.includes("Master Nigeria's Core Curriculum with") && indexContent.includes('Structured Academic Rigor'), 'index.html features enterprise NERDC pedagogy copy');
assert(indexContent.includes('Primary 1 – JSS 3 (NERDC Aligned)'), 'index.html announcement bar specifies Primary 1 - JSS 3 NERDC alignment');
assert(indexContent.includes('#framework') && indexContent.includes('NERDC Framework'), 'index.html navigates to NERDC Framework');
assert(indexContent.includes('Foundational Tier (Primary 1–3)'), 'index.html defines Foundational Tier (Primary 1-3)');
assert(indexContent.includes('Upper Primary Tier (Primary 4–6)'), 'index.html defines Upper Primary Tier (Primary 4-6)');
assert(indexContent.includes('Junior Secondary (JSS 1–3)'), 'index.html defines Junior Secondary (JSS 1-3)');
assert(indexContent.includes('National Common Entrance Preparation') && indexContent.includes('Comprehensive BECE Exam Alignment'), 'index.html prepares for Common Entrance and BECE');
assert(!indexContent.includes('href="https://msa.mayndstomir.com/moodle/login/signup.php"'), 'index.html does not route CTAs to signup.php, avoiding session conflicts');
assert(indexContent.includes('min-h-[44px]') || indexContent.includes('min-h-[48px]'), 'index.html enforces dynamic touch targets');
assert(indexContent.includes('whitespace-nowrap'), 'index.html enforces whitespace-nowrap on CTA buttons and brand logo');
assert(indexContent.includes('max-w-7xl mx-auto px-4 sm:px-6'), 'index.html has edge-padded announcement bar');

// Progressive UI Enhancements & Responsive Ergonomics in index.html
assert(indexContent.includes('animate-marquee') && indexContent.includes('marquee-container'), 'index.html implements horizontal announcement crawler/marquee track');
assert(indexContent.includes('@keyframes marquee') && indexContent.includes('prefers-reduced-motion'), 'index.html defines marquee animation keyframes with reduced-motion safety');
assert(indexContent.includes('id="scroll-progress-bar"'), 'index.html mounts scroll progress indicator bar to sticky nav');
assert(indexContent.includes('id="metrics-strip"') && indexContent.includes('metric-counter') && indexContent.includes('data-target="40"'), 'index.html defines executive academic metrics count-up targets');
assert(indexContent.includes('role="tablist"') && indexContent.includes('phase-stepper-btn') && indexContent.includes('data-phase="1"'), 'index.html implements interactive term architecture timeline stepper');
assert(indexContent.includes('bar-segment-ca') && indexContent.includes('bar-segment-exam'), 'index.html implements reactive assessment distribution progress bars');
assert(indexContent.includes('id="curriculum-track"') && indexContent.includes('snap-x snap-mandatory'), 'index.html implements mobile touch-snap carousel for curriculum tracks');
assert(indexContent.includes('id="curriculum-indicators"') && indexContent.includes('data-indicator-index'), 'index.html implements mobile pagination indicators for curriculum carousel');
assert(indexContent.includes('id="back-to-top"') && indexContent.includes('aria-label="Scroll back to top"'), 'index.html implements floating back-to-top action button');
assert(indexContent.includes('no-scrollbar'), 'index.html includes no-scrollbar utility to prevent mobile scrollbar clunkiness');

// Assert student login template contains wantsurl, logintoken, sesskey, and autocomplete
const studentLoginContent = fs.readFileSync(path.resolve(__dirname, '..', 'templates/mustache/login.mustache'), 'utf8');
assert(studentLoginContent.includes('name="logintoken"'), 'login.mustache includes hidden logintoken CSRF field');
assert(studentLoginContent.includes('name="sesskey"'), 'login.mustache includes hidden sesskey CSRF field');
assert(studentLoginContent.includes('name="wantsurl"') && studentLoginContent.includes('/my/'), 'login.mustache sets postback wantsurl to /my/');
assert(studentLoginContent.includes('autocomplete="username"'), 'login.mustache has autocomplete="username"');
assert(studentLoginContent.includes('autocomplete="current-password"'), 'login.mustache has autocomplete="current-password"');
assert(studentLoginContent.includes('min-h-[100dvh]'), 'login.mustache enforces min-h-[100dvh]');
assert(studentLoginContent.includes('min-h-[44px]'), 'login.mustache enforces dynamic min-h-[44px] button scaling');
assert(studentLoginContent.includes('{{{ config.wwwroot }}}/theme/boost/javascript/form-validation.js" defer'), 'login.mustache uses deferred canonical theme script path');
assert(studentLoginContent.includes('data-pw-toggle="password"'), 'login.mustache uses clean data-pw-toggle attribute');
assert(studentLoginContent.includes('pw-eye-open') && studentLoginContent.includes('pw-eye-slash'), 'login.mustache embeds dual pw-eye SVG icons');
assert(studentLoginContent.includes('top-1/2 -translate-y-1/2'), 'login.mustache centers password toggle button');
assert(studentLoginContent.includes('mt-auto'), 'login.mustache enforces sticky bottom footer with mt-auto');
assert(studentLoginContent.includes('{{{ config.wwwroot }}}/index.html'), 'login.mustache links brand logo to index.html');
assert(studentLoginContent.includes('.d-password-unmask'), 'login.mustache suppresses Moodle core auto-injected password buttons');
assert(studentLoginContent.includes('button[data-pw-toggle]') && studentLoginContent.includes('width: 20px !important;'), 'login.mustache enforces explicit custom toggle button and SVG dimensions');
assert(studentLoginContent.includes('#topofscroll') && studentLoginContent.includes('display: none !important;'), 'login.mustache resets topofscroll to eliminate top whitespace gap');
assert(studentLoginContent.includes('whitespace-nowrap'), 'login.mustache enforces whitespace-nowrap on brand logo');

// Assert parent login template contains wantsurl, logintoken, sesskey, and autocomplete
const parentLoginContent = fs.readFileSync(path.resolve(__dirname, '..', 'templates/mustache/parent_login.mustache'), 'utf8');
assert(parentLoginContent.includes('name="logintoken"'), 'parent_login.mustache includes hidden logintoken CSRF field');
assert(parentLoginContent.includes('name="sesskey"'), 'parent_login.mustache includes hidden sesskey CSRF field');
assert(parentLoginContent.includes('name="wantsurl"') && parentLoginContent.includes('/grade/report/user/index.php'), 'parent_login.mustache sets postback wantsurl to /grade/report/user/index.php');
assert(parentLoginContent.includes('autocomplete="username email"'), 'parent_login.mustache has autocomplete="username email"');
assert(parentLoginContent.includes('autocomplete="current-password"'), 'parent_login.mustache has autocomplete="current-password"');
assert(parentLoginContent.includes('min-h-[100dvh]'), 'parent_login.mustache enforces min-h-[100dvh]');
assert(parentLoginContent.includes('min-h-[44px]'), 'parent_login.mustache enforces dynamic min-h-[44px] button scaling');
assert(parentLoginContent.includes('{{{ config.wwwroot }}}/theme/boost/javascript/form-validation.js" defer'), 'parent_login.mustache uses deferred canonical theme script path');
assert(parentLoginContent.includes('data-pw-toggle="password"'), 'parent_login.mustache uses clean data-pw-toggle attribute');
assert(parentLoginContent.includes('pw-eye-open') && parentLoginContent.includes('pw-eye-slash'), 'parent_login.mustache embeds dual pw-eye SVG icons');
assert(parentLoginContent.includes('top-1/2 -translate-y-1/2'), 'parent_login.mustache centers password toggle button');
assert(parentLoginContent.includes('mt-auto'), 'parent_login.mustache enforces sticky bottom footer with mt-auto');
assert(parentLoginContent.includes('{{{ config.wwwroot }}}/index.html'), 'parent_login.mustache links brand logo to index.html');
assert(parentLoginContent.includes('.d-password-unmask'), 'parent_login.mustache suppresses Moodle core auto-injected password buttons');
assert(parentLoginContent.includes('button[data-pw-toggle]') && parentLoginContent.includes('width: 20px !important;'), 'parent_login.mustache enforces explicit custom toggle button and SVG dimensions');
assert(parentLoginContent.includes('input[type="password"]::-ms-reveal'), 'parent_login.mustache disables native browser password reveal');
assert(parentLoginContent.includes('pr-12'), 'parent_login.mustache applies pr-12 padding for enclosed toggle');
assert(parentLoginContent.includes('#topofscroll') && parentLoginContent.includes('display: none !important;'), 'parent_login.mustache resets topofscroll to eliminate top whitespace gap');
assert(parentLoginContent.includes('whitespace-nowrap'), 'parent_login.mustache enforces whitespace-nowrap on brand logo');

// Assert student signup template contains explicit autocomplete tokens
const studentSignupContent = fs.readFileSync(path.resolve(__dirname, '..', 'templates/mustache/signup.mustache'), 'utf8');
assert(studentSignupContent.includes('autocomplete="username"'), 'signup.mustache has autocomplete="username"');
assert(studentSignupContent.includes('autocomplete="email"'), 'signup.mustache has autocomplete="email"');
assert(studentSignupContent.includes('autocomplete="new-password"'), 'signup.mustache has autocomplete="new-password"');
assert(studentSignupContent.includes('autocomplete="given-name"'), 'signup.mustache has autocomplete="given-name"');
assert(studentSignupContent.includes('autocomplete="family-name"'), 'signup.mustache has autocomplete="family-name"');
assert(studentSignupContent.includes('autocomplete="address-level2"'), 'signup.mustache has autocomplete="address-level2"');
assert(studentSignupContent.includes('autocomplete="country"'), 'signup.mustache has autocomplete="country"');
assert(studentSignupContent.includes('min-h-[100dvh]'), 'signup.mustache enforces min-h-[100dvh]');
assert(studentSignupContent.includes('min-h-[44px]'), 'signup.mustache enforces dynamic min-h-[44px] button scaling');
assert(studentSignupContent.includes('{{{ config.wwwroot }}}/theme/boost/javascript/form-validation.js" defer'), 'signup.mustache uses deferred canonical theme script path');
assert(studentSignupContent.includes('data-pw-toggle="student_password"'), 'signup.mustache uses clean data-pw-toggle attribute');
assert(studentSignupContent.includes('pw-eye-open') && studentSignupContent.includes('pw-eye-slash'), 'signup.mustache embeds dual pw-eye SVG icons');
assert(studentSignupContent.includes('top-1/2 -translate-y-1/2'), 'signup.mustache centers password toggle button');
assert(studentSignupContent.includes('mt-auto'), 'signup.mustache enforces sticky bottom footer with mt-auto');
assert(studentSignupContent.includes('{{{ config.wwwroot }}}/index.html'), 'signup.mustache links brand logo to index.html');
assert(studentSignupContent.includes('.d-password-unmask'), 'signup.mustache suppresses Moodle core auto-injected password buttons');
assert(studentSignupContent.includes('button[data-pw-toggle]') && studentSignupContent.includes('width: 20px !important;'), 'signup.mustache enforces explicit custom toggle button and SVG dimensions');
assert(studentSignupContent.includes('input[type="password"]::-ms-reveal'), 'signup.mustache disables native browser password reveal');
assert(studentSignupContent.includes('pr-12'), 'signup.mustache applies pr-12 padding for enclosed toggle');
assert(studentSignupContent.includes('#topofscroll') && studentSignupContent.includes('display: none !important;'), 'signup.mustache resets topofscroll to eliminate top whitespace gap');
assert(studentSignupContent.includes('whitespace-nowrap'), 'signup.mustache enforces whitespace-nowrap on brand logo');

// Assert parent signup template contains explicit autocomplete tokens
const parentSignupContent = fs.readFileSync(path.resolve(__dirname, '..', 'templates/mustache/parent_signup.mustache'), 'utf8');
assert(parentSignupContent.includes('autocomplete="name"'), 'parent_signup.mustache has autocomplete="name"');
assert(parentSignupContent.includes('autocomplete="email"'), 'parent_signup.mustache has autocomplete="email"');
assert(parentSignupContent.includes('autocomplete="new-password"'), 'parent_signup.mustache has autocomplete="new-password"');
assert(parentSignupContent.includes('autocomplete="address-level2"'), 'parent_signup.mustache has autocomplete="address-level2"');
assert(parentSignupContent.includes('autocomplete="country"'), 'parent_signup.mustache has autocomplete="country"');
assert(parentSignupContent.includes('min-h-[100dvh]'), 'parent_signup.mustache enforces min-h-[100dvh]');
assert(parentSignupContent.includes('min-h-[44px]'), 'parent_signup.mustache enforces dynamic min-h-[44px] button scaling');
assert(parentSignupContent.includes('{{{ config.wwwroot }}}/theme/boost/javascript/form-validation.js" defer'), 'parent_signup.mustache uses deferred canonical theme script path');
assert(parentSignupContent.includes('data-pw-toggle="guardian_password"'), 'parent_signup.mustache uses clean data-pw-toggle attribute');
assert(parentSignupContent.includes('pw-eye-open') && parentSignupContent.includes('pw-eye-slash'), 'parent_signup.mustache embeds dual pw-eye SVG icons');
assert(parentSignupContent.includes('top-1/2 -translate-y-1/2'), 'parent_signup.mustache centers password toggle button');
assert(parentSignupContent.includes('mt-auto'), 'parent_signup.mustache enforces sticky bottom footer with mt-auto');
assert(parentSignupContent.includes('{{{ config.wwwroot }}}/index.html'), 'parent_signup.mustache links brand logo to index.html');
assert(parentSignupContent.includes('.d-password-unmask'), 'parent_signup.mustache suppresses Moodle core auto-injected password buttons');
assert(parentSignupContent.includes('button[data-pw-toggle]') && parentSignupContent.includes('width: 20px !important;'), 'parent_signup.mustache enforces explicit custom toggle button and SVG dimensions');
assert(parentSignupContent.includes('input[type="password"]::-ms-reveal'), 'parent_signup.mustache disables native browser password reveal');
assert(parentSignupContent.includes('pr-12'), 'parent_signup.mustache applies pr-12 padding for enclosed toggle');
assert(parentSignupContent.includes('#topofscroll') && parentSignupContent.includes('display: none !important;'), 'parent_signup.mustache resets topofscroll to eliminate top whitespace gap');
assert(parentSignupContent.includes('whitespace-nowrap'), 'parent_signup.mustache enforces whitespace-nowrap on brand logo');

// Assert parent dashboard template script and logo
const parentDashboardContent = fs.readFileSync(path.resolve(__dirname, '..', 'templates/mustache/parent_dashboard.mustache'), 'utf8');
assert(parentDashboardContent.includes('{{{ config.wwwroot }}}/assets/js/parent.js'), 'parent_dashboard.mustache uses absolute wwwroot script path');
assert(parentDashboardContent.includes('mt-auto'), 'parent_dashboard.mustache enforces sticky bottom footer with mt-auto');
assert(parentDashboardContent.includes('{{{ config.wwwroot }}}/index.html'), 'parent_dashboard.mustache links brand logo to index.html');
assert(parentDashboardContent.includes('whitespace-nowrap'), 'parent_dashboard.mustache enforces whitespace-nowrap on brand logo');

// Assert student dashboard template footer and logo
assert(dashboardTemplateContent.includes('mt-auto'), 'dashboard.mustache enforces sticky bottom footer with mt-auto');
assert(dashboardTemplateContent.includes('{{{ config.wwwroot }}}/index.html'), 'dashboard.mustache links brand logo to index.html');
assert(dashboardTemplateContent.includes('whitespace-nowrap'), 'dashboard.mustache enforces whitespace-nowrap on brand logo');

// Assert report card visual preview exists and implements print contracts and schema
const reportCardPreviewPath = path.resolve(__dirname, '..', 'previews/report-card-preview.html');
assert(fs.existsSync(reportCardPreviewPath), 'previews/report-card-preview.html exists');
const reportCardPreviewContent = fs.readFileSync(reportCardPreviewPath, 'utf8');
assert(reportCardPreviewContent.includes('@page'), 'report-card-preview.html includes @page print rules');
assert(reportCardPreviewContent.includes('size: A4 portrait'), 'report-card-preview.html targets A4 portrait size');
assert(reportCardPreviewContent.includes('data-dynamic="student_fullname"'), 'report-card-preview.html binds student_fullname');
assert(reportCardPreviewContent.includes('data-dynamic="overall_weighted_avg"'), 'report-card-preview.html binds overall_weighted_avg');
assert(reportCardPreviewContent.includes('data-dynamic="verification_hash"'), 'report-card-preview.html binds verification_hash');
assert(reportCardPreviewContent.includes('Basic Science & Technology (BST)'), 'report-card-preview.html renders BST cluster');
assert(reportCardPreviewContent.includes('Religion & National Values (RNV)'), 'report-card-preview.html renders RNV cluster');
assert(reportCardPreviewContent.includes('Pre-Vocational Studies (PVS)'), 'report-card-preview.html renders PVS cluster');
assert(reportCardPreviewContent.includes('Core Standalone Disciplines'), 'report-card-preview.html renders Core Standalone cluster');
assert(reportCardPreviewContent.includes('Morning Punctuality (7:30 AM – 8:30 AM)'), 'report-card-preview.html includes Morning Punctuality label');
assert(reportCardPreviewContent.includes('Daily Study Completion Rate'), 'report-card-preview.html includes Daily Study Completion Rate');
assert(reportCardPreviewContent.includes('STUDENT DETAILS') && !reportCardPreviewContent.includes('STUDENT PROFILE DOSSIER'), 'report-card-preview.html uses STUDENT DETAILS without dossier jargon');
assert(reportCardPreviewContent.includes('Grade Level:') && !reportCardPreviewContent.includes('Cohort / Arm'), 'report-card-preview.html classifies by Grade Level without classroom Arm or Cohort');
assert(reportCardPreviewContent.includes('This official transcript is certified and issued directly by MindStormer Global Academy. Scores reflect cumulative Continuous Assessment (40%) and Terminal Examination (60%) records.'), 'report-card-preview.html includes exact approved Digital Seal text');
assert(reportCardPreviewContent.includes('-webkit-print-color-adjust: exact !important') && reportCardPreviewContent.includes('print-color-adjust: exact !important'), 'report-card-preview.html enforces print color adjustment rules');
assert(!reportCardPreviewContent.includes('Dr. Folashade Adeyemi') && !reportCardPreviewContent.includes('Prof. Olatunji Balogun'), 'report-card-preview.html removes human tutor/principal signatures');
assert(!reportCardPreviewContent.includes('SHA256: 8F4B-92E1-7A0C-39D5'), 'report-card-preview.html removes raw SHA-256 hash clutter');
assert(reportCardPreviewContent.includes('Online Continuous Assessment & Academic Performance Record'), 'report-card-preview.html includes sanitized header subtitle');
assert(reportCardPreviewContent.includes('Demonstrates excellent grasp of core scientific concepts.'), 'report-card-preview.html includes sanitized Basic Science remark');
assert(reportCardPreviewContent.includes('Excellent practical and theoretical computer skills.'), 'report-card-preview.html includes sanitized Computer Studies remark');
assert(reportCardPreviewContent.includes('Strong understanding of crop cultivation and soil management.'), 'report-card-preview.html includes sanitized Agricultural Science remark');
assert(reportCardPreviewContent.includes('Term Status:') && !reportCardPreviewContent.includes('Evaluation Engine:'), 'report-card-preview.html uses Term Status without evaluation engine jargon');
assert(reportCardPreviewContent.includes('margin: 5mm 7mm;'), 'report-card-preview.html enforces 5mm 7mm print margin for single-page fit');
assert(!reportCardPreviewContent.includes('overflow: hidden !important'), 'report-card-preview.html removes overflow:hidden hard clipping');
assert(reportCardPreviewContent.includes('Good vocabulary retention and active interactive practice.'), 'report-card-preview.html includes sanitized French remark without orphaned semicolon');
assert(reportCardPreviewContent.includes('Tamper-evident electronic record • No physical signature required'), 'report-card-preview.html includes sanitized footer punctuation');
assert(reportCardPreviewContent.includes('viewBox="0 0 33 33"'), 'report-card-preview.html embeds clean geometric SVG QR code');

// Assert root report-card-preview.html exists and has parity with previews/report-card-preview.html
const rootReportCardPreviewPath = path.resolve(__dirname, '..', 'report-card-preview.html');
assert(fs.existsSync(rootReportCardPreviewPath), 'root report-card-preview.html exists');
const rootReportCardPreviewContent = fs.readFileSync(rootReportCardPreviewPath, 'utf8');
assert(rootReportCardPreviewContent === reportCardPreviewContent, 'root report-card-preview.html has 100% parity with previews/report-card-preview.html');

// =========================================================================
// Assert midterm-preview.html (Mid-Term Progress Report)
// =========================================================================
const midtermPreviewPath = path.resolve(__dirname, '..', 'previews/midterm-preview.html');
assert(fs.existsSync(midtermPreviewPath), 'previews/midterm-preview.html exists');
const midtermPreviewContent = fs.readFileSync(midtermPreviewPath, 'utf8');
assert(midtermPreviewContent.includes('margin: 4mm 6mm;'), 'midterm-preview.html enforces 4mm 6mm print margin');
assert(midtermPreviewContent.includes('font-size: 9.5pt;') && midtermPreviewContent.includes('line-height: 1.15;'), 'midterm-preview.html enforces 9.5pt print typography');
assert(!midtermPreviewContent.includes('overflow: hidden !important'), 'midterm-preview.html removes overflow:hidden clipping');
assert(midtermPreviewContent.includes('ONLINE CONTINUOUS ASSESSMENT & MID-TERM PROGRESS REPORT'), 'midterm-preview.html includes mid-term subtitle');
assert(midtermPreviewContent.includes('OFFICIAL MID-TERM PROGRESS TRANSCRIPT'), 'midterm-preview.html includes mid-term document label');
assert(midtermPreviewContent.includes('Term 1 (Mid-Term Snapshot - Week 6)'), 'midterm-preview.html binds Week 6 snapshot');
assert(midtermPreviewContent.includes('CA 1 (20)'), 'midterm-preview.html includes CA 1 column');
assert(midtermPreviewContent.includes('CA 2 (20)'), 'midterm-preview.html includes CA 2 column');
assert(midtermPreviewContent.includes('TOTAL CA (40)'), 'midterm-preview.html includes Total CA column');
assert(midtermPreviewContent.includes('WEIGHTED (%)'), 'midterm-preview.html includes Weighted percentage column');
assert(midtermPreviewContent.includes('PACING STATUS & REMARK'), 'midterm-preview.html includes Pacing status column');
assert(midtermPreviewContent.includes('On Track'), 'midterm-preview.html renders On Track pacing tag');
assert(midtermPreviewContent.includes('Automated Formative Assessment Summary'), 'midterm-preview.html renders formative assessment summary');
assert(midtermPreviewContent.includes('Continuous Assessment Only:') && midtermPreviewContent.includes('CA 1 (20%) + CA 2 (20%)'), 'midterm-preview.html renders formative pacing key');
assert(midtermPreviewContent.includes('This official mid-term progress transcript is certified and issued directly by MindStormer Global Academy. Scores reflect cumulative Continuous Assessment milestones (Week 1–6).'), 'midterm-preview.html includes certified mid-term seal text');
assert(midtermPreviewContent.includes('viewBox="0 0 33 33"'), 'midterm-preview.html embeds clean geometric SVG QR code');

assert(midtermPreviewContent.includes('Morning Punctuality (7:30 AM - 8:30 AM):'), 'midterm-preview.html includes formatted Morning Punctuality label');
assert(midtermPreviewContent.includes('On Track (≥70%)'), 'midterm-preview.html includes On Track (≥70%) glyph');
assert(midtermPreviewContent.includes('Tamper-evident electronic record • No physical signature required.'), 'midterm-preview.html includes sanitized footer punctuation');
assert(midtermPreviewContent.includes('MINDSTORMER GLOBAL ACADEMY • 100% AUTOMATED ONLINE LEARNING PLATFORM'), 'midterm-preview.html includes MINDSTORMER watermark');
assert(midtermPreviewContent.includes('OFFICIAL DIGITAL RECORD'), 'midterm-preview.html includes OFFICIAL DIGITAL RECORD watermark');
assert(midtermPreviewContent.includes('Agricultural Science') && midtermPreviewContent.includes('Home Economics'), 'midterm-preview.html renders separate rows for Agricultural Science and Home Economics');

assert(midtermPreviewContent.includes('colspan="6" class="py-0.5 px-2 w-full whitespace-nowrap">Cluster 1: Basic Science & Technology (BST)</td>'), 'midterm-preview.html renders Cluster 1 with colspan=6 and whitespace-nowrap');
assert(midtermPreviewContent.includes('colspan="6" class="py-0.5 px-2 w-full whitespace-nowrap">Cluster 2: Religion & National Values (RNV)</td>'), 'midterm-preview.html renders Cluster 2 with colspan=6 and whitespace-nowrap');
assert(midtermPreviewContent.includes('colspan="6" class="py-0.5 px-2 w-full whitespace-nowrap">Cluster 3: Pre-Vocational Studies (PVS)</td>'), 'midterm-preview.html renders Cluster 3 with colspan=6 and whitespace-nowrap');
assert(midtermPreviewContent.includes('colspan="6" class="py-0.5 px-2 w-full whitespace-nowrap">Cluster 4: Core Standalone Disciplines</td>'), 'midterm-preview.html renders Cluster 4 with colspan=6 and whitespace-nowrap');

// Assert root midterm-preview.html mirror parity
const rootMidtermPreviewPath = path.resolve(__dirname, '..', 'midterm-preview.html');
assert(fs.existsSync(rootMidtermPreviewPath), 'root midterm-preview.html exists');
const rootMidtermPreviewContent = fs.readFileSync(rootMidtermPreviewPath, 'utf8');
assert(rootMidtermPreviewContent === midtermPreviewContent, 'root midterm-preview.html has 100% parity with previews/midterm-preview.html');

// =========================================================================
// Assert annual-preview.html (End-of-Session Cumulative Report)
// =========================================================================
const annualPreviewPath = path.resolve(__dirname, '..', 'previews/annual-preview.html');
assert(fs.existsSync(annualPreviewPath), 'previews/annual-preview.html exists');
const annualPreviewContent = fs.readFileSync(annualPreviewPath, 'utf8');
assert(annualPreviewContent.includes('margin: 4mm 6mm;'), 'annual-preview.html enforces 4mm 6mm print margin');
assert(annualPreviewContent.includes('font-size: 9.5pt;') && annualPreviewContent.includes('line-height: 1.15;'), 'annual-preview.html enforces 9.5pt print typography');
assert(!annualPreviewContent.includes('overflow: hidden !important'), 'annual-preview.html removes overflow:hidden clipping');
assert(annualPreviewContent.includes('ANNUAL CUMULATIVE TRANSCRIPT & ADVANCEMENT RECORD'), 'annual-preview.html includes annual subtitle');
assert(annualPreviewContent.includes('OFFICIAL ANNUAL CUMULATIVE TRANSCRIPT'), 'annual-preview.html includes annual document label');
assert(annualPreviewContent.includes('Cumulative Annual Record (Terms 1 – 3)'), 'annual-preview.html binds tri-term snapshot');
assert(annualPreviewContent.includes('TERM 1 (100)'), 'annual-preview.html includes Term 1 column');
assert(annualPreviewContent.includes('TERM 2 (100)'), 'annual-preview.html includes Term 2 column');
assert(annualPreviewContent.includes('TERM 3 (100)'), 'annual-preview.html includes Term 3 column');
assert(annualPreviewContent.includes('CUMULATIVE AVG'), 'annual-preview.html includes Cumulative Average column');
assert(annualPreviewContent.includes('FINAL GRADE'), 'annual-preview.html includes Final Grade column');
assert(annualPreviewContent.includes('ANNUAL ACADEMIC REMARK'), 'annual-preview.html includes Annual Remark column');
assert(annualPreviewContent.includes('PROMOTED TO JUNIOR SECONDARY 2 (JSS 2)'), 'annual-preview.html includes promotion banner');
assert(annualPreviewContent.includes('Automated Annual Session Consolidation'), 'annual-preview.html renders annual session consolidation');
assert(annualPreviewContent.includes('Annual Average =') && annualPreviewContent.includes('(Term 1 + Term 2 + Term 3) / 3'), 'annual-preview.html renders tri-term grading key');
assert(annualPreviewContent.includes('This official annual cumulative transcript is certified and issued directly by MindStormer Global Academy. Scores represent tri-term weighted continuous assessment and examination results.'), 'annual-preview.html includes certified annual seal text');
assert(annualPreviewContent.includes('Tamper-evident electronic record • No physical signature required.'), 'annual-preview.html includes sanitized footer punctuation');
assert(annualPreviewContent.includes('MINDSTORMER GLOBAL ACADEMY • 100% AUTOMATED ONLINE LEARNING PLATFORM'), 'annual-preview.html includes MINDSTORMER watermark');
assert(annualPreviewContent.includes('OFFICIAL DIGITAL RECORD'), 'annual-preview.html includes OFFICIAL DIGITAL RECORD watermark');
assert(annualPreviewContent.includes('viewBox="0 0 33 33"'), 'annual-preview.html embeds clean geometric SVG QR code');
assert(annualPreviewContent.includes('colspan="7" class="py-0.5 px-2 w-full whitespace-nowrap">Cluster 1: Basic Science & Technology (BST)</td>'), 'annual-preview.html renders Cluster 1 with colspan=7 and whitespace-nowrap');
assert(annualPreviewContent.includes('colspan="7" class="py-0.5 px-2 w-full whitespace-nowrap">Cluster 2: Religion & National Values (RNV)</td>'), 'annual-preview.html renders Cluster 2 with colspan=7 and whitespace-nowrap');
assert(annualPreviewContent.includes('colspan="7" class="py-0.5 px-2 w-full whitespace-nowrap">Cluster 3: Pre-Vocational Studies (PVS)</td>'), 'annual-preview.html renders Cluster 3 with colspan=7 and whitespace-nowrap');
assert(annualPreviewContent.includes('colspan="7" class="py-0.5 px-2 w-full whitespace-nowrap">Cluster 4: Core Standalone Disciplines</td>'), 'annual-preview.html renders Cluster 4 with colspan=7 and whitespace-nowrap');
assert(annualPreviewContent.includes('Mathematics</td>') && annualPreviewContent.includes('English Studies</td>'), 'annual-preview.html renders separate rows for Mathematics and English Studies');

// Assert root annual-preview.html mirror parity
const rootAnnualPreviewPath = path.resolve(__dirname, '..', 'annual-preview.html');
assert(fs.existsSync(rootAnnualPreviewPath), 'root annual-preview.html exists');
const rootAnnualPreviewContent = fs.readFileSync(rootAnnualPreviewPath, 'utf8');
assert(rootAnnualPreviewContent === annualPreviewContent, 'root annual-preview.html has 100% parity with previews/annual-preview.html');

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
