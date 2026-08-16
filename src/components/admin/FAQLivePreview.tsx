"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQLivePreviewProps {
  question: string;
  answer: string;
  category: string;
}

export default function FAQLivePreview({ question, answer, category }: FAQLivePreviewProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
      
      {/* Top Toggle Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex gap-1.5 items-center">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <span className="ml-3 text-xs text-gray-400 font-medium tracking-wide">LIVE PREVIEW</span>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 font-outfit">Vanliga Frågor</h2>
          </div>

          {/* Accordion Item Preview (1:1 Clone) */}
          <style dangerouslySetInnerHTML={{__html: `
            .nordx-faq-card {
                background: #0284c7;
                border-radius: 12px;
                padding: 0 2rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .nordx-faq-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(15, 179, 255, 0.2);
            }
            .nordx-faq-btn {
                width: 100%; text-align: left; padding: 2rem 0; background: none; border: none;
                display: flex; justify-content: space-between; align-items: center; cursor: pointer;
                font-size: 1.25rem; font-weight: 600; color: #ffffff; font-family: 'Inter', sans-serif;
            }
            .nordx-faq-btn:focus { outline: none; }
            .nordx-faq-icon {
                width: 24px; height: 24px; transition: transform 0.3s ease; flex-shrink: 0; margin-left: 1rem; color: #ffffff;
            }
            .nordx-faq-btn[aria-expanded="true"] .nordx-faq-icon { transform: rotate(180deg); }
            .nordx-faq-answer {
                max-height: 0; overflow: hidden; transition: max-height 0.4s ease, opacity 0.4s ease, padding 0.4s ease; opacity: 0;
            }
            .nordx-faq-answer.open { opacity: 1; padding-bottom: 2rem; }
            .nordx-faq-answer p { color: rgba(255, 255, 255, 0.95); line-height: 1.6; font-size: 1.05rem; margin: 0; font-family: 'Inter', sans-serif; }

            .faq-wave-base {
                position: relative;
                border-top-left-radius: 0 !important;
                border-top-right-radius: 0 !important;
                margin-top: 25px;
            }
            .faq-wave-base::before {
                content: "";
                position: absolute;
                top: -15px;
                left: 0;
                width: 100%;
                height: 25px;
                background-size: 100% 100%;
                background-position: bottom;
                background-repeat: no-repeat;
                pointer-events: none;
                z-index: 1;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z' fill='%237dd3fc'/%3E%3Cpath d='M0,60 C150,110 350,10 600,60 C850,110 1050,10 1200,60 L1200,120 L0,120 Z' fill='%2338bdf8' opacity='0.7'/%3E%3Cpath d='M0,80 C250,130 350,10 600,80 C850,130 950,10 1200,80 L1200,120 L0,120 Z' fill='%230284c7'/%3E%3C/svg%3E");
            }
          `}} />

          <div className="nordx-faq-card faq-wave-base">
            <button 
              className="nordx-faq-btn" 
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{question || 'Exempelfråga: Hur mycket kostar relining?'}</span>
              <svg className="nordx-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </button>
            <div 
              className={`nordx-faq-answer ${isOpen ? 'open' : ''}`}
              style={{ maxHeight: isOpen ? '500px' : '0px' }}
            >
              <p>
                {answer ? (
                  <span className="whitespace-pre-wrap">{answer}</span>
                ) : (
                  <span className="italic opacity-70">Här kommer ditt svar att visas. En tydlig och informativ text bygger förtroende.</span>
                )}
              </p>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}
