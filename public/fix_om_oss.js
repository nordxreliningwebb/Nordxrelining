const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('href="#om-oss"')) {
        content = content.replace(/href="#om-oss"/g, 'href="om-oss.html"');
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
