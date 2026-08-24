"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

function CountdownTimer({ countdownDate }: { countdownDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!countdownDate) return;

    const calculateTimeLeft = () => {
      const difference = new Date(countdownDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [countdownDate]);

  return (
    <div className="campaign-countdown">
        <div className="countdown-item">
            <span className="countdown-value cd-days notranslate">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="countdown-label">Dagar</span>
        </div>
        <div className="countdown-item">
            <span className="countdown-value cd-hours notranslate">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="countdown-label">Timmar</span>
        </div>
        <div className="countdown-item">
            <span className="countdown-value cd-mins notranslate">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="countdown-label">Min</span>
        </div>
        <div className="countdown-item">
            <span className="countdown-value cd-secs notranslate">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="countdown-label">Sek</span>
        </div>
    </div>
  );
}

export default function CampaignPopupClient({ campaigns }: { campaigns: any[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!campaigns || campaigns.length === 0) return;

    // Show popup after a delay
    const timer = setTimeout(() => {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 50);
    }, 12000);

    return () => clearTimeout(timer);
  }, [campaigns]);

  // Auto-play carousel
  useEffect(() => {
    if (!campaigns || campaigns.length <= 1 || !isVisible) return;
    
    const slideTimer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 6000); // Change slide every 6 seconds
    
    return () => clearInterval(slideTimer);
  }, [campaigns, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsMounted(false), 700);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % campaigns.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + campaigns.length) % campaigns.length);
  };

  if (!isMounted || !campaigns || campaigns.length === 0) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Overlay and Layout CSS */
        .campaign-popup-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            z-index: 99999; display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .campaign-popup-overlay.active { opacity: 1; visibility: visible; }
        
        .pipe-popup-wrapper {
            position: relative; width: 90%; max-width: 500px;
            transform: translateY(40px) scale(0.95); opacity: 0;
            transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
            padding: 20px;
        }
        .campaign-popup-overlay.active .pipe-popup-wrapper {
            transform: translateY(0) scale(1); opacity: 1;
        }

        /* Rör-ram styling */
        .p-pipe { position: absolute; background: linear-gradient(to bottom, #d1d5db 0%, #f3f4f6 20%, #e5e7eb 50%, #d1d5db 80%, #9ca3af 100%); z-index: 1; border-radius: 40px; box-shadow: inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -2px 6px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.15); }
        .p-pipe::after { content: ''; position: absolute; background: linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%); z-index: 2; border-radius: 40px; }
        .p-top { top: 0; left: 20px; right: 20px; height: 40px; }
        .p-bottom { bottom: 0; left: 20px; right: 20px; height: 40px; }
        .p-left { top: 20px; bottom: 20px; left: 0; width: 40px; background: linear-gradient(to right, #d1d5db 0%, #f3f4f6 20%, #e5e7eb 50%, #d1d5db 80%, #9ca3af 100%); }
        .p-right { top: 20px; bottom: 20px; right: 0; width: 40px; background: linear-gradient(to left, #d1d5db 0%, #f3f4f6 20%, #e5e7eb 50%, #d1d5db 80%, #9ca3af 100%); }
        
        .p-top::after, .p-bottom::after { top: 4px; left: 10px; right: 10px; height: 12px; }
        .p-left::after { top: 10px; bottom: 10px; left: 4px; width: 12px; background: linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%); }
        .p-right::after { top: 10px; bottom: 10px; right: 4px; width: 12px; background: linear-gradient(to left, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%); }

        .p-corner { position: absolute; width: 40px; height: 40px; z-index: 5; background: radial-gradient(circle at center, #f3f4f6 0%, #d1d5db 60%, #9ca3af 100%); box-shadow: inset 0 2px 4px rgba(255,255,255,0.5), inset -2px -2px 6px rgba(0,0,0,0.2); }
        .p-corner::after { content: ''; position: absolute; width: 20px; height: 20px; border-radius: 50%; background: radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%); top: 5px; left: 5px; }
        .p-tl { top: 0; left: 0; border-top-left-radius: 20px; }
        .p-tr { top: 0; right: 0; border-top-right-radius: 20px; }
        .p-bl { bottom: 0; left: 0; border-bottom-left-radius: 20px; }
        .p-br { bottom: 0; right: 0; border-bottom-right-radius: 20px; }

        .p-muff { position: absolute; width: 35px; height: 32px; z-index: 22; border-radius: 2px; }
        .p-muff::after { content: ''; position: absolute; width: 6px; height: 36px; border-radius: 2px; }
        .p-pipe.p-top .p-muff { top: 50%; transform: translateY(-50%); background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05); }
        .p-pipe.p-top .p-muff::after { right: 0; top: 50%; transform: translateY(-50%); background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: -1px 0 2px rgba(0,0,0,0.1); }
        .p-pipe.p-bottom .p-muff { top: 50%; transform: translateY(-50%); background: linear-gradient(to top, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05); }
        .p-pipe.p-bottom .p-muff::after { right: 0; top: 50%; transform: translateY(-50%); background: linear-gradient(to top, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: -1px 0 2px rgba(0,0,0,0.1); }
        
        .p-muff-v { position: absolute; width: 32px; height: 35px; z-index: 22; border-radius: 2px; }
        .p-muff-v::after { content: ''; position: absolute; width: 36px; height: 6px; border-radius: 2px; }
        .p-pipe.p-left .p-muff-v { left: 50%; transform: translateX(-50%); background: linear-gradient(to right, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: 0 -2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05); }
        .p-pipe.p-left .p-muff-v::after { bottom: 0; left: 50%; transform: translateX(-50%); background: linear-gradient(to right, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: 0 -1px 2px rgba(0,0,0,0.1); }
        .p-pipe.p-right .p-muff-v { left: 50%; transform: translateX(-50%); background: linear-gradient(to left, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: 0 -2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05); }
        .p-pipe.p-right .p-muff-v::after { bottom: 0; left: 50%; transform: translateX(-50%); background: linear-gradient(to left, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: 0 -1px 2px rgba(0,0,0,0.1); }

        /* Innehåll */
        .pipe-popup-content {
            position: relative; z-index: 10; background: #ffffff;
            border-radius: 12px; padding: 40px 30px; text-align: center;
        }
        .campaign-close-btn {
            position: absolute; top: 15px; right: 15px; background: #f1f5f9;
            border: none; width: 32px; height: 32px; border-radius: 50%;
            font-size: 1.4rem; color: #64748b; cursor: pointer; transition: all 0.2s;
            display: flex; align-items: center; justify-content: center; z-index: 50;
        }
        .campaign-close-btn:hover { background: #e2e8f0; color: #0f172a; transform: rotate(90deg); }
        
        .campaign-title { 
            font-family: 'Syne', sans-serif; font-size: 1.8rem; font-weight: 800; color: #0f172a; 
            margin-bottom: 1rem; line-height: 1.2;
            min-height: 2.4em;
            display: flex; align-items: flex-start; justify-content: center;
        }
        .campaign-text { 
            font-size: 1.05rem; color: #475569; margin-bottom: 2rem; line-height: 1.6;
            min-height: 4.8em;
        }
        .campaign-text strong { color: #0f172a; }
        
        .campaign-btn {
            display: inline-block; background: #0284c7; color: #ffffff; text-decoration: none;
            padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 1rem;
            transition: all 0.3s ease; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3); width: 100%;
        }
        .campaign-btn:hover { background: #0369a1; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(2, 132, 199, 0.4); }

        /* Urgency Countdown */
        .campaign-countdown {
            display: flex; justify-content: center; gap: 15px; margin-bottom: 24px;
        }
        .countdown-item {
            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;
            padding: 10px 12px; min-width: 65px; text-align: center;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
        }
        .countdown-value {
            display: block; font-size: 1.6rem; font-weight: 800; color: #0284c7;
            line-height: 1; margin-bottom: 4px; font-variant-numeric: tabular-nums;
        }
        .countdown-label {
            display: block; font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700;
        }
        
        /* Carousel Styles */
        .campaign-slider { position: relative; overflow: hidden; padding-bottom: 10px; width: 100%; }
        .campaign-slides-wrapper { 
            display: flex; 
            transition: transform 0.5s ease-in-out; 
            width: 100%;
        }
        .campaign-slide { 
            min-width: 100%; 
            flex-shrink: 0; 
            padding: 0;
            display: block;
        }

        /* Nav Arrows */
        .campaign-nav-arrows {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            justify-content: space-between;
            pointer-events: none;
            padding: 0 10px;
            z-index: 40;
        }
        .campaign-nav-btn {
            pointer-events: auto;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            color: #0284c7;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .campaign-nav-btn:hover {
            background: #f8fafc;
            transform: scale(1.1);
            color: #0369a1;
        }
        
        /* Carousel Dots */
        .campaign-dots {
            display: flex;
            justify-content: center;
            gap: 6px;
            margin-top: 15px;
        }
        .campaign-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #cbd5e1;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .campaign-dot.active {
            background: #0284c7;
            transform: scale(1.2);
        }

        /* Mobile adjustments */
        @media (max-width: 480px) {
            .pipe-popup-content { padding: 35px 15px 25px 15px; }
            .campaign-close-btn { top: 10px; right: 10px; width: 28px; height: 28px; font-size: 1.2rem; }
            .campaign-countdown { gap: 5px; margin-bottom: 15px; }
            .countdown-item { min-width: 55px; padding: 8px 5px; }
            .countdown-value { font-size: 1.2rem; }
            .countdown-label { font-size: 0.6rem; }
            .campaign-title { font-size: 1.4rem; min-height: auto; }
            .campaign-text { font-size: 0.95rem; margin-bottom: 1.5rem; min-height: auto; }
            .campaign-nav-btn { width: 30px; height: 30px; }
            .campaign-nav-arrows { padding: 0 5px; }
        }
      ` }} />
      <div className={`campaign-popup-overlay ${isVisible ? 'active' : ''}`} id="campaign-popup">
        <div className="pipe-popup-wrapper">
            {/* Rör-ram */}
            <div className="p-pipe p-top">
                <div className="p-muff" style={{ left: '15%' }}></div>
                <div className="p-muff" style={{ right: '15%' }}></div>
            </div>
            <div className="p-pipe p-bottom">
                <div className="p-muff" style={{ left: '50%', transform: 'translateY(-50%) translateX(-50%)' }}></div>
            </div>
            <div className="p-pipe p-left">
                <div className="p-muff-v" style={{ top: '25%' }}></div>
            </div>
            <div className="p-pipe p-right">
                <div className="p-muff-v" style={{ top: '75%' }}></div>
            </div>
            
            <div className="p-corner p-tl"></div>
            <div className="p-corner p-tr"></div>
            <div className="p-corner p-bl"></div>
            <div className="p-corner p-br"></div>

            {/* Innehåll */}
            <div className="pipe-popup-content">
                <button id="close-campaign" className="campaign-close-btn" aria-label="Stäng popup" onClick={handleClose}>
                    <X size={18} />
                </button>
                
                <div className="campaign-slider" id="campaign-slider">
                    <div 
                        className="campaign-slides-wrapper"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {campaigns.map((camp, index) => (
                            <div key={camp.id || index} className={`campaign-slide ${index === currentIndex ? 'active' : ''}`}>
                                {/* Urgency: Nedräkning */}
                                {camp.countdownDate && (
                                    <CountdownTimer countdownDate={camp.countdownDate} />
                                )}
                                
                                <h3 className="campaign-title">{camp.title}</h3>
                                <p className="campaign-text" dangerouslySetInnerHTML={{ __html: camp.description }}></p>
                                <div className="campaign-actions">
                                    <a href="/kalkylator" className="campaign-btn">Beräkna ditt pris</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Arrows and Dots */}
                {campaigns.length > 1 && (
                    <>
                        <div className="campaign-nav-arrows">
                            <button onClick={prevSlide} className="campaign-nav-btn prev" aria-label="Föregående kampanj">
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={nextSlide} className="campaign-nav-btn next" aria-label="Nästa kampanj">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                        <div className="campaign-dots">
                            {campaigns.map((_, index) => (
                                <span 
                                    key={index} 
                                    className={`campaign-dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>
    </>
  );
}
