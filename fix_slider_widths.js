const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

if (!css.includes('width: 100%; /* injected width */')) {
    css = css.replace('.project-slider-wrapper {', '.project-slider-wrapper {\n    width: 100%; /* injected width */');
    css = css.replace('.project-slider-card {', '.project-slider-card {\n    width: 100%; /* injected width */');
    fs.writeFileSync('public/style.css', css, 'utf8');
    console.log('Injected width 100% into style.css');
} else {
    console.log('Already injected.');
}
