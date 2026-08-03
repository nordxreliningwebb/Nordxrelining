const fs = require('fs');

let html = fs.readFileSync('public/kalkylator.html', 'utf8');

// Fix heading
html = html.replace(
    '<h2 class="view-title">BRF & Större Fastigheter</h2>',
    '<h2 class="view-title">BRF & större fastigheter</h2>'
);

// Fix CTA button
html = html.replace(
    'Till kontaktformuläret',
    'Kontakta oss'
);

fs.writeFileSync('public/kalkylator.html', html, 'utf8');
console.log('Fixed BRF modal text');
