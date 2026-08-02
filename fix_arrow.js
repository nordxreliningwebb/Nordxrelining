const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace the corrupted arrow inside the span
    const arrowRegex = /<span class="arrow">.*?<\/span>/g;
    
    if (arrowRegex.test(html)) {
        let newHtml = html.replace(arrowRegex, '<span class="arrow">▼</span>');
        
        // Let's also fix "TjÃ¤nster" or other corruptions just in case, but only on the exact menu line
        // The user says "Tjänster" looks fine in the screenshot. 
        // We will just do the arrow replacement.
        if (newHtml !== html) {
            fs.writeFileSync(filePath, newHtml, 'utf8');
            console.log(`Fixed arrow in ${file}`);
        }
    }
});
