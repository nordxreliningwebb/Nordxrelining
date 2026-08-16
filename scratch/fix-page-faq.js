
const fs = require("fs");
let content = fs.readFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", "utf8");

// Add getPublicFAQs import
content = content.replace(/import \{ getActiveCampaign \} from "@\/lib\/data";/, "import { getActiveCampaign, getPublicFAQs } from \"@/lib/data\";\nimport FAQAccordionClient from \"@/components/public/FAQAccordionClient\";");

// Fetch FAQs
content = content.replace(/const campaign = await getActiveCampaign\(\);/, "const campaign = await getActiveCampaign();\n  const faqs = await getPublicFAQs();\n  const homeFaqs = faqs.slice(0, 5);");

// Replace the FAQ list
const faqSectionStart = content.indexOf("<div className=\"nordx-faq-list");
const faqSectionEndMatch = content.match(/<div id="nordx-hidden-group"[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/);
if (faqSectionStart !== -1 && faqSectionEndMatch) {
  const faqSectionEnd = faqSectionEndMatch.index + faqSectionEndMatch[0].length - "</section>".length;
  
  const dynamicFaq = `
                    <div className="nordx-faq-list faq-items-container anim-stagger-parent" id="faq-accordion" style={{ gap: "1.5rem" }}>
                        {homeFaqs.map((faq, idx) => (
                            <FAQAccordionClient 
                                key={faq.id}
                                question={faq.question} 
                                answer={faq.answer} 
                                waveClass={\`wave-\${(idx % 3) + 1}\`}
                                animClass={idx % 2 === 0 ? "anim-fade-left" : "anim-fade-right"}
                            />
                        ))}
                    </div>

                    {/* Visa fler knapp (Link till FAQ) */}
                    <div className="text-center mt-12" style={{ position: "relative", zIndex: "10" }}>
                        <a href="/faq" className="btn btn-secondary anim-fade-up anim-stagger-item" style={{ border: "2px solid #e2e8f0", background: "transparent", color: "#475569", padding: "14px 32px", borderRadius: "8px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "0.5rem", transition: "all 0.3s", textDecoration: "none" }}>
                            <span className="text">Se alla vanliga frågor</span>
                            <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
`;
  content = content.substring(0, faqSectionStart) + dynamicFaq + content.substring(faqSectionEnd);
}

fs.writeFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", content);

