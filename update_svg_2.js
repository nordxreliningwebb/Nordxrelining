const fs = require('fs');
let content = fs.readFileSync('public/stamspolning.html', 'utf-8');

const newSvg = `
<style>
body.light-theme .service-animation-wrapper {
    opacity: 0.65 !important; /* Extremely high detail visibility */
}
</style>
<div class="animation-label" style="display:none;">Spolningseffekt</div>
<svg viewBox="0 0 160 800" preserveAspectRatio="xMidYMin meet" class="stamspolning-svg" style="filter: drop-shadow(0 15px 30px rgba(0,0,0,0.15));">
    <defs>
        <linearGradient id="pipe-base" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#94a3b8" />
            <stop offset="10%" stop-color="#f8fafc" />
            <stop offset="50%" stop-color="#e2e8f0" />
            <stop offset="90%" stop-color="#f1f5f9" />
            <stop offset="100%" stop-color="#64748b" />
        </linearGradient>
        <pattern id="rust-texture" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2" fill="#475569" opacity="0.1"/>
            <circle cx="18" cy="18" r="1.5" fill="#475569" opacity="0.15"/>
            <circle cx="25" cy="8" r="1" fill="#475569" opacity="0.1"/>
            <path d="M 5 25 Q 10 20 15 25" stroke="#475569" stroke-width="1" fill="none" opacity="0.1" />
        </pattern>
        <linearGradient id="metal-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="40%" stop-color="#94a3b8" />
            <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
        <linearGradient id="metal-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#cbd5e1" />
            <stop offset="40%" stop-color="#ffffff" />
            <stop offset="100%" stop-color="#64748b" />
        </linearGradient>
        <linearGradient id="water-cone" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.1" />
        </linearGradient>
        <linearGradient id="water-cone-side" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0" />
        </linearGradient>
    </defs>

    <!-- Pipe Walls -->
    <rect x="30" y="0" width="100" height="800" fill="url(#pipe-base)" />
    <rect x="30" y="0" width="100" height="800" fill="url(#rust-texture)" />
    
    <path d="M 30 0 L 30 800 M 130 0 L 130 800" stroke="#334155" stroke-width="6" fill="none" />
    <path d="M 27 0 L 27 800 M 133 0 L 133 800" stroke="#cbd5e1" stroke-width="2" fill="none" />

    <!-- Highly Detailed Flange Joints -->
    <g opacity="0.9">
        <!-- Flange 1 -->
        <rect x="20" y="200" width="120" height="22" fill="url(#metal-dark)" rx="3" />
        <rect x="20" y="200" width="120" height="22" fill="none" stroke="#1e293b" stroke-width="2" rx="3" />
        <line x1="22" y1="205" x2="138" y2="205" stroke="#ffffff" stroke-width="1.5" opacity="0.3" />
        <line x1="22" y1="216" x2="138" y2="216" stroke="#000000" stroke-width="1.5" opacity="0.5" />
        <!-- Bolts -->
        <g stroke="#1e293b" stroke-width="1">
            <circle cx="35" cy="211" r="4" fill="#e2e8f0" /><circle cx="35" cy="211" r="1.5" fill="#475569" />
            <circle cx="80" cy="211" r="4" fill="#e2e8f0" /><circle cx="80" cy="211" r="1.5" fill="#475569" />
            <circle cx="125" cy="211" r="4" fill="#e2e8f0" /><circle cx="125" cy="211" r="1.5" fill="#475569" />
        </g>
        
        <!-- Flange 2 -->
        <rect x="20" y="550" width="120" height="22" fill="url(#metal-dark)" rx="3" />
        <rect x="20" y="550" width="120" height="22" fill="none" stroke="#1e293b" stroke-width="2" rx="3" />
        <line x1="22" y1="555" x2="138" y2="555" stroke="#ffffff" stroke-width="1.5" opacity="0.3" />
        <line x1="22" y1="566" x2="138" y2="566" stroke="#000000" stroke-width="1.5" opacity="0.5" />
        <!-- Bolts -->
        <g stroke="#1e293b" stroke-width="1">
            <circle cx="35" cy="561" r="4" fill="#e2e8f0" /><circle cx="35" cy="561" r="1.5" fill="#475569" />
            <circle cx="80" cy="561" r="4" fill="#e2e8f0" /><circle cx="80" cy="561" r="1.5" fill="#475569" />
            <circle cx="125" cy="561" r="4" fill="#e2e8f0" /><circle cx="125" cy="561" r="1.5" fill="#475569" />
        </g>
    </g>

    <!-- Detailed Dirt Clogs -->
    <g class="dirt-clog" data-depth="0.15" style="transition: all 0.3s ease;">
        <path d="M 33 120 Q 60 140 85 130 T 127 120 L 127 220 Q 90 190 50 200 T 33 220 Z" fill="#713f12" />
        <path d="M 33 130 Q 70 150 127 135 L 127 200 Q 80 170 33 190 Z" fill="#854d0e" />
        <path d="M 33 145 Q 65 170 127 155 L 127 180 Q 70 155 33 170 Z" fill="#a16207" />
        <path d="M 40 160 Q 60 180 80 165" stroke="#422006" stroke-width="2" fill="none" opacity="0.5"/>
        <path d="M 90 140 Q 110 160 120 145" stroke="#422006" stroke-width="2" fill="none" opacity="0.5"/>
        <circle cx="50" cy="160" r="5" fill="#422006" opacity="0.8"/>
        <circle cx="65" cy="180" r="8" fill="#422006" opacity="0.6"/>
        <circle cx="100" cy="150" r="6" fill="#422006" opacity="0.7"/>
        <circle cx="110" cy="190" r="4" fill="#422006" opacity="0.8"/>
    </g>
    
    <g class="dirt-clog" data-depth="0.55" style="transition: all 0.3s ease;">
        <path d="M 33 400 Q 80 440 127 400 L 127 480 Q 70 450 33 480 Z" fill="#422006" />
        <path d="M 33 415 Q 80 455 127 415 L 127 455 Q 70 440 33 460 Z" fill="#713f12" />
        <path d="M 50 400 Q 60 440 45 480" stroke="#271304" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M 90 400 Q 80 430 95 480" stroke="#271304" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="70" cy="440" r="9" fill="#271304" opacity="0.8"/>
        <circle cx="100" cy="450" r="5" fill="#271304" opacity="0.8"/>
    </g>

    <g class="dirt-clog" data-depth="0.9" style="transition: all 0.3s ease;">
        <path d="M 33 700 Q 80 670 127 700 L 127 800 L 33 800 Z" fill="#271304" />
        <path d="M 33 715 Q 80 685 127 715 L 127 780 Q 70 760 33 780 Z" fill="#422006" />
        <path d="M 33 735 Q 80 705 127 735 L 127 760 Q 70 740 33 760 Z" fill="#713f12" />
        <circle cx="60" cy="740" r="8" fill="#1a0d03" />
        <circle cx="100" cy="730" r="12" fill="#1a0d03" />
        <circle cx="80" cy="770" r="15" fill="#1a0d03" />
        <circle cx="45" cy="775" r="7" fill="#1a0d03" />
        <circle cx="115" cy="760" r="9" fill="#1a0d03" />
    </g>

    <!-- Nozzle & Hose (Moving Layer) -->
    <g class="nozzle-group" style="transform: translateY(calc(800px * var(--scroll-progress, 0))); transition: transform 0.1s ease-out;">
        
        <!-- Hose -->
        <rect x="70" y="-800" width="20" height="800" fill="url(#metal-dark)" />
        <rect x="70" y="-800" width="20" height="800" fill="none" stroke="#1e293b" stroke-width="2" />
        <rect x="74" y="-800" width="6" height="800" fill="#475569" />
        <!-- Static hose texture segments -->
        <path d="M 70 -750 L 90 -745 M 70 -700 L 90 -695 M 70 -650 L 90 -645 M 70 -600 L 90 -595 M 70 -550 L 90 -545 M 70 -500 L 90 -495 M 70 -450 L 90 -445 M 70 -400 L 90 -395 M 70 -350 L 90 -345 M 70 -300 L 90 -295 M 70 -250 L 90 -245 M 70 -200 L 90 -195 M 70 -150 L 90 -145 M 70 -100 L 90 -95 M 70 -50 L 90 -45" stroke="#1e293b" stroke-width="2" />

        <!-- Backward Jets (Propulsion) -->
        <g>
            <path d="M 80 15 L 10 -90 M 80 15 L 150 -90" stroke="url(#water-cone-side)" stroke-width="16" stroke-linecap="round" fill="none" />
            <path d="M 80 15 L 25 -80 M 80 15 L 135 -80" stroke="#7dd3fc" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.9" />
            <path d="M 80 15 L 45 -70 M 80 15 L 115 -70" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" />
            <!-- Splashes -->
            <circle cx="20" cy="-70" r="3" fill="#bae6fd" />
            <circle cx="140" cy="-70" r="3" fill="#bae6fd" />
            <circle cx="35" cy="-85" r="2" fill="#ffffff" />
            <circle cx="125" cy="-85" r="2" fill="#ffffff" />
            <circle cx="15" cy="-95" r="4" fill="#38bdf8" opacity="0.7"/>
            <circle cx="145" cy="-95" r="4" fill="#38bdf8" opacity="0.7"/>
        </g>

        <!-- Forward Jets (Cleaning) -->
        <g>
            <!-- Large transparent cone -->
            <path d="M 80 40 L 35 200 Q 80 230 125 200 Z" fill="url(#water-cone)" />
            <!-- Distinct jets -->
            <path d="M 80 40 L 55 180 M 80 40 L 80 190 M 80 40 L 105 180" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.9" />
            <path d="M 80 40 L 65 175 M 80 40 L 80 185 M 80 40 L 95 175" stroke="#bae6fd" stroke-width="4" stroke-linecap="round" fill="none" opacity="1" />
            <!-- Central intense beam -->
            <path d="M 80 40 L 80 180" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />
            <!-- Heavy Droplets / Splashes -->
            <circle cx="50" cy="190" r="4" fill="#bae6fd" />
            <circle cx="65" cy="210" r="3" fill="#ffffff" />
            <circle cx="95" cy="205" r="4" fill="#bae6fd" />
            <circle cx="110" cy="185" r="3" fill="#7dd3fc" />
            <circle cx="80" cy="215" r="5" fill="#ffffff" />
            <circle cx="45" cy="170" r="2" fill="#ffffff" />
            <circle cx="115" cy="170" r="2" fill="#ffffff" />
        </g>

        <!-- Premium Metal Nozzle -->
        <!-- Connector Base -->
        <rect x="66" y="-5" width="28" height="18" fill="url(#metal-dark)" rx="4" />
        <rect x="66" y="-5" width="28" height="18" fill="none" stroke="#1e293b" stroke-width="2" rx="4" />
        <rect x="64" y="4" width="32" height="6" fill="#1e293b" rx="2" />
        
        <!-- Rotating Turbine Body -->
        <path d="M 62 13 L 98 13 L 94 28 L 66 28 Z" fill="url(#metal-light)" />
        <path d="M 62 13 L 98 13 L 94 28 L 66 28 Z" fill="none" stroke="#1e293b" stroke-width="2" />
        <!-- Turbine Blades / Grooves -->
        <g stroke="#475569" stroke-width="2" stroke-linecap="round">
            <line x1="65" y1="16" x2="71" y2="25" />
            <line x1="73" y1="15" x2="79" y2="26" />
            <line x1="81" y1="15" x2="87" y2="26" />
            <line x1="89" y1="16" x2="95" y2="25" />
        </g>

        <!-- Nozzle Firing Tip -->
        <path d="M 66 28 L 94 28 L 86 45 L 74 45 Z" fill="url(#metal-dark)" />
        <path d="M 66 28 L 94 28 L 86 45 L 74 45 Z" fill="none" stroke="#1e293b" stroke-width="2" />
        <!-- Opening Hole -->
        <circle cx="80" cy="43" r="2.5" fill="#0f172a" />
        <!-- Tiny industrial screws on tip -->
        <circle cx="72" cy="33" r="1.5" fill="#f8fafc" />
        <circle cx="88" cy="33" r="1.5" fill="#f8fafc" />
        
    </g>
</svg>
`;

const oldSvgRegex = /<style>.*?<\/svg>/s;
if(oldSvgRegex.test(content)) {
    content = content.replace(oldSvgRegex, newSvg);
    fs.writeFileSync('public/stamspolning.html', content, 'utf-8');
    console.log('Stamspolning SVG updated to STATIC HYPER-DETAILED');
} else {
    console.log('Could not find SVG to replace');
}
