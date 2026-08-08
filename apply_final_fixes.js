const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');

// --- 1. UPDATE MAIN.JS TO SUPPORT .anim-stagger-item ---
const mainJsPath = path.join(PUBLIC_DIR, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let js = fs.readFileSync(mainJsPath, 'utf8');
    // Replace the querySelectorAll inside the observer
    js = js.replace(
        `const children = el.querySelectorAll('.anim-stagger-child');`,
        `const children = el.querySelectorAll('.anim-stagger-child, .anim-stagger-item');`
    );
    // Also increase stagger delay slightly to 150ms if it was 120ms
    js = js.replace(`index * 120`, `index * 150`);
    fs.writeFileSync(mainJsPath, js, 'utf8');
    console.log('Updated main.js for generic stagger items');
}

// --- 2. UPDATE HTML FILES ---
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // 1. HERO CTAs
    const $heroBtns = $('.hero-buttons-container');
    if ($heroBtns.length > 0) {
        $heroBtns.addClass('anim-fade-up').attr('data-anim-delay', '300');
        // Clean children to prevent double animation
        $heroBtns.find('.anim-fade-up, .anim-fade-left, .anim-fade-right').removeClass('anim-fade-up anim-fade-left anim-fade-right').removeAttr('data-anim-delay');
    }

    // 2. FAQ ACCORDION DOMINO
    const $faqContainer = $('#nordx-hidden-group').parent().parent(); // The container holding all FAQs
    if ($faqContainer.length > 0) {
        $faqContainer.addClass('anim-stagger-parent');
        
        $('.nordx-faq-card').each(function(i) {
            const $card = $(this);
            // Clean old animations
            $card.removeClass('anim-fade-up anim-fade-left anim-fade-right anim-stagger-child');
            $card.removeAttr('data-anim-delay');
            
            // Apply Domino Left/Right
            if (i % 2 === 0) {
                $card.addClass('anim-fade-left anim-stagger-item');
            } else {
                $card.addClass('anim-fade-right anim-stagger-item');
            }
            
            // Clean text animations inside the card so the card animates as a block
            $card.find('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-mask-text').removeClass('anim-fade-up anim-fade-left anim-fade-right anim-mask-text');
            $card.find('.anim-mask-inner').contents().unwrap();
        });

        // "Visa fler FAQs" Button
        const $showMoreBtn = $('#show-more-faq');
        if ($showMoreBtn.length > 0) {
            $showMoreBtn.removeClass('anim-fade-up').addClass('anim-fade-up anim-stagger-item');
            $showMoreBtn.removeAttr('data-anim-delay'); // Will stagger naturally as the last item in the parent
        }
    }

    // 3. PROJECT SECTION CARD
    const $projectCards = $('.project-slider-card');
    if ($projectCards.length > 0) {
        $projectCards.each(function() {
            $(this).addClass('anim-fade-up');
            // Clean inner
            $(this).find('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-mask-text').removeClass('anim-fade-up anim-fade-left anim-fade-right anim-mask-text');
            $(this).find('.anim-mask-inner').contents().unwrap();
            $(this).find('[data-anim-delay]').removeAttr('data-anim-delay');
        });
    }

    const $projectCta = $('.projects-preview-cta .btn-hero-solid');
    if ($projectCta.length > 0) {
        $projectCta.addClass('anim-fade-up').attr('data-anim-delay', '250');
    }

    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log('Applied final fixes to ' + file);
});
