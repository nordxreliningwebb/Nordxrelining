const fs = require('fs');
let file = 'src/app/layout.tsx';
let c = fs.readFileSync(file, 'utf8');
c = c.replace(/icon: '\/favicon\.ico'/, "icon: '/favicon.png'");
fs.writeFileSync(file, c);
console.log('Updated layout.tsx');
