const fs = require('fs');
let html = fs.readFileSync('public/stamspolning.html', 'utf-8');

const oldCtaRegex = /<section class="service-cta".*?<\/section>/s;

const newCtaHTML = `
    <section class="service-cta" style="background: #0284c7; color: #ffffff; padding: 80px 20px; text-align: center; position: relative; overflow: hidden; margin-top: 60px; width: 100vw; margin-left: calc(-50vw + 50%); box-sizing: border-box;">
        <style>
            .service-cta h2, .service-cta p {
                text-transform: none !important;
            }
            .service-cta .cta-btn-header-match {
                background: #0fb3ff !important;
                color: #ffffff !important;
                border: 1px solid #0fb3ff !important;
                border-radius: 50px;
                padding: 1rem 2.5rem;
                font-weight: 700;
                font-size: 1.1rem;
                transition: all 0.3s ease !important;
                text-decoration: none;
                display: inline-block;
                text-transform: uppercase !important;
                box-shadow: none !important;
                transform: none !important;
            }
            .service-cta .cta-btn-header-match:hover {
                background: #ffffff !important;
                color: #0fb3ff !important;
                border: 1px solid #0fb3ff !important;
                box-shadow: none !important;
                transform: none !important;
            }
        </style>
        <!-- Dekoration för high-end känsla -->
        <div style="position: absolute; top: -50%; left: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none;"></div>
        <div style="position: absolute; bottom: -50%; right: -10%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none;"></div>
        
        <div class="container" style="max-width: 900px; margin: 0 auto; position: relative; z-index: 2;">
            <h2 style="font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; color: #ffffff; line-height: 1.2; white-space: nowrap;">Säkra upp fastighetens rör i tid</h2>
            <p style="font-size: 1.15rem; line-height: 1.6; margin-bottom: 2.5rem; opacity: 0.9;">Genom att spola stammarna i tid förebygger ni dyra vattenskador och förlänger rörsystemets livslängd. Låt våra certifierade tekniker säkerställa att fastighetens avlopp mår bra.</p>
            <div class="cta-buttons" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; align-items: center;">
                <a href="#kontakt" class="cta-btn-header-match">Få en kostnadsfri offert</a>
                <a href="tel:+46703185110" class="cta-btn-header-match">Ring 070-318 51 10</a>
            </div>
        </div>
    </section>
`;

if(oldCtaRegex.test(html)) {
    // Also remove the old .service-cta a:hover from earlier in the file just in case it wasn't overwritten
    html = html.replace(/\.service-cta a:hover\s*{[^}]*}/g, '');
    html = html.replace(oldCtaRegex, newCtaHTML.trim());
    fs.writeFileSync('public/stamspolning.html', html, 'utf-8');
    console.log('CTA fixed again!');
} else {
    console.log('Regex failed to find old CTA.');
}
