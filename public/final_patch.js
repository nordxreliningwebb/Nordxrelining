const fs = require('fs');
let mainJs = fs.readFileSync('main.js', 'utf8');

// 1. Ta bort mix-blend-mode: multiply p organicGroup
mainJs = mainJs.replace(
    /organicGroup\.setAttribute\('style', 'filter: url\(#comic-stroke-filter\); mix-blend-mode: multiply;'\);/,
    "organicGroup.setAttribute('style', ''); // Removed multiply and comic stroke to reveal white crust"
);

// 2. Gr comic-dirt bilden ljusare (den har vit/ljusgr bakgrund, det r det vita filtret!)
mainJs = mainJs.replace(
    /style="filter: brightness\(0\.65\) contrast\(1\.2\) saturate\(1\.2\);"/,
    'style="filter: brightness(1.1) contrast(1.1) saturate(1.2);" // Ljusare för att se vitt ut'
);

// 3. Fixa mobilbredd och marginal i drawPipe
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
        const pipeWidth = isMobile ? 35 : 120;
        
        // Rr-startpunkt
        let startX = wrapperRect.left - cRect.left + (wrapperRect.width * 0.75) - (pipeWidth/2); // fallback
        const heroImg = document.querySelector('.swoosh-hero .container > div > div:nth-child(2)');
        
        if (heroImg) {
            const imgRect = heroImg.getBoundingClientRect();
            if (isMobile) {
                // Allra lngst t hger med lite padding (25px marginal till hgerkanten)
                startX = cRect.width - pipeWidth - 25;
            } else {
                startX = imgRect.left + (imgRect.width / 2) - cRect.left - (pipeWidth / 2);
            }
        } else if (isMobile) {
            startX = cRect.width - pipeWidth - 25;
        }

        // Justera dirt texture proportioner f r mobil s den inte strcks eller beskrs
        const dirtPattern = document.getElementById('cartoon-dirt-texture');
        if (dirtPattern) {
            const patternImage = dirtPattern.querySelector('image');
            if (patternImage) {
                // Samma proportion: 120 r pipe width, 256 r texture width.
                const textureWidth = pipeWidth * (256/120); 
                dirtPattern.setAttribute('width', textureWidth);
                dirtPattern.setAttribute('height', textureWidth);
                patternImage.setAttribute('width', textureWidth);
                patternImage.setAttribute('height', textureWidth);
            }
        }
        
        const turbNoise = document.getElementById('turb-noise-mask');
        if (turbNoise) {
            // Skala bruset s masken ser likadan ut
            const freqX = 0.01 * (120 / pipeWidth);
            turbNoise.setAttribute('baseFrequency', \`\${freqX} 0.015\`);
        }

        `;
        
    mainJs = prefix + newDrawPipe + suffix;
}

// 4. Justera nozzle-storlek fr mobilen
mainJs = mainJs.replace(
    /const nozzleScale = 1;/,
    "const nozzleScale = (window.innerWidth <= 768) ? 0.3 : 1;"
);

fs.writeFileSync('main.js', mainJs);
console.log('Fixed everything!');
