const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const replacements = {
    'Ã¥': 'å',
    'Ã¤': 'ä',
    'Ã¶': 'ö',
    'Ã…': 'Å',
    'Ã„': 'Ä',
    'Ã–': 'Ö',
    'Ã©': 'é',
    'Â©': '©',
    'â€“': '–',
    'â€™': '’',
    'â€œ': '“',
    'â€': '”',
    'âˆ’': '−'
};

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const [bad, good] of Object.entries(replacements)) {
        // Global replace using split/join to avoid regex escaping issues with weird chars
        content = content.split(bad).join(good);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed encoding in ${file}`);
        updatedCount++;
    }
});

console.log(`Updated ${updatedCount} files.`);
