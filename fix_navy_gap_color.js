const fs = require('fs');
const cssFile = 'public/style.css';

let css = fs.readFileSync(cssFile, 'utf8');

// Replace the white background with the beige background in the recently added rule
css = css.replace(/body\.about-page,[\s\S]*?body\.contact-page,[\s\S]*?body\.journal-page\s*\{\s*background-color:\s*#ffffff\s*!important;\s*\}/, 
`body.about-page, 
body.contact-page, 
body.journal-page {
    background-color: #faf8f5 !important;
}`);

fs.writeFileSync(cssFile, css, 'utf8');
console.log('Fixed gap color to beige');
