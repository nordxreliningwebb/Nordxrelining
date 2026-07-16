const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Replace the filter
const oldFilterRegex = /<filter id="organic-dirt"[\s\S]*?<\/filter>/;
const newFilter = `
        <filter id="organic-dirt" x="-50%" y="-50%" width="200%" height="200%">
            <!-- 1. Generate big organic noise clouds -->
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" />
            
            <!-- 2. Boost contrast to create irregular solid clumps and empty spaces -->
            <feColorMatrix in="noise" type="matrix" values="
                0 0 0 0 0 
                0 0 0 0 0 
                0 0 0 0 0 
                0 0 0 8 -4" result="alphaNoise" />
                
            <!-- 3. Mask the solid dirt stroke with these organic clumps -->
            <feComposite operator="in" in="SourceGraphic" in2="alphaNoise" result="maskedDirt" />
            
            <!-- 4. Add small displacement to make the remaining edges look ragged and torn -->
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" result="edgeNoise" />
            <feDisplacementMap in="maskedDirt" in2="edgeNoise" scale="15" xChannelSelector="R" yChannelSelector="G" result="displacedDirt" />

            <!-- 5. Add heavy drop shadow for a 3D buildup look -->
            <feDropShadow in="displacedDirt" dx="0" dy="15" stdDeviation="8" flood-color="#000000" flood-opacity="0.9" />
        </filter>
`;
jsContent = jsContent.replace(oldFilterRegex, newFilter.trim());

// Update the dirt paths
// We want to remove the stroke-dasharray from dirtBase and dirtDetail so they are continuous lines,
// allowing the noise filter to create the gaps.
const dirtBaseRegex = /dirtBase\.setAttribute\('stroke-dasharray',\s*'[^']+'\);/g;
jsContent = jsContent.replace(dirtBaseRegex, "dirtBase.setAttribute('stroke-dasharray', 'none');");

const dirtDetailRegex = /dirtDetail\.setAttribute\('stroke-dasharray',\s*'[^']+'\);/g;
jsContent = jsContent.replace(dirtDetailRegex, "dirtDetail.setAttribute('stroke-dasharray', 'none');");

// We should also increase the stroke-width of dirtBase slightly so it really sticks to the walls
jsContent = jsContent.replace(/dirtBase\.setAttribute\('stroke-width',\s*'100'\);/, "dirtBase.setAttribute('stroke-width', '118');");

fs.writeFileSync(jsPath, jsContent);
console.log("Updated main.js with organic noise mask for dirt.");
