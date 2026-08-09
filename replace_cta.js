const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let count = 0;
files.forEach(file => {
    let p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf8');
    let old = content;
    // Replace Få en kostnadsfri offert
    content = content.replace(/>\s*Få en kostnadsfri offert\s*</g, '><span class="desktop-text">Få en kostnadsfri offert</span><span class="mobile-text">Kontakta oss</span><');
    // Just in case it was written as Får
    content = content.replace(/>\s*Får en kostnadsfri offert\s*</g, '><span class="desktop-text">Får en kostnadsfri offert</span><span class="mobile-text">Kontakta oss</span><');
    if (content !== old) {
        fs.writeFileSync(p, content, 'utf8');
        console.log("Updated " + file);
        count++;
    }
});
console.log(`Finished updating ${count} files.`);
