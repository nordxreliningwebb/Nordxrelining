const fs = require('fs');

const files = ['public/stamspolning.html', 'public/relining.html', 'public/rorinspektion.html'];
const regex = /<div style="position: absolute; right: 10px; top: -20px;[^>]*>(\d+)<\/div>\s*<div style="display: flex; gap: 1\.5rem; position: relative; z-index: 2;">\s*<div style="flex-shrink: 0; margin-top: 0\.3rem;">\s*<div style="width: 32px;[^>]*>\s*<div style="width: 8px;[^>]*><\/div>\s*<\/div>\s*<\/div>\s*<div>/g;

const replacement = `<div style="display: block; position: relative; z-index: 2;">
                            <div>
                                <div style="font-size: 0.85rem; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.5rem;">Steg $1</div>`;

for (let file of files) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');
    
    let matches = html.match(regex);
    if (matches) {
        console.log(`Found ${matches.length} matches in ${file}`);
    } else {
        console.log(`No matches in ${file}`);
    }

    html = html.replace(regex, replacement);
    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated ' + file);
}

let css = fs.readFileSync('public/style.css', 'utf8');
css = css.replace(/\.intro-text-block, \.steps-text-block \{\s*padding-right: 70px !important;\s*\}/g, '.intro-text-block, .steps-text-block {\n    padding-right: 70px !important;\n    padding-left: 15px !important;\n  }');
css = css.replace(/\.intro-text-block, \.steps-text-block \{\s*padding-right: 85px !important;\s*\}/g, '.intro-text-block, .steps-text-block {\n    padding-right: 85px !important;\n    padding-left: 15px !important;\n  }');
fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Updated style.css');
