const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Find the start of the injected dirt logic
const startMarker = jsContent.indexOf('if (pipeDefs && !document.getElementById(\'realistic-dirt-grad\')) {');
let endMarker = jsContent.indexOf('dirtGroup.appendChild(dirtRect);', startMarker);

if (startMarker === -1 || endMarker === -1) {
    console.error("Could not find the markers for the old dirt logic.");
    process.exit(1);
}

endMarker += 'dirtGroup.appendChild(dirtRect);'.length;

const newComicDirtLogic = `
    // 1. Skapa själva den tecknade texturen (som referensbilden)
    if (pipeDefs && !document.getElementById('cartoon-dirt-texture')) {
        const texturePattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        texturePattern.setAttribute('id', 'cartoon-dirt-texture');
        texturePattern.setAttribute('x', '0');
        texturePattern.setAttribute('y', '0');
        texturePattern.setAttribute('width', '100');
        texturePattern.setAttribute('height', '100');
        texturePattern.setAttribute('patternUnits', 'userSpaceOnUse');
        
        texturePattern.innerHTML = \`
            <!-- Bakgrundsfärg (bas-smuts) -->
            <rect width="100" height="100" fill="#996340" />
            
            <!-- Mörkare stenar med svart kontur -->
            <path d="M 10 10 L 25 15 L 20 30 L 5 25 Z" fill="#693d22" stroke="#1c0a00" stroke-width="2" stroke-linejoin="round" />
            <path d="M 50 60 L 70 55 L 75 75 L 55 80 Z" fill="#693d22" stroke="#1c0a00" stroke-width="2" stroke-linejoin="round" />
            <path d="M 80 15 L 95 10 L 90 25 Z" fill="#693d22" stroke="#1c0a00" stroke-width="2" stroke-linejoin="round" />
            <path d="M 10 85 L 20 80 L 25 90 L 15 95 Z" fill="#693d22" stroke="#1c0a00" stroke-width="2" stroke-linejoin="round" />
            
            <!-- Ljusare stenar/fettklumpar med svart kontur -->
            <path d="M 30 70 L 40 65 L 45 75 L 35 80 Z" fill="#d2986c" stroke="#1c0a00" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M 70 20 L 80 30 L 65 35 Z" fill="#d2986c" stroke="#1c0a00" stroke-width="1.5" stroke-linejoin="round" />
            
            <!-- Tecknade svarta sprickor -->
            <path d="M 25 15 Q 40 30 35 50" fill="none" stroke="#1c0a00" stroke-width="1.5" stroke-linecap="round" />
            <path d="M 70 55 Q 85 40 95 50" fill="none" stroke="#1c0a00" stroke-width="1.5" stroke-linecap="round" />
            <path d="M 20 80 Q 15 90 25 100" fill="none" stroke="#1c0a00" stroke-width="1.5" stroke-linecap="round" />
            <path d="M 50 10 Q 60 20 55 35" fill="none" stroke="#1c0a00" stroke-width="1.5" stroke-linecap="round" />

            <!-- Svarta prickar (smutsdetaljer) -->
            <circle cx="15" cy="45" r="2" fill="#1c0a00" />
            <circle cx="45" cy="25" r="1.5" fill="#1c0a00" />
            <circle cx="85" cy="70" r="2.5" fill="#1c0a00" />
            <circle cx="35" cy="90" r="1" fill="#1c0a00" />
            <circle cx="65" cy="10" r="2" fill="#1c0a00" />
            <circle cx="10" cy="65" r="1.5" fill="#1c0a00" />
            <circle cx="95" cy="30" r="1" fill="#1c0a00" />
            <!-- Extra cirklar som fyllning för tecknad look -->
            <circle cx="60" cy="90" r="3" fill="#693d22" stroke="#1c0a00" stroke-width="1.5" />
            <circle cx="30" cy="10" r="2.5" fill="#d2986c" stroke="#1c0a00" stroke-width="1.5" />
        \`;
        pipeDefs.appendChild(texturePattern);
    }
    
    // 2. Skapa formen på klumparna och fyll dem med den tecknade texturen!
    if (pipeDefs && !document.getElementById('comic-clogs')) {
        const clogPattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
        clogPattern.setAttribute('id', 'comic-clogs');
        clogPattern.setAttribute('x', '0');
        clogPattern.setAttribute('y', '0');
        clogPattern.setAttribute('width', '120');
        clogPattern.setAttribute('height', '400');
        clogPattern.setAttribute('patternUnits', 'userSpaceOnUse');
        
        clogPattern.innerHTML = \`
            <!-- Vänster vägg - Organisk sörja fylld med texturen, OCH en svart outline -->
            <path d="M 0 0 Q 30 50 15 100 T 30 200 T 10 300 T 25 400 L 0 400 Z" fill="url(#cartoon-dirt-texture)" stroke="#1c0a00" stroke-width="2.5" />
            
            <!-- Höger vägg -->
            <path d="M 120 0 Q 90 60 105 120 T 90 220 T 110 320 T 95 400 L 120 400 Z" fill="url(#cartoon-dirt-texture)" stroke="#1c0a00" stroke-width="2.5" />
            
            <!-- Stopp 1 -->
            <path d="M 0 120 C 70 110, 85 140, 75 160 C 50 180, 20 170, 0 170 Z" fill="url(#cartoon-dirt-texture)" stroke="#1c0a00" stroke-width="2.5" />
            <path d="M 120 130 C 80 140, 75 160, 120 170 Z" fill="url(#cartoon-dirt-texture)" stroke="#1c0a00" stroke-width="2.5" />
            
            <!-- Stopp 2 -->
            <path d="M 0 270 C 55 260, 65 290, 0 300 Z" fill="url(#cartoon-dirt-texture)" stroke="#1c0a00" stroke-width="2.5" />
            <path d="M 120 280 C 60 290, 70 320, 120 330 Z" fill="url(#cartoon-dirt-texture)" stroke="#1c0a00" stroke-width="2.5" />
        \`;
        pipeDefs.appendChild(clogPattern);
    }
    
    const dirtRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    dirtRect.setAttribute('fill', 'url(#comic-clogs)');
    dirtGroup.appendChild(dirtRect);
`;

jsContent = jsContent.substring(0, startMarker) + newComicDirtLogic + jsContent.substring(endMarker);

fs.writeFileSync(jsPath, jsContent);
console.log("Replaced 3D filter with comic-style pattern.");
