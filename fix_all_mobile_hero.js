const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('public').filter(f => f.endsWith('.html'));
files.forEach(file => {
    let html = fs.readFileSync('public/' + file, 'utf8');
    if (html.includes('.swoosh-hero')) {
        let changed = false;
        
        // 1. Replace 205px padding with 115px (which fixes the top padding symmetry)
        const oldPadding = 'padding: 205px 0 60px 0 !important;';
        const newPadding = 'padding: 115px 0 60px 0 !important;';
        if (html.includes(oldPadding)) {
            html = html.replace(new RegExp(oldPadding, 'g'), newPadding);
            changed = true;
        }

        // 2. Replace gap: 2rem !important; with gap: 4.5rem !important;
        // The regex will match gap: 2rem !important; (with any whitespace)
        // Since there is only one gap: 2rem !important; in these inline style blocks, this is safe.
        const gapRegex = /gap:\s*2rem\s*!important;/g;
        if (gapRegex.test(html)) {
            html = html.replace(gapRegex, 'gap: 4.5rem !important;');
            changed = true;
        }

        if (changed) {
            fs.writeFileSync('public/' + file, html, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
