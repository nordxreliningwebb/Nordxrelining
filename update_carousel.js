const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

const oldHtmlBlock = /<div class="project-slider-card">[\s\S]*?<\/div>\s*<\/div>\s*<div class="project-slider-pagination">[\s\S]*?<\/button>\s*<\/div>\s*<\/button>\s*<\/div>/;

const newHtmlBlock = `                <div class="project-slider-wrapper">
                    <!-- Slide 1 -->
                    <div class="project-slider-card active" data-index="0">
                        <div class="project-slider-image">
                        </div>
                        <div class="project-slider-content">
                            <h3>Relining av anrik brf p&aring; &Ouml;stermalm</h3>
                            <p>Ett omfattande projekt d&auml;r vi renoverade stammarna i en fastighet fr&aring;n sekelskiftet. Med v&aring;r schaktfria teknik kunde de boende bo kvar under hela processen utan st&ouml;rre st&ouml;rningar.</p>
                        </div>
                    </div>
                    
                    <!-- Slide 2 -->
                    <div class="project-slider-card" data-index="1" style="display: none;">
                        <div class="project-slider-image">
                        </div>
                        <div class="project-slider-content">
                            <h3>Stamspolning f&ouml;r stor fastighets&auml;gare</h3>
                            <p>F&ouml;rebyggande underh&aring;ll i ett flerfamiljshus med 45 l&auml;genheter i Solna. Genom noggrann r&ouml;rinspektion och spolning s&auml;kerst&auml;llde vi optimalt fl&ouml;de och f&ouml;rl&auml;ngde r&ouml;rens livsl&auml;ngd.</p>
                        </div>
                    </div>
                    
                    <!-- Slide 3 -->
                    <div class="project-slider-card" data-index="2" style="display: none;">
                        <div class="project-slider-image">
                        </div>
                        <div class="project-slider-content">
                            <h3>Akut r&ouml;rinspektion vid &aring;terkommande stopp</h3>
                            <p>En villa&auml;gare i Nacka hade problem med st&auml;ndiga avloppsstopp. Vi ryckte ut, filmade ledningarna och identifierade rotintr&auml;ngning som vi d&auml;refter &aring;tg&auml;rdade snabbt och effektivt.</p>
                        </div>
                    </div>
                    
                    <!-- Slide 4 -->
                    <div class="project-slider-card" data-index="3" style="display: none;">
                        <div class="project-slider-image">
                        </div>
                        <div class="project-slider-content">
                            <h3>Modernisering av avloppssystem i radhusl&auml;nga</h3>
                            <p>Komplett relining av markf&ouml;rlagda r&ouml;r i ett bostadsomr&aring;de i T&auml;by. Ett kostnadseffektivt alternativ till traditionellt stambyte som sparade b&aring;de tid och pengar f&ouml;r f&ouml;reningen.</p>
                        </div>
                    </div>
                </div>
                
                <div class="project-slider-pagination">
                    <button class="nav-btn prev-btn" aria-label="F&ouml;reg&aring;ende projekt">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"></path></svg>
                    </button>
                    <div class="dots">
                        <span class="dot active" data-index="0"></span>
                        <span class="dot" data-index="1"></span>
                        <span class="dot" data-index="2"></span>
                        <span class="dot" data-index="3"></span>
                    </div>
                    <button class="nav-btn next-btn" aria-label="N&auml;sta projekt">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"></path></svg>
                    </button>
                </div>

                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const slides = document.querySelectorAll('.project-slider-wrapper .project-slider-card');
                        const dots = document.querySelectorAll('.project-slider-pagination .dot');
                        const prevBtn = document.querySelector('.project-slider-pagination .prev-btn');
                        const nextBtn = document.querySelector('.project-slider-pagination .next-btn');
                        
                        if(!slides.length || !dots.length) return;

                        let currentSlide = 0;
                        const totalSlides = slides.length;
                        
                        function showSlide(index) {
                            slides.forEach(slide => {
                                slide.style.display = 'none';
                                slide.classList.remove('active');
                            });
                            dots.forEach(dot => dot.classList.remove('active'));
                            
                            slides[index].style.display = 'grid'; 
                            slides[index].classList.add('active');
                            dots[index].classList.add('active');
                            currentSlide = index;
                        }
                        
                        function nextSlide() {
                            let nextIndex = (currentSlide + 1) % totalSlides;
                            showSlide(nextIndex);
                        }
                        
                        function prevSlide() {
                            let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                            showSlide(prevIndex);
                        }
                        
                        nextBtn.addEventListener('click', nextSlide);
                        prevBtn.addEventListener('click', prevSlide);
                        
                        dots.forEach((dot, idx) => {
                            dot.addEventListener('click', () => showSlide(idx));
                        });
                        
                        let autoRotate = setInterval(nextSlide, 6000);
                        
                        const wrapper = document.querySelector('.project-slider-wrapper');
                        wrapper.addEventListener('mouseenter', () => clearInterval(autoRotate));
                        wrapper.addEventListener('mouseleave', () => {
                            autoRotate = setInterval(nextSlide, 6000);
                        });
                    });
                </script>`;

if (html.match(oldHtmlBlock)) {
    html = html.replace(oldHtmlBlock, newHtmlBlock);
    fs.writeFileSync('public/index.html', html, 'utf8');
    console.log('Updated index.html with carousel HTML and JS');
} else {
    console.log('Could not find the HTML block to replace in index.html');
}

let css = fs.readFileSync('public/style.css', 'utf8');
css = css.replace(
    /\.project-slider-pagination \.dot\.active\s*\{\s*background:\s*#1e293b;/g,
    '.project-slider-pagination .dot.active {\n    background: #0284c7;'
);
fs.writeFileSync('public/style.css', css, 'utf8');
console.log('Updated style.css active dot color');
