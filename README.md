# MSA-500 | MindStormer Global Academy (MSA)

Official repository for the public landing page, portal UI assets, and PDF report card templates for **MindStormer Global Academy** (`msa.mayndstormir.com`).

---

## 📁 Repository Structure

```text
MSA-500/
├── index.html                    # Production-ready public landing page (Tailwind CSS)
├── report-card-template.html     # HTML/CSS template for Moodle PDF Report Cards
└── README.md                     # Project documentation

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