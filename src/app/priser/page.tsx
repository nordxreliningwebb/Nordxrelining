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

    const rawDesc = plan.description || "";
    let desc = rawDesc;
    let noticeText = "";
    if (rawDesc.includes("|||NOTICE|||")) {
      const parts = rawDesc.split("|||NOTICE|||");
      desc = parts[0];
      noticeText = parts[1] || "";
    }

    const parsePrice = (p: string) => {
      if (!p) return { main: '3495', suffix: 'kr', isRequest: false };
      if (p.toLowerCase().includes('förfrågan')) {
        return { main: p, suffix: '', isRequest: true };
      }
      const match = p.match(/^([\d\s]+)(.*)$/);
      if (match) {
        return { main: match[1].trim(), suffix: match[2].trim(), isRequest: false };
      }
      return { main: p, suffix: '', isRequest: false };
    };

    const { main, suffix, isRequest } = parsePrice(String(plan.price || ""));

    const renderNotice = (text: string) => {
      if (!text) return null;
      return (
        <div style={{
          fontSize: "0.85rem", 
          color: "rgba(255,255,255,0.9)", 
          background: "transparent", 
          border: "1px solid rgba(255,255,255,0.3)",
          padding: "12px 14px", 
          borderRadius: "8px", 
          marginBottom: "1.5rem",
          textAlign: "left",
          lineHeight: 1.4
        }}>
          {text.split(/(\*\*.*?\*\*)/g).map((part, i) => 
            part.startsWith('**') && part.endsWith('**') ? 
              <strong key={i} style={{color: "#ffffff", fontWeight: 700}}>{part.slice(2, -2)}</strong> : part
          )}
        </div>
      );
    };

    const priceMarkup = `
      <div style="display:flex; justify-content:center; align-items:baseline; flex-wrap:wrap; gap:6px;">
        <span style="font-size:${isRequest ? '2rem' : '4.5rem'}; font-weight:800; line-height:0.9; letter-spacing:-1px; white-space:${isRequest ? 'nowrap' : 'normal'};">${main}</span>
        ${suffix ? `<span style="font-size:1.1rem; font-weight:600; white-space:nowrap; opacity:0.9;">${suffix}</span>` : ''}
      </div>
    `;

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
            
            <div className="water-fill-content" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.75rem", color: "#ffffff", marginBottom: "0.75rem" }}>{plan.title || plan.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.95)", marginBottom: "1.5rem", fontSize: "0.95rem", minHeight: "70px", lineHeight: 1.4, flexGrow: 1 }} dangerouslySetInnerHTML={{ __html: desc }} />
                
                <div style={{ color: "#ffffff", marginBottom: "2.5rem", fontFamily: "'Outfit', sans-serif" }} dangerouslySetInnerHTML={{ __html: priceMarkup }} />
                
                {featuresArray && featuresArray.length > 0 && (
                    <ul style={{ listStyle: "none", padding: "0", margin: "0 0 2rem", textAlign: "left", color: "#ffffff" }}>
                        {featuresArray.map((feature: string, i: number) => (
                            <li key={i} style={{ marginBottom: "1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.95rem", lineHeight: 1.4 }}>
                                <svg style={{flexShrink: 0, marginTop: "2px"}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                                <span dangerouslySetInnerHTML={{ __html: feature }} />
                            </li>
                        ))}
                    </ul>
                )}
                
                {renderNotice(noticeText)}
                
                <a href={(plan.cta_link ? (plan.cta_link.match(/^[0-9+\s-]+$/) ? 'tel:' + plan.cta_link.replace(/\s+/g, '') : plan.cta_link) : null) || (plan.category?.toLowerCase() === "företag" || plan.category?.toLowerCase() === "fA retag" || plan.category?.toLowerCase() === "foretag" ? "/kontakt" : "tel:0727222232")} className="water-btn" style={{ marginTop: "auto" }}>{plan.cta_text || (plan.category?.toLowerCase() === "företag" || plan.category?.toLowerCase() === "fA retag" || plan.category?.toLowerCase() === "foretag" ? "KONTAKTA OSS" : "Ring nu")}</a>
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
          <div className="water-fill-content" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.75rem", color: "#ffffff", marginBottom: "0.75rem" }}>{plan.title || plan.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.95)", marginBottom: "1.5rem", fontSize: "0.95rem", minHeight: "70px", lineHeight: 1.4, flexGrow: 1 }} dangerouslySetInnerHTML={{ __html: desc }} />
              
              <div style={{ color: "#ffffff", marginBottom: "2.5rem", fontFamily: "'Outfit', sans-serif" }} dangerouslySetInnerHTML={{ __html: priceMarkup }} />
              
              {featuresArray && featuresArray.length > 0 && (
                  <ul style={{ listStyle: "none", padding: "0", margin: "0 0 2rem", textAlign: "left", color: "#ffffff" }}>
                      {featuresArray.map((feature: string, i: number) => (
                          <li key={i} style={{ marginBottom: "1rem", display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.95rem", lineHeight: 1.4 }}>
                              <svg style={{flexShrink: 0, marginTop: "2px"}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                              <span dangerouslySetInnerHTML={{ __html: feature }} />
                          </li>
                      ))}
                  </ul>
              )}
              
              {!(plan.isPopular || plan.is_popular) && plan.campaign_text && (
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", textAlign: "left", marginBottom: "2rem" }} dangerouslySetInnerHTML={{ __html: plan.campaign_text }} />
              )}
              
              {renderNotice(noticeText)}
              
              <a href={(plan.cta_link ? (plan.cta_link.match(/^[0-9+\s-]+$/) ? 'tel:' + plan.cta_link.replace(/\s+/g, '') : plan.cta_link) : null) || (plan.category?.toLowerCase() === "företag" || plan.category?.toLowerCase() === "fA retag" || plan.category?.toLowerCase() === "foretag" ? "/kontakt" : "tel:0727222232")} className="water-btn" style={{ marginTop: "auto" }}>{plan.cta_text || (plan.category?.toLowerCase() === "företag" || plan.category?.toLowerCase() === "fA retag" || plan.category?.toLowerCase() === "foretag" ? "KONTAKTA OSS" : "Ring nu")}</a>
          </div>
      </article>
    );
  };

  return (
    <FrontendLayout>
      <main id="main-content" className="w-full flex flex-col items-center overflow-hidden" style={{ backgroundColor: "#faf8f5", marginTop: "-85px", paddingTop: "85px" }}>
        <section className="pricing-section section-padding w-full" aria-label="Prispaket Privat" style={{ background: "#faf8f5", paddingTop: "8rem" }}>
    <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
            .pricing-section {
                padding-top: 94px !important;
            }
        }
    `}} />

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
                <a href="tel:+46727222232" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Ring oss</a>
            </div>
        </div>
    </section>
      </main>
    </FrontendLayout>
  );
}


