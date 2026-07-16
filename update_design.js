const fs = require('fs');
let html = fs.readFileSync('public/stamspolning.html', 'utf-8');

const oldStepsRegex = /<div class="process-steps-container".*?<\/h4>\s*<p.*?<\/p>\s*<\/div>\s*<\/div>\s*<\/div>/s;

const premiumStepsHTML = `
        <style>
        .premium-step-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 20px 40px -10px rgba(2, 132, 199, 0.15) !important;
        }
        .service-cta a:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 25px -5px rgba(0,0,0,0.2) !important;
        }
        </style>
        <div class="process-steps-container premium-steps" style="margin-bottom: 3.5rem; display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- Steg 1 -->
            <div class="premium-step-card" style="position: relative; overflow: hidden; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                <div style="position: absolute; right: 10px; top: -20px; font-size: 8rem; font-weight: 800; color: #0284c7; opacity: 0.04; line-height: 1; user-select: none;">1</div>
                <div style="display: flex; gap: 1.5rem; position: relative; z-index: 2;">
                    <div style="flex-shrink: 0; margin-top: 0.3rem;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; border: 4px solid #ffffff; box-shadow: 0 0 0 2px #0284c7; display: flex; align-items: center; justify-content: center;">
                            <div style="width: 8px; height: 8px; background: #0284c7; border-radius: 50%;"></div>
                        </div>
                    </div>
                    <div>
                        <h4 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;">Förberedelser & Källaren</h4>
                        <p style="line-height: 1.7; color: #475569; margin: 0; font-size: 1.05rem;">Arbetet inleds alltid längst ner i fastigheten. Vi inspekterar rensluckor och spolar bottenavloppet (uppsamlingsledningen) hela vägen ut till den kommunala huvudledningen. Detta är kritiskt för att det smuts vi senare spolar loss uppifrån fritt ska kunna rinna undan utan att orsaka stopp i källaren.</p>
                    </div>
                </div>
            </div>
            
            <!-- Steg 2 -->
            <div class="premium-step-card" style="position: relative; overflow: hidden; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                <div style="position: absolute; right: 10px; top: -20px; font-size: 8rem; font-weight: 800; color: #0284c7; opacity: 0.04; line-height: 1; user-select: none;">2</div>
                <div style="display: flex; gap: 1.5rem; position: relative; z-index: 2;">
                    <div style="flex-shrink: 0; margin-top: 0.3rem;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; border: 4px solid #ffffff; box-shadow: 0 0 0 2px #0284c7; display: flex; align-items: center; justify-content: center;">
                            <div style="width: 8px; height: 8px; background: #0284c7; border-radius: 50%;"></div>
                        </div>
                    </div>
                    <div>
                        <h4 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;">Spolning av lägenheter</h4>
                        <p style="line-height: 1.7; color: #475569; margin: 0; font-size: 1.05rem;">Våra tekniker arbetar sig metodiskt uppåt i fastigheten, våning för våning. Från varje lägenhet spolas anslutande stickledningar (köksavlopp, handfat, golvbrunn) ut mot den stående stammen.</p>
                    </div>
                </div>
            </div>
            
            <!-- Steg 3 -->
            <div class="premium-step-card" style="position: relative; overflow: hidden; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                <div style="position: absolute; right: 10px; top: -20px; font-size: 8rem; font-weight: 800; color: #0284c7; opacity: 0.04; line-height: 1; user-select: none;">3</div>
                <div style="display: flex; gap: 1.5rem; position: relative; z-index: 2;">
                    <div style="flex-shrink: 0; margin-top: 0.3rem;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; border: 4px solid #ffffff; box-shadow: 0 0 0 2px #0284c7; display: flex; align-items: center; justify-content: center;">
                            <div style="width: 8px; height: 8px; background: #0284c7; border-radius: 50%;"></div>
                        </div>
                    </div>
                    <div>
                        <h4 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;">Högtryck & Hetvatten</h4>
                        <p style="line-height: 1.7; color: #475569; margin: 0; font-size: 1.05rem;">Vi använder specialanpassade roterande munstycken och hett vatten. Det höga trycket skär effektivt genom fett och rost utan att skada rörets material. Slangen förs fram och tillbaka för att säkerställa att rörväggarna blir helt rena, vilket minimerar risken för att framtida beläggningar ska få fäste.</p>
                    </div>
                </div>
            </div>
            
            <!-- Steg 4 -->
            <div class="premium-step-card" style="position: relative; overflow: hidden; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transition: all 0.3s ease;">
                <div style="position: absolute; right: 10px; top: -20px; font-size: 8rem; font-weight: 800; color: #10b981; opacity: 0.04; line-height: 1; user-select: none;">4</div>
                <div style="display: flex; gap: 1.5rem; position: relative; z-index: 2;">
                    <div style="flex-shrink: 0; margin-top: 0.3rem;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: #d1fae5; border: 4px solid #ffffff; box-shadow: 0 0 0 2px #10b981; display: flex; align-items: center; justify-content: center;">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                    </div>
                    <div>
                        <h4 style="font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;">Slutkontroll & Garanti</h4>
                        <p style="line-height: 1.7; color: #475569; margin: 0; font-size: 1.05rem;">Efter avslutad spolning genomförs funktionstester för att verifiera att rörsystemet har återfått sin fulla flödeskapacitet. Vi överlämnar sedan en tydlig dokumentation till fastighetsägaren eller bostadsrättsföreningen.</p>
                    </div>
                </div>
            </div>
        </div>`;

if(oldStepsRegex.test(html)) {
    html = html.replace(oldStepsRegex, premiumStepsHTML);
    console.log('Premium steps updated!');
} else {
    console.log('Regex failed for steps.');
}

const ctaHTML = `
    <section class="service-cta" style="background: #0284c7; color: #ffffff; padding: 100px 20px; text-align: center; position: relative; overflow: hidden; margin-top: 40px;">
        <!-- Dekoration för high-end känsla -->
        <div style="position: absolute; top: -50%; left: -10%; width: 500px; height: 500px; background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>
        <div style="position: absolute; bottom: -50%; right: -10%; width: 400px; height: 400px; background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;"></div>
        
        <div class="container" style="max-width: 800px; margin: 0 auto; position: relative; z-index: 2;">
            <h2 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 1.5rem; color: #ffffff; line-height: 1.2;">Säkra upp fastighetens rör i tid</h2>
            <p style="font-size: 1.25rem; line-height: 1.6; margin-bottom: 2.5rem; opacity: 0.9;">Ett välmående avloppssystem är grunden för en trygg fastighet. Genom att utföra en förebyggande rörspolning skyddar du både rör och ekonomi från oväntade och kostsamma vattenskador. Låt våra certifierade tekniker säkerställa att era stammar håller i många år framöver.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <a href="#kontakt" style="display: inline-block; background: #ffffff; color: #0284c7; text-decoration: none; font-size: 1.125rem; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 700; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s;">Få en kostnadsfri offert</a>
                <a href="tel:+46703185110" style="display: inline-block; background: rgba(255,255,255,0.1); color: #ffffff; text-decoration: none; font-size: 1.125rem; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 600; border: 1px solid rgba(255,255,255,0.3); transition: background 0.2s, transform 0.2s;">Ring 070-318 51 10</a>
            </div>
        </div>
    </section>
</main>`;

if(html.includes('</main>')) {
    html = html.replace('</main>', ctaHTML);
    console.log('CTA added!');
} else {
    console.log('Could not find </main> to append CTA.');
}

fs.writeFileSync('public/stamspolning.html', html, 'utf-8');
