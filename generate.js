const fs = require('fs');

const indexHtml = fs.readFileSync('public/index.html', 'utf-8');

const headerEndIdx = indexHtml.indexOf('</header>') + '</header>'.length;
const footerStartIdx = indexHtml.indexOf('<footer');

const headerPart = indexHtml.substring(0, headerEndIdx) + '\n<main>\n';
const footerPart = '\n</main>\n' + indexHtml.substring(footerStartIdx);

function generatePage(title, h1, text, pageId) {
    const newHeader = headerPart.replace(/<title>.*?<\/title>/, `<title>${title} - Nordx Relining</title>`);
    
    const mainContent = `
    <section class="service-page-hero" style="padding:150px 0 50px 0; background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color:#fff; text-align:center;">
        <div class="container">
            <h1 style="font-size:3rem; margin-bottom:1rem; color:#0fb3ff;">${h1}</h1>
            <p style="font-size:1.2rem; max-width:800px; margin:0 auto; color:#cbd5e1;">${text}</p>
        </div>
    </section>
    <section class="service-page-content" id="${pageId}-content" style="padding:50px 0;">
        <div class="container" id="${pageId}-container">
            <!-- Content will be injected here -->
        </div>
    </section>`;
    
    return newHeader + mainContent + footerPart;
}

const pages = [
    {filename: 'relining.html', title: 'Relining', h1: 'Relining - Framtidens Rörrenovering', text: 'Vi förnyar dina rör inifrån med modern relining-teknik.', id: 'relining'},
    {filename: 'stamspolning.html', title: 'Stamspolning', h1: 'Professionell Stamspolning', text: 'Förebygg stopp och vattenskador med regelbunden stamspolning.', id: 'stamspolning'},
    {filename: 'rorinspektion.html', title: 'Rörinspektion', h1: 'Avancerad Rörinspektion', text: 'Felsökning och dokumentation med modern kamerateknik.', id: 'rorinspektion'}
];

pages.forEach(p => {
    fs.writeFileSync(`public/${p.filename}`, generatePage(p.title, p.h1, p.text, p.id), 'utf-8');
});

console.log('Pages created successfully.');
