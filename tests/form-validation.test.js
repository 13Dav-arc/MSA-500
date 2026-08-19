/**
 * MindStormer Global Academy (MSA-500)
 * Form Validation & Accessibility Test Suite
 * Executed by CI / Quality Gate before Stage & Push
 */

const fs = require('fs');
const path = require('path');
const {
  PasswordRules,
  validateEmail,
  validatePassword,
  validateRequired
} = require('../assets/js/form-validation');

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

console.log('🧪 Running MSA-500 Form Validation & Accessibility Quality Gate...\n');

// 1. Password Rule Unit Tests
console.log('📋 [1/5] Testing Password Validation Rules:');

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
console.log('\n📋 [2/5] Testing Email Address Validation:');

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
console.log('\n📋 [3/5] Testing Required Field Validator:');

assert(validateRequired('Alex') === true, 'Non-empty string is valid');
assert(validateRequired('   Alex  ') === true, 'String with trimmed content is valid');
assert(validateRequired('') === false, 'Empty string fails required check');
assert(validateRequired('   ') === false, 'Whitespace-only string fails required check');

// 4. Template Static Accessibility & Semantic Verification
console.log('\n📋 [4/5] Testing Mustache Template Accessibility & Lifecycle Hooks:');

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

// 5. Static HTML Preview Accessibility Verification
console.log('\n📋 [5/5] Testing Static Preview HTML Accessibility & Integration:');

const htmlPages = [
  'login.html',
  'signup.html',
  'parent-login.html',
  'parent-signup.html'
];

htmlPages.forEach((htmlPath) => {
  const fullPath = path.resolve(__dirname, '..', htmlPath);
  assert(fs.existsSync(fullPath), `HTML page exists: ${htmlPath}`);

  const content = fs.readFileSync(fullPath, 'utf8');
  assert(content.includes('assets/js/form-validation.js'), `${htmlPath} includes form-validation.js`);
  assert(content.includes('role="banner"'), `${htmlPath} has header role="banner"`);
  assert(content.includes('role="main"'), `${htmlPath} has main role="main"`);
  assert(content.includes('aria-required="true"'), `${htmlPath} contains aria-required inputs`);
  assert(content.includes('data-toggle-password'), `${htmlPath} contains accessible password toggle button`);
});

// Summary Report
console.log('\n========================================');
console.log(`📊 Test Summary: ${passedTests} passed, ${failedTests} failed.`);
console.log('========================================\n');

if (failedTests > 0) {
  console.error('❌ Quality Gate FAILED. Refactoring needed before git push.');
  process.exit(1);
} else {
  console.log('✨ All quality gate and accessibility checks PASSED (0 errors).');
  process.exit(0);
}
