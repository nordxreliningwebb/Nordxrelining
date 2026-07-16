const fs = require('fs');
let content = fs.readFileSync('public/stamspolning.html', 'utf-8');

const newSvg = `
<style>
body.light-theme .service-animation-wrapper {
    opacity: 0.7 !important; 
    transform: translateY(-50%) scale(0.65) !important; /* Mindre i storlek */
    transform-origin: right center !important; /* Skalar ner från höger */
}
</style>
<div class="animation-label" style="display:none;">Spolningseffekt</div>
<svg viewBox="0 0 200 800" preserveAspectRatio="xMidYMin meet" class="stamspolning-svg" style="filter: drop-shadow(0 25px 35px rgba(0,0,0,0.3));">
    <defs>
        <!-- 3D Pipe Inner Volume -->
        <linearGradient id="pipe-3d-inner" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="15%" stop-color="#475569" />
            <stop offset="50%" stop-color="#0f172a" /> <!-- Darkest deep inside the pipe -->
            <stop offset="85%" stop-color="#475569" />
            <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
        
        <!-- 3D Pipe Rim -->
        <linearGradient id="pipe-3d-rim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="50%" stop-color="#94a3b8" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        
        <!-- 3D Metal Nozzle Cylinder -->
        <linearGradient id="metal-3d" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="25%" stop-color="#ffffff" />
            <stop offset="50%" stop-color="#94a3b8" />
            <stop offset="80%" stop-color="#e2e8f0" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>

        <!-- 3D Dirt Blobs -->
        <radialGradient id="dirt-3d" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#a16207" />
            <stop offset="60%" stop-color="#422006" />
            <stop offset="100%" stop-color="#1a0d03" />
        </radialGradient>
        
        <!-- 3D Water Spray Cones -->
        <radialGradient id="water-cone-3d" cx="50%" cy="10%" r="90%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
            <stop offset="30%" stop-color="#38bdf8" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
        </radialGradient>
    </defs>

    <!-- 3D Pipe Background (The hollow depth) -->
    <path d="M 30 40 L 30 800 L 170 800 L 170 40 Z" fill="url(#pipe-3d-inner)" />
    
    <!-- Pipe Top Rim (Ellipse to create the 3D cylinder illusion) -->
    <ellipse cx="100" cy="40" rx="80" ry="25" fill="none" stroke="url(#pipe-3d-rim)" stroke-width="14" />
    <ellipse cx="100" cy="40" rx="70" ry="20" fill="#0f172a" /> <!-- The deep hole -->

    <!-- 3D Dirt Blobs (Spheres sticking to the walls) -->
    <g class="dirt-clog" data-depth="0.2" style="transition: all 0.3s ease;">
        <ellipse cx="45" cy="180" rx="25" ry="35" fill="url(#dirt-3d)" />
        <ellipse cx="65" cy="210" rx="15" ry="20" fill="url(#dirt-3d)" />
        <ellipse cx="35" cy="230" rx="12" ry="18" fill="url(#dirt-3d)" />
    </g>
    
    <g class="dirt-clog" data-depth="0.6" style="transition: all 0.3s ease;">
        <ellipse cx="155" cy="460" rx="35" ry="50" fill="url(#dirt-3d)" />
        <ellipse cx="125" cy="430" rx="20" ry="25" fill="url(#dirt-3d)" />
        <ellipse cx="140" cy="500" rx="15" ry="20" fill="url(#dirt-3d)" />
    </g>

    <g class="dirt-clog" data-depth="0.9" style="transition: all 0.3s ease;">
        <!-- Massive bottom blockage -->
        <path d="M 30 720 Q 100 670 170 720 L 170 800 L 30 800 Z" fill="url(#dirt-3d)" />
        <ellipse cx="100" cy="740" rx="50" ry="30" fill="url(#dirt-3d)" />
        <ellipse cx="60" cy="760" rx="30" ry="20" fill="url(#dirt-3d)" />
        <ellipse cx="140" cy="750" rx="35" ry="25" fill="url(#dirt-3d)" />
    </g>

    <!-- 3D Moving Nozzle & Hose -->
    <g class="nozzle-group" style="transform: translateY(calc(800px * var(--scroll-progress, 0))); transition: transform 0.1s ease-out;">
        
        <!-- Hose -->
        <rect x="90" y="-800" width="20" height="800" fill="#0f172a" />
        <rect x="92" y="-800" width="6" height="800" fill="#475569" /> <!-- 3D highlight on hose -->
        <rect x="94" y="-800" width="2" height="800" fill="#94a3b8" />
        
        <!-- Water Jets -->
        <g>
            <!-- Forward powerful 3D cone -->
            <path d="M 100 65 L 40 250 Q 100 280 160 250 Z" fill="url(#water-cone-3d)" />
            <!-- Intense white core -->
            <path d="M 100 65 L 80 180 Q 100 190 120 180 Z" fill="#ffffff" opacity="0.8" />
            
            <!-- Backward propulsion jets (3D) -->
            <path d="M 100 35 L 30 -60 Q 60 -80 100 -60 Z" fill="url(#water-cone-3d)" opacity="0.7" />
            <path d="M 100 35 L 170 -60 Q 140 -80 100 -60 Z" fill="url(#water-cone-3d)" opacity="0.7" />
        </g>

        <!-- Nozzle Body (True Cylindrical 3D) -->
        
        <!-- Top connector -->
        <rect x="85" y="0" width="30" height="15" fill="url(#metal-3d)" />
        <ellipse cx="100" cy="0" rx="15" ry="4" fill="#cbd5e1" />
        <ellipse cx="100" cy="15" rx="15" ry="4" fill="#334155" /> <!-- Bottom shadow of connector -->

        <!-- Main Body cone -->
        <path d="M 75 15 L 125 15 L 115 55 L 85 55 Z" fill="url(#metal-3d)" />
        <!-- Top ring of main body -->
        <ellipse cx="100" cy="15" rx="25" ry="6" fill="url(#metal-3d)" />
        <!-- Inner ring (where connector joins) -->
        <ellipse cx="100" cy="15" rx="15" ry="3.5" fill="#475569" />
        
        <!-- 3D Grooves around main body -->
        <ellipse cx="100" cy="28" rx="22" ry="5" fill="none" stroke="#1e293b" stroke-width="2" opacity="0.6" />
        <ellipse cx="100" cy="40" rx="18" ry="4" fill="none" stroke="#1e293b" stroke-width="2" opacity="0.6" />

        <!-- Bottom ring of main body -->
        <ellipse cx="100" cy="55" rx="15" ry="4" fill="url(#metal-3d)" />
        
        <!-- Firing Tip -->
        <path d="M 85 55 L 115 55 L 108 70 L 92 70 Z" fill="url(#metal-3d)" />
        <!-- Bottom ring of tip -->
        <ellipse cx="100" cy="70" rx="8" ry="2.5" fill="url(#metal-3d)" />
        <!-- The actual hole where water comes out -->
        <ellipse cx="100" cy="70" rx="4" ry="1.2" fill="#000000" />
        
    </g>
</svg>
`;

const oldSvgRegex = /<style>.*?<\/svg>/s;
if(oldSvgRegex.test(content)) {
    content = content.replace(oldSvgRegex, newSvg);
    fs.writeFileSync('public/stamspolning.html', content, 'utf-8');
    console.log('Stamspolning SVG updated to 3D and smaller size');
} else {
    console.log('Could not find SVG to replace');
}
