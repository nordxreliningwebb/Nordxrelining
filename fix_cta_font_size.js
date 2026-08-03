const fs = require('fs');
const files = ['public/stamspolning.html', 'public/relining.html', 'public/rorinspektion.html', 'public/om-oss.html'];

for (let file of files) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');

    // Add font-size: 1.15rem !important; to the mobile media query for CTA buttons
    html = html.replace(/white-space: nowrap !important; \} \}<\/style>/g, 'white-space: nowrap !important; font-size: 1.15rem !important; } }</style>');

    fs.writeFileSync(file, html, 'utf8');
    console.log('Fixed font size in CTA for ' + file);
}
