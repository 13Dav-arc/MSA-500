const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', 'curriculum-src', 'junior-secondary', 'jss-1');
const subjects = fs.readdirSync(base).filter(s => fs.statSync(path.join(base, s)).isDirectory());

let injectedCount = 0;

subjects.forEach(subject => {
  ['term-01', 'term-02', 'term-03'].forEach(term => {
    const termDir = path.join(base, subject, term);
    if (!fs.existsSync(termDir)) return;
    const files = fs.readdirSync(termDir).filter(f => f.startsWith('week-') && f.endsWith('.md'));

    files.forEach(file => {
      const filePath = path.join(termDir, file);
      let content = fs.readFileSync(filePath, 'utf8');

      if (content.includes('[IMAGE:')) {
        return; // Already has an image tag
      }

      // Extract topic
      const topicMatch = content.match(/topic:\s*["']?([^"\r\n]+)["']?/);
      let rawTopic = topicMatch ? topicMatch[1].trim() : 'Core Curriculum Module';
      // Clean quotes and subtitles if any
      let cleanTopic = rawTopic.split(':')[0].trim();
      let fullTopic = rawTopic.replace(/"/g, '&quot;');

      const imageTag = `[IMAGE: alt="Educational diagram and authentic visual representation of ${cleanTopic}" caption="${cleanTopic}: Core Concepts and Pedagogical Illustration"]`;

      // Find ## Core Concept
      const coreConceptIndex = content.indexOf('## Core Concept');
      if (coreConceptIndex === -1) {
        console.warn(`Warning: No ## Core Concept in ${filePath}`);
        return;
      }

      // Find the first ### subheading after ## Core Concept, or insert directly after ## Core Concept
      const afterCoreConcept = content.slice(coreConceptIndex);
      const subheadMatch = afterCoreConcept.match(/(###\s+[^\r\n]+\r?\n)/);

      let newContent;
      if (subheadMatch) {
        const insertPos = coreConceptIndex + subheadMatch.index + subheadMatch[0].length;
        newContent = content.slice(0, insertPos) + imageTag + '\n\n' + content.slice(insertPos);
      } else {
        const nextLinePos = content.indexOf('\n', coreConceptIndex) + 1;
        newContent = content.slice(0, nextLinePos) + imageTag + '\n\n' + content.slice(nextLinePos);
      }

      fs.writeFileSync(filePath, newContent, 'utf8');
      injectedCount++;
    });
  });
});

console.log(`Successfully injected [IMAGE: ...] tags into ${injectedCount} weekly lesson files.`);
