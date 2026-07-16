const fs = require('fs');
let content = fs.readFileSync('public/stamspolning.html', 'utf-8');

const newSvg = `
<style>
body.light-theme .service-animation-wrapper {
    opacity: 0.6 !important; /* Högre opacitet så man ser de fina detaljerna */
}
@keyframes jetPulse {
    0% { transform: scaleY(0.9); opacity: 0.7; }
    100% { transform: scaleY(1.1); opacity: 1; }
}
@keyframes rotateNozzle {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(0.8); }
    100% { transform: scaleX(1); }
}
.animated-jet-center { animation: jetPulse 0.05s infinite alternate; transform-origin: top; }
.animated-jet-side { animation: jetPulse 0.08s infinite alternate; transform-origin: top; }
</style>
<div class="animation-label" style="display:none;">Spolningseffekt</div>
<svg viewBox="0 0 140 600" preserveAspectRatio="xMidYMin meet" class="stamspolning-svg" style="filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));">
    <defs>
        <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.3"/>
            <stop offset="15%" stop-color="#f8fafc" stop-opacity="0.9"/>
            <stop offset="85%" stop-color="#f1f5f9" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.4"/>
        </linearGradient>
        <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#64748b" />
            <stop offset="30%" stop-color="#f1f5f9" />
            <stop offset="70%" stop-color="#94a3b8" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
    </defs>

    <!-- Rörväggar med 3D-känsla -->
    <rect x="30" y="0" width="80" height="600" fill="url(#pipe-grad)" />
    <path d="M 30 0 L 30 600 M 110 0 L 110 600" stroke="#64748b" stroke-width="4" fill="none" />
    <path d="M 28 0 L 28 600 M 112 0 L 112 600" stroke="#cbd5e1" stroke-width="2" fill="none" />
    
    <!-- Skarvar i röret -->
    <g opacity="0.7">
        <path d="M 25 150 L 115 150 M 25 165 L 115 165" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
        <rect x="26" y="152" width="88" height="11" fill="#cbd5e1" />
        <path d="M 25 450 L 115 450 M 25 465 L 115 465" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
        <rect x="26" y="452" width="88" height="11" fill="#cbd5e1" />
    </g>

    <!-- Smuts och avlagringar (Dirt Clogs) -->
    <g class="dirt-clog" data-depth="0.15" style="transition: all 0.3s ease;">
        <path d="M 33 80 Q 50 90 70 85 T 107 80 L 107 140 Q 80 120 50 130 T 33 140 Z" fill="#854d0e" />
        <path d="M 33 90 Q 55 100 80 90 T 107 100 L 107 130 Q 75 115 45 125 T 33 120 Z" fill="#a16207" />
        <circle cx="50" cy="110" r="4" fill="#713f12" opacity="0.6"/>
        <circle cx="80" cy="115" r="6" fill="#713f12" opacity="0.6"/>
    </g>
    
    <g class="dirt-clog" data-depth="0.5" style="transition: all 0.3s ease;">
        <path d="M 33 280 Q 70 310 107 280 L 107 340 Q 60 320 33 340 Z" fill="#713f12" />
        <path d="M 33 295 Q 60 315 107 295 L 107 325 Q 70 310 33 320 Z" fill="#854d0e" />
        <circle cx="60" cy="310" r="5" fill="#422006" opacity="0.8"/>
        <circle cx="90" cy="315" r="3" fill="#422006" opacity="0.8"/>
    </g>

    <g class="dirt-clog" data-depth="0.85" style="transition: all 0.3s ease;">
        <path d="M 33 500 Q 80 480 107 510 L 107 570 Q 70 540 33 560 Z" fill="#422006" />
        <path d="M 33 515 Q 70 500 107 525 L 107 555 Q 60 535 33 545 Z" fill="#713f12" />
        <circle cx="45" cy="530" r="4" fill="#271304" opacity="0.9"/>
        <circle cx="85" cy="540" r="7" fill="#271304" opacity="0.9"/>
    </g>

    <!-- Spolmunstycke och vattenslang som åker ner -->
    <g class="nozzle-group" style="transform: translateY(calc(600px * var(--scroll-progress, 0))); transition: transform 0.1s ease-out;">
        
        <!-- Vattenslang som dras från toppen (oändligt lång uppåt) -->
        <rect x="64" y="-600" width="12" height="600" fill="#1e293b" />
        <rect x="66" y="-600" width="4" height="600" fill="#334155" />
        
        <!-- Bakåtriktade strålar (driver munstycket framåt) -->
        <g class="animated-jet-side">
            <path d="M 70 10 L 35 -60 M 70 10 L 105 -60" stroke="#7dd3fc" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.7" />
            <path d="M 70 10 L 45 -50 M 70 10 L 95 -50" stroke="#bae6fd" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9" />
            <path d="M 70 10 L 55 -65 M 70 10 L 85 -65" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.8" />
        </g>

        <!-- Framåtriktade rensande strålar -->
        <g class="animated-jet-center">
            <!-- Main thick spray -->
            <path d="M 70 25 L 40 100 M 70 25 L 70 110 M 70 25 L 100 100" stroke="#0ea5e9" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.6" />
            <!-- Inner bright spray -->
            <path d="M 70 25 L 50 95 M 70 25 L 70 105 M 70 25 L 90 95" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8" />
            <!-- Core white spray -->
            <path d="M 70 25 L 60 90 M 70 25 L 70 100 M 70 25 L 80 90" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity="1" />
        </g>

        <!-- Själva metallmunstycket -->
        <!-- Koppling till slang -->
        <rect x="60" y="-12" width="20" height="15" fill="url(#metal-grad)" rx="2" />
        <rect x="58" y="0" width="24" height="6" fill="#334155" rx="1" />
        
        <!-- Huvudkropp (konformad) -->
        <path d="M 55 6 L 85 6 L 78 28 L 62 28 Z" fill="url(#metal-grad)" />
        <path d="M 55 6 L 85 6 L 78 28 L 62 28 Z" fill="none" stroke="#1e293b" stroke-width="1.5" />
        
        <!-- Detaljer på kroppen (räfflor) -->
        <line x1="57" y1="12" x2="83" y2="12" stroke="#1e293b" stroke-width="1" opacity="0.5" />
        <line x1="59" y1="18" x2="81" y2="18" stroke="#1e293b" stroke-width="1" opacity="0.5" />
        <line x1="61" y1="24" x2="79" y2="24" stroke="#1e293b" stroke-width="1" opacity="0.5" />

        <!-- Munstyckets spets (där framåtsprut kommer ut) -->
        <path d="M 62 28 L 78 28 L 73 35 L 67 35 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="1" />
        
    </g>
</svg>
`;

const oldSvgRegex = /<div class="animation-label">Spolningseffekt.*?<\/svg>/s;
if(oldSvgRegex.test(content)) {
    content = content.replace(oldSvgRegex, newSvg);
    fs.writeFileSync('public/stamspolning.html', content, 'utf-8');
    console.log('Stamspolning SVG updated');
} else {
    console.log('Could not find SVG to replace');
}
