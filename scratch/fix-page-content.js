const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../src/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const anchorStart = `                    #nordx-hidden-group {`;

const startIdx = content.indexOf(anchorStart);
if (startIdx === -1) {
    console.log("Could not find start anchor");
    process.exit(1);
}

const anchorEnd = `        {/* PROJEKT PREVIEW SEKTION */}`;
const endIdx = content.indexOf(anchorEnd);
if (endIdx === -1) {
    console.log("Could not find end anchor");
    process.exit(1);
}

const newSection = `                    #nordx-hidden-group {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    /* FAQ Waves Styling */
                    .faq-wave-base {
                        position: relative;
                        border-top-left-radius: 0 !important;
                        border-top-right-radius: 0 !important;
                        margin-top: 25px; /* Spacing for the wave */
                    }
                    .faq-wave-base::before {
                        content: "";
                        position: absolute;
                        top: -15px; /* Significant overlap to prevent tearing */
                        left: 0;
                        width: 100%;
                        height: 25px;
                        background-size: 100% 100%;
                        background-position: bottom;
                        background-repeat: no-repeat;
                        pointer-events: none;
                        z-index: 1;
                    }
                    /* Wave Variations using inline SVG data URIs */
                    .wave-1::before {
                        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z' fill='%237dd3fc'/%3E%3Cpath d='M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z' fill='%2338bdf8' opacity='0.7'/%3E%3Cpath d='M0,80 C250,130 350,10 600,80 C850,130 950,10 1200,80 L1200,120 L0,120 Z' fill='%230284c7'/%3E%3C/svg%3E");
                    }
                    .wave-2::before {
                        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,40 C200,100 400,0 600,40 C800,100 1000,0 1200,40 L1200,120 L0,120 Z' fill='%237dd3fc'/%3E%3Cpath d='M0,70 C250,10 450,120 600,70 C750,10 950,120 1200,70 L1200,120 L0,120 Z' fill='%2338bdf8' opacity='0.7'/%3E%3Cpath d='M0,60 C300,120 400,20 600,60 C800,120 900,20 1200,60 L1200,120 L0,120 Z' fill='%230284c7'/%3E%3C/svg%3E");
                    }
                    .wave-3::before {
                        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,80 C150,20 300,120 600,80 C900,20 1050,120 1200,80 L1200,120 L0,120 Z' fill='%237dd3fc'/%3E%3Cpath d='M0,50 C200,120 350,10 600,50 C850,120 1000,10 1200,50 L1200,120 L0,120 Z' fill='%2338bdf8' opacity='0.7'/%3E%3Cpath d='M0,70 C150,120 400,0 600,70 C800,120 1050,0 1200,70 L1200,120 L0,120 Z' fill='%230284c7'/%3E%3C/svg%3E");
                    }
                \` }} />

                <div className="nordx-faq-list anim-stagger-parent" id="faq-accordion">
                    {/* Synliga från start */}
                    <FAQAccordionClient 
                        question="Hur ofta bör man spola stammarna i en fastighet?"
                        answer="För flerbostadshus rekommenderar vi generellt att en stamspolning utförs vart 3:e till 5:e år. Intervallen beror på rörsystemets ålder och skick. Ett regelbundet underhåll minskar risken för akuta stopp och vattenskador avsevärt."
                        waveClass="wave-1 anim-fade-left anim-stagger-item"
                    />

                    <FAQAccordionClient 
                        question="Vad är skillnaden på relining och stambyte?"
                        answer="Ett traditionellt stambyte innebär att man river ut och byter alla rör, vilket ofta medför att badrum måste totalrenoveras och de boende måste evakueras. Vid relining skapar vi istället ett nytt, självbärande rör inuti det befintliga röret. Det går snabbare, är betydligt billigare och de boende kan bo kvar under processen."
                        waveClass="wave-2 anim-fade-right anim-stagger-item"
                    />

                    <FAQAccordionClient 
                        question="När är det dags för en rörinspektion?"
                        answer="Du bör boka en rörinspektion om du märker att vattnet rinner undan långsamt, vid återkommande stopp, dålig lukt från avloppet, eller om fastigheten är äldre och du vill ha en statusbedömning. En inspektion med kamera är det enda sättet att se rörens exakta skick."
                        waveClass="wave-3 anim-fade-left anim-stagger-item"
                    />

                    <FAQAccordionClient 
                        question="Hur lång garanti har ni på relining?"
                        answer="Vi arbetar uteslutande med RISE P-märkta material av absolut högsta kvalitet, och lämnar alltid 20 års garanti på vårt utförda relining-arbete för din trygghet."
                        waveClass="wave-1 anim-fade-right anim-stagger-item"
                    />

                    {/* Dolda FAQ-frågor */}
                    <div id="nordx-hidden-group-wrapper" style={{ position: "relative", zIndex: "1", visibility: "hidden", maxHeight: "0", overflow: "hidden", transition: "max-height 0.8s ease, opacity 0.6s ease, margin-top 0.6s ease", opacity: "0", marginTop: "0" }}>
                        <div id="nordx-hidden-group" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            
                            <FAQAccordionClient 
                                question="Kan relining göras på alla typer av rör?"
                                answer="Ja, modern reliningsteknik kan appliceras på nästan alla rörtyper; gjutjärn, betong, plast och lergods. Vilken specifik metod som används anpassas utifrån rörsystemets dimensioner och nuvarande kondition, vilket vi utvärderar genom en rörinspektion."
                                waveClass="wave-2 anim-fade-left anim-stagger-item"
                            />

                            <FAQAccordionClient 
                                question="Hur lång tid tar en stamspolning?"
                                answer="Tidsåtgången varierar kraftigt beroende på fastighetens storlek. För en genomsnittlig lägenhet tar spolningen oftast bara 30-45 minuter per hushåll. Vid större fastigheter lägger vi upp en tydlig tidplan så att påverkan för de boende blir minimal."
                                waveClass="wave-3 anim-fade-right anim-stagger-item"
                            />

                            <FAQAccordionClient 
                                question="Vad kostar en rörinspektion eller relining?"
                                answer="Varje fastighet har unika förutsättningar. Kostnaden påverkas av rörsystemets komplexitet, längd och skick. Vi rekommenderar att ni bokar ett kostnadsfritt första besök där vi bedömer situationen och därefter ger er en fast och transparent offert."
                                waveClass="wave-1 anim-fade-left anim-stagger-item"
                            />
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "3rem", position: "relative", zIndex: "10" }}>
                    <a href="/faq" className="btn-hero-solid anim-fade-up anim-stagger-item">Se alla vanliga frågor</a>
                </div>

            </div>

        </section>

        {/* Premium Transition Divider (Pure CSS Photorealistic PVC Pipe) TOP */}
        <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", height: "100px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "5" }}>
            {/* Sned CSS-container för att rotera hela rörsystemet */}
            <div style={{ position: "absolute", width: "110%", height: "200%", top: "-50%", left: "-5%", transform: "rotate(-1deg)", display: "flex", alignItems: "center", background: "linear-gradient(to bottom, #f8fafc 50%, #ffffff 50%)" }}>
                {/* Huvudröret */}
                <div style={{ width: "100%", height: "26px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", position: "relative", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                    {/* Skarvmuff 1 (Vänster) */}
                    <div style={{ position: "absolute", left: "15%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                    </div>
                    {/* Skarvmuff 2 (Mitten) */}
                    <div style={{ position: "absolute", left: "52%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                    </div>
                    {/* Skarvmuff 3 (Höger) */}
                    <div style={{ position: "absolute", right: "12%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                    </div>
                </div>
            </div>
        </div>

`;

content = content.substring(0, startIdx) + newSection + content.substring(endIdx);
fs.writeFileSync(pagePath, content);
console.log("Successfully restored page.tsx");
