const fs = require('fs');
let f = 'src/components/FrontendLayout.tsx';
let c = fs.readFileSync(f, 'utf8');

c = c.replace(
  '<div className="header-cta" style={{ display: "flex", alignItems: "center" }}>',
  '<div className="header-cta desktop-only-cta">'
);

c = c.replace(
  '<ul className="mobile-menu-list">',
  '<ul className="mobile-menu-list">\n                <li className="mobile-menu-link" style={{ padding: "0.5rem 2rem", marginBottom: "1rem" }}>\n                    <LanguageSwitcher />\n                </li>'
);

fs.writeFileSync(f, c);
