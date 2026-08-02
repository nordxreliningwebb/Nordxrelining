const fs = require('fs');

let html = fs.readFileSync('public/projekt.html', 'utf8');

// Title & Meta
html = html.replace('<title>Projekt | Nordx Relining</title>', '<title>Kunskapsbanken | Nordxrelining</title>');
html = html.replace('content="Vi hjälper dig med relining, stamspolning och rörinspektion i hela Sverige. Kontakta Nordx Relining för teknisk rådgivning eller en kostnadsfri offert."', 'content="Läs våra senaste blogginlägg och guider om relining, stamspolning och rörinspektion i Nordxrelinings kunskapsbank."');

// Hero section text
const oldH1 = `<h1 style="font-size: clamp(2rem, 5vw, 3rem); font-family: 'Inter', sans-serif; font-weight: 700; color: #0b0b0b; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.02em;">
                            Projekt
                        </h1>`;
const newH1 = `<h1 style="font-size: clamp(2rem, 5vw, 3rem); font-family: 'Inter', sans-serif; font-weight: 700; color: #0b0b0b; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.02em;">
                            Kunskapsbanken
                        </h1>`;
html = html.replace(oldH1, newH1);

// Just in case there are variations of the h1:
html = html.replace(/<h1[^>]*>[\s\S]*?Projekt[\s\S]*?<\/h1>/, newH1);

html = html.replace('Håll dig uppdaterad med det senaste från Nordx Relining. Här delar vi spännande referensprojekt, insikter från branschen och uppdateringar kring våra relining-, stamspolnings- och rörinspektionsprojekt runt om i Sverige.', 'I vår kunskapsbank delar vi med oss av vår expertis. Läs våra guider, branschnyheter och experttips kring allt som rör stamspolning, relining och rörinspektion för att hålla dina fastigheters rörsystem i toppskick.');

// Featured post
html = html.replace('<span class="category">Relining</span>', '<span class="category">Tips & Råd</span>');
html = html.replace('Stort relining-projekt i Stockholm', '5 tecken på att det är dags för stamspolning');
html = html.replace('Läs om hur vi framgångsrikt renoverade hela rörsystemet för en av Stockholms största bostadsrättsföreningar utan att de boende behövde evakueras.', 'Lukt, dålig avrinning och kluckande ljud? Lär dig de vanligaste varningssignalerna på att rören behöver spolas och hur du förebygger akuta stopp i din fastighet.');

// Filters
html = html.replace('<button class="nordx-filter-btn" data-filter="relining" aria-selected="false">RELINING</button>', '<button class="nordx-filter-btn" data-filter="tips" aria-selected="false">TIPS & RÅD</button>');
html = html.replace('<button class="nordx-filter-btn" data-filter="stamspolning" aria-selected="false">STAMSPOLNING</button>', '<button class="nordx-filter-btn" data-filter="nyheter" aria-selected="false">NYHETER</button>');
html = html.replace('<button class="nordx-filter-btn" data-filter="rorinspektion" aria-selected="false">RÖRINSPEKTION</button>', '<button class="nordx-filter-btn" data-filter="fakta" aria-selected="false">FAKTA</button>');

// Grid Card 1
html = html.replace('data-category="stamspolning"', 'data-category="fakta"');
html = html.replace('<span>Stamspolning</span>', '<span>Fakta</span>');
html = html.replace('<h3>Förebyggande spolning BRF</h3>', '<h3>Vad är relining? En komplett guide</h3>');
html = html.replace('Underhåll av rörsystem för en större fastighet. Optimerat flöde och minskad risk för framtida stopp.', 'Vi går igenom exakt hur relining fungerar, vilka material som används och varför det ofta är ett bättre alternativ än stambyte.');

// Grid Card 2
html = html.replace('data-category="rorinspektion"', 'data-category="tips"');
html = html.replace('<span>Rörinspektion</span>', '<span>Tips & Råd</span>');
html = html.replace('<h3>Rörinspektion efter läckage</h3>', '<h3>Så förlänger du rörens livslängd</h3>');
html = html.replace('Kamerainspektion i en villa där läckage misstänktes. Vi identifierade problemen snabbt och åtgärdade det.', 'Genom proaktivt underhåll och regelbundna inspektioner kan du undvika dyra vattenskador. Här är våra bästa tips.');

// Grid Card 3
html = html.replace('data-category="relining"', 'data-category="nyheter"');
html = html.replace('<span>Relining</span>', '<span>Nyheter</span>');
html = html.replace('<h3>Relining i kommersiell fastighet</h3>', '<h3>Nya branschregler för 2026</h3>');
html = html.replace('Totalrenovering av avloppssystem under pågående verksamhet. Hållbar lösning med minimala störningar.', 'Vi sammanfattar de senaste lagändringarna och regelverken som påverkar fastighetsägare gällande avlopp och miljö.');

// Write to kunskapsbanken.html
fs.writeFileSync('public/kunskapsbanken.html', html, 'utf8');

console.log('kunskapsbanken.html created successfully!');
