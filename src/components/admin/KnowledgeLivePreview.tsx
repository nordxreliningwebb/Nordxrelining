"use client";

import React, { useEffect, useState } from 'react';
import { ContentBlock } from './BlockEditor';
import { LayoutGrid, FileText, HelpCircle } from 'lucide-react';
import BlockRenderer from '@/components/public/BlockRenderer';
import Link from 'next/link';

interface KnowledgeLivePreviewProps {
  title: string;
  subheading: string;
  date: string;
  authorName: string;
  authorAvatar: string | null;
  coverImage: string | null;
  blocks: ContentBlock[];
  category: string;
}

export default function KnowledgeLivePreview(props: KnowledgeLivePreviewProps) {
  const [viewMode, setViewMode] = useState<'card' | 'page'>('page');
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    // Generate TOC based on blocks
    if (props.blocks) {
      const headings = props.blocks.filter(b => b.type === 'heading') as Extract<ContentBlock, { type: 'heading' }>[];
      const newToc = headings.map((h, i) => ({
        id: `preview-section-${i}`,
        text: h.content || 'Ny rubrik',
        level: h.level
      }));
      setToc(newToc);
    }
  }, [props.blocks]);

  const heroStyle = {
    background: props.coverImage 
      ? `linear-gradient(rgba(27, 38, 59, 0.4), rgba(27, 38, 59, 0.4)), url('${props.coverImage}')`
      : '#0284c7', 
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

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
        
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'card' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Kort
          </button>
          <button
            onClick={() => setViewMode('page')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'page' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="w-4 h-4" /> Helsida
          </button>
        </div>
      </div>

      {/* Render selected view */}
      {viewMode === 'card' ? (
        <div className="flex-grow flex items-center justify-center p-8 bg-gray-50">
          {/* Card Preview adapted for Knowledge Posts */}
          <div className="w-full max-w-[380px]">
            <Link href="#" className="project-card-v2 premium-blog-card visible shadow-lg" onClick={(e) => e.preventDefault()} style={{ display: 'block' }}>
                <div className="project-card-v2-media anim-scale-down-container">
                    <img src={props.coverImage || '/construction.jpg'} alt={props.title} className="anim-scale-down" />
                </div>
                <div className="project-card-v2-content">
                    <div className="project-card-v2-meta">
                        <span>{props.date ? new Date(props.date).toLocaleDateString('sv-SE') : 'Pågående'}</span> | <span style={{ textTransform: 'capitalize' }}>{props.category || 'Okategoriserad'}</span>
                    </div>
                    <h3 className="anim-fade-up">{props.title || 'Utan titel'}</h3>
                    <p className="anim-fade-up">{props.subheading || 'Kort utdrag...'}</p>
                    <span className="project-card-v2-btn">Läs mer</span>
                </div>
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto flex-grow bg-white preview-scrollbar custom-html-container relative">
          
          {/* Main Content Page Klon */}
          <main id="main-content" className="pb-20">
            
            <div className="journal-hero-wrapper relative w-full" style={{ height: '50vh', minHeight: '300px' }}>
              <div className="journal-hero absolute inset-0 w-full h-full flex items-center justify-center text-center px-4" style={heroStyle}>
                <div className="journal-hero-content max-w-4xl mx-auto text-white z-10">
                  <h1 className="journal-hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight font-syne">{props.title || 'Inläggets Titel'}</h1>
                  <p className="journal-hero-excerpt text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-inter">{props.subheading || 'Här visas utdraget.'}</p>
                </div>
              </div>
            </div>

            <section className="journal-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-12 font-inter">
              
              {/* Main Content Area (2/3 width) */}
              <article className="journal-content lg:w-2/3 max-w-none">
                
                {(!props.blocks || props.blocks.length === 0) && (
                   <div className="text-gray-400 italic">Börja lägg till block i editorn för att se innehållet här...</div>
                )}
                
                {props.blocks && <BlockRenderer blocks={props.blocks} />}
              </article>

              {/* Sidebar */}
              <aside className="journal-sidebar lg:w-1/3">
                <div className="journal-sidebar-inner sticky top-8 flex flex-col gap-10 w-full max-w-[320px] ml-auto">
                  
                  {/* FÖRFATTARE */}
                  <div className="w-full">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 font-outfit tracking-wide border-b border-gray-200 pb-2">Författare</h4>
                    <div className="journal-author-card flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      {props.authorAvatar ? (
                        <img 
                          src={props.authorAvatar} 
                          alt="Författare" 
                          className="journal-avatar w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center text-gray-400 shrink-0">
                          <HelpCircle className="w-8 h-8" />
                        </div>
                      )}
                      <div className="journal-author-info flex flex-col justify-center min-w-0">
                        <span className="journal-author-name font-bold text-gray-900 text-lg truncate">{props.authorName || 'Redaktionen'}</span>
                      </div>
                    </div>
                  </div>

                  {/* FAKTA OM INLÄGGET / DATUM */}
                  <div className="w-full">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 font-outfit tracking-wide border-b border-gray-200 pb-2">Fakta om inlägget</h4>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-y-3">
                      <div className="flex items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <span className="w-24 shrink-0 text-sm text-slate-500 font-medium">Ämne</span>
                        <span className="text-sm font-bold text-slate-900 truncate">{props.category || 'Allmänt'}</span>
                      </div>
                      <div className="flex items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <span className="w-24 shrink-0 text-sm text-slate-500 font-medium">Datum</span>
                        <span className="text-sm font-bold text-slate-900 truncate">
                          {props.date ? new Date(props.date).toLocaleDateString('sv-SE') : 'Snart'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* INNEHÅLL */}
                  {toc.length > 0 && (
                    <div className="w-full">
                      <nav className="journal-toc bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="text-lg font-bold text-gray-900 mb-4 font-outfit tracking-wide border-b border-gray-200 pb-2">Innehåll</h4>
                        <ul className="space-y-3">
                          {toc.map((item, idx) => (
                            <li key={idx}>
                              <a 
                                href={`#${item.id}`} 
                                style={{
                                  marginLeft: item.level === 3 ? '1.5rem' : '0rem',
                                  color: item.level === 3 ? '#4B5563' : '#111827',
                                  fontWeight: item.level === 3 ? '400' : '500',
                                  fontSize: item.level === 3 ? '0.875rem' : '1rem'
                                }}
                                className="block hover:text-blue-600 transition-colors"
                              >
                                {item.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </div>
                  )}

                </div>
              </aside>

            </section>
          </main>
        </div>
      )}

      {/* Styles for scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .preview-scrollbar::-webkit-scrollbar { width: 6px; }
        .preview-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .preview-scrollbar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 10px; }
        .preview-scrollbar::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
      `}} />

    </div>
  );
}
