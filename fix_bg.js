const fs = require('fs');

const files = [
    'src/app/projekt/[slug]/page.tsx',
    'src/app/kunskapsbanken/[slug]/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Find the background shorthand and replace it with backgroundImage and backgroundRepeat
        content = content.replace(
            /background: `linear-gradient\(rgba\(15, 23, 42, 0\.6\), rgba\(15, 23, 42, 0\.6\)\), url\('\$\{bgImage\}'\)`/g,
            "backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('${bgImage}')`, backgroundRepeat: 'no-repeat'"
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
