const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');
if (!css.includes('Google Translate Fixes')) {
  css += `\n/* Google Translate Fixes */\nbody { top: 0 !important; }\n.skiptranslate iframe, .goog-te-banner-frame { display: none !important; }\n#goog-gt-tt, .goog-tooltip { display: none !important; }\n.goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }\n`;
  fs.writeFileSync('public/style.css', css);
  console.log('Appended to style.css');
}
