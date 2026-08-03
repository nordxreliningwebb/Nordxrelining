const fs = require('fs');
const files = ['public/stamspolning.html', 'public/relining.html', 'public/rorinspektion.html'];

for (let file of files) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');

    // 1. Change section class to avoid green border from style.css
    html = html.replace(/<section class="service-cta" (style="background: #0284c7;)/g, '<section class="bottom-service-cta" $1');
    html = html.replace(/\.service-cta h2, \.service-cta p/g, '.bottom-service-cta h2, .bottom-service-cta p');
    html = html.replace(/\.service-cta p {/g, '.bottom-service-cta p {');
    html = html.replace(/\.service-cta:hover {/g, '.bottom-service-cta:hover {');

    // 2. Make buttons side-by-side on mobile and adjust sizing
    html = html.replace(/flex-wrap: wrap;/g, 'flex-wrap: nowrap;');
    
    // 3. Update the media query for the CTA heading to also include button scaling
    const oldStyle = '<style>@media (max-width: 768px) { .cta-heading { white-space: normal !important; } }</style>';
    const newStyle = '<style>@media (max-width: 768px) { .cta-heading { white-space: normal !important; } .cta-buttons { flex-wrap: nowrap !important; gap: 0.5rem !important; width: 100%; } .cta-buttons .cta-btn-header-match { font-size: 0.85rem !important; padding: 12px 5px !important; flex: 1; text-align: center; justify-content: center; width: 100%; box-sizing: border-box; white-space: normal !important; line-height: 1.2; } }</style>';
    html = html.replace(oldStyle, newStyle);

    fs.writeFileSync(file, html, 'utf8');
    console.log('Fixed CTA in ' + file);
}
