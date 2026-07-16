const fs = require('fs');

// 1. Update style.css
const cssFixes = `
/* --- Advanced Light Theme Fixes --- */
body.light-theme .process-steps-container {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 2rem !important;
    margin-top: 4rem !important;
}

body.light-theme .process-step {
    flex-direction: column !important;
    text-align: center !important;
    padding: 2rem 1.5rem !important;
    align-items: center !important;
    justify-content: flex-start !important;
}

body.light-theme .process-step img {
    width: 140px !important;
    height: 140px !important;
    margin: 0 0 1.5rem 0 !important;
}

body.light-theme .service-animation-wrapper {
    position: fixed !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    right: 5% !important; /* Keep it nicely aligned on the right */
    width: auto !important;
    height: 90vh !important;
    z-index: -1 !important;
    justify-content: flex-end !important;
    pointer-events: none !important; /* Let clicks pass through */
    opacity: 0.1 !important; /* Even more subtle watermark */
}

@media(max-width: 1024px) {
    body.light-theme .process-steps-container {
        grid-template-columns: 1fr !important;
    }
}
`;

fs.appendFileSync('public/style.css', '\n' + cssFixes);

// 2. Update the Hero sections to be light theme
function fixHero(file, h1Text, pText) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace the dark hero section
    const heroRegex = /<section class="service-page-hero"[\s\S]*?<\/section>/;
    const newHero = `
    <section class="service-page-hero-light" style="padding-top: 180px; padding-bottom: 60px; background: #f8fafc; text-align: center; border-bottom: 1px solid #e2e8f0;">
        <div class="container">
            <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; color: #0f172a; margin-bottom: 1rem;">${h1Text}</h1>
            <p style="font-size: 1.25rem; color: #475569; max-width: 800px; margin: 0 auto;">${pText}</p>
        </div>
    </section>
    `;
    content = content.replace(heroRegex, newHero);
    
    // Also remove the "1fr 1fr" constraint on the service-details-grid so the text can expand nicely
    // since the animation is fixed anyway.
    content = content.replace(/class="service-details-grid"/g, 'class="service-details-grid" style="grid-template-columns: 1fr; max-width: 1000px; margin: 0 auto;"');
    
    fs.writeFileSync(file, content, 'utf-8');
}

fixHero('public/stamspolning.html', 'Professionell Stamspolning', 'Förebygg stopp och vattenskador med regelbunden stamspolning.');
fixHero('public/relining.html', 'Relining & Rörrenovering', 'Ett kostnadseffektivt och smidigt alternativ till traditionellt stambyte. Få nya rör inuti de gamla.');
fixHero('public/rorinspektion.html', 'Avancerad Rörinspektion', 'Få full kontroll över dina rör med vår moderna kamerateknik. Upptäck dolda problem i tid.');

console.log('Layout fixed again');
