const fs = require('fs');

let c = fs.readFileSync('public/kontakt.html', 'utf8');

// 1. Title case: add text-transform: none;
c = c.replace(
    'style="margin-bottom:15px; color:#111111;"',
    'style="margin-bottom:15px; color:#111111; text-transform: none;"'
);

// 2. Warranty text
c = c.replace(
    'lämnar alltid 20 års garanti på vårt reliningsarbete.',
    'lämnar alltid 5 års garanti på arbetet och 20 års garanti på materialet.'
);

// 3. Add more reasons to the checklist
const newChecklist = `
                            <li>Vid återkommande stopp i avloppet</li>
                            <li>Dålig lukt eller kluckande ljud från avloppet</li>
                            <li>För planerat underhåll (stamspolning)</li>
                            <li>Misstanke om sprickor eller rötter i rören (rörinspektion)</li>
                            <li>Inför ett misstänkt stambytesbehov</li>
                            <li>Renovering av gamla rör utan att riva (relining)</li>
                            <li>För fuktmätning och läcksökning</li>
                            <li>Kostnadsfri konsultation och offert</li>
`;

c = c.replace(
    /<ul>\s*<li>Vid återkommande stopp i avloppet<\/li>[\s\S]*?<li>Kostnadsfri konsultation och offert<\/li>\s*<\/ul>/,
    `<ul>${newChecklist}                        </ul>`
);

fs.writeFileSync('public/kontakt.html', c, 'utf8');
console.log('Fixed requested changes in kontakt.html');
