const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, '..', 'curriculum-src', 'junior-secondary', 'jss-1');
const subjects = fs.readdirSync(base).filter(s => fs.statSync(path.join(base, s)).isDirectory());
const catalog = {};
subjects.forEach(s => {
  catalog[s] = {};
  ['term-01', 'term-02', 'term-03'].forEach(t => {
    catalog[s][t] = {};
    const tDir = path.join(base, s, t);
    if (!fs.existsSync(tDir)) return;
    const files = fs.readdirSync(tDir).filter(f => f.startsWith('week-') && f.endsWith('.md'));
    files.forEach(f => {
      const w = f.replace('.md', '').replace('week-', '');
      const content = fs.readFileSync(path.join(tDir, f), 'utf8');
      const topicMatch = content.match(/topic:\s*["']?([^"\r\n]+)["']?/);
      const imageMatch = content.match(/\[IMAGE:\s*alt=["']([^"']+)["']\s+caption=["']([^"']+)["']/);
      catalog[s][t][w] = {
        topic: topicMatch ? topicMatch[1].trim() : '',
        hasImage: !!imageMatch,
        alt: imageMatch ? imageMatch[1].trim() : '',
        caption: imageMatch ? imageMatch[2].trim() : ''
      };
    });
  });
});
fs.writeFileSync(path.join(__dirname, 'extracted-topics.json'), JSON.stringify(catalog, null, 2), 'utf8');
console.log('Extracted topics for ' + subjects.length + ' subjects');
