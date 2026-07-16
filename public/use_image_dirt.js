const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// The pattern to replace
const startMarker = `texturePattern.innerHTML = \\\``;
const endMarker = `\\\`;
        pipeDefs.appendChild(texturePattern);`;

const startIndex = jsContent.indexOf(startMarker);
const endIndex = jsContent.indexOf(endMarker, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    // Increase size so it doesn't repeat too often
    jsContent = jsContent.replace("texturePattern.setAttribute('width', '100');", "texturePattern.setAttribute('width', '256');");
    jsContent = jsContent.replace("texturePattern.setAttribute('height', '100');", "texturePattern.setAttribute('height', '256');");

    const newPatternContent = `
            <image href="/comic-dirt.png" x="0" y="0" width="256" height="256" preserveAspectRatio="none" />
        `;
        
    jsContent = jsContent.substring(0, startIndex + startMarker.length) + newPatternContent + jsContent.substring(endIndex);
    fs.writeFileSync(jsPath, jsContent);
    console.log("Successfully updated main.js to use the AI-generated texture.");
} else {
    console.error("Could not find the texturePattern innerHTML block.");
}
