const fs = require('fs');

function fix(file) {
  let c = fs.readFileSync(file, 'utf8');

  // Fix the mobile block: remove hidden lg:block
  c = c.replace('<div className="hidden lg:block w-full sidebar-anim-1">', '<div className="w-full sidebar-anim-1">');
  c = c.replace('<div className="hidden lg:block w-full sidebar-anim-3">', '<div className="w-full sidebar-anim-3">');

  // Fix the desktop block: add hidden lg:block
  // Since we just removed it from the mobile block, the FIRST occurrence of <div className="w-full sidebar-anim-1"> is now the mobile block.
  // The SECOND occurrence is the desktop block. So we want to replace the SECOND occurrence.
  
  let parts1 = c.split('<div className="w-full sidebar-anim-1">');
  if (parts1.length === 3) {
      c = parts1[0] + '<div className="w-full sidebar-anim-1">' + parts1[1] + '<div className="hidden lg:block w-full sidebar-anim-1">' + parts1[2];
  }

  let parts3 = c.split('<div className="w-full sidebar-anim-3">');
  if (parts3.length === 3) {
      c = parts3[0] + '<div className="w-full sidebar-anim-3">' + parts3[1] + '<div className="hidden lg:block w-full sidebar-anim-3">' + parts3[2];
  }
  
  fs.writeFileSync(file, c);
  console.log('Fixed classes in ' + file);
}

fix('src/app/projekt/[slug]/page.tsx');
fix('src/app/kunskapsbanken/[slug]/page.tsx');
