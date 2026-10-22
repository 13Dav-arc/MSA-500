const fs = require('fs');

function inspectDoc(path) {
  console.log('=== ' + path + ' ===');
  const buf = fs.readFileSync(path);
  // Replace null bytes
  const text1 = buf.toString('utf16le').replace(/[^\x20-\x7E\n\r]/g, ' ');
  const text2 = buf.toString('latin1').replace(/[^\x20-\x7E\n\r]/g, ' ');
  
  const matches1 = text1.match(/[A-Za-z0-9\s.,;:'"!?()\-]{15,}/g);
  const matches2 = text2.match(/[A-Za-z0-9\s.,;:'"!?()\-]{15,}/g);
  
  const m = (matches1 && matches1.length > (matches2 ? matches2.length : 0)) ? matches1 : matches2;
  if (m) {
    const filtered = m.map(s => s.trim()).filter(s => s.length > 20);
    console.log(filtered.slice(0, 35).join('\n---\n'));
  } else {
    console.log('No matches');
  }
}

inspectDoc('Reference/JSS 1/JSS1 2nd Term/Crs jss1 2nd term .doc');
console.log('\n\n==============================================\n\n');
inspectDoc('Reference/JSS 1/JSS1 3rd Term/crs jss1 3rd term.doc');
