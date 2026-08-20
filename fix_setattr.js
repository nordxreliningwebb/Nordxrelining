const fs = require('fs');

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/setAttribute\('height', Math\.max\(([^)]+)\)\)/g, "setAttribute('height', String(Math.max($1)))");
    fs.writeFileSync(file, content);
}

fixFile('src/app/relining/ReliningClientLogic.tsx');
fixFile('src/app/rorinspektion/RorinspektionClientLogic.tsx');
