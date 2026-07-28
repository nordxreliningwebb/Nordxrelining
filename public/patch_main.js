const fs = require('fs');

let mainJs = fs.readFileSync('main.js', 'utf8');

// 1. Lgg till pipeWidth globalt fr animationen
mainJs = mainJs.replace(
    /let startX = 0;\s*let startY = 0;/g,
    'let startX = 0;\n    let startY = 0;\n    let pipeWidth = 120;'
);

// 2. Erstt logiken i drawPipe
const drawPipeRegex = /const pipeWidth = 120;[\s\S]*?startX = imgRect\.left \+ \(imgRect\.width \/ 2\) - cRect\.left - \(pipeWidth \/ 2\);\s*\}/;

const newDrawPipeLogic = `const isMobile = window.innerWidth <= 768;
        pipeWidth = isMobile ? 50 : 120;
        
        startX = wrapperRect.left - cRect.left + (wrapperRect.width * 0.75) - (pipeWidth/2); // fallback
        const heroImg = document.querySelector('.swoosh-hero .container > div > div:nth-child(2)');
        if (heroImg) {
            const imgRect = heroImg.getBoundingClientRect();
            if (isMobile) {
                // Placeras allra lngst t hger med 10px marginal
                startX = cRect.width - pipeWidth - 10;
            } else {
                startX = imgRect.left + (imgRect.width / 2) - cRect.left - (pipeWidth / 2);
            }
        } else if (isMobile) {
            startX = cRect.width - pipeWidth - 10;
        }`;

mainJs = mainJs.replace(drawPipeRegex, newDrawPipeLogic);

// 3. Justera nozzleGroup scale p mobil i updateScroll
// Sker efter: nozzleGroup.style.transform = `translate(${startX + 60 - 100}px, ${currentY + 5}px) rotate(0deg)`;
const nozzleTransformRegex = /nozzleGroup\.style\.transform = `translate\(\$\{startX \+ 60 - 100\}px, \$\{currentY \+ 5\}px\) rotate\(0deg\)`;/;

const newNozzleTransform = `// Nozzle center is at 100. We want it at startX + pipeWidth/2
        const nozzleScale = (typeof pipeWidth !== 'undefined' && pipeWidth === 50) ? 0.45 : 1;
        nozzleGroup.style.transform = \`translate(\$\{startX + (pipeWidth/2) - 100\}px, \$\{currentY + 5\}px) scale(\$\{nozzleScale\})\`;`;

mainJs = mainJs.replace(nozzleTransformRegex, newNozzleTransform);

// 4. Justera eraser mask width
// Sker efter: maskEraser.setAttribute('width', 160); // pipeWidth (120) + 40
const eraseMaskRegex = /maskEraser\.setAttribute\('width', 160\); \/\/ pipeWidth \(120\) \+ 40/g;
mainJs = mainJs.replace(eraseMaskRegex, `maskEraser.setAttribute('width', pipeWidth + 40);`);

fs.writeFileSync('main.js', mainJs);
console.log('main.js patched!');
