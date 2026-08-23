const fs = require('fs');
const path = require('path');

function prependSlash(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            prependSlash(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            
            // Fix relative hrefs that should be absolute roots
            updated = updated.replace(/href="kalkylator"/g, 'href="/kalkylator"');
            updated = updated.replace(/href="kontakt"/g, 'href="/kontakt"');
            updated = updated.replace(/href="om-oss"/g, 'href="/om-oss"');
            updated = updated.replace(/href="priser"/g, 'href="/priser"');
            updated = updated.replace(/href="projekt"/g, 'href="/projekt"');
            updated = updated.replace(/href="kunskapsbanken"/g, 'href="/kunskapsbanken"');
            updated = updated.replace(/href="faq"/g, 'href="/faq"');
            updated = updated.replace(/href="stamspolning"/g, 'href="/stamspolning"');
            updated = updated.replace(/href="relining"/g, 'href="/relining"');
            updated = updated.replace(/href="rorinspektion"/g, 'href="/rorinspektion"');

            if (content !== updated) {
                fs.writeFileSync(fullPath, updated);
                console.log(`Prepend slash in ${fullPath}`);
            }
        }
    });
}

prependSlash('src/app');
prependSlash('src/components');
