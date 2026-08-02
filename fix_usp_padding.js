const fs = require('fs');
const cssFile = 'public/style.css';
let css = fs.readFileSync(cssFile, 'utf8');

const newRule = `
/* Align USP section with navbar on mobile */
@media (max-width: 900px) {
    .usp-section {
        padding-left: 3vw !important;
        padding-right: 3vw !important;
    }
    .usp-container {
        width: 100% !important;
        max-width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
    }
}
@media (max-width: 768px) {
    .usp-section {
        padding-left: calc(3vw + 1rem) !important;
        padding-right: calc(3vw + 1rem) !important;
    }
}
`;

fs.writeFileSync(cssFile, css.trim() + '\n' + newRule, 'utf8');
console.log('Fixed USP section padding');
