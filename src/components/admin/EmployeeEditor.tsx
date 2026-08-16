"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveEmployeeAction } from "@/app/admin/(authenticated)/personal/actions";
import { supabase } from "@/lib/supabase";
import { Upload, X, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type EmployeeData = {
  id?: string;
  name: string;
  role: string;
  image_url: string | null;
  sort_order: number;
  published: boolean;
};

export default function EmployeeEditor({ initialData }: { initialData?: EmployeeData }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<EmployeeData>({
    id: initialData?.id,
    name: initialData?.name || "",
    role: initialData?.role || "",
    image_url: initialData?.image_url || null,
    sort_order: initialData?.sort_order || 0,
    published: initialData?.published ?? true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `team/${fileName}`;

      const { data, error } = await supabase.storage
        .from('project-images') // Ateranvander project-images bucket
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
      return null;
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    setError(null);
    setUploadProgress(10); // Fake progress to show it started
    
    try {
      const url = await uploadFile(file);
      if (url) {
        setFormData(prev => ({ ...prev, image_url: url }));
        setUploadProgress(100);
      } else {
        setError("Kunde inte ladda upp bilden. Försök igen.");
      }
    } catch (err) {
      setError("Ett oväntat fel uppstod vid uppladdning.");
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000); // Reset after success
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image_url: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      setError("Namn och roll måste fyllas i.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const result = await saveEmployeeAction(formData);

    if (result.success) {
      router.push("/admin/personal");
      router.refresh();
    } else {
      setError(result.error || "Ett fel uppstod när medarbetaren skulle sparas.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/personal" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Tillbaka till teamet
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {initialData ? "Redigera Medarbetare" : "Ny Medarbetare"}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm">1</span>
              Grunduppgifter
            </h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-start gap-3">
                <div className="mt-0.5">⚠️</div>
                <div>{error}</div>
              </div>
            )}
            
            <form id="employee-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Namn *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                  placeholder="t.ex. Abraham Hanon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Roll / Titel *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                  placeholder="t.ex. VD & Grundare"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sorteringsordning</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={e => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                  placeholder="0"
                />
                <p className="text-xs text-slate-500 mt-2">Lägre nummer visas först. Standard är 0.</p>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm">2</span>
              Inställningar
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-medium text-slate-900">Publicerad</div>
                  <div className="text-sm text-slate-500">Synlig på webbplatsen</div>
                </div>
                <div className={`w-11 h-6 rounded-full transition-colors relative ${formData.published ? 'bg-sky-500' : 'bg-slate-200'}`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.published}
                    onChange={e => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                  />
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.published ? 'left-6' : 'left-1'}`} />
                </div>
              </label>
            </div>
          </div>

          {/* Profilbild */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-sm">3</span>
              Profilbild
            </h2>
            
            <input 
              type="file" 
              accept="image/*"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageSelect}
            />
            
            {formData.image_url ? (
              <div className="relative aspect-square w-full rounded-full overflow-hidden border border-slate-200 mb-4 bg-slate-50 mx-auto max-w-[240px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={formData.image_url} 
                  alt="Profilbild" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 p-2 bg-white/90 text-red-600 rounded-full hover:bg-red-50 hover:text-red-700 transition-colors shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`aspect-square w-full max-w-[240px] mx-auto rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isUploading ? 'border-slate-200 bg-slate-50' : 'border-slate-300 hover:border-sky-400 hover:bg-sky-50'
                }`}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center text-sky-600">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <span className="text-sm font-medium">{uploadProgress}%</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <Upload className="w-8 h-8 mb-2 text-slate-400" />
                    <span className="text-sm font-medium">Ladda upp bild</span>
                    <span className="text-xs mt-1">Kvadratisk rekommenderas</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-64 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {initialData ? "Redigerar medarbetare" : "Skapar ny medarbetare"}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/personal")}
              className="px-6 py-2.5 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Avbryt
            </button>
            <button
              type="submit"
              form="employee-form"
              disabled={isSubmitting || isUploading}
              className="px-8 py-2.5 bg-sky-600 text-white rounded-xl font-medium hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sparar...
                </>
              ) : (
                initialData ? "Spara ändringar" : "Skapa medarbetare"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
