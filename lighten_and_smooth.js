const fs = require('fs');

// 1. Fix the main.js scroll event to use requestAnimationFrame for 100% smooth scrolling
let mainJs = fs.readFileSync('public/main.js', 'utf-8');

const oldScrollCode = /document\.addEventListener\('DOMContentLoaded', \(\) => {\s*const contentSections = document\.querySelectorAll\('\.service-page-content'\);[\s\S]*?\}\);/g;

// Only keep the last matched block for service-page-content scroll logic
const matches = [...mainJs.matchAll(oldScrollCode)];
if(matches.length > 0) {
    const lastMatch = matches[matches.length - 1];
    
    const newScrollCode = `
document.addEventListener('DOMContentLoaded', () => {
    const contentSections = document.querySelectorAll('.service-page-content');
    if (contentSections.length > 0) {
        let ticking = false;
        
        const updateAnimation = () => {
            contentSections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                const startPoint = windowHeight * 0.8; 
                let progress = (startPoint - rect.top) / (rect.height);
                progress = Math.max(0, Math.min(1, progress));
                
                section.style.setProperty('--scroll-progress', progress);
                
                const dirts = section.querySelectorAll('.dirt-clog');
                dirts.forEach(dirt => {
                    const depth = parseFloat(dirt.getAttribute('data-depth'));
                    dirt.style.opacity = progress > depth ? '0' : '1';
                    // Optional scale down to make it pop out smoother
                    dirt.style.transform = progress > depth ? 'scale(0.8)' : 'scale(1)';
                });
            });
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateAnimation);
                ticking = true;
            }
        }, { passive: true }); // passive true makes scrolling buttery smooth
        
        window.requestAnimationFrame(updateAnimation);
    }
});
`;
    // Replace just the last match to avoid breaking multiple bindings if they exist
    mainJs = mainJs.slice(0, lastMatch.index) + newScrollCode + mainJs.slice(lastMatch.index + lastMatch[0].length);
    fs.writeFileSync('public/main.js', mainJs, 'utf-8');
    console.log('main.js updated with rAF');
}

// 2. Fix the HTML to be lighter and remove the jumping CSS transition
let html = fs.readFileSync('public/stamspolning.html', 'utf-8');

// A. Remove CSS transition on the nozzle-group to eliminate steps/jumping
html = html.replace(/transition: transform 0\.1s ease-out;/g, '');

// B. Ljusa upp gjutjärnet (cast iron base)
html = html.replace(/<rect width="60" height="60" fill="#1e293b" \/>/g, '<rect width="60" height="60" fill="#475569" />');
// Ljusa upp groparna
html = html.replace(/fill="#0f172a"/g, 'fill="#334155"');
html = html.replace(/fill="#020617"/g, 'fill="#1e293b"');
// Ljusa upp svarta skuggningar i pipe-shading
html = html.replace(/<stop offset="0%" stop-color="#000000" stop-opacity="0\.7"\/>/, '<stop offset="0%" stop-color="#000000" stop-opacity="0.5"/>');
html = html.replace(/<stop offset="100%" stop-color="#000000" stop-opacity="0\.8"\/>/, '<stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>');
html = html.replace(/<stop offset="85%" stop-color="#000000" stop-opacity="0\.4"\/>/, '<stop offset="85%" stop-color="#000000" stop-opacity="0.2"/>');

// Ljusa upp flänsarna (joints)
html = html.replace(/<rect x="18" y="200" width="124" height="26" fill="#0f172a"/, '<rect x="18" y="200" width="124" height="26" fill="#334155"');
html = html.replace(/<rect x="18" y="550" width="124" height="26" fill="#0f172a"/, '<rect x="18" y="550" width="124" height="26" fill="#334155"');

// Fix filter shadows to be slightly lighter
html = html.replace(/flood-color="#020617" flood-opacity="0\.6"/, 'flood-color="#0f172a" flood-opacity="0.4"');
html = html.replace(/flood-color="#020617" flood-opacity="0\.5"/, 'flood-color="#0f172a" flood-opacity="0.3"');

fs.writeFileSync('public/stamspolning.html', html, 'utf-8');
console.log('SVG colors lightened and transitions removed');
