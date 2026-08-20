const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

if (!content.includes('<ProjectSliderLogic />')) {
    content = content.replace(/<div className="projects-preview-cta">([\s\S]*?)<\/section>/, '<div className="projects-preview-cta">$1\n<ProjectSliderLogic />\n</section>');
    fs.writeFileSync('src/app/page.tsx', content, 'utf8');
    console.log('Injected ProjectSliderLogic into page.tsx');
} else {
    console.log('Already injected.');
}
