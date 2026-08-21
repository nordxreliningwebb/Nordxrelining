import React from "react";
import FrontendLayout from "@/components/FrontendLayout";
import { getPublicPricePlans } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function PriserPage() {
  const plans = await getPublicPricePlans();
  
  const privatePlans = plans.filter((p: any) => p.category?.toLowerCase() === "privatpersoner" || p.category?.toLowerCase() === "privat");
  const businessPlans = plans.filter((p: any) => p.category?.toLowerCase() === "företag" || p.category?.toLowerCase() === "foretag");

  const renderCard = (plan: any, idx: number) => {
    let featuresArray: string[] = [];

    if (Array.isArray(plan.features)) {
      featuresArray = plan.features;
    } else if (typeof plan.features === 'string') {
      try {
        const parsed = JSON.parse(plan.features);
        if (Array.isArray(parsed)) {
          featuresArray = parsed;
        } else {
          featuresArray = [plan.features];
        }
      } catch (e) {
        // If it fails to parse as JSON, treat it as a single raw string feature.
        featuresArray = [plan.features];
      }
    }

    if (plan.isPopular || plan.is_popular) {
      return (
        <article key={plan.id} className="pricing-card water-fill-card wave-2 campaign-card-highlight anim-stagger-child">
            <div style={{ position: "absolute", top: "-7px", left: "50%", transform: "translateX(-50%)", background: "#48bb78", color: "white", padding: "0.25rem 1rem", borderRadius: "0 0 10px 10px", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "1px", zIndex: 10, whiteSpace: "nowrap" }}>
                {plan.campaign_text || 'KAMPANJ 20% RABATT'}
            </div>
            <div className="water-fill-container">
                <svg className="water-fill-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path></svg>
                <svg className="water-fill-wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path></svg>
                <svg className="water-fill-wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path></svg>
            </div>
            
            <div className="water-fill-content">
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", color: "#1B263B", marginBottom: "0.5rem", marginTop: "1rem" }}>{plan.title || plan.name}</h3>
                <p style={{ color: "#64748b", marginBottom: "2rem", fontSize: "0.95rem", minHeight: "80px" }} dangerouslySetInnerHTML={{ __html: plan.description || "" }} />
                <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#1B263B", marginBottom: "2rem", fontFamily: "'Outfit', sans-serif", lineHeight: "1.2" }} dangerouslySetInnerHTML={{ __html: String(plan.price || "") }} />
                
                {featuresArray && featuresArray.length > 0 && (
                    <ul style={{ listStyle: "none", padding: "0", margin: "0 0 2rem", textAlign: "left", color: "#475569", flexGrow: 1 }}>
                        {featuresArray.map((feature: string, i: number) => (
                            <li key={i} style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#48bb78" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                                <span dangerouslySetInnerHTML={{ __html: feature }} />
                            </li>
                        ))}
                    </ul>
                )}
                <a href={plan.cta_link || (plan.category?.toLowerCase() === "företag" || plan.category?.toLowerCase() === "fA retag" || plan.category?.toLowerCase() === "foretag" ? "/kontakt" : "tel:0703185110")} className="water-btn">{plan.cta_text || (plan.category?.toLowerCase() === "företag" || plan.category?.toLowerCase() === "fA retag" || plan.category?.toLowerCase() === "foretag" ? "KONTAKTA OSS" : "Ring nu")}</a>
            </div>
        </article>
      );
    }

    return (
      <article key={plan.id} className="pricing-card water-fill-card wave-1 anim-stagger-child">
          <div className="water-fill-container">
              <svg className="water-fill-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path></svg>
              <svg className="water-fill-wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path></svg>
              <svg className="water-fill-wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path></svg>
          </div>
          <div className="water-fill-content">
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", color: "#1B263B", marginBottom: "0.5rem" }}>{plan.title || plan.name}</h3>
              <p style={{ color: "#64748b", marginBottom: "2rem", fontSize: "0.95rem", minHeight: "80px" }} dangerouslySetInnerHTML={{ __html: plan.description || "" }} />
              <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "#1B263B", marginBottom: "2rem", fontFamily: "'Outfit', sans-serif", lineHeight: "1", whiteSpace: "nowrap" }} dangerouslySetInnerHTML={{ __html: String(plan.price || "") }} />
              
              {featuresArray && featuresArray.length > 0 && (
                  <ul style={{ listStyle: "none", padding: "0", margin: "0 0 2rem", textAlign: "left", color: "#475569", flexGrow: 1 }}>
                      {featuresArray.map((feature: string, i: number) => (
                          <li key={i} style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                              <span dangerouslySetInnerHTML={{ __html: feature }} />
                          </li>
                      ))}
                  </ul>
              )}
              
              {!(plan.isPopular || plan.is_popular) && plan.campaign_text && (
                  <div style={{ fontSize: "0.85rem", color: "#64748b", textAlign: "left", marginBottom: "2rem" }} dangerouslySetInnerHTML={{ __html: plan.campaign_text }} />
              )}
              
              <a href={plan.cta_link || (plan.category?.toLowerCase() === "företag" || plan.category?.toLowerCase() === "fA retag" || plan.category?.toLowerCase() === "foretag" ? "/kontakt" : "tel:0703185110")} className="water-btn">{plan.cta_text || (plan.category?.toLowerCase() === "företag" || plan.category?.toLowerCase() === "fA retag" || plan.category?.toLowerCase() === "foretag" ? "KONTAKTA OSS" : "Ring nu")}</a>
          </div>
      </article>
    );
  };

  return (
    <FrontendLayout>
      <main id="main-content" className="w-full flex flex-col items-center overflow-hidden" style={{ backgroundColor: "#faf8f5", marginTop: "-85px", paddingTop: "85px" }}>
        <section className="pricing-section section-padding w-full" aria-label="Prispaket Privat" style={{ background: "#faf8f5", paddingTop: "8rem" }}>
            <div className="w-full flex flex-col items-center px-4 md:px-8 lg:px-12" style={{ maxWidth: "min(1400px, 94vw)", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "4rem" }} className="w-full">
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#1B263B", marginBottom: "1rem" }} className="anim-mask-text"><span className="anim-mask-inner">Priser - Privatpersoner</span></h2>
                    <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }} className="anim-fade-up">Våra fasta och transparenta priser för dig som privatkund är alltid inklusive moms. Kontakta oss för bokning eller vid akuta ärenden.</p>
                </div>
                
                <div className="pricing-grid anim-stagger-parent w-full grid grid-cols-1 md:grid-cols-3 gap-12 justify-center" style={{ maxWidth: "min(1400px, 94vw)", width: "100%", margin: "0 auto" }}>
                    {privatePlans.map((plan: any, idx: number) => renderCard(plan, idx))}
                    {privatePlans.length === 0 && (
                        <div className="col-span-full text-center py-8 w-full">
                            <p style={{ color: "#64748b" }}>Inga priser publicerade för privatpersoner ännu.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Scroll Indicator Section */}
        <section className="scroll-indicator-section w-full" style={{ padding: "4rem 0 2rem", textAlign: "center", background: "#ffffff" }}>
            <div className="w-full flex flex-col items-center px-4" style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <p style={{ fontSize: "1.2rem", fontWeight: 600, color: "#475569", marginBottom: "1.5rem", fontFamily: "'Inter', sans-serif" }} className="anim-fade-up">Scrolla ner för företagspriser</p>
                <div className="bounce-arrow" style={{ fontSize: "2rem", color: "#0284c7", margin: "0 auto", width: "fit-content", animation: "bounce 2s infinite" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"></path></svg>
                </div>
            </div>
            <style>{`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-15px); }
                    60% { transform: translateY(-7px); }
                }
            `}</style>
        </section>

        <section className="pricing-section section-padding w-full" aria-label="Prispaket företag" style={{ background: "#ffffff" }}>
            <div className="w-full flex flex-col items-center px-4 md:px-8 lg:px-12" style={{ maxWidth: "min(1400px, 94vw)", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "4rem" }} className="w-full">
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#1B263B", marginBottom: "1rem" }} className="anim-mask-text"><span className="anim-mask-inner">Priser - Företag</span></h2>
                    <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }} className="anim-fade-up">Våra fasta och transparenta priser för företag och BRF är alltid exklusive moms. Kontakta oss för en offert eller vid akuta ärenden.</p>
                </div>
                <div className="pricing-grid anim-stagger-parent w-full grid grid-cols-1 md:grid-cols-3 gap-12 justify-center" style={{ maxWidth: "min(1400px, 94vw)", width: "100%", margin: "0 auto" }}>
                    {businessPlans.map((plan: any, idx: number) => renderCard(plan, idx))}
                    {businessPlans.length === 0 && (
                        <div className="col-span-full text-center py-8 w-full">
                            <p style={{ color: "#64748b" }}>Inga priser publicerade för företag ännu.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="bottom-service-cta" style={{background: "#0284c7", color: "#ffffff", padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden", marginTop: "0", width: "100vw", marginLeft: "calc(-50vw + 50%)", boxSizing: "border-box", zIndex: "2", }}>
        <style dangerouslySetInnerHTML={{ __html: "\n            .bottom-service-cta h2, .bottom-service-cta p {\n                text-transform: none !important;\n            }\n            .bottom-service-cta p {\n                font-weight: 400 !important;\n            }\n            .bottom-service-cta .cta-btn-header-match {\n                background: #ffffff !important;\n                color: #000000 !important;\n                border: 1px solid #ffffff !important;\n                border-radius: 6px !important;\n                padding: 0.75rem 1.75rem !important;\n                font-weight: 600 !important;\n                font-size: 1rem !important;\n                transition: all 0.3s ease !important;\n                text-decoration: none;\n                display: inline-block;\n                text-transform: none !important;\n                box-shadow: none !important;\n                transform: none !important;\n            }\n            .bottom-service-cta .cta-btn-header-match:hover {\n                background: #ffffff !important;\n                color: #000000 !important;\n                border: 1px solid #ffffff !important;\n                box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;\n                transform: translateY(-4px) !important;\n            }\n            .bottom-service-cta:hover {\n                transform: none !important;\n                box-shadow: none !important;\n                background: #0284c7 !important;\n            }\n        " }} />
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
    </section>
      </main>
    </FrontendLayout>
  );
}


