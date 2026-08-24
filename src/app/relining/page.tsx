import React from 'react';
import { Metadata } from 'next';
import FrontendLayout from "@/components/FrontendLayout";
import ReliningClientLogic from "./ReliningClientLogic";

export const metadata: Metadata = {
  title: "Relining av avloppsrör &amp; rörrenovering | NordX Relining",
  description: "Undvik dyra stambyten med modern relining. Vi renoverar dina avloppsrör inifrån – snabbt, kostnadseffektivt och med 50 års förväntad livslängd. Boka fri konsultation!",
};

export default function Page() {
  return (
    <FrontendLayout>
      <style dangerouslySetInnerHTML={{ __html: "\r\n        /* Specific overrides for stamspolning landing page */\r\n        #main-header .nav-links a {\r\n            color: #111111 !important;\r\n        }\r\n        #main-header .nav-links a:hover {\r\n            color: var(--primary-color) !important;\r\n        }\r\n        #main-header #logo-img {\r\n            filter: none !important;\r\n            content: url('logo.png') !important;\r\n        }\r\n        #main-header .menu-toggle span {\r\n            background-color: #111111 !important;\r\n        }\r\n    " }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "\r\n    {\r\n        \"@context\": \"https://schema.org\",\r\n        \"@type\": \"Plumber\",\r\n        \"name\": \"NordX Relining\",\r\n        \"url\": \"https://www.nordxrelining.se\",\r\n        \"logo\": \"https://www.nordxrelining.se/logo.png\",\r\n        \"image\": \"https://www.nordxrelining.se/vvs_hero.png\",\r\n        \"description\": \"Professionell stamspolning, relining och rörinspektioner med lång garanti och certifierade experter.\",\r\n        \"address\": {\r\n            \"@type\": \"PostalAddress\",\r\n            \"streetAddress\": \"Hemvärnsgatan 8\",\r\n            \"postalCode\": \"171 54\",\r\n            \"addressLocality\": \"Solna\",\r\n            \"addressCountry\": \"SE\"\r\n        },\r\n        \"telephone\": \"+46703185110\",\r\n        \"email\": \"info@nordxrelining.se\",\r\n        \"areaServed\": {\r\n            \"@type\": \"Country\",\r\n            \"name\": \"Sweden\"\r\n        },\r\n        \"hasOfferCatalog\": {\r\n            \"@type\": \"OfferCatalog\",\r\n            \"name\": \"VVS-Tjänster\",\r\n            \"itemListElement\": [\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Stamspolning\"\r\n                    }\r\n                },\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Relining\"\r\n                    }\r\n                },\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Rörinspektion\"\r\n                    }\r\n                }\r\n            ]\r\n        }\r\n    }\r\n    " }} />
      <ReliningClientLogic />
      <main id="main-content">
        

    
    <section className="swoosh-hero" style={{backgroundColor: "#faf8f5", padding: "160px 0 100px 0", overflow: "hidden", }}>
        <div className="container" style={{maxWidth: "1400px", width: "95%", margin: "0 auto", padding: "0", }}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", }}>
                
                {/* Left: White Card */}
                <div style={{background: "#ffffff", borderRadius: "32px", padding: "4rem 3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.03)", zIndex: "2", position: "relative", }} className="anim-fade-left">
                    <h1 style={{fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: "800", color: "#0f172a", lineHeight: "1.1", marginBottom: "1.5rem", letterSpacing: "-0.02em", }} className=""><span className="">
                        Relining, ett smidigt och kostnadseffektivt alternativ till stambyte
                    </span></h1>
                    <p style={{fontSize: "1.25rem", color: "#475569", lineHeight: "1.6", marginBottom: "2.5rem", }} className="">
                        Renovera fastighetens avloppsrör inifrån utan dyra och stökiga rivningsarbeten. Med modern infodring får ni helt nya, självbärande rör – snabbt, kostnadseffektivt och med minimal störning för de boende.
                    </p>
                    <a href="/kalkylator" className="btn btn-primary" style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", borderRadius: "8px", padding: "1rem clamp(0.1rem, 1vw, 2rem) 1rem 2rem", fontSize: "1.1rem", background: "#0284c7", border: "none", whiteSpace: "nowrap", }}>
                        Skapa en offertförfrågan
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>

                {/* Right: Masked Image with Photorealistic Pipe Frame */}
                <div style={{position: "relative", width: "100%", maxWidth: "600px", aspectRatio: "1/1", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "50%", }} className="anim-fade-right" data-anim-delay="200">
                    {/* The actual photo (Relining) fills the entire circle */}
                    <img src="relining.jpeg" alt="Professionell relining av NordX Relining" style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: "1", }} className="" />
                    
                    {/* The photorealistic pipe frame overlay (Gamla röret), mix-blend-mode ligger kvar på z-index 2 */}
                    <img src="pipe_frame.png" alt="Rörram" style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: "2", mixBlendMode: "multiply", pointerEvents: "none", transform: "scale(1.25)", }} className="" />

                    {/* Blå massa som representerar relining (Nytt plaströr inuti) */}
                    {/* Ligger på z-index 3. 3D CSS med skarpa inre kanter så att fotot i mitten förblir helt kristallklart */}
                    <div style={{position: "absolute", width: "92%", height: "92%", borderRadius: "50%", zIndex: "3", pointerEvents: "none", border: "2px solid #81d4fa", /* Ljus kant närmast betraktaren */
                        boxShadow: "inset -10px 15px 15px -2px rgba(255,255,255,0.35), inset 10px -15px 20px -2px rgba(0,0,0,0.5), inset 0 0 6px 4px #29b6f6, inset 0 0 18px 12px #0284c7, inset 0 0 0 28px #014366, inset 0 0 12px 28px rgba(0,0,0,0.7), 0 0 15px 2px rgba(0,0,0,0.65)", }}></div>
                </div>

            </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: "\r\n            @media (max-width: 900px) {\r\n                .swoosh-hero > .container > div {\r\n                    grid-template-columns: 1fr !important;\r\n                    gap: 4.5rem !important;\r\n                }\r\n                .swoosh-hero {\r\n                    margin-top: -85px !important;\r\n                        padding: 115px 0 60px 0 !important;\r\n                }\r\n            }\r\n        " }} />
    </section>
    
    


<section className="service-page-content" id="stamspolning-content" style={{padding: "100px 0", background: "#ffffff", position: "relative", overflow: "hidden", }}>
    
    {/* SVG OVERLAY FOR DYNAMIC PIPE */}
    <svg id="dynamic-pipe-canvas" style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "1", }}>
        <defs id="dynamic-pipe-defs">
            {/* CTA Button Gradient for Relining Liner */}
            <linearGradient id="cta-blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0fb3ff"></stop>
                <stop offset="100%" stopColor="#0056b3"></stop>
            </linearGradient>
            
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

        {/* CSS för att dölja stamspolnings-element (slang och smuts) */}
        <style dangerouslySetInnerHTML={{ __html: "\r\n            /* Dölj den svarta slangen */\r\n            #dynamic-pipe-group rect[fill=\"#111827\"],\r\n            #dynamic-pipe-group rect[fill=\"#475569\"],\r\n            #dynamic-pipe-group rect[fill=\"#ffffff\"][opacity=\"0.4\"] {\r\n                display: none !important;\r\n            }\r\n            /* Dölj smuts-lagren */\r\n            #dynamic-pipe-group g[mask=\"url(#dirt-mask)\"],\r\n            #dynamic-pipe-group rect[fill=\"url(#cartoon-dirt-texture)\"] {\r\n                display: none !important;\r\n            }\r\n        " }} />

        {/* Relining-strumpan (Liner trail) som fylls på allt eftersom. Bredd 106 motsvarar rörets innerbredd */}
        <g id="relining-liner">
            <rect className="relining-main-body" x="47" y="0" width="106" height="0" fill="url(#cta-blue-gradient)"></rect>
            {/* Skuggor och blänk som fortsätter hela vägen ner i huvudet */}
            <rect className="relining-h1" x="52" y="0" width="6" height="0" fill="#bae6fd" opacity="0.65" rx="3"></rect>
            <rect className="relining-h2" x="64" y="0" width="2" height="0" fill="#bae6fd" opacity="0.4" rx="1"></rect>
        </g>
        
        {/* Själva huvudet på strumpan som skjuts framåt (inverteras) med tryckluft */}
        <g id="dynamic-nozzle" style={{opacity: "0", }}>
             {/* Den runda trycksatta toppen på strumpan (vägg till vägg) */}
             <path d="M 47 -30 L 47 20 Q 100 65 153 20 L 153 -30 Z" fill="url(#cta-blue-gradient)"></path>
             {/* Veck/detalj i plasten under tryck */}
             <path d="M 60 10 Q 100 30 140 10" stroke="#0056b3" strokeWidth="3" fill="none" opacity="0.6"></path>
             <path d="M 50 0 Q 100 20 150 0" stroke="#0fb3ff" strokeWidth="4" fill="none" opacity="0.8"></path>
        </g>
    </svg>
    
    

    <div className="container layout-wrapper" style={{maxWidth: "1400px", width: "95%", margin: "0 auto", position: "relative", zIndex: "2", }}>
        
        {/* Top Right Text Block */}
        <div className="intro-text-block" id="intro-text" style={{maxWidth: "650px", marginRight: "auto", marginLeft: "0", marginBottom: "8rem", }}>
<h2 style={{fontSize: "2.5rem", marginBottom: "1.5rem", color: "#0f172a", }} className="anim-fade-left">Vad är relining och varför är det så smart?</h2>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "1.5rem", }} className="anim-fade-right">Relining, eller rörinfodring som det också kallas, är en väletablerad metod för att förnya uttjänta och skadade avloppssystem utan att behöva genomföra ett traditionellt stambyte. Istället för att bila upp golv och riva ut hela kök och badrum, bygger vi ett nytt, självbärande rör inuti det befintliga röret. Resultatet blir ett helt nytt rörsystem som är minst lika starkt som ett konventionellt rör, men till en bråkdel av kostnaden och arbetsinsatsen.</p>
                
                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Upp till 50 % billigare än stambyte</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2rem", }} className="anim-fade-right">Att genomföra ett komplett stambyte är ofta en enorm utgift för en bostadsrättsförening eller fastighetsägare. Med relining kapar du ofta kostnaderna med upp till 50 %. Du slipper dyra kostnader för återställning av ytskikt såsom kakel, klinker och tätskikt, eftersom vi jobbar helt inifrån rörsystemet.</p>

                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Bo kvar under hela arbetet</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2rem", }} className="anim-fade-right">En av de största fördelarna med relining är den minimala störningen. Ett stambyte betyder ofta att de boende tvingas evakueras och bo någon annanstans under flera veckor eller månader. Med vår strumpmetod utför vi arbetet snabbt och effektivt på bara några få dagar. Ofta behöver vattnet stängas av under endast en mycket kort period, vilket gör att de boende bekvämt kan stanna kvar i sina hem under projektets gång.</p>

                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Trygghet i över 50 år</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "3.5rem", }} className="anim-fade-right">Det material vi använder (så kallade flexibla foder impregnerade med högkvalitativ härdplast) skapar ett helt skarvfritt och extremt tåligt system. Det nya röret är korrosionsbeständigt, skyddar mot framtida rotangrepp och har en förväntad livslängd på över 50 år. En modern investering för framtiden.</p>

                
        </div>
        
        {/* Bottom Left Text Block */}
        <div className="steps-text-block" id="steg-for-steg-heading" style={{maxWidth: "650px", marginRight: "auto", marginLeft: "0", marginBottom: "4rem", }}>
<h3 style={{fontSize: "2rem", marginBottom: "1.5rem", color: "#0f172a", paddingTop: "2rem", borderTop: "1px solid #e2e8f0", }} className="anim-fade-up">Så här går relining till – Steg för Steg</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2.5rem", }} className="anim-fade-up">För att säkerställa högsta kvalitet följer vi på NordX Relining alltid branschstandard. Vår arbetsprocess är noggrann, effektiv och helt transparent – från första inspektion till färdigställd dokumentation.</p>
                
                <div className="process-steps-container premium-steps" style={{display: "flex", flexDirection: "column", gap: "1.5rem", }}>
                    {/* Steg 1 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 1</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Rörinspektion &amp; Förstudie</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Arbetet inleds med en noggrann rörinspektion. Vi går in i avloppssystemet med avancerade specialkameror för att bedöma rörens kondition, upptäcka eventuella sprickor och säkerställa att relining är en lämplig och långsiktigt hållbar lösning för er fastighet.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Steg 2 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 2</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Etablering &amp; Tillfälligt Avlopp</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Innan det praktiska arbetet drar igång etablerar vi oss på platsen och skyddstäcker ytorna. För att ni ska kunna bo kvar under renoveringen och få en så smidig vardag som möjligt stänger vi av vattnet och ordnar vid behov med tillfälligt vatten och tillfälliga avlopp, som exempelvis en torrtoalett (kvarboendetoalett).</p>
                            </div>
                        </div>
                    </div>

                    {/* Steg 3 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 3</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Mekanisk Rengöring &amp; Spolning</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Innan själva infodringen kan påbörjas måste insidan av de gamla rören bli fullständigt ren. Vi använder mekanisk rensning och kraftfull högtrycksspolning för att fräsa bort all rost, kalk, matfett och avlagringar. Rören görs helt plåtrena för att det nya materialet ska fästa perfekt.</p>
                            </div>
                        </div>
                    </div>

                    {/* Steg 4 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 4</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Infodring (Strumpmetoden)</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Detta är reliningens centrala skede. En flexibel "strumpa" (liner) impregnerad med specialframtagen härdplast skjuts eller vrängs in i det gamla röret, ofta med hjälp av tryckluft. Strumpan vecklas ut och pressas med stor kraft mot de gamla rörväggarna så att den formar sig exakt efter rörsystemet.</p>
                            </div>
                        </div>
                    </div>

                    {/* Steg 5 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 5</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Härdning &amp; Slutkontroll</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Plasten får därefter härda (ofta med hjälp av varmvatten, ånga eller UV-ljus) och bildar inom kort ett helt nytt, stenhårt och skarvfritt rör inuti det gamla. Arbetet avslutas med en mycket noggrann slutkontroll och ny kamerafilmning. Ni får självklart en komplett dokumentation och filmrapport över slutresultatet.</p>
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
            <style dangerouslySetInnerHTML={{ __html: "@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.8rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { padding: 14px 10px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: nowrap !important; font-size: 1.15rem !important; } }" }} /><h2 style={{fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: "800", marginBottom: "1rem", color: "#ffffff", lineHeight: "1.2", whiteSpace: "nowrap", }} className="cta-heading anim-mask-text"><span className="anim-mask-inner">Säkra upp fastighetens rör för framtiden</span></h2>
            <p style={{fontSize: "1.15rem", lineHeight: "1.6", marginBottom: "2.5rem", opacity: "0.9", }} className="anim-fade-up">Genom att renovera rören med modern relining undviker ni dyra vattenskador och förlänger rörsystemets livslängd med över 50 år. Låt våra certifierade tekniker ge era stammar nytt liv.</p>
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
