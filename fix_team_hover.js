const fs = require('fs');
const file = 'public/om-oss.html';

if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');

    // 1. Add class "team-member-card" to the team cards if not already there
    // The current cards look like: <div class="mobile-pop-standby" style="width: 280px; text-align: center;">
    html = html.replace(/<div class="mobile-pop-standby" style="width: 280px; text-align: center;">/g, '<div class="mobile-pop-standby team-member-card" style="width: 280px; text-align: center;">');

    // 2. Inject the script just before the closing </section> of the team section.
    // The section ends with:
    //     </div>
    // </section>
    // We can inject it right before </section> by finding the specific section.
    // Let's use a reliable replacement point. 
    // The team section has this line: `<p style="color: #0284c7; font-weight: 600;">Arbetsledare / Rörinspektion</p>\n                </div>\n            </div>\n    </section>`
    
    // Instead of regex matching the whole block, let's just append the script before the `</main>` or just inside the `main.js`?
    // Doing it in `om-oss.html` is safer for now to not affect other pages.
    // Let's inject it right before `<footer class="complex-footer"`
    
    const script = `
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 768) {
            const teamCards = document.querySelectorAll('.team-member-card');
            if (teamCards.length === 0) return;
            
            let style = document.createElement('style');
            style.innerHTML = \`
                .team-member-card.team-center-active {
                    transform: translateY(-20px) !important;
                }
            \`;
            document.head.appendChild(style);

            window.addEventListener('scroll', () => {
                const centerY = window.innerHeight / 2;
                let closestCard = null;
                let minDistance = Infinity;
                
                teamCards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const cardCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(centerY - cardCenter);
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCard = card;
                    }
                });
                
                teamCards.forEach(card => {
                    if (card === closestCard && minDistance < window.innerHeight / 2.5) {
                        card.classList.add('team-center-active');
                    } else {
                        card.classList.remove('team-center-active');
                    }
                });
            }, { passive: true });
        }
    });
    </script>
    `;
    
    if (!html.includes('team-center-active')) {
        html = html.replace('</main>', script + '\n</main>');
        fs.writeFileSync(file, html, 'utf8');
        console.log('Added mobile hover effect to team cards.');
    } else {
        console.log('Mobile hover effect already present.');
    }
} else {
    console.log('File not found: ' + file);
}
