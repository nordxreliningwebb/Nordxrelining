const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

let modifiedFiles = 0;
let totalReplaced = 0;

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });
    let modified = false;

    $('a').each(function() {
        const text = $(this).text().replace(/\s+/g, ' ').trim().toLowerCase();
        // Check if exact "kontakt" or includes "kontakta oss"
        if (text === 'kontakt' || text.includes('kontakta oss') || text === 'kom i kontakt') {
            const currentHref = $(this).attr('href');
            // Skip tel: and mailto: links just in case, though they likely don't say exactly this
            if (currentHref && !currentHref.startsWith('tel:') && !currentHref.startsWith('mailto:')) {
                if (currentHref !== 'kontakt.html') {
                    $(this).attr('href', 'kontakt.html');
                    modified = true;
                    totalReplaced++;
                }
            }
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, $.html(), 'utf8');
        modifiedFiles++;
        console.log(`Updated links in ${file}`);
    }
});

console.log(`Total files modified: ${modifiedFiles}`);
console.log(`Total links updated: ${totalReplaced}`);
