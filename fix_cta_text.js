const fs = require('fs');
const files = ['public/stamspolning.html', 'public/relining.html', 'public/rorinspektion.html'];

for (let file of files) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');

    // Change button text
    html = html.replace(/<a href="#kontakt" class="cta-btn-header-match">F[åA-Za-z]+ en kostnadsfri offert<\/a>/g, '<a href="#kontakt" class="cta-btn-header-match">Kontakta oss</a>');

    // Update style to remove font-size constraint
    const oldStyle = '<style>@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.5rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { font-size: 0.85rem !important; padding: 12px 5px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: normal !important; line-height: 1.2; } }</style>';
    const newStyle = '<style>@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.8rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { padding: 14px 10px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: nowrap !important; } }</style>';
    
    // Also catch slightly varied old styles if any
    html = html.replace(oldStyle, newStyle);
    // If exact match failed, try regex
    html = html.replace(/font-size: 0\.85rem !important; /g, '');
    html = html.replace(/padding: 12px 5px !important;/g, 'padding: 14px 10px !important;');

    fs.writeFileSync(file, html, 'utf8');
    console.log('Fixed CTA text in ' + file);
}
