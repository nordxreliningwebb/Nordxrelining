import React from 'react';
import { Metadata } from 'next';
import FrontendLayout from "@/components/FrontendLayout";
import RorinspektionClientLogic from "./RorinspektionClientLogic";

export const metadata: Metadata = {
  title: "Professionell rörinspektion och filmning av avlopp | NordX Relining",
  description: "Upptäck fel i rören innan de orsakar vattenskador. Vi utför noggrann rörinspektion och filmning med avancerad kamerateknik. Få protokoll och rådgivning!",
};

export default function Page() {
  return (
    <FrontendLayout>
      <style dangerouslySetInnerHTML={{ __html: "\r\n        /* Specific overrides for stamspolning landing page */\r\n        #main-header .nav-links a {\r\n            color: #111111 !important;\r\n        }\r\n        #main-header .nav-links a:hover {\r\n            color: var(--primary-color) !important;\r\n        }\r\n        #main-header #logo-img {\r\n            filter: none !important;\r\n            content: url('logo.png') !important;\r\n        }\r\n        #main-header .menu-toggle span {\r\n            background-color: #111111 !important;\r\n        }\r\n    " }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "\r\n    {\r\n        \"@context\": \"https://schema.org\",\r\n        \"@type\": \"Plumber\",\r\n        \"name\": \"NordX Relining\",\r\n        \"url\": \"https://www.nordxrelining.se\",\r\n        \"logo\": \"https://www.nordxrelining.se/logo.png\",\r\n        \"image\": \"https://www.nordxrelining.se/vvs_hero.png\",\r\n        \"description\": \"Professionell stamspolning, relining och rörinspektioner med lång garanti och certifierade experter.\",\r\n        \"address\": {\r\n            \"@type\": \"PostalAddress\",\r\n            \"streetAddress\": \"Hemvärnsgatan 8\",\r\n            \"postalCode\": \"171 54\",\r\n            \"addressLocality\": \"Solna\",\r\n            \"addressCountry\": \"SE\"\r\n        },\r\n        \"telephone\": \"+46727222232\",\r\n        \"email\": \"info@nordxrelining.se\",\r\n        \"areaServed\": {\r\n            \"@type\": \"Country\",\r\n            \"name\": \"Sweden\"\r\n        },\r\n        \"hasOfferCatalog\": {\r\n            \"@type\": \"OfferCatalog\",\r\n            \"name\": \"VVS-Tjänster\",\r\n            \"itemListElement\": [\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Stamspolning\"\r\n                    }\r\n                },\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Relining\"\r\n                    }\r\n                },\r\n                {\r\n                    \"@type\": \"Offer\",\r\n                    \"itemOffered\": {\r\n                        \"@type\": \"Service\",\r\n                        \"name\": \"Rörinspektion\"\r\n                    }\r\n                }\r\n            ]\r\n        }\r\n    }\r\n    " }} />
      <RorinspektionClientLogic />
      <main id="main-content">
        

    
    <section className="swoosh-hero" style={{backgroundColor: "#faf8f5", padding: "160px 0 100px 0", overflow: "hidden", }}>
        <div className="container" style={{maxWidth: "1400px", width: "95%", margin: "0 auto", padding: "0", }}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", }}>
                
                {/* Left: White Card */}
                <div style={{background: "#ffffff", borderRadius: "32px", padding: "4rem 3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.03)", zIndex: "2", position: "relative", }} className="anim-fade-left">
                    <h1 style={{fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: "800", color: "#0f172a", lineHeight: "1.1", marginBottom: "1.5rem", letterSpacing: "-0.02em", }} className=""><span className="">
                        Rörinspektion – Få stenkoll på dina rör innan problemen växer
                    </span></h1>
                    <p style={{fontSize: "1.25rem", color: "#475569", lineHeight: "1.6", marginBottom: "2.5rem", }} className="">
                        Undvik dyra vattenskador och återkommande stopp. Med avancerad kamerateknik filmar vi dina rör från insidan för att upptäcka sprickor, rötter och andra fel innan de orsakar stora problem.
                    </p>
                    <a href="tel:0727222232" className="btn btn-primary" style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", borderRadius: "8px", padding: "1rem 2rem", background: "#0284c7", border: "none", whiteSpace: "nowrap", }}>
                        Ring oss
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>

                {/* Right: Masked Image with Photorealistic Pipe Frame */}
                <div style={{position: "relative", width: "100%", maxWidth: "600px", aspectRatio: "1/1", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "50%", }} className="anim-fade-right" data-anim-delay="200">
                    {/* The actual photo (Rörinspektion) fills the entire circle */}
                    <img src="r%C3%B6rinspektion.jpeg" alt="Professionell rörinspektion av NordX Relining" style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: "1", }} className="" />
                    
                    {/* The photorealistic pipe frame overlay (Gamla röret), mix-blend-mode ligger kvar på z-index 2 */}
                    <img src="pipe_frame.png" alt="Rörram" style={{position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: "2", mixBlendMode: "multiply", pointerEvents: "none", transform: "scale(1.25)", }} className="" />

                    {/* Ingen blå relining-ring behövs för rörinspektion, bara fotot inuti det gamla röret */}
                </div>

            </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: "\r\n            @media (max-width: 900px) {\r\n                .swoosh-hero > .container > div {\r\n                    grid-template-columns: 1fr !important;\r\n                    gap: 4.5rem !important;\r\n                }\r\n                .swoosh-hero {\r\n                    margin-top: -85px !important;\r\n                        padding: 115px 0 60px 0 !important;\r\n                }\r\n            }\r\n        " }} />
    </section>
    
    


<section className="service-page-content" id="stamspolning-content" style={{padding: "100px 0", background: "#ffffff", position: "relative", overflow: "hidden", }}>
    
    {/* SVG OVERLAY FOR DYNAMIC PIPE */}
    <svg id="dynamic-pipe-canvas" style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "1", }}>
        <defs id="dynamic-pipe-defs">
            {/* Glow effect for LED lights */}
            <filter id="led-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur"></feGaussianBlur>
                <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
            </filter>
            {/* Camera Light Cone Gradient */}
            <linearGradient id="light-cone-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85"></stop>
                <stop offset="40%" stopColor="#bae6fd" stopOpacity="0.3"></stop>
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"></stop>
            </linearGradient>
        </defs>

        <style dangerouslySetInnerHTML={{ __html: "\r\n            .camera-body { fill: #1e293b; }\r\n            .camera-head { fill: #334155; }\r\n            .camera-lens { fill: #0f172a; stroke: #38bdf8; stroke-width: 2; }\r\n            .camera-led { fill: #ffffff; filter: url(#led-glow); }\r\n            .camera-cable { stroke: #f97316; stroke-width: 16; stroke-linecap: round; }\r\n            .cable-stripe { stroke: #eab308; stroke-width: 4; stroke-dasharray: 20 20; }\r\n            @media (max-width: 768px) {\r\n                .camera-cable { stroke-width: 5; }\r\n                .cable-stripe { stroke-width: 1.5; stroke-dasharray: 8 8; }\r\n            }\r\n        " }} />

        {/* The dynamically drawn pipe path */}
        <g id="dynamic-pipe-group"></g>

        {/* CSS för att dölja stamspolnings-element (den svarta slangen) */}
        <style dangerouslySetInnerHTML={{ __html: "\r\n            #dynamic-pipe-group rect[fill=\"#111827\"],\r\n            #dynamic-pipe-group rect[fill=\"#475569\"],\r\n            #dynamic-pipe-group rect[fill=\"#ffffff\"][opacity=\"0.4\"] {\r\n                display: none !important;\r\n            }\r\n        " }} />

                {/* Rörålen (kabeln) som följer efter kameran */}
        <g id="camera-cable-group">
            <path id="camera-cable-path" d="" fill="none" className="camera-cable"></path>
            {/* Gul varningsrand längs kabeln */}
            <path id="camera-cable-stripe" d="" fill="none" className="cable-stripe"></path>
        </g>
        
        {/* Själva kamerahuvudet */}
        <g id="dynamic-nozzle" style={{opacity: "0", transformOrigin: "100px 0", }}>
             {/* Ljuskäglan framför kameran */}
             <path d="M 100 45 L 40 400 Q 100 420 160 400 Z" fill="url(#light-cone-gradient)"></path>
             
             {/* Kabelanslutning (nacke) */}
             <rect x="92" y="-30" width="16" height="40" className="camera-body"></rect>
             {/* Fjäder (för att runda böjar) */}
             <path d="M 90 -20 Q 85 -10 110 0 T 90 15" stroke="#94a3b8" strokeWidth="4" fill="none" opacity="0.8"></path>
             
             {/* Kamerakropp (rostfritt / svart plast) */}
             <rect x="80" y="10" width="40" height="25" rx="5" className="camera-body"></rect>
             <rect x="82" y="15" width="36" height="15" className="camera-head"></rect>
             
             {/* Kamera-huvud / Linsområde */}
             <path d="M 80 35 L 85 45 L 115 45 L 120 35 Z" fill="#475569"></path>
             <circle cx="100" cy="45" r="8" className="camera-lens"></circle>
             
             {/* LED-lampor runt linsen */}
             <circle cx="85" cy="42" r="3" className="camera-led"></circle>
             <circle cx="115" cy="42" r="3" className="camera-led"></circle>
             <circle cx="92" cy="48" r="2" className="camera-led"></circle>
             <circle cx="108" cy="48" r="2" className="camera-led"></circle>
        </g>
    </svg>
    
    

    <div className="container layout-wrapper" style={{maxWidth: "1400px", width: "95%", margin: "0 auto", position: "relative", zIndex: "2", }}>
        
        {/* Top Right Text Block */}
        <div className="intro-text-block" id="intro-text" style={{maxWidth: "650px", marginRight: "auto", marginLeft: "0", marginBottom: "8rem", }}>
<h2 style={{fontSize: "2.5rem", marginBottom: "1.5rem", color: "#0f172a", }} className="anim-fade-left">Vad är rörinspektion och varför är det så viktigt?</h2>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "1.5rem", }} className="anim-fade-right">En rörinspektion innebär att vi med hjälp av avancerad kamerateknik filmar och dokumenterar insidan av fastighetens rörsystem. Syftet är att ta reda på rörens exakta kondition utan att behöva göra några fysiska ingrepp. Detta är en oumbärlig tjänst oavsett om man misstänker problem, upplever återkommande stopp, eller planerar en överlåtelse av en fastighet.</p>
                
                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Förebygg dyra vattenskador</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2rem", }} className="anim-fade-right">Den absolut största nyttan med rörinspektion är möjligheten att upptäcka skador innan de leder till läckage. Sprickor, förslitningar och skarvar som glidit isär går inte att se utifrån. Genom att inspektera rören i tid kan du vidta åtgärder (som relining) och därmed undvika extremt dyra och omständliga vattenskador.</p>

                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Hitta roten till avloppsproblem</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2rem", }} className="anim-fade-right">Ibland kan ett stopp i avloppet verka vara tillfälligt, men återkommer ständigt. Med kameran ser vi direkt om det handlar om inträngande rötter, kraftiga avlagringar, felaktigt fall (så kallade "svackor") eller om något föremål fastnat nere i röret. När vi vet grundproblemet kan vi rekommendera en permanent lösning.</p>

                <h3 style={{fontSize: "1.75rem", marginBottom: "1rem", color: "#0f172a", marginTop: "2.5rem", }} className="anim-fade-up">Tryggt underlag enligt T25-standard</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "3.5rem", }} className="anim-fade-right">Vi överlämnar alltid ett officiellt inspektionsprotokoll enligt branschens T25-standard tillsammans med inspelat videomaterial. Denna dokumentation ger dig som fastighetsägare eller BRF en tydlig trygghet och ett konkret underlag när det gäller försäkringsärenden eller framtida underhållsplanering.</p>

                
        </div>
        
        {/* Bottom Left Text Block */}
        <div className="steps-text-block" id="steg-for-steg-heading" style={{maxWidth: "650px", marginRight: "auto", marginLeft: "0", marginBottom: "4rem", }}>
<h3 style={{fontSize: "2rem", marginBottom: "1.5rem", color: "#0f172a", paddingTop: "2rem", borderTop: "1px solid #e2e8f0", }} className="anim-fade-up">Så här går rörinspektionen till – Steg för Steg</h3>
                <p style={{fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "2.5rem", }} className="anim-fade-up">Vi genomför rörinspektioner enligt branschstandard (STVF) för att ge er en trygg, tydlig och helt transparent bild av ert avloppssystems skick.</p>
                
                <div className="process-steps-container premium-steps" style={{display: "flex", flexDirection: "column", gap: "1.5rem", }}>
                    {/* Steg 1 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 1</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Åtkomst &amp; Förberedelser</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Teknikern inleder med att gå igenom fastighetens ritningar och hittar lämpliga rensöppningar för att komma åt rörsystemet. Vi bedömer också om avloppet behöver spolas rent innan inspektionen.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Steg 2 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 2</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Etablering &amp; Tillfälligt Avlopp</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Kameran ser bäst i rena rör. Vid behov genomför vi en högtrycksspolning innan filmningen påbörjas för att spola bort löst smuts och fett, så att inga skador döljs under beläggningar.</p>
                            </div>
                        </div>
                    </div>

                    {/* Steg 3 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 3</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Kamerainspektion (Filmning)</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Med en avancerad rörinspektionskamera (rörål eller traktor) utrustad med stark LED-belysning och meterräknare åker vi genom rören. Teknikern följer allt live på skärmen.</p>
                            </div>
                        </div>
                    </div>

                    {/* Steg 4 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 4</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Analys &amp; Felsökning</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Under filmningen kartlägger vi rörsystemets skick. Vi identifierar exakt position för eventuella sprickor, hål, rötter, rost, felaktigt fall eller inträngande vatten.</p>
                            </div>
                        </div>
                    </div>

                    {/* Steg 5 */}
                    <div className="premium-step-card anim-fade-up" style={{position: "relative", overflow: "hidden", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "2rem", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)", transition: "all 0.3s ease", }}>
                        <div style={{display: "block", position: "relative", zIndex: "2", }}>
                            <div>
                                <div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg 5</div>
                                <h4 style={{fontSize: "1.35rem", fontWeight: "700", marginBottom: "0.5rem", color: "#0f172a", }} className="anim-fade-up">Protokoll &amp; Rådgivning</h4>
                                <p style={{lineHeight: "1.7", color: "#475569", margin: "0", fontSize: "1.05rem", }} className="anim-fade-up">Efter inspektionen sammanställer vi ett tydligt inspektionsprotokoll och överlämnar videoinspelningen. Ni får också våra experters rekommendationer på eventuella åtgärder, som exempelvis relining eller fortsatt regelbundet underhåll.</p>
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
            <style dangerouslySetInnerHTML={{ __html: "@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.8rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { padding: 14px 10px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: nowrap !important; font-size: 1.15rem !important; } }" }} /><h2 style={{fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: "800", marginBottom: "1rem", color: "#ffffff", lineHeight: "1.2", whiteSpace: "nowrap", }} className="cta-heading anim-mask-text"><span className="anim-mask-inner">Få full kontroll över rörsystemet</span></h2>
            <p style={{fontSize: "1.15rem", lineHeight: "1.6", marginBottom: "2.5rem", opacity: "0.9", }} className="anim-fade-up">Lämna inget åt slumpen. Boka en professionell rörinspektion idag och få ett tydligt beslutsunderlag samt trygghet inför framtiden. Kontakta oss för en fri offert!</p>
            <div className="cta-buttons" style={{display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "nowrap", alignItems: "center", }}>
                <a href="/kontakt" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Kontakta oss</a>
                <a href="tel:+46727222232" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Ring oss</a>
            </div>
        </div>
    </section>

      </main>
    </FrontendLayout>
  );
}
