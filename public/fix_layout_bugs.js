const fs = require('fs');
const path = require('path');

// 1. Fix stamspolning.html text blocks
const htmlPath = path.join(__dirname, 'stamspolning.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

htmlContent = htmlContent.replace(
    'class="intro-text-block" id="intro-text" style="max-width: 1060px; margin-left: auto; margin-bottom: 8rem;"',
    'class="intro-text-block" id="intro-text" style="max-width: 650px; margin-right: auto; margin-left: 0; margin-bottom: 8rem;"'
);

htmlContent = htmlContent.replace(
    'class="steps-text-block" id="steg-for-steg-heading" style="max-width: 700px; margin-right: auto; margin-bottom: 4rem;"',
    'class="steps-text-block" id="steg-for-steg-heading" style="max-width: 650px; margin-right: auto; margin-left: 0; margin-bottom: 4rem;"'
);

fs.writeFileSync(htmlPath, htmlContent);
console.log("Updated stamspolning.html to truly left-align text blocks.");

// 2. Fix main.js SVG filter
const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

jsContent = jsContent.replace(
    '<filter id="organic-dirt" x="-20%" y="-20%" width="140%" height="140%">',
    '<filter id="organic-dirt" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">'
);

fs.writeFileSync(jsPath, jsContent);
console.log("Updated main.js to fix SVG filter bounding box issue.");
