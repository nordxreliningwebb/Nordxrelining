const fs = require('fs');
const files = ['public/stamspolning.html', 'public/relining.html', 'public/rorinspektion.html'];

for (let file of files) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');

    // Replace the remaining .service-cta references in the inline style block
    html = html.replace(/\.service-cta \.cta-btn-header-match/g, '.bottom-service-cta .cta-btn-header-match');
    
    // In case there are other leftover .service-cta references in that block, let's catch them if they exist
    // But .service-cta is used elsewhere in the document? No, it shouldn't be.
    // The previous script only replaced specific known lines.
    
    fs.writeFileSync(file, html, 'utf8');
    console.log('Fixed CTA buttons in ' + file);
}
