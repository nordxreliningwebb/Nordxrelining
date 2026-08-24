import React from 'react';
import { Metadata } from 'next';
import FrontendLayout from "@/components/FrontendLayout";
import StamspolningClientLogic from "./StamspolningClientLogic";

export const metadata: Metadata = {
  title: "Stamspolning - NordX Relining",
  description: "NordX Relining erbjuder professionell stamspolning, relining och rörinspektioner. Säkra, hållbara och kostnadseffektiva lösningar för dina rörsystem.",
};

export default function Page() {
  return (
    <FrontendLayout>
      <style dangerouslySetInnerHTML={{ __html: "\r\n        /* Specific overrides for stamspolning landing page */\r\n        #main-header .nav-links a {\r\n            color: #111111 !important;\r\n        }\r\n        #main-header .nav-links a:hover {\r\n            color: var(--primary-color) !important;\r\n        }\r\n        #main-header #logo-img {\r\n            filter: none !important;\r\n            content: url('logo.png') !important;\r\n        }\r\n        #main-header .menu-toggle span {\r\n            background-color: #111111 !important;\r\n        }\r\n    " }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "\r\n    {\r\n        \"@context\": \"https://schema.org\",\r\n        \"@type\": \"Plumber\",\r\n        \"name\": \"NordX Relining\",\r\n        \"url\": \"https://www.nordxrelining.se\",\r\n        \"logo\": \"https://www.nordxrelining.se/logo.png\",\r\n        \"image\": \"https://www.nordxrelining.se/vvs_hero.png\",\r\n        \"description\": \"Professionell stamspolning, relining och rörinspektioner med lång garanti och certifierade experter.\",\r\n        \"address\": {\r\n            \"@type\": \"PostalAddress\",\r\n            \"streetAddress\": \"Hemvärnsgatan 8\",\r\n            \"postalCode\": \"171 54\",\r\n            \"addressLocality\": \"Solna\",\r\n            \"addressCountry\": \"SE\"\r\n        },\r\n        \"telephone\": \"+46703185110\",\r\n        \"email\": \"info@nordxrelining.se\",\r\n        \"areaServed\": {\r\n            \"@type\": \"Country\",\r\n            \"name\": \"Sweden\"\r\n        },\r\n        \"hasOfferCatalog\": {\r\n            \"@type\": \"OfferCatalog\",\r\n            \"name\": \"VVS-Tjänster\",\r\n            \"itemListElement\": [\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Stamspolning\"\r\n                    }\r\n                },\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Relining\"\r\n                    }\r\n                },\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Rörinspektion\"\r\n                    }\r\n                }\r\n            ]\r\n        }\r\n    }\r\n    " }} />
      <StamspolningClientLogic />
      <main id="main-content">
        

    
    <section className="swoosh-hero" style={{backgroundColor: "#faf8f5", padding: "160px 0 100px 0", overflow: "hidden", }}>
        <div className="container" style={{maxWidth: "1400px", width: "95%", margin: "0 auto", padding: "0", }}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", }}>
                
                {/* Left: White Card */}
                <div style={{background: "#ffffff", borderRadius: "32px", padding: "4rem 3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.03)", zIndex: "2", position: "relative", }} className="anim-fade-left">
                    <h1 style={{fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: "800", color: "#0f172a", lineHeight: "1.1", marginBottom: "1.5rem", letterSpacing: "-0.02em", }} className=""><span className="">
                        Stamspolning och rörspolning
                    </span></h1>
                    <p style={{fontSize: "1.25rem", color: "#475569", lineHeight: "1.6", marginBottom: "2.5rem", }} className="">
                        Rinner vattnet undan trögt, eller upplever du obehaglig lukt från avloppet? Då är det hög tid för en professionell rörspolning. Vi säkrar stammarna för bostadsrättsföreningar, företag och villaägare, och förebygger dyra vattenskador innan de hinner uppstå.
                    </p>
                    <a href="/kontakt" className="btn btn-primary" style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", borderRadius: "8px", padding: "1rem 2rem", background: "#0284c7", border: "none", }}>
                        Kontakta oss
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>

                {/* Right: Masked Image with Photorealistic Pipe Frame */}
                <div style={{position: "relative", width: "100%", maxWidth: "600px", aspectRatio: "1/1", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "50%", }} className="anim-fade-right" data-anim-delay="200">
                    {/* The actual photo (Stamspolning) fills the entire circle */}
                    <img src="stamspolning.jpeg" alt="Professionell stamspolning av NordX Relining" style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: "1", }} className="" />
                    {/* The photorealistic pipe frame overlay, scaled up to make the rim thinner */}
                    <img src="pipe_frame.png" alt="Rörram" style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: "2", mixBlendMode: "multiply", pointerEvents: "none", transform: "scale(1.25)", }} className="" />
                </div>

            </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: "\r\n            @media (max-width: 900px) {\r\n                .swoosh-hero > .container > div {\r\n                    grid-template-columns: 1fr !important;\r\n                    gap: 4.5rem !important;\r\n                }\r\n                .swoosh-hero {\r\n                    margin-top: -85px !important;\r\n                        padding: 115px 0 60px 0 !important;\r\n                }\r\n            }\r\n        " }} />
    </section>
    
    


<section className="service-page-content" id="stamspolning-content" style={{padding: "100px 0", background: "#ffffff", position: "relative", overflow: "hidden", }}>
    
    {/* SVG OVERLAY FOR DYNAMIC PIPE */}
    <svg id="dynamic-pipe-canvas" style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "1", }}>
        <defs id="dynamic-pipe-defs">
            
                            {/* Premium Pipe Gradient (Bright PVC/Aluminum look) */}
                            <linearGradient id="premium-pipe" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#cbd5e1"></stop>
                                <stop offset="12%" stopColor="#f8fafc"></stop>
                                <stop offset="25%" stopColor="#ffffff"></stop>
                                <stop offset="45%" stopColor="#e2e8f0"></stop>
                                <stop offset="85%" stopColor="#94a3b8"></stop>
                                <stop offset="100%" stopColor="#64748b"></stop>
                            </linearGradient>

                            <linearGradient id="cut-edge-l" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#94a3b8"></stop>
                                <stop offset="20%" stopColor="#f8fafc"></stop>
                                <stop offset="100%" stopColor="#cbd5e1"></stop>
                            </linearGradient>
                            <linearGradient id="cut-edge-r" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#cbd5e1"></stop>
                                <stop offset="80%" stopColor="#f8fafc"></stop>
                                <stop offset="100%" stopColor="#94a3b8"></stop>
                            </linearGradient>

                            {/* Metal Brackets (Horizontal gradient to match cylinder shading) */}
                            <linearGradient id="metal-bracket" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#475569"></stop>
                                <stop offset="25%" stopColor="#94a3b8"></stop>
                                <stop offset="50%" stopColor="#ffffff"></stop>
                                <stop offset="75%" stopColor="#94a3b8"></stop>
                                <stop offset="100%" stopColor="#475569"></stop>
                            </linearGradient>

                            {/* Organic Dirt Gradients (Deep Browns) */}
                            <linearGradient id="dirt-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#5c4033"></stop>
                                <stop offset="50%" stopColor="#4a3225"></stop>
                                <stop offset="100%" stopColor="#2d1c13"></stop>
                            </linearGradient>
                            <linearGradient id="dirt-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#7a5542"></stop>
                                <stop offset="100%" stopColor="#4a3225"></stop>
                            </linearGradient>

                            {/* Filters */}
                            <filter id="dirt-shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="12" stdDeviation="6" floodColor="#000000" floodOpacity="0.8"></feDropShadow>
                            </filter>
                            <filter id="bracket-shadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.5"></feDropShadow>
                            </filter>
                            <filter id="hose-shadow" x="-50%" y="-10%" width="200%" height="120%">
                                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000000" floodOpacity="0.75"></feDropShadow>
                            </filter>

                            <style dangerouslySetInnerHTML={{ __html: "\r\n                                @keyframes sprayPulse {\r\n                                    0% { opacity: 0.6; transform: scaleY(0.95); }\r\n                                    100% { opacity: 1; transform: scaleY(1.05); }\r\n                                }\r\n                                @keyframes nozzleSpin {\r\n                                    0% { transform: rotateY(0deg); }\r\n                                    100% { transform: rotateY(360deg); }\r\n                                }\r\n                                .spray-particles path {\r\n                                    transform-origin: center top;\r\n                                    transition: opacity 0.3s ease, transform 0.3s ease;\r\n                                    opacity: 0.8;\r\n                                }\r\n                                .nozzle-rotator {\r\n                                    transform-origin: 100px 45px;\r\n                                    transition: transform 0.3s ease;\r\n                                }\r\n                                /* Only animate when scrolling! */\r\n                                .is-spraying .spray-mist { animation: sprayPulse 0.08s infinite alternate; }\r\n                                .is-spraying .spray-jet { animation: sprayPulse 0.06s infinite alternate-reverse; }\r\n                                .is-spraying .spray-core { animation: sprayPulse 0.1s infinite alternate; }\r\n                                .is-spraying .nozzle-rotator { animation: nozzleSpin 0.12s linear infinite; }\r\n                            " }} />
                        
        </defs>
        {/* The dynamically drawn pipe path */}
        <g id="dynamic-pipe-group"></g>
        
        {/* The nozzle and spray */}
        <g id="dynamic-nozzle" style={{opacity: "0", }}>
            <g className="spray-particles">
                                {/* Outer mist */}
                                <path className="spray-mist" d="M 100 40 L 40 220 M 100 40 L 100 240 M 100 40 L 160 220" stroke="rgba(0,200,255,0.4)" strokeWidth="30" strokeLinecap="round" filter="blur(8px)"></path>
                                {/* Inner high pressure jet */}
                                <path className="spray-jet" d="M 100 40 L 50 200 M 100 40 L 100 220 M 100 40 L 150 200" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" filter="blur(2px)"></path>
                                <path className="spray-core" d="M 100 40 L 60 180 M 100 40 L 100 200 M 100 40 L 140 180" stroke="#00d8ff" strokeWidth="4" strokeLinecap="round"></path>
                            </g>
{/* Premium Vector Nozzle */}
                            <g filter="url(#bracket-shadow)">
                                {/* Connector (Static, matching hose width) */}
                                <rect x="92" y="-5" width="16" height="20" fill="#1e293b"></rect>
                                {/* Flange base (slightly wider) */}
                                <rect x="86" y="10" width="28" height="5" fill="#0f172a"></rect>
                                
                                {/* Centered Highlights */}
                                <rect x="97" y="-5" width="6" height="20" fill="#475569" opacity="0.6"></rect>
                                <rect x="99.25" y="-5" width="1.5" height="20" fill="#ffffff" opacity="0.4"></rect>
                                
                                {/* Spinning Head */}
                                <g className="nozzle-rotator">
                                    {/* Main block */}
                                    <path d="M 75 15 L 125 15 L 125 45 L 75 45 Z" fill="url(#metal-bracket)"></path>
                                    {/* Grooves */}
                                    <rect x="75" y="22" width="50" height="3" fill="#0f172a" opacity="0.7"></rect>
                                    <rect x="75" y="30" width="50" height="3" fill="#0f172a" opacity="0.7"></rect>
                                    <rect x="75" y="38" width="50" height="3" fill="#0f172a" opacity="0.7"></rect>
                                    {/* Tip */}
                                    <path d="M 75 45 L 125 45 L 110 65 L 90 65 Z" fill="url(#premium-pipe)"></path>
                                    <path d="M 90 65 L 110 65 L 106 72 L 94 72 Z" fill="#1e293b"></path>
                                    {/* Jet Holes */}
                                    <ellipse cx="100" cy="70" rx="3" ry="1.5" fill="#000000"></ellipse>
                                    <ellipse cx="90" cy="60" rx="2" ry="3" fill="#000000" transform="rotate(30, 90, 60)"></ellipse>
                                    <ellipse cx="110" cy="60" rx="2" ry="3" fill="#000000" transform="rotate(-30, 110, 60)"></ellipse>
                                </g>
                            </g>

        </g>
    </svg>

    <div className="container layout-wrapper" style={{maxWidth: "1400px", width: "95%", margin: "0 auto", position: "relative", zIndex: "2", }}>
        
        {/* Top Right Text Block */}
        <div className="intro-text-block" id="intro-text" style={{maxWidth: "650px", marginRight: "auto", marginLeft: "0", marginBottom: "8rem", }}>
<h2 style={{fontSize: "2.5rem", marginBottom: "1.5rem", color: "#0f172a", }} className="anim-fade-left">Underhållsspolning &amp; Förebyggande Åtgärder</h2>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "1.5rem", }} className="anim-fade-right">Bristande avloppsunderhåll är ofta en dold källa till akuta problem. Matfett, hudavlagringar och tvålrester sätter med tiden igen rören, minskar innerdiametern och orsakar dålig avrinning. Hur ofta en underhållsspolning bör göras beror på fastighetens skick, ålder och rörens dimensioner, men ett bra riktvärde är att spola stammarna vart tredje till femte år. Då hålls rören i ett mycket bättre skick och får en längre livslängd. Dessutom undviker du troligen akuta stopp och vi hinner upptäcka om det uppstått skador i dina avloppsrör i god tid.</p>
                
                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Kluckande ljud och dålig avrinning?</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2rem", }} className="anim-fade-right">Hör du kluckande ljud från avloppet är det ett tidigt tecken på att det är dags för en stamspolning – en rejäl avloppsrensning som spolar rent rören i din fastighet. Får du dessutom ett ovälkommet fotbad varje gång du duschar? Då är det verkligen dags! Vi använder specialanpassade munstycken och spolar avloppet med hetvatten under högt tryck, vilket skonsamt smälter bort fett och blockeringar.</p>

                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Bostadsrättsföreningar (BRF) &amp; Villa</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2rem", }} className="anim-fade-right">Att lägga in stamspolning i fastighetens löpande underhållsplan är en effektiv försäkring mot vattenskador för bostadsrättsföreningar. Vi arbetar även med villor där vi ser till att hela systemet från husgrund till tomtgräns spolas rent. För BRF:er är första steget att vi besiktar vilka rör och stammar det gäller i samverkan med er. Därefter sköter vi all avisering till hyresgäster och boende om tid och datum. De som vill kan vara hemma och öppna åt oss, i annat fall kan vi gå in på egen hand med huvudnyckel. Vi har en flexibel fordonspark, från små, smidiga och miljöklassade spolbussar med god framkomlighet, till större kombibilar i miljöklass EURO-6.</p>

                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Kamerabesiktning ingår alltid</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "3.5rem", }} className="anim-fade-right">Vår personal är alltid utrustad med filmkamera. Skulle vi stöta på problem kan vi direkt utreda orsaken till stoppet och lämna förslag på vidare åtgärd. Visar det sig att det finns skador i rören kan det vara dags att överväga en renovering. Vi erbjuder då rörinfodring (relining), en schaktfri metod som efter reparation ger ett helt nytt, självbärande rör inuti dina befintliga stammar utan dyra rivningsarbeten.</p>

                
        </div>
        
        {/* Bottom Left Text Block */}
        <div className="steps-text-block" id="steg-for-steg-heading" style={{maxWidth: "650px", marginRight: "auto", marginLeft: "0", marginBottom: "4rem", }}>
<h3 style={{fontSize: "2rem", marginBottom: "1.5rem", color: "#0f172a", paddingTop: "2rem", borderTop: "1px solid #e2e8f0", }} className="anim-fade-up">Så här går det till – Steg för Steg</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2.5rem", }} className="anim-fade-up">När vi på NordX Relining utför ett arbete följer vi alltid en strikt branschstandard. Arbetet kräver oftast tillträde till fastighetens samtliga lägenheter (eller samtliga avlopp i villan) för att garantera ett perfekt resultat.</p>
                
                <div className="process-steps-container premium-steps" style={{display: "flex", flexDirection: "column", gap: "1.5rem", }}>
                    {/* Steg 1 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 1</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Förberedelser &amp; Källaren</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Arbetet inleds alltid längst ner i fastigheten. Vi inspekterar rensluckor och spolar bottenavloppet (uppsamlingsledningen) hela vägen ut till den kommunala huvudledningen. Detta är kritiskt för att det smuts vi senare spolar loss uppifrån fritt ska kunna rinna undan utan att orsaka stopp i källaren.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Steg 2 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 2</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Bottenvåningen</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">När källarledningen är helt ren går vi vidare till lägenheterna på bottenvåningen. Här demonterar vi vattenlås under diskbänk och handfat och spolar stickledningarna (rören i golv/vägg fram till huvudstammen). Vi spolar också kök, badrum och eventuella golvbrunnar i badrum och WC.</p>
                            </div>
                        </div>
                    </div>

                    {/* Steg 3 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 3</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Resterande våningsplan</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Vi arbetar oss sedan metodiskt uppåt i fastigheten, våning för våning. I varje lägenhet spolas stickledningar och anslutningar till stammen rena från fett, smuts och beläggningar. Ofta spolar vi då huvudstammen från lägenheterna högst upp i huset hela vägen ner till källarstammen.</p>
                            </div>
                        </div>
                    </div>

                    {/* Steg 4 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 4</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Återställning &amp; Slutkontroll</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">När spolningen i en lägenhet är klar spolar vi alltid rikligt med vatten i alla avlopp för att säkerställa att inget vatten tränger upp någonstans och att avrinningen fungerar felfritt. Vi torkar noggrant rent runt arbetsplatsen. Därefter stänger och låser vi dörren och beger oss till nästa lägenhet. Efter avslutat projekt överlämnar vi en dokumentation på utfört arbete.</p>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    </div>
</section>





    <section className="bottom-service-cta" style={{background: "#0284c7", color: "#ffffff", padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden", marginTop: "0", width: "100vw", marginLeft: "calc(-50vw + 50%)", boxSizing: "border-box", zIndex: "2", }}>
        <style dangerouslySetInnerHTML={{ __html: "\r\n            .bottom-service-cta h2, .bottom-service-cta p {\r\n                text-transform: none !important;\r\n            }\r\n            .bottom-service-cta p {\r\n                font-weight: 400 !important;\r\n            }\r\n            .bottom-service-cta .cta-btn-header-match {\r\n                background: #ffffff !important;\r\n                color: #000000 !important;\r\n                border: 1px solid #ffffff !important;\r\n                border-radius: 6px !important;\r\n                padding: 0.75rem 1.75rem !important;\r\n                font-weight: 600 !important;\r\n                font-size: 1rem !important;\r\n                transition: all 0.3s ease !important;\r\n                text-decoration: none;\r\n                display: inline-block;\r\n                text-transform: none !important;\r\n                box-shadow: none !important;\r\n                transform: none !important;\r\n            }\r\n            .bottom-service-cta .cta-btn-header-match:hover {\r\n                background: #ffffff !important;\r\n                color: #000000 !important;\r\n                border: 1px solid #ffffff !important;\r\n                box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;\r\n                transform: translateY(-4px) !important;\r\n            }\r\n            .bottom-service-cta:hover {\r\n                transform: none !important;\r\n                box-shadow: none !important;\r\n                background: #0284c7 !important;\r\n            }\r\n        " }} />
        {/* Dekoration för high-end känsla */}
        <div style={{position: "absolute", top: "-50%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", pointerEvents: "none", }}></div>
        <div style={{position: "absolute", bottom: "-50%", right: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", pointerEvents: "none", }}></div>
        
        <div className="container" style={{maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: "2", }}>
            <style dangerouslySetInnerHTML={{ __html: "@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.8rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { padding: 14px 10px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: nowrap !important; font-size: 1.15rem !important; } }" }} /><h2 style={{fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: "800", marginBottom: "1rem", color: "#ffffff", lineHeight: "1.2", whiteSpace: "nowrap", }} className="cta-heading anim-mask-text"><span className="anim-mask-inner">Säkra upp fastighetens rör i tid</span></h2>
            <p style={{fontSize: "1.15rem", lineHeight: "1.6", marginBottom: "2.5rem", opacity: "0.9", }} className="anim-fade-up">Genom att spola stammarna i tid förebygger ni dyra vattenskador och förlänger rörsystemets livslängd. Låt våra certifierade tekniker säkerställa att fastighetens avlopp mår bra.</p>
            <div className="cta-buttons" style={{display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "nowrap", alignItems: "center", }}>
                <a href="/kontakt" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Kontakta oss</a>
                <a href="tel:+46703185110" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Ring oss</a>
            </div>
        </div>
    </section>

      </main>
    </FrontendLayout>
  );
}
