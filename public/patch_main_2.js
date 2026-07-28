const fs = require('fs');

let mainJs = fs.readFileSync('main.js', 'utf8');

// 1. Justera bredd och placering fr mobil i drawPipe()
const drawPipeRegex = /pipeWidth = isMobile \? 50 : 120;[\s\S]*?startX = cRect\.width - pipeWidth - 10;\s*\}/;

const newDrawPipeLogic = `pipeWidth = isMobile ? 35 : 120;
        
        startX = wrapperRect.left - cRect.left + (wrapperRect.width * 0.75) - (pipeWidth/2); // fallback
        const heroImg = document.querySelector('.swoosh-hero .container > div > div:nth-child(2)');
        if (heroImg) {
            const imgRect = heroImg.getBoundingClientRect();
            if (isMobile) {
                // Placeras allra lngst t hger med 25px marginal (lite mer padding till skrmkanten)
                startX = cRect.width - pipeWidth - 25;
            } else {
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
        }`;

mainJs = mainJs.replace(drawPipeRegex, newDrawPipeLogic);

// 2. Justera nozzle scale ytterligare i updateScroll
const nozzleTransformRegex = /const nozzleScale = \(typeof pipeWidth !== 'undefined' && pipeWidth === 50\) \? 0\.45 : 1;/;
mainJs = mainJs.replace(nozzleTransformRegex, "const nozzleScale = (typeof pipeWidth !== 'undefined' && pipeWidth === 35) ? 0.30 : 1;");

fs.writeFileSync('main.js', mainJs);
console.log('main.js patched for smaller pipe, more margin, and fixed dirt texture!');
