const fs = require('fs');
const path = require('path');

const kontaktPath = path.join(__dirname, 'public', 'kontakt.html');
let content = fs.readFileSync(kontaktPath, 'utf8');

// 1. Remove breadcrumbs
content = content.replace(/<nav class="breadcrumbs"[\s\S]*?<\/nav>\s*/g, '');

// 2. Change Title
content = content.replace(
    /<h1>Kontakta oss för relining & rörinspektion<\/h1>/g,
    '<h1 class="section-title" style="margin-bottom:15px; color:#111111;">Kontakta oss</h1>'
);

// 3. Change Subheading
content = content.replace(
    /<h2 class="contact-subheading">Få hjälp med relining, stamspolning och rörinspektion i hela Sverige<\/h2>/g,
    '<h2 class="contact-subheading">Har du frågor eller vill boka in ett kostnadsfritt platsbesök? Tveka inte att höra av dig – vi hjälper dig gärna!</h2>'
);

// 4. Fix the SEO block which currently has mojibake because of the previous bad powershell script
// First, we need to match the currently corrupted SEO block.
// Since it might have mojibake, let's just match everything from <div class="seo-text-block"> to </section>
const newSeo = `
                    <div class="seo-text-block">
                        <h2 class="section-title" style="font-size: 2.2rem; margin-bottom: 25px; color:#111111;">Din trygga partner för avlopp och rörsystem</h2>
                        <p>På Nordx Relining har vi lång erfarenhet av att underhålla och renovera rörsystem för både privatpersoner, företag och bostadsrättsföreningar. Vi erbjuder helhetslösningar inom avloppsteknik för att förlänga livslängden på din fastighet och förebygga dyra vattenskador.</p>
                        
                        <p>Våra huvudsakliga tjänster inkluderar:</p>
                        <ul style="margin-bottom: 25px; list-style-type: disc; padding-left: 20px; display:flex; flex-direction:column; gap:10px;">
                            <li><strong><a href="stamspolning.html" style="color: #0284c7; text-decoration: underline;">Stamspolning</a></strong>: Förebyggande underhåll som avlägsnar fett och beläggningar, vilket minskar risken för akuta stopp och ökar flödet i rören.</li>
                            <li><strong><a href="rorinspektion.html" style="color: #0284c7; text-decoration: underline;">Rörinspektion</a></strong>: Avancerad kamerateknik för att upptäcka sprickor, förslitningar och dolda problem inuti avloppssystemet.</li>
                            <li><strong><a href="relining.html" style="color: #0284c7; text-decoration: underline;">Relining</a></strong>: Ett kostnadseffektivt alternativ till stambyte där vi bygger nya, självbärande rör inuti de befintliga.</li>
                        </ul>
                        
                        <p>Oavsett om du behöver akut hjälp med avloppsrensning eller vill planera in en statuskontroll inför en eventuell relining, levererar vi teknisk precision och expertvägledning. Vi arbetar med marknadens bästa material och lämnar alltid 20 års garanti på vårt reliningsarbete.</p>
                    </div>

                    <div class="contact-checklist">
                        <h3>När ska du kontakta oss?</h3>
                        <ul>
                            <li>Vid återkommande stopp i avloppet</li>
                            <li>För planerat underhåll (stamspolning)</li>
                            <li>Inför ett misstänkt stambytesbehov</li>
                            <li>För fuktmätning och läcksökning</li>
                            <li>Kostnadsfri konsultation och offert</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
`;

content = content.replace(/<div class="seo-text-block">[\s\S]*?<\/section>/g, newSeo.trim());

fs.writeFileSync(kontaktPath, content, 'utf8');

const stylePath = path.join(__dirname, 'public', 'style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');
styleContent = styleContent.replace(/content: '\\\\2713';/g, "content: '\\2713';");
fs.writeFileSync(stylePath, styleContent, 'utf8');

console.log('Fixed everything in node');
