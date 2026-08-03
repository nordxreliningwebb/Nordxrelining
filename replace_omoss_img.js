const fs = require('fs');

let html = fs.readFileSync('public/om-oss.html', 'utf8');

html = html.replace('src="nordxrelining.jpeg"', 'src="epoxy%20relining.jpeg"');

fs.writeFileSync('public/om-oss.html', html, 'utf8');
console.log('Image replaced successfully.');
