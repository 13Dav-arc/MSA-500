<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Enterprise Layout Router for Maynd Stormir Global Academy (MSA-500).
 * Dynamically routes student and parent authentication/signup flows
 * to standalone, de-gamified Mustache templates while satisfying core output hooks.
 *
 * @package   theme_boost
 * @copyright 2026 Maynd Stormir Inc.
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

global $PAGE, $OUTPUT, $CFG, $USER, $SESSION;

// 1. Determine role and route safely
$is_parent = (optional_param('role', '', PARAM_ALPHA) === 'parent');
$is_signup = ($PAGE->pagetype === 'login-signup' || 
              (isset($_SERVER['SCRIPT_NAME']) && strpos($_SERVER['SCRIPT_NAME'], 'signup.php') !== false));

// 2. Extract error message if present (session flash or query param)
$error = '';
if (!empty($SESSION->loginerrormsg)) {
    $error = $SESSION->loginerrormsg;
    unset($SESSION->loginerrormsg);
} else if ($PAGE->has_set_url()) {
    $error = optional_param('error', '', PARAM_TEXT);
}

// 3. Prepare complete context for Mustache templates
$templatecontext = [
    'wwwroot' => $CFG->wwwroot,
    'config' => ['wwwroot' => $CFG->wwwroot],
    'sesskey' => sesskey(),
    'loginurl' => (new moodle_url('/login/index.php'))->out(false),
    'signupurl' => (new moodle_url('/login/signup.php'))->out(false),
    'forgotpasswordurl' => (new moodle_url('/login/forgot_password.php'))->out(false),
    'username' => optional_param('username', '', PARAM_RAW),
    'error' => $error,
    'output' => [
        'standard_head_html' => $OUTPUT->standard_head_html(),
        'standard_top_of_body_html' => $OUTPUT->standard_top_of_body_html(),
        'standard_end_of_body_html' => $OUTPUT->standard_end_of_body_html(),
    ]
];

// 4. Select the appropriate standalone Mustache template
if ($is_signup) {
    $templatename = $is_parent ? 'theme_boost/parent_signup' : 'theme_boost/signup';
} else {
    $templatename = $is_parent ? 'theme_boost/parent_login' : 'theme_boost/login';
}

// 5. Render custom standalone template
echo $OUTPUT->render_from_template($templatename, $templatecontext);

// 6. Satisfy Moodle main_content requirement without visual or screen-reader leakage
echo '<div style="display:none !important;" aria-hidden="true">';
echo $OUTPUT->main_content();
echo '</div>';
