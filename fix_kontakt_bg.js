const fs = require('fs');
let c = fs.readFileSync('public/kontakt.html', 'utf8');

c = c.replace(
    '<section class="contact-hero-section global-subpage-hero">',
    '<section class="contact-hero-section" style="padding-top: 160px; background-color: #faf8f5;">'
);

fs.writeFileSync('public/kontakt.html', c, 'utf8');
console.log('Updated padding and background color');
