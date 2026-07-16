const fs = require('fs');
const path = require('path');

// 1. Update main.js
const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const oldJsLogic = `
        const startX = wrapperRect.left - cRect.left + 40; 
`;
const newJsLogic = `
        let startX = wrapperRect.left - cRect.left + 60; 
        const heroCard = document.querySelector('.swoosh-hero .container > div > div:first-child');
        if (heroCard) {
            const heroRect = heroCard.getBoundingClientRect();
            // Den VÄNSTRA sidan av röret (startX - 60) ska linjera med VÄNSTRA kanten av rutan.
            // Alltså ska rörets mittpunkt (startX) vara 60 pixlar in från rutans vänsterkant.
            startX = heroRect.left - cRect.left + 60;
        }
`;

jsContent = jsContent.replace(oldJsLogic.trim(), newJsLogic.trim());

fs.writeFileSync(jsPath, jsContent);
console.log("Updated startX to align pipe's left edge with white card's left edge.");

// 2. Update stamspolning.html
const htmlPath = path.join(__dirname, 'stamspolning.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Widen the intro text block so it reaches the middle of the white card (leftwards)
// while keeping margin-left: auto to anchor the right edge.
htmlContent = htmlContent.replace(
    /class="intro-text-block" id="intro-text" style="max-width: 850px;/g,
    'class="intro-text-block" id="intro-text" style="max-width: 1060px;'
);

fs.writeFileSync(htmlPath, htmlContent);
console.log("Updated intro-text-block to max-width: 1060px.");
