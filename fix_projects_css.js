const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

css = css.replace(
    /\.projects-preview-container \{\s*max-width: 1000px;/g,
    '.projects-preview-container {\n    max-width: 1300px;'
);

css = css.replace(
    /(\.project-slider-card \{[\s\S]*?)background: #1e293b;/g,
    '$1background: #0284c7;'
);

css = css.replace(
    /(\.project-slider-card \{[\s\S]*?)min-height: 350px;/g,
    '$1min-height: 500px;'
);

css = css.replace(
    /(\.project-slider-image \{[\s\S]*?)min-height: 300px;/g,
    '$1min-height: 500px;'
);

// Add the text-transform override
if (!css.includes('.projects-preview-section .section-title')) {
    css = css.replace(
        /.projects-preview-section \{/,
        '.projects-preview-section .section-title {\n    text-transform: none !important;\n}\n.projects-preview-section {'
    );
}

fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Updated style.css');
