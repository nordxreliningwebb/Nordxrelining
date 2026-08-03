const fs = require('fs');

const file = 'public/om-oss.html';
if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');

    // 1. Change section class
    html = html.replace(/<section class="service-cta"/g, '<section class="bottom-service-cta"');
    
    // 2. Change CSS class references
    html = html.replace(/\.service-cta h2, \.service-cta p/g, '.bottom-service-cta h2, .bottom-service-cta p');
    html = html.replace(/\.service-cta p \{/g, '.bottom-service-cta p {');
    html = html.replace(/\.service-cta \.cta-btn-header-match/g, '.bottom-service-cta .cta-btn-header-match');
    html = html.replace(/\.service-cta:hover/g, '.bottom-service-cta:hover');

    // 3. Change button text
    html = html.replace(/<a href="kontakt\.html" class="cta-btn-header-match">F[åA-Za-z]+ en kostnadsfri offert<\/a>/g, '<a href="kontakt.html" class="cta-btn-header-match">Kontakta oss</a>');

    // 4. Change flex-wrap
    html = html.replace(/flex-wrap: wrap;/g, 'flex-wrap: nowrap;');

    // 5. Update media query
    const oldStyle = '<style>@media (max-width: 768px) { .cta-heading { white-space: normal !important; } }</style>';
    const newStyle = '<style>@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.8rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { padding: 14px 10px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: nowrap !important; } }</style>';
    html = html.replace(oldStyle, newStyle);

    fs.writeFileSync(file, html, 'utf8');
    console.log('Fixed CTA in ' + file);
} else {
    console.log('File not found: ' + file);
}
