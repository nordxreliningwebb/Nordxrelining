const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // 1. Fix the footer text about what the company does
    const oldFooterText = 'Nordx Relining bygger säkra och optimerade lösningar för fastigheters rörsystem. Din trygga partner inom stamspolning och relining.';
    const newFooterText = 'Nordxrelining bygger säkra och optimerade lösningar för fastigheters rörsystem. Din trygga partner inom stamspolning, relining och rörinspektion.';
    
    // 2. Fix the copyright text
    const oldCopyright = '© 2026 Nordx Relining.';
    const newCopyright = '© 2026 Nordxrelining.';
    
    // 3. Fix the logo alt text (usually "Nordx Relining logotyp" or similar)
    const oldAlt = 'alt="Nordx Relining logotyp"';
    const newAlt = 'alt="Nordxrelining logotyp"';
    
    let changed = false;
    
    if (html.includes(oldFooterText)) {
        html = html.replace(new RegExp(oldFooterText, 'g'), newFooterText);
        changed = true;
    }
    
    if (html.includes(oldCopyright)) {
        html = html.replace(new RegExp(oldCopyright, 'g'), newCopyright);
        changed = true;
    }
    
    if (html.includes(oldAlt)) {
        html = html.replace(new RegExp(oldAlt, 'g'), newAlt);
        changed = true;
    }
    
    // Also catch any stray "Nordx Relining" in the footer area specifically if possible, 
    // but the above covers the specific issues the user mentioned in the footer.
    
    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated ${file}`);
    }
});
