const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const replacement = `<li class="dropdown" role="none">
                    <a href="index.html#tjanster" role="menuitem" aria-haspopup="true" aria-expanded="false">TJÄNSTER <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 4px; margin-bottom: -1px;"><path d="M6 9l6 6 6-6"/></svg></a>
                    <ul class="dropdown-menu" role="menu">
                        <li role="none"><a href="stamspolning.html" role="menuitem">Stamspolning</a></li>
                        <li role="none"><a href="relining.html" role="menuitem">Relining</a></li>
                        <li role="none"><a href="rorinspektion.html" role="menuitem">Rörinspektion</a></li>
                    </ul>
                </li>`;

let updatedCount = 0;
files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Match the exact old format of the TJÄNSTER nav item
    const regex = /<li role="none">\s*<a href="index\.html#tjanster" role="menuitem">TJ[^<]+<\/a>\s*<\/li>/g;
    
    let newContent = content.replace(regex, replacement);
    
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        updatedCount++;
    }
});
console.log('Updated ' + updatedCount + ' files.');
