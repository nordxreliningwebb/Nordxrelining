const fs = require('fs');

const files = [
    'public/index.html',
    'public/relining.html',
    'public/stamspolning.html',
    'public/rorinspektion.html'
];

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf-8');
    
    // Header Links
    html = html.replace(/<a href="#tjanster">Tjänster<\/a>/gi, '<a href="index.html#tjanster">Tjänster</a>');
    
    // Footer Links (using regex to match safely)
    html = html.replace(/<li><a href="[^"]*?">Stamspolning<\/a><\/li>/gi, '<li><a href="stamspolning.html">Stamspolning</a></li>');
    html = html.replace(/<li><a href="[^"]*?">Relining<\/a><\/li>/gi, '<li><a href="relining.html">Relining</a></li>');
    html = html.replace(/<li><a href="[^"]*?">Rörinspektion<\/a><\/li>/gi, '<li><a href="rorinspektion.html">Rörinspektion</a></li>');
    // Also "RA rinspektion" because of the mangled text in index.html footer
    html = html.replace(/<li><a href="[^"]*?">RA rinspektion<\/a><\/li>/gi, '<li><a href="rorinspektion.html">Rörinspektion</a></li>');
    
    // Service cards in index.html (these are inside <h3>Stamspolning</h3> etc, so we match the card block)
    // Actually simpler:
    if (file === 'public/index.html') {
        html = html.replace(/<h3>Stamspolning<\/h3>[\s\S]*?<a href="[^"]*?"/gi, '<h3>Stamspolning</h3>\n                    <p>Förebygg stopp och vattenskador med regelbunden spolning.</p>\n                    <a href="stamspolning.html"');
        html = html.replace(/<h3>Relining<\/h3>[\s\S]*?<a href="[^"]*?"/gi, '<h3>Relining</h3>\n                    <p>Framtidens rörrenovering. Vi förnyar dina rör inifrån utan att behöva riva upp golv.</p>\n                    <a href="relining.html"');
        html = html.replace(/<h3>Rörinspektion<\/h3>[\s\S]*?<a href="[^"]*?"/gi, '<h3>Rörinspektion</h3>\n                    <p>Noggrann felsökning och dokumentation med modern kamerateknik.</p>\n                    <a href="rorinspektion.html"');
    }
    
    fs.writeFileSync(file, html, 'utf-8');
});

console.log('Links updated');
