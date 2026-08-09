"use client";

import React, { useState } from 'react';
import { Type, Image as ImageIcon, Heading2, Heading3, GripVertical, Trash2, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';

import TiptapEditor from './TiptapEditor';

export type ContentBlock = 
  | { id: string; type: 'text'; content: string }
  | { id: string; type: 'heading'; level: 2 | 3; content: string }
  | { id: string; type: 'image'; url: string; alt: string };

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  onUploadImage: (file: File) => Promise<string | null>;
}

export default function BlockEditor({ blocks, onChange, onUploadImage }: BlockEditorProps) {
  
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addBlock = (type: ContentBlock['type'], level?: 2 | 3) => {
    let newBlock: ContentBlock;
    if (type === 'heading') {
      newBlock = { id: generateId(), type: 'heading', level: level || 2, content: '' };
    } else if (type === 'image') {
      newBlock = { id: generateId(), type: 'image', url: '', alt: '' };
    } else {
      newBlock = { id: generateId(), type: 'text', content: '' };
    }
    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(blocks.map(b => b.id === id ? { ...b, ...updates } as ContentBlock : b));
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  return (
    <div className="space-y-6">
      
      {/* Block List */}
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={block.id} className="relative group bg-white border border-gray-200 rounded-xl p-4 pl-12 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            
            {/* Drag Handle & Controls (Left side) */}
            <div className="absolute left-2 top-0 bottom-0 flex flex-col items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <button 
                type="button" 
                onClick={() => moveBlock(index, 'up')}
                disabled={index === 0}
                className="p-1 hover:bg-gray-100 rounded text-gray-500 disabled:opacity-30"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
              <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
              <button 
                type="button" 
                onClick={() => moveBlock(index, 'down')}
                disabled={index === blocks.length - 1}
                className="p-1 hover:bg-gray-100 rounded text-gray-500 disabled:opacity-30"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>

            {/* Delete Button (Right side) */}
            <button
              type="button"
              onClick={() => removeBlock(block.id)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 z-10"
              title="Ta bort block"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Block Content Inputs */}
            <div className="pr-8 relative">
              
              {block.type === 'heading' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                      {block.level === 2 ? 'Huvudrubrik (H2)' : 'Underrubrik (H3)'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    placeholder="Skriv rubrik här..."
                    className={`w-full outline-none font-bold text-gray-900 ${block.level === 2 ? 'text-2xl' : 'text-xl'} placeholder-gray-300`}
                  />
                </div>
              )}

              {block.type === 'text' && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded inline-block mb-1">Brödtext</span>
                  <TiptapEditor 
                    content={block.content} 
                    onChange={(html) => updateBlock(block.id, { content: html })} 
                    minHeight="min-h-[100px]"
                  />
                </div>
              )}

              {block.type === 'image' && (
                <ImageBlockEditor 
                  block={block} 
                  updateBlock={updateBlock} 
                  onUploadImage={onUploadImage} 
                />
              )}

            </div>
          </div>
        ))}

        {blocks.length === 0 && (
          <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
            <p className="text-gray-500">Inga block tillagda än. Klicka nedan för att börja bygga!</p>
          </div>
        )}
      </div>

      {/* Add Block Toolbar */}
      <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
        <button
          type="button"
          onClick={() => addBlock('heading', 2)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-gray-700 font-medium text-sm"
        >
          <Heading2 className="w-4 h-4 text-blue-500" /> H2 Lägg till Rubrik
        </button>
        <button
          type="button"
          onClick={() => addBlock('heading', 3)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-gray-700 font-medium text-sm"
        >
          <Heading3 className="w-4 h-4 text-purple-500" /> H3 Lägg till Underrubrik
        </button>
        <button
          type="button"
          onClick={() => addBlock('text')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-gray-700 font-medium text-sm"
        >
          <Type className="w-4 h-4 text-emerald-500" /> Lägg till Text
        </button>
        <button
          type="button"
          onClick={() => addBlock('image')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-gray-300 hover:shadow-md transition-all text-gray-700 font-medium text-sm"
        >
          <ImageIcon className="w-4 h-4 text-orange-500" /> Lägg till Bild
        </button>
      </div>

    </div>
  );
}

// Sub-component to handle image block specific logic with upload state
function ImageBlockEditor({ block, updateBlock, onUploadImage }: any) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    const file = e.target.files[0];
    const url = await onUploadImage(file);
    if (url) {
      updateBlock(block.id, { url: url });
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-4">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded inline-block">Bild</span>
      
      {block.url ? (
        <div className="relative group/img rounded-lg overflow-hidden border border-gray-200 inline-block">
          <img src={block.url} alt="Uppladdad" className="max-h-[200px] object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
             <label className="cursor-pointer bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100">
                Byt bild
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
             </label>
          </div>
        </div>
      ) : (
        <label className="cursor-pointer flex flex-col items-center justify-center w-full h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
          {isUploading ? (
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-600">Klicka för att ladda upp bild</span>
            </>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
        </label>
      )}

      {block.url && (
        <input
          type="text"
          value={block.alt}
          onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
          placeholder="Alt-text (beskrivning av bilden)..."
          className="w-full outline-none text-sm border-b border-gray-200 py-1 focus:border-blue-500 bg-transparent placeholder-gray-400"
        />
      )}
    </div>
  );
}
