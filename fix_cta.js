const fs = require('fs');
let c = fs.readFileSync('src/app/priser/page.tsx', 'utf8');

const regex = /plan\.cta_link \|\|/g;
const replacement = "(plan.cta_link ? (plan.cta_link.match(/^[0-9+\\s-]+$/) ? 'tel:' + plan.cta_link.replace(/\\s+/g, '') : plan.cta_link) : null) ||";

c = c.replace(regex, replacement);

fs.writeFileSync('src/app/priser/page.tsx', c);
console.log('Replaced');
