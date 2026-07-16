const fs = require('fs');
let content = fs.readFileSync('public/stamspolning.html', 'utf-8');

const newSvg = `
<style>
body.light-theme .service-animation-wrapper {
    opacity: 0.85 !important; /* Ökad synlighet för att gjutjärnet är mörkare */
    transform: translateY(-50%) scale(0.6) !important; 
    transform-origin: right center !important; 
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.25)); /* Kraftigare skugga för tung metallkänsla */
}
</style>
<div class="animation-label" style="display:none;">Spolningseffekt</div>
<svg viewBox="0 0 160 800" preserveAspectRatio="xMidYMin meet" class="stamspolning-svg">
    <defs>
        <!-- CAST IRON TEXTURE (Gjutjärn) -->
        <pattern id="cast-iron-stipple" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="#1e293b" /> <!-- Grafitgrå/svart bas -->
            
            <!-- Roststrimmor -->
            <path d="M 10 10 Q 25 30 40 10 T 70 30" stroke="#451a03" stroke-width="3" fill="none" opacity="0.4" />
            <path d="M 20 50 Q 40 70 50 40" stroke="#78350f" stroke-width="4" fill="none" opacity="0.3" />
            <path d="M 50 20 Q 60 5 45 -10" stroke="#451a03" stroke-width="2" fill="none" opacity="0.4" />

            <!-- Gropar och skrovlighet (mörka) -->
            <circle cx="8" cy="20" r="2.5" fill="#0f172a" />
            <circle cx="28" cy="12" r="1.5" fill="#0f172a" />
            <circle cx="45" cy="8" r="3" fill="#020617" opacity="0.8" />
            <circle cx="18" cy="42" r="1.5" fill="#0f172a" />
            <circle cx="38" cy="52" r="2.5" fill="#020617" />
            <circle cx="52" cy="38" r="1.5" fill="#0f172a" opacity="0.6" />
            <circle cx="55" cy="55" r="2" fill="#0f172a" opacity="0.9" />
            <circle cx="10" cy="50" r="1" fill="#020617" />
            
            <!-- Små metalliska blänk i groparna -->
            <circle cx="9" cy="21" r="1" fill="#334155" />
            <circle cx="46" cy="9" r="1.5" fill="#334155" />
            <circle cx="39" cy="53" r="1" fill="#334155" />
        </pattern>
        
        <!-- Gradient för att ge röret 3D-djup över gjutjärnstexturen -->
        <linearGradient id="pipe-shading" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#000000" stop-opacity="0.7"/>
            <stop offset="15%" stop-color="#000000" stop-opacity="0.1"/>
            <stop offset="50%" stop-color="#ffffff" stop-opacity="0.05"/>
            <stop offset="85%" stop-color="#000000" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.8"/>
        </linearGradient>

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
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#bae6fd" stop-opacity="0.1" />
        </linearGradient>
        
        <!-- Filter for 2.5D Depth -->
        <filter id="shadow-deep" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#020617" flood-opacity="0.6" />
        </filter>
        <filter id="shadow-light" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#020617" flood-opacity="0.5" />
        </filter>
    </defs>

    <!-- Pipe Walls (Gjutjärn) -->
    <rect x="30" y="0" width="100" height="800" fill="url(#cast-iron-stipple)" />
    <!-- Ovanpå lägger vi skuggningen för att göra det runt -->
    <rect x="30" y="0" width="100" height="800" fill="url(#pipe-shading)" />
    
    <!-- Rörkonturer, tjocka och svarta -->
    <path d="M 30 0 L 30 800 M 130 0 L 130 800" stroke="#020617" stroke-width="8" fill="none" />
    <path d="M 26 0 L 26 800 M 134 0 L 134 800" stroke="#334155" stroke-width="2" fill="none" />

    <!-- Tunga gjutjärnsflänsar -->
    <g opacity="0.95" filter="url(#shadow-light)">
        <!-- Flange 1 -->
        <rect x="18" y="200" width="124" height="26" fill="#0f172a" rx="4" />
        <rect x="18" y="200" width="124" height="26" fill="url(#pipe-shading)" rx="4" />
        <rect x="18" y="200" width="124" height="26" fill="none" stroke="#020617" stroke-width="2" rx="4" />
        <line x1="20" y1="206" x2="140" y2="206" stroke="#475569" stroke-width="1.5" opacity="0.6" />
        <line x1="20" y1="218" x2="140" y2="218" stroke="#000000" stroke-width="2" opacity="0.8" />
        <!-- Rejäla bultar -->
        <g stroke="#020617" stroke-width="1.5">
            <circle cx="35" cy="213" r="5" fill="#475569" /><circle cx="35" cy="213" r="2" fill="#1e293b" />
            <circle cx="80" cy="213" r="5" fill="#475569" /><circle cx="80" cy="213" r="2" fill="#1e293b" />
            <circle cx="125" cy="213" r="5" fill="#475569" /><circle cx="125" cy="213" r="2" fill="#1e293b" />
        </g>
        
        <!-- Flange 2 -->
        <rect x="18" y="550" width="124" height="26" fill="#0f172a" rx="4" />
        <rect x="18" y="550" width="124" height="26" fill="url(#pipe-shading)" rx="4" />
        <rect x="18" y="550" width="124" height="26" fill="none" stroke="#020617" stroke-width="2" rx="4" />
        <line x1="20" y1="556" x2="140" y2="556" stroke="#475569" stroke-width="1.5" opacity="0.6" />
        <line x1="20" y1="568" x2="140" y2="568" stroke="#000000" stroke-width="2" opacity="0.8" />
        <!-- Rejäla bultar -->
        <g stroke="#020617" stroke-width="1.5">
            <circle cx="35" cy="563" r="5" fill="#475569" /><circle cx="35" cy="563" r="2" fill="#1e293b" />
            <circle cx="80" cy="563" r="5" fill="#475569" /><circle cx="80" cy="563" r="2" fill="#1e293b" />
            <circle cx="125" cy="563" r="5" fill="#475569" /><circle cx="125" cy="563" r="2" fill="#1e293b" />
        </g>
    </g>

    <!-- Kontrasterande Smuts (Ljusa/Gula fettklumpar och brun rost som poppar mot den svarta väggen) -->
    <g class="dirt-clog" data-depth="0.15" style="transition: all 0.3s ease;" filter="url(#shadow-light)">
        <!-- Ljust fett blandat med smuts -->
        <path d="M 33 120 Q 60 140 85 130 T 127 120 L 127 220 Q 90 190 50 200 T 33 220 Z" fill="#b45309" />
        <path d="M 33 130 Q 70 150 127 135 L 127 200 Q 80 170 33 190 Z" fill="#d97706" />
        <path d="M 33 145 Q 65 170 127 155 L 127 180 Q 70 155 33 170 Z" fill="#f59e0b" />
        <circle cx="50" cy="160" r="5" fill="#78350f" />
        <circle cx="65" cy="180" r="8" fill="#92400e" />
        <circle cx="100" cy="150" r="6" fill="#78350f" />
    </g>
    
    <g class="dirt-clog" data-depth="0.55" style="transition: all 0.3s ease;" filter="url(#shadow-light)">
        <path d="M 33 400 Q 80 440 127 400 L 127 480 Q 70 450 33 480 Z" fill="#92400e" />
        <path d="M 33 415 Q 80 455 127 415 L 127 455 Q 70 440 33 460 Z" fill="#b45309" />
        <circle cx="70" cy="440" r="9" fill="#451a03" />
        <circle cx="100" cy="450" r="5" fill="#78350f" />
    </g>

    <g class="dirt-clog" data-depth="0.9" style="transition: all 0.3s ease;" filter="url(#shadow-deep)">
        <!-- Grovt bottenstopp -->
        <path d="M 33 700 Q 80 670 127 700 L 127 800 L 33 800 Z" fill="#451a03" />
        <path d="M 33 715 Q 80 685 127 715 L 127 780 Q 70 760 33 780 Z" fill="#78350f" />
        <path d="M 33 735 Q 80 705 127 735 L 127 760 Q 70 740 33 760 Z" fill="#92400e" />
        <!-- Skräp -->
        <rect x="55" y="735" width="12" height="12" fill="#1c1917" rx="2" transform="rotate(15 60 740)" />
        <circle cx="100" cy="730" r="12" fill="#292524" />
        <path d="M 70 760 L 90 775 L 85 785 L 65 770 Z" fill="#1c1917" />
    </g>

    <!-- Nozzle & Hose (Moving Layer) - Blänkande metall poppar mot svart rör -->
    <g class="nozzle-group" style="transform: translateY(calc(800px * var(--scroll-progress, 0))); transition: transform 0.1s ease-out;" filter="url(#shadow-deep)">
        
        <!-- Hose (Armerad tjock gummislang) -->
        <rect x="70" y="-800" width="20" height="800" fill="#0f172a" />
        <!-- Korsat mönster för armerad slang -->
        <path d="M 70 -795 L 90 -785 M 70 -790 L 90 -780 M 70 -785 L 90 -775 M 70 -780 L 90 -770 M 70 -775 L 90 -765 M 70 -770 L 90 -760 M 70 -765 L 90 -755 M 70 -760 L 90 -750" stroke="#1e293b" stroke-width="1" />
        <rect x="70" y="-800" width="20" height="800" fill="none" stroke="#000000" stroke-width="2" />
        <rect x="74" y="-800" width="5" height="800" fill="#475569" opacity="0.6" />

        <!-- Backward Jets (Väldigt ljusa, turkosa) -->
        <g>
            <path d="M 80 15 L 10 -90 M 80 15 L 150 -90" stroke="#7dd3fc" stroke-width="16" stroke-linecap="round" fill="none" opacity="0.7" />
            <path d="M 80 15 L 25 -80 M 80 15 L 135 -80" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" fill="none" opacity="1" />
            <path d="M 80 15 L 45 -70 M 80 15 L 115 -70" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none" />
        </g>

        <!-- Forward Jets -->
        <g>
            <path d="M 80 40 L 35 200 Q 80 230 125 200 Z" fill="url(#water-cone)" />
            <path d="M 80 40 L 55 180 M 80 40 L 80 190 M 80 40 L 105 180" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.9" />
            <path d="M 80 40 L 65 175 M 80 40 L 80 185 M 80 40 L 95 175" stroke="#7dd3fc" stroke-width="4" stroke-linecap="round" fill="none" opacity="1" />
            <path d="M 80 40 L 80 180" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" />
        </g>

        <!-- Premium Metal Nozzle (Klarare metallfärg mot det mörka röret) -->
        <rect x="66" y="-5" width="28" height="18" fill="url(#metal-dark)" rx="4" />
        <rect x="66" y="-5" width="28" height="18" fill="none" stroke="#000000" stroke-width="2" rx="4" />
        <rect x="64" y="4" width="32" height="6" fill="#1e293b" rx="2" />
        
        <path d="M 62 13 L 98 13 L 94 28 L 66 28 Z" fill="url(#metal-light)" />
        <path d="M 62 13 L 98 13 L 94 28 L 66 28 Z" fill="none" stroke="#000000" stroke-width="2" />
        
        <path d="M 66 28 L 94 28 L 86 45 L 74 45 Z" fill="url(#metal-dark)" />
        <path d="M 66 28 L 94 28 L 86 45 L 74 45 Z" fill="none" stroke="#000000" stroke-width="2" />
        <circle cx="80" cy="43" r="2.5" fill="#000000" />
        
    </g>
</svg>
`;

const oldSvgRegex = /<style>.*?<\/svg>/s;
if(oldSvgRegex.test(content)) {
    content = content.replace(oldSvgRegex, newSvg);
    fs.writeFileSync('public/stamspolning.html', content, 'utf-8');
    console.log('Stamspolning SVG updated to CAST IRON detail');
} else {
    console.log('Could not find SVG to replace');
}
