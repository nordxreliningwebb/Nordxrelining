const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Vi bygger ett helt nytt skript för att byta ut den avancerade (och numera trasiga) Z-rörs-logiken
// mot den nya, prestandaoptimerade vertikala logiken.

const startMarker = jsContent.indexOf('// 1. Background Shadow');
const endMarker = jsContent.indexOf('let ticking = false;', startMarker);

if (startMarker === -1 || endMarker === -1) {
    console.error("Kunde inte hitta markörerna i main.js");
    process.exit(1);
}

const newLogic = `// 1. Background Shadow
    const bgShadow = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bgShadow.setAttribute('fill', '#000000');
    bgShadow.setAttribute('opacity', '0.05');
    bgShadow.setAttribute('style', 'filter: blur(15px);');
    
    // 2. Main Pipe (Single Rect with gradient)
    const pipeBase = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    pipeBase.setAttribute('fill', 'url(#premium-pipe)');
    
    // Inner occlusion shadow
    const innerOcclusion = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    innerOcclusion.setAttribute('fill', 'none');
    innerOcclusion.setAttribute('stroke', '#000000');
    innerOcclusion.setAttribute('stroke-opacity', '0.15');
    innerOcclusion.setAttribute('stroke-width', '20');
    innerOcclusion.setAttribute('style', 'filter: blur(6px);');
    
    // 3. Dirt Group
    const dirtGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    dirtGroup.setAttribute('mask', 'url(#dirt-mask)');
    
    const dirtRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // Randomize the dirt to look organic using the dirt-gradient
    dirtRect.setAttribute('fill', 'url(#dirt-gradient)');
    dirtRect.setAttribute('style', 'filter: url(#organic-dirt);');
    dirtGroup.appendChild(dirtRect);
    
    // Replace the mask definitions to use rects instead of strokes
    const existingMask = document.getElementById('dirt-mask');
    if (existingMask) {
        existingMask.innerHTML = \`
            <rect id="mask-bg" fill="white" />
            <rect id="mask-eraser" fill="black" />
        \`;
    }
    
    // 4. Hose Layers
    const hoseRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hoseRect.setAttribute('fill', '#111827');
    const hoseHighlight = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hoseHighlight.setAttribute('fill', '#475569');
    hoseHighlight.setAttribute('opacity', '0.6');
    const hosePeak = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    hosePeak.setAttribute('fill', '#ffffff');
    hosePeak.setAttribute('opacity', '0.4');

    // Append everything in correct z-index order
    pipeGroup.appendChild(bgShadow);
    pipeGroup.appendChild(pipeBase);
    pipeGroup.appendChild(innerOcclusion);
    pipeGroup.appendChild(dirtGroup);
    pipeGroup.appendChild(hoseRect);
    pipeGroup.appendChild(hoseHighlight);
    pipeGroup.appendChild(hosePeak);

    let startX = 0;
    let startY = 0;

    function drawPipe() {
        if (!container || !introText || !stepsHeading) return;
        
        const cRect = container.getBoundingClientRect();
        const absoluteTop = cRect.top + window.scrollY;
        cachedScrollRange = cRect.height;
        cachedScrollStartOffset = absoluteTop + 200;
        const wrapper = container.querySelector('.layout-wrapper');
        const wrapperRect = wrapper.getBoundingClientRect();
        
        const pipeWidth = 120;
        
        // Rör-startpunkt: I centrum av rör-bilden i sektionen ovanför (som är till höger)
        startX = wrapperRect.left - cRect.left + (wrapperRect.width * 0.75) - (pipeWidth/2); // fallback
        const heroImg = document.querySelector('.swoosh-hero .container > div > div:nth-child(2)');
        if (heroImg) {
            const imgRect = heroImg.getBoundingClientRect();
            // Centrera röret under den runda bilden. startX är rörets vänsterkant.
            startX = imgRect.left + (imgRect.width / 2) - cRect.left - (pipeWidth / 2);
        }

        startY = -350; 
        const endY = cRect.height + 300; 
        totalLength = endY - startY;
        
        // Update all static rects
        [bgShadow, pipeBase, innerOcclusion, dirtRect].forEach(el => {
            el.setAttribute('x', startX);
            el.setAttribute('y', startY);
            el.setAttribute('width', pipeWidth);
            el.setAttribute('height', totalLength);
        });
        
        // Mask backgrounds
        const maskBg = document.getElementById('mask-bg');
        if (maskBg) {
            maskBg.setAttribute('x', startX - 20); // slightly wider to ensure coverage
            maskBg.setAttribute('y', startY);
            maskBg.setAttribute('width', pipeWidth + 40);
            maskBg.setAttribute('height', totalLength);
        }
        
        // Setup hoses horizontally (height is animated)
        const hoseWidth = 14;
        hoseRect.setAttribute('x', startX + (pipeWidth / 2) - (hoseWidth / 2));
        hoseRect.setAttribute('y', startY);
        hoseRect.setAttribute('width', hoseWidth);
        
        hoseHighlight.setAttribute('x', startX + (pipeWidth / 2) - 3);
        hoseHighlight.setAttribute('y', startY);
        hoseHighlight.setAttribute('width', 6);
        
        hosePeak.setAttribute('x', startX + (pipeWidth / 2) - 1);
        hosePeak.setAttribute('y', startY);
        hosePeak.setAttribute('width', 2);
        
        updateScroll();
    }
    
    let isSpraying = false;
    let sprayTimeout = null;
    let lastScrollPos = window.scrollY;

    function doUpdateScroll() {
        if (totalLength === 0) return;
        const windowHeight = window.innerHeight;
        const currentCenter = window.scrollY + (windowHeight / 2);
        
        let progress = (currentCenter - cachedScrollStartOffset) / cachedScrollRange;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        const currentLength = progress * totalLength;
        const currentY = startY + currentLength;
        
        nozzleGroup.style.opacity = 1;
        nozzleGroup.style.transformOrigin = \`100px -5px\`;
        // Nozzle svg has its center at X=100. We want its center to match startX + 60.
        // So translate = (startX + 60) - 100
        nozzleGroup.style.transform = \`translate(\${startX + 60 - 100}px, \${currentY + 5}px) rotate(0deg)\`;
        
        // Update hose heights
        hoseRect.setAttribute('height', currentLength);
        hoseHighlight.setAttribute('height', currentLength);
        hosePeak.setAttribute('height', currentLength);
        
        // Update mask eraser
        const maskEraser = document.getElementById('mask-eraser');
        if (maskEraser) {
            maskEraser.setAttribute('x', startX - 20);
            maskEraser.setAttribute('y', startY);
            maskEraser.setAttribute('width', 160); // pipeWidth (120) + 40
            maskEraser.setAttribute('height', currentLength + 60); // erase slightly below nozzle
        }

        // Handle spray animation
        const isScrollingDown = window.scrollY > lastScrollPos;
        lastScrollPos = window.scrollY;
        
        if (!isSpraying && progress > 0 && progress < 1) {
            isSpraying = true;
            nozzleGroup.classList.add('is-spraying');
        }
        
        clearTimeout(sprayTimeout);
        sprayTimeout = setTimeout(() => {
            isSpraying = false;
            nozzleGroup.classList.remove('is-spraying');
        }, 150);
    }
    
    `;

jsContent = jsContent.substring(0, startMarker) + newLogic + jsContent.substring(endMarker);

// Let's also revert the organic-dirt filter to use bounding box, as it's now a rect!
jsContent = jsContent.replace(
    '<filter id="organic-dirt" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">',
    '<filter id="organic-dirt" x="-20%" y="-20%" width="140%" height="140%">'
);

fs.writeFileSync(jsPath, jsContent);
console.log("Updated main.js to use native SVG Rects for the vertical pipe.");
