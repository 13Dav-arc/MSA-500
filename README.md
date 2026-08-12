# MSA-500 | MindStormer Global Academy (MSA)

Official repository for the public landing page, portal UI assets, and PDF report card templates for **MindStormer Global Academy** (`msa.mayndstormir.com`).

---

# MindStormer Global Academy (MSA-500)

An enterprise-grade, high-trust digital learning platform engineered for Grades 1–9 (Ages 5–14). Built with a clean corporate design system matching Maynd Stormir Inc. aesthetics, featuring gamified academic mastery gates, dual continuous assessment tracking (40% CA / 60% Exam), and a dedicated Parent Transparency Portal.

---

## 📁 Repository Structure

```text
MSA-500/
├── README.md                   # Project Documentation
├── index.html                  # Public Landing Page
├── login.html                  # Student Login Page
├── signup.html                 # Student Signup Page
├── dashboard.html              # Student Dashboard
├── parent-login.html           # Parent Login Page
├── parent-signup.html          # Parent Signup Page
├── parent-dashboard.html        # Parent Dashboard
│
├── assets/                     # Shared Frontend Assets
│   ├── js/
│   │   ├── main.js             # Form safety & loading spinners
│   │   ├── dashboard.js        # XP progress bar animations
│   │   └── parent.js           # Parent dynamic child switcher
│   └── img/                    # Banners, subject icons & badge graphics
│
└── templates/                  # Server / Moodle Integration
    └── mustache/               # Moodle Theme Mustache (.mustache) Files
        ├── login.mustache      # Converted Student Login Template
        ├── dashboard.mustache  # Converted Student Dashboard Template
        └── parent.mustache     # Converted Parent Dashboard Template

🛠 Tech Stack & Dependencies
Frontend: HTML5, Tailwind CSS (CDN), Google Fonts (Plus Jakarta Sans & Nunito).

Design Standards: Universal Grades 1–9 (Ages 5–14), Duolingo-style gamification UI.

PDF Templating: Standard inline table CSS designed for Moodle TCPDF/Dompdf rendering engines.

🚀 Deployment Instructions for Nginx (Systems)
Landing Page: Serve index.html as the root document at msa.mayndstormir.com.

Report Card PDF Engine: Map report-card-template.html variables ({{STUDENT_FULL_NAME}}, {{CA_SCORE}}, {{EXAM_SCORE}}, etc.) inside the Moodle Custom PDF plugin directory.

👥 Core Team Roles
Creative / Frontend Lead: Olamiposi

Systems Lead: Inioluwa

Project Lead: Adeyemi Ajifowowe