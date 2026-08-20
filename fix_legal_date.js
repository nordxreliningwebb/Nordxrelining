const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');
css = css.replace('color: #64748B;', '/* color: #64748B; */');
fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Fixed .legal-date color');
