const fs = require('fs');
let html = fs.readFileSync('rorinspektion.html', 'utf8');

// Title and Meta
html = html.replace(/<title>Relining - Nordx Relining<\/title>/g, '<title>Rörinspektion - Nordx Relining</title>');
html = html.replace(/Relining, ett smidigt och kostnadseffektivt alternativ till stambyte/g, 'Rörinspektion – Få stenkoll på dina rör innan problemen växer');
html = html.replace(/Renovera fastighetens avloppsrör inifrån utan dyra och stökiga rivningsarbeten. Med modern infodring får ni helt nya, självbärande rör – snabbt, kostnadseffektivt och med minimal störning för de boende./g, 'Undvik dyra vattenskador och återkommande stopp. Med avancerad kamerateknik filmar vi dina rör från insidan för att upptäcka sprickor, rötter och andra fel innan de orsakar stora problem.');

// Image
html = html.replace(/img_relining\.png/g, 'img_inspection.png');

// Varför sektion
html = html.replace(/Varför välja relining\?/g, 'Varför göra en rörinspektion?');
html = html.replace(/När stammarna börjar bli gamla och slitna är relining ett modernare, snabbare och mer ekonomiskt alternativ till ett traditionellt stambyte./g, 'En rörinspektion är det mest effektiva sättet att ta reda på exakt hur dina rör mår på insidan, och ligger alltid till grund för rätt åtgärd.');
html = html.replace(/Nytt liv åt gamla rör/g, 'Förebygg vattenskador');
html = html.replace(/Vi skapar ett helt nytt, skarvfritt och självbärande rör inuti det gamla, vilket minimerar risken för framtida läckage./g, 'Genom att filma rören kan vi upptäcka små sprickor, förslitningar och inträngande rötter innan de hinner orsaka en dyr vattenskada.');
html = html.replace(/Snabbt &amp; Smidigt/g, 'Hitta roten till stoppet');
html = html.replace(/Ett traditionellt stambyte tar veckor och kräver rivning av hela badrum. Relining är klart på bråkdelen av tiden och de boende kan bo kvar./g, 'Lider fastigheten av återkommande stopp? Med kamerans hjälp ser vi exakt var felet sitter, om det beror på felaktigt fall, fettansamlingar eller byggrester.');
html = html.replace(/Mycket prisvärt/g, 'Komplett protokoll');
html = html.replace(/Utan omfattande rivningsarbeten och återställning blir totalkostnaden för relining ofta mindre än hälften av ett stambyte./g, 'Efter inspektionen får ni en fullständig dokumentation (protokoll enligt T25-standard) och en USB-sticka med filmen, som underlag för eventuella åtgärder.');

// Steg för steg
html = html.replace(/Så här går relining till – Steg för Steg/g, 'Så här går rörinspektionen till – Steg för Steg');
html = html.replace(/För att säkerställa högsta kvalitet följer vi på Nordx Relining alltid branschstandard. Vår arbetsprocess är noggrann, effektiv och helt transparent – från första inspektion till färdigställd dokumentation./g, 'Vi genomför rörinspektioner enligt branschstandard (STVF) för att ge er en trygg, tydlig och helt transparent bild av ert avloppssystems skick.');

html = html.replace(/Rörinspektion &amp; Förstudie/g, 'Åtkomst &amp; Förberedelser');
html = html.replace(/Arbetet inleds med en noggrann rörinspektion. Vi går in i avloppssystemet med avancerade specialkameror för att bedöma rörens kondition, upptäcka eventuella sprickor och säkerställa att relining är en lämplig och långsiktigt hållbar lösning för er fastighet./g, 'Teknikern inleder med att gå igenom fastighetens ritningar och hittar lämpliga rensöppningar för att komma åt rörsystemet. Vi bedömer också om avloppet behöver spolas rent innan inspektionen.');

html = html.replace(/Etablering &amp; Tillfälligt Avlopp/g, 'Eventuell Rengöring (Spolning)');
html = html.replace(/Innan det praktiska arbetet drar igång etablerar vi oss på platsen och skyddstäcker ytorna. För att ni ska kunna bo kvar under renoveringen och få en så smidig vardag som möjligt stänger vi av vattnet och ordnar vid behov med tillfälligt vatten och tillfälliga avlopp, som exempelvis en torrtoalett \(kvarboendetoalett\)./g, 'Kameran ser bäst i rena rör. Vid behov genomför vi en högtrycksspolning innan filmningen påbörjas för att spola bort löst smuts och fett, så att inga skador döljs under beläggningar.');

html = html.replace(/Mekanisk Rengöring &amp; Spolning/g, 'Kamerainspektion (Filmning)');
html = html.replace(/Innan själva infodringen kan påbörjas måste insidan av de gamla rören bli fullständigt ren. Vi använder mekanisk rensning och kraftfull högtrycksspolning för att fräsa bort all rost, kalk, matfett och avlagringar. Rören görs helt plåtrena för att det nya materialet ska fästa perfekt./g, 'Med en avancerad rörinspektionskamera (rörål eller traktor) utrustad med stark LED-belysning och meterräknare åker vi genom rören. Teknikern följer allt live på skärmen.');

html = html.replace(/Infodring \(Strumpmetoden\)/g, 'Analys &amp; Felsökning');
html = html.replace(/Detta är reliningens centrala skede. En flexibel "strumpa" \(liner\) impregnerad med specialframtagen härdplast skjuts eller vrängs in i det gamla röret, ofta med hjälp av tryckluft. Strumpan vecklas ut och pressas med stor kraft mot de gamla rörväggarna så att den formar sig exakt efter rörsystemet./g, 'Under filmningen kartlägger vi rörsystemets skick. Vi identifierar exakt position för eventuella sprickor, hål, rötter, rost, felaktigt fall eller inträngande vatten.');

html = html.replace(/Härdning &amp; Slutkontroll/g, 'Protokoll &amp; Rådgivning');
html = html.replace(/Plasten får därefter härda \(ofta med hjälp av varmvatten, ånga eller UV-ljus\) och bildar inom kort ett helt nytt, stenhårt och skarvfritt rör inuti det gamla. Arbetet avslutas med en mycket noggrann slutkontroll och ny kamerafilmning. Ni får självklart en komplett dokumentation och filmrapport över slutresultatet./g, 'Efter inspektionen sammanställer vi ett tydligt inspektionsprotokoll och överlämnar videoinspelningen. Ni får också våra experters rekommendationer på eventuella åtgärder, som exempelvis relining eller fortsatt regelbundet underhåll.');

// Add inspection camera SVG and styles
const svgStartRegex = /<svg id="dynamic-pipe-canvas"[\s\S]*?<\/svg>/;
const newSvg = `<svg id="dynamic-pipe-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
        <defs id="dynamic-pipe-defs">
            <!-- Glow effect for LED lights -->
            <filter id="led-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <!-- Camera Light Cone Gradient -->
            <linearGradient id="light-cone-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
                <stop offset="40%" stop-color="#bae6fd" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#38bdf8" stop-opacity="0" />
            </linearGradient>
        </defs>

        <style>
            .camera-body { fill: #1e293b; }
            .camera-head { fill: #334155; }
            .camera-lens { fill: #0f172a; stroke: #38bdf8; stroke-width: 2; }
            .camera-led { fill: #ffffff; filter: url(#led-glow); }
            .camera-cable { stroke: #0f172a; stroke-width: 16; stroke-linecap: round; }
            .cable-stripe { stroke: #eab308; stroke-width: 4; stroke-dasharray: 20 20; }
        </style>

        <!-- The dynamically drawn pipe path -->
        <g id="dynamic-pipe-group"></g>

        <!-- Rörålen (kabeln) som följer efter kameran -->
        <g id="camera-cable-group">
            <path id="camera-cable-path" d="" fill="none" class="camera-cable" />
            <!-- Gul varningsrand längs kabeln -->
            <path id="camera-cable-stripe" d="" fill="none" class="cable-stripe" />
        </g>
        
        <!-- Själva kamerahuvudet -->
        <g id="dynamic-nozzle" style="opacity: 0; transform-origin: 100px 0;">
             <!-- Ljuskäglan framför kameran -->
             <path d="M 75 40 L -20 400 Q 100 450 220 400 Z" fill="url(#light-cone-gradient)" />
             
             <!-- Kabelanslutning (nacke) -->
             <rect x="92" y="-30" width="16" height="40" class="camera-body" />
             <!-- Fjäder (för att runda böjar) -->
             <path d="M 90 -20 Q 85 -10 110 0 T 90 15" stroke="#94a3b8" stroke-width="4" fill="none" opacity="0.8" />
             
             <!-- Kamerakropp (rostfritt / svart plast) -->
             <rect x="80" y="10" width="40" height="25" rx="5" class="camera-body" />
             <rect x="82" y="15" width="36" height="15" class="camera-head" />
             
             <!-- Kamera-huvud / Linsområde -->
             <path d="M 80 35 L 85 45 L 115 45 L 120 35 Z" fill="#475569" />
             <circle cx="100" cy="45" r="8" class="camera-lens" />
             
             <!-- LED-lampor runt linsen -->
             <circle cx="85" cy="42" r="3" class="camera-led" />
             <circle cx="115" cy="42" r="3" class="camera-led" />
             <circle cx="92" cy="48" r="2" class="camera-led" />
             <circle cx="108" cy="48" r="2" class="camera-led" />
        </g>
    </svg>`;

html = html.replace(svgStartRegex, newSvg);

// Update JS for Camera Animation
const jsStartRegex = /<script>[\s\S]*?<\/script>/;
const newJs = `<script>
        // Lyssna på när rör-animationen (main.js) flyttar kameran (via style.transform)
        document.addEventListener('DOMContentLoaded', () => {
            const camera = document.getElementById('dynamic-nozzle');
            const cablePath = document.getElementById('camera-cable-path');
            const stripePath = document.getElementById('camera-cable-stripe');
            
            if(camera && cablePath && stripePath) {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.attributeName === 'style' || mutation.attributeName === 'transform') {
                            const transformStr = camera.style.transform || camera.getAttribute('transform');
                            if(transformStr) {
                                const match = transformStr.match(/translate\\(([^,]+),\\s*([^)]+)\\)/);
                                if(match && match[1] && match[2]) {
                                    const x = parseFloat(match[1]);
                                    const y = parseFloat(match[2]);
                                    
                                    // Förenklad rörål: En rak linje från Y=0 ner till kameran
                                    const cameraCenterX = x + 100;
                                    
                                    // Rita en vertikal kabel ner till kameran
                                    const d = \`M \${cameraCenterX} 0 L \${cameraCenterX} \${y - 20}\`;
                                    cablePath.setAttribute('d', d);
                                    stripePath.setAttribute('d', d);
                                }
                            }
                        }
                    });
                });
                observer.observe(camera, { attributes: true, attributeFilter: ['style', 'transform'] });
            }
        });
    </script>`;
    
html = html.replace(jsStartRegex, newJs);

fs.writeFileSync('rorinspektion.html', html);
console.log('Successfully updated rorinspektion.html');
