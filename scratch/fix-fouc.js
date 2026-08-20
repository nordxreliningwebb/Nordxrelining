const fs = require('fs');
let file = fs.readFileSync('src/components/FrontendLayout.tsx', 'utf8');

if (!file.includes("import '../../public/style.css';")) {
    file = file.replace("import { usePathname } from 'next/navigation';", "import { usePathname } from 'next/navigation';\nimport '../../public/style.css';");
}

file = file.replace(/<link rel="stylesheet" href="\/style\.css[^>]*>/g, '');

fs.writeFileSync('src/components/FrontendLayout.tsx', file, 'utf8');
console.log('Fixed CSS import to prevent FOUC');
