const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const PUBLIC_DIR = path.join(__dirname, 'public');

// --- 1. UPDATE CSS FOR FOOTER ALIGNMENT ---
const stylePath = path.join(PUBLIC_DIR, 'style.css');
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf8');
    
    const footerFixCSS = `

/* --- Footer Logo Top Edge Alignment --- */
@media (min-width: 901px) {
    .footer-brand {
        margin-top: 18px !important; /* Pushes the logo down to align top edges */
    }
    .footer-brand a {
        align-items: flex-start !important; /* Switch from flex-end to flex-start */
    }
}
`;
    
    if (!css.includes('Footer Logo Top Edge Alignment')) {
        css += footerFixCSS;
        fs.writeFileSync(stylePath, css, 'utf8');
        console.log('Appended footer alignment CSS to style.css');
    }
}

// --- 2. GLOBAL HTML AUDIT FOR DOMINO EFFECT & FOOTER ANIMATION ---
const files = fs.readdirSync(PUBLIC_DIR).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(PUBLIC_DIR, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    let modified = false;

    // A. FOOTER ANIMATION
    $('.footer-brand').each(function() {
        const $img = $(this).find('img');
        const $p = $(this).find('p');
        
        if (!$img.hasClass('anim-fade-up')) {
            $img.addClass('anim-fade-up');
            modified = true;
        }
        if (!$p.hasClass('anim-fade-up')) {
            $p.addClass('anim-fade-up');
            modified = true;
        }
    });

    // B. PROJEKT PAGE DOMINO EFFECT
    if (file === 'projekt.html' || file === 'index.html') {
        $('.projects-grid, .project-grid').each(function() {
            $(this).addClass('anim-stagger-parent');
            $(this).find('.project-card, .project-item').each(function() {
                $(this).addClass('anim-stagger-child');
                $(this).find('.anim-fade-up').removeClass('anim-fade-up');
                modified = true;
            });
        });
    }

    // C. KUNSKAPSBANKEN PAGE DOMINO EFFECT
    if (file === 'kunskapsbanken.html') {
        $('.kb-grid, .articles-grid, .blog-grid').each(function() {
            $(this).addClass('anim-stagger-parent');
            $(this).find('.kb-card, .article-card, .blog-card, article').each(function() {
                $(this).addClass('anim-stagger-child');
                $(this).find('.anim-fade-up').removeClass('anim-fade-up');
                modified = true;
            });
        });
    }

    if (modified) {
        fs.writeFileSync(filePath, $.html(), 'utf8');
        console.log('Audited and updated domino/footer animations in ' + file);
    }
});
