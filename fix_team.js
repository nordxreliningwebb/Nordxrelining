const fs = require('fs');
const file = 'public/om-oss.html';

if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');

    // 1. Add class to container and inject mobile style for vertical stacking
    const oldContainer = '<div style="display: flex; flex-wrap: nowrap; gap: 3rem; justify-content: center;">';
    const newContainer = '<style>@media (max-width: 768px) { .team-flex-container { flex-direction: column !important; align-items: center !important; gap: 4rem !important; } }</style>\n            <div class="team-flex-container" style="display: flex; flex-wrap: nowrap; gap: 3rem; justify-content: center;">';
    
    html = html.replace(oldContainer, newContainer);

    // 2. Add mobile-pop-standby class to each person card
    // We target the specific div wrapper for team members
    const oldCard = '<div style="width: 280px; text-align: center;">';
    const newCard = '<div class="mobile-pop-standby" style="width: 280px; text-align: center;">';
    
    // Check how many matches
    const matches = html.split(oldCard).length - 1;
    console.log(`Found ${matches} team members to update.`);
    
    html = html.replace(new RegExp(oldCard.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newCard);

    fs.writeFileSync(file, html, 'utf8');
    console.log('Fixed team layout in ' + file);
} else {
    console.log('File not found: ' + file);
}
