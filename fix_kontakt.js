const fs = require('fs');
let c = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');
c = c.replace(
  '<main id="main-content">',
  '<main id="main-content" style={{ backgroundColor: "#faf8f5", marginTop: "-85px", paddingTop: "85px" }}>'
);
fs.writeFileSync('src/app/kontakt/page.tsx', c);
