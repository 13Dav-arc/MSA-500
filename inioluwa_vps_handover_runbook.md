# MindStormer Global Academy (MSA-500)
## Technical Handover Runbook: Staging Infrastructure & Database Resolutions

**Target Environment:** Production VPS (`/var/www/msa/moodle/`)  
**Lead Engineer:** Inioluwa (Backend & Infrastructure Lead)  
**Reporting Engineer:** Olamiposi (Lead Frontend Developer & UI/UX Architect)  
**Date:** October 3, 2026  
**Status:** High Priority  

---

### Executive Architectural Directive

In accordance with strict project division of labor and architectural boundaries:
- The frontend codebase has been cleaned of all speculative DOM landmarks and client-side error interceptors.
- The CI/CD deployment pipeline (`.github/workflows/deploy.yml`) is strictly an additive file overlay (`rsync -av` without `--delete`).
- The three persistent defects documented below reside entirely within Moodle server-side configuration, page layout execution, and relational database state.
- This runbook provides the exact, copy-paste CLI commands and native Moodle API scripts for you to execute directly on the VPS terminal.

---

## 1. Dashboard Block AMD Crash Elimination (`/moodle/my/`)

### Root Cause Analysis
Moodle core assigns default blocks (`block_recentlyaccesseditems` and `block_timeline`) to `/my/`. When Moodle processes the dashboard, the block manager executes and enqueues inline AMD initialization scripts at the bottom of the page (`my/:1716`).

Because the custom Maynd Stormir dashboard replaces Moodle's native block layout with executive academic metric cards, the block containers (`#recentlyaccesseditems-...`) are never rendered in the DOM. When the asynchronous web service (`getRecentItems`) resolves, the AMD module attempts to bind event listeners to elements within `null`, throwing:
```text
TypeError: Cannot read properties of null (reading 'addEventListener')
  at render (core/first.js:537)
  at requestSuccess (core/first.js:643)
  at getRecentItems (core/first.js:3970)
  at init (core/first.js:3962)
  at (anonymous) (my/:1716)
```

### Why This Belongs on the Backend / Server Layer
Block instantiation and AMD registration are handled server-side by Moodle's `$PAGE->blocks` manager before HTML streaming begins. Dummy HTML tags or client-side JavaScript error listeners cannot reliably prevent Moodle's core AMD engine from executing enqueued scripts. It must be disengaged at the PHP layout level.

### Execution Instructions for Ini (VPS Terminal)

#### Step 1.1: Create Dedicated Dashboard Layout (`msa_dashboard.php`)
Create `/var/www/msa/moodle/theme/boost/layout/msa_dashboard.php`:
```bash
sudo cat << 'EOF' > /var/www/msa/moodle/theme/boost/layout/msa_dashboard.php
<?php
// This file is part of Moodle - http://moodle.org/
defined('MOODLE_INTERNAL') || die();

global $PAGE, $OUTPUT, $CFG, $USER;

// 1. Enforce zero database blocks on the dashboard to eliminate rogue AMD initializers
$PAGE->blocks->show_only_fake_blocks(true);

// 2. Prepare context for Mustache rendering
$templatecontext = [
    'sitename' => format_string($SITE->shortname, true, ['context' => context_course::instance(SITEID)]),
    'output' => $OUTPUT,
    'config' => [
        'wwwroot' => $CFG->wwwroot,
    ],
    'fullname' => fullname($USER),
    'user_initials' => strtoupper(substr($USER->firstname, 0, 1) . substr($USER->lastname, 0, 1)),
    'sesskey' => sesskey(),
];

// 3. Render bespoke corporate dashboard template
echo $OUTPUT->render_from_template('theme_boost/dashboard', $templatecontext);

// 4. Satisfy core output hooks without rendering block markup
?>
<div style="display: none !important;" aria-hidden="true">
    <?php echo $OUTPUT->main_content(); ?>
</div>
<?php
echo $OUTPUT->standard_end_of_body_html();
EOF
```

#### Step 1.2: Route Dashboard Pagelayout to `msa_dashboard.php`
In `/var/www/msa/moodle/theme/boost/config.php`, map the `mydashboard` and `my-index` layouts to use `msa_dashboard.php`:
```php
    'my-index' => [
        'file' => 'msa_dashboard.php',
        'regions' => [],
        'options' => ['nonavbar' => true],
    ],
    'mydashboard' => [
        'file' => 'msa_dashboard.php',
        'regions' => [],
        'options' => ['nonavbar' => true],
    ],
```
*(Alternative: If modifying `config.php` directly is avoided, add an early delegation check at the top of `/var/www/msa/moodle/theme/boost/layout/drawers.php`:)*
```php
if ($PAGE->pagelayout === 'mydashboard' || $PAGE->pagelayout === 'my-index') {
    require_once(__DIR__ . '/msa_dashboard.php');
    return;
}
```

#### Step 1.3: Clean Database Block Instances on `/my/`
Execute via PHP CLI to permanently purge stale block instances assigned to the dashboard:
```bash
sudo -u www-data php -r '
require("/var/www/msa/moodle/config.php");
$deleted_recent = $DB->delete_records("block_instances", ["blockname" => "recentlyaccesseditems", "pagetypepattern" => "my-index"]);
$deleted_timeline = $DB->delete_records("block_instances", ["blockname" => "timeline", "pagetypepattern" => "my-index"]);
echo "Purged $deleted_recent recentlyaccesseditems blocks and $deleted_timeline timeline blocks from dashboard.\n";
'
```

---

## 2. Core Subpage Corporate Styling (`/user/profile.php`, `/user/preferences.php`)

### Root Cause Analysis
Theme Boost hardcodes `$THEME->sheets = [];`, so Moodle's `styles.php` completely ignores static `.css` files in `theme/boost/style/`. Furthermore, piping compiled CSS (`assets/css/main.css`) through Moodle's `theme_boost | scss` setting breaks because Moodle's internal PHP compiler (`scssphp`) cannot parse modern CSS custom properties, complex grid layouts, and Tailwind syntax.

### Why This Belongs on the Backend / Server Layer
Global head HTML injection and theme settings are managed in Moodle's `config` database table. Moodle provides `$CFG->additionalhtmlhead` specifically to deliver external stylesheets and scripts globally to core pages without compilation.

### Execution Instructions for Ini (VPS Terminal)

#### Step 2.1: Disengage Broken SCSS Compiler Setting
Clear the raw SCSS setting so `scssphp` stops failing during cache compilation:
```bash
sudo -u www-data php /var/www/msa/moodle/admin/cli/cfg.php --component=theme_boost --name=scss --set=""
```

#### Step 2.2: Safely Append Stylesheet Link to `additionalhtmlhead`
Run this safe PHP one-liner that appends the compiled stylesheet link with dynamic cache-busting, **without overwriting** any existing tracking or custom tags in `additionalhtmlhead`:
```bash
sudo -u www-data php -r '
require("/var/www/msa/moodle/config.php");
$current = get_config("core", "additionalhtmlhead") ?: "";
$css_tag = "<link rel=\"stylesheet\" href=\"" . $CFG->wwwroot . "/theme/boost/style/moodle.css?v=" . time() . "\">";

if (strpos($current, "theme/boost/style/moodle.css") === false) {
    set_config("additionalhtmlhead", trim($current . "\n" . $css_tag));
    echo "✅ Successfully appended corporate stylesheet to additionalhtmlhead.\n";
} else {
    // Update cache-buster timestamp
    $updated = preg_replace("/moodle\.css\?v=[0-9]+/", "moodle.css?v=" . time(), $current);
    set_config("additionalhtmlhead", $updated);
    echo "✅ Updated cache-buster timestamp in additionalhtmlhead.\n";
}
'
```

---

## 3. Quiz Activity Attempt Loop & Question Slotting (Course 146, CMID 278)

### Root Cause Analysis
1. **Empty Question Slots:** Quiz CMID 278 exists as an empty activity shell. The 20 questions in Question Bank category `$course$/top/JSS1_Basic_Science/Term_01/Week_01_Sanitation` were never linked to the quiz (`mdl_quiz_slots` has 0 rows).
2. **Orphaned Attempt Record:** Attempt #10 exists in `mdl_quiz_attempts` with `state = 'inprogress'`.
3. **Infinite Redirection Loop:** Because weekly quizzes enforce **1 Attempt Allowed**, `mod/quiz/view.php?id=278` detects the in-progress attempt and forces a redirect to `mod/quiz/attempt.php?attempt=10&cmid=278`. Because the quiz has 0 questions slotted, `attempt.php` fails with a 404 / `noquestionsfound` exception.

### Why This Belongs on the Backend / Server Layer
Attempt states and question slot mappings reside inside Moodle's relational database (`mdl_quiz_slots`, `mdl_quiz_attempts`, `mdl_question_usages`). They require administrative Moodle API calls to repair without creating orphaned foreign key records.

### Execution Instructions for Ini (VPS Terminal)

#### Step 3.1: Clean Cascading Deletion of Attempt #10
Execute this script to delete attempt #10 using Moodle's native API, which automatically cascades deletion to `mdl_question_usages` and `mdl_question_attempts`:
```bash
sudo -u www-data php -r '
require("/var/www/msa/moodle/config.php");
require_once($CFG->dirroot . "/mod/quiz/locallib.php");

$cm = get_coursemodule_from_id("quiz", 278, 0, false, MUST_EXIST);
$quiz = $DB->get_record("quiz", ["id" => $cm->instance], "*", MUST_EXIST);
$attempt = $DB->get_record("quiz_attempts", ["id" => 10, "quiz" => $quiz->id]);

if ($attempt) {
    quiz_delete_attempt($attempt, $quiz);
    echo "✅ Attempt 10 cleanly deleted with all question usages cascaded.\n";
} else {
    echo "ℹ️ Attempt 10 does not exist or was already cleared.\n";
}
'
```

#### Step 3.2: Map the 20 Basic Science Questions into Quiz Slots (`mdl_quiz_slots`)
Execute this script to pull the 20 questions from the imported Question Bank category and map them to Quiz CMID 278:
```bash
sudo -u www-data php -r '
require("/var/www/msa/moodle/config.php");
require_once($CFG->dirroot . "/mod/quiz/locallib.php");

$cm = get_coursemodule_from_id("quiz", 278, 0, false, MUST_EXIST);
$quiz = $DB->get_record("quiz", ["id" => $cm->instance], "*", MUST_EXIST);

$slotcount = $DB->count_records("quiz_slots", ["quizid" => $quiz->id]);
if ($slotcount >= 20) {
    echo "ℹ️ Quiz already has {$slotcount} slots populated.\n";
    exit;
}

$cat = $DB->get_record_select("question_categories", "name LIKE ?", ["%Week_01%"]);
if (!$cat) {
    echo "❌ Question category for Week 01 not found. Please verify question import.\n";
    exit;
}

$questions = $DB->get_records("question", ["category" => $cat->id, "parent" => 0], "id ASC");
echo "Found " . count($questions) . " questions in category ID: {$cat->id}\n";

$slot = 1;
foreach ($questions as $q) {
    quiz_add_quiz_question($q->id, $quiz, 0, 1.0);
    echo "  + Added Question ID {$q->id} to Slot {$slot}\n";
    $slot++;
    if ($slot > 20) break;
}

quiz_update_sumgrades($quiz);
echo "✅ Successfully mapped 20 questions into mdl_quiz_slots for Quiz CMID 278!\n";
'
```

---

## 4. Final Verification & Cache Purge

#### Step 4.1: Purge All Moodle Caches
```bash
sudo -u www-data php /var/www/msa/moodle/admin/cli/purge_caches.php
```

#### Step 4.2: End-to-End Verification Checklist
1. **Subpages (`/user/profile.php`, `/user/preferences.php`):**
   - Open in browser.
   - Inspect page source: verify `<link rel="stylesheet" href=".../theme/boost/style/moodle.css?v=...">` is present in `<head>`.
   - Verify full Maynd Stormir corporate card borders, squircle avatars, and Plus Jakarta Sans typography.
2. **Dashboard (`/moodle/my/`):**
   - Log in as student `13dav`.
   - Verify zero console errors and zero blocking dialogs.
   - Inspect page source around the footer: verify no `block_recentlyaccesseditems/main` call is rendered.
3. **Week 01 Quiz (`/mod/quiz/view.php?id=278`):**
   - Navigate to quiz.
   - Verify Moodle displays "Attempts allowed: 1" and the **"Attempt quiz now"** button.
   - Click "Attempt quiz now" and verify Question 1 of 20 loads smoothly with attempt #11.
