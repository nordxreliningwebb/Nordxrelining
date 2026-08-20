const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

// Find the block I added
const startIndex = css.indexOf('/* ============================\n   GLOBAL PIPE FRAME STYLES');
if (startIndex !== -1) {
    // Remove it
    css = css.substring(0, startIndex);
    
    // Add back just the overrides for the contact card
    const contactCardOverrides = `
/* ============================
   CONTACT CARD PIPE OVERRIDES
   ============================ */
.contact-info-card .p-pipe.p-top { top: 0; left: 0; right: 0; height: 16px; }
.contact-info-card .p-pipe.p-bottom { bottom: 0; left: 0; right: 0; height: 16px; }
.contact-info-card .p-pipe.p-left { left: 0; top: 0; bottom: 0; width: 16px; }
.contact-info-card .p-pipe.p-right { right: 0; top: 0; bottom: 0; width: 16px; }

.contact-info-card .p-corner { width: 16px; height: 16px; }
.contact-info-card .p-tl { top: 0; left: 0; border-top-left-radius: 24px; }
.contact-info-card .p-tr { top: 0; right: 0; border-top-right-radius: 24px; }
.contact-info-card .p-bl { bottom: 0; left: 0; border-bottom-left-radius: 24px; }
.contact-info-card .p-br { bottom: 0; right: 0; border-bottom-right-radius: 24px; }

.contact-info-card .p-muff { width: 22px; height: 20px; }
.contact-info-card .p-muff::after { width: 4px; height: 24px; }
.contact-info-card .p-muff-v { width: 20px; height: 22px; }
.contact-info-card .p-muff-v::after { width: 24px; height: 4px; }
`;
    
    css += contactCardOverrides;
    fs.writeFileSync('public/style.css', css, 'utf8');
    console.log('Restored global pipes and applied local overrides');
} else {
    console.log('Could not find the block I added');
}
