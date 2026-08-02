const fs = require('fs');
const cssFile = 'public/style.css';

const newRule = `
/* Align contact form with navbar on mobile */
@media (max-width: 768px) {
    .contact-hero-section {
        padding-left: calc(3vw + 1rem) !important;
        padding-right: calc(3vw + 1rem) !important;
    }
}
`;

fs.appendFileSync(cssFile, newRule, 'utf8');
console.log('Appended padding override for contact section');
