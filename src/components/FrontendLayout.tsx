"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './public/LanguageSwitcher';
import '../../public/style.css';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);

  useEffect(() => {
    // Re-trigger premium scroll animations and all JS logic on client-side route changes
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if ((window as any).initPremiumObserver) {
            (window as any).initPremiumObserver();
        }
        if ((window as any).initNordxScripts) {
            (window as any).initNordxScripts();
        }
      }, 50);
    }
  }, [pathname]);

  useEffect(() => {
    // Sticky header logic
    const header = document.getElementById('main-header');
    const handleScroll = () => {
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Basic menu toggle logic
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('mobile-drawer-menu');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const closeBtn = document.getElementById('close-drawer-btn');

    if (toggle && menu && overlay) {
      const openMenu = () => {
        menu.classList.add('active');
        overlay.classList.add('active');
      };
      const closeMenu = () => {
        menu.classList.remove('active');
        overlay.classList.remove('active');
      };

      toggle.addEventListener('click', openMenu);
      if (closeBtn) closeBtn.addEventListener('click', closeMenu);
      overlay.addEventListener('click', closeMenu);
    }

    

    // Initialize Scroll Animations
    const triggerAnimation = (el: Element, delay = 0) => {
        setTimeout(() => {
            el.classList.add('anim-transitioning', 'anim-active');
            setTimeout(() => {
                el.classList.remove('anim-transitioning');
            }, 1800);
        }, delay);
    };

    const premiumObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.classList.contains('anim-stagger-parent')) {
                    const children = el.querySelectorAll('.anim-stagger-child, .anim-stagger-item');
                    children.forEach((child, index) => {
                        triggerAnimation(child, index * 180);
                    });
                    observer.unobserve(el);
                } else {
                    const delay = parseInt(el.getAttribute('data-anim-delay') || '0', 10);
                    triggerAnimation(el, delay);
                    observer.unobserve(el);
                }
            }
        });
    }, { threshold: 0, rootMargin: "0px 0px -15% 0px" });

    document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale-down, .anim-scale-down-container, .anim-mask-text, .anim-stagger-parent, .anim-star-pop').forEach(el => {
        premiumObserver.observe(el);
    });

    // --- NEW: Water Fill Card Animation ---
    const waterFillCards = document.querySelectorAll('.water-fill-card');
    let waterObserver: IntersectionObserver | null = null;
    
    if (waterFillCards.length > 0) {
        waterObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Array.from(waterFillCards).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('is-filled');
                    }, index * 200 + 100);
                    waterObserver?.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: window.innerWidth <= 768 ? '0px 0px -40% 0px' : '0px'
        });
        
        waterFillCards.forEach(card => waterObserver?.observe(card));
    }

    return () => {
        premiumObserver.disconnect();
        if (waterObserver) waterObserver.disconnect();
    };

  }, [pathname]);

  return (
    <div className="layout-wrapper">
      {/* Load static CSS and Fonts */}
      
      <Script src="/main.js?v=1351" strategy="lazyOnload" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Syne:wght@600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <header id="main-header" role="banner">
        <nav className="navbar" aria-label="Huvudnavigering">
            <Link href="/" className="logo-link" aria-label="NordX Relining – Till startsidan">
                <img src="/logo.png" alt="NordX Relining logotyp" id="logo-img" width={220} style={{ height: 'auto' }} loading="eager" />
            </Link>
            <ul className="nav-links" role="menubar">
                <li role="none"><Link href="/" role="menuitem">HEM</Link></li>
                <li role="none" className="desktop-has-submenu">
                    <Link href="/#tjanster" role="menuitem" aria-haspopup="true" aria-expanded="false">
                        TJÄNSTER 
                        <svg className="dropdown-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </Link>
                    <ul className="desktop-submenu" role="menu" aria-label="Tjänster">
                        <li role="none"><Link href="/stamspolning" role="menuitem">Stamspolning</Link></li>
                        <li role="none"><Link href="/rorinspektion" role="menuitem">Rörinspektion</Link></li>
                        <li role="none"><Link href="/relining" role="menuitem">Relining</Link></li>
                    </ul>
                </li>
                <li role="none"><Link href="/priser" role="menuitem">PRISER</Link></li>
                <li role="none"><Link href="/projekt" role="menuitem">PROJEKT</Link></li>
                <li role="none"><Link href="/kunskapsbanken" role="menuitem">KUNSKAPSBANKEN</Link></li>
                <li role="none"><Link href="/faq" role="menuitem">FAQ</Link></li>
                <li role="none"><Link href="/om-oss" role="menuitem">OM OSS</Link></li>
            </ul>
            <div className="header-cta desktop-only-cta">
                <LanguageSwitcher />
                <Link href="/kontakt" className="btn btn-ghost" aria-label="Gå till kontaktformuläret">Kontakt</Link>
            </div>
            <button className="menu-toggle" aria-label="Öppna meny" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>

        {/* Mobile Drawer */}
        <div className="mobile-drawer-overlay" id="mobile-drawer-overlay"></div>
        <div className="mobile-drawer-menu" id="mobile-drawer-menu">
            <button className="close-drawer-btn" id="close-drawer-btn" aria-label="Stäng meny">×</button>
            <ul className="mobile-menu-list">
                
                <li className="has-submenu">
                    <a href="#" className={`mobile-menu-link ${isMobileSubmenuOpen ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} id="mobile-submenu-toggle" onClick={(e) => { e.preventDefault(); setIsMobileSubmenuOpen(!isMobileSubmenuOpen); }}>
                        Tjänster 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease', transform: isMobileSubmenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>
                    <ul className="mobile-submenu" id="mobile-tjanster-submenu" style={{ maxHeight: isMobileSubmenuOpen ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease-out' }}>
                        <li><Link href="/stamspolning">Stamspolning</Link></li>
                        <li><Link href="/rorinspektion">Rörinspektion</Link></li>
                        <li><Link href="/relining">Relining</Link></li>
                    </ul>
                </li>
                <li><Link href="/priser" className="mobile-menu-link">Priser</Link></li>
                <li><Link href="/projekt" className="mobile-menu-link">Projekt</Link></li>
                <li><Link href="/kunskapsbanken" className="mobile-menu-link">Kunskapsbanken</Link></li>
                <li><Link href="/faq" className="mobile-menu-link">FAQ</Link></li>
                <li><Link href="/om-oss" className="mobile-menu-link">Om oss</Link></li>
                <li><Link href="/kontakt" className="mobile-menu-link">Kontakt</Link></li>
            <li className="mobile-language-switcher-container">
                      <LanguageSwitcher />
                  </li>
              </ul>
        </div>
      </header>

      {/* Main Content Rendered Here */}
      {children}

      {/* Footer */}
      <footer className="complex-footer anim-stagger-parent" role="contentinfo">
        <div className="footer-grid container">
            <div className="footer-brand">
                <Link href="/" aria-label="NordX Relining – Till startsidan">
                    <img src="/logo.png" alt="NordX Relining logotyp" width={220} style={{ height: 'auto' }} loading="lazy" className="anim-fade-up" />
                </Link>
                <p className="anim-fade-up">NordX Relining bygger säkra och optimerade lösningar för fastigheters rörsystem. Din trygga partner inom stamspolning, relining och rörinspektion.</p>
            </div>

            <nav className="footer-links-col anim-stagger-item anim-fade-up" aria-label="Snabblänkar">
                <h3>Snabblänkar</h3>
                <ul>
                    <li><Link href="/">Hem</Link></li>
                    <li><Link href="/#tjanster">Tjänster</Link></li>
                    <li><Link href="/priser">Priser</Link></li>
                    <li><Link href="/projekt">Projekt</Link></li>
                    <li><Link href="/kunskapsbanken">Kunskapsbanken</Link></li>
                    <li><Link href="/faq">FAQ</Link></li>
                    <li><Link href="/om-oss">Om Oss</Link></li>
                    <li><Link href="/kontakt">Kontakt</Link></li>
                </ul>
            </nav>

            <nav className="footer-links-col anim-stagger-item anim-fade-up" aria-label="Våra Tjänster">
                <h3>Våra tjänster</h3>
                <ul>
                    <li><Link href="/stamspolning">Stamspolning</Link></li>
                    <li><Link href="/relining">Relining</Link></li>
                    <li><Link href="/rorinspektion">Rörinspektion</Link></li>
                </ul>
            </nav>

            <address className="footer-contact-col anim-stagger-item anim-fade-up">
                <h3>Kontakta oss</h3>
                <ul className="contact-info">
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '8px', flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>Skogsgatan 3b, 152 44 Södertälje</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '8px', flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <a href="mailto:info@nordxrelining.se">info@nordxrelining.se</a>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '8px', flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <a href="tel:+46703185110">070-318 51 10</a>
                    </li>
                </ul>
            </address>
        </div>

        <div className="footer-bottom-bar container">
            <div className="footer-bottom-left">
                <p className="copyright">© 2026 NordX Relining. Alla rättigheter reserverade.</p>
                <nav className="footer-legal" aria-label="Juridisk information">
                    <Link href="/kopvillkor">Köpvillkor</Link>
                    <span className="sep">|</span>
                    <Link href="/integritetspolicy">Integritetspolicy</Link>
                    <span className="sep">|</span>
                    <Link href="/cookies">Cookies</Link>
                </nav>
                <a href="https://www.webix.se" target="_blank" rel="noopener noreferrer" className="credit-link" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none", marginTop: "0.5rem", display: "inline-block", transition: "color 0.2s ease" }} onMouseOver={(e) => e.currentTarget.style.color = '#0284c7'} onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}>Hemsida skapad av Webix</a>
            </div>
            <div className="footer-socials">
                <a href="#" aria-label="Besök oss på Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.597 1.325-1.324V1.325C24 .597 23.403 0 22.675 0z"></path></svg></a>
                <a href="#" aria-label="Besök oss på LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a>
                <a href="#" aria-label="Besök oss på Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg></a>
            </div>
        </div>
      </footer>
    </div>
  );
}
