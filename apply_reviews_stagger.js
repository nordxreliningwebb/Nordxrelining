const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');
const indexPath = path.join(PUBLIC_DIR, 'index.html');

if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // Target the actual review container
    $('.reviews-track, .reviews-carousel').first().addClass('anim-stagger-parent');
    
    $('.review-card').each(function() {
        $(this).addClass('anim-stagger-child');
        
        // Remove individual fade-ups inside the card to prevent chaotic double animations
        $(this).find('.anim-fade-up').removeClass('anim-fade-up');
    });

    fs.writeFileSync(indexPath, $.html(), 'utf8');
    console.log('Successfully applied staggered domino effect to review cards in index.html');
}
