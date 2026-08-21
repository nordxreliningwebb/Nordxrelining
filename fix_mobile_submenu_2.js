const fs = require('fs');

let c = fs.readFileSync('src/components/FrontendLayout.tsx', 'utf8');

c = c.replace(
  /      \/\/ Initialize Scroll Animations/,
  `      // Mobile submenu toggle logic
      const mobileSubmenuToggle = document.getElementById('mobile-submenu-toggle');
      const toggleSubmenu = (e) => {
        e.preventDefault();
        const parent = mobileSubmenuToggle?.parentElement;
        if (parent) {
          parent.classList.toggle('active');
        }
      };
      
      if (mobileSubmenuToggle) {
        mobileSubmenuToggle.addEventListener('click', toggleSubmenu);
      }

      // Initialize Scroll Animations`
);

fs.writeFileSync('src/components/FrontendLayout.tsx', c);
