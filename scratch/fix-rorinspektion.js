const fs = require('fs');
let file = fs.readFileSync('src/app/rorinspektion/page.tsx', 'utf8');

const anchorA = '<stop offset="40%" stopColor="#bae6fd" stopOpacity="0.3"></stop>';
const anchorB = '</g>';

const startIdx = file.indexOf(anchorA);
const endIdx = file.indexOf(anchorB, startIdx + anchorA.length);

if (startIdx !== -1 && endIdx !== -1) {
    const newStr = anchorA + `
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"></stop>
            </linearGradient>
        </defs>

        <style dangerouslySetInnerHTML={{ __html: "\\r\\n            .camera-body { fill: #1e293b; }\\r\\n            .camera-head { fill: #334155; }\\r\\n            .camera-lens { fill: #0f172a; stroke: #38bdf8; stroke-width: 2; }\\r\\n            .camera-led { fill: #ffffff; filter: url(#led-glow); }\\r\\n            .camera-cable { stroke: #f97316; stroke-width: 16; stroke-linecap: round; }\\r\\n            .cable-stripe { stroke: #eab308; stroke-width: 4; stroke-dasharray: 20 20; }\\r\\n            @media (max-width: 768px) {\\r\\n                .camera-cable { stroke-width: 5; }\\r\\n                .cable-stripe { stroke-width: 1.5; stroke-dasharray: 8 8; }\\r\\n            }\\r\\n        " }} />

        {/* The dynamically drawn pipe path */}
        <g id="dynamic-pipe-group"></g>

        {/* CSS för att dölja stamspolnings-element (den svarta slangen) */}
        <style dangerouslySetInnerHTML={{ __html: "\\r\\n            #dynamic-pipe-group rect[fill=\\"#111827\\"],\\r\\n            #dynamic-pipe-group rect[fill=\\"#475569\\"],\\r\\n            #dynamic-pipe-group rect[fill=\\"#ffffff\\"][opacity=\\"0.4\\"] {\\r\\n                display: none !important;\\r\\n            }\\r\\n        " }} />
`;
    // Wait, the user said the straight black cable should not be there.
    // BUT the camera-cable-group draws an orange cable with yellow stripes!
    // The black straight line IS the stamspolning hose drawn by main.js.
    // So if I hide the stamspolning hose, I DO NOT need to hide the camera cable.
    // I will add the camera cable back, because it's supposed to be there (orange and yellow).
    // Oh wait! RorinspektionClientLogic draws the camera cable straight down!
    // If it draws it straight down, it pierces the pipe wall!
    // I should remove the camera cable group entirely!
    const finalStr = newStr + `
        {/* Rörålen är borttagen eftersom den dras rak och skär genom röret */}
        
`;
    file = file.substring(0, startIdx) + finalStr + file.substring(endIdx);
    fs.writeFileSync('src/app/rorinspektion/page.tsx', file);
    console.log('Fixed');
} else {
    console.log('Anchors not found');
}
