const fs = require('fs');
let content = fs.readFileSync('public/stamspolning.html', 'utf-8');

// The clean, lighter 2.5D Corporate Flat SVG (which the user liked before the cast iron experiment)
// With the added feature: Water flowing based on scroll progress using dashoffset
const newSvg = `
<style>
body.light-theme .service-animation-wrapper {
    opacity: 0.8 !important; 
    transform: translateY(-50%) scale(0.6) !important; 
    transform-origin: right center !important; 
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.15)); 
}
</style>
<div class="animation-label" style="display:none;">Spolningseffekt</div>
<svg viewBox="0 0 160 800" preserveAspectRatio="xMidYMin meet" class="stamspolning-svg">
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
        
        <filter id="shadow-deep" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.3" />
        </filter>
        <filter id="shadow-light" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-opacity="0.2" />
        </filter>
    </defs>

    <!-- Pipe Walls (Clean look) -->
    <rect x="30" y="0" width="100" height="800" fill="url(#pipe-base)" />
    <rect x="30" y="0" width="100" height="800" fill="url(#rust-texture)" />
    <path d="M 30 0 L 30 800 M 130 0 L 130 800" stroke="#334155" stroke-width="6" fill="none" />
    <path d="M 27 0 L 27 800 M 133 0 L 133 800" stroke="#cbd5e1" stroke-width="2" fill="none" />

    <!-- Flange Joints -->
    <g opacity="0.9" filter="url(#shadow-light)">
        <rect x="20" y="200" width="120" height="22" fill="url(#metal-dark)" rx="3" />
        <rect x="20" y="200" width="120" height="22" fill="none" stroke="#1e293b" stroke-width="2" rx="3" />
        <line x1="22" y1="205" x2="138" y2="205" stroke="#ffffff" stroke-width="1.5" opacity="0.3" />
        <g stroke="#1e293b" stroke-width="1">
            <circle cx="35" cy="211" r="4" fill="#e2e8f0" /><circle cx="35" cy="211" r="1.5" fill="#475569" />
            <circle cx="80" cy="211" r="4" fill="#e2e8f0" /><circle cx="80" cy="211" r="1.5" fill="#475569" />
            <circle cx="125" cy="211" r="4" fill="#e2e8f0" /><circle cx="125" cy="211" r="1.5" fill="#475569" />
        </g>
        
        <rect x="20" y="550" width="120" height="22" fill="url(#metal-dark)" rx="3" />
        <rect x="20" y="550" width="120" height="22" fill="none" stroke="#1e293b" stroke-width="2" rx="3" />
        <line x1="22" y1="555" x2="138" y2="555" stroke="#ffffff" stroke-width="1.5" opacity="0.3" />
        <g stroke="#1e293b" stroke-width="1">
            <circle cx="35" cy="561" r="4" fill="#e2e8f0" /><circle cx="35" cy="561" r="1.5" fill="#475569" />
            <circle cx="80" cy="561" r="4" fill="#e2e8f0" /><circle cx="80" cy="561" r="1.5" fill="#475569" />
            <circle cx="125" cy="561" r="4" fill="#e2e8f0" /><circle cx="125" cy="561" r="1.5" fill="#475569" />
        </g>
    </g>

    <!-- Dirt Clogs -->
    <g class="dirt-clog" data-depth="0.15" style="transition: all 0.3s ease;" filter="url(#shadow-light)">
        <path d="M 33 120 Q 60 140 85 130 T 127 120 L 127 220 Q 90 190 50 200 T 33 220 Z" fill="#713f12" />
        <path d="M 33 130 Q 70 150 127 135 L 127 200 Q 80 170 33 190 Z" fill="#854d0e" />
        <path d="M 33 145 Q 65 170 127 155 L 127 180 Q 70 155 33 170 Z" fill="#a16207" />
    </g>
    
    <g class="dirt-clog" data-depth="0.55" style="transition: all 0.3s ease;" filter="url(#shadow-light)">
        <path d="M 33 400 Q 80 440 127 400 L 127 480 Q 70 450 33 480 Z" fill="#422006" />
        <path d="M 33 415 Q 80 455 127 415 L 127 455 Q 70 440 33 460 Z" fill="#713f12" />
        <circle cx="70" cy="440" r="9" fill="#271304" opacity="0.8"/>
    </g>

    <g class="dirt-clog" data-depth="0.9" style="transition: all 0.3s ease;" filter="url(#shadow-deep)">
        <path d="M 33 700 Q 80 670 127 700 L 127 800 L 33 800 Z" fill="#271304" />
        <path d="M 33 715 Q 80 685 127 715 L 127 780 Q 70 760 33 780 Z" fill="#422006" />
    </g>

    <!-- Nozzle & Flowing Hose -->
    <g class="nozzle-group" style="transform: translateY(calc(800px * var(--scroll-progress, 0)));" filter="url(#shadow-deep)">
        
        <!-- Hose -->
        <rect x="70" y="-800" width="20" height="800" fill="url(#metal-dark)" />
        <rect x="70" y="-800" width="20" height="800" fill="none" stroke="#1e293b" stroke-width="2" />
        <rect x="74" y="-800" width="6" height="800" fill="#475569" />

        <!-- Backward Flowing Jets -->
        <g>
            <path d="M 80 15 L 10 -90 M 80 15 L 150 -90" stroke="#bae6fd" stroke-width="16" stroke-linecap="round" fill="none" opacity="0.6" />
            <!-- The flowing water effect using dashoffset tied to scroll-progress! -->
            <path d="M 80 15 L 25 -80 M 80 15 L 135 -80" stroke="#7dd3fc" stroke-width="6" stroke-linecap="round" fill="none" stroke-dasharray="15 10" style="stroke-dashoffset: calc(2000px * var(--scroll-progress, 0));" />
            <path d="M 80 15 L 45 -70 M 80 15 L 115 -70" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" stroke-dasharray="10 15" style="stroke-dashoffset: calc(1500px * var(--scroll-progress, 0));" />
        </g>

        <!-- Forward Flowing Jets -->
        <g>
            <path d="M 80 40 L 55 180 M 80 40 L 80 190 M 80 40 L 105 180" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.9" stroke-dasharray="20 15" style="stroke-dashoffset: calc(-2500px * var(--scroll-progress, 0));" />
            <path d="M 80 40 L 65 175 M 80 40 L 80 185 M 80 40 L 95 175" stroke="#bae6fd" stroke-width="4" stroke-linecap="round" fill="none" stroke-dasharray="12 10" style="stroke-dashoffset: calc(-1800px * var(--scroll-progress, 0));" />
            <path d="M 80 40 L 80 180" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" stroke-dasharray="8 8" style="stroke-dashoffset: calc(-3000px * var(--scroll-progress, 0));" />
        </g>

        <!-- Premium Metal Nozzle -->
        <rect x="66" y="-5" width="28" height="18" fill="url(#metal-dark)" rx="4" />
        <rect x="66" y="-5" width="28" height="18" fill="none" stroke="#1e293b" stroke-width="2" rx="4" />
        
        <path d="M 62 13 L 98 13 L 94 28 L 66 28 Z" fill="url(#metal-light)" />
        <path d="M 62 13 L 98 13 L 94 28 L 66 28 Z" fill="none" stroke="#1e293b" stroke-width="2" />
        
        <path d="M 66 28 L 94 28 L 86 45 L 74 45 Z" fill="url(#metal-dark)" />
        <path d="M 66 28 L 94 28 L 86 45 L 74 45 Z" fill="none" stroke="#1e293b" stroke-width="2" />
        
    </g>
</svg>
`;

const oldSvgRegex = /<style>.*?<\/svg>/s;
if(oldSvgRegex.test(content)) {
    content = content.replace(oldSvgRegex, newSvg);
    fs.writeFileSync('public/stamspolning.html', content, 'utf-8');
    console.log('Stamspolning SVG updated to revert to clean layout and add flowing water');
} else {
    console.log('Could not find SVG to replace');
}
