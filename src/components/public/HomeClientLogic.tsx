"use client";

import { useEffect } from 'react';

export default function HomeClientLogic() {
  useEffect(() => {
    // Transparent header logic for home page relies on this class on the body
    document.body.classList.add('home-page');

    // Sticky banner scroll animation
    const handleScroll = () => {
      const stickyBar = document.querySelector('.mobile-sticky-bottom-bar') as HTMLElement;
      if (stickyBar) {
        // If the user has scrolled to within 50px of the bottom of the page
        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);
        if (isAtBottom) {
          stickyBar.classList.add('is-at-bottom');
          
          // Calculate distance from bottom of document to the top of "Kontakta oss" section
          const contactCol = document.querySelector('.footer-contact-col');
          if (contactCol) {
            const rect = contactCol.getBoundingClientRect();
            const absoluteTop = window.scrollY + rect.top;
            const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            const distToBottom = scrollHeight - absoluteTop;
            // Subtract ~60px so it sits lower and doesn't overlap the links above
            stickyBar.style.setProperty('--contact-offset', `${distToBottom - 60}px`);
          }
        } else {
          stickyBar.classList.remove('is-at-bottom');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Water Fill Service Cards Animation
    const waterFillCards = document.querySelectorAll('.water-fill-card');
    let waterObserver: IntersectionObserver | null = null;
    
    if (waterFillCards.length > 0) {
      waterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Slight delay for domino effect based on DOM index
            const index = Array.from(waterFillCards).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('is-filled');
            }, index * 200);
            waterObserver?.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2
      });
      
      waterFillCards.forEach(card => waterObserver?.observe(card));
    }

    return () => {
      document.body.classList.remove('home-page');
      window.removeEventListener('scroll', handleScroll);
      if (waterObserver) {
        waterObserver.disconnect();
      }
    };
  }, []);

  return null;
}
