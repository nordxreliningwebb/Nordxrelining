import { Metadata } from 'next';
import { supabaseAdmin } from "@/lib/supabase-server";
import FrontendLayout from "@/components/FrontendLayout";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Om oss | NordX Relining',
  description: 'Lär känna teamet bakom NordX Relining – Sveriges tryggaste partner inom relining och rörinspektion.',
};

export default async function OmOssPage() {
  // Hämta aktiva medarbetare
  const { data: employees } = await supabaseAdmin
    .from("employees")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("createdAt", { ascending: true });

  return (
    <FrontendLayout>
      <main>

    <section className="swoosh-hero" style={{ backgroundColor: "#faf8f5", padding: "160px 0 100px 0", overflow: "hidden" }}>
        <div className="container" style={{ maxWidth: "1400px", width: "95%", margin: "0 auto", padding: 0 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
                
                {/*  Left: White Card  */}
                <div style={{ background: "#ffffff", borderRadius: "32px", padding: "4rem 3rem", boxShadow: "0 20px 40px rgba(0,0,0,0.03)", zIndex: 2, position: "relative" }} className="anim-fade-left">
                    <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, marginBottom: "1.5rem", letterSpacing: "-0.02em" }} className=""><span className="">
                        Sveriges tryggaste partner inom relining och rörinspektion
                    </span></h1>
                    <p style={{ fontSize: "1.25rem", color: "#475569", lineHeight: 1.6, marginBottom: "2.5rem" }} className="">
                        NordX Relining drivs av passionen för teknisk precision och hållbara fastigheter. Vi finns här för att förlänga livet på era rörsystem – med minimal störning och maximal kvalitet.
                    </p>
                    <a href="/kontakt" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", borderRadius: "8px", padding: "1rem 2rem", background: "#0284c7", color: "white", border: "none", textDecoration: "none", fontWeight: 600 }}>
                        Kom i kontakt med oss
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </a>
                </div>

                {/*  Right: Masked Image (clean circle)  */}
                <div style={{ position: "relative", width: "100%", maxWidth: "600px", aspectRatio: "1/1", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "50%", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }} className="anim-fade-right" data-anim-delay="200">
                    <img src="epoxy%20relining.jpeg" alt="NordX Relining team" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} className="" />
                    {/*  Subtle inner shadow to make it feel premium  */}
                    <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", boxShadow: "inset 0 0 0 8px rgba(255,255,255,0.1), inset 0 0 20px rgba(0,0,0,0.2)", zIndex: 2, pointerEvents: "none" }}></div>
                </div>

            </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 900px) {
                .swoosh-hero > .container > div {
                    grid-template-columns: 1fr !important;
                    gap: 4.5rem !important;
                }
                .swoosh-hero {
                    margin-top: -85px !important;
                        padding: 115px 0 60px 0 !important;
                }
                .swoosh-hero img {
                    border-radius: 0 150px 0 150px !important;
                    min-height: 400px;
                }
            }
        `}} />
    </section>

    <section style={{ padding: "100px 0", background: "#ffffff", position: "relative" }}>
        <div className="container layout-wrapper" style={{ maxWidth: "1400px", width: "95%", margin: "0 auto" }}>
            
            <div style={{ textAlign: "center", marginBottom: "5rem", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
                <h2 style={{ fontSize: "2.5rem", color: "#0f172a", marginBottom: "1.5rem", fontWeight: 800 }} className="anim-mask-text"><span className="anim-mask-inner">Vår vision &amp; drivkraft</span></h2>
                <p style={{ fontSize: "1.125rem", lineHeight: 1.8, color: "#475569" }} className="anim-fade-up">Vårt mål är att vara den ledande kraften bakom Sveriges mest välmående rörsystem. Vi vilar på fundamentet av transparens, integritet och teknisk stolthet.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
                
                <div style={{ background: "#0284c7", borderRadius: "16px", padding: "2.5rem", color: "#ffffff", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                    
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }} className="anim-fade-up">Hållbarhet &amp; kvalitet</h3>
                    <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }} className="anim-fade-up">Vi levererar branschledande lösningar som står emot tidens prövningar. Genom certifierade material och rigorösa kvalitetskontroller säkerställer vi att våra rörsystem bidrar till en mer hållbar fastighetsförvaltning.</p>
                </div>

                <div style={{ background: "#0284c7", borderRadius: "16px", padding: "2.5rem", color: "#ffffff", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                    
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }} className="anim-fade-up">Trygghet &amp; arbetsmiljö</h3>
                    <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }} className="anim-fade-up">Människorna är vår främsta tillgång. Vi sätter alltid säkerheten främst och arbetar proaktivt med att skapa en trygg miljö för både våra medarbetare, beställare och de boende under hela projektets gång.</p>
                </div>

                <div style={{ background: "#0284c7", borderRadius: "16px", padding: "2.5rem", color: "#ffffff", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                    
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", marginBottom: "1rem" }} className="anim-fade-up">Innovation &amp; framtid</h3>
                    <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }} className="anim-fade-up">Genom att ständigt utvärdera nya metoder och material driver vi branschens utveckling framåt. Vi utmanar konventionella tillvägagångssätt för att erbjuda de mest resurseffektiva lösningarna på marknaden.</p>
                </div>
            </div>

        </div>
    </section>

    {/*  Premium Transition Divider (Pure CSS Photorealistic PVC Pipe)  */}
    <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", height: "100px", position: "relative", background: "linear-gradient(to bottom, #ffffff 50%, #f8fafc 50%)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
        
        {/*  Sned CSS-container för att rotera hela rörsystemet  */}
        <div style={{ position: "absolute", width: "110%", height: "100%", top: 0, left: "-5%", transform: "rotate(-1deg)", display: "flex", alignItems: "center" }}>
            
            {/*  Huvudröret  */}
            <div style={{ width: "100%", height: "26px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", position: "relative", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                
                {/*  Skarvmuff 1 (Vänster)  */}
                <div style={{ position: "absolute", left: "15%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                    {/*  Kant/fläns längst ut på muffen  */}
                    <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                </div>

                {/*  Skarvmuff 2 (Mitten)  */}
                <div style={{ position: "absolute", left: "52%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                    {/*  Kant/fläns längst ut på muffen  */}
                    <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                </div>

                {/*  Skarvmuff 3 (Höger)  */}
                <div style={{ position: "absolute", right: "12%", top: "50%", transform: "translateY(-50%)", width: "35px", height: "32px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05)" }}>
                    {/*  Kant/fläns längst ut på muffen  */}
                    <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", width: "6px", height: "36px", background: "linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%)", borderRadius: "2px", boxShadow: "-1px 0 2px rgba(0,0,0,0.1)" }}></div>
                </div>

            </div>
            
        </div>
    </div>

    <section style={{ padding: "100px 0", background: "#f8fafc", position: "relative", zIndex: 6 }}>
        <div className="container" style={{ maxWidth: "1400px", width: "95%", margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "1rem" }} className="anim-mask-text"><span className="anim-mask-inner">Möt teamet bakom NordX Relining</span></h2>
            <p style={{ fontSize: "1.125rem", color: "#475569", marginBottom: "4rem", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }} className="anim-fade-up">Vi är certifierade experter som tror på hantverksskicklighet, raka rör och god kommunikation med våra kunder.</p>

            <style dangerouslySetInnerHTML={{__html: `@media (max-width: 768px) { .team-flex-container { flex-direction: column !important; align-items: center !important; gap: 4rem !important; } }`}} />
            
<div className="team-flex-container" style={{ display: "flex", flexWrap: "nowrap", gap: "3rem", justifyContent: "center" }}>
                  {employees && employees.length > 0 ? employees.map((employee: any, index: number) => (
                    <div key={employee.id} className="mobile-pop-standby team-member-card" style={{ width: "280px", textAlign: "center" }}>
                        <div style={{ width: "240px", height: "240px", borderRadius: "50%", overflow: "hidden", margin: "0 auto 1.5rem auto", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", background: "#e2e8f0", color: "#94a3b8" }}>
                            {employee.image_url ? (
                                <img src={employee.image_url} alt={employee.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                                <span style={{ fontSize: "6rem", fontWeight: 800 }}>{employee.name.charAt(0)}</span>
                            )}
                        </div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.25rem" }} className="anim-fade-up">
                            {employee.name}
                        </h3>
                        <p style={{ color: "#0284c7", fontWeight: 600 }} className="anim-fade-up">
                            {employee.role}
                        </p>
                    </div>
                  )) : (
                      <p>Laddar medarbetare...</p>
                  )}
</div>
        </div>
    </section>

    {/*  Slut-CTA  */}
    <section className="bottom-service-cta" style={{ background: "#0284c7", color: "#ffffff", padding: "80px 20px", textAlign: "center", position: "relative", overflow: "hidden", marginTop: 0, width: "100vw", marginLeft: "calc(-50vw + 50%)", boxSizing: "border-box", zIndex: 2, border: "none !important", borderRadius: "0 !important" }}>
        <style dangerouslySetInnerHTML={{__html: `
            .bottom-service-cta h2, .bottom-service-cta p {
                text-transform: none !important;
            }
            .bottom-service-cta p {
                font-weight: 400 !important;
            }
            .bottom-service-cta .cta-btn-header-match {
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
            .bottom-service-cta .cta-btn-header-match:hover {
                background: #ffffff !important;
                color: #000000 !important;
                border: 1px solid #ffffff !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
                transform: translateY(-4px) !important;
            }
            .bottom-service-cta:hover {
                transform: none !important;
                box-shadow: none !important;
                background: #0284c7 !important;
            }
        
            @media (max-width: 600px) {
                .service-cta .cta-buttons {
                    flex-wrap: nowrap !important;
                    gap: 0.5rem !important;
                }
                .bottom-service-cta .cta-btn-header-match {
                    padding: 0.75rem 0.5rem !important;
                    font-size: 0.85rem !important;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1.2;
                }
            }
`}} />
        {/*  Dekoration för high-end känsla  */}
        <div style={{ position: "absolute", top: "-50%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", bottom: "-50%", right: "-10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)", borderRadius: "50%", pointerEvents: "none" }}></div>
        
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <style dangerouslySetInnerHTML={{__html: `@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.8rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { padding: 14px 10px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: nowrap !important; font-size: 1.15rem !important; } }`}} /><h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 800, marginBottom: "1rem", color: "#ffffff", lineHeight: 1.2, whiteSpace: "nowrap" }} className="cta-heading anim-mask-text"><span className="anim-mask-inner">Redo för ett säkrare rörsystem?</span></h2>
            <p style={{ fontSize: "1.15rem", lineHeight: 1.6, marginBottom: "2.5rem", opacity: 0.9 }} className="anim-fade-up">Hör av er till oss idag så tar vi ett förutsättningslöst möte om er fastighet.</p>
            <div className="cta-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "nowrap", alignItems: "center" }}>
                <a href="/kontakt" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Kontakta oss</a>
                <a href="tel:+46727222232" className="cta-btn-header-match anim-fade-up" data-anim-delay="250">Ring oss</a>
            </div>
        </div>
    </section>

    
    

    </main>
    </FrontendLayout>
  );
}
