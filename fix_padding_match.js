const fs = require('fs');
const cssFile = 'public/style.css';
let css = fs.readFileSync(cssFile, 'utf8');

const newRule = `
/* Override project section padding to match FAQ 95% width */
@media (max-width: 900px) {
    .projects-preview-section {
        padding-left: 2.5vw !important;
        padding-right: 2.5vw !important;
    }
}
`;

fs.appendFileSync(cssFile, newRule, 'utf8');
console.log('Appended padding override');
