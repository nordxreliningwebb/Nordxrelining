const fs = require('fs');
const cssFile = 'public/style.css';
let css = fs.readFileSync(cssFile, 'utf8');

// Remove the previously appended faulty rule
css = css.replace(/\/\* Align contact form with navbar on mobile \*\/[\s\S]*?@media \(max-width: 768px\) \{[\s\S]*?\}\s*\}/, '');

const newRule = `
/* Align contact form with navbar on mobile */
@media (max-width: 900px) {
    .contact-hero-section {
        padding-left: 3vw !important;
        padding-right: 3vw !important;
    }
    .contact-container, .contact-main-grid {
        width: 100% !important;
        max-width: 100% !important;
    }
}
@media (max-width: 768px) {
    .contact-hero-section {
        padding-left: calc(3vw + 1rem) !important;
        padding-right: calc(3vw + 1rem) !important;
    }
}
`;

fs.writeFileSync(cssFile, css.trim() + '\n' + newRule, 'utf8');
console.log('Fixed contact form padding and widths');
