"use client";

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import BlockEditor, { ContentBlock } from '@/components/admin/BlockEditor';
import { Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { saveKnowledgeBankAction } from './actions';

// Initialize Supabase Client for client-side uploads (Storage)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function KnowledgeBankPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    authorName: '',
    coverImage: null as string | null,
    authorAvatar: null as string | null,
    blocks: [] as ContentBlock[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlocksChange = (newBlocks: ContentBlock[]) => {
    setFormData(prev => ({ ...prev, blocks: newBlocks }));
  };

  const uploadFile = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error } = await supabase.storage
        .from('project-images') // Reusing the same bucket for simplicity, or change to 'blog-images' if it exists
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err: any) {
      console.error('Error uploading file:', err);
      alert(`Kunde inte ladda upp filen. Supabase svarade: ${err.message || 'Okänt fel'}`);
      return null;
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploadingCover(true);
    const file = e.target.files[0];
    const url = await uploadFile(file, 'blog-covers');
    if (url) {
      setFormData(prev => ({ ...prev, coverImage: url }));
    }
    setIsUploadingCover(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploadingAvatar(true);
    const file = e.target.files[0];
    const url = await uploadFile(file, 'blog-avatars');
    if (url) {
      setFormData(prev => ({ ...prev, authorAvatar: url }));
    }
    setIsUploadingAvatar(false);
  };

  const handleBlockImageUpload = async (file: File): Promise<string | null> => {
    return await uploadFile(file, 'blog-blocks');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const contentJson = JSON.stringify(formData.blocks);
      const result = await saveKnowledgeBankAction({ ...formData, contentJson });

      if (!result.success) {
        throw new Error(result.error);
      }
      
      setSaveStatus({ type: 'success', message: 'Artikeln har sparats framgångsrikt!' });
    } catch (err: any) {
      console.error('Save error:', err);
      setSaveStatus({ type: 'error', message: err.message || 'Ett fel uppstod när artikeln skulle sparas.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col font-inter">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hantera Kunskapsbank</h1>
          <p className="mt-2 text-gray-500">Skapa och redigera artiklar med dynamiska block.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Spara Artikel
        </button>
      </div>

      {saveStatus && (
        <div className={`p-4 rounded-lg mb-6 ${saveStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {saveStatus.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 items-start">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Titel</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="T.ex. Så fungerar relining..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Datum</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="" disabled>Välj kategori...</option>
                <option value="Guide">Guide</option>
                <option value="Nyhet">Nyhet</option>
                <option value="Fakta">Fakta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sammanfattning (Excerpt)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="En kort säljande beskrivning..."
              />
            </div>

            <hr className="border-gray-100" />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Författare (Namn)</label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="T.ex. Johan Andersson"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Huvudbild (Cover)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-sm">
                    {isUploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    Välj Bild
                    <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} disabled={isUploadingCover} />
                  </label>
                  {formData.coverImage && <span className="text-xs text-green-600 font-medium">Uppladdad ✓</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Författare (Profilbild)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-sm">
                    {isUploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    Välj Bild
                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} disabled={isUploadingAvatar} />
                  </label>
                  {formData.authorAvatar && <span className="text-xs text-green-600 font-medium">Uppladdad ✓</span>}
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">Huvudinnehåll (Dynamiska Block)</label>
              <BlockEditor 
                blocks={formData.blocks} 
                onChange={handleBlocksChange}
                onUploadImage={handleBlockImageUpload}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
