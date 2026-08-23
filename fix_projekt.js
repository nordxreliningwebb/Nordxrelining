const fs = require('fs');

function processFile(file) {
  let c = fs.readFileSync(file, 'utf8');

  // Fix Hero Styling
  c = c.replace('className="relative z-10 p-8 md:p-12 w-full max-w-4xl flex flex-col gap-4"', 'className="relative z-10 w-full max-w-4xl flex flex-col gap-4" style={{ padding: "2.5rem 1.5rem", paddingBottom: "2rem" }}');
  c = c.replace('<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-snug max-w-4xl">', '<h1 className="font-extrabold text-white tracking-tight leading-snug max-w-4xl" style={{ fontSize: "2.5rem", lineHeight: "1.2", marginBottom: "0.5rem" }}>');
  c = c.replace('<p className="text-lg md:text-xl text-gray-200 font-light mt-2 max-w-3xl">', '<p className="text-gray-200 font-light max-w-3xl" style={{ fontSize: "1.125rem" }}>');

  // Fix main padding
  c = c.replace('<main id="main-content" className="w-full">', '<main id="main-content" className="w-full" style={{ marginTop: "-85px", paddingTop: "115px" }}>');

  // Move "Projektfakta" and "Innehåll" to be on top in mobile view
  // First, we extract the Projektfakta block
  let projectFaktaMatch = c.match(/\{\/\* PROJEKTFAKTA \*\/\}[\s\S]*?\{\/\* PROJEKTLEDARE \*\/\}/);
  let tocMatch = c.match(/\{\/\* INNEHÅLL \*\/\}[\s\S]*?<\/div>\s*\)\}\s*<\/div>\s*<\/aside>/);

  if (projectFaktaMatch && tocMatch) {
    let projectFakta = projectFaktaMatch[0].replace('{/* PROJEKTLEDARE */}', '').trim();
    let toc = tocMatch[0].replace(/<\/div>\s*<\/aside>/, '').trim();

    // We can add a mobile-only div BEFORE the article
    let articleMatch = c.match(/<article className="lg:col-span-2[^>]*>[\s\S]*?<\/article>/);
    if (articleMatch) {
      let articleStr = articleMatch[0];
      
      let mobileInfoBlocks = `
      {/* MOBILE INFO BLOCKS */}
      <div className="lg:hidden flex flex-col gap-6 mb-8 w-full">
        ${projectFakta}
        ${toc}
      </div>
      `;
      c = c.replace(articleStr, mobileInfoBlocks + '\n' + articleStr);
      
      // Hide the desktop ones on mobile by adding hidden lg:block to them
      c = c.replace('{/* PROJEKTFAKTA */}', '{/* PROJEKTFAKTA */}\n<div className="hidden lg:block w-full">');
      // Wait, there's already a div with className="w-full sidebar-anim-1".
      c = c.replace('<div className="w-full sidebar-anim-1">', '<div className="hidden lg:block w-full sidebar-anim-1">');
      // And for TOC:
      c = c.replace('<div className="w-full sidebar-anim-3">', '<div className="hidden lg:block w-full sidebar-anim-3">');
    }
  }

  fs.writeFileSync(file, c);
  console.log('Fixed ' + file);
}

processFile('src/app/projekt/[slug]/page.tsx');
try {
  processFile('src/app/kunskapsbanken/[slug]/page.tsx');
} catch (e) {
  console.log('Could not process kunskapsbanken: ' + e.message);
}
