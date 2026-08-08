const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');

const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // 1. HERO SECTION FIXES
    const $heroBtns = $('.hero-buttons');
    if ($heroBtns.length > 0) {
        $heroBtns.addClass('anim-fade-up').attr('data-anim-delay', '300');
        // Clean children to prevent double animation
        $heroBtns.find('.anim-fade-up, .anim-fade-left, .anim-fade-right').removeClass('anim-fade-up anim-fade-left anim-fade-right').removeAttr('data-anim-delay');
    }

    const $heroTrust = $('.hero-trust-badge');
    if ($heroTrust.length > 0) {
        $heroTrust.addClass('anim-fade-up').attr('data-anim-delay', '450');
        $heroTrust.find('.anim-fade-up').removeClass('anim-fade-up').removeAttr('data-anim-delay');
    }

    const $heroCtaBox = $('.hero-cta-box');
    if ($heroCtaBox.length > 0) {
        $heroCtaBox.addClass('anim-fade-up').attr('data-anim-delay', '600');
        $heroCtaBox.find('.anim-fade-up').removeClass('anim-fade-up').removeAttr('data-anim-delay');
    }

    // 2. SERVICE CARDS FIXES
    $('.services-grid').each(function() {
        $(this).addClass('anim-stagger-parent');
        $(this).children('.service-card').addClass('anim-stagger-child');
        
        // Remove animation classes from inside the card to keep it clean and structural
        $(this).find('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-mask-text, .anim-scale-down').removeClass('anim-fade-up anim-fade-left anim-fade-right anim-mask-text anim-scale-down');
        $(this).find('.anim-scale-down-container').removeClass('anim-scale-down-container');
        $(this).find('.anim-mask-inner').contents().unwrap();
        $(this).find('[data-anim-delay]').removeAttr('data-anim-delay');
    });

    // 3. USP FEATURE BOXES FIXES
    $('.usp-list').each(function() {
        $(this).addClass('anim-stagger-parent');
        $(this).children('li').addClass('anim-stagger-child');
        
        // Clean children
        $(this).find('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-mask-text').removeClass('anim-fade-up anim-fade-left anim-fade-right anim-mask-text');
        $(this).find('.anim-mask-inner').contents().unwrap();
        $(this).find('[data-anim-delay]').removeAttr('data-anim-delay');
    });
    
    // Also fix standard .grid elements that hold cards
    $('.grid, .steps-container').each(function() {
        // We already made these stagger parents, but let's clean their children just in case
        $(this).find('.anim-stagger-child').each(function() {
            $(this).find('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-mask-text, .anim-scale-down').removeClass('anim-fade-up anim-fade-left anim-fade-right anim-mask-text anim-scale-down');
            $(this).find('.anim-mask-inner').contents().unwrap();
            $(this).find('[data-anim-delay]').removeAttr('data-anim-delay');
        });
    });

    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log('Applied structural fixes to ' + file);
});
