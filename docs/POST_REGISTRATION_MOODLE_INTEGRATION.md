# MindStormer Global Academy (MSA-500) Post-Registration Moodle Integration Guide

## 1. Executive Summary & Purpose

This engineering document provides Inioluwa (Backend & Infrastructure Engineer) with production integration procedures for the two post-registration authentication screens within the MindStormer Global Academy (MSA) Moodle 4.x environment:

1. **Check Your Email Screen (`check-email-confirmation`)**: Rendered immediately after a student or guardian submits the registration form (`login/signup.php`), prompting verification before account activation.
2. **Account Confirmed Screen (`registration-confirmed`)**: Rendered when a user clicks the cryptographic activation link sent to their email (`login/confirm.php?data=...`), verifying their profile and onboarding them into the MSA ecosystem.

Both screens strictly adhere to the **Maynd Stormir Enterprise Corporate Theme** with 100% design continuity aligned with the Student Portal Login (`login.html`):
- Soft off-white institutional canvas (`bg-[#F8FAFC]`)
- Elevated pure white card container (`bg-white` / `#FFFFFF`, `rounded-3xl`, `shadow-2xl shadow-slate-200/50`)
- Standardized pure white navbar with dark squircle brand mark (`#0B0F19`) and direct logo link to `index.html`
- Soft-tinted squircle hero pods (`w-16 h-16 rounded-2xl`) with Lucide vector SVGs
- Deep navy institutional footer (`bg-[#0B1120]`) with exact copyright text
- WCAG 2.1 AA compliance, high contrast ratios, and zero informal emojis.

Two integration paths are supported:
- **Option A (Theme Boost Template Override - Recommended)**: Direct Moodle Mustache rendering via `theme/boost/templates/` and layout routing.
- **Option B (Language Customizer / String Fallback)**: Zero-downtime injection via Moodle Site Administration Language Customization into `core/moodle.php`.

---

## 2. File Assets & Locations

| Asset Name | Format | Primary Directory | Theme Boost Target | Purpose |
|---|---|---|---|---|
| `check-email-confirmation.mustache` | Mustache | `templates/mustache/` | `theme/boost/templates/` | Dynamic Moodle template for pending verification |
| `check-email-confirmation.html` | HTML Fallback | `previews/` | Language Customizer / PHP Echo | Standalone zero-dependency HTML/CSS fallback |
| `registration-confirmed.mustache` | Mustache | `templates/mustache/` | `theme/boost/templates/` | Dynamic Moodle template for successful activation |
| `registration-confirmed.html` | HTML Fallback | `previews/` | Language Customizer / PHP Echo | Standalone zero-dependency HTML/CSS fallback |

---

## 3. Integration Path A: Theme Boost Mustache Template Override (Recommended)

In Moodle 4.x running Theme Boost, authentication layouts are handled by `theme/boost/layout/login.php` or specialized page routing in core scripts.

### 3.1 Template Placement
Verify that the templates are present in the active theme directory:
```bash
# Verify theme template paths on VPS
ls -la /var/www/html/theme/boost/templates/check-email-confirmation.mustache
ls -la /var/www/html/theme/boost/templates/registration-confirmed.mustache
```

In the repository codebase, these files reside in both `theme/boost/templates/` and `templates/mustache/`.

### 3.2 Routing in `theme/boost/layout/login.php`
Inspect `$PAGE->pagetype` within `theme/boost/layout/login.php`. When Moodle processes post-registration flows, route to the corresponding Mustache template:

```php
<?php
// Inside theme/boost/layout/login.php
defined('MOODLE_INTERNAL') || die();

global $PAGE, $OUTPUT, $CFG, $USER;

$templatecontext = [
    'sitename' => format_string($SITE->shortname, true, ['context' => context_course::instance(SITEID)]),
    'output' => $OUTPUT,
    'config' => [
        'wwwroot' => $CFG->wwwroot,
    ],
];

// 1. Check Email Confirmation Route (Signup completed, email pending)
if ($PAGE->pagetype === 'login-signup' && optional_param('emailpending', 0, PARAM_INT)) {
    $templatecontext['email'] = optional_param('email', '', PARAM_EMAIL);
    $templatecontext['resendurl'] = new moodle_url('/login/signup.php', ['resend' => 1]);
    echo $OUTPUT->render_from_template('theme_boost/check-email-confirmation', $templatecontext);
    exit;
}

// 2. Account Confirmed Route (Successful token verification)
if ($PAGE->pagetype === 'login-confirm') {
    $templatecontext['fullname'] = fullname($USER);
    $templatecontext['continueurl'] = new moodle_url('/my/');
    echo $OUTPUT->render_from_template('theme_boost/registration-confirmed', $templatecontext);
    exit;
}

// Default standard login handling continues below...
echo $OUTPUT->header();
echo $OUTPUT->main_content();
echo $OUTPUT->footer();
```

### 3.3 Context Variables Mapped by Template

#### `check-email-confirmation.mustache`:
- `{{{ config.wwwroot }}}`: Base URL of the Moodle instance (e.g. `https://lms.mindstormer.edu.ng`).
- `{{ email }}`: User's registered email address. Defaults to sample fallback if omitted.
- `{{{ resendurl }}}`: Action URL to re-trigger verification email dispatch.
- `{{{ output.standard_head_html }}}`, `{{{ output.standard_top_of_body_html }}}`, `{{{ output.standard_end_of_body_html }}}`: Required Moodle hook injections.

#### `registration-confirmed.mustache`:
- `{{{ config.wwwroot }}}`: Base URL of the Moodle instance.
- `{{ fullname }}`: Full display name of the validated user.
- `{{{ continueurl }}}`: Redirect destination post-verification (defaults to `{{{ config.wwwroot }}}/my/`).
- `{{{ output.standard_head_html }}}`, `{{{ output.standard_top_of_body_html }}}`, `{{{ output.standard_end_of_body_html }}}`: Required Moodle hook injections.

---

## 4. Integration Path B: Language Customizer / HTML Fallback

For environments where core layout files cannot be modified, or for zero-downtime hotfixes, utilize Moodle's built-in **Language Customization** tool to inject the HTML fallback markup directly into core language strings.

### 4.1 Target Language Strings (`core/moodle.php`)
Navigate to: **Site Administration > Language > Language Customisation > English (en) > `moodle.php`**:

1. **String `emailconfirmsent` (Check Email Confirmation)**:
   - Paste the sanitized contents of `check-email-confirmation.html` (inner container `<main>...</main>` or complete standalone document).
   - Ensure placeholder variables like `{$a}` are placed where the student's email address appears:
     ```html
     <div class="inline-block bg-slate-100 text-slate-800 font-mono font-semibold text-xs px-4 py-2 rounded-xl border border-slate-200 mb-6 break-all">
       {$a}
     </div>
     ```

2. **String `confirmed` (Account Confirmed)**:
   - Paste the sanitized contents of `registration-confirmed.html`.
   - Embed user greeting:
     ```html
     <p class="text-base font-bold text-emerald-700 font-heading mb-2">
       Welcome to the Academy, {$a}!
     </p>
     ```

### 4.2 Raw PHP Wrapper Fallback in `login/confirm.php`
If overriding via language strings is bypassed by core templates, insert an echo wrapper directly into `login/confirm.php`:

```php
// In login/confirm.php after successful confirmation:
$user = $DB->get_record('user', ['id' => $user->id]);
complete_user_login($user);

// Render standalone corporate confirmation
$html = file_get_contents($CFG->dirroot . '/theme/boost/templates/registration-confirmed.html');
$html = str_replace('Alex Johnson', fullname($user), $html);
$html = str_replace('dashboard.html', $CFG->wwwroot . '/my/', $html);
$html = str_replace('index.html', $CFG->wwwroot, $html);
echo $html;
exit;
```

---

## 5. Cache Purging & Production Deployment CLI

Whenever Mustache templates or language strings are updated, Moodle's theme and string caches must be purged immediately:

```bash
# Purge all Moodle caches via CLI
sudo -u www-data php /var/www/html/admin/cli/purge_caches.php

# If opcache is enabled, reload PHP-FPM
sudo systemctl reload php8.2-fpm
# or
sudo systemctl reload php8.1-fpm

# Verify Nginx status
sudo systemctl status nginx --no-pager
```

---

## 6. End-to-End Verification Checklist

Perform manual verification across these test cases before sign-off:

- [ ] **Email Pending Display**: Complete a student registration at `/login/signup.php`. Confirm navigation renders the soft off-white canvas (`#F8FAFC`), pure white card (`#FFFFFF`), blue hero envelope pod, registered email pill, and troubleshooting instructions.
- [ ] **Account Confirmation Link**: Open the confirmation link received in the email (`/login/confirm.php?data=...`). Verify immediate transition to the light canvas with emerald verified status badge, welcome greeting with the student's full name, and 3-point workspace roadmap.
- [ ] **Zero Gamification Compliance**: Inspect DOM to confirm zero XP points, streaks, level badges, or informal emojis (🚀, 🔥, 🏆, etc.).
- [ ] **Direct Logo Routing**: Click the top-left "MAYND STORMIR ACADEMY" logo on both screens. Verify navigation routes directly to `index.html` / `{{{ config.wwwroot }}}/index.html`.
- [ ] **Accessibility (WCAG 2.1 AA)**: Verify high-contrast text contrast ratios, semantic heading hierarchies (`h1` for main status), and keyboard focus outlines (`min-h-[48px]` interactive touch targets).
- [ ] **Mobile Responsiveness**: Test at 375px (iPhone SE), 414px (iPhone Pro Max), and 768px (iPad). Confirm zero horizontal scroll and proper text wrap.

---

## 7. Moodle QuickForm Form Alignment & Authentication Continuity (Frontend Resolution)

During live portal diagnostic audits on `https://msa.mayndstomir.com/moodle/`, four critical authentication and registration bottlenecks were resolved on the frontend:

### 7.1 Moodle `HTML_QuickForm` Submission Verification
- **Issue**: Submitting `signup.mustache` caused a silent page reload because Moodle core's `$mform_signup->get_data()` returned `false`.
- **Frontend Fix**:
  1. Injected `<input type="hidden" name="_qf__login_signup_form" value="1">` into both `signup.mustache` and `parent_signup.mustache`.
  2. Injected `<input type="hidden" name="email2" id="email2" value="">` (and `#guardian_email2`) and synchronized `#email2.value = #email.value` on input and pre-submit via `form-validation.js`.

### 7.2 Guardian Account Fields Alignment (`user` table)
- **Issue**: `parent_signup.mustache` collected a single `fullname` string without `firstname`, `lastname`, and `username`, failing Moodle's relational DB constraints.
- **Frontend Fix**:
  1. Injected hidden fields: `firstname`, `lastname`, `username`, `role="parent"`.
  2. In `form-validation.js`, implemented `syncParentFields()`: splits `guardian_fullname` into `firstname` + `lastname`, and synchronizes `guardian_email` into `username`.

### 7.3 Guardian Portal Role Retention
- **Issue**: When login or signup encountered errors or redirects, Moodle dropped `?role=parent`, switching the interface back to the blue Student Portal.
- **Frontend Fix**:
  1. Added `<input type="hidden" name="role" value="parent">` inside `parent_login.mustache` and `parent_signup.mustache`.
  2. Updated form actions to explicit role query parameters: `action="{{{ loginurl }}}?role=parent"` and `action="{{{ signupurl }}}?role=parent"`.

### 7.4 Client-Side Moodle Error Scraping (`form-validation.js`)
- **Issue**: Moodle core renders authentication errors (`#loginerrormessage`, `.loginerrors`, `.alert-danger`) inside `$OUTPUT->main_content()`, which is visually hidden (`display: none !important`) in `theme/boost/layout/login.php`.
- **Frontend Fix**:
  Implemented `extractAndDisplayMoodleErrors()` in `form-validation.js`. On DOM initialization, it checks for error nodes within hidden containers and URL parameters (`loginredirect=1`), extracts the message, dynamically renders an institutional alert banner above the form, marks invalid fields (`aria-invalid="true"`), and broadcasts the alert to screen readers (`announceToScreenReader`).

### 7.5 Backend Action Items for Inioluwa (VPS & Server Administration)
1. **SMTP Gateway Verification**:
   Verify that Ubuntu VPS SMTP/Postfix or external relay (e.g. SendGrid / SES) is active so that `login/signup.php` dispatches verification emails immediately without stalling in the message queue.
2. **Password Reset & Change Route Injections**:
   In `theme/boost/layout/login.php`, ensure `forgot_password.php` and `change_password.php` do not get hijacked by the standalone login Mustache template when accessed directly.
3. **Session Flash Synchronization**:
   In `layout/login.php`, inspect `$SESSION->loginerrormsg` and pass it to the `$templatecontext['error']` array across all login failure branches.

