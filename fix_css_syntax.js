const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

const badBlockRegex = /\/\* ============================\n   CONTACT CARD PIPE OVERRIDES\n   ============================ \*\/[\s\S]*$/;

const newBlock = `/* ============================
   CONTACT CARD PIPE OVERRIDES
   ============================ */
.contact-info-card .p-pipe.p-top, .contact-form-card .p-pipe.p-top { top: 0; left: 0; right: 0; height: 16px; }
.contact-info-card .p-pipe.p-bottom, .contact-form-card .p-pipe.p-bottom { bottom: 0; left: 0; right: 0; height: 16px; }
.contact-info-card .p-pipe.p-left, .contact-form-card .p-pipe.p-left { left: 0; top: 0; bottom: 0; width: 16px; }
.contact-info-card .p-pipe.p-right, .contact-form-card .p-pipe.p-right { right: 0; top: 0; bottom: 0; width: 16px; }

.contact-info-card .p-corner, .contact-form-card .p-corner { width: 24px; height: 24px; z-index: 21; }
.contact-info-card .p-tl, .contact-form-card .p-tl { top: 0; left: 0; border-top-left-radius: 24px; background: radial-gradient(circle 24px at bottom right, transparent 0px, transparent 8px, #6b7280 8px, #9ca3af 11.2px, #d1d5db 16px, #f3f4f6 19.2px, #9ca3af 24px); }
.contact-info-card .p-tr, .contact-form-card .p-tr { top: 0; right: 0; border-top-right-radius: 24px; background: radial-gradient(circle 24px at bottom left, transparent 0px, transparent 8px, #6b7280 8px, #9ca3af 11.2px, #d1d5db 16px, #f3f4f6 19.2px, #9ca3af 24px); }
.contact-info-card .p-bl, .contact-form-card .p-bl { bottom: 0; left: 0; border-bottom-left-radius: 24px; background: radial-gradient(circle 24px at top right, transparent 0px, transparent 8px, #6b7280 8px, #9ca3af 11.2px, #d1d5db 16px, #f3f4f6 19.2px, #9ca3af 24px); }
.contact-info-card .p-br, .contact-form-card .p-br { bottom: 0; right: 0; border-bottom-right-radius: 24px; background: radial-gradient(circle 24px at top left, transparent 0px, transparent 8px, #6b7280 8px, #9ca3af 11.2px, #d1d5db 16px, #f3f4f6 19.2px, #9ca3af 24px); }

.contact-info-card .p-muff, .contact-form-card .p-muff { width: 22px; height: 20px; }
.contact-info-card .p-muff::after, .contact-form-card .p-muff::after { width: 4px; height: 24px; }
.contact-info-card .p-muff-v, .contact-form-card .p-muff-v { width: 20px; height: 22px; }
.contact-info-card .p-muff-v::after, .contact-form-card .p-muff-v::after { width: 24px; height: 4px; }
`;

css = css.replace(badBlockRegex, newBlock);
fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Fixed CSS syntax');
