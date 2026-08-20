const fs = require('fs');
let f = 'src/components/FrontendLayout.tsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(
  "import { usePathname } from 'next/navigation';", 
  "import { usePathname } from 'next/navigation';\nimport LanguageSwitcher from './public/LanguageSwitcher';"
);
c = c.replace(
  '<div className="header-cta">', 
  '<div className="header-cta" style={{ display: "flex", alignItems: "center" }}>\n                <LanguageSwitcher />'
);
fs.writeFileSync(f, c);
