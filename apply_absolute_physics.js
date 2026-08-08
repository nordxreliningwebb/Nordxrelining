const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');

// --- 1. REWRITE CSS BLOCK FOR ABSOLUTE OVERRIDE ---
const NEW_CSS = `
/* --- PREMIUM SCROLL ANIMATIONS --- */

.anim-transitioning,
.anim-mask-text.anim-transitioning .anim-mask-inner {
    transition-duration: 2.0s !important;
    transition-timing-function: cubic-bezier(0.1, 1, 0.1, 1) !important;
    transition-property: opacity, transform !important;
    will-change: opacity, transform;
}

.anim-fade-up:not(.anim-active),
.anim-fade-left:not(.anim-active),
.anim-fade-right:not(.anim-active),
.anim-stagger-child:not(.anim-active),
.anim-stagger-item:not(.anim-active),
.anim-scale-down:not(.anim-active) {
    opacity: 0 !important;
    pointer-events: none;
}

.anim-fade-up:not(.anim-active),
.anim-stagger-child:not(.anim-active) {
    transform: translateY(40px) !important;
}

.anim-fade-left:not(.anim-active) {
    transform: translateX(-50px) !important;
}

.anim-fade-right:not(.anim-active) {
    transform: translateX(50px) !important;
}

.anim-scale-down-container {
    overflow: hidden !important;
}
.anim-scale-down:not(.anim-active) {
    transform: scale(1.15) !important;
}

.anim-mask-text {
    overflow: hidden;
    display: block;
    padding-bottom: 0.1em;
    margin-bottom: -0.1em;
}
.anim-mask-inner {
    display: inline-block;
}
.anim-mask-text:not(.anim-active) .anim-mask-inner {
    transform: translateY(100%) !important;
}
`;

const stylePath = path.join(PUBLIC_DIR, 'style.css');
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf8');
    const startIdx = css.indexOf('/* --- PREMIUM SCROLL ANIMATIONS --- */');
    if (startIdx !== -1) {
        css = css.substring(0, startIdx) + NEW_CSS;
        fs.writeFileSync(stylePath, css, 'utf8');
        console.log('Applied absolute 2.0s physics override to style.css');
    }
}

// --- 2. UPDATE TIMEOUT IN MAIN.JS ---
const mainJsPath = path.join(PUBLIC_DIR, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let js = fs.readFileSync(mainJsPath, 'utf8');
    // We replace the 2200ms timeout with 2400ms
    js = js.replace(/setTimeout\(\(\) => {\s*el\.classList\.remove\('anim-transitioning'\);\s*}, 2200\);/g, `setTimeout(() => {
                el.classList.remove('anim-transitioning');
            }, 2400);`);
    // And fallback just in case it was 1500
    js = js.replace(/setTimeout\(\(\) => {\s*el\.classList\.remove\('anim-transitioning'\);\s*}, 1500\);/g, `setTimeout(() => {
                el.classList.remove('anim-transitioning');
            }, 2400);`);
    // And increase the stagger slightly more for the wave effect (150ms -> 180ms)
    js = js.replace(/index \* 150/g, `index * 180`);
    fs.writeFileSync(mainJsPath, js, 'utf8');
    console.log('Updated Transition-Release timer to 2400ms in main.js');
}

// --- 3. SUBPAGE HTML AUDIT ---
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // A. REVIEWS WAVE EFFECT
    $('.reviews-grid, .r-grid').each(function() {
        $(this).addClass('anim-stagger-parent');
        $(this).find('.r-card, .review-card').each(function() {
            $(this).addClass('anim-stagger-child');
            // Clean inner
            $(this).find('.anim-fade-up').removeClass('anim-fade-up');
        });
    });

    // B. CONTACT TEXT
    // Any section that contains the contact form, target its text
    $('section').has('form.kontakt-form, form.contact-form').each(function() {
        $(this).find('.kontakt-text, .contact-info, h2, p').filter(function() {
            return $(this).parents('form').length === 0;
        }).each(function() {
            if (!$(this).hasClass('anim-fade-up') && !$(this).hasClass('anim-stagger-child')) {
                $(this).addClass('anim-fade-up');
            }
        });
    });
    
    // Address blocks in general
    $('address').each(function() {
        if (!$(this).hasClass('anim-fade-up') && !$(this).hasClass('anim-stagger-item')) {
            $(this).addClass('anim-fade-up');
        }
    });

    // C. FAQ SUBPAGE DOMINO EFFECT
    if (file === 'faq.html') {
        // Find all faq cards
        let idx = 0;
        $('.faq-card-wrapper').parent().addClass('anim-stagger-parent');
        
        $('.nordx-faq-card').each(function() {
            const $card = $(this);
            // Clean old
            $card.removeClass('anim-fade-up anim-fade-left anim-fade-right anim-stagger-child anim-stagger-item');
            $card.removeAttr('data-anim-delay');
            
            // Apply domino
            if (idx % 2 === 0) {
                $card.addClass('anim-fade-left anim-stagger-item');
            } else {
                $card.addClass('anim-fade-right anim-stagger-item');
            }
            
            // Clean inner
            $card.find('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-mask-text').removeClass('anim-fade-up anim-fade-left anim-fade-right anim-mask-text');
            $card.find('.anim-mask-inner').contents().unwrap();
            
            idx++;
        });
        
        console.log('Applied FAQ domino effect specifically to faq.html');
    }

    fs.writeFileSync(filePath, $.html(), 'utf8');
    if (file === 'index.html' || file === 'kontakt.html' || file === 'faq.html') {
        console.log('Audited and updated specific elements in ' + file);
    }
});
