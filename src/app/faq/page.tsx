import React from "react";
import FrontendLayout from "@/components/FrontendLayout";
import FAQListClient from "@/components/public/FAQListClient";
import { getPublicFAQs } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const faqs = await getPublicFAQs(); console.log('FAQS FETCHED:', faqs);
  
  return (
    <FrontendLayout>
      <section className="swoosh-hero" style={{ backgroundColor: "#faf8f5", padding: "160px 0 100px 0", overflow: "hidden" }}>
          <div className="container" style={{ maxWidth: "1400px", width: "95%", margin: "0 auto", padding: "0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="hero-grid">
                  
                  {/* Left: White Card */}
                  <div style={{ background: "#ffffff", borderRadius: "32px", padding: "4rem 3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.03)", zIndex: 2, position: "relative" }} className="anim-fade-left">
                      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "#0b0b0b", lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
                          Vanliga Frågor (FAQ)
                      </h1>
                      <p style={{ fontSize: "1.25rem", color: "#475569", lineHeight: 1.6, marginBottom: "2.5rem" }}>
                          Här hittar du svar på de vanligaste frågorna kring våra tjänster. Filtrera på relining, stamspolning eller rörinspektion för att snabbt hitta den tekniska rådgivning du söker.
                      </p>
                  </div>

                  {/* Right: Featured Project inside Rectangular Pipe Frame */}
                  <div className="pipe-popup-wrapper anim-fade-right" style={{ position: "relative", width: "100%", maxWidth: "600px", margin: "0 auto", transform: "none", opacity: 1, filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.12))", zIndex: 2 }}>
                      
                      {/* Rör-ram */}
                      <div className="p-pipe p-top">
                          <div className="p-muff" style={{ left: "15%" }}></div>
                          <div className="p-muff" style={{ right: "15%" }}></div>
                      </div>
                      <div className="p-pipe p-bottom">
                          <div className="p-muff" style={{ left: "50%", transform: "translateY(-50%) translateX(-50%)" }}></div>
                      </div>
                      <div className="p-pipe p-left">
                          <div className="p-muff-v" style={{ top: "25%" }}></div>
                      </div>
                      <div className="p-pipe p-right">
                          <div className="p-muff-v" style={{ top: "75%" }}></div>
                      </div>
                      
                      <div className="p-corner p-tl"></div>
                      <div className="p-corner p-tr"></div>
                      <div className="p-corner p-bl"></div>
                      <div className="p-corner p-br"></div>

                      {/* Innehåll */}
                      <div className="featured-project anim-scale-down-container" style={{ position: "relative", zIndex: 10, margin: "0", width: "100%", height: "100%", minHeight: "450px", borderRadius: "0", boxShadow: "none", display: "block" }}>
                          <img src="/nordxrelining_relining.jpeg" alt="FAQ Kundsupport" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} />
                          <div className="featured-project-overlay" style={{ zIndex: 3 }}>
                              <h2 className="anim-mask-text"><span className="anim-mask-inner">Hittar du inte det du söker?</span></h2>
                              <p>Tveka inte att kontakta oss direkt om du har en specifik fråga gällande din fastighets rörsystem.</p>
                              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                                  <a href="/kontakt" className="featured-project-btn" style={{ textDecoration: "none" }}>Ställ en fråga</a>
                                  <a href="tel:+46703185110" className="featured-project-btn" style={{ textDecoration: "none" }}>Ring oss</a>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
              @media (max-width: 900px) {
                  .hero-grid {
                      grid-template-columns: 1fr !important;
                      gap: 4.5rem !important;
                  }
                  .swoosh-hero {
                      margin-top: -85px !important;
                      padding: 115px 0 60px 0 !important;
                  }
              }
          `}} />
      </section>

      <section className="service-page-content" id="faq-content" style={{ padding: "100px 0", background: "#ffffff", position: "relative", overflow: "hidden" }}>
        <div className="container layout-wrapper" style={{ maxWidth: "1400px", width: "95%", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div className="projects-section" style={{ padding: "0", width: "100%" }}>
                <FAQListClient faqs={faqs} />
            </div>
        </div>
      </section>
    </FrontendLayout>
  );
}
