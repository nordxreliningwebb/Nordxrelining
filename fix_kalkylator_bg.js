const fs = require('fs');
let c = fs.readFileSync('public/kalkylator.html', 'utf8');

c = c.replace(
    /background: linear-gradient\(-45deg, #e0f2fe, #bae6fd, #f8fafc, #dbeafe\);\s*background-size: 400% 400%;\s*animation: flowingWater 15s ease infinite;/,
    'background: #faf8f5;'
);

fs.writeFileSync('public/kalkylator.html', c, 'utf8');
console.log('Updated kalkylator.html background');
