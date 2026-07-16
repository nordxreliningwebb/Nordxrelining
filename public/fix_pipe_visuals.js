const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// We need to completely replace the DYNAMIC RESPONSIVE PIPE ANIMATION block in main.js.
// Let's find the block and replace it.
const blockStart = jsContent.indexOf('/* =====================================================\r\n   DYNAMIC RESPONSIVE PIPE ANIMATION (STAMSPOLNING)');
if (blockStart === -1) {
    // try with \n only
    const blockStartUnix = jsContent.indexOf('/* =====================================================\n   DYNAMIC RESPONSIVE PIPE ANIMATION (STAMSPOLNING)');
    if (blockStartUnix !== -1) {
        jsContent = jsContent.substring(0, blockStartUnix);
    }
} else {
    jsContent = jsContent.substring(0, blockStart);
}

const newPipeScript = `
/* =====================================================
   DYNAMIC RESPONSIVE PIPE ANIMATION (STAMSPOLNING)
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const pipeGroup = document.getElementById('dynamic-pipe-group');
    const nozzleGroup = document.getElementById('dynamic-nozzle');
    const pipeDefs = document.getElementById('dynamic-pipe-defs');
    if (!pipeGroup || !nozzleGroup || !pipeDefs) return;

    const container = document.getElementById('stamspolning-content');
    const introText = document.getElementById('intro-text');
    const stepsHeading = document.getElementById('steg-for-steg-heading');
    
    let pipePathString = '';
    let totalLength = 0;
    const nozzlePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Add organic filter for dirt
    pipeDefs.innerHTML += \`
        <filter id="organic-dirt" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feDropShadow in="displaced" dx="0" dy="12" stdDeviation="6" flood-color="#000000" flood-opacity="0.8" />
        </filter>
        <mask id="dirt-mask">
            <!-- White reveals everything -->
            <path id="mask-bg" stroke="white" stroke-width="160" fill="none" stroke-linecap="butt" stroke-linejoin="round" />
            <!-- Black hides everything (this will be animated to erase the dirt) -->
            <path id="mask-eraser" stroke="black" stroke-width="160" fill="none" stroke-linecap="butt" stroke-linejoin="round" />
        </mask>
    \`;

    // 1. Background Shadow
    const bgShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bgShadow.setAttribute('fill', 'none');
    bgShadow.setAttribute('stroke', '#000000');
    bgShadow.setAttribute('stroke-opacity', '0.05');
    bgShadow.setAttribute('stroke-width', '160');
    bgShadow.setAttribute('style', 'filter: blur(15px);');
    
    // 2. 3D Pipe Layers (Symmetrical Cylinder Effect)
    const pipeLayers = [
        { width: '120', color: '#64748b' }, // Outer dark edge
        { width: '110', color: '#94a3b8' },
        { width: '90', color: '#cbd5e1' },
        { width: '70', color: '#e2e8f0' },
        { width: '40', color: '#f8fafc' },
        { width: '15', color: '#ffffff', opacity: '0.8' } // Center highlight
    ];
    
    const pipeElements = [];
    pipeLayers.forEach(layer => {
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('fill', 'none');
        p.setAttribute('stroke', layer.color);
        p.setAttribute('stroke-width', layer.width);
        if (layer.opacity) p.setAttribute('opacity', layer.opacity);
        p.setAttribute('stroke-linecap', 'butt');
        p.setAttribute('stroke-linejoin', 'round');
        pipeElements.push(p);
    });

    // Inner occlusion shadow for hollow look
    const innerOcclusion = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    innerOcclusion.setAttribute('fill', 'none');
    innerOcclusion.setAttribute('stroke', '#000000');
    innerOcclusion.setAttribute('stroke-opacity', '0.15');
    innerOcclusion.setAttribute('stroke-width', '20');
    innerOcclusion.setAttribute('style', 'filter: blur(6px);');
    
    // 3. Dirt Group (with mask)
    const dirtGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    dirtGroup.setAttribute('mask', 'url(#dirt-mask)');
    
    // Organic Dirt Layers
    const dirtBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dirtBase.setAttribute('fill', 'none');
    dirtBase.setAttribute('stroke', '#3d2518');
    dirtBase.setAttribute('stroke-width', '100');
    dirtBase.setAttribute('stroke-dasharray', '80 350 120 400 300 250');
    dirtBase.setAttribute('stroke-linecap', 'butt'); // using butt with displacement makes it look torn!
    dirtBase.setAttribute('style', 'filter: url(#organic-dirt);');
    
    const dirtDetail = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dirtDetail.setAttribute('fill', 'none');
    dirtDetail.setAttribute('stroke', '#5c3a21');
    dirtDetail.setAttribute('stroke-width', '80');
    dirtDetail.setAttribute('stroke-dasharray', '80 350 120 400 300 250');
    dirtDetail.setAttribute('stroke-linecap', 'butt');
    dirtDetail.setAttribute('style', 'filter: url(#organic-dirt);');

    dirtGroup.appendChild(dirtBase);
    dirtGroup.appendChild(dirtDetail);

    // 4. Hose Layers
    const hoseBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hoseBase.setAttribute('fill', 'none');
    hoseBase.setAttribute('stroke', '#111827');
    hoseBase.setAttribute('stroke-width', '14');
    
    const hoseHighlight = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hoseHighlight.setAttribute('fill', 'none');
    hoseHighlight.setAttribute('stroke', '#475569');
    hoseHighlight.setAttribute('stroke-width', '6');
    hoseHighlight.setAttribute('opacity', '0.6');
    
    const hosePeak = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hosePeak.setAttribute('fill', 'none');
    hosePeak.setAttribute('stroke', '#ffffff');
    hosePeak.setAttribute('stroke-width', '1.5');
    hosePeak.setAttribute('opacity', '0.4');

    // Append everything in correct z-index order
    pipeGroup.appendChild(bgShadow);
    pipeElements.forEach(p => pipeGroup.appendChild(p));
    pipeGroup.appendChild(innerOcclusion);
    pipeGroup.appendChild(dirtGroup);
    pipeGroup.appendChild(hoseBase);
    pipeGroup.appendChild(hoseHighlight);
    pipeGroup.appendChild(hosePeak);

    function drawPipe() {
        if (!container || !introText || !stepsHeading) return;
        
        const cRect = container.getBoundingClientRect();
        const introRect = introText.getBoundingClientRect();
        const stepsRect = stepsHeading.getBoundingClientRect();
        
        const wrapper = container.querySelector('.layout-wrapper');
        const wrapperRect = wrapper.getBoundingClientRect();
        
        const startX = wrapperRect.left - cRect.left + 60; 
        const startY = -100; 
        
        const turn1Y = stepsRect.top - cRect.top - 80; 
        
        const turn2X = wrapperRect.right - cRect.left - 60;
        
        const endY = cRect.height + 100; 
        
        const radius = 100;
        
        pipePathString = \`M \${startX} \${startY} 
                          L \${startX} \${turn1Y - radius} 
                          Q \${startX} \${turn1Y}, \${startX + radius} \${turn1Y} 
                          L \${turn2X - radius} \${turn1Y} 
                          Q \${turn2X} \${turn1Y}, \${turn2X} \${turn1Y + radius} 
                          L \${turn2X} \${endY}\`;
                          
        bgShadow.setAttribute('d', pipePathString);
        pipeElements.forEach(p => p.setAttribute('d', pipePathString));
        innerOcclusion.setAttribute('d', pipePathString);
        dirtBase.setAttribute('d', pipePathString);
        dirtDetail.setAttribute('d', pipePathString);
        hoseBase.setAttribute('d', pipePathString);
        hoseHighlight.setAttribute('d', pipePathString);
        hosePeak.setAttribute('d', pipePathString);
        
        // Update mask paths
        const maskBg = document.getElementById('mask-bg');
        const maskEraser = document.getElementById('mask-eraser');
        if (maskBg) maskBg.setAttribute('d', pipePathString);
        if (maskEraser) maskEraser.setAttribute('d', pipePathString);

        nozzlePath.setAttribute('d', pipePathString);
        totalLength = nozzlePath.getTotalLength();
        
        const hideDash = \`0 \${totalLength}\`;
        hoseBase.style.strokeDasharray = hideDash;
        hoseHighlight.style.strokeDasharray = hideDash;
        hosePeak.style.strokeDasharray = hideDash;
        
        updateScroll();
    }
    
    let isSpraying = false;
    let sprayTimeout = null;
    let lastScrollPos = window.scrollY;

    function updateScroll() {
        if (totalLength === 0) return;
        
        const windowHeight = window.innerHeight;
        const cRect = container.getBoundingClientRect();
        
        const scrollRange = cRect.height;
        const scrollStart = cRect.top - (windowHeight / 2) + 200; 
        
        let progress = -scrollStart / scrollRange;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;
        
        const currentLength = progress * totalLength;
        
        const point = nozzlePath.getPointAtLength(currentLength);
        
        const pointAhead = nozzlePath.getPointAtLength(Math.min(currentLength + 2, totalLength));
        const pointBehind = nozzlePath.getPointAtLength(Math.max(currentLength - 2, 0));
        
        let angle = Math.atan2(pointAhead.y - pointBehind.y, pointAhead.x - pointBehind.x) * 180 / Math.PI;
        const rotation = angle - 90;
        
        nozzleGroup.style.opacity = 1;
        nozzleGroup.style.transformOrigin = \`100px -5px\`;
        nozzleGroup.style.transform = \`translate(\${point.x - 100}px, \${point.y + 5}px) rotate(\${rotation}deg)\`;
        
        // Draw hose
        const hoseDrawLength = currentLength;
        const dashArray = \`\${hoseDrawLength} \${totalLength}\`;
        hoseBase.style.strokeDasharray = dashArray;
        hoseHighlight.style.strokeDasharray = dashArray;
        hosePeak.style.strokeDasharray = dashArray;
        
        // Erase dirt
        const maskEraser = document.getElementById('mask-eraser');
        if (maskEraser) {
            // The eraser stroke is drawn from 0 to currentLength + offset
            maskEraser.style.strokeDasharray = \`\${currentLength + 60} \${totalLength}\`;
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
    
    window.addEventListener('resize', drawPipe);
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    setTimeout(drawPipe, 100);
});
`;

fs.writeFileSync(jsPath, jsContent + newPipeScript);
console.log("Updated pipe logic with layered 3D strokes and organic dirt masking.");
