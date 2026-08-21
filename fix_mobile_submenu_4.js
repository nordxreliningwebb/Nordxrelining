const fs = require('fs');

// Fix FrontendLayout.tsx
let c = fs.readFileSync('src/components/FrontendLayout.tsx', 'utf8');

c = c.replace(
  /parent\.classList\.toggle\('active'\);/,
  `mobileSubmenuToggle.classList.toggle('active');`
);

fs.writeFileSync('src/components/FrontendLayout.tsx', c);

// Fix style.css
let css = fs.readFileSync('public/style.css', 'utf8');

if (!css.includes('.mobile-menu-link.active + .mobile-submenu')) {
  css = css.replace(
    /\.mobile-menu-link\.active \.arrow \{\r?\n\s*transform: rotate\(180deg\);\r?\n\s*\}/,
    `.mobile-menu-link.active .arrow {
        transform: rotate(180deg);
    }
    .mobile-menu-link.active + .mobile-submenu {
        max-height: 500px;
    }`
  );
  fs.writeFileSync('public/style.css', css);
}
