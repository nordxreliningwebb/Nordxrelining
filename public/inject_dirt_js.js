const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Replace the pipe element creations to add dirt
const oldHoseBase = "const hoseBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');";

const dirtLogic = `
    // Dirt layer (thick brown clumps)
    const dirtBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dirtBase.setAttribute('fill', 'none');
    dirtBase.setAttribute('stroke', 'url(#dirt-gradient)');
    dirtBase.setAttribute('stroke-width', '110');
    dirtBase.setAttribute('stroke-dasharray', '80 300 150 400 300 200'); // random clumps
    dirtBase.setAttribute('stroke-linecap', 'round');
    dirtBase.setAttribute('style', 'filter: url(#dirt-shadow); transition: stroke-dashoffset 0.1s linear;');
    
    // Dirt highlight
    const dirtHighlight = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    dirtHighlight.setAttribute('fill', 'none');
    dirtHighlight.setAttribute('stroke', 'url(#dirt-highlight)');
    dirtHighlight.setAttribute('stroke-width', '100');
    dirtHighlight.setAttribute('stroke-dasharray', '80 300 150 400 300 200');
    dirtHighlight.setAttribute('stroke-linecap', 'round');
    dirtHighlight.setAttribute('opacity', '0.7');
    dirtHighlight.setAttribute('style', 'transition: stroke-dashoffset 0.1s linear;');

    ${oldHoseBase}
`;

jsContent = jsContent.replace(oldHoseBase, dirtLogic);

// Add to pipeGroup (before inner occlusion so dirt is inside)
const oldAppendInner = "pipeGroup.appendChild(innerOcclusion);";
const newAppendInner = `
    pipeGroup.appendChild(dirtBase);
    pipeGroup.appendChild(dirtHighlight);
    pipeGroup.appendChild(innerOcclusion);
`;

jsContent = jsContent.replace(oldAppendInner, newAppendInner);

// Add to drawPipe
const oldDrawPipe = "hoseBase.setAttribute('d', pipePathString);";
const newDrawPipe = `
        dirtBase.setAttribute('d', pipePathString);
        dirtHighlight.setAttribute('d', pipePathString);
        hoseBase.setAttribute('d', pipePathString);
`;

jsContent = jsContent.replace(oldDrawPipe, newDrawPipe);

// Add to updateScroll to clean dirt
const oldUpdateScroll = "const dashArray = `\\${hoseDrawLength} \\${totalLength}`;";
const newUpdateScroll = `
        const dashArray = \`\${hoseDrawLength} \${totalLength}\`;
        
        // Dirt logic: The dirt is drawn along the whole pipe.
        // We want to hide the dirt that is BEFORE the nozzle.
        // By setting stroke-dashoffset to -currentLength, the dirt dashes shift backwards,
        // but wait, dashoffset shifts the pattern, it doesn't mask it.
        // To mask it, we need a stroke-dasharray trick or a mask.
        // A simple trick: use a solid stroke, but we want clumps.
        // Actually, we can just use stroke-dasharray to draw from currentLength to totalLength.
        // Since we want specific clumps, dasharray trick is hard.
        // Let's use a mask! But mask is complex in JS dynamically.
        // Alternatively, if the pattern shifts backwards exactly by currentLength, it looks like it's being eaten!
        // No, shifting it means the clumps move.
        // Let's just create a black "cleaner" path that is thick and draws from 0 to currentLength, 
        // overlaid ON TOP of the dirt, but UNDER the inner occlusion!
        // Wait, the pipeBase is under the dirt. The "cleaner" path would be the same as pipeBase.
        // So we draw a 'cleanPipeBase' on top of the dirt, from 0 to currentLength!
`;

// Let's actually add the cleanPipeBase
const createCleanPipe = `
    const cleanPipeBase = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    cleanPipeBase.setAttribute('fill', 'none');
    cleanPipeBase.setAttribute('stroke', 'url(#premium-pipe)');
    cleanPipeBase.setAttribute('stroke-width', '112'); // slightly thinner to not cover edges
    cleanPipeBase.setAttribute('stroke-linecap', 'butt');
    cleanPipeBase.setAttribute('stroke-linejoin', 'round');
`;

const appendCleanPipe = `
    pipeGroup.appendChild(cleanPipeBase);
    ${newAppendInner}
`;

const drawCleanPipe = `
        cleanPipeBase.setAttribute('d', pipePathString);
        ${newDrawPipe}
`;

const updateCleanPipe = `
        cleanPipeBase.style.strokeDasharray = \`\${currentLength + 60} \${totalLength}\`; // +60 so it cleans slightly ahead of the nozzle tip!
        ${oldUpdateScroll}
`;

jsContent = jsContent.replace(dirtLogic, createCleanPipe + dirtLogic);
jsContent = jsContent.replace(newAppendInner, appendCleanPipe);
jsContent = jsContent.replace(newDrawPipe, drawCleanPipe);
jsContent = jsContent.replace(oldUpdateScroll, updateCleanPipe);

fs.writeFileSync(jsPath, jsContent);
console.log("Injected dirt and clean pipe logic.");
