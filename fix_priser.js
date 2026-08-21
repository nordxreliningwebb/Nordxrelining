const fs = require('fs');
let c = fs.readFileSync('src/app/priser/page.tsx', 'utf8');
c = c.replace(
  '<main id="main-content" className="w-full flex flex-col items-center overflow-hidden">',
  '<main id="main-content" className="w-full flex flex-col items-center overflow-hidden" style={{ backgroundColor: "#faf8f5", marginTop: "-85px", paddingTop: "85px" }}>'
);
fs.writeFileSync('src/app/priser/page.tsx', c);
