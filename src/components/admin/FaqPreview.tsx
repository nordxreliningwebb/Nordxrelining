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
      {/* Include ONLY the FAQ CSS specifically for this preview to not break the admin global styling */}
      <style>{`
        .faq-item {
          background: #1B263B;
          margin-bottom: 1.25rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .faq-item:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.1);
        }
        .faq-question {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          padding: 2rem 2.5rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          font-size: 1.15rem;
          position: relative;
          user-select: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: inherit;
        }
        .faq-question::after {
          content: '+';
          font-size: 1.6rem;
          color: #0284c7;
          transition: transform 0.4s ease;
        }
        .faq-item.active .faq-question::after {
          transform: rotate(45deg);
        }
        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-item.active .faq-answer {
          grid-template-rows: 1fr;
        }
        .faq-answer-inner {
          overflow: hidden;
        }
        .faq-answer-inner p {
          padding: 0 2.5rem 2.5rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          font-size: 1.05rem;
          margin: 0;
        }
      `}</style>
      
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
