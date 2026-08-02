const fs = require('fs');

const cssFile = 'public/style.css';
let css = fs.readFileSync(cssFile, 'utf8');

const newCss = `
/* Hero buttons side-by-side on mobile */
@media (max-width: 480px) {
    .hero-buttons-container {
        flex-wrap: nowrap !important;
        gap: 8px !important;
        width: 100%;
        justify-content: space-between;
    }
    .hero-buttons-container a {
        flex: 1;
        padding: 0.8rem 0.2rem !important;
        font-size: clamp(0.7rem, 3.5vw, 0.95rem) !important;
        text-align: center;
        white-space: nowrap;
        width: auto !important;
    }
}
`;

if (!css.includes('.hero-buttons-container {')) {
    fs.appendFileSync(cssFile, newCss, 'utf8');
    console.log('Added CSS for hero buttons on mobile');
}
