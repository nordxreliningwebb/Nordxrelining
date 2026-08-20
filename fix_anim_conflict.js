const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace("className={`project-slider-card ${index === 0 ? 'active ' : ''}anim-fade-up`}", "className={`project-slider-card ${index === 0 ? 'active' : ''}`}");

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Fixed CSS conflict');
