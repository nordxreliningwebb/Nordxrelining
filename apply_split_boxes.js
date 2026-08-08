const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

let modifiedFiles = 0;

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });
    let modified = false;

    // Search for swoosh-hero sections which contain the split layout
    $('.swoosh-hero').each(function() {
        // Find the grid container
        const grid = $(this).find('.container > div').first();
        if (grid.length && grid.children().length >= 2) {
            const leftCard = grid.children().eq(0);
            const rightImage = grid.children().eq(1);

            // 1. Setup Left Card (Text Box)
            if (!leftCard.hasClass('anim-fade-left')) {
                leftCard.addClass('anim-fade-left');
                // Strip inner animations to obey "Stop targeting only the text inside"
                leftCard.find('.anim-fade-up, .anim-mask-text, .anim-scale-down').removeClass('anim-fade-up anim-mask-text anim-scale-down');
                leftCard.find('.anim-mask-inner').removeClass('anim-mask-inner');
                // Also remove delay attributes from inner elements
                leftCard.find('[data-anim-delay]').removeAttr('data-anim-delay');
                modified = true;
            }

            // 2. Setup Right Card (Image Box)
            if (!rightImage.hasClass('anim-fade-right')) {
                rightImage.addClass('anim-fade-right');
                rightImage.attr('data-anim-delay', '200');
                
                // Strip old scale-down logic
                rightImage.removeClass('anim-scale-down-container');
                rightImage.find('.anim-scale-down, .anim-fade-up').removeClass('anim-scale-down anim-fade-up');
                modified = true;
            }
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, $.html(), 'utf8');
        console.log('Applied split-box animations in ' + file);
        modifiedFiles++;
    }
});

console.log('Total files modified: ' + modifiedFiles);
