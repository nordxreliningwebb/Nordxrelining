const fs = require('fs');

let html = fs.readFileSync('public/stamspolning.html', 'utf8');

// Extract Top Intro Text
const introMatch = html.match(/<h2 style="font-size: 2\.5rem;(.*?)<h3 style="font-size: 1\.75rem; margin-bottom: 1rem; color: #0f172a; padding-top: 1rem; border-top: 1px solid #e2e8f0;">Så här går det till – Steg för Steg<\/h3>/s);
if (!introMatch) { console.log('Intro not found'); process.exit(1); }
const introText = '<h2 style="font-size: 2.5rem;' + introMatch[1];

// Extract Steps and FAQ
const stepsMatch = html.match(/(<p style="font-size: 1\.125rem; line-height: 1\.8; margin-bottom: 1\.5rem;">När vi på Nordx Relining utför ett arbete.*?<\/details>)/s);
if (!stepsMatch) { console.log('Steps not found'); process.exit(1); }
const stepsText = '<h3 style="font-size: 1.75rem; margin-bottom: 1rem; color: #0f172a; padding-top: 1rem; border-top: 1px solid #e2e8f0;">Så här går det till – Steg för Steg</h3>\n        ' + stepsMatch[1];

const newLayout = `
<section class="service-page-content" id="stamspolning-content" style="padding: 100px 0; background: #ffffff; position: relative; overflow: hidden;">
    
    <!-- Bakgrundsrör: En SVG som startar uppe till höger, böjer av till vänster och går ner -->
    <svg class="dynamic-pipe-divider" viewBox="0 0 1400 1200" preserveAspectRatio="none" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 1400px; height: 100%; z-index: 0; pointer-events: none;">
        <defs>
            <linearGradient id="pipe-base" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#94a3b8" />
                <stop offset="10%" stop-color="#f8fafc" />
                <stop offset="50%" stop-color="#e2e8f0" />
                <stop offset="90%" stop-color="#f1f5f9" />
                <stop offset="100%" stop-color="#64748b" />
            </linearGradient>
            <!-- Dropp/Puls-gradient -->
            <linearGradient id="water-pulse" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0284c7" stop-opacity="0" />
                <stop offset="50%" stop-color="#0ea5e9" stop-opacity="1" />
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
            </linearGradient>
        </defs>
        
        <!-- Själva röret -->
        <path id="main-pipe-path" d="M 1200 -100 L 1200 400 Q 1200 550 1050 550 L 350 550 Q 200 550 200 700 L 200 1800" 
              fill="none" stroke="url(#pipe-base)" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
              
        <!-- Vatteneffekten i röret -->
        <path class="animated-water-flow" d="M 1200 -100 L 1200 400 Q 1200 550 1050 550 L 350 550 Q 200 550 200 700 L 200 1800" 
              fill="none" stroke="#0ea5e9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" 
              stroke-dasharray="30 60" style="filter: drop-shadow(0 0 10px #38bdf8);" />
    </svg>

    <div class="container layout-wrapper" style="max-width: 1400px; width: 95%; margin: 0 auto; position: relative; z-index: 2;">
        
        <!-- Övre delen: Text till vänster, tomt till höger för att ge plats åt röret -->
        <div class="row-top" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 4rem; margin-bottom: 8rem;">
            <div class="content-left intro-text-box" style="background: rgba(255,255,255,0.85); backdrop-filter: blur(5px); border-radius: 20px; padding: 2rem; box-shadow: 0 10px 40px rgba(0,0,0,0.03);">
                ${introText}
            </div>
            <div class="empty-right"></div>
        </div>

        <!-- Mitten: Mellanrum där röret skär diagonalt / böjer sig över skärmen -->
        <div class="row-middle" style="height: 100px;"></div>

        <!-- Undre delen: Tomt till vänster (röret löper här), Steg och FAQ till höger -->
        <div class="row-bottom" style="display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 4rem;">
            <div class="empty-left"></div>
            <div class="content-right steps-box" style="background: rgba(255,255,255,0.85); backdrop-filter: blur(5px); border-radius: 20px; padding: 2rem; box-shadow: 0 10px 40px rgba(0,0,0,0.03);">
                ${stepsText}
            </div>
        </div>

    </div>

    <style>
        @media (max-width: 1000px) {
            .row-top, .row-bottom {
                grid-template-columns: 1fr !important;
            }
            .empty-right, .empty-left, .row-middle, .dynamic-pipe-divider {
                display: none !important;
            }
        }
    </style>
</section>
`;

const oldSectionRegex = /<section class="service-page-content" id="stamspolning-content".*?<\/section>/s;
if (!oldSectionRegex.test(html)) {
    console.log('Could not find old section to replace');
    process.exit(1);
}

html = html.replace(oldSectionRegex, newLayout);
fs.writeFileSync('public/stamspolning.html', html, 'utf8');
console.log('Layout updated successfully.');
