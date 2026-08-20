const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

// Revert accidental url('/%23...') or url("/%23...") to url(%23...)
css = css.replace(/url\(['"]\/\%23([^'"]+)['"]\)/g, 'url(%23$1)');
css = css.replace(/url\(\/\%23([^\)]+)\)/g, 'url(%23$1)');

fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Fixed nested SVG URLs');
