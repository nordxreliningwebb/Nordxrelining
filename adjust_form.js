const fs = require('fs');

let c = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');

c = c.replace(
  /display: none !important;\r?\n            }\r?\n        }\r?\n    `}} \/>/,
  `display: none !important;
            }
            .contact-form-card {
                padding-left: 2.5rem !important;
                padding-right: 2.5rem !important;
            }
            .premium-form .form-group {
                gap: 0.25rem !important;
            }
            .premium-form .form-group label {
                margin-bottom: 0 !important;
            }
        }
    \`}} />`
);

fs.writeFileSync('src/app/kontakt/page.tsx', c);
