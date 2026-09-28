/**
 * MindStormer Global Academy (MSA-500)
 * Curriculum Compiler: curriculum-src/ -> content/
 * 
 * Transforms authored Markdown sources into:
 *  - lesson.html (Moodle mod_page compliant: 100% <div> containers, inline styles, Iconify API <img> icons, {{PENDING_CMID}} CTA)
 *  - quiz.xml (Moodle Question Bank XML: /top/ category hierarchy, <defaultgrade>1.0</defaultgrade>, CDATA blocks, deterministic grading)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration & Root Paths
const REPO_ROOT = path.resolve(__dirname, '..');
const CURRICULUM_SRC = path.join(REPO_ROOT, 'curriculum-src');
const CONTENT_DIST = path.join(REPO_ROOT, 'content');

// Helper to escape HTML characters in text
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Parse YAML front matter
function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    throw new Error('Missing or invalid YAML front matter block.');
  }
  const rawYaml = match[1];
  const body = content.slice(match[0].length);
  const metadata = {};
  rawYaml.split(/\r?\n/).forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      const val = line.slice(colonIndex + 1).trim();
      metadata[key] = val;
    }
  });
  return { metadata, body };
}

// Parse sections separated by ## in a rock-solid line-by-line manner
function parseSections(body) {
  const sections = {};
  const lines = body.split(/\r?\n/);
  let currentSection = null;
  let currentLines = [];

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      if (currentSection) {
        sections[currentSection] = currentLines.join('\n').trim();
      }
      currentSection = headingMatch[1].trim();
      currentLines = [];
    } else {
      if (currentSection) {
        currentLines.push(line);
      }
    }
  }
  if (currentSection) {
    sections[currentSection] = currentLines.join('\n').trim();
  }
  return sections;
}

// Convert markdown inline formatting (bold, italic) to HTML
function inlineMarkdown(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

// Generate lesson.html
function generateLessonHtml(metadata, sections) {
  const grade = metadata.grade || 'JSS 1';
  const subject = metadata.subject || 'Basic Science';
  const term = metadata.term || '01';
  const weekNum = String(metadata.week).padStart(2, '0');
  const topicTitle = metadata.topic || 'Curriculum Module';
  const weight = metadata.weight_percent || '40';
  const assessmentCategory = metadata.assessment_category || 'Continuous Assessment';

  // Subtitle generation based on topic
  let subtitle = '';
  if (weekNum === '01') {
    subtitle = 'Maintaining hygienic living environments, preventing disease vector breeding, and protecting community water sources.';
  } else if (weekNum === '02') {
    subtitle = 'Understanding the six vital food classes, preventing clinical deficiency disorders, and planning balanced nutrition with accessible local foods.';
  } else {
    subtitle = `Foundational curriculum module in ${subject} for ${grade}.`;
  }

  // Slot 3: Hook
  const hookText = sections['Hook'] ? inlineMarkdown(escapeHtml(sections['Hook'])) : '';

  // Slot 4: Key Terms
  const keyTerms = [];
  if (sections['Key Terms']) {
    const lines = sections['Key Terms'].split(/\r?\n/);
    let currentTerm = null;
    lines.forEach(line => {
      const termMatch = line.match(/^-\s*Term:\s*(.+)$/i);
      const defMatch = line.match(/^\s*Definition:\s*(.+)$/i);
      if (termMatch) {
        currentTerm = { term: termMatch[1].trim(), definition: '' };
        keyTerms.push(currentTerm);
      } else if (defMatch && currentTerm) {
        currentTerm.definition = defMatch[1].trim();
      }
    });
  }

  const termsHtml = keyTerms.map(item => `
        <div class="msa-term-card" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px 16px;">
          <strong class="msa-term-title" style="display: block; font-size: 14px; font-weight: 700; color: #1E293B; margin-bottom: 4px;">${escapeHtml(item.term)}</strong>
          <span class="msa-term-def" style="display: block; font-size: 13px; line-height: 1.5; color: #475569;">${escapeHtml(item.definition)}</span>
        </div>`).join('');

  // Slot 5: Core Concept
  let coreConceptHtml = '';
  if (sections['Core Concept']) {
    const rawConcept = sections['Core Concept'];
    const lines = rawConcept.split(/\r?\n/);
    let inList = false;
    let listItems = [];

    const flushList = () => {
      if (inList && listItems.length > 0) {
        coreConceptHtml += `
      <div class="msa-concept-list" style="margin: 12px 0 16px 0; display: flex; flex-direction: column; gap: 8px;">
        ${listItems.map((li, idx) => `
        <div class="msa-concept-item" style="display: flex; gap: 10px; font-size: 14px; line-height: 1.6; color: #334155;">
          <span style="font-weight: 700; color: #2563EB; min-width: 20px;">${idx + 1}.</span>
          <div>${li}</div>
        </div>`).join('')}
      </div>`;
        listItems = [];
        inList = false;
      }
    };

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        return;
      }

      // Check for image tag: [IMAGE: alt="..." caption="..."]
      const imgMatch = trimmed.match(/^\[IMAGE:\s*alt="([^"]+)"\s*caption="([^"]+)"\]$/i);
      if (imgMatch) {
        flushList();
        const alt = imgMatch[1];
        const caption = imgMatch[2];
        const imageUrl = weekNum === '01'
          ? 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80'
          : 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80';

        coreConceptHtml += `
      <div class="msa-figure" style="margin: 24px 0; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; background-color: #F8FAFC;">
        <img src="${imageUrl}" alt="${escapeHtml(alt)}" class="msa-figure-img" style="width: 100%; height: auto; max-height: 380px; object-fit: cover; display: block;" />
        <div class="msa-figure-caption" style="padding: 12px 16px; font-size: 13px; font-style: italic; color: #64748B; background-color: #F1F5F9; border-top: 1px solid #E2E8F0; text-align: center;">${escapeHtml(caption)}</div>
      </div>`;
        return;
      }

      // Check for subheading: ### ...
      if (trimmed.startsWith('### ')) {
        flushList();
        const headingText = trimmed.replace(/^###\s+/, '');
        coreConceptHtml += `
      <h3 class="msa-concept-subheading" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 700; color: #0F172A; margin: 20px 0 10px 0;">${escapeHtml(headingText)}</h3>`;
        return;
      }

      // Check for numbered list: 1. ...
      const numListMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (numListMatch) {
        inList = true;
        listItems.push(inlineMarkdown(numListMatch[1]));
        return;
      }

      // Check for bullet list: - ...
      const bulletMatch = trimmed.match(/^-\s+(.+)$/);
      if (bulletMatch) {
        flushList();
        coreConceptHtml += `
      <div class="msa-bullet-point" style="margin: 8px 0; font-size: 14px; line-height: 1.6; color: #334155; padding-left: 16px; border-left: 2px solid #CBD5E1;">${inlineMarkdown(bulletMatch[1])}</div>`;
        return;
      }

      // Regular paragraph
      flushList();
      coreConceptHtml += `
      <p style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0 0 12px 0;">${inlineMarkdown(trimmed)}</p>`;
    });

    flushList();
  }

  // Slot 6: Comparative Matrix
  let matrixHeading = 'Comparative Matrix';
  const matrixItems = [];
  if (sections['Comparative Matrix']) {
    const lines = sections['Comparative Matrix'].split(/\r?\n/);
    let currentItem = null;
    lines.forEach(line => {
      const headingMatch = line.match(/^Heading:\s*(.+)$/i);
      const labelMatch = line.match(/^-\s*Label:\s*(.+)$/i);
      const titleMatch = line.match(/^\s*Title:\s*(.+)$/i);
      const bodyMatch = line.match(/^\s*Body:\s*(.+)$/i);

      if (headingMatch) {
        matrixHeading = headingMatch[1].trim();
      } else if (labelMatch) {
        currentItem = { label: labelMatch[1].trim(), title: '', body: '' };
        matrixItems.push(currentItem);
      } else if (titleMatch && currentItem) {
        currentItem.title = titleMatch[1].trim();
      } else if (bodyMatch && currentItem) {
        currentItem.body = bodyMatch[1].trim();
      }
    });
  }

  const matrixHtml = matrixItems.map(item => `
        <div class="msa-matrix-card" style="background-color: #FFFFFF; border: 1px solid #E2E8F0; border-top: 3px solid #2563EB; border-radius: 8px; padding: 16px; box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04);">
          <span class="msa-matrix-label" style="display: inline-block; font-size: 11px; font-weight: 700; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">${escapeHtml(item.label)}</span>
          <h3 class="msa-matrix-title" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: #0F172A; margin: 0 0 6px 0;">${escapeHtml(item.title)}</h3>
          <p class="msa-matrix-body" style="font-size: 13px; line-height: 1.5; color: #475569; margin: 0;">${escapeHtml(item.body)}</p>
        </div>`).join('');

  // Slot 7: Common Mistakes
  const mistakes = [];
  if (sections['Common Mistakes']) {
    const lines = sections['Common Mistakes'].split(/\r?\n/);
    let currentMistake = null;
    lines.forEach(line => {
      const mMatch = line.match(/^-\s*Mistake:\s*(.+)$/i);
      const fMatch = line.match(/^\s*Fact:\s*(.+)$/i);
      if (mMatch) {
        currentMistake = { mistake: mMatch[1].trim(), fact: '' };
        mistakes.push(currentMistake);
      } else if (fMatch && currentMistake) {
        currentMistake.fact = fMatch[1].trim();
      }
    });
  }

  const mistakesHtml = mistakes.map(item => `
        <div class="msa-mistake-pair" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px;">
          <div class="msa-callout msa-callout-error" style="background-color: #FEF2F2; border: 1px solid #FECACA; border-left: 4px solid #DC2626; border-radius: 8px; padding: 14px 16px;">
            <div class="msa-callout-badge" style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #DC2626; text-transform: uppercase; margin-bottom: 6px;">
              <img src="https://api.iconify.design/lucide:x-circle.svg?color=%23dc2626" width="16" height="16" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
              Common Mistake
            </div>
            <p class="msa-callout-text" style="font-size: 13px; line-height: 1.5; color: #991B1B; margin: 0;">${escapeHtml(item.mistake)}</p>
          </div>
          <div class="msa-callout msa-callout-success" style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-left: 4px solid #047857; border-radius: 8px; padding: 14px 16px;">
            <div class="msa-callout-badge" style="display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase; margin-bottom: 6px;">
              <img src="https://api.iconify.design/lucide:check-circle.svg?color=%23047857" width="16" height="16" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
              Scientific Fact
            </div>
            <p class="msa-callout-text" style="font-size: 13px; line-height: 1.5; color: #065F46; margin: 0;">${escapeHtml(item.fact)}</p>
          </div>
        </div>`).join('');

  // Slot 8: Worked Examples
  const workedExamples = [];
  if (sections['Worked Examples']) {
    const lines = sections['Worked Examples'].split(/\r?\n/);
    let currentEx = null;
    lines.forEach(line => {
      const headingMatch = line.match(/^###\s*(.+)$/i);
      const ctxMatch = line.match(/^Context:\s*(.+)$/i);
      const probMatch = line.match(/^Problem:\s*(.+)$/i);
      const fixMatch = line.match(/^Fix:\s*(.+)$/i);

      if (headingMatch) {
        currentEx = { title: headingMatch[1].trim(), context: '', problem: '', fix: '' };
        workedExamples.push(currentEx);
      } else if (ctxMatch && currentEx) {
        currentEx.context = ctxMatch[1].trim();
      } else if (probMatch && currentEx) {
        currentEx.problem = probMatch[1].trim();
      } else if (fixMatch && currentEx) {
        currentEx.fix = fixMatch[1].trim();
      }
    });
  }

  const examplesHtml = workedExamples.map(item => `
        <div class="msa-scenario-card" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px 18px;">
          <h3 class="msa-scenario-title" style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; color: #0F172A; margin: 0 0 10px 0;">${escapeHtml(item.title)}</h3>
          <p style="font-size: 13px; line-height: 1.5; color: #334155; margin: 0 0 6px 0;"><strong style="color: #0F172A;">Context:</strong> ${escapeHtml(item.context)}</p>
          <p style="font-size: 13px; line-height: 1.5; color: #334155; margin: 0 0 6px 0;"><strong style="color: #0F172A;">Problem:</strong> ${escapeHtml(item.problem)}</p>
          <p class="msa-scenario-fix" style="font-size: 13px; line-height: 1.5; color: #047857; background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 6px; padding: 8px 12px; margin: 8px 0 0 0;"><strong style="color: #065F46;">Fix:</strong> ${escapeHtml(item.fix)}</p>
        </div>`).join('');

  // Slot 9: Guardian Sync
  const guardianText = sections['Guardian Sync'] ? inlineMarkdown(escapeHtml(sections['Guardian Sync'])) : '';

  // Return complete self-contained HTML fragment with 10 slots
  return `<!-- MSA-500 K-8 Academic Content Component (Week ${weekNum}: ${escapeHtml(topicTitle)}) -->
<div class="msa-lesson-canvas" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F8FAFC; padding: 24px 16px; color: #0F172A; min-height: 100vh;">
  <div class="msa-lesson-card" style="max-width: 840px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05); padding: 32px 28px;">

    <!-- SLOT 1: Metadata & Grading Weight Pill -->
    <div class="msa-meta-bar" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
      <span class="msa-pill msa-pill-subject" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 9999px; font-size: 12px; font-weight: 600; color: #1D4ED8; letter-spacing: 0.025em; text-transform: uppercase;">
        <img src="https://api.iconify.design/lucide:book-open.svg?color=%231d4ed8" width="14" height="14" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        ${escapeHtml(grade)} • ${escapeHtml(subject)}
      </span>
      <span class="msa-pill msa-pill-weight" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 9999px; font-size: 12px; font-weight: 600; color: #047857; letter-spacing: 0.025em; text-transform: uppercase;">
        <img src="https://api.iconify.design/lucide:award.svg?color=%23047857" width="14" height="14" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        ${escapeHtml(assessmentCategory)} (${weight}% Weight)
      </span>
    </div>

    <!-- SLOT 2: Title & Executive Summary -->
    <div class="msa-title-block" style="margin-bottom: 28px; border-bottom: 1px solid #E2E8F0; padding-bottom: 20px;">
      <h1 class="msa-lesson-title" style="font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif; font-size: 28px; font-weight: 800; color: #0F172A; line-height: 1.25; margin: 0 0 8px 0; letter-spacing: -0.02em;">Week ${weekNum}: ${escapeHtml(topicTitle)}</h1>
      <p class="msa-lesson-subtitle" style="font-size: 15px; color: #475569; margin: 0; line-height: 1.5;">${subtitle}</p>
    </div>

    <!-- SLOT 3: The Real-World Hook -->
    <div class="msa-hook-card" style="background-color: #F8FAFC; border: 1px solid #CBD5E1; border-left: 4px solid #2563EB; border-radius: 10px; padding: 18px 20px; margin-bottom: 28px;">
      <div class="msa-hook-header" style="display: flex; align-items: center; gap: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 15px; color: #1D4ED8; margin-bottom: 8px;">
        <img src="https://api.iconify.design/lucide:lightbulb.svg?color=%231d4ed8" width="18" height="18" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        Why This Matters to You
      </div>
      <p class="msa-hook-body" style="font-size: 14px; line-height: 1.6; color: #334155; margin: 0;">${hookText}</p>
    </div>

    <!-- SLOT 4: Key Terms Glossary -->
    <div class="msa-section" style="margin-bottom: 32px;">
      <h2 class="msa-section-title" style="display: flex; align-items: center; gap: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0;">
        <img src="https://api.iconify.design/lucide:book-marked.svg?color=%232563eb" width="20" height="20" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        Key Terms
      </h2>
      <div class="msa-glossary-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">${termsHtml}
      </div>
    </div>

    <!-- SLOT 5: Core Conceptual Content -->
    <div class="msa-section msa-prose" style="margin-bottom: 32px;">
      <h2 class="msa-section-title" style="display: flex; align-items: center; gap: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0;">
        <img src="https://api.iconify.design/lucide:layers.svg?color=%232563eb" width="20" height="20" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        Core Concept
      </h2>${coreConceptHtml}
    </div>

    <!-- SLOT 6: Structured Comparative Matrix -->
    <div class="msa-section" style="margin-bottom: 32px;">
      <h2 class="msa-section-title" style="display: flex; align-items: center; gap: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0;">
        <img src="https://api.iconify.design/lucide:layout-grid.svg?color=%232563eb" width="20" height="20" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        ${escapeHtml(matrixHeading)}
      </h2>
      <div class="msa-matrix-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">${matrixHtml}
      </div>
    </div>

    <!-- SLOT 7: Common Mistakes -->
    <div class="msa-section" style="margin-bottom: 32px;">
      <h2 class="msa-section-title" style="display: flex; align-items: center; gap: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0;">
        <img src="https://api.iconify.design/lucide:alert-triangle.svg?color=%23d97706" width="20" height="20" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        Common Mistakes to Avoid
      </h2>
      <div class="msa-mistakes-container" style="display: flex; flex-direction: column; gap: 12px;">${mistakesHtml}
      </div>
    </div>

    <!-- SLOT 8: Worked Examples -->
    <div class="msa-section" style="margin-bottom: 32px;">
      <h2 class="msa-section-title" style="display: flex; align-items: center; gap: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; font-weight: 700; color: #0F172A; margin: 0 0 16px 0;">
        <img src="https://api.iconify.design/lucide:clipboard-check.svg?color=%232563eb" width="20" height="20" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        Worked Examples
      </h2>
      <div class="msa-scenarios-container" style="display: flex; flex-direction: column; gap: 14px;">${examplesHtml}
      </div>
    </div>

    <!-- SLOT 9: Home Application & Guardian Sync -->
    <div class="msa-sync-card" style="background-color: #F5F3FF; border: 1px solid #DDD6FE; border-left: 4px solid #7C3AED; border-radius: 10px; padding: 18px 20px; margin-bottom: 32px;">
      <div class="msa-sync-header" style="display: flex; align-items: center; gap: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 15px; color: #6D28D9; margin-bottom: 8px;">
        <img src="https://api.iconify.design/lucide:users.svg?color=%237c3aed" width="18" height="18" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
        Home Application &amp; Guardian Sync
      </div>
      <p class="msa-sync-body" style="font-size: 14px; line-height: 1.6; color: #4C1D95; margin: 0;">${guardianText}</p>
    </div>

    <!-- SLOT 10: Terminal Action CTA -->
    <div class="msa-cta-footer" style="text-align: center; padding-top: 24px; border-top: 1px solid #E2E8F0;">
      <a href="{{PENDING_CMID}}" class="msa-primary-btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; background-color: #2563EB; color: #FFFFFF; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); transition: background-color 0.2s ease;">
        Take Week ${weekNum} Assessment (20 Questions)
        <img src="https://api.iconify.design/lucide:arrow-right.svg?color=%23ffffff" width="18" height="18" alt="" aria-hidden="true" style="vertical-align: middle; display: inline-block;" />
      </a>
      <span class="msa-cta-subtext" style="display: block; font-size: 12px; color: #64748B; margin-top: 10px;">
        1 Attempt Allowed • Passing Score: 50% (10/20) • Auto-Submitted at 1:55 PM
      </span>
    </div>

  </div>
</div>
`;
}

// Parse quiz questions from markdown
function parseQuizQuestions(quizText) {
  const questions = [];
  const qBlocks = quizText.split(/^###\s+/m);

  qBlocks.forEach(block => {
    const trimmed = block.trim();
    if (!trimmed) return;

    const firstLineEnd = trimmed.indexOf('\n');
    const headerLine = firstLineEnd > -1 ? trimmed.slice(0, firstLineEnd).trim() : trimmed;
    const body = firstLineEnd > -1 ? trimmed.slice(firstLineEnd + 1).trim() : '';

    const headerMatch = headerLine.match(/^Q(\d+)\s+\[([^\]]+)\]/i);
    if (!headerMatch) return;

    const qNum = parseInt(headerMatch[1], 10);
    const qType = headerMatch[2].trim().toLowerCase();

    const qObj = { qNum, qType, rawBody: body };
    const lines = body.split(/\r?\n/);

    if (qType === 'single-choice') {
      let stem = '';
      const options = [];
      let feedback = '';

      lines.forEach(l => {
        const line = l.trim();
        if (line.startsWith('Stem:')) {
          stem = line.slice(5).trim();
        } else if (/^[A-D]\)/i.test(line)) {
          const optLetter = line[0].toUpperCase();
          let optText = line.slice(2).trim();
          const isCorrect = /\(correct\)/i.test(optText);
          optText = optText.replace(/\(correct\)/ig, '').trim();
          options.push({ letter: optLetter, text: optText, isCorrect });
        } else if (line.startsWith('Feedback:')) {
          feedback = line.slice(9).trim();
        }
      });

      qObj.stem = stem;
      qObj.options = options;
      qObj.feedback = feedback;
    } else if (qType === 'true-false') {
      let statement = '';
      let answer = false;
      let feedback = '';

      lines.forEach(l => {
        const line = l.trim();
        if (line.startsWith('Statement:')) {
          statement = line.slice(10).trim();
        } else if (line.startsWith('Answer:')) {
          answer = line.slice(7).trim().toLowerCase() === 'true';
        } else if (line.startsWith('Feedback:')) {
          feedback = line.slice(9).trim();
        }
      });

      qObj.statement = statement;
      qObj.answer = answer;
      qObj.feedback = feedback;
    } else if (qType === 'multi-select') {
      let stem = '';
      let correct = [];
      let incorrect = [];
      let feedback = '';

      lines.forEach(l => {
        const line = l.trim();
        if (line.startsWith('Stem:')) {
          stem = line.slice(5).trim();
        } else if (line.startsWith('Correct:')) {
          correct = line.slice(8).split(',').map(s => s.trim()).filter(Boolean);
        } else if (line.startsWith('Incorrect:')) {
          incorrect = line.slice(10).split(',').map(s => s.trim()).filter(Boolean);
        } else if (line.startsWith('Feedback:')) {
          feedback = line.slice(9).trim();
        }
      });

      qObj.stem = stem;
      qObj.correct = correct;
      qObj.incorrect = incorrect;
      qObj.feedback = feedback;
    } else if (qType === 'matching') {
      let stem = '';
      const pairs = [];
      let feedback = '';

      lines.forEach(l => {
        const line = l.trim();
        if (line.startsWith('Stem:')) {
          stem = line.slice(5).trim();
        } else if (line.startsWith('-') && line.includes('->')) {
          const pairParts = line.slice(1).split('->');
          pairs.push({
            left: pairParts[0].trim(),
            right: pairParts[1].trim()
          });
        } else if (line.startsWith('Feedback:')) {
          feedback = line.slice(9).trim();
        }
      });

      qObj.stem = stem;
      qObj.pairs = pairs;
      qObj.feedback = feedback;
    }

    questions.push(qObj);
  });

  return questions;
}

// Generate Moodle XML
function generateQuizXml(metadata, questions, categoryPath) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<quiz>

  <!-- Category Declaration Node (Mandatory /top/ segment) -->
  <question type="category">
    <category>
      <text>${categoryPath}</text>
    </category>
  </question>
`;

  questions.forEach(q => {
    const qPad = String(q.qNum).padStart(2, '0');
    const prefix = metadata.week === 'midterm' ? 'MID' : metadata.week === 'end-of-term' ? 'EOT' : `W${String(metadata.week).padStart(2, '0')}`;
    const qName = `${prefix}_Q${qPad}: Basic Science JSS1 Assessment`;

    if (q.qType === 'single-choice') {
      xml += `
  <!-- Question ${qPad}: Single Choice -->
  <question type="multichoice">
    <name>
      <text><![CDATA[${qName}]]></text>
    </name>
    <questiontext format="html">
      <text><![CDATA[<p>${q.stem}</p>]]></text>
    </questiontext>
    <generalfeedback format="html">
      <text><![CDATA[<p>${q.feedback}</p>]]></text>
    </generalfeedback>
    <defaultgrade>1.0</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <idnumber></idnumber>
    <single>true</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
    <showstandardinstruction>0</showstandardinstruction>
    <correctfeedback format="html">
      <text><![CDATA[<p>Your answer is correct.</p>]]></text>
    </correctfeedback>
    <partiallycorrectfeedback format="html">
      <text><![CDATA[<p>Your answer is partially correct.</p>]]></text>
    </partiallycorrectfeedback>
    <incorrectfeedback format="html">
      <text><![CDATA[<p>Your answer is incorrect.</p>]]></text>
    </incorrectfeedback>
`;
      q.options.forEach(opt => {
        const fraction = opt.isCorrect ? '100' : '0';
        const optFb = opt.isCorrect
          ? `Correct! ${q.feedback}`
          : `Incorrect. ${q.feedback}`;
        xml += `    <answer fraction="${fraction}" format="html">
      <text><![CDATA[<p>${opt.text}</p>]]></text>
      <feedback format="html">
        <text><![CDATA[<p>${optFb}</p>]]></text>
      </feedback>
    </answer>
`;
      });
      xml += `  </question>
`;
    } else if (q.qType === 'true-false') {
      const trueFraction = q.answer ? '100' : '0';
      const falseFraction = q.answer ? '0' : 100;
      const trueFb = q.answer ? `Correct. ${q.feedback}` : `Incorrect. ${q.feedback}`;
      const falseFb = !q.answer ? `Correct. ${q.feedback}` : `Incorrect. ${q.feedback}`;

      xml += `
  <!-- Question ${qPad}: True / False -->
  <question type="truefalse">
    <name>
      <text><![CDATA[${qName}]]></text>
    </name>
    <questiontext format="html">
      <text><![CDATA[<p>${q.statement}</p>]]></text>
    </questiontext>
    <generalfeedback format="html">
      <text><![CDATA[<p>${q.feedback}</p>]]></text>
    </generalfeedback>
    <defaultgrade>1.0</defaultgrade>
    <penalty>1.0000000</penalty>
    <hidden>0</hidden>
    <idnumber></idnumber>
    <answer fraction="${trueFraction}" format="html">
      <text><![CDATA[true]]></text>
      <feedback format="html">
        <text><![CDATA[<p>${trueFb}</p>]]></text>
      </feedback>
    </answer>
    <answer fraction="${falseFraction}" format="html">
      <text><![CDATA[false]]></text>
      <feedback format="html">
        <text><![CDATA[<p>${falseFb}</p>]]></text>
      </feedback>
    </answer>
  </question>
`;
    } else if (q.qType === 'multi-select') {
      xml += `
  <!-- Question ${qPad}: Multi-Select -->
  <question type="multichoice">
    <name>
      <text><![CDATA[${qName}]]></text>
    </name>
    <questiontext format="html">
      <text><![CDATA[<p>${q.stem}</p>]]></text>
    </questiontext>
    <generalfeedback format="html">
      <text><![CDATA[<p>${q.feedback}</p>]]></text>
    </generalfeedback>
    <defaultgrade>1.0</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <idnumber></idnumber>
    <single>false</single>
    <shuffleanswers>true</shuffleanswers>
    <answernumbering>abc</answernumbering>
    <showstandardinstruction>0</showstandardinstruction>
    <correctfeedback format="html">
      <text><![CDATA[<p>Your answer is correct.</p>]]></text>
    </correctfeedback>
    <partiallycorrectfeedback format="html">
      <text><![CDATA[<p>Your answer is partially correct.</p>]]></text>
    </partiallycorrectfeedback>
    <incorrectfeedback format="html">
      <text><![CDATA[<p>Your answer is incorrect.</p>]]></text>
    </incorrectfeedback>
`;
      q.correct.forEach(item => {
        xml += `    <answer fraction="50" format="html">
      <text><![CDATA[<p>${item}</p>]]></text>
      <feedback format="html">
        <text><![CDATA[<p>Correct selection.</p>]]></text>
      </feedback>
    </answer>
`;
      });
      q.incorrect.forEach(item => {
        xml += `    <answer fraction="-50" format="html">
      <text><![CDATA[<p>${item}</p>]]></text>
      <feedback format="html">
        <text><![CDATA[<p>Incorrect selection.</p>]]></text>
      </feedback>
    </answer>
`;
      });
      xml += `  </question>
`;
    } else if (q.qType === 'matching') {
      xml += `
  <!-- Question ${qPad}: Relational Matching -->
  <question type="matching">
    <name>
      <text><![CDATA[${qName}]]></text>
    </name>
    <questiontext format="html">
      <text><![CDATA[<p>${q.stem}</p>]]></text>
    </questiontext>
    <generalfeedback format="html">
      <text><![CDATA[<p>${q.feedback}</p>]]></text>
    </generalfeedback>
    <defaultgrade>1.0</defaultgrade>
    <penalty>0.3333333</penalty>
    <hidden>0</hidden>
    <idnumber></idnumber>
    <shuffleanswers>true</shuffleanswers>
    <correctfeedback format="html">
      <text><![CDATA[<p>Your answer is correct.</p>]]></text>
    </correctfeedback>
    <partiallycorrectfeedback format="html">
      <text><![CDATA[<p>Your answer is partially correct.</p>]]></text>
    </partiallycorrectfeedback>
    <incorrectfeedback format="html">
      <text><![CDATA[<p>Your answer is incorrect.</p>]]></text>
    </incorrectfeedback>
`;
      q.pairs.forEach(pair => {
        xml += `    <subquestion format="html">
      <text><![CDATA[<p>${pair.left}</p>]]></text>
      <answer>
        <text><![CDATA[${pair.right}]]></text>
      </answer>
    </subquestion>
`;
      });
      xml += `  </question>
`;
    }
  });

  xml += `</quiz>
`;
  return xml;
}

// Compute SHA-256 checksum of a file
function getSha256(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

// Main Compilation Runner
function compileAll() {
  console.log('🚀 Starting MSA-500 Curriculum Compiler...\n');

  const term01SrcDir = path.join(CURRICULUM_SRC, 'junior-secondary', 'jss-1', 'basic-science', 'term-01');
  const term01DistDir = path.join(CONTENT_DIST, 'junior-secondary', 'jss-1', 'basic-science', 'term-01');

  const tasks = [
    {
      type: 'weekly',
      srcFile: path.join(term01SrcDir, 'week-01.md'),
      distFolder: path.join(term01DistDir, 'week-01'),
      category: '$course$/top/JSS1_Basic_Science/Term_01/Week_01_Sanitation'
    },
    {
      type: 'weekly',
      srcFile: path.join(term01SrcDir, 'week-02.md'),
      distFolder: path.join(term01DistDir, 'week-02'),
      category: '$course$/top/JSS1_Basic_Science/Term_01/Week_02_Nutrition_and_Balanced_Diet'
    },
    {
      type: 'assessment',
      srcFile: path.join(term01SrcDir, 'midterm.md'),
      distFolder: path.join(term01DistDir, 'midterm'),
      category: '$course$/top/JSS1_Basic_Science/Term_01/Midterm_Assessment'
    },
    {
      type: 'assessment',
      srcFile: path.join(term01SrcDir, 'end-of-term.md'),
      distFolder: path.join(term01DistDir, 'end-of-term'),
      category: '$course$/top/JSS1_Basic_Science/Term_01/Terminal_Examination'
    }
  ];

  const results = [];

  tasks.forEach(task => {
    if (!fs.existsSync(task.srcFile)) {
      console.error(`❌ Source file missing: ${task.srcFile}`);
      return;
    }

    fs.mkdirSync(task.distFolder, { recursive: true });
    const content = fs.readFileSync(task.srcFile, 'utf8');
    const { metadata, body } = parseFrontMatter(content);
    const sections = parseSections(body);

    console.log(`📦 Processing ${path.basename(task.srcFile)} (Type: ${task.type})...`);

    // Compile lesson.html if weekly
    if (task.type === 'weekly') {
      const lessonHtml = generateLessonHtml(metadata, sections);
      const lessonPath = path.join(task.distFolder, 'lesson.html');
      fs.writeFileSync(lessonPath, lessonHtml, 'utf8');
      results.push({
        file: lessonPath,
        relPath: path.relative(REPO_ROOT, lessonPath),
        sha256: getSha256(lessonPath),
        bytes: fs.statSync(lessonPath).size
      });
      console.log(`  ✓ Generated lesson.html`);
    }

    // Compile quiz.xml
    if (sections['Quiz']) {
      const questions = parseQuizQuestions(sections['Quiz']);
      console.log(`  ✓ Parsed ${questions.length} quiz questions`);
      const quizXml = generateQuizXml(metadata, questions, task.category);
      const quizPath = path.join(task.distFolder, 'quiz.xml');
      fs.writeFileSync(quizPath, quizXml, 'utf8');
      results.push({
        file: quizPath,
        relPath: path.relative(REPO_ROOT, quizPath),
        sha256: getSha256(quizPath),
        bytes: fs.statSync(quizPath).size,
        questionsCount: questions.length
      });
      console.log(`  ✓ Generated quiz.xml`);
    }
    console.log('');
  });

  console.log('🏁 Compilation Complete! Generated Artifacts:');
  console.log('--------------------------------------------------------------------------------------------------------');
  results.forEach(res => {
    const qInfo = res.questionsCount ? ` (${res.questionsCount} Qs)` : '';
    console.log(`- ${res.relPath}${qInfo}`);
    console.log(`  Size: ${res.bytes} bytes | SHA-256: ${res.sha256}`);
  });
  console.log('--------------------------------------------------------------------------------------------------------');
}

if (require.main === module) {
  compileAll();
}

module.exports = {
  compileAll,
  parseFrontMatter,
  parseSections,
  generateLessonHtml,
  generateQuizXml,
  parseQuizQuestions
};
