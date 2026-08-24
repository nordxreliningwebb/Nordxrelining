import React from "react";
import FrontendLayout from "@/components/FrontendLayout";
import CampaignPopupClient from "@/components/public/CampaignPopupClient";
import FAQAccordionClient from "@/components/public/FAQAccordionClient";
import Preloader from "@/components/public/Preloader";
import HomeClientLogic from "@/components/public/HomeClientLogic";
import ProjectSliderLogic from "@/components/public/ProjectSliderLogic";
import { getActiveCampaign, getPublicFAQs } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const campaigns = await getActiveCampaign();
  const faqs = await getPublicFAQs();
  const homeFaqs = faqs.slice(0, 5);

  let recentProjects: any[] = [];
  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(4);
    if (data) recentProjects = data;
  } catch (err) {
    console.warn("Could not fetch projects for homepage:", err);
  }

  const sliderProjects = [];
  for (let i = 0; i < 4; i++) {
    if (i < recentProjects.length) {
      sliderProjects.push({ ...recentProjects[i], isPlaceholder: false });
    } else {
      sliderProjects.push({
        id: `placeholder-${i}`,
        isPlaceholder: true,
        title: "Information uppdateras snart",
        excerpt: "Här kommer vi inom kort att presentera fler spännande projekt. Håll utkik för framtida uppdateringar från oss på NordX Relining.",
      });
    }
  }


  return (
    <FrontendLayout>
      <Preloader />
      <HomeClientLogic />

      <main id="main-content">
        {/* HERO SEKTION */}
        <section id="hero" className="full-hero" aria-label="Välkommen till NordX Relining">
            <h1 className="sr-only anim-mask-text"><span className="anim-mask-inner">NordX Relining – Experter på Stamspolning och Relining</span></h1>
            
            <video id="hero-video" src="nordxrelining.mp4" className="hero-bg-media" autoPlay loop muted playsInline></video>
            <div className="hero-overlay"></div>
            
            <div className="hero-content">
                <div className="hero-text-column">
                    <div className="hero-text-wrapper">
                        <h2 className="hero-title anim-mask-text"><span className="anim-mask-inner">Framtidssäkra era rör<br />utan stora ingrepp</span></h2>
                        <p className="hero-text anim-fade-up">Trygga och hållbara rörsystem för framtiden. Med över 10 års erfarenhet som VVS-tekniker utför vi stamspolning, rörinspektion och relining med högsta tekniska precision.<br />Vi arbetar uteslutande med branschledande produkter och erbjuder alltid 20 års garanti på vårt RISE P-märkta material.</p>
                    </div>
                    <div className="hero-action-group">
                                                <div className="hero-buttons-container anim-fade-up" style={{ display: "flex", gap: "15px", flexWrap: "wrap" }} data-anim-delay="300">
                            <a href="/kontakt" className="btn-hero-solid" aria-label="Begär offert från oss">
                                Kontakta oss
                            </a>
                            <a href="/#tjanster" className="btn-hero-outline" aria-label="Läs mer om våra tjänster">
                                Våra tjänster
                            </a>
                        </div>
                        
                        {/* TRUST BADGE */}
                        <div className="hero-trust-badge anim-fade-up" data-anim-delay="450">
                            <div className="stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="anim-fade-up"><strong>4.9/5</strong> i snittbetyg på Google</p>
                        </div>
                    </div>
                </div>
                
                {/* NEW FLOATING CTA BOX (RIGHT ALIGNED) */}
                <div className="hero-cta-box hide-on-mobile anim-fade-up" data-anim-delay="600">
                    <div className="cta-box-text-wrapper">
                        <div className="cta-box-header">
                            <span className="pulse-dot"></span>
                            <span className="cta-box-badge">Akut Jour</span>
                        </div>
                        <h3 className="anim-fade-up">Akut stopp i avloppet?</h3>
                        <p className="anim-fade-up">Få svar direkt av våra jourtekniker. Vi rycker ut dygnet runt i hela länet.</p>
                    </div>
                    <a href="tel:0703185110" className="btn-cta-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        070 - 318 51 10
                    </a>
                </div>
            </div>

            {/* Pausknapp nere i högra hörnet för framtida video */}
            <button id="video-control-btn" className="video-control-btn" aria-label="Pausa video">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            </button>

            {/* SCROLL INDICATOR */}
            <div className="scroll-indicator hide-on-mobile">
                <div className="mouse-icon">
                    <div className="mouse-wheel"></div>
                </div>
                <span>SCROLLA NER</span>
            </div>


        </section>

    {/* BOTTOM TO TOP ANNOUNCEMENT BAR (HIDDEN FOR DEMO) */}
    <div className="top-announcement-bar hide-on-desktop hide-on-mobile" aria-label="Akut Jour" style={{ display: "none" }}>
        <div className="top-bar-container">
            <span className="pulse-dot"></span>
            <span className="top-bar-text">Akut stopp i avloppet? Vi rycker ut dygnet runt.</span>
            <a href="tel:+46703185110" className="top-bar-link">Ring vår jour: 070-318 51 10</a>
        </div>
    </div>

        {/* INTRODUKTION SEKTION */}
        <section id="introduktion" className="intro-section" aria-labelledby="intro-heading">
            <div className="container intro-container">
                <div className="intro-image-wrapper anim-scale-down-container">
                    {/* Bild på servicebil, byt till egen bild vid behov */}
                    <img src="nordxrelining.jpeg" alt="NordX Relining arbetsbil på uppdrag" className="intro-image anim-scale-down" width="800" height="600" loading="lazy" />
                </div>
                <div className="intro-content">
                    <h2 id="intro-heading" className="intro-title anim-mask-text"><span className="anim-mask-inner">Välkommen till NordX Relining</span></h2>
                    <div className="intro-divider"></div>
                    <p className="intro-text anim-fade-up">
                        Vi på NordX Relining är det personliga &amp; engagerade reliningföretaget. Vi har över +10 års erfarenhet inom relining och är utbildade inom VVS vilket ger oss ett unikt perspektiv på ditt rörsystem. Vår personal är certifierade inom Heta Arbeten samt Epoxibehandlingar.
                    </p>
                    <p className="intro-text anim-fade-up">
                        Vi vill att ni som kund ska känna er trygga med att anlita oss, vilket hör samman till vår filosofi att alltid ge vår ärliga bedömning av era rörledningar och fackmannamässiga rekommendationer kring vilken åtgärd som behöver vidtas.
                    </p>
                </div>
            </div>
            
            {/* Vatten-våg divider mot nästa sektion (Moved to services-section) */}
        </section>

        {/* TJÄNSTER SEKTION */}
        <style dangerouslySetInnerHTML={{ __html: `
            .header-cta .btn-ghost {
                background: #0284c7 !important;
                color: #ffffff !important;
                border: none !important;
            }
            .header-cta .btn-ghost:hover {
                background: #0369a1 !important;
                transform: translateY(-2px);
            }
        ` }} />
        <section id="tjanster" className="services-section" aria-labelledby="services-heading" style={{ paddingBottom: "12rem" }}>
            <div className="intro-waves-container">
                <svg className="intro-wave intro-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
                <svg className="intro-wave intro-wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
                <svg className="intro-wave intro-wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
            </div>
            <div className="container">
                <header className="section-header">
                    <h2 id="services-heading" className="section-title" style={{ textTransform: "none" }}>Våra tjänster</h2>
                    <p className="section-subtitle">Skräddarsydda lösningar för fastighetsägare och bostadsrättsföreningar.</p>
                </header>
                
                <div className="services-grid anim-stagger-parent">
                    <article className="service-card water-fill-card wave-1 anim-stagger-child">
                        <div className="water-fill-container">
                            <svg className="water-fill-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                            <svg className="water-fill-wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                            <svg className="water-fill-wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                        </div>
                        <div className="water-fill-content">
                            <h3 className="service-title">Rörinspektion</h3>
                            <p className="service-desc" style={{ flexGrow: "1" }}>Med avancerad kamerateknik inspekterar och dokumenterar vi rörens skick. Upptäck sprickor och problem innan de blir dyra.</p>
                            <a href="/rorinspektion" className="read-more" style={{ textDecoration: "underline", marginTop: "1rem", marginBottom: "1.5rem", fontWeight: "600", fontSize: "0.95rem" }}>
                                Läs mer om rörinspektion
                                <span style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", zIndex: "1" }}></span>
                            </a>
                            <a href="tel:0703185110" className="water-btn">Boka en rörinspektion</a>
                        </div>
                    </article>

                    <article className="service-card water-fill-card wave-2 anim-stagger-child">
                        <div className="water-fill-container">
                            <svg className="water-fill-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                            <svg className="water-fill-wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                            <svg className="water-fill-wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                        </div>
                        <div className="water-fill-content">
                            <h3 className="service-title">Stamspolning</h3>
                            <p className="service-desc" style={{ flexGrow: "1" }}>Förebyggande och akut stamspolning för att förhindra stopp och vattenskador. Vi rensar effektivt bort fett och beläggningar.</p>
                            <a href="/stamspolning" className="read-more" style={{ textDecoration: "underline", marginTop: "1rem", marginBottom: "1.5rem", fontWeight: "600", fontSize: "0.95rem" }}>
                                Läs mer om stamspolning
                                <span style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", zIndex: "1" }}></span>
                            </a>
                            <a href="tel:0703185110" className="water-btn">Boka en stamspolning</a>
                        </div>
                    </article>
                    
                    <article className="service-card water-fill-card wave-3 anim-stagger-child">
                        <div className="water-fill-container">
                            <svg className="water-fill-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                            <svg className="water-fill-wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                            <svg className="water-fill-wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none">
                                <path d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path>
                            </svg>
                        </div>
                        <div className="water-fill-content">
                            <h3 className="service-title">Relining</h3>
                            <p className="service-desc" style={{ flexGrow: "1" }}>Ett smidigt och kostnadseffektivt alternativ till stambyte. Vi skapar nya, hållbara rör i dina befintliga system utan rivningsarbete.</p>
                            <a href="/relining" className="read-more" style={{ textDecoration: "underline", marginTop: "1rem", marginBottom: "1.5rem", fontWeight: "600", fontSize: "0.95rem" }}>
                                Läs mer om relining
                                <span style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", zIndex: "1" }}></span>
                            </a>
                            <a href="/kalkylator" className="water-btn">Skapa en offertförfrågan</a>
                        </div>
                    </article>
                </div>
                
            </div>
        </section>

        {/* Premium Transition Divider (Pure CSS Photorealistic PVC Pipe) TOP */}
        <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", height: "100px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "5" }}>
            {/* Sned CSS-container för att rotera hela rörsystemet */}
            <div style={{ position: "absolute", width: "110%", height: "200%", top: "-50%", left: "-5%", transform: "rotate(-1deg)", display: "flex", alignItems: "center", background: "linear-gradient(to bottom, #ffffff 50%, #0b0b0b 50%)" }}>
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

        {/* USPs / OM OSS SEKTION */}
        <section id="om-oss" className="usp-section" aria-labelledby="usp-heading">
            <div className="container usp-container">
                <div className="usp-content">
                    <h2 id="usp-heading" className="section-title anim-fade-left" style={{ textTransform: "none" }}>Varför välja NordX Relining?</h2>
                    <p className="usp-text anim-fade-right">Att hantera rörsystem kräver precision och erfarenhet. Vi är specialister på att förlänga livslängden på fastighetens stammar med minimal störning för de boende.</p>
                    
                    <ul className="usp-list anim-stagger-parent">
                        <li className="anim-stagger-child">
                            <strong>Certifierade Experter</strong>
                            <span>Våra tekniker har över 10 års erfarenhet och VVS-bakgrund. Vi garanterar ett fackmannamässigt resultat där fullständig återställning alltid är en självklarhet.</span>
                        </li>
                        <li className="anim-stagger-child">
                            <strong>Lång Garanti</strong>
                            <span>Vi lämnar alltid 5 års garanti på utfört arbete och 20 års materialgaranti. Genom att använda produkter från samma tillverkare gäller alla garantier fullt ut.</span>
                        </li>
                        <li className="anim-stagger-child">
                            <strong>Snabb Inställelsetid</strong>
                            <span>Akut stopp i avloppet? Vi har jour dygnet runt, alla dagar i veckan, året om. Våra tekniker är snabbt på plats för att lösa problemet.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        {/* Premium Transition Divider (Pure CSS Photorealistic PVC Pipe) BOTTOM */}
        <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", height: "100px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "5" }}>
            {/* Sned CSS-container för att rotera hela rörsystemet */}
            <div style={{ position: "absolute", width: "110%", height: "200%", top: "-50%", left: "-5%", transform: "rotate(1deg)", display: "flex", alignItems: "center", background: "linear-gradient(to bottom, #0b0b0b 50%, #0284c7 50%)" }}>
                {/* Huvudröret */}
                <div style={{ width: "100%", height: "26px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", position: "relative", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                    {/* Skarvmuff 1 (Vänster) */}
                    <div style={{ position: "absolute", left: "18%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                    </div>
                    {/* Skarvmuff 2 (Mitten) */}
                    <div style={{ position: "absolute", left: "48%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                    </div>
                    {/* Skarvmuff 3 (Höger) */}
                    <div style={{ position: "absolute", right: "15%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                        <div style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                    </div>
                </div>
            </div>
        </div>

        {/* KUNDOMDÖMEN SEKTION */}
        <section id="reviews" style={{ background: "#0284c7", position: "relative", overflow: "hidden" }}>
            <div className="container layout-wrapper" style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "1rem" }}>
                        {/* 5 Stars */}
                                                <svg className="anim-star-pop" style={{ animationDelay: '0ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg className="anim-star-pop" style={{ animationDelay: '200ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg className="anim-star-pop" style={{ animationDelay: '400ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg className="anim-star-pop" style={{ animationDelay: '600ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg className="anim-star-pop" style={{ animationDelay: '800ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
</div>
                    <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", color: "#ffffff", marginBottom: "0.5rem", fontWeight: "800" }} className="anim-mask-text"><span className="anim-mask-inner">4.9 / 5 i kundnöjdhet</span></h2>
                    <p style={{ fontSize: "1.125rem", color: "#bae6fd" }} className="anim-fade-up">Baserat på över 150 verifierade kundomdömen på Google</p>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes scroll-reviews {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-1 * (4 * 380px + 4 * 2rem))); }
                    }
                    .btn-white {
                        background: #ffffff;
                        color: #0f172a;
                        padding: 16px 36px;
                        border-radius: 8px;
                        font-weight: 700;
                        font-size: 1.05rem;
                        text-transform: none !important;
                        text-decoration: none;
                        display: inline-block;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                        border: 1px solid transparent;
                    }
                    .btn-white:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                        background: #f8fafc;
                        color: #000;
                    }
                    .reviews-carousel {
                        width: 100vw;
                        margin-left: calc(-50vw + 50%);
                        overflow: hidden;
                        padding: 20px 0;
                        position: relative;
                    }
                    .reviews-track {
                        display: flex;
                        gap: 2rem;
                        width: max-content;
                        animation: scroll-reviews 35s linear infinite;
                        /* padding-left removed to avoid empty left space */
                    }
                    .reviews-track:hover {
                        animation-play-state: paused;
                    }
                    .review-card {
                        width: 380px;
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 16px;
                        padding: 32px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                        flex-shrink: 0;
                        display: flex;
                        flex-direction: column;
                        transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
                        position: relative;
                    }
                    .review-card:hover {
                        transform: translateY(-5px);
                        border-color: rgba(2, 132, 199, 0.3);
                        box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    }
                    .r-header {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        margin-bottom: 20px;
                    }
                    .r-avatar {
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        background: #f1f5f9;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        color: #0284c7;
                        font-size: 1.2rem;
                    }
                    .r-meta h4 {
                        margin: 0;
                        color: #0f172a;
                        font-size: 1.05rem;
                        font-weight: 700;
                    }
                    .r-meta span {
                        font-size: 0.85rem;
                        color: #94a3b8;
                    }
                    .r-stars {
                        display: flex;
                        gap: 4px;
                        margin-bottom: 16px;
                    }
                    .r-stars svg {
                        width: 18px;
                        height: 18px;
                        fill: #fbbf24;
                    }
                    .r-text {
                        color: #334155;
                        line-height: 1.6;
                        font-size: 0.95rem;
                        margin: 0;
                        flex-grow: 1;
                    }
                    .r-google {
                        position: absolute;
                        top: 32px;
                        right: 32px;
                        opacity: 0.8;
                    }
                    .reviews-action {
                        text-align: center;
                        margin-top: 60px;
                        margin-bottom: 80px;
                    }
                ` }} />

                <div className="reviews-carousel anim-stagger-parent">
                    <div className="reviews-track">
                        {/* ORIGINAL SET (4 CARDS) */}
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">J</div>
                                <div className="r-meta">
                                    <h4 className="">Johan Andersson</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Snabbt, proffsigt och helt utan krångel. Vi anlitade NordX Relining för relining i vår villa och de höll tidsplanen perfekt. Ett rent nöje att ha dem på plats!"</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">B</div>
                                <div className="r-meta">
                                    <h4 className="">BRF Liljan</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Som bostadsrättsförening är det viktigt med en trygg partner. Nordex relining genomförde rörinspektion och stamspolning för samtliga 45 lägenheter med bravur. Rekommenderas starkt."</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">E</div>
                                <div className="r-meta">
                                    <h4 className="">Emma Lindgren</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Grym service! De var på plats samma dag när vi hade akut stopp och löste problemet på nolltid. Mycket trevliga och tydliga killar. Toppbetyg!"</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">M</div>
                                <div className="r-meta">
                                    <h4 className="">Marcus S.</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Trodde vi skulle behöva bila upp hela källaren, men tack vare relining slapp vi det. Killarna skötte det väldigt snyggt och städade noga efter sig."</p>
                        </div>
                        
                        {/* SET 2 (DUPLICATE) */}
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">J</div>
                                <div className="r-meta">
                                    <h4 className="">Johan Andersson</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Snabbt, proffsigt och helt utan krångel. Vi anlitade NordX Relining för relining i vår villa och de höll tidsplanen perfekt. Ett rent nöje att ha dem på plats!"</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">B</div>
                                <div className="r-meta">
                                    <h4 className="">BRF Liljan</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Som bostadsrättsförening är det viktigt med en trygg partner. Nordex relining genomförde rörinspektion och stamspolning för samtliga 45 lägenheter med bravur. Rekommenderas starkt."</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">E</div>
                                <div className="r-meta">
                                    <h4 className="">Emma Lindgren</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Grym service! De var på plats samma dag när vi hade akut stopp och löste problemet på nolltid. Mycket trevliga och tydliga killar. Toppbetyg!"</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">M</div>
                                <div className="r-meta">
                                    <h4 className="">Marcus S.</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Trodde vi skulle behöva bila upp hela källaren, men tack vare relining slapp vi det. Killarna skötte det väldigt snyggt och städade noga efter sig."</p>
                        </div>
                        
                        {/* SET 3 (DUPLICATE) */}
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">J</div>
                                <div className="r-meta">
                                    <h4 className="">Johan Andersson</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Snabbt, proffsigt och helt utan krångel. Vi anlitade NordX Relining för relining i vår villa och de höll tidsplanen perfekt. Ett rent nöje att ha dem på plats!"</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">B</div>
                                <div className="r-meta">
                                    <h4 className="">BRF Liljan</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Som bostadsrättsförening är det viktigt med en trygg partner. Nordex relining genomförde rörinspektion och stamspolning för samtliga 45 lägenheter med bravur. Rekommenderas starkt."</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">E</div>
                                <div className="r-meta">
                                    <h4 className="">Emma Lindgren</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Grym service! De var på plats samma dag när vi hade akut stopp och löste problemet på nolltid. Mycket trevliga och tydliga killar. Toppbetyg!"</p>
                        </div>
                        <div className="review-card anim-stagger-child">
                            <svg className="r-google" viewBox="0 0 24 24" width="24" height="24"><path fill="#4285F4" d="M23.745 12.27c0-.825-.07-1.62-.2-2.39H12v4.51h6.63c-.28 1.48-1.12 2.73-2.39 3.56v2.96h3.86c2.26-2.08 3.58-5.14 3.58-8.64z"></path><path fill="#34A853" d="M12 24c3.31 0 6.08-1.09 8.11-2.96l-3.86-2.96c-1.1.74-2.5 1.17-4.25 1.17-3.26 0-6.03-2.2-7.02-5.15H1.03v3.05C3.07 21.2 7.21 24 12 24z"></path><path fill="#FBBC05" d="M4.98 14.1c-.25-.74-.4-1.54-.4-2.35s.15-1.61.4-2.35V6.35H1.03C.37 7.68 0 9.17 0 10.75s.37 3.07 1.03 4.4l3.95-3.05z"></path><path fill="#EA4335" d="M12 4.75c1.8 0 3.42.62 4.69 1.83l3.53-3.53C18.08 1.09 15.31 0 12 0 7.21 0 3.07 2.8 1.03 6.35l3.95 3.05c.99-2.95 3.76-5.15 7.02-5.15z"></path></svg>
                            <div className="r-header">
                                <div className="r-avatar">M</div>
                                <div className="r-meta">
                                    <h4 className="">Marcus S.</h4>
                                    <span>Verifierad kund</span>
                                </div>
                            </div>
                            <div className="r-stars">
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                                <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <p className="r-text">"Trodde vi skulle behöva bila upp hela källaren, men tack vare relining slapp vi det. Killarna skötte det väldigt snyggt och städade noga efter sig."</p>
                        </div>
                    </div>
                </div>

                <div className="reviews-action">
                    <a href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review" target="_blank" rel="noopener" className="btn-white">
                        Läs alla recensioner på Google
                    </a>
                </div>
            </div>

            {/* Vatten-våg divider mot FAQ sektion (Moved to faq section) */}
        </section>

        {/* FAQ SEKTION (Premium Blue Cards) */}
        <section id="faq" style={{ background: "#f8fafc", position: "relative" }}>
            <div className="intro-waves-container">
                <svg className="intro-wave intro-wave-1" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
                <svg className="intro-wave intro-wave-2" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
                <svg className="intro-wave intro-wave-3" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path>
                </svg>
            </div>
            <div className="container layout-wrapper" style={{ maxWidth: "900px", width: "95%", margin: "0 auto" }}>
                
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", color: "#0f172a", marginBottom: "1rem", fontWeight: "800" }} className="anim-mask-text"><span className="anim-mask-inner">Vanliga frågor &amp; svar</span></h2>
                    <p style={{ fontSize: "1.125rem", color: "#475569" }} className="anim-fade-up">Allt du behöver veta om rörinspektion, stamspolning och relining.</p>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    /* Isolate styling to prevent conflict with global style.css */
                    #show-more-faq:hover {
                        border-color: #0f172a !important;
                        color: #0f172a !important;
                    }
                    .nordx-faq-list {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    .nordx-faq-card {
                        background: #0284c7;
                        border-radius: 12px;
                        padding: 0 2rem;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }
                    .nordx-faq-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 15px 40px rgba(15, 179, 255, 0.2);
                    }
                    .nordx-faq-btn {
                        width: 100%;
                        text-align: left;
                        padding: 2rem 0;
                        background: none;
                        border: none;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        cursor: pointer;
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #ffffff;
                        font-family: 'Inter', sans-serif;
                    }
                    .nordx-faq-btn:focus {
                        outline: none;
                    }
                    .nordx-faq-icon {
                        width: 24px;
                        height: 24px;
                        transition: transform 0.3s ease;
                        flex-shrink: 0;
                        margin-left: 1rem;
                        color: #ffffff;
                    }
                    .nordx-faq-btn[aria-expanded="true"] .nordx-faq-icon {
                        transform: rotate(180deg);
                    }
                    .nordx-faq-answer {
                        max-height: 0;
                        overflow: hidden;
                        transition: max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease;
                        opacity: 0;
                    }
                    .nordx-faq-answer.open {
                        opacity: 1;
                        padding-bottom: 2rem; /* Add padding when open */
                    }
                    .nordx-faq-answer p {
                        color: rgba(255, 255, 255, 0.95);
                        line-height: 1.6;
                        font-size: 1.05rem;
                        margin: 0;
                        font-family: 'Inter', sans-serif;
                    }
                    #nordx-hidden-group {
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
                ` }} />

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

                    <FAQAccordionClient 
                        question="Måste vi flytta ut under reliningen?"
                        answer="Nej, en av de största fördelarna med relining är att ni slipper evakueras. Ni kan bo kvar i er bostad under hela avloppsrenoveringen. Arbetet är schaktfritt, vilket innebär att vi varken behöver bryta upp golv eller riva väggar, vilket minimerar buller och damm avsevärt."
                        waveClass="wave-2 anim-fade-right anim-stagger-item"
                    />

                    <FAQAccordionClient 
                        question="Kan rötter i avloppet orsaka stopp och kan det åtgärdas med relining?"
                        answer="Ja, rotinträngning är en mycket vanlig orsak till upprepade stopp i avloppet, särskilt i äldre villor. Trädrötter letar sig in genom små sprickor i rören. Vi kan effektivt fräsa bort rötterna och därefter applicera relining som tätar röret och skapar en stark, slät insida som rötterna inte kan tränga igenom igen."
                        waveClass="wave-3 anim-fade-left anim-stagger-item"
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

        {/* PROJEKT PREVIEW SEKTION */}
        <section id="recent-projects" className="projects-preview-section">
            <div className="container projects-preview-container">
                <h2 className="section-title anim-mask-text"><span className="anim-mask-inner">Några av våra projekt</span></h2>
                
                <div className="project-slider-wrapper">
                    {sliderProjects.map((project, index) => {
                        const isPlaceholder = project.isPlaceholder;
                        const coverImage = isPlaceholder ? "" : (project.images?.[0] || '/construction.jpg');
                        const date = isPlaceholder ? "" : (project.publish_date ? new Date(project.publish_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Pågående');
                        const title = project.title || project.name || 'Utan titel';
                        const desc = project.excerpt || project.description || '';
                        const slug = project.slug || '#';
                        const location = project.location || '';
                        
                        return (
                            <div key={project.id || index} className={`project-slider-card ${index === 0 ? 'active ' : ''}anim-fade-up`} data-index={index}>
                                <div className="project-slider-image" style={{ backgroundImage: coverImage ? `url('${coverImage}')` : 'none', backgroundColor: coverImage ? 'transparent' : '#f1f5f9', backgroundSize: "cover", backgroundPosition: "center" }}></div>
                                <div className="project-slider-content">
                                    {!isPlaceholder && (
                                        <div className="project-meta">
                                            <span className="project-date">{date}</span>
                                        </div>
                                    )}
                                    <h3 className="anim-fade-up">{title}</h3>
                                    {!isPlaceholder && location && (
                                        <div className="project-location">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            {location}
                                        </div>
                                    )}
                                    <p className="anim-fade-up">{desc}</p>
                                    {!isPlaceholder && (
                                        <a href={`/projekt/${slug}`} className="project-btn">Läs mer om projektet</a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="project-slider-pagination">
                    <button className="nav-btn prev-btn" aria-label="Föregående projekt">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"></path></svg>
                    </button>
                    <div className="dots">
                        <span className="dot active" data-index="0"></span>
                        <span className="dot" data-index="1"></span>
                        <span className="dot" data-index="2"></span>
                        <span className="dot" data-index="3"></span>
                    </div>
                    <button className="nav-btn next-btn" aria-label="Nästa projekt">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"></path></svg>
                    </button>
                </div>

                
                
                <div className="projects-preview-cta">
                    <a href="/projekt" className="btn-hero-solid anim-fade-up" data-anim-delay="250">Alla projekt</a>
                </div>
            </div>
        
<ProjectSliderLogic />
</section>

{/* CTA SEKTION (Ersätter Kontakt) */}
        <section id="kontakt" className="nordx-landing-cta" style={{ background: "#0284c7", color: "#ffffff", padding: "100px 20px", textAlign: "center", position: "relative", overflow: "hidden", marginTop: "0", zIndex: "2", width: "100%", display: "block" }}>
            <style dangerouslySetInnerHTML={{ __html: `
                .nordx-landing-cta h2, .nordx-landing-cta p {
                    text-transform: none !important;
                }
                .nordx-landing-cta p {
                    font-weight: 400 !important;
                }
                .nordx-landing-cta .cta-btn-header-match {
                    background: #ffffff !important;
                    color: #000000 !important;
                    border: 1px solid #ffffff !important;
                    border-radius: 6px !important;
                    padding: 0.75rem 1.75rem !important;
                    font-weight: 600 !important;
                    font-size: 1rem !important;
                    transition: all 0.3s ease !important;
                    text-decoration: none;
                    display: inline-block;
                    text-transform: none !important;
                    box-shadow: none !important;
                    transform: none !important;
                }
                .nordx-landing-cta .cta-btn-header-match:hover {
                    background: #ffffff !important;
                    color: #000000 !important;
                    border: 1px solid #ffffff !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
                    transform: translateY(-4px) !important;
                }
            ` }} />
            {/* Dekoration för high-end känsla */}
            <div style={{ position: "absolute", top: "-50%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", pointerEvents: "none" }}></div>
            <div style={{ position: "absolute", bottom: "-50%", right: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", pointerEvents: "none" }}></div>
            
            <div className="container" style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: "2" }}>
                <style dangerouslySetInnerHTML={{ __html: `@media (max-width: 768px) { .cta-heading { white-space: normal !important; } }` }} /><h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: "800", marginBottom: "1rem", color: "#ffffff", lineHeight: "1.2", whiteSpace: "nowrap" }} className="cta-heading anim-mask-text"><span className="anim-mask-inner">Redo för ett säkrare rörsystem?</span></h2>
                <p style={{ fontSize: "1.15rem", lineHeight: "1.6", marginBottom: "2.5rem", opacity: "0.9" }} className="anim-fade-up">Hör av er till oss idag så tar vi ett förutsättningslöst möte om er fastighet.</p>
                <div className="cta-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                    <a href="/kontakt" className="cta-btn-header-match anim-fade-up" data-anim-delay="250"><span className="desktop-text">Få en kostnadsfri offert</span><span className="mobile-text">Kontakta oss</span></a>
                    <a href="tel:+46703185110" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Ring oss</a>
                </div>
            </div>
        </section>
    </main>

    
      <CampaignPopupClient campaigns={campaigns} />
    </FrontendLayout>
  );
}
