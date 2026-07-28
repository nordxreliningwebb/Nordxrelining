const fs = require('fs');

let mainJs = fs.readFileSync('main.js', 'utf8');

// 1. Remove the dirtPattern adjustment I added earlier in drawPipe
const patternAdjRegex = /\/\/ Justera dirt texture s den ser likadan ut[\s\S]*?patternImage\.setAttribute\('height', textureWidth\);\s*\}\s*\}/;
mainJs = mainJs.replace(patternAdjRegex, '');

// 2. Add ID to organic mask rect
const organicMaskRectRegex = /<rect width="100%" height="100%" fill="url\(#edge-gradient\)" filter="url\(#turbulence-mask-filter\)" \/>/;
mainJs = mainJs.replace(organicMaskRectRegex, '<rect id="organic-mask-rect" width="100%" height="100%" fill="url(#edge-gradient)" filter="url(#turbulence-mask-filter)" />');

// 3. Update organic-mask-rect inside drawPipe
// Find where other rects are updated:
const updateRectsRegex = /\[bgShadow, pipeBase, innerOcclusion, dirtRect\]\.forEach\(el => \{/g;
mainJs = mainJs.replace(updateRectsRegex, `
        const organicMaskRect = document.getElementById('organic-mask-rect');
        if (organicMaskRect) {
            organicMaskRect.setAttribute('x', startX);
            organicMaskRect.setAttribute('y', startY);
            organicMaskRect.setAttribute('width', pipeWidth);
            organicMaskRect.setAttribute('height', totalLength);
        }
        [bgShadow, pipeBase, innerOcclusion, dirtRect].forEach(el => {`);

fs.writeFileSync('main.js', mainJs);
console.log('Fixed dirt mask and removed bad texture scaling!');
