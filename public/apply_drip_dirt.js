const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// 1. Ersätt dirt gradient
const oldGrad = `<stop offset="0%" stop-color="#1f1610" stop-opacity="0.95" />
            <stop offset="15%" stop-color="#2a2018" stop-opacity="0.75" />
            <stop offset="50%" stop-color="#3d2f25" stop-opacity="0.25" />
            <stop offset="85%" stop-color="#2a2018" stop-opacity="0.75" />
            <stop offset="100%" stop-color="#1f1610" stop-opacity="0.95" />`;

const newGrad = `<stop offset="0%" stop-color="#1c110a" stop-opacity="1.0" />
            <stop offset="15%" stop-color="#3b200b" stop-opacity="0.85" />
            <stop offset="35%" stop-color="#5c381c" stop-opacity="0.6" />
            <stop offset="50%" stop-color="#4a3120" stop-opacity="0.25" />
            <stop offset="65%" stop-color="#5c381c" stop-opacity="0.6" />
            <stop offset="85%" stop-color="#3b200b" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#1c110a" stop-opacity="1.0" />`;

jsContent = jsContent.replace(oldGrad, newGrad);

// 2. Ersätt dirt filter
const newFilter = `<filter id="organic-dirt" x="-20%" y="-20%" width="140%" height="140%">
            <!-- X=0.03, Y=0.003 skapar långa vertikala strimmor av smuts istället för runda prickar -->
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.003" numOctaves="3" result="noise" />
            <!-- Mjukare kontrast för att se ut som smet och olja -->
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 6 -2.5" result="alphaNoise" />
            <feComposite operator="in" in="SourceGraphic" in2="alphaNoise" result="maskedDirt" />
            <feDropShadow in="maskedDirt" dx="0" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.7" />
        </filter>`;

jsContent = jsContent.replace(/<filter id="organic-dirt"[\s\S]*?<\/filter>/, newFilter);

fs.writeFileSync(jsPath, jsContent);
console.log("Updated dirt with vertical streaks and rust/grease colors.");
