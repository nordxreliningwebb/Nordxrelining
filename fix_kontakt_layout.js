const fs = require('fs');
let content = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');

// Replace contact-main-grid
content = content.replace(
    '<div className="contact-main-grid">',
    '<div className="contact-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", maxWidth: "1200px", margin: "0 auto", alignItems: "stretch" }}>'
);

// Replace contact-info-card
content = content.replace(
    '<div className="contact-info-card anim-stagger-parent" style={{ transitionDelay: "0.2s" }}>',
    '<div className="contact-info-card anim-stagger-parent" style={{ transitionDelay: "0.2s", backgroundColor: "#0284c7", color: "white", padding: "3rem", borderRadius: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100%" }}>'
);

// Replace contact-list
content = content.replace(
    '<ul className="contact-list">',
    '<ul className="contact-list" style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3rem" }}>'
);

// Replace all li inside contact-list
content = content.replace(
    /<li className="anim-stagger-child">/g,
    '<li className="anim-stagger-child" style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>'
);

// Add styling for label and value
content = content.replace(/className="label"/g, 'className="label" style={{ display: "block", fontSize: "0.85rem", opacity: 0.8, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}');
content = content.replace(/className="value"/g, 'className="value" style={{ display: "block", fontSize: "1.1rem", fontWeight: 600, color: "white" }}');

// Fix anchor tags in contact info to be white
content = content.replace(/<a href="tel/g, '<a style={{ color: "white", textDecoration: "none" }} href="tel');
content = content.replace(/<a href="mailto/g, '<a style={{ color: "white", textDecoration: "none" }} href="mailto');

fs.writeFileSync('src/app/kontakt/page.tsx', content, 'utf8');
console.log('Fixed kontakt page layout inline');
