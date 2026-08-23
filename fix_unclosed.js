const fs = require('fs');

function fix(file) {
  let c = fs.readFileSync(file, 'utf8');
  
  // Remove the extraneous unclosed tag I accidentally inserted
  c = c.replace('{/* PROJEKTFAKTA */}\n<div className="hidden lg:block w-full">\n                        <div className="hidden lg:block w-full sidebar-anim-1">', 
                '{/* PROJEKTFAKTA */}\n                        <div className="w-full sidebar-anim-1">');
                
  // Let's make sure the mobile block doesn't have "hidden lg:block" classes!
  // In the mobile block, we want them visible on mobile, so no "hidden lg:block".
  // The first occurrence of sidebar-anim-1 and sidebar-anim-3 are now in the mobile block.
  
  fs.writeFileSync(file, c);
  console.log('Fixed ' + file);
}

fix('src/app/projekt/[slug]/page.tsx');
fix('src/app/kunskapsbanken/[slug]/page.tsx');
