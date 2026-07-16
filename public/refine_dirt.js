const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// 1. Replace the dirt filter
const newFilter = `<filter id="organic-dirt" x="-20%" y="-20%" width="140%" height="140%">
            <!-- Detailed, gritty noise, slightly smaller frequency for realistic patches -->
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" result="noise" />
            <!-- Soft contrast to create smudges and smears instead of hard stickers -->
            <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.5 -0.8" result="alphaNoise" />
            <feComposite operator="in" in="SourceGraphic" in2="alphaNoise" result="maskedDirt" />
            <feDropShadow in="maskedDirt" dx="0" dy="1" stdDeviation="1" flood-color="#000000" flood-opacity="0.4" />
        </filter>`;

jsContent = jsContent.replace(/<filter id="organic-dirt"[\s\S]*?<\/filter>/, newFilter);

// 2. Replace the dirtRect fill logic to use a custom realistic gradient and multiply blend mode
const oldDirtRectLogic = `const dirtRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // Randomize the dirt to look organic using the dirt-gradient
    dirtRect.setAttribute('fill', 'url(#dirt-gradient)');
    dirtRect.setAttribute('style', 'filter: url(#organic-dirt);');
    dirtGroup.appendChild(dirtRect);`;

const newDirtRectLogic = `
    // Skapa en realistisk gradient där smutsen är tjockast på sidorna (rörväggarna) och tunnare i mitten
    const pipeDefs = document.getElementById('dynamic-pipe-defs');
    if (pipeDefs && !document.getElementById('realistic-dirt-grad')) {
        const dirtGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        dirtGradient.setAttribute('id', 'realistic-dirt-grad');
        dirtGradient.innerHTML = \`
            <stop offset="0%" stop-color="#1f1610" stop-opacity="0.95" />
            <stop offset="15%" stop-color="#2a2018" stop-opacity="0.75" />
            <stop offset="50%" stop-color="#3d2f25" stop-opacity="0.25" />
            <stop offset="85%" stop-color="#2a2018" stop-opacity="0.75" />
            <stop offset="100%" stop-color="#1f1610" stop-opacity="0.95" />
        \`;
        pipeDefs.appendChild(dirtGradient);
    }

    const dirtRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    dirtRect.setAttribute('fill', 'url(#realistic-dirt-grad)');
    // mix-blend-mode: multiply gör att metallens blänk lyser igenom smutsen för fotorealism
    dirtRect.setAttribute('style', 'filter: url(#organic-dirt); mix-blend-mode: multiply;');
    dirtGroup.appendChild(dirtRect);`;

// Function to normalize string for comparison
function normalize(str) {
    return str.replace(/\s+/g, ' ').trim();
}

const jsNorm = normalize(jsContent);
const oldNorm = normalize(oldDirtRectLogic);

if (jsNorm.includes(oldNorm)) {
    // Escape regex characters except whitespace for matching
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^$\/{}()|[\\]\\\\]/g, '\\\\$&');
    }
    
    // We do a manual indexOf replace since regex with whitespace can be tricky
    const startIdx = jsNorm.indexOf(oldNorm);
    if(startIdx !== -1) {
        // Let's use a simpler replace
        jsContent = jsContent.replace(
            /const dirtRect = document\.createElementNS\('http:\/\/www\.w3\.org\/2000\/svg', 'rect'\);[\s\S]*?dirtGroup\.appendChild\(dirtRect\);/,
            newDirtRectLogic
        );
        fs.writeFileSync(jsPath, jsContent);
        console.log("Updated main.js with realistic dirt rendering.");
    }
} else {
    // Try regex replace anyway
    jsContent = jsContent.replace(
        /const dirtRect = document\.createElementNS\('http:\/\/www\.w3\.org\/2000\/svg', 'rect'\);[\s\S]*?dirtGroup\.appendChild\(dirtRect\);/,
        newDirtRectLogic
    );
    fs.writeFileSync(jsPath, jsContent);
    console.log("Updated main.js with realistic dirt rendering (via regex fallback).");
}
