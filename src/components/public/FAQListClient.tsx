"use client";

import React, { useState } from 'react';
import FAQAccordionClient from './FAQAccordionClient';

export default function FAQListClient({ faqs }: { faqs: any[] }) {
  const [activeFilter, setActiveFilter] = useState('alla');

  const filteredFaqs = activeFilter === 'alla' 
    ? faqs 
    : faqs.filter(faq => faq.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <>
      <div className="nordx-filter-nav anim-fade-up anim-stagger-item" style={{ marginTop: 0, marginBottom: "4rem" }}>
        <button 
          className={`nordx-filter-btn ${activeFilter === 'alla' ? 'active' : ''}`} 
          onClick={() => setActiveFilter('alla')}
        >
          ALLA
        </button>
        <button 
          className={`nordx-filter-btn ${activeFilter === 'relining' ? 'active' : ''}`} 
          onClick={() => setActiveFilter('relining')}
        >
          RELINING
        </button>
        <button 
          className={`nordx-filter-btn ${activeFilter === 'stamspolning' ? 'active' : ''}`} 
          onClick={() => setActiveFilter('stamspolning')}
        >
          STAMSPOLNING
        </button>
        <button 
          className={`nordx-filter-btn ${activeFilter === 'rorinspektion' ? 'active' : ''}`} 
          onClick={() => setActiveFilter('rorinspektion')}
        >
          RÖRINSPEKTION
        </button>
      </div>

      <div className="nordx-faq-list faq-items-container anim-stagger-parent" id="faq-accordion">
        {filteredFaqs.map((faq, idx) => (
          <div key={faq.id} className="faq-card-wrapper" data-category={faq.category?.toLowerCase() || 'alla'}>
            <FAQAccordionClient 
              question={faq.question} 
              answer={faq.answer} 
              waveClass={`wave-${(idx % 3) + 1}`}
              animClass={idx % 2 === 0 ? 'anim-fade-right' : 'anim-fade-left'}
            />
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p className="text-center text-slate-500 py-8">Inga frågor i denna kategori ännu.</p>
        )}
      </div>
    </>
  );
}
