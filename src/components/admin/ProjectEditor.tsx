"use client";

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import BlockEditor, { ContentBlock } from '@/components/admin/BlockEditor';
import ProjectLivePreview from '@/components/admin/ProjectLivePreview';
import { Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { saveProjectAction } from '@/app/admin/(authenticated)/projekt/actions';
import { useRouter } from 'next/navigation';

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface ProjectEditorProps {
  initialData?: any;
}

export default function ProjectEditor({ initialData }: ProjectEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Parse blocks if initialData has it as a string
  let initialBlocks: ContentBlock[] = [];
  if (initialData?.content) {
    try {
      initialBlocks = typeof initialData.content === 'string' ? JSON.parse(initialData.content) : initialData.content;
    } catch (e) {
      console.error("Failed to parse initial blocks:", e);
    }
  }

  // Form State
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    title: initialData?.title || '',
    subheading: initialData?.description || initialData?.excerpt || '',
    category: initialData?.category || '',
    city: initialData?.city || '',
    date: initialData?.publish_date ? new Date(initialData.publish_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    authorName: initialData?.author || '',
    clientName: initialData?.client || '',
    coverImage: (initialData?.images && initialData.images.length > 0) ? initialData.images[0] : null,
    authorAvatar: initialData?.author_image || null,
    blocks: initialBlocks
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

      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err: any) {
      console.error('Error uploading file:', err);
      alert(`Kunde inte ladda upp filen. Supabase svarade: ${err.message || 'Okänt fel'}\n\nTips: Gå till din Supabase Dashboard -> Storage -> Policies och se till att din bucket "project-images" tillåter INSERT (uploads) och SELECT.`);
      return null;
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploadingCover(true);
    const file = e.target.files[0];
    const url = await uploadFile(file, 'covers');
    if (url) {
      setFormData(prev => ({ ...prev, coverImage: url }));
    }
    setIsUploadingCover(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploadingAvatar(true);
    const file = e.target.files[0];
    const url = await uploadFile(file, 'avatars');
    if (url) {
      setFormData(prev => ({ ...prev, authorAvatar: url }));
    }
    setIsUploadingAvatar(false);
  };

  const handleBlockImageUpload = async (file: File): Promise<string | null> => {
    return await uploadFile(file, 'content-blocks');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      // Serialisera block-arrayen till en JSON sträng
      const contentJson = JSON.stringify(formData.blocks);

      const result = await saveProjectAction({ ...formData, contentJson });

      if (!result.success) {
        throw new Error(result.error);
      }
      setSaveStatus({ type: 'success', message: 'Projektet har sparats framgångsrikt! Omdirigerar...' });
      
      setTimeout(() => {
        router.push('/admin/projekt');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      console.error('Save error:', err);
      setSaveStatus({ type: 'error', message: err.message || 'Ett fel uppstod när projektet skulle sparas.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col font-inter">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hantera Projekt</h1>
          <p className="mt-2 text-gray-500">Skapa och redigera projekt med dynamiska block och Live-Preview.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Spara Projekt
        </button>
      </div>

      {saveStatus && (
        <div className={`p-4 rounded-lg mb-6 ${saveStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {saveStatus.message}
        </div>
      )}

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-[calc(100vh-12rem)] min-h-[800px]">
        
        {/* Left: Editor Column */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-200">
          <div className="space-y-6">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Projektets Titel</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="T.ex. Stamspolning i Södertälje"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Datum</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="" disabled>Välj kategori...</option>
                  <option value="Stamspolning">Stamspolning</option>
                  <option value="Rörinspektion">Rörinspektion</option>
                  <option value="Relining">Relining</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ort / Plats</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="T.ex. Södertälje"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Underrubrik / Sammanfattning</label>
              <textarea
                name="subheading"
                value={formData.subheading}
                onChange={handleChange}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="En kort säljande beskrivning av rörinspektionen..."
              />
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Projektledare (Namn)</label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="T.ex. Johan Andersson"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Beställare (Företagsnamn)</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="T.ex. HSB Brf Lärkan"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Huvudbild (Cover)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm">
                    {isUploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    Välj Bild
                    <input type="file" className="hidden" accept="image/*" onChange={handleCoverUpload} disabled={isUploadingCover} />
                  </label>
                  {formData.coverImage && <span className="text-xs text-green-600 font-medium">Uppladdad ✓</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Projektledare (Profilbild)</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm">
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

        {/* Right: Live Preview Column */}
        <div className="sticky top-0 h-[calc(100vh-12rem)] hidden lg:block">
          <ProjectLivePreview {...formData} />
        </div>

      </div>
    </div>
  );
}
