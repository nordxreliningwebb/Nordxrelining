"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ProjectCardPreviewProps {
  title: string;
  subheading: string;
  date: string;
  category: string;
  coverImage: string | null;
}

export default function ProjectCardPreview({
  title,
  subheading,
  date,
  category,
  coverImage
}: ProjectCardPreviewProps) {
  // Fallback image if coverImage is not provided
  const imageUrl = coverImage || 'https://via.placeholder.com/800x600.png?text=V%C3%A4lj+bild...';

  // Format the date somewhat nicely
  const formattedDate = date ? new Date(date).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : 'Inget datum valt';

  return (
    <div className="flex items-center justify-center h-full w-full bg-[#f8fafc] p-8 overflow-auto">
      {/* Container to restrict width to a realistic card size (e.g. max-w-sm) */}
      <div className="w-full max-w-sm">
        
        {/* The Card */}
        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col group h-full">
          
          {/* Image Container */}
          <div className="relative w-full h-56 bg-gray-100 flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={title || 'Projektbild'} 
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>

          {/* Content Container */}
          <div className="p-6 flex flex-col flex-grow min-w-0">
            
            {/* Meta */}
            <div className="flex items-center gap-2 text-base text-slate-500 mb-3 font-inter truncate">
              <span>{formattedDate}</span>
              <span className="text-slate-300">|</span>
              <span className="truncate">{category || 'Kategori'}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-[#003366] mb-3 leading-tight font-syne truncate break-all">
              {title || 'Projektets Titel'}
            </h3>

            {/* Excerpt/Subheading */}
            <p className="text-slate-600 leading-relaxed mb-6 flex-grow font-inter line-clamp-3 break-all whitespace-normal">
              {subheading || 'Här visas en kort sammanfattning eller underrubrik för projektet.'}
            </p>

            {/* Button */}
            <div className="mt-auto">
              <span className="inline-block bg-[#0284c7] hover:bg-[#026aa2] text-white font-bold text-base px-6 py-2.5 rounded-md transition-colors">
                Läs mer
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
