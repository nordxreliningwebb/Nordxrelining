const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

// --- 1. UPDATE CSS (Duration to 1.5s) ---
const stylePath = path.join(PUBLIC_DIR, 'style.css');
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf8');
    // Replace the 2.0s duration with 1.5s
    css = css.replace(/transition-duration:\s*2\.0s\s*!important;/g, 'transition-duration: 1.5s !important;');
    fs.writeFileSync(stylePath, css, 'utf8');
    console.log('Reduced global transition duration to 1.5s in style.css');
}

// --- 2. UPDATE MAIN.JS (Timer to 1800ms) ---
const mainJsPath = path.join(PUBLIC_DIR, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let js = fs.readFileSync(mainJsPath, 'utf8');
    // Replace the 2400ms timer with 1800ms (1.5s + 300ms buffer)
    js = js.replace(/setTimeout\(\(\) => {\s*el\.classList\.remove\('anim-transitioning'\);\s*},\s*2400\);/g, `setTimeout(() => {
                el.classList.remove('anim-transitioning');
            }, 1800);`);
    fs.writeFileSync(mainJsPath, js, 'utf8');
    console.log('Reduced Transition-Release timer to 1800ms in main.js');
}
