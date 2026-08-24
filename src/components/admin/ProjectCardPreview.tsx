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
      {/* Container to restrict width to a realistic card size */}
      <div className="w-full max-w-[380px]">
        
        {/* Card exact Tailwind replica */}
        <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full">
            <div className="h-[210px] overflow-hidden">
                <img src={imageUrl} alt={title || 'Projektbild'} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-grow text-left">
                <div className="text-[0.85rem] text-slate-500 mb-3 flex items-center gap-2">
                    <span>{formattedDate}</span> | <span className="capitalize">{category || 'Kategori'}</span>
                </div>
                <h3 className="text-xl text-[#1B263B] font-bold mb-2">{title || 'Projektets Titel'}</h3>
                <p className="text-[0.95rem] text-slate-600 mb-4 line-clamp-3">{subheading || 'Här visas en kort sammanfattning eller underrubrik för projektet.'}</p>
                <span className="bg-[#0284c7] text-white px-[1.2rem] py-[0.6rem] rounded font-bold w-fit mt-auto text-sm">Läs mer</span>
            </div>
        </div>

      </div>
    </div>
  );
}
