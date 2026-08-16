"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { saveCampaignAction } from "@/app/admin/(authenticated)/kampanjer/actions";
import CampaignLivePreview from "./CampaignLivePreview";

type Campaign = {
  id?: string;
  name: string;
  title: string;
  description: string;
  discount: string;
  badgeText: string;
  countdownDate: string; // ISO string
  ctaText: string;
  ctaLink: string;
  isActive: boolean;
};

// Formatter to convert ISO string to YYYY-MM-DDThh:mm format for datetime-local input
const formatForInput = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  // Account for timezone offset to show correct local time in the input
  const localIso = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
  return localIso.slice(0, 16);
};

export default function CampaignEditor({ initialData }: { initialData?: Campaign }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Default tomorrow
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  defaultDate.setHours(23, 59, 0, 0);

  const [formData, setFormData] = useState<Campaign>({
    id: initialData?.id || undefined,
    name: initialData?.name || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    discount: initialData?.discount || "",
    badgeText: initialData?.badgeText || "",
    countdownDate: initialData?.countdownDate || defaultDate.toISOString(),
    ctaText: initialData?.ctaText || "Boka nu",
    ctaLink: initialData?.ctaLink || "/kontakt",
    isActive: initialData ? initialData.isActive : true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === "datetime-local") {
      // Convert local input time to standard ISO string
      const dateValue = new Date(value);
      setFormData(prev => ({ ...prev, [name]: dateValue.toISOString() }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.title || !formData.discount) {
      alert("Vänligen fyll i alla obligatoriska fält (Namn, Titel, Rabatt).");
      return;
    }

    setIsSaving(true);
    const result = await saveCampaignAction(formData, formData.id);
    
    if (result.success) {
      router.push("/admin/kampanjer");
      router.refresh();
    } else {
      alert("Fel vid sparning: " + result.error);
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full font-inter space-y-6">
      
      {/* Top Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/kampanjer"
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {formData.id ? "Redigera Kampanj" : "Skapa Ny Kampanj"}
            </h1>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Spara Kampanj
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
        
        {/* Editor Form */}
        <div className="w-full xl:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Interna Inställningar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Internt Namn (visas ej för kund)</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="t.ex. Höstkampanj 2026"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kampanj Status</label>
                  <label className="flex items-center gap-3 p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      name="isActive"
                      checked={formData.isActive} 
                      onChange={handleChange} 
                      className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500" 
                    />
                    <span className="text-sm font-medium text-gray-700">Aktiv (LIVE)</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Utseende & Innehåll</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Rabatt / Huvudbudskap</label>
                    <input 
                      type="text" 
                      name="discount"
                      value={formData.discount} 
                      onChange={handleChange} 
                      placeholder="t.ex. 20% RABATT"
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm font-bold" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Rubrik (Title)</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title} 
                    onChange={handleChange} 
                    placeholder="t.ex. På din nästa spolning"
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Beskrivning</label>
                  <textarea 
                    name="description"
                    value={formData.description} 
                    onChange={handleChange} 
                    rows={4}
                    placeholder="Erbjudandet gäller under en begränsad tid..."
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all resize-none text-sm leading-relaxed"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Nedräkning & Knapp</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slutdatum (Countdown Timer)</label>
                  <input 
                    type="datetime-local" 
                    name="countdownDate"
                    value={formatForInput(formData.countdownDate)} 
                    onChange={handleChange} 
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm font-medium" 
                  />
                  <p className="text-xs text-gray-500 mt-1.5">Timern på hemsidan räknar ner till exakt detta klockslag.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Knapptext (CTA)</label>
                    <input 
                      type="text" 
                      name="ctaText"
                      value={formData.ctaText} 
                      onChange={handleChange} 
                      placeholder="t.ex. Boka nu"
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Knapplänk (URL)</label>
                    <input 
                      type="text" 
                      name="ctaLink"
                      value={formData.ctaLink} 
                      onChange={handleChange} 
                      placeholder="t.ex. /kontakt"
                      className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm" 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Live Preview */}
        <div className="w-full xl:w-1/2 bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center justify-center overflow-y-auto custom-scrollbar">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Preview</h2>
            <p className="text-gray-500">Så här ser popup-kampanjen ut på skärmen.</p>
          </div>
          
          <div className="w-full">
            <CampaignLivePreview 
              title={formData.title}
              description={formData.description}
              discount={formData.discount}
              countdownDate={formData.countdownDate}
              ctaText={formData.ctaText}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
