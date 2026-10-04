const fs = require('fs');
let c = fs.readFileSync('src/app/page.tsx', 'utf8');
c = c.replace(/valkommen.jpeg/g, 'valkommen-opt.jpeg');
fs.writeFileSync('src/app/page.tsx', c);
