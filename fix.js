const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');
c = c.replace(/loading="lazy"/g, 'loading="eager"');
fs.writeFileSync('src/app/page.tsx', c);
console.log("Done");
