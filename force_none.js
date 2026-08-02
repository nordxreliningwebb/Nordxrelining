const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('public').filter(f => f.endsWith('.html'));

for (let f of files) {
    const filePath = path.join('public', f);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (html.includes('/* removed uppercase */')) {
        html = html.replace(/\/\* removed uppercase \*\/(?:important;)?/g, 'text-transform: none !important;');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Forced text-transform none in: ' + f);
    }
}

const cssFile = 'public/style.css';
let css = fs.readFileSync(cssFile, 'utf8');
if (css.includes('/* removed uppercase */')) {
    css = css.replace(/\/\* removed uppercase \*\/(?:important;)?/g, 'text-transform: none !important;');
    fs.writeFileSync(cssFile, css, 'utf8');
    console.log('Forced text-transform none in style.css');
}

// Add global fallback just in case
fs.appendFileSync(cssFile, '\n/* Global force no uppercase for CTA buttons */\n.cta-btn-header-match, .cta-buttons a, .cta-section a, .nordx-landing-cta a { text-transform: none !important; }\n', 'utf8');
