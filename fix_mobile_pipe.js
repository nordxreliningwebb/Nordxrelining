const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

const fixCSS = `
/* Fix pipe frame overflow on mobile */
@media (max-width: 768px) {
    .pipe-popup-wrapper {
        width: calc(100% - 52px) !important;
        margin: 0 auto !important;
    }
}
`;

css += fixCSS;
fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Fixed pipe overflow for mobile');
