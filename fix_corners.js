const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

const oldCorners = `
.contact-info-card .p-corner { width: 16px; height: 16px; }
.contact-info-card .p-tl { top: 0; left: 0; border-top-left-radius: 24px; }
.contact-info-card .p-tr { top: 0; right: 0; border-top-right-radius: 24px; }
.contact-info-card .p-bl { bottom: 0; left: 0; border-bottom-left-radius: 24px; }
.contact-info-card .p-br { bottom: 0; right: 0; border-bottom-right-radius: 24px; }`;

const newCorners = `
.contact-info-card .p-corner { width: 24px; height: 24px; z-index: 21; }
.contact-info-card .p-tl { top: 0; left: 0; border-top-left-radius: 24px; background: radial-gradient(circle 24px at bottom right, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%); }
.contact-info-card .p-tr { top: 0; right: 0; border-top-right-radius: 24px; background: radial-gradient(circle 24px at bottom left, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%); }
.contact-info-card .p-bl { bottom: 0; left: 0; border-bottom-left-radius: 24px; background: radial-gradient(circle 24px at top right, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%); }
.contact-info-card .p-br { bottom: 0; right: 0; border-bottom-right-radius: 24px; background: radial-gradient(circle 24px at top left, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%); }`;

css = css.replace(oldCorners.trim(), newCorners.trim());
fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Fixed corners in style.css');
