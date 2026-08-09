"use client";

import { useState } from "react";

interface FaqPreviewProps {
  question: string;
  answer: string;
}

export function FaqPreview({ question, answer }: FaqPreviewProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl flex flex-col h-full min-h-[500px]">
      {/* Include the public frontend CSS specifically for this preview */}
      <link rel="stylesheet" href="/style.css" />
      
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-700 text-sm tracking-wide uppercase">Live Preview</h3>
        <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
          Interaktiv
        </span>
      </div>

      <div className="p-8 flex-1 bg-white overflow-y-auto">
        <section className="faq-section" style={{ padding: '0', background: 'transparent' }}>
          <div className="faq-container" style={{ margin: '0' }}>
            <div className="faq-list">
              
              {/* Simulated FAQ Item */}
              <div className={`faq-item ${isActive ? 'active' : ''}`}>
                <button 
                  className="faq-question" 
                  onClick={() => setIsActive(!isActive)}
                  type="button"
                >
                  {question || "Din fråga kommer att visas här..."}
                </button>
                <div 
                  className="faq-answer" 
                  style={{ maxHeight: isActive ? '1000px' : '0' }}
                >
                  <div className="faq-answer-inner">
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                      {answer || "Ditt svar kommer att visas här..."}
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
