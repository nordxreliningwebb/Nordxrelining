const fs = require('fs');

let f1 = 'src/components/FrontendLayout.tsx';
let c1 = fs.readFileSync(f1, 'utf8');

c1 = c1.replace(
  /<li className="mobile-menu-link" style=\{\{ padding: "0\.5rem 2rem", marginBottom: "1rem" \}\}>\s*<LanguageSwitcher \/>\s*<\/li>/g,
  ''
);

c1 = c1.replace(
  /(<li><Link href="\/kontakt" className="mobile-menu-link">Kontakt<\/Link><\/li>\s*)<\/ul>/g,
  '$1<li className="mobile-language-switcher-container">\n                      <LanguageSwitcher />\n                  </li>\n              </ul>'
);

fs.writeFileSync(f1, c1);
