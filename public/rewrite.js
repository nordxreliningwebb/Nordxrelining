const fs = require('fs');

const rorHtml = fs.readFileSync('rorinspektion.html', 'utf8');

const headEnd = rorHtml.indexOf('<main>');
const footerStart = rorHtml.lastIndexOf('</main>');

const topPart = rorHtml.substring(0, headEnd + 6);
const bottomPart = rorHtml.substring(footerStart);

let newOmOss = topPart + `
    <section class="swoosh-hero" style="background-color: #faf8f5; padding: 160px 0 100px 0; overflow: hidden;">
        <div class="container" style="max-width: 1400px; width: 95%; margin: 0 auto; padding: 0;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                
                <!-- Left: White Card -->
                <div style="background: #ffffff; border-radius: 32px; padding: 4rem 3rem; box-shadow: 0 20px 40px rgba(0,0,0,0.03); z-index: 2; position: relative;">
                    <h1 style="font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 800; color: #0f172a; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.02em;">
                        Sveriges tryggaste partner inom relining och rörinspektion
                    </h1>
                    <p style="font-size: 1.25rem; color: #475569; line-height: 1.6; margin-bottom: 2.5rem;">
                        Nordx Relining drivs av passionen för teknisk precision och hållbara fastigheter. Vi finns här för att förlänga livet på era rörsystem – med minimal störning och maximal kvalitet.
                    </p>
                    <a href="kontakt.html" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; color: white; border: none; text-decoration: none; font-weight: 600;">
                        Kom i kontakt med oss
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>

                <!-- Right: Masked Image (clean circle) -->
                <div style="position: relative; width: 100%; max-width: 600px; aspect-ratio: 1/1; margin: 0 auto; display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 50%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);">
                    <img src="nordxrelining.jpeg" alt="Nordx Relining team" style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: 1;">
                    <!-- Subtle inner shadow to make it feel premium -->
                    <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; box-shadow: inset 0 0 0 8px rgba(255,255,255,0.1), inset 0 0 20px rgba(0,0,0,0.2); z-index: 2; pointer-events: none;"></div>
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

    <section style="padding: 100px 0; background: #ffffff; position: relative;">
        <div class="container layout-wrapper" style="max-width: 1400px; width: 95%; margin: 0 auto;">
            
            <div style="text-align: center; margin-bottom: 5rem; max-width: 800px; margin-left: auto; margin-right: auto;">
                <h2 style="font-size: 2.5rem; color: #0f172a; margin-bottom: 1.5rem; font-weight: 800;">Vår vision & drivkraft</h2>
                <p style="font-size: 1.125rem; line-height: 1.8; color: #475569;">Vårt mål är att vara den ledande kraften bakom Sveriges mest välmående rörsystem. Vi vilar på fundamentet av transparens, integritet och teknisk stolthet.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 6rem;">
                
                <div style="background: #f8fafc; border-radius: 16px; padding: 2.5rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <div style="width: 48px; height: 48px; background: #e0f2fe; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem;">Högsta Kvalitet</h3>
                    <p style="color: #475569; line-height: 1.7;">Vi lämnar inget åt slumpen. Varje millimeter av de rör vi infodrar inspekteras och säkerställs med dokumentation och video, så att du alltid vet att jobbet är rätt utfört.</p>
                </div>

                <div style="background: #f8fafc; border-radius: 16px; padding: 2.5rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <div style="width: 48px; height: 48px; background: #e0f2fe; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem;">Trygghet för de boende</h3>
                    <p style="color: #475569; line-height: 1.7;">Att ha hantverkare i hemmet kan vara påfrestande. Vår arbetsmetod bygger på att vara osynliga, snabba och lämna det renare än när vi kom.</p>
                </div>

                <div style="background: #f8fafc; border-radius: 16px; padding: 2.5rem; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <div style="width: 48px; height: 48px; background: #e0f2fe; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; margin-bottom: 1rem;">Långsiktig Ekonomi</h3>
                    <p style="color: #475569; line-height: 1.7;">Ett relinat avloppssystem håller i över 50 år och kostar en bråkdel av ett stambyte. Vi hjälper er spara pengar och undvika framtida vattenskador.</p>
                </div>
            </div>
            
            <div style="background: #0f172a; border-radius: 24px; padding: 4rem; display: flex; flex-wrap: wrap; justify-content: space-around; gap: 2rem; color: white; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);">
                <div>
                    <div style="font-size: 3.5rem; font-weight: 800; color: #38bdf8; line-height: 1;">50+</div>
                    <div style="font-size: 1.1rem; margin-top: 0.5rem; opacity: 0.8; font-weight: 500;">Års förväntad livslängd</div>
                </div>
                <div>
                    <div style="font-size: 3.5rem; font-weight: 800; color: #38bdf8; line-height: 1;">150+</div>
                    <div style="font-size: 1.1rem; margin-top: 0.5rem; opacity: 0.8; font-weight: 500;">Genomförda projekt</div>
                </div>
                <div>
                    <div style="font-size: 3.5rem; font-weight: 800; color: #38bdf8; line-height: 1;">100%</div>
                    <div style="font-size: 1.1rem; margin-top: 0.5rem; opacity: 0.8; font-weight: 500;">Kundnöjdhet</div>
                </div>
            </div>

        </div>
    </section>

    <section style="padding: 100px 0; background: #f8fafc;">
        <div class="container" style="max-width: 1400px; width: 95%; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">Möt teamet bakom Nordx Relining</h2>
            <p style="font-size: 1.125rem; color: #475569; margin-bottom: 4rem; max-width: 600px; margin-left: auto; margin-right: auto;">Vi är certifierade experter som tror på hantverksskicklighet, raka rör och god kommunikation med våra kunder.</p>

            <div style="display: flex; flex-wrap: wrap; gap: 3rem; justify-content: center;">
                
                <!-- Person 1 -->
                <div style="width: 280px; text-align: center;">
                    <div style="width: 240px; height: 240px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem auto; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                        <img src="1.png" alt="VD" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">Anders Svensson</h3>
                    <p style="color: #0284c7; font-weight: 600;">VD & Grundare</p>
                </div>

                <!-- Person 2 -->
                <div style="width: 280px; text-align: center;">
                    <div style="width: 240px; height: 240px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem auto; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                        <img src="2.png" alt="Tekniker" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">Johanna Lindström</h3>
                    <p style="color: #0284c7; font-weight: 600;">Senior Reliningstekniker</p>
                </div>

                <!-- Person 3 -->
                <div style="width: 280px; text-align: center;">
                    <div style="width: 240px; height: 240px; border-radius: 50%; overflow: hidden; margin: 0 auto 1.5rem auto; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
                        <img src="3.png" alt="Arbetsledare" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">Marcus Berg</h3>
                    <p style="color: #0284c7; font-weight: 600;">Arbetsledare / Rörinspektion</p>
                </div>

            </div>
        </div>
    </section>

    <!-- Slut-CTA -->
    <section class="service-cta" style="background: #0284c7; color: #ffffff; padding: 80px 20px; text-align: center; position: relative; overflow: hidden; margin-top: 0; width: 100vw; margin-left: calc(-50vw + 50%); box-sizing: border-box; z-index: 2;">
        <!-- Dekoration för high-end känsla -->
        <div style="position: absolute; top: -50%; left: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none;"></div>
        <div style="position: absolute; bottom: -50%; right: -10%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; pointer-events: none;"></div>
        
        <div class="container" style="max-width: 900px; margin: 0 auto; position: relative; z-index: 2;">
            <h2 style="font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; color: #ffffff; line-height: 1.2; white-space: nowrap;">Redo för ett säkrare rörsystem?</h2>
            <p style="font-size: 1.15rem; line-height: 1.6; margin-bottom: 2.5rem; opacity: 0.9;">Hör av er till oss idag så tar vi ett förutsättningslöst möte om er fastighet.</p>
            <div class="cta-buttons" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; align-items: center;">
                <a href="kontakt.html" class="btn" style="background: #ffffff; color: #000000; border: 1px solid #ffffff; border-radius: 6px; padding: 0.75rem 1.75rem; font-weight: 700; text-decoration: none; text-transform: uppercase;">Få en kostnadsfri offert</a>
                <a href="tel:+46703185110" class="btn" style="background: transparent; color: #ffffff; border: 1px solid #ffffff; border-radius: 6px; padding: 0.75rem 1.75rem; font-weight: 700; text-decoration: none; text-transform: uppercase;">Ring 070-318 51 10</a>
            </div>
        </div>
    </section>
` + bottomPart;

// Fix Meta Tags inside head
newOmOss = newOmOss.replace(/<title>.*?<\/title>/g, '<title>Om Oss | Nordx Relining</title>');
newOmOss = newOmOss.replace(/<meta name="description" content=".*?">/g, '<meta name="description" content="Lär känna Nordx Relining – experter på relining, stamspolning och rörinspektion. Möt vårt team av certifierade tekniker.">');
// Update body class
newOmOss = newOmOss.replace(/<body class="[^"]*">/, '<body class="about-page">');

fs.writeFileSync('om-oss.html', newOmOss);
console.log('Successfully replaced om-oss.html with the new Nordx Relining layout.');
