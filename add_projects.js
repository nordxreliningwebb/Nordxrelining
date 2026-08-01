const fs = require('fs');
const path = require('path');

// 1. Modify index.html
const indexPath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const injectionPoint = '<!-- CTA SEKTION (Ersätter Kontakt) -->';
const newSectionHTML = `
        <!-- Premium Transition Divider (Pure CSS Photorealistic PVC Pipe) TOP -->
        <div style="width: 100vw; margin-left: calc(-50vw + 50%); height: 100px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; z-index: 5;">
            <!-- Sned CSS-container för att rotera hela rörsystemet -->
            <div style="position: absolute; width: 110%; height: 200%; top: -50%; left: -5%; transform: rotate(-1deg); display: flex; align-items: center; background: linear-gradient(to bottom, #f8fafc 50%, #ffffff 50%);">
                <!-- Huvudröret -->
                <div style="width: 100%; height: 26px; background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); position: relative; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                    <!-- Skarvmuff 1 (Vänster) -->
                    <div style="position: absolute; left: 15%; top: 50%; transform: translateY(-50%); width: 35px; height: 32px; background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); border-radius: 2px; box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05);">
                        <div style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 36px; background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); border-radius: 2px; box-shadow: -1px 0 2px rgba(0,0,0,0.1);"></div>
                    </div>
                    <!-- Skarvmuff 2 (Mitten) -->
                    <div style="position: absolute; left: 52%; top: 50%; transform: translateY(-50%); width: 35px; height: 32px; background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); border-radius: 2px; box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05);">
                        <div style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 36px; background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); border-radius: 2px; box-shadow: -1px 0 2px rgba(0,0,0,0.1);"></div>
                    </div>
                    <!-- Skarvmuff 3 (Höger) -->
                    <div style="position: absolute; right: 12%; top: 50%; transform: translateY(-50%); width: 35px; height: 32px; background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); border-radius: 2px; box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05);">
                        <div style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 36px; background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); border-radius: 2px; box-shadow: -1px 0 2px rgba(0,0,0,0.1);"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PROJEKT PREVIEW SEKTION -->
        <section id="recent-projects" class="projects-preview-section">
            <div class="container projects-preview-container">
                <h2 class="section-title">Några av våra projekt</h2>
                
                <div class="project-slider-card">
                    <div class="project-slider-image">
                    </div>
                    <div class="project-slider-content">
                        <h3>Information uppdateras snart</h3>
                        <p>Här kommer vi inom kort att presentera fler spännande projekt. Håll utkik för framtida uppdateringar från oss på Nordx Relining.</p>
                    </div>
                </div>
                
                <div class="project-slider-pagination">
                    <button class="nav-btn prev-btn" aria-label="Föregående projekt">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"></path></svg>
                    </button>
                    <div class="dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <button class="nav-btn next-btn" aria-label="Nästa projekt">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"></path></svg>
                    </button>
                </div>
                
                <div class="projects-preview-cta">
                    <a href="projekt.html" class="btn-hero-solid">ALLA PROJEKT</a>
                </div>
            </div>
        </section>

`;

if (!html.includes('id="recent-projects"')) {
    html = html.replace(injectionPoint, newSectionHTML + injectionPoint);
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('Inserted projects section into index.html');
} else {
    console.log('Projects section already exists in index.html');
}

// 2. Modify style.css
const stylePath = path.join(__dirname, 'public', 'style.css');
let css = fs.readFileSync(stylePath, 'utf8');

const newCSS = `

/* --- Projects Preview Section (Index) --- */
.projects-preview-section {
    background: #ffffff;
    padding: 100px 0;
    position: relative;
    text-align: center;
}
.projects-preview-container {
    max-width: 1000px;
    margin: 0 auto;
}
.project-slider-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #1e293b;
    border-radius: 8px;
    overflow: hidden;
    margin: 3rem auto 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: left;
    min-height: 350px;
}
.project-slider-image {
    background: #e2e8f0;
    width: 100%;
    height: 100%;
    min-height: 300px;
}
.project-slider-content {
    padding: 3rem 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #ffffff;
}
.project-slider-content h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}
.project-slider-content p {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    line-height: 1.6;
    color: #cbd5e1;
}

.project-slider-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
}
.project-slider-pagination .nav-btn {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    cursor: pointer;
    transition: all 0.3s ease;
}
.project-slider-pagination .nav-btn:hover {
    color: #1e293b;
    border-color: #cbd5e1;
    background: #f8fafc;
}
.project-slider-pagination .dots {
    display: flex;
    gap: 8px;
}
.project-slider-pagination .dot {
    width: 8px;
    height: 8px;
    background: #cbd5e1;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
}
.project-slider-pagination .dot.active {
    background: #1e293b;
    width: 24px;
    border-radius: 4px;
}
.projects-preview-cta {
    margin-top: 1rem;
}

@media (max-width: 768px) {
    .project-slider-card {
        grid-template-columns: 1fr;
    }
    .project-slider-image {
        min-height: 250px;
    }
    .project-slider-content {
        padding: 2rem 1.5rem;
    }
}
`;

if (!css.includes('.projects-preview-section')) {
    css += newCSS;
    fs.writeFileSync(stylePath, css, 'utf8');
    console.log('Appended projects section CSS to style.css');
} else {
    console.log('Projects section CSS already exists');
}
