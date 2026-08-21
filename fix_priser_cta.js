const fs = require('fs');
let c = fs.readFileSync('src/app/priser/page.tsx', 'utf8');

const regex = /<section className="nordx-landing-cta bottom-cta-section w-full"[\s\S]*?<\/section>/;

const replacement = `<section className="bottom-service-cta" style={{background: "#0284c7", color: "#ffffff", padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden", marginTop: "0", width: "100vw", marginLeft: "calc(-50vw + 50%)", boxSizing: "border-box", zIndex: "2", }}>
        <style dangerouslySetInnerHTML={{ __html: "\\n            .bottom-service-cta h2, .bottom-service-cta p {\\n                text-transform: none !important;\\n            }\\n            .bottom-service-cta p {\\n                font-weight: 400 !important;\\n            }\\n            .bottom-service-cta .cta-btn-header-match {\\n                background: #ffffff !important;\\n                color: #000000 !important;\\n                border: 1px solid #ffffff !important;\\n                border-radius: 6px !important;\\n                padding: 0.75rem 1.75rem !important;\\n                font-weight: 600 !important;\\n                font-size: 1rem !important;\\n                transition: all 0.3s ease !important;\\n                text-decoration: none;\\n                display: inline-block;\\n                text-transform: none !important;\\n                box-shadow: none !important;\\n                transform: none !important;\\n            }\\n            .bottom-service-cta .cta-btn-header-match:hover {\\n                background: #ffffff !important;\\n                color: #000000 !important;\\n                border: 1px solid #ffffff !important;\\n                box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;\\n                transform: translateY(-4px) !important;\\n            }\\n            .bottom-service-cta:hover {\\n                transform: none !important;\\n                box-shadow: none !important;\\n                background: #0284c7 !important;\\n            }\\n        " }} />
        {/* Dekoration for high-end kansla */}
        <div style={{position: "absolute", top: "-50%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", pointerEvents: "none", }}></div>
        <div style={{position: "absolute", bottom: "-50%", right: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", pointerEvents: "none", }}></div>
        
        <div className="container" style={{maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: "2", }}>
            <style dangerouslySetInnerHTML={{ __html: "@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.8rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { padding: 14px 10px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: nowrap !important; font-size: 1.15rem !important; } }" }} /><h2 style={{fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: "800", marginBottom: "1rem", color: "#ffffff", lineHeight: "1.2", whiteSpace: "nowrap", }} className="cta-heading anim-mask-text"><span className="anim-mask-inner">Få en exakt prisuppgift för er fastighet</span></h2>
            <p style={{fontSize: "1.15rem", lineHeight: "1.6", marginBottom: "2.5rem", opacity: "0.9", }} className="anim-fade-up">Kontakta oss för en kostnadsfri konsultation och offert skräddarsydd efter era specifika behov och förutsättningar.</p>
            <div className="cta-buttons" style={{display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "nowrap", alignItems: "center", }}>
                <a href="/kontakt" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Kontakta oss</a>
                <a href="tel:+46703185110" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Ring oss</a>
            </div>
        </div>
    </section>`;

c = c.replace(regex, replacement);
fs.writeFileSync('src/app/priser/page.tsx', c);
