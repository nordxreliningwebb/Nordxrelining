const fs = require('fs');
const path = require('path');

const publicDir = 'public';
const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Desktop Header
    const desktopSearch = '<li role="none"><a href="projekt.html" role="menuitem">PROJEKT</a></li>';
    const desktopReplace = '<li role="none"><a href="projekt.html" role="menuitem">PROJEKT</a></li>\n                <li role="none"><a href="kunskapsbanken.html" role="menuitem">KUNSKAPSBANKEN</a></li>';
    if (html.includes(desktopSearch) && !html.includes('href="kunskapsbanken.html" role="menuitem"')) {
        html = html.replace(new RegExp(desktopSearch, 'g'), desktopReplace);
        changed = true;
    }

    // 2. Mobile Header
    const mobileSearch = '<li><a href="projekt.html" class="mobile-menu-link">Projekt</a></li>';
    const mobileReplace = '<li><a href="projekt.html" class="mobile-menu-link">Projekt</a></li>\n                <li><a href="kunskapsbanken.html" class="mobile-menu-link">Kunskapsbanken</a></li>';
    if (html.includes(mobileSearch) && !html.includes('href="kunskapsbanken.html" class="mobile-menu-link">Kunskapsbanken')) {
        html = html.replace(new RegExp(mobileSearch, 'g'), mobileReplace);
        changed = true;
    }

    // 3. Footer Snabblänkar
    const footerSearch = '<li><a href="projekt.html">Projekt</a></li>';
    const footerReplace = '<li><a href="projekt.html">Projekt</a></li>\n                    <li><a href="kunskapsbanken.html">Kunskapsbanken</a></li>';
    if (html.includes(footerSearch) && !html.includes('href="kunskapsbanken.html">Kunskapsbanken')) {
        html = html.replace(new RegExp(footerSearch, 'g'), footerReplace);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`Updated ${file}`);
    }
});
