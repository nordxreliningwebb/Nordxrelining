const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const newFilter = `<filter id="organic-dirt" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 40 -20" result="alphaNoise" />
            <feComposite operator="in" in="SourceGraphic" in2="alphaNoise" result="maskedDirt" />
            <feDropShadow in="maskedDirt" dx="0" dy="4" stdDeviation="2" flood-color="#000000" flood-opacity="0.85" />
        </filter>`;

jsContent = jsContent.replace(/<filter id="organic-dirt"[\s\S]*?<\/filter>/, newFilter);

fs.writeFileSync(jsPath, jsContent);
console.log("Updated main.js with high-detail dirt filter.");
