const fs = require('fs');

let css = fs.readFileSync('public/style.css', 'utf8');

const fixCSS = `
/* Global fix for mobile gap below header on all remaining subpages */
@media (max-width: 900px) {
    .hero-enterprise, 
    .journal-hero-wrapper, 
    .legal-page-wrapper, 
    .about-hero-redesign,
    .calc-main {
        margin-top: -85px !important;
    }
    .global-subpage-hero {
        padding-top: 225px !important; /* Original 140px + 85px */
    }
    .journal-hero {
        padding-top: 265px !important; /* Original 180px + 85px */
    }
    .legal-page-wrapper {
        padding-top: 245px !important; /* Original 160px + 85px */
    }
    .calc-main {
        padding-top: 105px !important; /* Push down content to avoid overlap */
    }
}
`;

if (!css.includes('/* Global fix for mobile gap below header on all remaining subpages */')) {
    css += fixCSS;
    fs.writeFileSync('public/style.css', css, 'utf8');
    console.log('Fixed gaps globally in style.css');
} else {
    console.log('Already fixed in style.css');
}
