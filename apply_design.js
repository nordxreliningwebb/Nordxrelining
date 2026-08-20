const fs = require('fs');

let tsx = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');

const newCardCode = `
                            {/* Left: Info Card */}
                            <div className="contact-info-card anim-stagger-parent" style={{ position: "relative", overflow: "hidden", transitionDelay: "0.2s", backgroundColor: "#0284c7", color: "white", padding: "3rem", borderRadius: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100%" }}>
                                
                                {/* Watermark */}
                                <div style={{
                                    position: "absolute",
                                    top: "-15%",
                                    right: "-10%",
                                    width: "400px",
                                    height: "400px",
                                    opacity: 0.08,
                                    pointerEvents: "none",
                                    transform: "rotate(15deg)"
                                }}>
                                    <svg viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10,10 L30,10 L50,40 L70,10 L90,10 L60,50 L90,90 L70,90 L50,60 L30,90 L10,90 L40,50 Z"/>
                                    </svg>
                                </div>

                                <h3 className="anim-stagger-child" style={{ position: "relative", zIndex: 1, fontSize: "1.75rem", fontWeight: 700, marginBottom: "2.5rem" }}>Våra kontaktuppgifter</h3>
                                <ul className="contact-list" style={{ position: "relative", zIndex: 1, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3rem", flexGrow: 1 }}>
                                    <li className="anim-stagger-child" style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        </div>
                                        <div>
                                            <span className="label" style={{ display: "block", fontSize: "0.8rem", opacity: 0.85, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Besöksadress</span>
                                            <span className="value" style={{ display: "block", fontSize: "1.25rem", fontWeight: 700, color: "white" }}>Skogsgatan 3b, 152 44 Södertälje</span>
                                        </div>
                                    </li>
                                    <li className="anim-stagger-child" style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <div>
                                            <span className="label" style={{ display: "block", fontSize: "0.8rem", opacity: 0.85, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Telefon</span>
                                            <span className="value" style={{ display: "block", fontSize: "1.25rem", fontWeight: 700, color: "white" }}><a style={{ color: "white", textDecoration: "none" }} href="tel:+46703185110">070-318 51 10</a></span>
                                        </div>
                                    </li>
                                    <li className="anim-stagger-child" style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        </div>
                                        <div>
                                            <span className="label" style={{ display: "block", fontSize: "0.8rem", opacity: 0.85, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>E-post</span>
                                            <span className="value" style={{ display: "block", fontSize: "1.25rem", fontWeight: 700, color: "white" }}><a style={{ color: "white", textDecoration: "none" }} href="mailto:info@nordxrelining.se">info@nordxrelining.se</a></span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="contact-map anim-stagger-child" style={{ position: "relative", zIndex: 1 }}>
                                    <iframe 
                                        width="100%" 
                                        height="250" 
                                        style={{ border: 0, borderRadius: "12px" }} 
                                        loading="lazy" 
                                        allowFullScreen 
                                        src="https://maps.google.com/maps?q=Skogsgatan%203b,%20152%2044%20S%C3%B6dert%C3%A4lje&t=&z=15&ie=UTF8&iwloc=&output=embed">
                                    </iframe>
                                </div>
                            </div>
`;

// Replace from " {/* Left: Info Card */}" to the end of contact-map div
const startIndex = tsx.indexOf('{/* Left: Info Card */}');
const endIndex = tsx.indexOf('                            {/* Right: Form Card */}');

if (startIndex !== -1 && endIndex !== -1) {
    const newTsx = tsx.substring(0, startIndex) + newCardCode.trim() + '\n\n' + tsx.substring(endIndex);
    fs.writeFileSync('src/app/kontakt/page.tsx', newTsx, 'utf8');
    console.log('Successfully updated contact info card design.');
} else {
    console.log('Could not find replace targets in page.tsx');
}
