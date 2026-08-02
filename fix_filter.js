const fs = require('fs');

// 1. Fix CSS
let css = fs.readFileSync('public/style.css', 'utf8');
const fixCSS = `
/* Mobile adjustments for Nordx Filter Nav */
@media (max-width: 768px) {
    .nordx-filter-nav {
        flex-wrap: nowrap !important;
        gap: 4px !important;
        width: 100%;
        justify-content: space-between;
    }
    .nordx-filter-btn {
        flex: 1;
        padding: 0.4rem 0 !important;
        font-size: clamp(0.5rem, 2.2vw, 0.75rem) !important;
        letter-spacing: 0 !important;
        text-align: center;
        white-space: nowrap;
    }
}
`;
if (!css.includes('Mobile adjustments for Nordx Filter Nav')) {
    css += fixCSS;
    fs.writeFileSync('public/style.css', css, 'utf8');
    console.log('Appended CSS to style.css');
}

// 2. Fix JS
let js = fs.readFileSync('public/main.js', 'utf8');
const fixJS = `
document.addEventListener('DOMContentLoaded', () => {
    // --- Nordx Filter (Projekt & Kunskapsbanken) ---
    const nordxFilterBtns = document.querySelectorAll('.nordx-filter-btn');
    if (nordxFilterBtns.length > 0) {
        nordxFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('.nordx-filter-nav');
                if (parent) {
                    parent.querySelectorAll('.nordx-filter-btn').forEach(b => {
                        b.classList.remove('active');
                        b.setAttribute('aria-selected', 'false');
                    });
                }
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                
                const filterValue = btn.dataset.filter;
                const cards = document.querySelectorAll('.project-card-v2');
                
                cards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.classList.remove('is-hidden');
                        card.style.display = '';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            card.classList.add('visible');
                        }, 10);
                    } else {
                        card.classList.add('is-hidden');
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});
`;
if (!js.includes('Nordx Filter (Projekt & Kunskapsbanken)')) {
    js += fixJS;
    fs.writeFileSync('public/main.js', js, 'utf8');
    console.log('Appended JS to main.js');
}
