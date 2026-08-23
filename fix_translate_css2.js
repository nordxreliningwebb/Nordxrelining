const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');
css += `\n/* Hide floating translate widget */\ndiv.skiptranslate { display: none !important; visibility: hidden !important; }\n.VIpgJd-ZVi9od-aZ2wEe-wOHMyf { display: none !important; }\n.goog-te-spinner-pos { display: none !important; }\n`;
fs.writeFileSync('public/style.css', css);
console.log('Appended to style.css');
