const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');

// --- 1. CSS INJECTION ---
const CSS_BLOCK = `
/* --- PREMIUM SCROLL ANIMATIONS --- */
.anim-fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.anim-fade-up.anim-active {
    opacity: 1;
    transform: translateY(0);
}

.anim-stagger-child {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.anim-stagger-child.anim-active {
    opacity: 1;
    transform: translateY(0);
}

.anim-scale-down-container {
    overflow: hidden !important;
}
.anim-scale-down {
    opacity: 0;
    transform: scale(1.1);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.anim-scale-down.anim-active {
    opacity: 1;
    transform: scale(1);
}

.anim-mask-text {
    overflow: hidden;
    display: block;
}
.anim-mask-inner {
    display: inline-block;
    transform: translateY(100%);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
}
.anim-mask-text.anim-active .anim-mask-inner {
    transform: translateY(0);
}
`;

const stylePath = path.join(PUBLIC_DIR, 'style.css');
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf8');
    if (!css.includes('PREMIUM SCROLL ANIMATIONS')) {
        fs.appendFileSync(stylePath, '\n' + CSS_BLOCK);
        console.log('Injected premium animations into style.css');
    }
}

// --- 2. JS INJECTION ---
const JS_BLOCK = `
    // --- Premium Scroll Observer ---
    const premiumObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('anim-stagger-parent')) {
                    const children = entry.target.querySelectorAll('.anim-stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('anim-active');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                } else {
                    entry.target.classList.add('anim-active');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.anim-fade-up, .anim-scale-down, .anim-mask-text, .anim-stagger-parent').forEach(el => {
        premiumObserver.observe(el);
    });
`;

const mainJsPath = path.join(PUBLIC_DIR, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let js = fs.readFileSync(mainJsPath, 'utf8');
    if (!js.includes('Premium Scroll Observer')) {
        // Find a good place to inject, e.g., right before appearOnScroll or at the end of DOMContentLoaded
        js = js.replace('const appearOnScroll = new IntersectionObserver(function(entries, observer) {', JS_BLOCK + '\n\n    const appearOnScroll = new IntersectionObserver(function(entries, observer) {');
        fs.writeFileSync(mainJsPath, js, 'utf8');
        console.log('Injected premium observer into main.js');
    }
}

// --- 3. HTML PARSING & INJECTION ---
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // We load html in cheerio, ensuring we don't wrap the whole document if not needed,
    // but cheerio loads full documents by default. We must maintain formatting where possible.
    const $ = cheerio.load(html, { decodeEntities: false });

    // Exclude header and footer elements from generic selectors
    const notHeaderFooter = ':not(header *):not(footer *):not(.complex-footer *)';

    // 1. Remove old fade-in classes
    $('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right').removeClass('fade-in fade-in-up fade-in-left fade-in-right');

    // 2. Fade-up: paragraphs, text blocks, buttons
    $('main p, section p, .btn, .cta-btn-header-match').filter(function() {
        return $(this).parents('header, footer, .complex-footer, nav').length === 0;
    }).addClass('anim-fade-up');

    // 3. Text Masking: H1/H2
    $('h1, h2').filter(function() {
        return $(this).parents('header, footer, .complex-footer, nav').length === 0;
    }).each(function() {
        const $el = $(this);
        if (!$el.hasClass('anim-mask-text')) {
            $el.addClass('anim-mask-text');
            // Check if already wrapped
            if ($el.children('.anim-mask-inner').length === 0) {
                $el.wrapInner('<span class="anim-mask-inner"></span>');
            }
        }
    });

    // 4. Scale-down Reveal: Hero images, large images
    // Identifying hero images: usually inside a section with hero, or directly img.hero-img
    $('.hero-image img, .service-image-reveal img, .process-image img, main img').filter(function() {
        return $(this).parents('header, footer, .complex-footer, nav, .anim-stagger-parent').length === 0;
    }).each(function() {
        const $img = $(this);
        // Exclude small icons or logos
        if ($img.attr('src') && $img.attr('src').includes('logo')) return;
        if ($img.attr('width') && parseInt($img.attr('width')) < 100) return;
        
        $img.addClass('anim-scale-down');
        $img.parent().addClass('anim-scale-down-container');
    });

    // 5. Staggered Reveal: Grids, lists
    $('.grid, ul.benefits-list, .usp-grid, .steps-container').filter(function() {
        return $(this).parents('header, footer, .complex-footer, nav').length === 0;
    }).each(function() {
        $(this).addClass('anim-stagger-parent');
        // Add child class to immediate children
        $(this).children().addClass('anim-stagger-child');
        // Remove anim-fade-up from children to avoid double animation
        $(this).find('.anim-fade-up').removeClass('anim-fade-up');
    });

    // Handle standard service rows as staggered
    $('.service-row').each(function() {
        $(this).addClass('anim-stagger-parent');
        $(this).children().addClass('anim-stagger-child');
        $(this).find('.anim-fade-up').removeClass('anim-fade-up');
    });

    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log('Processed ' + file);
});
