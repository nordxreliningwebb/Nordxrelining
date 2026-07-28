const fs = require('fs');
const path = require('path');
const dir = './';

// 1. Ls in index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// 2. Fixa lnkarna i index.html s att de fungerar verallt
indexHtml = indexHtml.replace(/href="#hero"/g, 'href="index.html"');
indexHtml = indexHtml.replace(/href="#tjanster"/g, 'href="index.html#tjanster"');
indexHtml = indexHtml.replace(/href="#kontakt"/g, 'href="index.html#kontakt"');

fs.writeFileSync('index.html', indexHtml);
console.log('Fixed links in index.html');

// 3. Extrahera header och footer frn index.html
const headerRegex = /<header id="main-header" role="banner">[\s\S]*?<\/header>/i;
const footerRegex = /<footer class="complex-footer" role="contentinfo">[\s\S]*?<\/footer>/i;

const headerMatch = indexHtml.match(headerRegex);
const footerMatch = indexHtml.match(footerRegex);

if (!headerMatch || !footerMatch) {
  console.log('Could not find header or footer in index.html');
  process.exit(1);
}

const newHeader = headerMatch[0];
const newFooter = footerMatch[0];

// 4. Ls alla .html filer i public/ (utom index.html)
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

for (const file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  let modified = false;
  
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, newHeader);
    modified = true;
  } else {
      console.log('No header found in ' + file);
  }
  
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, newFooter);
    modified = true;
  } else {
      console.log('No footer found in ' + file);
  }
  
  if (modified) {
    fs.writeFileSync(path.join(dir, file), content);
    console.log('Updated ' + file);
  }
}
