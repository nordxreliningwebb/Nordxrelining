const fs = require('fs');

// CSS updates
const cssUpdates = `
/* --- Service Pages Architecture --- */
.service-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: flex-start;
}
@media(max-width: 900px) {
    .service-details-grid {
        grid-template-columns: 1fr;
    }
}
.service-text h2 {
    font-size: 2.2rem;
    color: #1e293b;
    margin-bottom: 1.5rem;
}
.service-text h3 {
    font-size: 1.5rem;
    color: #0fb3ff;
    margin: 2rem 0 1rem;
}
.service-text p {
    color: #475569;
    line-height: 1.8;
    margin-bottom: 1rem;
    font-size: 1.1rem;
}
.service-benefits {
    list-style: none;
    padding: 0;
}
.service-benefits li {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem;
    color: #334155;
    font-size: 1.1rem;
}
.service-benefits li::before {
    content: '✓';
    position: absolute;
    left: 0;
    top: 0;
    color: #0fb3ff;
    font-weight: bold;
    font-size: 1.2rem;
}

/* Animations wrappers */
.service-animation-wrapper {
    background: #f8fafc;
    border-radius: 16px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
    position: sticky;
    top: 120px;
    height: 500px;
    display: flex;
    flex-direction: column;
}
.animation-label {
    font-weight: bold;
    color: #64748b;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.relining-svg, .stamspolning-svg, .rorinspektion-svg {
    width: 100%;
    max-width: 150px;
    height: 100%;
    margin: 0 auto;
    display: block;
}
.pulse-ring {
    animation: pulse 2s infinite ease-out;
}
@keyframes pulse {
    0% { r: 10; opacity: 1; stroke-width: 2; }
    100% { r: 30; opacity: 0; stroke-width: 10; }
}
`;

if (!fs.readFileSync('public/style.css', 'utf8').includes('.service-details-grid')) {
    fs.appendFileSync('public/style.css', '\n' + cssUpdates);
}

// JS updates
const jsUpdates = `
document.addEventListener('DOMContentLoaded', () => {
    const contentSections = document.querySelectorAll('.service-page-content');
    if (contentSections.length > 0) {
        window.addEventListener('scroll', () => {
            contentSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                const startPoint = windowHeight * 0.8; 
                let progress = (startPoint - rect.top) / (rect.height);
                progress = Math.max(0, Math.min(1, progress));
                
                section.style.setProperty('--scroll-progress', progress);
                
                const dirts = section.querySelectorAll('.dirt-clog');
                dirts.forEach(dirt => {
                    const depth = parseFloat(dirt.getAttribute('data-depth'));
                    dirt.style.opacity = progress > depth ? '0' : '1';
                    dirt.style.transition = 'opacity 0.2s';
                });
            });
        });
        window.dispatchEvent(new Event('scroll'));
    }
});
`;

if (!fs.readFileSync('public/main.js', 'utf8').includes('--scroll-progress')) {
    fs.appendFileSync('public/main.js', '\n' + jsUpdates);
}

const pages = {
    relining: `<div class="service-details-grid">
    <div class="service-text">
        <h2>Vad är Relining?</h2>
        <p>Relining, eller rörinfodring som det också kallas, är en modern, kostnadseffektiv och miljövänlig metod för att renovera gamla och trasiga avloppsrör. Istället för att bila upp golv och riva ut hela rörsystemet, skapar vi helt enkelt ett <strong>nytt rör inuti det gamla</strong>.</p>
        
        <h3>Hur går det till?</h3>
        <p>Processen börjar med en noggrann <strong>rörinspektion</strong> och stamspolning för att säkerställa att röret är rent. Därefter skjuts en flexibel "strumpa" indränkt i epoxi eller polyesterharts in i rörsystemet. Med hjälp av tryckluft blåses strumpan upp så att den sluter tätt mot insidan av det gamla röret. När plasten har härdat har man fått ett skarvlöst, självbärande och extremt slitstarkt rör som ofta håller i över 50 år.</p>
        
        <h3>Fördelar med Relining</h3>
        <ul class="service-benefits">
            <li><strong>Snabbt:</strong> Ett vanligt villaprojekt tar ofta bara några dagar.</li>
            <li><strong>Bekvämt:</strong> Du slipper evakuera, och badrummet förblir intakt.</li>
            <li><strong>Ekonomiskt:</strong> Betydligt billigare än ett komplett stambyte.</li>
            <li><strong>Miljövänligt:</strong> Mindre byggavfall och minskade koldioxidutsläpp.</li>
        </ul>
    </div>
    <div class="service-animation-wrapper" id="relining-animation-wrapper">
        <div class="animation-label">Så här fungerar det (Scrolla ner 👇)</div>
        <svg viewBox="0 0 100 400" preserveAspectRatio="xMidYMin meet" class="relining-svg">
            <defs>
                <linearGradient id="sock-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0fb3ff" />
                    <stop offset="100%" stop-color="#0056b3" />
                </linearGradient>
            </defs>
            <path d="M 20 0 L 20 400 M 80 0 L 80 400" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round" fill="none" />
            <path d="M 20 50 L 35 60 L 20 70 M 80 150 L 65 160 L 80 170 M 20 250 L 30 260 M 80 320 L 70 330" stroke="#cbd5e1" stroke-width="2" fill="none" />
            <path d="M 30 0 L 30 400 M 70 0 L 70 400 M 30 400 L 70 400" stroke="url(#sock-gradient)" stroke-width="16" fill="none" class="new-sock-path" style="stroke-dasharray: 1000; stroke-dashoffset: calc(1000 - (1000 * var(--scroll-progress, 0))); transition: stroke-dashoffset 0.1s ease-out;" />
        </svg>
    </div>
</div>`,
    stamspolning: `<div class="service-details-grid">
    <div class="service-text">
        <h2>Varför Stamspolning?</h2>
        <p>Stamspolning är den mest effektiva metoden för att underhålla och rengöra fastighetens avloppssystem. Med tiden samlas fett, avlagringar, tvålrester och smuts i rören, vilket minskar flödet och ökar risken för akuta stopp och kostsamma vattenskador.</p>
        
        <h3>När behövs det?</h3>
        <p>Vi rekommenderar att stamspolning utförs förebyggande ungefär vart tredje till femte år för flerbostadshus. Upplever du kluckande ljud från avloppet, dålig lukt eller att vattnet rinner undan långsamt? Då är det hög tid att boka en spolning!</p>
        
        <h3>Fördelar med vår Stamspolning</h3>
        <ul class="service-benefits">
            <li><strong>Skonsamt:</strong> Vi använder hetvatten och anpassat tryck för att inte skada rören.</li>
            <li><strong>Effektivt:</strong> Återställer rörens ursprungliga flödeskapacitet.</li>
            <li><strong>Ekonomiskt:</strong> Förebygger akuta jourutryckningar och översvämningar.</li>
            <li><strong>Livslängd:</strong> Regelbundet underhåll förlänger rörsystemets totala livslängd avsevärt.</li>
        </ul>
    </div>
    <div class="service-animation-wrapper" id="stamspolning-animation-wrapper">
        <div class="animation-label">Spolningseffekt (Scrolla ner 👇)</div>
        <svg viewBox="0 0 100 400" preserveAspectRatio="xMidYMin meet" class="stamspolning-svg">
            <path d="M 20 0 L 20 400 M 80 0 L 80 400" stroke="#475569" stroke-width="8" stroke-linecap="round" fill="none" />
            <path d="M 25 50 Q 50 70 75 50 L 75 100 Q 50 120 25 100 Z" fill="#78350f" class="dirt-clog" data-depth="0.1" />
            <path d="M 25 200 Q 50 220 75 200 L 75 250 Q 50 270 25 250 Z" fill="#78350f" class="dirt-clog" data-depth="0.5" />
            <path d="M 25 300 Q 50 320 75 300 L 75 350 Q 50 370 25 350 Z" fill="#78350f" class="dirt-clog" data-depth="0.8" />
            <path d="M 50 0 L 50 400" stroke="#38bdf8" stroke-width="30" stroke-linecap="round" fill="none" class="water-stream-path" style="stroke-dasharray: 400; stroke-dashoffset: calc(400 - (400 * var(--scroll-progress, 0))); transition: stroke-dashoffset 0.1s ease-out;" />
            <g class="nozzle-group" style="transform: translateY(calc(400px * var(--scroll-progress, 0))); transition: transform 0.1s ease-out;">
                <path d="M 30 10 L 20 30 M 50 10 L 50 35 M 70 10 L 80 30" stroke="#0ea5e9" stroke-width="4" stroke-linecap="round" fill="none" />
                <path d="M 40 -10 L 60 -10 L 55 10 L 45 10 Z" fill="#94a3b8" />
            </g>
        </svg>
    </div>
</div>`,
    rorinspektion: `<div class="service-details-grid">
    <div class="service-text">
        <h2>Noggrann Rörinspektion</h2>
        <p>Att utföra en rörinspektion (eller TV-inspektion) är det säkraste sättet att ta reda på det exakta skicket i ett rörsystem utan att behöva gräva eller bila upp något. Vi filmar insidan av rören med avancerade specialkameror.</p>
        
        <h3>När används det?</h3>
        <p>Oavsett om det handlar om återkommande stopp, misstanke om rötter som trängt in, eller en besiktning inför ett stundande husköp eller renovering, ger en inspektion ovärderlig information. Det är också det första obligatoriska steget innan vi utför relining.</p>
        
        <h3>Vad du får</h3>
        <ul class="service-benefits">
            <li><strong>Felsökning:</strong> Vi hittar exakt var en spricka eller ett stopp befinner sig.</li>
            <li><strong>Dokumentation:</strong> Komplett rapport och filmat material överlämnas efteråt.</li>
            <li><strong>Konditionsbedömning:</strong> En ärlig bedömning av rörens återstående livslängd.</li>
            <li><strong>Förebyggande:</strong> Identifiera små fel innan de utvecklas till dyra vattenskador.</li>
        </ul>
    </div>
    <div class="service-animation-wrapper" id="rorinspektion-animation-wrapper">
        <div class="animation-label">Skanningseffekt (Scrolla ner 👇)</div>
        <svg viewBox="0 0 100 400" preserveAspectRatio="xMidYMin meet" class="rorinspektion-svg" style="background:#0f172a; border-radius:8px;">
            <path d="M 20 0 L 20 400 M 80 0 L 80 400" stroke="#334155" stroke-width="8" stroke-linecap="round" fill="none" />
            <path d="M 20 80 L 30 90 L 20 100" stroke="#ef4444" stroke-width="3" fill="none" class="hidden-crack" style="opacity: calc(var(--scroll-progress, 0) > 0.2 ? 1 : 0); transition: opacity 0.3s;" />
            <path d="M 80 200 L 70 210 L 80 220" stroke="#ef4444" stroke-width="3" fill="none" class="hidden-crack" style="opacity: calc(var(--scroll-progress, 0) > 0.5 ? 1 : 0); transition: opacity 0.3s;" />
            <path d="M 20 320 L 30 330 M 80 350 L 70 360" stroke="#ef4444" stroke-width="3" fill="none" class="hidden-crack" style="opacity: calc(var(--scroll-progress, 0) > 0.8 ? 1 : 0); transition: opacity 0.3s;" />
            <g class="camera-scan-group" style="transform: translateY(calc(400px * var(--scroll-progress, 0))); transition: transform 0.1s ease-out;">
                <polygon points="50,0 10,80 90,80" fill="url(#scan-gradient)" />
                <circle cx="50" cy="0" r="6" fill="#10b981" />
                <circle cx="50" cy="0" r="10" stroke="#10b981" stroke-width="2" fill="none" class="pulse-ring" />
            </g>
            <defs>
                <linearGradient id="scan-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="rgba(16, 185, 129, 0.8)" />
                    <stop offset="100%" stop-color="rgba(16, 185, 129, 0)" />
                </linearGradient>
            </defs>
        </svg>
    </div>
</div>`
};

Object.keys(pages).forEach(pageId => {
    let content = fs.readFileSync(`public/${pageId}.html`, 'utf-8');
    content = content.replace(`<!-- Content will be injected here -->`, pages[pageId]);
    fs.writeFileSync(`public/${pageId}.html`, content, 'utf-8');
});

console.log('Injected content into pages');
