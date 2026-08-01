const fs = require('fs');
const path = require('path');

const htmlFiles = [
    'faq.html',
    'index.html',
    'kalkylator.html',
    'om-oss.html',
    'priser.html',
    'projekt.html',
    'relining.html',
    'rorinspektion.html',
    'skyddsrum.html',
    'stamspolning.html',
    'stamspolning_backup2.html'
];

for (const file of htmlFiles) {
    const filePath = path.join(__dirname, 'public', file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Add FAQ link to Desktop Header Menu
    const desktopHeaderMenuRegex = /(<li role="none"><a href="projekt\.html" role="menuitem">PROJEKT<\/a><\/li>)/;
    if (desktopHeaderMenuRegex.test(content) && !content.includes('<a href="faq.html" role="menuitem">FAQ</a>')) {
        content = content.replace(desktopHeaderMenuRegex, '$1\n                <li role="none"><a href="faq.html" role="menuitem">FAQ</a></li>');
        modified = true;
    }

    // 2. Add FAQ link to Mobile Drawer Menu
    const mobileHeaderMenuRegex = /(<li><a href="projekt\.html" class="mobile-menu-link">Projekt<\/a><\/li>)/;
    if (mobileHeaderMenuRegex.test(content) && !content.includes('<a href="faq.html" class="mobile-menu-link">FAQ</a>')) {
        content = content.replace(mobileHeaderMenuRegex, '$1\n                <li><a href="faq.html" class="mobile-menu-link">FAQ</a></li>');
        modified = true;
    }

    // 3. Add FAQ link to Footer Menu
    const footerMenuRegex = /(<li><a href="projekt\.html">Projekt<\/a><\/li>)/;
    if (footerMenuRegex.test(content) && !content.includes('<li><a href="faq.html">FAQ</a></li>')) {
        content = content.replace(footerMenuRegex, '$1\n                    <li><a href="faq.html">FAQ</a></li>');
        modified = true;
    }

    // 4. Update CTA phone number text to "Ring oss"
    const phoneRegex1 = />Ring 070-318 51 10<\/a>/g;
    if (phoneRegex1.test(content)) {
        content = content.replace(phoneRegex1, '>Ring oss</a>');
        modified = true;
    }

    const phoneRegex2 = />070-318 51 10<\/a>/g;
    // But be careful not to replace it in the header/footer contact info where it's supposed to be the phone number!
    // The user specified "i CTA knappen i CTA sektionen".
    // CTA buttons usually have classes like "cta-btn-header-match" or "btn-primary".
    
    // A safer way is to specifically target the CTA sections:
    const ctaPhoneRegex = /(class="[^"]*cta-btn-header-match[^"]*"[^>]*>)(?:Ring )?070-318 51 10(<\/a>)/g;
    if (ctaPhoneRegex.test(content)) {
        content = content.replace(ctaPhoneRegex, '$1Ring oss$2');
        modified = true;
    }
    
    const ctaPhoneRegex2 = /(class="[^"]*btn[^"]*"[^>]*>)(?:Ring )?070-318 51 10(<\/a>)/g;
    if (ctaPhoneRegex2.test(content)) {
        content = content.replace(ctaPhoneRegex2, '$1Ring oss$2');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated ${file}`);
    } else {
        console.log(`No updates needed for ${file}`);
    }
}
