
const fs = require("fs");
let content = fs.readFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", "utf8");
content = content.replace(/<button id="show-more-faq"[\s\S]*?Visa fler FAQs<\/button>/, `<a href="/faq" id="show-more-faq" className="btn btn-outline anim-fade-up anim-stagger-item" style={{ border: "2px solid #e2e8f0", background: "transparent", color: "#475569", padding: "1rem 2.5rem", borderRadius: "8px", fontWeight: "600", cursor: "pointer", transition: "all 0.3s", fontSize: "1rem", touchAction: "manipulation", display: "inline-block", textDecoration: "none" }}>Se alla vanliga frågor</a>`);
fs.writeFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", content);

