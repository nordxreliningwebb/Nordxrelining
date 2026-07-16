const fs = require('fs');
let html = fs.readFileSync('public/stamspolning.html', 'utf-8');

const oldTextRegex = /<div class="service-text">.*?<\/ul>\s*<\/div>/s;

const newText = `
    <div class="service-text">
        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: #0f172a;">Varför behöver man stamspolning?</h2>
        <p style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 1.5rem;">Stamspolning är den överlägset mest effektiva och skonsamma metoden för att underhålla och rengöra en fastighets avloppssystem. Med tiden samlas stora mängder fett, hår, kalk, tvålrester och rost i rören – särskilt i äldre gjutjärnsrör från sekelskiftet eller miljonprogrammet. Dessa avlagringar minskar rörets innerdiameter och skapar en skrovlig yta där smuts lätt fastnar.</p>
        <p style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 2rem;">Genom att boka in en professionell stamspolning med hetvatten återställs flödet i rören, vilket direkt minskar risken för akuta stopp och de dyra vattenskador som ofta följer. Branschstandarden rekommenderar förebyggande stamspolning var 3–5:e år för att maximera rörens livslängd och skjuta upp behovet av stambyte eller relining.</p>

        <h3 style="font-size: 1.75rem; margin-bottom: 1rem; color: #0f172a; padding-top: 1rem; border-top: 1px solid #e2e8f0;">Så här går det till – Steg för Steg</h3>
        <p style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 1.5rem;">När vi på Nordx Relining utför ett arbete följer vi alltid en strikt branschstandard. Arbetet kräver oftast tillträde till fastighetens samtliga lägenheter för att hela stammen ska bli garanterat ren.</p>
        
        <div class="process-steps-container" style="margin-bottom: 2.5rem;">
            <div class="process-step" style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div style="background: #0284c7; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
                <div>
                    <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #0f172a;">Förberedelser & Källaren</h4>
                    <p style="line-height: 1.6; color: #475569; margin:0;">Arbetet inleds alltid längst ner i fastigheten. Vi inspekterar rensluckor och spolar bottenavloppet (uppsamlingsledningen) hela vägen ut till den kommunala huvudledningen. Detta är kritiskt för att det smuts vi senare spolar loss uppifrån fritt ska kunna rinna undan utan att orsaka stopp i källaren.</p>
                </div>
            </div>
            <div class="process-step" style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div style="background: #0284c7; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
                <div>
                    <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #0f172a;">Spolning av lägenheter</h4>
                    <p style="line-height: 1.6; color: #475569; margin:0;">Våra tekniker arbetar sig metodiskt uppåt i fastigheten, våning för våning. Från varje lägenhet spolas anslutande stickledningar (köksavlopp, handfat, golvbrunn) ut mot den stående stammen.</p>
                </div>
            </div>
            <div class="process-step" style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div style="background: #0284c7; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
                <div>
                    <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #0f172a;">Högtryck & Hetvatten</h4>
                    <p style="line-height: 1.6; color: #475569; margin:0;">Vi använder specialanpassade roterande munstycken och hett vatten. Det höga trycket skär effektivt genom fett och rost utan att skada rörets material. Slangen förs fram och tillbaka för att säkerställa att rörväggarna blir helt rena, vilket minimerar risken för att framtida beläggningar ska få fäste.</p>
                </div>
            </div>
            <div class="process-step" style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div style="background: #0284c7; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
                <div>
                    <h4 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #0f172a;">Slutkontroll</h4>
                    <p style="line-height: 1.6; color: #475569; margin:0;">Efter avslutad spolning genomförs funktionstester för att verifiera att rörsystemet har återfått sin fulla flödeskapacitet. Vi överlämnar sedan en tydlig dokumentation till fastighetsägaren eller bostadsrättsföreningen.</p>
                </div>
            </div>
        </div>
        
        <h3 style="font-size: 1.75rem; margin-bottom: 1rem; color: #0f172a; padding-top: 1rem; border-top: 1px solid #e2e8f0;">Vanliga Frågor (FAQ)</h3>
        <details style="margin-bottom: 1rem; background: #ffffff; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">
            <summary style="font-weight: 600; font-size: 1.125rem; cursor: pointer; color: #0f172a; list-style-position: inside;">Måste ni ha tillgång till alla lägenheter?</summary>
            <p style="margin-top: 0.75rem; line-height: 1.6; color: #475569; margin-bottom:0;">Ja, för att vi ska kunna garantera ett fullgott resultat krävs det att vi spolar rent stickledningarna (från kök och badrum) inuti varje lägenhet fram till den gemensamma huvudstammen.</p>
        </details>
        <details style="margin-bottom: 1rem; background: #ffffff; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">
            <summary style="font-weight: 600; font-size: 1.125rem; cursor: pointer; color: #0f172a; list-style-position: inside;">Är högtrycksspolning farligt för äldre rör?</summary>
            <p style="margin-top: 0.75rem; line-height: 1.6; color: #475569; margin-bottom:0;">Nej, våra erfarna tekniker anpassar alltid trycket och temperaturen utifrån rörens material och ålder. För gamla gjutjärnsrör använder vi metoder som skonsamt skrapar bort smutsen utan att belasta godset i onödan.</p>
        </details>
        <details style="margin-bottom: 1rem; background: #ffffff; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0;">
            <summary style="font-weight: 600; font-size: 1.125rem; cursor: pointer; color: #0f172a; list-style-position: inside;">Hur ofta bör man genomföra en stamspolning?</summary>
            <p style="margin-top: 0.75rem; line-height: 1.6; color: #475569; margin-bottom:0;">Vi och branschen rekommenderar förebyggande underhåll var tredje till var femte år, beroende på fastighetens ålder och hur avloppssystemet används.</p>
        </details>
    </div>`;

if(oldTextRegex.test(html)) {
    html = html.replace(oldTextRegex, newText);
    fs.writeFileSync('public/stamspolning.html', html, 'utf-8');
    console.log('Stamspolning text updated!');
} else {
    console.log('Regex failed. Could not find <div class="service-text"> block.');
}
