const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');

// --- 1. REWRITE CSS BLOCK ---
const NEW_CSS = `
/* --- PREMIUM SCROLL ANIMATIONS --- */

.anim-transitioning,
.anim-mask-text.anim-transitioning .anim-mask-inner {
    transition: opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1), transform 1.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
    will-change: opacity, transform;
}

.anim-fade-up:not(.anim-active),
.anim-fade-left:not(.anim-active),
.anim-fade-right:not(.anim-active),
.anim-stagger-child:not(.anim-active),
.anim-scale-down:not(.anim-active) {
    opacity: 0 !important;
    pointer-events: none; /* Prevent clicks before reveal */
}

.anim-fade-up:not(.anim-active),
.anim-stagger-child:not(.anim-active) {
    transform: translateY(30px) !important;
}

.anim-fade-left:not(.anim-active) {
    transform: translateX(-40px) !important;
}

.anim-fade-right:not(.anim-active) {
    transform: translateX(40px) !important;
}

.anim-scale-down-container {
    overflow: hidden !important;
}
.anim-scale-down:not(.anim-active) {
    transform: scale(1.1) !important;
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
        console.log('Rewritten style.css for Transition-Release pattern');
    }
}

// --- 2. REWRITE MAIN.JS OBSERVER ---
const NEW_JS = `
    // --- Premium Scroll Observer ---
    const triggerAnimation = (el, delay = 0) => {
        setTimeout(() => {
            el.classList.add('anim-transitioning', 'anim-active');
            // Remove transitioning class after animation completes (1.5s total to be safe)
            setTimeout(() => {
                el.classList.remove('anim-transitioning');
            }, 1500);
        }, delay);
    };

    const premiumObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                
                if (el.classList.contains('anim-stagger-parent')) {
                    const children = el.querySelectorAll('.anim-stagger-child');
                    children.forEach((child, index) => {
                        triggerAnimation(child, index * 120);
                    });
                    observer.unobserve(el);
                } else {
                    const delay = parseInt(el.getAttribute('data-anim-delay')) || 0;
                    triggerAnimation(el, delay);
                    observer.unobserve(el);
                }
            }
        });
    }, {
        threshold: 0,
        rootMargin: "0px 0px -15% 0px"
    });

    const initPremiumObserver = () => {
        document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-down, .anim-mask-text, .anim-stagger-parent').forEach(el => {
            premiumObserver.observe(el);
        });
    };

    if (document.getElementById('preloader-wrapper')) {
        window.addEventListener('preloaderDone', initPremiumObserver);
        setTimeout(initPremiumObserver, 4000);
    } else {
        initPremiumObserver();
    }
`;

const mainJsPath = path.join(PUBLIC_DIR, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let js = fs.readFileSync(mainJsPath, 'utf8');
    const startMarker = '// --- Premium Scroll Observer ---';
    const endMarker = '// --- Mobile-only Center Pop-up Observer ---';
    
    const startIdx = js.indexOf(startMarker);
    const endIdx = js.indexOf(endMarker);
    
    if (startIdx !== -1 && endIdx !== -1) {
        js = js.substring(0, startIdx) + NEW_JS + '\n    ' + js.substring(endIdx);
        fs.writeFileSync(mainJsPath, js, 'utf8');
        console.log('Rewritten premium observer in main.js');
    }
}

// --- 3. HTML SECONDARY ELEMENTS UPDATE ---
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // Helper to safely exclude headers/footers
    const safeAdd = (selector, classes, attrs) => {
        $(selector).filter(function() {
            return $(this).parents('header, footer, .complex-footer, nav, .anim-stagger-parent').length === 0;
        }).each(function() {
            const $el = $(this);
            // Don't override if it already has a specific anim class
            if (!$el.hasClass('anim-fade-left') && !$el.hasClass('anim-fade-right') && !$el.hasClass('anim-mask-text') && !$el.hasClass('anim-scale-down')) {
                $el.addClass(classes);
                if (attrs) {
                    for (const [key, val] of Object.entries(attrs)) {
                        $el.attr(key, val);
                    }
                }
            }
        });
    };

    // 1. CTA Buttons (delay 250ms)
    safeAdd('.btn, .cta-btn, .btn-primary, .btn-secondary, .btn-ghost, .btn-outline, .cta-btn-header-match', 'anim-fade-up', { 'data-anim-delay': '250' });

    // 2. Secondary elements (delay 150ms to follow text)
    safeAdd('hr, .divider, .icon, .icon-wrapper, i', 'anim-fade-up', { 'data-anim-delay': '150' });

    // 3. Forms (Stagger form groups)
    $('form.kontakt-form, .contact-form, form').filter(function() {
        return $(this).parents('header, footer, nav').length === 0;
    }).each(function() {
        $(this).addClass('anim-stagger-parent');
        $(this).find('.form-group, input, textarea, select, .btn').addClass('anim-stagger-child');
        $(this).find('.anim-fade-up').removeClass('anim-fade-up');
    });

    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log('Added secondary element animations to ' + file);
});
