const fs = require("fs");

// 1. Read index_backup.html
const html = fs.readFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/public/index_backup.html", "utf8");

// 2. Extract inner HTML
const headerEnd = html.indexOf("</header>");
const footerStart = html.indexOf("<footer");
let innerHtml = html.substring(headerEnd + "</header>".length, footerStart);

// Remove Campaign Popup
innerHtml = innerHtml.replace(/<div class="campaign-popup-overlay" id="campaign-popup">[\s\S]*?<!-- \/Campaign Popup -->/g, "");
innerHtml = innerHtml.replace(/<div class="campaign-popup-overlay" id="campaign-popup">[\s\S]*?<script>/g, "<script>");

// 3. Convert to JSX
let jsx = innerHtml;
jsx = jsx.replace(/class=/g, "className=");
jsx = jsx.replace(/for=/g, "htmlFor=");

// Inline styles
jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
  const styles = p1.split(";").filter(s => s.trim()).map(s => {
    const [key, val] = s.split(":");
    if (!key || !val) return "";
    const camelKey = key.trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
    return `${camelKey}: "${val.trim().replace(/"/g, "'")}"`;
  }).filter(s => s).join(", ");
  return `style={{ ${styles} }}`;
});

// Self close tags
jsx = jsx.replace(/<img([^>]+?)(?<!\/)>/g, "<img$1 />");
jsx = jsx.replace(/<input([^>]+?)(?<!\/)>/g, "<input$1 />");
jsx = jsx.replace(/<br>/g, "<br />");
jsx = jsx.replace(/<hr>/g, "<hr />");

// SVG properties
jsx = jsx.replace(/stroke-width=/g, "strokeWidth=");
jsx = jsx.replace(/stroke-linecap=/g, "strokeLinecap=");
jsx = jsx.replace(/stroke-linejoin=/g, "strokeLinejoin=");
jsx = jsx.replace(/fill-rule=/g, "fillRule=");
jsx = jsx.replace(/clip-rule=/g, "clipRule=");
jsx = jsx.replace(/stroke-dasharray=/g, "strokeDasharray=");
jsx = jsx.replace(/stroke-dashoffset=/g, "strokeDashoffset=");

// Comments
jsx = jsx.replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");

// Video properties
jsx = jsx.replace(/autoplay=""/g, "autoPlay");
jsx = jsx.replace(/loop=""/g, "loop");
jsx = jsx.replace(/muted=""/g, "muted");
jsx = jsx.replace(/playsinline=""/g, "playsInline");

// Tabindex
jsx = jsx.replace(/tabindex=/g, "tabIndex=");

// Style tags inside JSX
jsx = jsx.replace(/<style>([\s\S]*?)<\/style>/g, (match, inner) => {
  const escaped = inner.replace(/`/g, "\\`").replace(/\$/g, "\\$");
  return `<style dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />`;
});

// Remove script tags
jsx = jsx.replace(/<script[\s\S]*?<\/script>/g, "");

// Replace hardcoded FAQ section
const faqSectionStart = jsx.indexOf("<div className=\"nordx-faq-list");
const faqSectionEndMatch = jsx.match(/<div id="nordx-hidden-group"[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/);
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
  jsx = jsx.substring(0, faqSectionStart) + dynamicFaq + jsx.substring(faqSectionEnd);
}

// 4. Inject Dynamic FAQ and Campaign Popup
const template = `import React from "react";
import FrontendLayout from "@/components/FrontendLayout";
import CampaignPopupClient from "@/components/public/CampaignPopupClient";
import FAQAccordionClient from "@/components/public/FAQAccordionClient";
import { getActiveCampaign, getPublicFAQs } from "@/lib/data";

export default async function HomePage() {
  const campaign = await getActiveCampaign();
  const faqs = await getPublicFAQs();
  const homeFaqs = faqs.slice(0, 5);

  return (
    <FrontendLayout>
      ${jsx}
      <CampaignPopupClient campaign={campaign} />
    </FrontendLayout>
  );
}
`;

fs.writeFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", template);
