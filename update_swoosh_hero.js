const fs = require('fs');

const htmlPath = 'public/stamspolning.html';
let html = fs.readFileSync(htmlPath, 'utf8');

const oldHeroRegex = /<section class="service-page-hero-light"[\s\S]*?<\/section>/;

const newHeroHTML = `
    <section class="swoosh-hero" style="background-color: #faf8f5; padding: 160px 0 100px 0; overflow: hidden;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                
                <!-- Left: White Card -->
                <div style="background: #ffffff; border-radius: 32px; padding: 4rem 3rem; box-shadow: 0 20px 40px rgba(0,0,0,0.03); z-index: 2; position: relative;">
                    <h1 style="font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 800; color: #0f172a; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.02em;">
                        Stamspolning &<br>Rörspolning
                    </h1>
                    <p style="font-size: 1.25rem; color: #475569; line-height: 1.6; margin-bottom: 2.5rem;">
                        Kluckande ljud från avloppet är ett tidigt tecken på att det är dags att spola rent rören i fastigheten. Vi hjälper både BRF, företag och villaägare med regelbunden spolning för att förebygga vattenskador. Kontakta oss så löser vi det!
                    </p>
                    <a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none;">
                        Kontakta oss!
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>

                <!-- Right: Masked Image -->
                <div style="position: relative; height: 100%; min-height: 600px; display: flex; align-items: center; justify-content: center;">
                    <img src="stamspolning.jpeg" alt="Professionell stamspolning av Nordx Relining" style="width: 100%; height: 100%; max-height: 650px; object-fit: cover; border-radius: 0 300px 0 300px; box-shadow: 0 30px 60px rgba(0,0,0,0.08);">
                </div>

            </div>
        </div>
        
        <style>
            @media (max-width: 900px) {
                .swoosh-hero > .container > div {
                    grid-template-columns: 1fr !important;
                    gap: 2rem !important;
                }
                .swoosh-hero {
                    padding: 120px 0 60px 0 !important;
                }
                .swoosh-hero img {
                    border-radius: 0 150px 0 150px !important;
                    min-height: 400px;
                }
            }
        </style>
    </section>
`;

if (oldHeroRegex.test(html)) {
    html = html.replace(oldHeroRegex, newHeroHTML.trim());
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log("Hero updated successfully.");
} else {
    console.log("Could not find the old hero section.");
}
