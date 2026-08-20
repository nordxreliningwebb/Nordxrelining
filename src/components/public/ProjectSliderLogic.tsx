"use client";

import { useEffect } from 'react';

export default function ProjectSliderLogic() {
  useEffect(() => {
    const slides = document.querySelectorAll('.project-slider-wrapper .project-slider-card');
    const dots = document.querySelectorAll('.project-slider-pagination .dot');
    const prevBtn = document.querySelector('.project-slider-pagination .prev-btn');
    const nextBtn = document.querySelector('.project-slider-pagination .next-btn');
    
    if(!slides.length || !dots.length) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
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
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showSlide(idx));
    });
    
    let autoRotate = setInterval(nextSlide, 6000);
    
    const wrapper = document.querySelector('.project-slider-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => clearInterval(autoRotate));
        wrapper.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextSlide, 6000);
        });
    }

    return () => {
        clearInterval(autoRotate);
        if (nextBtn) nextBtn.removeEventListener('click', nextSlide);
        if (prevBtn) prevBtn.removeEventListener('click', prevSlide);
    };
  }, []);

  return null;
}
