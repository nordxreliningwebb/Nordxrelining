const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Replace the mask-bg stroke width
jsContent = jsContent.replace(
    /<path id="mask-bg" stroke="white" stroke-width="160"/g, 
    '<path id="mask-bg" stroke="white" stroke-width="106"'
);

// Replace the mask-eraser stroke width
jsContent = jsContent.replace(
    /<path id="mask-eraser" stroke="black" stroke-width="160"/g, 
    '<path id="mask-eraser" stroke="black" stroke-width="106"'
);

fs.writeFileSync(jsPath, jsContent);
console.log("Updated mask widths in main.js to contain dirt within pipe walls.");
