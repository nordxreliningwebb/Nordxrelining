"use client";

import { useState } from "react";
import PricePlanLivePreview from "./PricePlanLivePreview";
import { bulkSavePricePlansAction } from "@/app/admin/(authenticated)/priser/actions";
import { useRouter } from "next/navigation";
import { Save, Plus, X, Tag } from "lucide-react";

export type PricePlan = {
  id?: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular: boolean;
  category?: string;
  campaign_text?: string | null;
  cta_text?: string;
  cta_link?: string;
  sort_order: number;
  published: boolean;
};

function ensureThreePlans(plans: PricePlan[], category: string): PricePlan[] {
  const sorted = [...plans].sort((a, b) => a.sort_order - b.sort_order);
  const result: PricePlan[] = [];
  for (let i = 0; i < 3; i++) {
    if (sorted[i]) {
      result.push({ ...sorted[i], sort_order: i, category });
    } else {
      result.push({
        name: "",
        price: "",
        description: "",
        features: [],
        isPopular: false,
        category,
        cta_text: "",
        cta_link: "",
        sort_order: i,
        published: true
      });
    }
  }
  return result;
}

export default function BulkPricePlanEditor({ allPlans }: { allPlans: PricePlan[] }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Privatpersoner" | "Företag">("Privatpersoner");
  const [isSaving, setIsSaving] = useState(false);

  const [privatPlans, setPrivatPlans] = useState<PricePlan[]>(
    ensureThreePlans(allPlans.filter(p => p.category === "Privatpersoner"), "Privatpersoner")
  );
  
  const [foretagPlans, setForetagPlans] = useState<PricePlan[]>(
    ensureThreePlans(allPlans.filter(p => p.category === "Företag"), "Företag")
  );

  const activePlans = activeTab === "Privatpersoner" ? privatPlans : foretagPlans;
  const setActivePlans = activeTab === "Privatpersoner" ? setPrivatPlans : setForetagPlans;

  const updatePlan = (index: number, field: keyof PricePlan, value: any) => {
    const newPlans = [...activePlans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setActivePlans(newPlans);
  };

  const handleAddFeature = (planIndex: number, newFeature: string) => {
    if (!newFeature.trim()) return;
    const newPlans = [...activePlans];
    newPlans[planIndex].features = [...newPlans[planIndex].features, newFeature.trim()];
    setActivePlans(newPlans);
  };

  const handleRemoveFeature = (planIndex: number, featureIndex: number) => {
    const newPlans = [...activePlans];
    newPlans[planIndex].features = newPlans[planIndex].features.filter((_, i) => i !== featureIndex);
    setActivePlans(newPlans);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await bulkSavePricePlansAction(activePlans, activeTab);
    
    if (result.success) {
      alert("Prisplanerna sparades!");
      router.refresh();
    } else {
      alert("Ett fel uppstod: " + result.error);
    }
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col h-full font-inter space-y-6">
      
      {/* Top Header & Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex justify-between items-center">
        <div className="flex bg-gray-100/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("Privatpersoner")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "Privatpersoner" 
                ? "bg-white text-[#0284c7] shadow-sm ring-1 ring-black/5" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            }`}
          >
            Privatpersoner
          </button>
          <button
            onClick={() => setActiveTab("Företag")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "Företag" 
                ? "bg-white text-[#0284c7] shadow-sm ring-1 ring-black/5" 
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
            }`}
          >
            Företag
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {isSaving ? "Sparar..." : `Spara ${activeTab}`}
        </button>
      </div>

      {/* Editor Grid (3 forms) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {activePlans.map((plan, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                Paket {index + 1} {index === 1 ? "(Mitten)" : index === 0 ? "(Vänster)" : "(Höger)"}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status:</span>
                <button
                  onClick={() => updatePlan(index, "published", !plan.published)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                    plan.published ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    plan.published ? 'translate-x-4.5' : 'translate-x-1'
                  }`} style={{ transform: plan.published ? 'translateX(18px)' : 'translateX(4px)' }} />
                </button>
              </div>
            </div>

            <div className="p-5 flex-1 space-y-5 overflow-y-auto custom-scrollbar" style={{ maxHeight: "60vh" }}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Paketnamn</label>
                <input 
                  type="text" 
                  value={plan.name} 
                  onChange={(e) => updatePlan(index, "name", e.target.value)} 
                  placeholder="t.ex. Stamspolning"
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pris</label>
                <input 
                  type="text" 
                  value={plan.price} 
                  onChange={(e) => updatePlan(index, "price", e.target.value)} 
                  placeholder="t.ex. 3495kr"
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Beskrivning</label>
                <textarea 
                  value={plan.description} 
                  onChange={(e) => updatePlan(index, "description", e.target.value)} 
                  rows={3}
                  placeholder="Kort beskrivning..."
                  className="w-full border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all resize-none text-sm"
                />
              </div>

              <div className="border-t border-gray-100 pt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Kampanj / Populär</label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={plan.isPopular} 
                      onChange={(e) => updatePlan(index, "isPopular", e.target.checked)} 
                      className="w-4 h-4 rounded border-gray-300 text-[#0284c7] focus:ring-[#0284c7]" 
                    />
                    <span className="text-sm font-medium text-gray-700">Markera som Kampanj</span>
                  </label>
                  
                  {plan.isPopular && (
                    <input 
                      type="text" 
                      value={plan.campaign_text || ""} 
                      onChange={(e) => updatePlan(index, "campaign_text", e.target.value)} 
                      placeholder="t.ex. KAMPANJ 20% RABATT"
                      className="w-full border border-gray-200 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-xs" 
                    />
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">CTA-knapp (Frivillig)</label>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Knapptext</label>
                    <input 
                      type="text" 
                      value={plan.cta_text || ""} 
                      onChange={(e) => updatePlan(index, "cta_text", e.target.value)} 
                      placeholder="t.ex. Boka online"
                      className="w-full border border-gray-200 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Knapplänk (URL)</label>
                    <input 
                      type="text" 
                      value={plan.cta_link || ""} 
                      onChange={(e) => updatePlan(index, "cta_link", e.target.value)} 
                      placeholder="t.ex. /boka eller tel:070..."
                      className="w-full border border-gray-200 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-xs" 
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Egenskaper (Features)</label>
                
                <FeatureInput onAdd={(val) => handleAddFeature(index, val)} />

                <div className="space-y-2 mt-4">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center justify-between bg-gray-50 p-2.5 rounded-lg border border-gray-100 group hover:border-[#0284c7]/30 transition-colors">
                      <span className="text-sm text-gray-700">{feature}</span>
                      <button 
                        onClick={() => handleRemoveFeature(index, fIndex)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Ta bort"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {plan.features.length === 0 && (
                    <p className="text-sm text-gray-400 italic">Inga egenskaper tillagda ännu.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Live Preview Container */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Preview</h2>
          <p className="text-gray-500">Så här ser {activeTab}-paketen ut för besökarna.</p>
        </div>
        
        {/* Render 3 cards side-by-side */}
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl justify-center items-stretch">
          {activePlans.filter(p => p.published).length > 0 ? activePlans.map((plan, index) => {
            if (!plan.published) return null;
            return (
              <div key={index} className="flex-1 flex justify-center w-full min-w-0 max-w-sm mx-auto">
                <PricePlanLivePreview 
                  name={plan.name}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  isPopular={plan.isPopular}
                  category={plan.category}
                  campaignText={plan.campaign_text}
                  ctaText={plan.cta_text}
                  ctaLink={plan.cta_link}
                />
              </div>
            );
          }) : (
            <div className="text-center text-gray-400 py-12">Alla 3 paketen i denna kategori är för närvarande dolda (MALL).</div>
          )}
        </div>
      </div>

    </div>
  );
}

function FeatureInput({ onAdd }: { onAdd: (val: string) => void }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex gap-2">
      <input 
        type="text" 
        value={val} 
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onAdd(val);
            setVal("");
          }
        }}
        placeholder="t.ex. Inkl framkörning"
        className="flex-1 border border-gray-200 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-[#0284c7] focus:border-transparent outline-none transition-all text-sm" 
      />
      <button 
        type="button"
        onClick={() => { onAdd(val); setVal(""); }}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2.5 rounded-lg transition-colors flex items-center justify-center"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
