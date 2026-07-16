const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const pipeScript = `

/* =====================================================
   DYNAMIC RESPONSIVE PIPE ANIMATION (STAMSPOLNING)
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const pipeGroup = document.getElementById('dynamic-pipe-group');
    const nozzleGroup = document.getElementById('dynamic-nozzle');
    if (!pipeGroup || !nozzleGroup) return;

    const container = document.getElementById('stamspolning-content');
    const introText = document.getElementById('intro-text');
    const stepsHeading = document.getElementById('steg-for-steg-heading');
    
    let pipePathString = '';
    let totalLength = 0;
    const nozzlePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // Create the pipe layers
    const bgShadow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bgShadow.setAttribute('fill', 'none');
    bgShadow.setAttribute('stroke', '#000000');
    bgShadow.setAttribute('stroke-opacity', '0.05');
    bgShadow.setAttribute('stroke-width', '160');
    bgShadow.setAttribute('style', 'filter: blur(15px);');
    
    const pipeBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pipeBase.setAttribute('fill', 'none');
    pipeBase.setAttribute('stroke', 'url(#premium-pipe)');
    pipeBase.setAttribute('stroke-width', '120');
    pipeBase.setAttribute('stroke-linecap', 'butt');
    pipeBase.setAttribute('stroke-linejoin', 'round');

    const innerOcclusion = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    innerOcclusion.setAttribute('fill', 'none');
    innerOcclusion.setAttribute('stroke', '#000000');
    innerOcclusion.setAttribute('stroke-opacity', '0.15');
    innerOcclusion.setAttribute('stroke-width', '20');
    innerOcclusion.setAttribute('style', 'filter: blur(6px);');
    
    // Hose
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

    pipeGroup.appendChild(bgShadow);
    pipeGroup.appendChild(pipeBase);
    pipeGroup.appendChild(innerOcclusion);
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
        
        const turn1Y = stepsRect.top - cRect.top - 80; // 80px above heading
        
        const turn2X = wrapperRect.right - cRect.left - 60;
        
        const endY = cRect.height + 100; 
        
        const radius = 100;
        
        // Ensure radius is not too large for the segments
        pipePathString = \`M \${startX} \${startY} 
                          L \${startX} \${turn1Y - radius} 
                          Q \${startX} \${turn1Y}, \${startX + radius} \${turn1Y} 
                          L \${turn2X - radius} \${turn1Y} 
                          Q \${turn2X} \${turn1Y}, \${turn2X} \${turn1Y + radius} 
                          L \${turn2X} \${endY}\`;
                          
        bgShadow.setAttribute('d', pipePathString);
        pipeBase.setAttribute('d', pipePathString);
        innerOcclusion.setAttribute('d', pipePathString);
        hoseBase.setAttribute('d', pipePathString);
        hoseHighlight.setAttribute('d', pipePathString);
        hosePeak.setAttribute('d', pipePathString);
        
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
        // Origin is at 100, -5 (the top of the connector)
        nozzleGroup.style.transformOrigin = \`100px -5px\`;
        nozzleGroup.style.transform = \`translate(\${point.x - 100}px, \${point.y + 5}px) rotate(\${rotation}deg)\`;
        
        const hoseDrawLength = currentLength;
        const dashArray = \`\${hoseDrawLength} \${totalLength}\`;
        hoseBase.style.strokeDasharray = dashArray;
        hoseHighlight.style.strokeDasharray = dashArray;
        hosePeak.style.strokeDasharray = dashArray;
        
        // Handle spray animation
        const isScrollingDown = window.scrollY > lastScrollPos;
        lastScrollPos = window.scrollY;
        
        // We only pulse if the user is actively scrolling
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

if (!jsContent.includes('DYNAMIC RESPONSIVE PIPE ANIMATION')) {
    fs.writeFileSync(jsPath, jsContent + pipeScript);
    console.log("Appended dynamic pipe script to main.js");
} else {
    console.log("Script already exists in main.js");
}
