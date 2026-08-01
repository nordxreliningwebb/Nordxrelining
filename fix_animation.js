const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('public/index.html', 'utf8');

// Remove display: none from inline styles on slider cards
html = html.replace(/<div class="project-slider-card" data-index="1" style="display: none;">/g, '<div class="project-slider-card" data-index="1">');
html = html.replace(/<div class="project-slider-card" data-index="2" style="display: none;">/g, '<div class="project-slider-card" data-index="2">');
html = html.replace(/<div class="project-slider-card" data-index="3" style="display: none;">/g, '<div class="project-slider-card" data-index="3">');

// Update the JS function
const oldJS = `function showSlide(index) {
                            slides.forEach(slide => {
                                slide.style.display = 'none';
                                slide.classList.remove('active');
                            });
                            dots.forEach(dot => dot.classList.remove('active'));
                            slides[index].style.display = 'flex';
                            slides[index].classList.add('active');
                            dots[index].classList.add('active');
                            currentSlide = index;
                        }`;

const newJS = `function showSlide(index) {
                            slides.forEach(slide => slide.classList.remove('active'));
                            dots.forEach(dot => dot.classList.remove('active'));
                            
                            slides[index].classList.add('active');
                            dots[index].classList.add('active');
                            currentSlide = index;
                        }`;

html = html.replace(oldJS, newJS);

// Save HTML
fs.writeFileSync('public/index.html', html, 'utf8');

// 2. Update style.css
let css = fs.readFileSync('public/style.css', 'utf8');

const sliderWrapperCSS = `
.project-slider-wrapper {
    display: grid;
    position: relative;
}
`;

css += sliderWrapperCSS;

const oldCardCSS = `.project-slider-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #0284c7;
    border-radius: 8px;
    overflow: hidden;
    margin: 3rem auto 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: left;
    min-height: 500px;
}`;

const newCardCSS = `.project-slider-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #0284c7;
    border-radius: 8px;
    overflow: hidden;
    margin: 3rem auto 2rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: left;
    min-height: 500px;
    
    /* Crossfade animation */
    grid-area: 1 / 1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.8s ease-in-out, visibility 0.8s;
    pointer-events: none;
    z-index: 1;
}

.project-slider-card.active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    z-index: 2;
}
`;

css = css.replace(oldCardCSS, newCardCSS);

// Save CSS
fs.writeFileSync('public/style.css', css, 'utf8');

console.log('Fixed slider animation');
