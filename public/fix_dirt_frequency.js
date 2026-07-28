const fs = require('fs');
let mainJs = fs.readFileSync('main.js', 'utf8');

// 1. Lgg till id p feTurbulence i turbulence-mask-filter
const turbRegex = /<feTurbulence type="fractalNoise" baseFrequency="0\.01 0\.015" numOctaves="4" result="noise" \/>/;
mainJs = mainJs.replace(turbRegex, '<feTurbulence id="turb-noise-mask" type="fractalNoise" baseFrequency="0.01 0.015" numOctaves="4" result="noise" />');

// 2. Uppdatera baseFrequency och mönstrets X-koordinat i drawPipe()
// Sker efter: const organicMaskRect = document.getElementById('organic-mask-rect');
const drawPipeUpdateRegex = /const organicMaskRect = document\.getElementById\('organic-mask-rect'\);/;
const injection = `
        const turbNoise = document.getElementById('turb-noise-mask');
        if (turbNoise) {
            // Skala upp bruset s det matchar den smalare rrbredden!
            const freqX = 0.01 * (120 / pipeWidth);
            turbNoise.setAttribute('baseFrequency', \`\$\{freqX\} 0.015\`);
        }
        
        const dirtPattern = document.getElementById('cartoon-dirt-texture');
        if (dirtPattern) {
            // Se till att texturen alltid brjar ritas frn rrets vnsterkant,
            // s vi inte rkar f en tom/vit del av bilden pga skrmens bredd!
            dirtPattern.setAttribute('x', startX);
        }
        
        const organicMaskRect = document.getElementById('organic-mask-rect');`;

mainJs = mainJs.replace(drawPipeUpdateRegex, injection);

fs.writeFileSync('main.js', mainJs);
console.log('Fixed turbulence frequency and pattern offset!');
