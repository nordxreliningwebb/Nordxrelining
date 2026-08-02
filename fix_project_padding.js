const fs = require('fs');

const cssFile = 'public/style.css';
let css = fs.readFileSync(cssFile, 'utf8');

// Add .projects-preview-container to the reset block
if (css.includes('.landing-text-container,') && !css.includes('.projects-preview-container,')) {
    css = css.replace(
        '.landing-text-container,',
        '.landing-text-container,\n    .projects-preview-container,'
    );
}

// Add .projects-preview-section to the 2rem padding block
if (css.includes('.faq-section,') && !css.includes('.projects-preview-section,')) {
    css = css.replace(
        '.faq-section,',
        '.faq-section,\n    .projects-preview-section,'
    );
}

fs.writeFileSync(cssFile, css, 'utf8');
console.log('Fixed project padding on mobile');
