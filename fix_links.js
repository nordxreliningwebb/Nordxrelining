const fs = require('fs');
['src/components/FrontendLayout.tsx', 'src/app/page.tsx'].forEach(file => {
    if (fs.existsSync(file)) {
        let text = fs.readFileSync(file, 'utf8');
        text = text.replace(/href="\/([a-zA-Z0-9-]+)\.html"/g, 'href="/$1"');
        text = text.replace(/href="([a-zA-Z0-9-]+)\.html"/g, 'href="/$1"');
        fs.writeFileSync(file, text, 'utf8');
        console.log('Fixed links in ' + file);
    }
});
