"use client";

import React, { useState, useEffect } from 'react';


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

export default function CampaignPopupClient({ campaign }: { campaign: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    if (!campaign) return;

    // Show popup after a delay
    const timer = setTimeout(() => {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 50); // Liten delay för att DOM:en ska uppdateras och transitionen kicka in
    }, 12000);

    return () => clearTimeout(timer);
  }, [campaign]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsMounted(false), 700); // Vänta på transitionen (0.7s)
  };

  

  if (!campaign || !isMounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .campaign-popup-overlay {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center;
            opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.6s ease, visibility 0.6s ease;
        }
        .campaign-popup-overlay.active { opacity: 1; visibility: visible; pointer-events: auto; }

        .pipe-popup-wrapper {
            position: relative; width: 90%; max-width: 480px;
            transform: translateY(40px) scale(0.97); opacity: 0;
            transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease;
            filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
        }
        .campaign-popup-overlay.active .pipe-popup-wrapper { transform: translateY(0) scale(1); opacity: 1; }

        /* Pipes - Exact dimensions as divider (26px height) */
        .p-pipe { position: absolute; z-index: 20; }
        .p-top { 
            top: -26px; left: 0; right: 0; height: 26px; 
            background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); 
        }
        .p-bottom { 
            bottom: -26px; left: 0; right: 0; height: 26px; 
            background: linear-gradient(to top, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); 
        }
        .p-left { 
            left: -26px; top: 0; bottom: 0; width: 26px; 
            background: linear-gradient(to right, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); 
        }
        .p-right { 
            right: -26px; top: 0; bottom: 0; width: 26px; 
            background: linear-gradient(to left, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); 
        }

        /* Corners - L-shaped bent elbows with seamless gradient connection */
        .p-corner {
            position: absolute; width: 26px; height: 26px; z-index: 21;
        }
        .p-tl { 
            top: -26px; left: -26px; border-top-left-radius: 26px;
            background: radial-gradient(circle 26px at bottom right, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%);
        }
        .p-tr { 
            top: -26px; right: -26px; border-top-right-radius: 26px;
            background: radial-gradient(circle 26px at bottom left, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%);
        }
        .p-bl { 
            bottom: -26px; left: -26px; border-bottom-left-radius: 26px;
            background: radial-gradient(circle 26px at top right, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%);
        }
        .p-br { 
            bottom: -26px; right: -26px; border-bottom-right-radius: 26px;
            background: radial-gradient(circle 26px at top left, #6b7280 0%, #9ca3af 20%, #d1d5db 50%, #f3f4f6 70%, #9ca3af 100%);
        }

        /* Skarvmuffar Horisontella */
        .p-muff {
            position: absolute; width: 35px; height: 32px; z-index: 22; border-radius: 2px;
        }
        .p-muff::after {
            content: ''; position: absolute; width: 6px; height: 36px; border-radius: 2px;
        }
        .p-pipe.p-top .p-muff {
            top: 50%; transform: translateY(-50%);
            background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%);
            box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05);
        }
        .p-pipe.p-top .p-muff::after {
            right: 0; top: 50%; transform: translateY(-50%);
            background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%);
            box-shadow: -1px 0 2px rgba(0,0,0,0.1);
        }
        .p-pipe.p-bottom .p-muff {
            top: 50%; transform: translateY(-50%);
            background: linear-gradient(to top, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%);
            box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05);
        }
        .p-pipe.p-bottom .p-muff::after {
            right: 0; top: 50%; transform: translateY(-50%);
            background: linear-gradient(to top, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%);
            box-shadow: -1px 0 2px rgba(0,0,0,0.1);
        }
        
        /* Skarvmuffar Vertikala */
        .p-muff-v {
            position: absolute; width: 32px; height: 35px; z-index: 22; border-radius: 2px;
        }
        .p-muff-v::after {
            content: ''; position: absolute; width: 36px; height: 6px; border-radius: 2px;
        }
        .p-pipe.p-left .p-muff-v {
            left: 50%; transform: translateX(-50%);
            background: linear-gradient(to right, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%);
            box-shadow: 0 -2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05);
        }
        .p-pipe.p-left .p-muff-v::after {
            bottom: 0; left: 50%; transform: translateX(-50%);
            background: linear-gradient(to right, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%);
            box-shadow: 0 -1px 2px rgba(0,0,0,0.1);
        }
        .p-pipe.p-right .p-muff-v {
            left: 50%; transform: translateX(-50%);
            background: linear-gradient(to left, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%);
            box-shadow: 0 -2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05);
        }
        .p-pipe.p-right .p-muff-v::after {
            bottom: 0; left: 50%; transform: translateX(-50%);
            background: linear-gradient(to left, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%);
            box-shadow: 0 -1px 2px rgba(0,0,0,0.1);
        }

        /* Innehållet */
        .pipe-popup-content {
            position: relative; z-index: 10; background: #ffffff;
            border-radius: 12px; padding: 40px 30px; text-align: center;
        }
        .campaign-close-btn {
            position: absolute; top: 15px; right: 15px; background: #f1f5f9;
            border: none; width: 32px; height: 32px; border-radius: 50%;
            font-size: 1.4rem; color: #64748b; cursor: pointer; transition: all 0.2s;
            display: flex; align-items: center; justify-content: center;
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
        
        /* Slider Styles */
        .campaign-slider { position: relative; overflow: hidden; padding-bottom: 10px; }
        .campaign-slides-wrapper { display: grid; }
        .campaign-slide { grid-area: 1 / 1; display: block; }

        /* Mobile adjustments */
        @media (max-width: 480px) {
            .pipe-popup-content {
                padding: 35px 15px 25px 15px;
            }
            .campaign-close-btn {
                top: 10px;
                right: 10px;
                width: 28px;
                height: 28px;
                font-size: 1.2rem;
            }
            .campaign-countdown {
                gap: 5px;
                margin-bottom: 15px;
            }
            .countdown-item {
                min-width: 55px;
                padding: 8px 5px;
            }
            .countdown-value {
                font-size: 1.2rem;
            }
            .countdown-label {
                font-size: 0.6rem;
            }
            .campaign-title {
                font-size: 1.4rem;
                min-height: auto;
            }
            .campaign-text {
                font-size: 0.95rem;
                margin-bottom: 1.5rem;
                min-height: auto;
            }
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
                <button id="close-campaign" className="campaign-close-btn" aria-label="Stäng popup" onClick={handleClose}>×</button>
                <div className="campaign-slider" id="campaign-slider">
                    <div className="campaign-slides-wrapper">
                        {/* Slide 1 */}
                        <div className="campaign-slide active">
                            {/* Urgency: Nedräkning */}
                            <CountdownTimer countdownDate={campaign.countdownDate} />
                            
                            <h3 className="campaign-title">{campaign.title}</h3>
                            <p className="campaign-text" dangerouslySetInnerHTML={{ __html: campaign.description }}></p>
                            <div className="campaign-actions">
                                <a href="/kalkylator.html" className="campaign-btn">Beräkna ditt pris</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
