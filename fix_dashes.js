const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'public', 'kalkylator.html');
let content = fs.readFileSync(file, 'utf8');

// The mangled UTF-8 characters for minus and en-dash
content = content.replace(/âˆ’/g, '-');
content = content.replace(/â€“/g, '-');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed dashes in kalkylator.html');
