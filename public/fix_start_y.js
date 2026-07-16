const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

jsContent = jsContent.replace(/const startY = -100;/g, 'const startY = -350;');

fs.writeFileSync(jsPath, jsContent);
console.log("Updated startY to -350 to hide the nozzle at load.");
