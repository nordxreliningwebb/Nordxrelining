const fs = require('fs');
const path = require('path');

const filesToFix = [
    'faq.html',
    'index.html',
    'kalkylator.html',
    'om-oss.html',
    'priser.html',
    'projekt.html',
    'relining.html',
    'rorinspektion.html',
    'stamspolning.html',
    'stamspolning_backup2.html'
];

const replacements = [
    { from: /Ã¥/g, to: 'å' },
    { from: /Ã¤/g, to: 'ä' },
    { from: /Ã¶/g, to: 'ö' },
    { from: /Ã…/g, to: 'Å' },
    { from: /Ã„/g, to: 'Ä' },
    { from: /Ã–/g, to: 'Ö' },
    { from: /Ã©/g, to: 'é' },
    { from: /Ã¢â‚¬â€œ/g, to: '–' },
    { from: /Ã¢â€“Â¼/g, to: '▼' },
    { from: /Ã‚Â©/g, to: '©' },
    { from: /Ã¢â‚¬â„¢/g, to: '’' },
    { from: /Ã¢â€žÂ¢/g, to: '™' }
];

let filesFixed = 0;

for (const file of filesToFix) {
    const filePath = path.join(__dirname, 'public', file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        for (const replacement of replacements) {
            content = content.replace(replacement.from, replacement.to);
        }
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Fixed encoding in ${file}`);
            filesFixed++;
        } else {
            console.log(`No encoding issues found in ${file}`);
        }
    } else {
        console.log(`File not found: ${file}`);
    }
}

console.log(`Total files fixed: ${filesFixed}`);
