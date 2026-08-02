const fs = require('fs');

function fixGap(file, targetClass, oldPaddingNum, paddingUnit) {
    if (fs.existsSync(file)) {
        let html = fs.readFileSync(file, 'utf8');
        
        // We'll just append the style rule to the existing <style> block in <head>
        const styleToAppend = `
        /* Mobile gap fix */
        @media (max-width: 900px) {
            ${targetClass} {
                margin-top: -85px !important;
                padding-top: calc(${oldPaddingNum}${paddingUnit} + 85px) !important;
            }
        }
        `;
        
        if (!html.includes('/* Mobile gap fix */')) {
            html = html.replace('</style>', styleToAppend + '\n    </style>');
            fs.writeFileSync(file, html, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            console.log(`${file} already fixed.`);
        }
    }
}

fixGap('public/priser.html', '.pricing-section:first-of-type', '8', 'rem');
fixGap('public/kontakt.html', '.contact-hero-section', '160', 'px');
