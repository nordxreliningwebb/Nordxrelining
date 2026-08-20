const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');
css = css.replace(/url\(\s*(['\"`]?)(?!data:|http|\/)([^'\"`)]+)\1\s*\)/g, 'url($1/$2$1)');
fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Fixed URLs');
