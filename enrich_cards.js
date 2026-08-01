const fs = require('fs');

// --- 1. Update index.html ---
let html = fs.readFileSync('public/index.html', 'utf8');

const cardsHTML = [
    {
        search: /<div class="project-slider-content">[\s\S]*?<h3>Relining av anrik brf p. stermalm<\/h3>[\s\S]*?<p>Ett omfattande projekt[\s\S]*?<\/p>\s*<\/div>/,
        replace: `<div class="project-slider-content">
                            <div class="project-meta">
                                <span class="project-category">Bostadsrättsförening</span>
                                <span class="project-date">12 Maj, 2026</span>
                            </div>
                            <h3>Relining av anrik brf på Östermalm</h3>
                            <div class="project-location">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                Östermalm, Stockholm
                            </div>
                            <p>Ett omfattande projekt där vi renoverade stammarna i en fastighet från sekelskiftet. Med vår schaktfria teknik kunde de boende bo kvar under hela processen utan större störningar.</p>
                            <a href="projekt.html" class="project-btn">Läs mer om projektet</a>
                        </div>`
    },
    {
        search: /<div class="project-slider-content">[\s\S]*?<h3>Stamspolning f.r stor fastighets.gare<\/h3>[\s\S]*?<p>F.rebyggande underh.ll[\s\S]*?<\/p>\s*<\/div>/,
        replace: `<div class="project-slider-content">
                            <div class="project-meta">
                                <span class="project-category">Fastighetsägare</span>
                                <span class="project-date">28 April, 2026</span>
                            </div>
                            <h3>Stamspolning för stor fastighetsägare</h3>
                            <div class="project-location">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                Solna, Stockholm
                            </div>
                            <p>Förebyggande underhåll i ett flerfamiljshus med 45 lägenheter i Solna. Genom noggrann rörinspektion och spolning säkerställde vi optimalt flöde och förlängde rörens livslängd.</p>
                            <a href="projekt.html" class="project-btn">Läs mer om projektet</a>
                        </div>`
    },
    {
        search: /<div class="project-slider-content">[\s\S]*?<h3>Akut r.rinspektion vid .terkommande stopp<\/h3>[\s\S]*?<p>En villa.gare i Nacka[\s\S]*?<\/p>\s*<\/div>/,
        replace: `<div class="project-slider-content">
                            <div class="project-meta">
                                <span class="project-category">Privat / Villa</span>
                                <span class="project-date">15 Mars, 2026</span>
                            </div>
                            <h3>Akut rörinspektion vid återkommande stopp</h3>
                            <div class="project-location">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                Nacka, Stockholm
                            </div>
                            <p>En villaägare i Nacka hade problem med ständiga avloppsstopp. Vi ryckte ut, filmade ledningarna och identifierade rotinträngning som vi därefter åtgärdade snabbt och effektivt.</p>
                            <a href="projekt.html" class="project-btn">Läs mer om projektet</a>
                        </div>`
    },
    {
        search: /<div class="project-slider-content">[\s\S]*?<h3>Modernisering av avloppssystem i radhusl.nga<\/h3>[\s\S]*?<p>Komplett relining[\s\S]*?<\/p>\s*<\/div>/,
        replace: `<div class="project-slider-content">
                            <div class="project-meta">
                                <span class="project-category">Samfällighet</span>
                                <span class="project-date">02 Februari, 2026</span>
                            </div>
                            <h3>Modernisering av avloppssystem i radhuslänga</h3>
                            <div class="project-location">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                Täby, Stockholm
                            </div>
                            <p>Komplett relining av markförlagda rör i ett bostadsområde i Täby. Ett kostnadseffektivt alternativ till traditionellt stambyte som sparade både tid och pengar för föreningen.</p>
                            <a href="projekt.html" class="project-btn">Läs mer om projektet</a>
                        </div>`
    }
];

cardsHTML.forEach(card => {
    html = html.replace(card.search, card.replace);
});

fs.writeFileSync('public/index.html', html, 'utf8');

// --- 2. Update style.css ---
let css = fs.readFileSync('public/style.css', 'utf8');

const additionalCSS = `
/* Project Card Details */
.project-slider-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.project-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: #e2e8f0;
}
.project-category {
    background: rgba(255, 255, 255, 0.2);
    padding: 4px 12px;
    border-radius: 20px;
    font-weight: 600;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.75rem;
}
.project-location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #bae6fd;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    font-family: 'Inter', sans-serif;
}
.project-btn {
    margin-top: 1.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    color: #0284c7;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
    align-self: flex-start;
    border: 1px solid transparent;
}
.project-btn:hover {
    background: transparent;
    color: #ffffff;
    border-color: #ffffff;
}
`;

css += additionalCSS;
fs.writeFileSync('public/style.css', css, 'utf8');

console.log('Project cards enriched');
