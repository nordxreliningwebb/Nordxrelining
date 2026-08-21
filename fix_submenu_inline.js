const fs = require('fs');

let c = fs.readFileSync('src/components/FrontendLayout.tsx', 'utf8');

// Replace the mobile-submenu ul to use inline style instead of CSS class selector
c = c.replace(
  /<ul className="mobile-submenu" id="mobile-tjanster-submenu">/,
  `<ul className="mobile-submenu" id="mobile-tjanster-submenu" style={{ maxHeight: isMobileSubmenuOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease-out' }}>`
);

fs.writeFileSync('src/components/FrontendLayout.tsx', c);
console.log('Done! Lines with mobile-submenu:');
const lines = c.split('\n');
lines.forEach((line, i) => {
  if (line.includes('mobile-submenu')) {
    console.log((i+1) + ': ' + line.trim().substring(0, 120));
  }
});
