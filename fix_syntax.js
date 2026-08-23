const fs = require('fs');

function fixSyntax(file) {
  let c = fs.readFileSync(file, 'utf8');
  
  // Find the exact place where the extra </div> is
  // It's just before </div>\n      </div>\n      <article
  
  c = c.replace(/\n\s*\}\)\}\s*<\/div>\s*<\/div>\s*<article/, '\n                        )}\n      </div>\n      <article');
  
  fs.writeFileSync(file, c);
  console.log('Fixed syntax in ' + file);
}

fixSyntax('src/app/projekt/[slug]/page.tsx');
fixSyntax('src/app/kunskapsbanken/[slug]/page.tsx');
