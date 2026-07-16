const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

// Find the start of the injected dirt logic
const startMarker = jsContent.indexOf('if (pipeDefs && !document.getElementById(\'drawn-dirt\')) {');
let endMarker = jsContent.indexOf('dirtGroup.appendChild(dirtRect);', startMarker);

if (startMarker === -1 || endMarker === -1) {
    console.error("Could not find the markers for the old dirt logic.");
    process.exit(1);
}

endMarker += 'dirtGroup.appendChild(dirtRect);'.length;

const new3DDirtLogic = `
    if (pipeDefs && !document.getElementById('realistic-dirt-grad')) {
        const dirtGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        dirtGradient.setAttribute('id', 'realistic-dirt-grad');
        dirtGradient.innerHTML = \`
            <stop offset="0%" stop-color="#1f140d" stop-opacity="0.95" />
            <stop offset="20%" stop-color="#3b2618" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#543825" stop-opacity="0.3" />
            <stop offset="80%" stop-color="#3b2618" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#1f140d" stop-opacity="0.95" />
        \`;
        pipeDefs.appendChild(dirtGradient);
    }
    
    // Remove old drawn-dirt pattern if it exists in DOM
    const oldPattern = document.getElementById('drawn-dirt');
    if (oldPattern) oldPattern.remove();
    const oldFilter = document.getElementById('organic-dirt');
    if (oldFilter) oldFilter.remove();

    if (pipeDefs && !document.getElementById('organic-dirt')) {
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', 'organic-dirt');
        filter.setAttribute('x', '-20%');
        filter.setAttribute('y', '-20%');
        filter.setAttribute('width', '140%');
        filter.setAttribute('height', '140%');
        
        filter.innerHTML = \`
            <!-- 1. Skapa organisk form (låg frekvens) -->
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="4" result="blobNoise" />
            
            <!-- 2. Skapa skarpa, klumpiga kanter -->
            <feColorMatrix in="blobNoise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 25 -11" result="blobMask" />
            
            <!-- 3. Maskera gradienten (färgen) med klumparna -->
            <feComposite operator="in" in="SourceGraphic" in2="blobMask" result="flatDirt" />
            
            <!-- 4. 3D-effekt: Bump map & Specular Lighting (glans) -->
            <feGaussianBlur in="flatDirt" stdDeviation="3" result="blurHeight" />
            <feSpecularLighting in="blurHeight" surfaceScale="4" specularConstant="1.2" specularExponent="25" lighting-color="#ffffff" result="specular">
                <feDistantLight azimuth="225" elevation="45" />
            </feSpecularLighting>
            <!-- Maskera ljuset så det bara syns på smutsen -->
            <feComposite operator="in" in="specular" in2="flatDirt" result="specularMasked" />
            
            <!-- 5. Lägg ihop 3D-glansen med smutsen -->
            <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="flatDirt" in2="specularMasked" result="litDirt" />

            <!-- 6. Adderar små svarta prickar (detaljer/skit) -->
            <!-- Hög frekvens skapar pyttesmå "gruskorn" -->
            <feTurbulence type="fractalNoise" baseFrequency="0.2" numOctaves="2" result="gritNoise" />
            <feColorMatrix in="gritNoise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 50 -30" result="gritMask" />
            <!-- Begränsa prickarna så de bara ligger ovanpå smutsen -->
            <feComposite operator="in" in="gritMask" in2="flatDirt" result="gritMasked" />
            <!-- Subtrahera färg för att skapa svarta hål/prickar -->
            <feComposite operator="arithmetic" k1="0" k2="1" k3="-1" k4="0" in="litDirt" in2="gritMasked" result="detailedDirt" />
            
            <!-- 7. Ge smutsen en massiv mörk slagskugga för att verkligen poppa från röret -->
            <feDropShadow in="detailedDirt" dx="0" dy="6" stdDeviation="4" flood-color="#000000" flood-opacity="0.85" />
        \`;
        pipeDefs.appendChild(filter);
    }

    const dirtRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    dirtRect.setAttribute('fill', 'url(#realistic-dirt-grad)');
    dirtRect.setAttribute('style', 'filter: url(#organic-dirt);');
    dirtGroup.appendChild(dirtRect);
`;

jsContent = jsContent.substring(0, startMarker) + new3DDirtLogic + jsContent.substring(endMarker);

fs.writeFileSync(jsPath, jsContent);
console.log("Replaced flat pattern with high-end 3D procedural organic dirt.");
