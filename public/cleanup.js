const fs = require('fs');
let text = fs.readFileSync('main.js', 'utf8');

// Replace the first occurrence of the duplicate turbNoise logic if it exists
const toRemove = `const turbNoise = document.getElementById('turb-noise-mask');
        if (turbNoise) {
            // Skala upp bruset s det matchar den smalare rrbredden!
            const freqX = 0.01 * (120 / pipeWidth);
            turbNoise.setAttribute('baseFrequency', \`\${freqX} 0.015\`);
        }`;

text = text.replace(toRemove, "");

fs.writeFileSync('main.js', text);
console.log("Duplicate removed");
