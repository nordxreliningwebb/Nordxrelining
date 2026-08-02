const fs = require('fs');
const path = require('path');

// 1. Fix CSS
const cssFile = 'public/style.css';
let css = fs.readFileSync(cssFile, 'utf8');
const blocks = css.split('}');
for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    if (b.includes('uppercase') && (b.includes('.btn') || b.includes('button') || b.includes('.cta'))) {
        // Double check it's not a section title or something else
        if (!b.includes('.section-title') && !b.includes('subtitle') && !b.includes('.nav') && !b.includes('label')) {
            blocks[i] = b.replace(/text-transform:\s*uppercase\s*!?;/g, '/* removed uppercase */');
        }
    }
}
fs.writeFileSync(cssFile, blocks.join('}'), 'utf8');
console.log('Fixed CSS');

// 2. Fix HTML
const replacements = {
    '>KONTAKT<': '>Kontakt<',
    '>KONTAKTA OSS IDAG<': '>Kontakta oss idag<',
    '>KONTAKTA OSS FÖR OFFERT<': '>Kontakta oss för offert<',
    '>BOKA EN RÖRINSPEKTION<': '>Boka en rörinspektion<',
    '>BOKA EN STAMSPOLNING<': '>Boka en stamspolning<',
    '>SKAPA EN OFFERTFÖRFRÅGAN<': '>Skapa en offertförfrågan<',
    '>LÄS ALLA RECENSIONER PÅ GOOGLE<': '>Läs alla recensioner på Google<',
    '>ALLA PROJEKT<': '>Alla projekt<',
    '>BEGÄR OFFERT<': '>Begär offert<',
    '>SKICKA ANSÖKAN<': '>Skicka ansökan<',
    '>SE LEDIGA TJÄNSTER<': '>Se lediga tjänster<',
    '>VISA TJÄNST<': '>Visa tjänst<',
    '>LÄS MER<': '>Läs mer<',
    '>FÅ HJÄLP MED RITNINGAR<': '>Få hjälp med ritningar<',
    '>VÄLJ FIL<': '>Välj fil<',
    '>SKICKA IN<': '>Skicka in<',
    '>TILLBAKA<': '>Tillbaka<',
    '>RING NU<': '>Ring nu<',
    '>FÅ EN SÄKERHETSBEDÖMNING<': '>Få en säkerhetsbedömning<'
};

const files = fs.readdirSync('public').filter(f => f.endsWith('.html'));
for (let f of files) {
    const filePath = path.join('public', f);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [upper, sentence] of Object.entries(replacements)) {
        if (html.includes(upper)) {
            // Use regex to replace globally in the file
            const regex = new RegExp(upper.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            html = html.replace(regex, sentence);
            changed = true;
        }
    }
    // Also catch some that might have newlines or spaces before the <
    // E.g. "SKAPA EN OFFERTFÖRFRÅGAN" without the > < brackets
    const looseReplacements = {
        'SKAPA EN OFFERTFÖRFRÅGAN': 'Skapa en offertförfrågan',
        'BOKA EN RÖRINSPEKTION': 'Boka en rörinspektion',
        'BOKA EN STAMSPOLNING': 'Boka en stamspolning',
        'ALLA PROJEKT': 'Alla projekt'
    };
    for (const [upper, sentence] of Object.entries(looseReplacements)) {
        if (html.includes(upper)) {
            const regex = new RegExp(upper, 'g');
            html = html.replace(regex, sentence);
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Fixed HTML: ' + f);
    }
}
