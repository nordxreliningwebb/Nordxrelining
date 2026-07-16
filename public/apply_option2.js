const fs = require('fs');
const path = require('path');

// 1. Update main.js
const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const oldJsLogic = `
        let startX = wrapperRect.left - cRect.left + 60;
        const heroCard = document.querySelector('.swoosh-hero .container > div > div:first-child');
        if (heroCard) {
            const heroRect = heroCard.getBoundingClientRect();
            startX = heroRect.left + (heroRect.width / 2) - cRect.left;
        }
`;
const newJsLogic = `
        // Placera i den absoluta vänsterkanten av containern
        const startX = wrapperRect.left - cRect.left + 40; 
`;

jsContent = jsContent.replace(oldJsLogic.trim(), newJsLogic.trim());

// Update turn2X
jsContent = jsContent.replace(
    'const turn2X = wrapperRect.right - cRect.left - 60;',
    'const turn2X = wrapperRect.right - cRect.left - 40;'
);

fs.writeFileSync(jsPath, jsContent);
console.log("Updated main.js to push pipe to margins.");

// 2. Update stamspolning.html
const htmlPath = path.join(__dirname, 'stamspolning.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Update max-widths for text blocks
htmlContent = htmlContent.replace(
    /class="intro-text-block"[^>]*style="max-width: 650px;/g,
    'class="intro-text-block" id="intro-text" style="max-width: 850px;'
);

htmlContent = htmlContent.replace(
    /class="steps-text-block"[^>]*style="max-width: 650px;/g,
    'class="steps-text-block" id="steg-for-steg-heading" style="max-width: 850px;'
);

fs.writeFileSync(htmlPath, htmlContent);
console.log("Updated stamspolning.html to widen text blocks.");
