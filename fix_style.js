const fs = require('fs');
let c = fs.readFileSync('public/style.css', 'utf8');
c = c.replace(/\.contact-checklist li::before\s*\{\s*content:\s*['"][^'"]*['"];/, ".contact-checklist li::before {\n    content: '\\\\2713';");
fs.writeFileSync('public/style.css', c, 'utf8');
console.log('Fixed checklist icon');
