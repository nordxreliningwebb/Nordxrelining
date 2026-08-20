const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

// 1. Remove overflow: hidden from .contact-info-card
css = css.replace(/\.contact-info-card \{\r?\n\s*position: relative;\r?\n\s*border-radius: 32px;\r?\n\s*overflow: hidden;/, '.contact-info-card {\n      position: relative;\n      border-radius: 32px;\n      /* overflow: hidden; Removed to allow pipe muffs to spill */');

// 2. Fix straight pipes crossing into the corners
const oldPipes = `
.contact-info-card .p-pipe.p-top, .contact-form-card .p-pipe.p-top { top: 0; left: 0; right: 0; height: 16px; }
.contact-info-card .p-pipe.p-bottom, .contact-form-card .p-pipe.p-bottom { bottom: 0; left: 0; right: 0; height: 16px; }
.contact-info-card .p-pipe.p-left, .contact-form-card .p-pipe.p-left { left: 0; top: 0; bottom: 0; width: 16px; }
.contact-info-card .p-pipe.p-right, .contact-form-card .p-pipe.p-right { right: 0; top: 0; bottom: 0; width: 16px; }
`.trim();

const newPipes = `
.contact-info-card .p-pipe.p-top, .contact-form-card .p-pipe.p-top { top: 0; left: 24px; right: 24px; height: 16px; }
.contact-info-card .p-pipe.p-bottom, .contact-form-card .p-pipe.p-bottom { bottom: 0; left: 24px; right: 24px; height: 16px; }
.contact-info-card .p-pipe.p-left, .contact-form-card .p-pipe.p-left { left: 0; top: 24px; bottom: 24px; width: 16px; }
.contact-info-card .p-pipe.p-right, .contact-form-card .p-pipe.p-right { right: 0; top: 24px; bottom: 24px; width: 16px; }
`.trim();

css = css.replace(oldPipes, newPipes);

fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Fixed straight pipes and removed overflow:hidden from info card CSS');
