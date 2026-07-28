const fs = require('fs');

let mainJs = fs.readFileSync('main.js', 'utf8');

// 1. Ersätt comic-stroke-filter definitionen med ett vitt glow filter
const strokeFilterRegex = /const strokeFilter[\s\S]*?pipeDefs\.appendChild\(strokeFilter\);/;

const newStrokeFilter = `const glowFilter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        glowFilter.setAttribute('id', 'white-glow-filter');
        glowFilter.setAttribute('x', '-20%');
        glowFilter.setAttribute('y', '-20%');
        glowFilter.setAttribute('width', '140%');
        glowFilter.setAttribute('height', '140%');
        glowFilter.innerHTML = \`
            <!-- Expanderar smutset -->
            <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="dilated" />
            <!-- Blurrar fr att det ska se ut som tvl/kalk-smet (vitt filter) -->
            <feGaussianBlur in="dilated" stdDeviation="3" result="blurred" />
            <!-- Gr det helt vitt med lite genomskinlighet -->
            <feColorMatrix in="blurred" type="matrix" values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.8 0" result="whiteGlow" />
            <!-- Lgger smutset ovanp det vita -->
            <feMerge result="outlined">
                <feMergeNode in="whiteGlow" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        \`;
        pipeDefs.appendChild(glowFilter);`;

mainJs = mainJs.replace(strokeFilterRegex, newStrokeFilter);

// 2. Ta bort mix-blend-mode: multiply och ndra referensen till white-glow-filter
const organicGroupStyleRegex = /organicGroup\.setAttribute\('style', 'filter: url\(#comic-stroke-filter\); mix-blend-mode: multiply;'\);/;
mainJs = mainJs.replace(organicGroupStyleRegex, "organicGroup.setAttribute('style', 'filter: url(#white-glow-filter);');");

// 3. (Valfritt men rekommenderat baserat p bilden) Ta bort mrkningen p texturen s att den r ljusare och brunare
const imageFilterRegex = /style="filter: brightness\(0\.65\) contrast\(1\.2\) saturate\(1\.2\);"/;
mainJs = mainJs.replace(imageFilterRegex, 'style="filter: brightness(0.9) contrast(1.1) saturate(1.1);"');

fs.writeFileSync('main.js', mainJs);
console.log('Dirt design reverted to white filter / glow style!');
