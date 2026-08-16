"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function FAQAccordionClient({
  question,
  answer,
  waveClass = "wave-1"
}: {
  question: string;
  answer: string;
  waveClass?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isOpen && answerRef.current) {
      setMaxHeight(`${answerRef.current.scrollHeight + 40}px`);
    } else {
      setMaxHeight(undefined);
    }
  }, [isOpen]);

  return (
    <div className={`nordx-faq-card faq-wave-base ${waveClass}`}>
      <button 
        className="nordx-faq-btn" 
        aria-expanded={isOpen} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg 
          className="nordx-faq-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </button>
      <div 
        ref={answerRef}
        className={`nordx-faq-answer ${isOpen ? 'open' : ''}`}
        style={{ maxHeight: maxHeight }}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
}
