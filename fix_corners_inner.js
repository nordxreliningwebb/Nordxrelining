const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

const oldOverrides = `
.contact-info-card .p-corner { width: 24px; height: 24px; z-index: 21; }
.contact-info-card .p-tl { top: 0; left: 0; border-top-left-radius: 24px; background: radial-gradient(circle 24px at bottom right, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%); }
.contact-info-card .p-tr { top: 0; right: 0; border-top-right-radius: 24px; background: radial-gradient(circle 24px at bottom left, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%); }
.contact-info-card .p-bl { bottom: 0; left: 0; border-bottom-left-radius: 24px; background: radial-gradient(circle 24px at top right, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%); }
.contact-info-card .p-br { bottom: 0; right: 0; border-bottom-right-radius: 24px; background: radial-gradient(circle 24px at top left, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%); }
`.trim();

const newOverrides = `
.contact-info-card .p-corner { width: 24px; height: 24px; z-index: 21; }
.contact-info-card .p-tl { top: 0; left: 0; border-top-left-radius: 24px; background: radial-gradient(circle 24px at bottom right, transparent 0px, transparent 8px, #6b7280 8px, #9ca3af 11.2px, #d1d5db 16px, #f3f4f6 19.2px, #9ca3af 24px); }
.contact-info-card .p-tr { top: 0; right: 0; border-top-right-radius: 24px; background: radial-gradient(circle 24px at bottom left, transparent 0px, transparent 8px, #6b7280 8px, #9ca3af 11.2px, #d1d5db 16px, #f3f4f6 19.2px, #9ca3af 24px); }
.contact-info-card .p-bl { bottom: 0; left: 0; border-bottom-left-radius: 24px; background: radial-gradient(circle 24px at top right, transparent 0px, transparent 8px, #6b7280 8px, #9ca3af 11.2px, #d1d5db 16px, #f3f4f6 19.2px, #9ca3af 24px); }
.contact-info-card .p-br { bottom: 0; right: 0; border-bottom-right-radius: 24px; background: radial-gradient(circle 24px at top left, transparent 0px, transparent 8px, #6b7280 8px, #9ca3af 11.2px, #d1d5db 16px, #f3f4f6 19.2px, #9ca3af 24px); }
`.trim();

if (css.includes(oldOverrides)) {
    css = css.replace(oldOverrides, newOverrides);
    fs.writeFileSync('public/style.css', css, 'utf8');
    console.log('Fixed corner inner radius logic');
} else {
    console.log('Could not find old overrides in style.css');
}
