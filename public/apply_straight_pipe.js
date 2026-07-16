const fs = require('fs');
const path = require('path');

// 1. Update stamspolning.html
const htmlPath = path.join(__dirname, 'stamspolning.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Left-align intro text block and set width to 700px
htmlContent = htmlContent.replace(
    /class="intro-text-block" id="intro-text" style="max-width: 1060px; margin-left: auto; margin-right: 0;/g,
    'class="intro-text-block" id="intro-text" style="max-width: 700px; margin-left: 0; margin-right: auto;'
);

// Set steps text block to 700px
htmlContent = htmlContent.replace(
    /class="steps-text-block" id="steg-for-steg-heading" style="max-width: 850px;/g,
    'class="steps-text-block" id="steg-for-steg-heading" style="max-width: 700px;'
);

fs.writeFileSync(htmlPath, htmlContent);
console.log("Updated stamspolning.html to left-align text blocks in a clean column.");

// 2. Update main.js
const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const targetLogicStart = jsContent.indexOf('let startX = wrapperRect.left');
const targetLogicEnd = jsContent.indexOf('const cleanPipeBase = document.getElementById(\'clean-pipe-base\');');

if (targetLogicStart !== -1 && targetLogicEnd !== -1) {
    const newLogic = `
        // Rör-startpunkt: I centrum av rör-bilden i sektionen ovanför (som är till höger)
        let startX = wrapperRect.left - cRect.left + (wrapperRect.width * 0.75); // fallback
        const heroImg = document.querySelector('.swoosh-hero .container > div > div:nth-child(2)');
        if (heroImg) {
            const imgRect = heroImg.getBoundingClientRect();
            // Centrera röret under den runda bilden
            startX = imgRect.left + (imgRect.width / 2) - cRect.left;
        }

        const startY = -350; 
        const endY = cRect.height + 300; 
        
        // En spikrak linje ner
        let pipePathString = \`M \${startX} \${startY} L \${startX} \${endY}\`;
        
        `;
        
    jsContent = jsContent.substring(0, targetLogicStart) + newLogic + jsContent.substring(targetLogicEnd);
    fs.writeFileSync(jsPath, jsContent);
    console.log("Updated main.js to draw a straight pipe anchored to the hero image.");
} else {
    console.error("Could not find the target logic in main.js to replace!");
}
