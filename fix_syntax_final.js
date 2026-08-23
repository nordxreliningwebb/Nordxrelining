const fs = require('fs');

function removeUnclosedTag(file) {
  if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');
    c = c.replace(
      /\{\/\*\s*PROJEKTFAKTA\s*\*\/\}\s*<div className="hidden lg:block w-full">/g,
      '{/* PROJEKTFAKTA */}'
    );
    c = c.replace(
      /\{\/\*\s*INNEHÅLL\s*\*\/\}\s*<div className="hidden lg:block w-full">/g,
      '{/* INNEHÅLL */}'
    );
    fs.writeFileSync(file, c);
    console.log("Fixed: " + file);
  }
}

removeUnclosedTag('src/app/projekt/[slug]/page.tsx');
removeUnclosedTag('src/app/kunskapsbanken/[slug]/page.tsx');
