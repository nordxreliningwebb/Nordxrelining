const fs = require('fs');

// Fix rorinspektion.html
const rorFile = 'public/rorinspektion.html';
let rorHtml = fs.readFileSync(rorFile, 'utf8');
const rorTarget = '<a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none;">\r\n                        Få en kostnadsfri offert';
const rorTargetFallback = '<a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none;">\n                        Få en kostnadsfri offert';

const rorReplacement = '<a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none; white-space: nowrap;">\n                        Ring oss';

if (rorHtml.includes(rorTarget)) {
    rorHtml = rorHtml.replace(rorTarget, rorReplacement);
} else if (rorHtml.includes(rorTargetFallback)) {
    rorHtml = rorHtml.replace(rorTargetFallback, rorReplacement);
} else {
    // Regex fallback
    rorHtml = rorHtml.replace(/<a href="#kontakt" class="btn btn-primary" style="[^"]*background: #0284c7; border: none;">\s*Få en kostnadsfri offert/g, 
    '<a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none; white-space: nowrap;">\n                        Ring oss');
}
fs.writeFileSync(rorFile, rorHtml, 'utf8');
console.log('Updated rorinspektion.html');

// Fix relining.html
const relFile = 'public/relining.html';
let relHtml = fs.readFileSync(relFile, 'utf8');
const relTarget = '<a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none;">\r\n                        Få en kostnadsfri offert';
const relTargetFallback = '<a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none;">\n                        Få en kostnadsfri offert';

const relReplacement = '<a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none; white-space: nowrap;">\n                        Skapa en offertförfrågan';

if (relHtml.includes(relTarget)) {
    relHtml = relHtml.replace(relTarget, relReplacement);
} else if (relHtml.includes(relTargetFallback)) {
    relHtml = relHtml.replace(relTargetFallback, relReplacement);
} else {
    // Regex fallback
    relHtml = relHtml.replace(/<a href="#kontakt" class="btn btn-primary" style="[^"]*background: #0284c7; border: none;">\s*Få en kostnadsfri offert/g, 
    '<a href="#kontakt" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 8px; padding: 1rem 2rem; background: #0284c7; border: none; white-space: nowrap;">\n                        Skapa en offertförfrågan');
}
fs.writeFileSync(relFile, relHtml, 'utf8');
console.log('Updated relining.html');
