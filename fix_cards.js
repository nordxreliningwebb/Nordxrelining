const fs = require('fs');
const file = 'public/om-oss.html';
let html = fs.readFileSync(file, 'utf8');

// 1. Replace the background
html = html.replace(/background:\s*linear-gradient\(135deg,\s*#[a-fA-F0-9]{6}\s*0%,\s*#[a-fA-F0-9]{6}\s*100%\);/g, 'background: #0284c7;');

// 2. Remove the icons
html = html.replace(/<div style="width: 48px; height: 48px; background: rgba\(255,255,255,0\.2\);[^>]*>\s*<svg[\s\S]*?<\/svg>\s*<\/div>/g, '');

// 3. Replace headings
html = html.replace(/>Hållbarhet & Kvalitet</g, '>Hållbarhet & kvalitet<');
html = html.replace(/>Trygghet & Arbetsmiljö</g, '>Trygghet & arbetsmiljö<');
html = html.replace(/>Innovation & Framtid</g, '>Innovation & framtid<');

fs.writeFileSync(file, html, 'utf8');
console.log('Update complete');
