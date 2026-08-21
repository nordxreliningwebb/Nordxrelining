const fs = require('fs');

// 1. Update FrontendLayout.tsx
let f1 = 'src/components/FrontendLayout.tsx';
let c1 = fs.readFileSync(f1, 'utf8');

c1 = c1.replace(
  '<li className="mobile-menu-link" style={{ padding: "0.5rem 2rem", marginBottom: "1rem" }}>\n                      <LanguageSwitcher />\n                  </li>\n                  <li className="has-submenu">',
  '<li className="has-submenu">'
);

c1 = c1.replace(
  '<li><Link href="/kontakt" className="mobile-menu-link">Kontakt</Link></li>\n              </ul>',
  '<li><Link href="/kontakt" className="mobile-menu-link">Kontakt</Link></li>\n                  <li className="mobile-language-switcher-container">\n                      <LanguageSwitcher />\n                  </li>\n              </ul>'
);
fs.writeFileSync(f1, c1);

// 2. Update style.css
let f2 = 'public/style.css';
let c2 = fs.readFileSync(f2, 'utf8');
c2 += `
.mobile-drawer-menu .globe-icon {
    color: #111111 !important;
}
.mobile-language-switcher-container {
    padding: 2rem;
    display: flex;
    justify-content: center;
    border-top: 1px solid rgba(0,0,0,0.05);
}
.mobile-language-switcher-container .language-switcher-container {
    margin-right: 0 !important;
}
`;
fs.writeFileSync(f2, c2);
