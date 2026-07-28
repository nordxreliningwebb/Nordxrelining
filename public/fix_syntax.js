const fs = require('fs');

let mainJs = fs.readFileSync('main.js', 'utf8');

// Vi sker efter brjan av drawPipe till startY = -350;
const startToken = "function drawPipe() {";
const endToken = "startY = -350;";

const startIndex = mainJs.indexOf(startToken);
const endIndex = mainJs.indexOf(endToken, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const prefix = mainJs.substring(0, startIndex);
    const suffix = mainJs.substring(endIndex);

    const newDrawPipe = `function drawPipe() {
        if (!container || !introText || !stepsHeading) return;
        
        const cRect = container.getBoundingClientRect();
        const absoluteTop = cRect.top + window.scrollY;
        cachedScrollRange = cRect.height;
        cachedScrollStartOffset = absoluteTop + 200;
        const wrapper = container.querySelector('.layout-wrapper');
        const wrapperRect = wrapper.getBoundingClientRect();
        
        const isMobile = window.innerWidth <= 768;
        pipeWidth = isMobile ? 35 : 120;
        
        // Rr-startpunkt
        startX = wrapperRect.left - cRect.left + (wrapperRect.width * 0.75) - (pipeWidth/2); // fallback
        const heroImg = document.querySelector('.swoosh-hero .container > div > div:nth-child(2)');
        
        if (heroImg) {
            const imgRect = heroImg.getBoundingClientRect();
            if (isMobile) {
                // Placeras allra lngst t hger med 25px marginal (lite mer padding till skrmkanten)
                startX = cRect.width - pipeWidth - 25;
            } else {
                // Centrera rret under den runda bilden. startX r rrets vnsterkant.
                startX = imgRect.left + (imgRect.width / 2) - cRect.left - (pipeWidth / 2);
            }
        } else if (isMobile) {
            startX = cRect.width - pipeWidth - 25;
        }

        // Justera dirt texture s den ser likadan ut oavsett rrbredd
        const dirtPattern = document.getElementById('cartoon-dirt-texture');
        if (dirtPattern) {
            const patternImage = dirtPattern.querySelector('image');
            if (patternImage) {
                // Samma proportion av textur vs bredd (desktop har pipeWidth=120, texture=256 -> ca 2.13 ratio)
                const textureWidth = pipeWidth * (256/120); 
                dirtPattern.setAttribute('width', textureWidth);
                dirtPattern.setAttribute('height', textureWidth);
                patternImage.setAttribute('width', textureWidth);
                patternImage.setAttribute('height', textureWidth);
            }
        }

        `;
        
    mainJs = prefix + newDrawPipe + suffix;
    fs.writeFileSync('main.js', mainJs);
    console.log('Fixed syntax error in drawPipe!');
} else {
    console.log('Could not find tokens');
}
