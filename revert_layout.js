const fs = require('fs');

const html = fs.readFileSync('public/stamspolning.html', 'utf8');

const startStr = '<section class="service-page-content"';
const endStr = '</section>';

const start = html.indexOf(startStr);
let end = html.indexOf(endStr, start);
if (end !== -1) end += endStr.length;

const newSection = `
<section class="service-page-content" id="stamspolning-content" style="padding: 100px 0; background: #ffffff; position: relative;">
    <div class="container layout-wrapper" style="max-width: 1400px; width: 95%; margin: 0 auto;">
        <div class="service-details-grid" style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start;">
            
            <!-- Left Column: Animation -->
            <div class="content-left">
                <div class="service-animation-wrapper" style="background: transparent; box-shadow: none; position: sticky; top: 120px; height: 800px; padding: 0; display: flex; justify-content: center; overflow: hidden;">
                    <svg viewBox="0 0 160 800" preserveAspectRatio="xMidYMin meet" class="stamspolning-svg" style="height: 100%; width: 100%; max-width: 160px; pointer-events: none;">
                        <defs>
                            <linearGradient id="pipe-base" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#94a3b8" />
                                <stop offset="10%" stop-color="#f8fafc" />
                                <stop offset="50%" stop-color="#e2e8f0" />
                                <stop offset="90%" stop-color="#f1f5f9" />
                                <stop offset="100%" stop-color="#64748b" />
                            </linearGradient>
                        </defs>
                        <!-- Pipe Background (edges) -->
                        <path d="M 40 0 L 40 800 M 120 0 L 120 800" stroke="#64748b" stroke-width="6" fill="none" />
                        <!-- Inside Body -->
                        <rect x="43" y="0" width="74" height="800" fill="url(#pipe-base)" />
                        <!-- Subtle dots inside -->
                        <path d="M 80 0 L 80 800" stroke="#e2e8f0" stroke-width="40" stroke-dasharray="2 20" fill="none" />
                        
                        <!-- Brackets -->
                        <g stroke="#64748b" stroke-width="16" stroke-linecap="round">
                            <path d="M 30 150 L 130 150" />
                            <circle cx="40" cy="150" r="3" fill="#cbd5e1" stroke="none" />
                            <circle cx="120" cy="150" r="3" fill="#cbd5e1" stroke="none" />
                            
                            <path d="M 30 550 L 130 550" />
                            <circle cx="40" cy="550" r="3" fill="#cbd5e1" stroke="none" />
                            <circle cx="120" cy="550" r="3" fill="#cbd5e1" stroke="none" />
                        </g>

                        <!-- Central Hose -->
                        <path d="M 80 0 L 80 800" stroke="#334155" stroke-width="16" fill="none" />
                        
                        <!-- Hose end nozzle -->
                        <path d="M 65 760 L 95 760" stroke="#1e293b" stroke-width=\"12\" stroke-linecap=\"round\" />
                        <path d=\"M 70 760 L 90 760\" stroke=\"#475569\" stroke-width=\"6\" stroke-linecap=\"round\" />
                        
                        <!-- Spray Animation at the bottom -->
                        <g style=\"transform-origin: 80px 760px; animation: spray-pulse 0.1s linear infinite;\">
                            <path d=\"M 80 760 L 40 820 M 80 760 L 120 820 M 80 760 L 60 820 M 80 760 L 100 820\" 
                                  stroke=\"#bae6fd\" stroke-width=\"6\" stroke-linecap=\"round\" fill=\"none\" 
                                  style=\"stroke-dasharray: 10 20; animation: spray-flow 0.3s linear infinite; filter: drop-shadow(0 0 5px #7dd3fc);\" />
                        </g>
                    </svg>
                    
                    <style>
                        @keyframes spray-flow {
                            from { stroke-dashoffset: 30; }
                            to { stroke-dashoffset: 0; }
                        }
                        @keyframes spray-pulse {
                            0% { transform: scale(1); }
                            50% { transform: scale(1.02); }
                            100% { transform: scale(1); }
                        }
                        @media (max-width: 900px) {
                            .service-details-grid {
                                grid-template-columns: 1fr !important;
                            }
                            .content-left {
                                order: -1;
                            }
                            .service-animation-wrapper {
                                height: 400px !important;
                                position: relative !important;
                                top: 0 !important;
                                margin-bottom: 2rem;
                            }
                        }
                    </style>
                </div>
            </div>

            <!-- Right Column: Text & Steps -->
            <div class=\"content-right service-text\">
                <h2 style=\"font-size: 2.5rem; margin-bottom: 1.5rem; color: #0f172a;\">Underhållsspolning &amp; Förebyggande Åtgärder</h2>
                <p style=\"font-size: 1.125rem; line-height: 1.8; margin-bottom: 1.5rem;\">Bristande avloppsunderhåll är ofta en dold källa till akuta problem. Matfett, hudavlagringar och tvålrester sätter med tiden igen rören, minskar innerdiametern och orsakar dålig avrinning. Hur ofta en underhållsspolning bör göras beror på fastighetens skick, ålder och rörens dimensioner, men ett bra riktvärde är att spola stammarna vart tredje till femte år. Då hålls rören i ett mycket bättre skick och får en längre livslängd. Dessutom undviker du troligen akuta stopp och vi hinner upptäcka om det uppstått skador i dina avloppsrör i god tid.</p>
                
                <h3 style=\"font-size: 1.75rem; margin-bottom: 1rem; color: #0f172a; margin-top: 2.5rem;\">Kluckande ljud och dålig avrinning?</h3>
                <p style=\"font-size: 1.125rem; line-height: 1.8; margin-bottom: 2rem;\">Hör du kluckande ljud från avloppet är det ett tidigt tecken på att det är dags för en stamspolning – en rejäl avloppsrensning som spolar rent rören i din fastighet. Får du dessutom ett ovälkommet fotbad varje gång du duschar? Då är det verkligen dags! Vi använder specialanpassade munstycken och spolar avloppet med hetvatten under högt tryck, vilket skonsamt smälter bort fett och blockeringar.</p>

                <h3 style=\"font-size: 1.75rem; margin-bottom: 1rem; color: #0f172a; margin-top: 2.5rem;\">Bostadsrättsföreningar (BRF) &amp; Villa</h3>
                <p style=\"font-size: 1.125rem; line-height: 1.8; margin-bottom: 2rem;\">Att lägga in stamspolning i fastighetens löpande underhållsplan är en effektiv försäkring mot vattenskador för bostadsrättsföreningar. Vi arbetar även med villor där vi ser till att hela systemet från husgrund till tomtgräns spolas rent. För BRF:er är första steget att vi besiktar vilka rör och stammar det gäller i samverkan med er. Därefter sköter vi all avisering till hyresgäster och boende om tid och datum. De som vill kan vara hemma och öppna åt oss, i annat fall kan vi gå in på egen hand med huvudnyckel. Vi har en flexibel fordonspark, från små, smidiga och miljöklassade spolbussar med god framkomlighet, till större kombibilar i miljöklass EURO-6.</p>

                <h3 style=\"font-size: 1.75rem; margin-bottom: 1rem; color: #0f172a; margin-top: 2.5rem;\">Kamerabesiktning ingår alltid</h3>
                <p style=\"font-size: 1.125rem; line-height: 1.8; margin-bottom: 3.5rem;\">Vår personal är alltid utrustad med filmkamera. Skulle vi stöta på problem kan vi direkt utreda orsaken till stoppet och lämna förslag på vidare åtgärd. Visar det sig att det finns skador i rören kan det vara dags att överväga en renovering. Vi erbjuder då rörinfodring (relining), en schaktfri metod som efter reparation ger ett helt nytt, självbärande rör inuti dina befintliga stammar utan dyra rivningsarbeten.</p>

                <h3 style=\"font-size: 2rem; margin-bottom: 1.5rem; color: #0f172a; padding-top: 2rem; border-top: 1px solid #e2e8f0;\">Så här går det till – Steg för Steg</h3>
                <p style=\"font-size: 1.125rem; line-height: 1.8; margin-bottom: 2.5rem;\">När vi på Nordx Relining utför ett arbete följer vi alltid en strikt branschstandard. Arbetet kräver oftast tillträde till fastighetens samtliga lägenheter (eller samtliga avlopp i villan) för att garantera ett perfekt resultat.</p>
                
                <div class=\"process-steps-container premium-steps\" style=\"display: flex; flex-direction: column; gap: 1.5rem;\">
                    <!-- Steg 1 -->
                    <div class=\"premium-step-card\" style=\"position: relative; overflow: hidden; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transition: all 0.3s ease;\">
                        <div style=\"position: absolute; right: 10px; top: -20px; font-size: 8rem; font-weight: 800; color: #0284c7; opacity: 0.04; line-height: 1; user-select: none;\">1</div>
                        <div style=\"display: flex; gap: 1.5rem; position: relative; z-index: 2;\">
                            <div style=\"flex-shrink: 0; margin-top: 0.3rem;\">
                                <div style=\"width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; border: 4px solid #ffffff; box-shadow: 0 0 0 2px #0284c7; display: flex; align-items: center; justify-content: center;\">
                                    <div style=\"width: 8px; height: 8px; background: #0284c7; border-radius: 50%;\"></div>
                                </div>
                            </div>
                            <div>
                                <h4 style=\"font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;\">Förberedelser &amp; Källaren</h4>
                                <p style=\"line-height: 1.7; color: #475569; margin: 0; font-size: 1.05rem;\">Arbetet inleds alltid längst ner i fastigheten. Vi inspekterar rensluckor och spolar bottenavloppet (uppsamlingsledningen) hela vägen ut till den kommunala huvudledningen. Detta är kritiskt för att det smuts vi senare spolar loss uppifrån fritt ska kunna rinna undan utan att orsaka stopp i källaren.</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Steg 2 -->
                    <div class=\"premium-step-card\" style=\"position: relative; overflow: hidden; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transition: all 0.3s ease;\">
                        <div style=\"position: absolute; right: 10px; top: -20px; font-size: 8rem; font-weight: 800; color: #0284c7; opacity: 0.04; line-height: 1; user-select: none;\">2</div>
                        <div style=\"display: flex; gap: 1.5rem; position: relative; z-index: 2;\">
                            <div style=\"flex-shrink: 0; margin-top: 0.3rem;\">
                                <div style=\"width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; border: 4px solid #ffffff; box-shadow: 0 0 0 2px #0284c7; display: flex; align-items: center; justify-content: center;\">
                                    <div style=\"width: 8px; height: 8px; background: #0284c7; border-radius: 50%;\"></div>
                                </div>
                            </div>
                            <div>
                                <h4 style=\"font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;\">Bottenvåningen</h4>
                                <p style=\"line-height: 1.7; color: #475569; margin: 0; font-size: 1.05rem;\">När källarledningen är helt ren går vi vidare till lägenheterna på bottenvåningen. Här demonterar vi vattenlås under diskbänk och handfat och spolar stickledningarna (rören i golv/vägg fram till huvudstammen). Vi spolar också kök, badrum och eventuella golvbrunnar i badrum och WC.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Steg 3 -->
                    <div class=\"premium-step-card\" style=\"position: relative; overflow: hidden; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transition: all 0.3s ease;\">
                        <div style=\"position: absolute; right: 10px; top: -20px; font-size: 8rem; font-weight: 800; color: #0284c7; opacity: 0.04; line-height: 1; user-select: none;\">3</div>
                        <div style=\"display: flex; gap: 1.5rem; position: relative; z-index: 2;\">
                            <div style=\"flex-shrink: 0; margin-top: 0.3rem;\">
                                <div style=\"width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; border: 4px solid #ffffff; box-shadow: 0 0 0 2px #0284c7; display: flex; align-items: center; justify-content: center;\">
                                    <div style=\"width: 8px; height: 8px; background: #0284c7; border-radius: 50%;\"></div>
                                </div>
                            </div>
                            <div>
                                <h4 style=\"font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;\">Resterande våningsplan</h4>
                                <p style=\"line-height: 1.7; color: #475569; margin: 0; font-size: 1.05rem;\">Vi arbetar oss sedan metodiskt uppåt i fastigheten, våning för våning. I varje lägenhet spolas stickledningar och anslutningar till stammen rena från fett, smuts och beläggningar. Ofta spolar vi då huvudstammen från lägenheterna högst upp i huset hela vägen ner till källarstammen.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Steg 4 -->
                    <div class=\"premium-step-card\" style=\"position: relative; overflow: hidden; background: #ffffff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); transition: all 0.3s ease;\">
                        <div style=\"position: absolute; right: 10px; top: -20px; font-size: 8rem; font-weight: 800; color: #0284c7; opacity: 0.04; line-height: 1; user-select: none;\">4</div>
                        <div style=\"display: flex; gap: 1.5rem; position: relative; z-index: 2;\">
                            <div style=\"flex-shrink: 0; margin-top: 0.3rem;\">
                                <div style=\"width: 32px; height: 32px; border-radius: 50%; background: #e0f2fe; border: 4px solid #ffffff; box-shadow: 0 0 0 2px #0284c7; display: flex; align-items: center; justify-content: center;\">
                                    <div style=\"width: 8px; height: 8px; background: #0284c7; border-radius: 50%;\"></div>
                                </div>
                            </div>
                            <div>
                                <h4 style=\"font-size: 1.35rem; font-weight: 700; margin-bottom: 0.5rem; color: #0f172a;\">Återställning &amp; Slutkontroll</h4>
                                <p style=\"line-height: 1.7; color: #475569; margin: 0; font-size: 1.05rem;\">När spolningen i en lägenhet är klar spolar vi alltid rikligt med vatten i alla avlopp för att säkerställa att inget vatten tränger upp någonstans och att avrinningen fungerar felfritt. Vi torkar noggrant rent runt arbetsplatsen. Därefter stänger och låser vi dörren och beger oss till nästa lägenhet. Efter avslutat projekt överlämnar vi en dokumentation på utfört arbete.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</section>
`;

if (start !== -1 && end !== -1) {
    const finalHtml = html.substring(0, start) + newSection + html.substring(end);
    fs.writeFileSync('public/stamspolning.html', finalHtml);
}
