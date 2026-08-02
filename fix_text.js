const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

let replacedCount = 0;

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let originalHtml = html;
    
    // 1. Fix the heading in kontakt.html to not be uppercase
    if (file === 'kontakt.html') {
        const targetHeading = '<h2 class="section-title" style="font-size: 2.2rem; margin-bottom: 25px; color:#111111;">Din trygga partner';
        const replacementHeading = '<h2 class="section-title" style="font-size: 2.2rem; margin-bottom: 25px; color:#111111; text-transform: none !important;">Din trygga partner';
        html = html.replace(targetHeading, replacementHeading);
    }
    
    // 2. Replace all instances of "Nordx Relining" and "Nordx relining" with "Nordxrelining"
    const regex1 = /Nordx Relining/g;
    const regex2 = /Nordx relining/g;
    
    if (regex1.test(html) || regex2.test(html)) {
        html = html.replace(regex1, 'Nordxrelining');
        html = html.replace(regex2, 'Nordxrelining');
    }
    
    if (html !== originalHtml) {
        fs.writeFileSync(filePath, html, 'utf8');
        replacedCount++;
        console.log(`Updated text in ${file}`);
    }
});

console.log(`Total files updated: ${replacedCount}`);
