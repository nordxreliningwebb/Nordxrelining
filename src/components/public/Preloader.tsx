"use client";

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const video = document.getElementById("hero-video") as HTMLVideoElement;
    const preloaderCurtain = document.getElementById("preloader-curtain");
    const preloaderWrapper = document.getElementById("preloader-wrapper");
    const preloaderLogo = document.getElementById("preloader-logo");
    const loadingText = document.getElementById("loading-text");
    
    if (!preloaderWrapper || !preloaderCurtain) return;

    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Start a pulse animation on the text
    let dots = 0;
    const textInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        if(loadingText) loadingText.innerText = "INSPEKTERAR RÖR" + ".".repeat(dots);
    }, 300);

    const finishLoading = () => {
        if(preloaderWrapper.dataset.loaded) return;
        preloaderWrapper.dataset.loaded = "true";
        
        clearInterval(textInterval);
        
        // Hide logo first
        if (preloaderLogo) preloaderLogo.style.opacity = "0";
        
        // Wait a tiny bit, then sweep down
        setTimeout(() => {
            if (preloaderWrapper) preloaderWrapper.style.transform = "translateY(105%)";
            
            // Allow scrolling again
            document.body.style.overflow = "";
            
            // Remove completely after animation
            setTimeout(() => {
                if (preloaderWrapper) preloaderWrapper.style.display = "none";
                setIsVisible(false);
                window.dispatchEvent(new Event('preloaderDone'));
            }, 1900); // 1900ms ensures 1.8s transition is 100% finished
        }, 300);
    };

    // If video is already ready (from cache)
    if (video && video.readyState >= 3) {
        // Minimum loading time so the user always sees the cool animation
        setTimeout(finishLoading, 1200);
    } else if (video) {
        // Wait for video to be ready to play
        video.addEventListener("canplaythrough", finishLoading);
        video.addEventListener("loadeddata", finishLoading);
        // Fallback max timeout just in case video fails or takes forever
        setTimeout(finishLoading, 3000);
    } else {
        setTimeout(finishLoading, 1200);
    }

    return () => {
      clearInterval(textInterval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div id="preloader-wrapper" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 999999, pointerEvents: "none", display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: "transform 1.8s cubic-bezier(0.5, 0.05, 0.1, 1)" }}>
        <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .preloader-wave-path { fill: #0284c7; }
        .preloader-wave-path-mid { fill: #38bdf8; }
        .preloader-wave-path-light { fill: #7dd3fc; }
        ` }} />
        
        <div id="preloader-curtain" style={{ width: "100%", height: "100vh", background: "#0284c7", position: "relative" }}>
            
            {/* Vattenvågor på toppen */}
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: "absolute", top: "-119px", left: 0, width: "200%", height: "120px", zIndex: 1, animation: "wave-move 5s linear infinite", opacity: 0.4 }}>
                <path className="preloader-wave-path-light" d="M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z"></path>
            </svg>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: "absolute", top: "-118px", left: 0, width: "200%", height: "120px", zIndex: 2, animation: "wave-move 3.5s linear infinite", opacity: 0.7 }}>
                <path className="preloader-wave-path-mid" d="M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z"></path>
            </svg>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: "absolute", top: "-115px", left: 0, width: "200%", height: "120px", zIndex: 3, animation: "wave-move 2.5s linear infinite" }}>
                <path className="preloader-wave-path" d="M0,60 C250,130 350,-10 600,60 C850,130 950,-10 1200,60 L1200,120 L0,120 Z"></path>
            </svg>
            
            {/* Logo inside the water area */}
            <div id="preloader-logo" style={{ position: "absolute", top: "45vh", left: "50%", transform: "translate(-50%, -50%)", opacity: 1, transition: "opacity 0.4s ease", textAlign: "center", zIndex: 3 }}>
                <img src="/logo.png" alt="Nordxrelining" style={{ width: "280px", filter: "brightness(0) invert(1)" }} />
                <div style={{ color: "#ffffff", fontFamily: "monospace", letterSpacing: "3px", marginTop: "1.5rem", fontSize: "1rem", fontWeight: 600 }} id="loading-text">INSPEKTERAR RÖR...</div>
            </div>
        </div>
    </div>
  );
}
