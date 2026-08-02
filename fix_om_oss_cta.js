const fs = require('fs');
const file = 'public/om-oss.html';
let html = fs.readFileSync(file, 'utf8');

// 1. Fix the green border and rounded corners on the section
html = html.replace(/<section class="service-cta" style="([^"]*)"/g, '<section class="service-cta" style="$1 border: none !important; border-radius: 0 !important;"');

// 2. Add media query to ensure buttons are side-by-side
const cssToInsert = `
            @media (max-width: 600px) {
                .service-cta .cta-buttons {
                    flex-wrap: nowrap !important;
                    gap: 0.5rem !important;
                }
                .service-cta .cta-btn-header-match {
                    padding: 0.75rem 0.5rem !important;
                    font-size: 0.85rem !important;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1.2;
                }
            }
`;

html = html.replace(/(\.service-cta:hover\s*{[^}]+}\s*)<\/style>/, `$1${cssToInsert}</style>`);

fs.writeFileSync(file, html, 'utf8');
console.log('Fixed CTA section border and buttons');
