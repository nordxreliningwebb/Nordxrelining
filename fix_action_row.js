const fs = require('fs');

let html = fs.readFileSync('public/kalkylator.html', 'utf8');

const newCSS = `
        @media (max-width: 768px) {
            .action-row .btn-back, 
            .action-row .btn-primary {
                flex: 1;
                justify-content: center;
                text-align: center;
                white-space: nowrap;
                padding-left: 5px;
                padding-right: 5px;
            }
            .action-row {
                gap: 10px; /* Reduce gap on mobile to give buttons more space */
            }
        }
    </style>`;

html = html.replace('    </style>', newCSS);
fs.writeFileSync('public/kalkylator.html', html, 'utf8');
console.log('Fixed action row mobile styles');
