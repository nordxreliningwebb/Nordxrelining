const fs = require('fs');
const files = [
  'src/app/rorinspektion/page.tsx',
  'src/app/relining/page.tsx',
  'src/app/stamspolning/page.tsx'
];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Animate the cards
        content = content.replace(/className="premium-step-card"/g, 'className="premium-step-card anim-fade-up"');
        
        // Animate the blue headers (Steg X)
        content = content.replace(/<div style=\{\{fontSize: "0\.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1\.5px", marginBottom: "0\.5rem", \}\}>Steg/g, '<div className="anim-fade-up" style={{fontSize: "0.85rem", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.5rem", }}>Steg');
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    } catch (err) {
        console.log(`Error updating ${file}:`, err.message);
    }
});
