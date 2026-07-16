const fs = require('fs');
let html = fs.readFileSync('public/stamspolning.html', 'utf-8');

const oldCtaRegex = /<section class="service-cta".*?<\/section>/s;

const newCtaHTML = `
    <section class="service-cta" style="background: #0284c7; color: #ffffff; padding: 80px 20px; text-align: center; position: relative; overflow: hidden; margin-top: 60px; width: 100vw; margin-left: calc(-50vw + 50%); box-sizing: border-box;">
        <style>
            .service-cta h2, .service-cta p, .service-cta a {
                text-transform: none !important;
            }
            .service-cta .cta-buttons a {
                border-radius: 50px;
                padding: 1rem 2.5rem;
                font-weight: 700;
                font-size: 1.1rem;
                transition: transform 0.2s, box-shadow 0.2s;
                text-decoration: none;
                display: inline-block;
            }
            .service-cta .cta-btn-primary {
                background: #ffffff;
                color: #0284c7;
                box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
            }
            .service-cta .cta-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 25px -5px rgba(0,0,0,0.2);
            }
            .service-cta .cta-btn-ghost {
                background: transparent;
                color: #ffffff;
                border: 2px solid rgba(255,255,255,0.4);
            }
            .service-cta .cta-btn-ghost:hover {
                background: rgba(255,255,255,0.1);
                border-color: #ffffff;
            }
        </style>
        <!-- Dekoration för high-end känsla -->
        <div style="position: absolute; top: -50%; left: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none;"></div>
        <div style="position: absolute; bottom: -50%; right: -10%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none;"></div>
        
        <div class="container" style="max-width: 700px; margin: 0 auto; position: relative; z-index: 2;">
            <h2 style="font-size: clamp(2rem, 3vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; color: #ffffff; line-height: 1.2;">Säkra upp fastighetens rör i tid</h2>
            <p style="font-size: 1.15rem; line-height: 1.6; margin-bottom: 2.5rem; opacity: 0.9;">Genom att spola stammarna i tid förebygger ni dyra vattenskador och förlänger rörsystemets livslängd. Låt våra certifierade tekniker säkerställa att fastighetens avlopp mår bra.</p>
            <div class="cta-buttons" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; align-items: center;">
                <a href="#kontakt" class="cta-btn-primary">Få en kostnadsfri offert</a>
                <a href="tel:+46703185110" class="cta-btn-ghost">Ring 070-318 51 10</a>
            </div>
        </div>
    </section>
`;

if(oldCtaRegex.test(html)) {
    html = html.replace(oldCtaRegex, newCtaHTML.trim());
    fs.writeFileSync('public/stamspolning.html', html, 'utf-8');
    console.log('CTA fixed!');
} else {
    console.log('Regex failed to find old CTA.');
}
