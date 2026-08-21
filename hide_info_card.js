const fs = require('fs');

let c = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');

c = c.replace(
  /padding-top: 94px !important;\r?\n            }\r?\n        }\r?\n    `}} \/>/,
  `padding-top: 94px !important;
            }
            .contact-info-card {
                display: none !important;
            }
        }
    \`}} />`
);

fs.writeFileSync('src/app/kontakt/page.tsx', c);
