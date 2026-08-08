const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');

// --- 1. CSS UPDATES ---
const NEW_CSS_BLOCK = `
/* --- PREMIUM SCROLL ANIMATIONS --- */
.anim-fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1), transform 1.3s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.anim-fade-up.anim-active {
    opacity: 1;
    transform: translateY(0);
}

.anim-fade-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.anim-fade-left.anim-active {
    opacity: 1;
    transform: translateX(0);
}

.anim-fade-right {
    opacity: 0;
    transform: translateX(40px);
    transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.anim-fade-right.anim-active {
    opacity: 1;
    transform: translateX(0);
}

.anim-stagger-child {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
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
    transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.anim-scale-down.anim-active {
    opacity: 1;
    transform: scale(1);
}

.anim-mask-text {
    overflow: hidden;
    display: block;
    padding-bottom: 0.1em;
    margin-bottom: -0.1em;
}
.anim-mask-inner {
    display: inline-block;
    transform: translateY(100%);
    transition: transform 1.3s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
}
.anim-mask-text.anim-active .anim-mask-inner {
    transform: translateY(0);
}
`;

const stylePath = path.join(PUBLIC_DIR, 'style.css');
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf8');
    const splitIndex = css.indexOf('/* --- PREMIUM SCROLL ANIMATIONS --- */');
    if (splitIndex !== -1) {
        css = css.substring(0, splitIndex) + NEW_CSS_BLOCK;
        fs.writeFileSync(stylePath, css, 'utf8');
        console.log('Updated style.css timings and variants');
    }
}

// --- 2. INDEX.HTML PRELOADER EVENT ---
const indexPath = path.join(PUBLIC_DIR, 'index.html');
if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8');
    if (!html.includes("new Event('preloaderDone')")) {
        html = html.replace(
            `if (preloaderWrapper) preloaderWrapper.style.display = "none";\n                    }, 1800);`,
            `if (preloaderWrapper) preloaderWrapper.style.display = "none";\n                        window.dispatchEvent(new Event('preloaderDone'));\n                    }, 1800);`
        );
        fs.writeFileSync(indexPath, html, 'utf8');
        console.log('Injected preloader event into index.html');
    }
}

// --- 3. MAIN.JS OBSERVER UPDATE ---
const NEW_JS_BLOCK = `
    // --- Premium Scroll Observer ---
    const premiumObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('anim-stagger-parent')) {
                    const children = entry.target.querySelectorAll('.anim-stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('anim-active');
                        }, index * 120);
                    });
                    observer.unobserve(entry.target);
                } else {
                    entry.target.classList.add('anim-active');
                    observer.unobserve(entry.target);
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
        // Fallback just in case
        setTimeout(initPremiumObserver, 4000);
    } else {
        initPremiumObserver();
    }
`;

const mainJsPath = path.join(PUBLIC_DIR, 'main.js');
if (fs.existsSync(mainJsPath)) {
    let js = fs.readFileSync(mainJsPath, 'utf8');
    const startMarker = '// --- Premium Scroll Observer ---';
    const endMarker = '// --- Mobile-only Center Pop-up Observer ---'; // We replaced appearOnScroll before this
    
    // Let's just find the block we added in the previous run.
    const startIdx = js.indexOf(startMarker);
    const endIdx = js.indexOf('const appearOnScroll = new IntersectionObserver');
    
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        js = js.substring(0, startIdx) + NEW_JS_BLOCK + '\n\n    ' + js.substring(endIdx);
        fs.writeFileSync(mainJsPath, js, 'utf8');
        console.log('Updated premium observer in main.js');
    }
}

// --- 4. HTML VARIETY UPDATES ---
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));
files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // Alternating side fades on sections/subheadings
    // Let's target some obvious text blocks
    $('.usp-section h2, .usp-section p').each(function(i) {
        if (i % 2 === 0) {
            $(this).removeClass('anim-fade-up anim-mask-text').addClass('anim-fade-left');
        } else {
            $(this).removeClass('anim-fade-up anim-mask-text').addClass('anim-fade-right');
        }
        // Remove inner mask if it was a heading
        $(this).find('.anim-mask-inner').contents().unwrap();
    });

    $('.about-text h2, .about-text h3').removeClass('anim-mask-text').addClass('anim-fade-right');
    $('.about-text h2, .about-text h3').find('.anim-mask-inner').contents().unwrap();

    $('.project-details p:nth-child(even)').removeClass('anim-fade-up').addClass('anim-fade-left');
    $('.project-details p:nth-child(odd)').removeClass('anim-fade-up').addClass('anim-fade-right');
    
    // Service details pages text flow
    $('.intro-text-block h2').removeClass('anim-mask-text').addClass('anim-fade-left');
    $('.intro-text-block h2').find('.anim-mask-inner').contents().unwrap();
    $('.intro-text-block p').removeClass('anim-fade-up').addClass('anim-fade-right');

    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log('Added side-reveals to ' + file);
});
