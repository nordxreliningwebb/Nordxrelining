const fs = require('fs');

const cssAdditions = `
/* --- Fix for Light Theme on Service Pages --- */
body.light-theme {
    background-color: #ffffff !important;
    color: #1e293b !important;
}

body.light-theme .service-page-content {
    background-color: transparent !important;
}

body.light-theme .service-text h2,
body.light-theme .service-text h3 {
    color: #0f172a !important;
}

body.light-theme .service-text p,
body.light-theme .service-text li {
    color: #334155 !important;
}

/* Make animation full background */
body.light-theme .service-animation-wrapper {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    width: 50vw !important;
    height: 100vh !important;
    z-index: -1 !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    opacity: 0.15 !important;
}

body.light-theme .animation-label {
    display: none !important;
}

body.light-theme .relining-svg, 
body.light-theme .stamspolning-svg, 
body.light-theme .rorinspektion-svg {
    height: 90vh !important;
    width: auto !important;
    max-width: none !important;
}

@media(max-width: 900px) {
    body.light-theme .service-animation-wrapper {
        width: 100vw !important;
        opacity: 0.05 !important;
    }
}

/* Process steps styling */
.process-steps-container {
    margin-top: 3rem;
    margin-bottom: 3rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}
.process-step {
    display: flex;
    align-items: center;
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    transition: transform 0.2s, box-shadow 0.2s;
}
.process-step:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
    border-color: #0fb3ff;
}
.process-step img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 12px;
    margin-right: 1.5rem;
    background: #f1f5f9;
}
.process-step-text h4 {
    font-size: 1.15rem;
    color: #0f172a;
    margin-bottom: 0.25rem;
    font-weight: 700;
}
.process-step-text p {
    font-size: 0.95rem !important;
    margin: 0 !important;
    color: #475569 !important;
}
`;

if(!fs.readFileSync('public/style.css', 'utf-8').includes('body.light-theme')) {
    fs.appendFileSync('public/style.css', '\n' + cssAdditions);
}

const reliningSteps = `
<div class="process-steps-container">
    <h3>Så här fungerar det</h3>
    <div class="process-step">
        <img src="img_cleaning.png" alt="Steg 1">
        <div class="process-step-text">
            <h4>1. Rengöring & Spolning</h4>
            <p>Vi rengör rören grundligt med högtrycksspolning för att ta bort gamla avlagringar.</p>
        </div>
    </div>
    <div class="process-step">
        <img src="img_relining.png" alt="Steg 2">
        <div class="process-step-text">
            <h4>2. Installation av Strumpa</h4>
            <p>En epoxi-indränkt strumpa vrängs in i det gamla röret och härdas med tryckluft.</p>
        </div>
    </div>
    <div class="process-step">
        <img src="img_inspection.png" alt="Steg 3">
        <div class="process-step-text">
            <h4>3. Slutbesiktning</h4>
            <p>Ett helt nytt, skarvlöst rör har skapats. Vi besiktigar arbetet med kamera.</p>
        </div>
    </div>
</div>
`;

const stamspolningSteps = `
<div class="process-steps-container">
    <h3>Så här fungerar det</h3>
    <div class="process-step">
        <img src="img_inspection.png" alt="Steg 1">
        <div class="process-step-text">
            <h4>1. Felsökning</h4>
            <p>Vi inspekterar rörsystemet för att identifiera problemområden.</p>
        </div>
    </div>
    <div class="process-step">
        <img src="img_cleaning.png" alt="Steg 2">
        <div class="process-step-text">
            <h4>2. Hetvattenspolning</h4>
            <p>Rören spolas med anpassat tryck och hetvatten för att lösa upp allt fett.</p>
        </div>
    </div>
    <div class="process-step">
        <img src="img_inspection.png" alt="Steg 3">
        <div class="process-step-text">
            <h4>3. Kvalitetskontroll</h4>
            <p>Vi säkerställer att det ursprungliga flödet är återställt.</p>
        </div>
    </div>
</div>
`;

const rorinspektionSteps = `
<div class="process-steps-container">
    <h3>Så här fungerar det</h3>
    <div class="process-step">
        <img src="img_cleaning.png" alt="Steg 1">
        <div class="process-step-text">
            <h4>1. Förberedelse</h4>
            <p>Avloppssystemet förbereds och spolas vid behov för bästa sikt.</p>
        </div>
    </div>
    <div class="process-step">
        <img src="img_inspection.png" alt="Steg 2">
        <div class="process-step-text">
            <h4>2. Kameraskanning</h4>
            <p>Avancerade fiberoptiska kameror skannar rörets insida millimeter för millimeter.</p>
        </div>
    </div>
    <div class="process-step">
        <img src="img_relining.png" alt="Steg 3">
        <div class="process-step-text">
            <h4>3. Analys & Rapport</h4>
            <p>Du får en komplett rapport med rekommenderade åtgärder på USB.</p>
        </div>
    </div>
</div>
`;

// Helper to replace body tag
function replaceBody(file) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/<body>/, '<body class="light-theme">');
    fs.writeFileSync(file, content, 'utf-8');
}

replaceBody('public/relining.html');
replaceBody('public/stamspolning.html');
replaceBody('public/rorinspektion.html');

// Replace sections
function replaceSection(file, replaceRegex, replacement) {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(replaceRegex, replacement);
    fs.writeFileSync(file, content, 'utf-8');
}

replaceSection('public/relining.html', /<h3>Hur går det till\?<\/h3>[\s\S]*?<\/p>/, reliningSteps);
replaceSection('public/stamspolning.html', /<h3>När behövs det\?<\/h3>[\s\S]*?<\/p>/, stamspolningSteps);
replaceSection('public/rorinspektion.html', /<h3>När används det\?<\/h3>[\s\S]*?<\/p>/, rorinspektionSteps);

console.log('Layout fixed');
