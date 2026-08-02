const fs = require('fs');
const file = 'public/stamspolning.html';
let html = fs.readFileSync(file, 'utf8');

const targetStr = 'Kontakta oss!';
const replacementStr = 'Kontakta oss';

// Let's replace ONLY the one inside the hero section button.
// To be safe, we replace the specific line.
html = html.replace('Kontakta oss!', 'Kontakta oss');

fs.writeFileSync(file, html, 'utf8');
console.log('Fixed exclamation mark');
