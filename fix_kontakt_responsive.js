const fs = require('fs');

// 1. Revert inline grid styles in page.tsx
let tsx = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');
tsx = tsx.replace(
    /<div className="contact-main-grid"[^>]*>/,
    '<div className="contact-main-grid">'
);
fs.writeFileSync('src/app/kontakt/page.tsx', tsx, 'utf8');

// 2. Append proper CSS to style.css
const newCSS = `

/* ============================
   KONTAKTSIDA - CSS OVERRIDES
   ============================ */
.contact-main-grid {
    display: grid !important;
    grid-template-columns: 1fr 1.5fr !important;
    max-width: 1200px !important;
    margin: 0 auto !important;
    gap: 4rem !important;
    align-items: stretch !important;
}

@media (max-width: 900px) {
    .contact-main-grid {
        grid-template-columns: 1fr !important;
        gap: 2rem !important;
    }
}
`;

let css = fs.readFileSync('public/style.css', 'utf8');
if (!css.includes('KONTAKTSIDA - CSS OVERRIDES')) {
    fs.appendFileSync('public/style.css', newCSS);
}
console.log('Fixed CSS responsiveness for contact page');
