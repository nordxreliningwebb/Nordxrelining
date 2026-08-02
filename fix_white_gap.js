const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // For projekt.html and kunskapsbanken.html
    if (file === 'projekt.html' || file === 'kunskapsbanken.html') {
        const target = 'padding: 4.5rem 0 60px 0 !important;';
        const replacement = 'margin-top: -85px !important;\n                        padding: 150px 0 60px 0 !important;';
        if (html.includes(target)) {
            html = html.replace(target, replacement);
            changed = true;
        }
    } 
    // For all other pages with the standard 120px padding
    else {
        const target = 'padding: 120px 0 60px 0 !important;';
        const replacement = 'margin-top: -85px !important;\n                        padding: 205px 0 60px 0 !important;';
        if (html.includes(target)) {
            html = html.replace(target, replacement);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated ${file}`);
    }
});
