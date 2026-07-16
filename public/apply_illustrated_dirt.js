const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// The new illustrated SVG pattern
const illustratedPattern = `
    if (pipeDefs && !document.getElementById('drawn-dirt')) {
        const dirtPattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        dirtPattern.setAttribute('id', 'drawn-dirt');
        dirtPattern.setAttribute('x', '0');
        dirtPattern.setAttribute('y', '0');
        dirtPattern.setAttribute('width', '120');
        dirtPattern.setAttribute('height', '400');
        dirtPattern.setAttribute('patternUnits', 'userSpaceOnUse');
        
        dirtPattern.innerHTML = \`
            <!-- Baslager: Ljusare brun sörja längs väggarna -->
            <path fill="#8a5c38" opacity="0.9" d="M 0 0 Q 30 50 15 100 T 30 200 T 10 300 T 25 400 L 0 400 Z" />
            <path fill="#8a5c38" opacity="0.9" d="M 120 0 Q 90 60 105 120 T 90 220 T 110 320 T 95 400 L 120 400 Z" />
            
            <!-- Mellanlager: Tjockare, mörkare bruna fläckar -->
            <path fill="#5c361e" d="M 0 40 Q 45 80 20 150 T 40 250 T 15 350 L 0 350 Z" />
            <path fill="#5c361e" d="M 120 20 Q 75 100 100 180 T 80 280 T 105 380 L 120 380 Z" />
            
            <!-- Det stora stoppet (Clog 1) -->
            <path fill="#361c0d" d="M 0 120 C 70 110, 85 140, 75 160 C 50 180, 20 170, 0 170 Z" />
            <path fill="#361c0d" d="M 120 130 C 80 140, 75 160, 120 170 Z" />
            
            <!-- Det lilla stoppet (Clog 2) -->
            <path fill="#361c0d" d="M 0 270 C 55 260, 65 290, 0 300 Z" />
            <path fill="#361c0d" d="M 120 280 C 60 290, 70 320, 120 330 Z" />

            <!-- Detaljer: Mörka prickar och grus för textur -->
            <circle cx="15" cy="20" r="2.5" fill="#1c0f07" />
            <circle cx="35" cy="60" r="1.5" fill="#1c0f07" />
            <circle cx="10" cy="90" r="3" fill="#1c0f07" />
            <circle cx="20" cy="140" r="2" fill="#1c0f07" />
            <circle cx="60" cy="145" r="1.5" fill="#1c0f07" />
            <circle cx="105" cy="40" r="2" fill="#1c0f07" />
            <circle cx="95" cy="80" r="1.5" fill="#1c0f07" />
            <circle cx="20" cy="210" r="3.5" fill="#1c0f07" />
            <circle cx="100" cy="230" r="2" fill="#1c0f07" />
            <circle cx="35" cy="300" r="1.5" fill="#1c0f07" />
            <circle cx="110" cy="290" r="2" fill="#1c0f07" />
            <circle cx="15" cy="370" r="2" fill="#1c0f07" />
            <circle cx="95" cy="350" r="1.5" fill="#1c0f07" />
            
            <!-- Detaljer: Ljusa, geggiga prickar -->
            <circle cx="45" cy="135" r="2" fill="#b07d53" />
            <circle cx="85" cy="155" r="2.5" fill="#b07d53" />
            <circle cx="30" cy="285" r="1.5" fill="#b07d53" />
            <circle cx="95" cy="305" r="2" fill="#b07d53" />
            
            <!-- Några asymmetriska skräp-bitar -->
            <path fill="#1c0f07" d="M 8 130 L 14 133 L 9 138 Z" />
            <path fill="#1c0f07" d="M 112 160 L 105 158 L 109 153 Z" />
            <path fill="#1c0f07" d="M 15 250 L 22 254 L 18 260 Z" />
        \`;
        pipeDefs.appendChild(dirtPattern);
    }

    const dirtRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    dirtRect.setAttribute('fill', 'url(#drawn-dirt)');
    dirtGroup.appendChild(dirtRect);
`;

// Remove the realistic dirt logic entirely
const startMarker = jsContent.indexOf('// Skapa en realistisk gradient där smutsen');
const endMarker = jsContent.indexOf('dirtGroup.appendChild(dirtRect);') + 'dirtGroup.appendChild(dirtRect);'.length;

if (startMarker !== -1 && endMarker !== -1) {
    jsContent = jsContent.substring(0, startMarker) + illustratedPattern + jsContent.substring(endMarker);
    fs.writeFileSync(jsPath, jsContent);
    console.log("Successfully replaced dirt logic with illustrated pattern.");
} else {
    console.log("Markers not found.");
}
