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
        
        <div className="project-card-v2 premium-blog-card visible shadow-lg" style={{ display: 'block', margin: 0 }}>
            <div className="project-card-v2-media anim-scale-down-container">
                <img src={imageUrl} alt={title || 'Projektbild'} className="anim-scale-down" />
            </div>
            <div className="project-card-v2-content">
                <div className="project-card-v2-meta">
                    <span>{formattedDate}</span> | <span style={{ textTransform: 'capitalize' }}>{category || 'Kategori'}</span>
                </div>
                <h3 className="anim-fade-up">{title || 'Projektets Titel'}</h3>
                <p className="anim-fade-up line-clamp-3">{subheading || 'Här visas en kort sammanfattning eller underrubrik för projektet.'}</p>
                <span className="project-card-v2-btn">Läs mer</span>
            </div>
        </div>

      </div>
    </div>
  );
}
