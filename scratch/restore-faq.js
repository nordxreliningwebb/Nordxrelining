
const fs = require("fs");
let content = fs.readFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", "utf8");
content = content.replace(/\{(\/\* Premium Transition Divider \(Pure CSS Photorealistic PVC Pipe\) TOP \*\/)\}/, `
                            <div className="nordx-faq-card faq-wave-base wave-1 anim-fade-left anim-stagger-item">
                                <button className="nordx-faq-btn" aria-expanded="false">
                                    <span>Vad kostar en rörinspektion eller relining?</span>
                                    <svg className="nordx-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"></path></svg>
                                </button>
                                <div className="nordx-faq-answer">
                                    <p className="">Varje fastighet har unika förutsättningar. Kostnaden påverkas av rörsystemets komplexitet, längd och skick. Vi rekommenderar att ni bokar ett kostnadsfritt första besök där vi bedömer situationen och därefter ger er en fast och transparent offert.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "3rem", position: "relative", zIndex: "10" }}>
                    <a href="/faq" id="show-more-faq" className="btn btn-outline anim-fade-up anim-stagger-item" style={{ border: "2px solid #e2e8f0", background: "transparent", color: "#475569", padding: "1rem 2.5rem", borderRadius: "8px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s", fontSize: "1rem", touchAction: "manipulation", display: "inline-block", textDecoration: "none" }}>Se alla vanliga frågor</a>
                </div>

            </div>
        </section>

        {$1}`);
fs.writeFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", content);

