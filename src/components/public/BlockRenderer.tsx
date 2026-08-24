import React from 'react';
import { ContentBlock } from '@/components/admin/BlockEditor';

interface BlockRendererProps {
  blocks: ContentBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return <div className="text-gray-400 italic">Inget innehåll finns tillgängligt.</div>;
  }

  return (
    <>
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          const id = `section-${idx}`;
          return block.level === 2 
            ? <h2 key={idx} id={id} className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-gray-900 break-words">{block.content || 'Ny rubrik'}</h2>
            : <h3 key={idx} id={id} className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800 break-words">{block.content || 'Ny rubrik'}</h3>;
        }
        
        if (block.type === 'text') {
          return (
            <div 
              key={idx} 
              className="text-lg text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap break-words [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:pl-2 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:pl-2 [&_ol]:my-4 [&_li]:mb-2 [&_em]:italic [&_i]:italic [&_a]:text-blue-600 [&_a]:underline [&_strong]:font-bold" 
              dangerouslySetInnerHTML={{ __html: block.content || '' }} 
            />
          );
        }
        
        if (block.type === 'image' && block.url) {
          return (
            <figure key={idx} className="my-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <img src={block.url} alt={block.alt || ''} className="w-full h-auto object-cover" />
              {block.alt && (
                <figcaption className="p-3 bg-gray-50 text-sm text-gray-500 text-center border-t border-gray-100">
                  {block.alt}
                </figcaption>
              )}
            </figure>
          );
        }
        
        return null;
      })}
    </>
  );
}
