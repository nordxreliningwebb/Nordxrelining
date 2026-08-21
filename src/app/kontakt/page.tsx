"use client";

import FrontendLayout from "@/components/FrontendLayout";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function KontaktPage() {
    const [fileName, setFileName] = useState("Ingen fil vald");
    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("Ingen fil vald");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");
        
        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            formData.append("type", "kontakt");
            
            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });
            
            if (response.ok) {
                form.reset();
                setFileName("Ingen fil vald");
                router.push("/tack");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }
    };

    return (
        <FrontendLayout>
            <main id="main-content" style={{ backgroundColor: "#faf8f5", marginTop: "-85px", paddingTop: "85px" }}>
                <section className="contact-hero-section" style={{ paddingTop: "160px", backgroundColor: "#faf8f5" }}>
    <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
            .contact-hero-section {
                padding-top: 94px !important;
            }
            .contact-info-card {
                display: none !important;
            }
        }
    `}} />

                    <div className="contact-container">
                        {/* Header part */}
                        <header className="contact-page-header">
                            <div className="header-left anim-stagger-parent">
                                <h1 className="section-title anim-stagger-child" style={{ marginBottom: "15px", color: "#111111", textTransform: "none" }}>
                                    Kontakta oss
                                </h1>
                                <h2 className="contact-subheading anim-stagger-child">
                                    Välkommen att kontakta oss med dina frågor och funderingar, eller om du behöver hjälp med ditt rörsystem.
                                </h2>
                            </div>
                            <div className="header-right"></div>
                        </header>

                        {/* Grid part */}
                        <div className="contact-main-grid">

                            {/* Left: Info Card */}
                            <div className="contact-info-card anim-stagger-parent" style={{ position: "relative", transitionDelay: "0.2s", backgroundColor: "#0284c7", color: "white", padding: "3rem", borderRadius: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100%" }}>
                                
                                {/* Pipe Frame */}
                                
                                <div className="p-corner p-tl"></div>
                                <div className="p-corner p-tr"></div>
                                <div className="p-corner p-bl"></div>
                                <div className="p-corner p-br"></div>
<div className="p-pipe p-top">
                                    <div className="p-muff" style={{ left: "20%" }}></div><div className="p-muff" style={{ right: "20%" }}></div>
                                </div>
                                <div className="p-pipe p-bottom">
                                    <div className="p-muff" style={{ left: "50%", transform: "translateX(-50%) translateY(-50%)" }}></div>
                                </div>
                                <div className="p-pipe p-left">
                                    <div className="p-muff-v" style={{ top: "30%" }}></div>
                                </div>
                                <div className="p-pipe p-right">
                                    <div className="p-muff-v" style={{ top: "70%" }}></div>
                                </div>

                                <h3 className="anim-stagger-child" style={{ position: "relative", zIndex: 1, fontSize: "1.75rem", fontWeight: 700, marginBottom: "2.5rem" }}>Våra öppet- & jourtider</h3>
                                <ul className="contact-list" style={{ position: "relative", zIndex: 1, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "0" }}>
                                    <li className="anim-stagger-child" style={{ display: "flex", gap: "1.25rem" }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        </div>
                                        <div>
                                            <span className="label" style={{ display: "block", fontSize: "0.8rem", opacity: 0.85, marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Öppettider</span>
                                            
                                            <div style={{ display: "grid", gridTemplateColumns: "100px auto", rowGap: "0.4rem", fontSize: "0.95rem", color: "white", marginBottom: "1rem" }}>
                                                <span>Måndag</span><span>07:00 - 16:00</span>
                                                <span>Tisdag</span><span>07:00 - 16:00</span>
                                                <span>Onsdag</span><span>07:00 - 16:00</span>
                                                <span>Torsdag</span><span>07:00 - 16:00</span>
                                                <span>Fredag</span><span>07:00 - 16:00</span>
                                                <span>Lördag</span><span>Stängt</span>
                                                <span>Söndag</span><span>Stängt</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <div className="anim-stagger-child" style={{ position: "relative", zIndex: 1, marginTop: "2rem", marginBottom: "2rem", padding: "1.25rem", backgroundColor: "#facc15", borderRadius: "12px", width: "100%", textAlign: "center" }}>
                                    <p style={{ margin: 0, fontSize: "1rem", lineHeight: "1.4", color: "#111827" }}>
                                        Utanför kontorstid har vi <strong style={{ fontWeight: 800 }}>jour 24/7 året om</strong>.
                                    </p>
                                </div>

                                <div className="anim-stagger-child" style={{ position: "relative", zIndex: 1, marginBottom: "0.75rem" }}>
                                    <h4 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "#ffffff" }}>Besöksadress</h4>
                                </div>
                                <div className="contact-map anim-stagger-child" style={{ position: "relative", zIndex: 1, flexGrow: 1, minHeight: "350px" }}>
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 0, borderRadius: "12px", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} 
                                        loading="lazy" 
                                        allowFullScreen 
                                        src="https://maps.google.com/maps?q=Skogsgatan%203b,%20152%2044%20S%C3%B6dert%C3%A4lje&t=&z=15&ie=UTF8&iwloc=&output=embed">
                                    </iframe>
                                </div>
                            </div>

                            {/* Right: Form Card */}
                            <div className="contact-form-card" style={{ transitionDelay: "0.4s" }}>

                                {/* Pipe Frame */}
                                <div className="p-pipe p-top">
                                    <div className="p-muff" style={{ left: "20%" }}></div><div className="p-muff" style={{ right: "20%" }}></div>
                                </div>
                                <div className="p-pipe p-bottom">
                                    <div className="p-muff" style={{ left: "50%", transform: "translateX(-50%) translateY(-50%)" }}></div>
                                </div>
                                <div className="p-pipe p-left">
                                    <div className="p-muff-v" style={{ top: "30%" }}></div>
                                </div>
                                <div className="p-pipe p-right">
                                    <div className="p-muff-v" style={{ top: "70%" }}></div>
                                </div>
                                <div className="p-corner p-tl"></div>
                                <div className="p-corner p-tr"></div>
                                <div className="p-corner p-bl"></div>
                                <div className="p-corner p-br"></div>

                                <form action="#" method="POST" id="react-premium-form" className="premium-form anim-stagger-parent" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group anim-stagger-child">
                                            <label htmlFor="full-name">Namn</label>
                                            <div className="input-with-icon">
                                                <svg className="field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                <input type="text" id="full-name" name="full-name" placeholder="Namn" required className="anim-stagger-child" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row split">
                                        <div className="form-group anim-stagger-child">
                                            <label htmlFor="email">E-post</label>
                                            <div className="input-with-icon">
                                                <svg className="field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                <input type="email" id="email" name="email" placeholder="E-postadress" required className="anim-stagger-child" />
                                            </div>
                                        </div>
                                        <div className="form-group anim-stagger-child">
                                            <label htmlFor="phone">Telefon</label>
                                            <div className="input-with-icon">
                                                <svg className="field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                <input type="tel" id="phone" name="phone" placeholder="Telefonnummer" className="anim-stagger-child" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group anim-stagger-child">
                                            <label htmlFor="service">Välj en tjänst</label>
                                            <div className="input-with-icon">
                                                <svg className="field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                                <select id="service" name="service" className="anim-stagger-child" defaultValue="">
                                                    <option value="" disabled>Välj tjänst</option>
                                                    <option value="relining">Relining</option>
                                                    <option value="stamspolning">Stamspolning</option>
                                                    <option value="rorinspektion">Rörinspektion</option>
                                                    <option value="konsultation">Generell konsultation</option>
                                                </select>
                                                <svg className="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group anim-stagger-child">
                                            <label htmlFor="file-upload">Bifoga fil (Max 5MB)</label>
                                            <div className="input-with-icon file-box">
                                                <svg className="field-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                                <div className="file-trigger-area">
                                                    <label htmlFor="file-upload" className="btn-file-mini">Välj fil</label>
                                                    <span id="file-label-text">{fileName}</span>
                                                </div>
                                                <input type="file" id="file-upload" name="file-upload" className="file-input-hidden anim-stagger-child" accept=".pdf,.jpg,.png,.dwg" onChange={handleFileChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group anim-stagger-child">
                                            <label htmlFor="message">Meddelande</label>
                                            <textarea id="message" name="message" placeholder="Beskriv ditt ärende" rows={6} className="anim-stagger-child"></textarea>
                                        </div>
                                    </div>

                                    <div className="form-submit">
                                        <button type="submit" className="btn-submit-premium" id="submit-btn" disabled={status === "loading"}>
                                            {status === "loading" ? (
                                                <span>SKICKAR...</span>
                                            ) : (
                                                <>
                                                    <span>SKICKA IN</span>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                                </>
                                            )}
                                        </button>
                                        
                                        {status === "error" && (
                                            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px", color: "#ef4444", textAlign: "center", fontWeight: 500, fontSize: "0.95rem" }}>
                                                Något gick fel. Vänligen försök igen eller ring oss.
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
        </FrontendLayout>
    );
}
