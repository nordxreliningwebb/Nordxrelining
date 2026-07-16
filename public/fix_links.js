const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Replace href="om-oss" with href="om-oss.html"
    if (content.includes('href="om-oss"')) {
        content = content.replace(/href="om-oss"/g, 'href="om-oss.html"');
        changed = true;
    }
    
    // Let's also do the others while we're at it to make sure navigation works locally
    const pages = ['konstruktion', 'skyddsrum', 'projekt', 'kunskapsbanken', 'faq', 'kontakt', 'relining', 'stamspolning', 'rorinspektion'];
    for (let page of pages) {
        let regex = new RegExp(`href="${page}"`, 'g');
        if (content.includes(`href="${page}"`)) {
            content = content.replace(regex, `href="${page}.html"`);
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
