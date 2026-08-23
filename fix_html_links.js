const fs = require('fs');
const path = require('path');

function replaceHtmlLinks(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceHtmlLinks(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content.replace(/href="([^"]+)\.html"/g, 'href="$1"');
            
            // Also handle `<Link href="/kontakt.html">` single quotes if any
            updated = updated.replace(/href='([^']+)\.html'/g, "href='$1'");
            
            if (content !== updated) {
                fs.writeFileSync(fullPath, updated);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}

replaceHtmlLinks('src/app');
replaceHtmlLinks('src/components');
