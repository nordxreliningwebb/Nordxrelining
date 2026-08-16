"use client";

import { useEffect } from 'react';

export default function HomeClientLogic() {
  useEffect(() => {
    // Transparent header logic for home page relies on this class on the body
    document.body.classList.add('home-page');

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
      if (waterObserver) {
        waterObserver.disconnect();
      }
    };
  }, []);

  return null;
}
