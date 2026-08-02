const fs = require('fs');
const cssFile = 'public/style.css';

const newCss = `
/* Fix navy gap under header for non-home pages */
body.about-page, 
body.contact-page, 
body.journal-page {
    background-color: #ffffff !important;
}
`;

fs.appendFileSync(cssFile, newCss, 'utf8');
console.log('Fixed navy gap');
