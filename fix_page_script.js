const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

if (!content.includes('import ProjectSliderLogic')) {
    content = content.replace('import HomeClientLogic from "@/components/public/HomeClientLogic";', 'import HomeClientLogic from "@/components/public/HomeClientLogic";\nimport ProjectSliderLogic from "@/components/public/ProjectSliderLogic";');
}

if (!content.includes('<ProjectSliderLogic />')) {
    content = content.replace('</section>\n\n{/* CTA SEKTION', '<ProjectSliderLogic />\n        </section>\n\n{/* CTA SEKTION');
}

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Injected ProjectSliderLogic into page.tsx');
