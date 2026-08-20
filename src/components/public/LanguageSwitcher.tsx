"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('sv');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('googtrans='));
    if (cookie) {
      const lang = cookie.split('=')[1];
      if (lang.endsWith('en')) {
        setCurrentLang('en');
      } else {
        setCurrentLang('sv');
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    const translateCookieValue = langCode === 'sv' ? '/sv/sv' : '/sv/en';
    document.cookie = `googtrans=${translateCookieValue}; path=/`;
    document.cookie = `googtrans=${translateCookieValue}; domain=${location.hostname}; path=/`;
    window.location.reload();
  };

  return (
    <div className="language-switcher-container" ref={dropdownRef} style={{ position: 'relative', display: 'inline-block', marginRight: '1rem', zIndex: 100 }}>
      <button 
        className="language-btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}
        aria-label="Välj språk / Choose language"
      >
        <Globe size={22} className="globe-icon" />
      </button>

      <div 
        className="language-dropdown" 
        style={{ 
          position: 'absolute', 
          top: '100%', 
          left: '50%',
          transform: `translate(-50%, ${isOpen ? '10px' : '0'})`, 
          background: '#ffffff',
          minWidth: '160px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          padding: '0.5rem 0',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'all 0.2s ease',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button 
          onClick={() => changeLanguage('sv')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            width: '100%', 
            padding: '0.75rem 1.5rem',
            background: currentLang === 'sv' ? 'rgba(2, 132, 199, 0.05)' : 'transparent',
            color: currentLang === 'sv' ? '#0284c7' : '#1B263B',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 500,
            fontSize: '1rem',
            transition: 'background 0.2s ease, color 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = '#0284c7'; e.currentTarget.style.background = 'rgba(2, 132, 199, 0.05)'; }}
          onMouseOut={(e) => { 
             e.currentTarget.style.color = currentLang === 'sv' ? '#0284c7' : '#1B263B';
             e.currentTarget.style.background = currentLang === 'sv' ? 'rgba(2, 132, 199, 0.05)' : 'transparent';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" width="20" height="14" style={{ borderRadius: '2px' }}>
            <rect width="16" height="10" fill="#006aa7"/>
            <rect width="2" height="10" x="5" fill="#fecc00"/>
            <rect width="16" height="2" y="4" fill="#fecc00"/>
          </svg>
          Svenska
        </button>
        
        <button 
          onClick={() => changeLanguage('en')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            width: '100%', 
            padding: '0.75rem 1.5rem',
            background: currentLang === 'en' ? 'rgba(2, 132, 199, 0.05)' : 'transparent',
            color: currentLang === 'en' ? '#0284c7' : '#1B263B',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 500,
            fontSize: '1rem',
            transition: 'background 0.2s ease, color 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.color = '#0284c7'; e.currentTarget.style.background = 'rgba(2, 132, 199, 0.05)'; }}
          onMouseOut={(e) => { 
             e.currentTarget.style.color = currentLang === 'en' ? '#0284c7' : '#1B263B';
             e.currentTarget.style.background = currentLang === 'en' ? 'rgba(2, 132, 199, 0.05)' : 'transparent';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="14" style={{ borderRadius: '2px' }}>
            <clipPath id="s">
              <path d="M0,0 v30 h60 v-30 z"/>
            </clipPath>
            <clipPath id="t">
              <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z"/>
            </clipPath>
            <g clipPath="url(#s)">
              <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
              <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
              <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
              <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
            </g>
          </svg>
          English
        </button>
      </div>
    </div>
  );
}
