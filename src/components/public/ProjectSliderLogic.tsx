"use client";

import { useEffect } from 'react';

export default function ProjectSliderLogic() {
  useEffect(() => {
    const slides = document.querySelectorAll('.project-slider-wrapper .project-slider-card');
    const dots = document.querySelectorAll('.project-slider-pagination .dot');
    const prevBtn = document.querySelector('.project-slider-pagination .prev-btn');
    const nextBtn = document.querySelector('.project-slider-pagination .next-btn');
    const wrapper = document.querySelector('.project-slider-wrapper');
    
    if(!slides.length || !dots.length || !wrapper) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoRotate: NodeJS.Timeout | null = null;
    let isHovering = false;
    let isVisible = false;
    
    function showSlide(index: number) {
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
    
    function updateInterval() {
        if (autoRotate) clearInterval(autoRotate);
        if (isVisible && !isHovering) {
            autoRotate = setInterval(nextSlide, 6000);
        }
    }

    wrapper.addEventListener('mouseenter', () => {
        isHovering = true;
        updateInterval();
    });
    wrapper.addEventListener('mouseleave', () => {
        isHovering = false;
        updateInterval();
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
            updateInterval();
        });
    }, { threshold: 0.2 });
    
    observer.observe(wrapper);

    return () => {
        if (autoRotate) clearInterval(autoRotate);
        if (nextBtn) nextBtn.removeEventListener('click', nextSlide);
        if (prevBtn) prevBtn.removeEventListener('click', prevSlide);
        observer.disconnect();
    };
  }, []);

  return null;
}
