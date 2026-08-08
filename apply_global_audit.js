const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');

// --- 1. REWRITE CSS BLOCK FOR "AIRPLANE LANDING" EASING ---
const NEW_CSS = `
/* --- PREMIUM SCROLL ANIMATIONS --- */

.anim-transitioning,
.anim-mask-text.anim-transitioning .anim-mask-inner {
    transition: opacity 1.8s cubic-bezier(0.1, 1, 0, 1), transform 1.8s cubic-bezier(0.1, 1, 0, 1) !important;
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
        console.log('Applied Airplane Landing physics to style.css');
    }
}

// --- 2. UPDATE TIMEOUT IN MAIN.JS ---
const mainJsPath = path.join(PUBLIC_DIR, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let js = fs.readFileSync(mainJsPath, 'utf8');
    // We replace the 1500ms timeout with 2200ms
    js = js.replace(/setTimeout\(\(\) => {\s*el\.classList\.remove\('anim-transitioning'\);\s*}, 1500\);/g, `setTimeout(() => {
                el.classList.remove('anim-transitioning');
            }, 2200);`);
    fs.writeFileSync(mainJsPath, js, 'utf8');
    console.log('Updated Transition-Release timer in main.js');
}

// --- 3. GLOBAL HTML AUDIT ---
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // A. PRICING CARDS & OTHER GRIDS
    $('.pricing-grid, .blog-grid, .team-grid, .stats-grid, .process-grid').each(function() {
        const $grid = $(this);
        $grid.addClass('anim-stagger-parent');
        $grid.children('article, div, .pricing-card, .team-member, .blog-card, .stat-card').each(function() {
            $(this).addClass('anim-stagger-child');
            // Clean their children to prevent double animation
            $(this).find('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-mask-text, .anim-scale-down').removeClass('anim-fade-up anim-fade-left anim-fade-right anim-mask-text anim-scale-down');
            $(this).find('.anim-mask-inner').contents().unwrap();
            $(this).find('[data-anim-delay]').removeAttr('data-anim-delay');
        });
    });

    // B. FOOTER AUDIT
    $('footer.complex-footer, footer').each(function() {
        $(this).addClass('anim-stagger-parent');
        const cols = $(this).find('.footer-col, .footer-links-col, .footer-contact-col, .footer-bottom, .footer-logo-col');
        cols.addClass('anim-stagger-item anim-fade-up');
        // Clean inner elements of footer columns
        cols.find('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-mask-text').removeClass('anim-fade-up anim-fade-left anim-fade-right anim-mask-text');
    });

    // C. CATCH-ALL STATIC SWEEP
    $('main h1, main h2, main h3, main h4, main p, main img, main .card, main .box, main .text-block, section h1, section h2, section h3, section h4, section p, section img, section .card, section .box, section .text-block').each(function() {
        const $el = $(this);
        
        // Skip if inside header, nav, or footer
        if ($el.parents('header, nav, footer, .complex-footer').length > 0) return;
        
        // Skip if inside a stagger parent (we don't want to double animate inside cards)
        if ($el.parents('.anim-stagger-parent, .anim-stagger-child, .anim-stagger-item').length > 0) return;

        // Skip if it ALREADY has an animation class
        if ($el.hasClass('anim-fade-up') || $el.hasClass('anim-fade-left') || $el.hasClass('anim-fade-right') || $el.hasClass('anim-scale-down') || $el.hasClass('anim-mask-text') || $el.hasClass('anim-stagger-child') || $el.hasClass('anim-stagger-item')) return;

        // For images, skip tiny icons
        if ($el.is('img')) {
            const width = $el.attr('width');
            if (width && parseInt(width) < 50) return;
            if ($el.attr('src') && $el.attr('src').includes('logo')) return;
        }

        // Apply fallback fade-up to any remaining static elements
        $el.addClass('anim-fade-up');
    });

    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log('Audited and updated ' + file);
});
