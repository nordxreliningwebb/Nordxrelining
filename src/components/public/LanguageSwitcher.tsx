"use client";

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('sv');

  // Load saved language on mount
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
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    
    // Set Google Translate cookie
    // googtrans format: /sv/en (from Swedish to English)
    const translateCookieValue = langCode === 'sv' ? '/sv/sv' : '/sv/en';
    
    // Set for current domain
    document.cookie = `googtrans=${translateCookieValue}; path=/`;
    document.cookie = `googtrans=${translateCookieValue}; domain=${location.hostname}; path=/`;
    
    // Reload to apply translation
    window.location.reload();
  };

  return (
    <div className="language-switcher-container" style={{ position: 'relative', display: 'inline-block', marginRight: '1rem', zIndex: 100 }}>
      <button 
        className="language-btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' }}
        aria-label="Välj språk / Choose language"
      >
        <Globe size={22} />
      </button>

      {isOpen && (
        <div 
          className="language-dropdown" 
          style={{ 
            position: 'absolute', 
            top: '100%', 
            right: 0, 
            marginTop: '0.5rem',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            minWidth: '130px'
          }}
        >
          <button 
            onClick={() => changeLanguage('sv')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              width: '100%', 
              padding: '0.75rem 1rem',
              background: currentLang === 'sv' ? '#f8fafc' : 'white',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: currentLang === 'sv' ? 600 : 400
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🇸🇪</span>
            Svenska
          </button>
          
          <button 
            onClick={() => changeLanguage('en')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              width: '100%', 
              padding: '0.75rem 1rem',
              background: currentLang === 'en' ? '#f8fafc' : 'white',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: currentLang === 'en' ? 600 : 400
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>🇬🇧</span>
            English
          </button>
        </div>
      )}
    </div>
  );
}
