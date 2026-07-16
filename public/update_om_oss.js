const fs = require('fs');
let content = fs.readFileSync('om-oss.html', 'utf8');

// 1. Remove the stats section.
const statsStart = content.indexOf('<div style="background: #0f172a; border-radius: 24px;');
if (statsStart !== -1) {
    const statsEnd = content.indexOf('</div>', content.indexOf('Kundnöjdhet') + 20) + 6;
    const endDiv = content.indexOf('</div>', statsEnd) + 6; // Find the closing div of the stats container
    content = content.substring(0, statsStart) + content.substring(endDiv);
}

// 2. Replace the cards with the new design and text.
const cardsStart = content.indexOf('<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))');
const cardsEnd = content.indexOf('</div>', content.indexOf('</div>', content.indexOf('</div>', cardsStart + 50) + 10) + 10) + 6; // Grabbing end of the grid

const newCards = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                
                <div style="background: linear-gradient(135deg, #0fb3ff 0%, #0056b3 100%); border-radius: 16px; padding: 2.5rem; color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; backdrop-filter: blur(5px);">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">Hållbarhet & Kvalitet</h3>
                    <p style="color: rgba(255,255,255,0.9); line-height: 1.7;">Vi levererar branschledande lösningar som står emot tidens prövningar. Genom certifierade material och rigorösa kvalitetskontroller säkerställer vi att våra rörsystem bidrar till en mer hållbar fastighetsförvaltning.</p>
                </div>

                <div style="background: linear-gradient(135deg, #0fb3ff 0%, #0056b3 100%); border-radius: 16px; padding: 2.5rem; color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; backdrop-filter: blur(5px);">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">Trygghet & Arbetsmiljö</h3>
                    <p style="color: rgba(255,255,255,0.9); line-height: 1.7;">Människorna är vår främsta tillgång. Vi sätter alltid säkerheten främst och arbetar proaktivt med att skapa en trygg miljö för både våra medarbetare, beställare och de boende under hela projektets gång.</p>
                </div>

                <div style="background: linear-gradient(135deg, #0fb3ff 0%, #0056b3 100%); border-radius: 16px; padding: 2.5rem; color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; backdrop-filter: blur(5px);">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem;">Innovation & Framtid</h3>
                    <p style="color: rgba(255,255,255,0.9); line-height: 1.7;">Genom att ständigt utvärdera nya metoder och material driver vi branschens utveckling framåt. Vi utmanar konventionella tillvägagångssätt för att erbjuda de mest resurseffektiva lösningarna på marknaden.</p>
                </div>
            </div>`;

content = content.substring(0, cardsStart) + newCards + content.substring(cardsEnd + 100); 
// Wait, replacing via substring could be fragile. Let's just use replace with regex for the images to question marks first.

// Replace images: src="1.png", src="2.png", src="3.png"
content = content.replace(/<img src="1.png"[^>]*>/, '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #64748b; font-size: 6rem; font-weight: 800;">?</div>');
content = content.replace(/<img src="2.png"[^>]*>/, '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #64748b; font-size: 6rem; font-weight: 800;">?</div>');
content = content.replace(/<img src="3.png"[^>]*>/, '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #64748b; font-size: 6rem; font-weight: 800;">?</div>');

fs.writeFileSync('om-oss2.html', content);
