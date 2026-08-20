const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

// Replace url('filename.ext') with url('/filename.ext')
// Also handles url("filename.ext") and url(filename.ext)
// Skips data:, http:, https:, and already absolute /
css = css.replace(/url\(\s*['"]?(?!data:|http:|https:|\/)([^'"]+)['"]?\s*\)/g, "url('/$1')");

fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Fixed CSS URLs');
