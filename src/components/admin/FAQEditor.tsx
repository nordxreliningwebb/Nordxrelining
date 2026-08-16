"use client";

import { useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { saveFAQAction } from '@/app/admin/(authenticated)/faq/actions';
import { useRouter } from 'next/navigation';
import FAQLivePreview from '@/components/admin/FAQLivePreview';

interface FAQEditorProps {
  initialData?: any;
}

export default function FAQEditor({ initialData }: FAQEditorProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    question: initialData?.question || '',
    answer: initialData?.answer || '',
    category: initialData?.category || '',
    sort_order: initialData?.sort_order ?? 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const result = await saveFAQAction(formData);

      if (!result.success) {
        throw new Error(result.error);
      }
      setSaveStatus({ type: 'success', message: 'Frågan har sparats! Omdirigerar...' });
      
      setTimeout(() => {
        router.push('/admin/faq');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      console.error('Save error:', err);
      setSaveStatus({ type: 'error', message: err.message || 'Ett fel uppstod när frågan skulle sparas.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full flex flex-col font-inter">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Hantera FAQ</h1>
          <p className="mt-2 text-gray-500">Skapa och redigera frågor och svar med Live-Preview.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Spara Fråga
        </button>
      </div>

      {saveStatus && (
        <div className={`p-4 rounded-lg mb-6 ${saveStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {saveStatus.message}
        </div>
      )}

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-[calc(100vh-12rem)] min-h-[600px]">
        
        {/* Left: Editor Column */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-gray-200">
          <div className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Fråga</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="T.ex. Vad kostar det att göra relining?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Svar</label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Skriv ett tydligt och bra svar här..."
              />
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
                  <option value="Relining">Relining</option>
                  <option value="Stamspolning">Stamspolning</option>
                  <option value="Rörinspektion">Rörinspektion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sorteringsordning (0-100)</label>
                <input
                  type="number"
                  name="sort_order"
                  value={formData.sort_order}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Lägre siffra visas högst upp.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Live Preview Column */}
        <div className="sticky top-0 h-[calc(100vh-12rem)] hidden lg:block">
          <FAQLivePreview {...formData} />
        </div>

      </div>
    </div>
  );
}
