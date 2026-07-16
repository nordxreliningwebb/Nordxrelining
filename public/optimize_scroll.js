const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// 1. Optimize the SVG filter (Remove feDisplacementMap and second feTurbulence, simplify shadow)
const filterStart = jsContent.indexOf('<filter id="organic-dirt"');
const filterEnd = jsContent.indexOf('</filter>', filterStart) + 9;

if (filterStart !== -1 && filterEnd !== -1) {
    const newFilter = `
        <filter id="organic-dirt" x="-20%" y="-20%" width="140%" height="140%">
            <!-- Faster noise with lower octaves -->
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feColorMatrix in="noise" type="matrix" values="
                0 0 0 0 0 
                0 0 0 0 0 
                0 0 0 0 0 
                0 0 0 8 -4" result="alphaNoise" />
            <feComposite operator="in" in="SourceGraphic" in2="alphaNoise" result="maskedDirt" />
            <!-- Cheaper shadow -->
            <feDropShadow in="maskedDirt" dx="0" dy="10" stdDeviation="4" flood-color="#000000" flood-opacity="0.8" />
        </filter>`;
    jsContent = jsContent.substring(0, filterStart) + newFilter.trim() + jsContent.substring(filterEnd);
}

// 2. Introduce cached scroll variables and remove layout trashing
const varInsertPos = jsContent.indexOf('let pipePathString = \'\';');
jsContent = jsContent.substring(0, varInsertPos) + 
    "let cachedScrollRange = 0;\n    let cachedScrollStartOffset = 0;\n    " + 
    jsContent.substring(varInsertPos);

// In drawPipe, compute the cached values
const cRectInsertPos = jsContent.indexOf('const wrapper = container.querySelector(\'.layout-wrapper\');');
const cachingLogic = `
        const absoluteTop = cRect.top + window.scrollY;
        cachedScrollRange = cRect.height;
        cachedScrollStartOffset = absoluteTop + 200;
        `;
jsContent = jsContent.substring(0, cRectInsertPos) + cachingLogic + jsContent.substring(cRectInsertPos);

// In updateScroll, rename to doUpdateScroll and use cached values
jsContent = jsContent.replace('function updateScroll() {', 'function doUpdateScroll() {');
const scrollCalcOld = `
        const windowHeight = window.innerHeight;
        const cRect = container.getBoundingClientRect();
        
        const scrollRange = cRect.height;
        const scrollStart = cRect.top - (windowHeight / 2) + 200; 
        
        let progress = -scrollStart / scrollRange;`;
        
const scrollCalcNew = `
        const windowHeight = window.innerHeight;
        const currentCenter = window.scrollY + (windowHeight / 2);
        
        let progress = (currentCenter - cachedScrollStartOffset) / cachedScrollRange;`;

jsContent = jsContent.replace(scrollCalcOld, scrollCalcNew.trim());

// Add the throttled updateScroll function and ticking variable
const eventListenersPos = jsContent.indexOf('window.addEventListener(\'resize\', drawPipe);');
const throttlingLogic = `
    let ticking = false;
    function updateScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                doUpdateScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    `;
jsContent = jsContent.substring(0, eventListenersPos) + throttlingLogic + jsContent.substring(eventListenersPos);

fs.writeFileSync(jsPath, jsContent);
console.log("Scroll performance optimized.");
