const fs = require('fs');

let c = fs.readFileSync('src/components/FrontendLayout.tsx', 'utf8');

c = c.replace(
  /overlay\.addEventListener\('click', closeMenu\);\r?\n      }/,
  `overlay.addEventListener('click', closeMenu);
      }

      // Mobile submenu toggle logic
      const mobileSubmenuToggle = document.getElementById('mobile-submenu-toggle');
      const toggleSubmenu = (e: Event) => {
        e.preventDefault();
        const parent = mobileSubmenuToggle?.parentElement;
        if (parent) {
          parent.classList.toggle('active');
        }
      };
      
      if (mobileSubmenuToggle) {
        mobileSubmenuToggle.addEventListener('click', toggleSubmenu);
      }`
);

fs.writeFileSync('src/components/FrontendLayout.tsx', c);
