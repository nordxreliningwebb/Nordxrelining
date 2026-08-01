const fs = require('fs');
let c = fs.readFileSync('public/kontakt.html', 'utf8');

c = c.replace(
    /<h2 class="contact-subheading">.*?<\/h2>/g,
    '<h2 class="contact-subheading">Välkommen att kontakta oss med dina frågor och funderingar, eller om du behöver hjälp med ditt rörsystem.</h2>'
);

c = c.replace(
    /placeholder="Beskriv ditt ärende[^"]*"/g,
    'placeholder="Beskriv ditt ärende"'
);

fs.writeFileSync('public/kontakt.html', c, 'utf8');
console.log('Updated subtitle and placeholder');
