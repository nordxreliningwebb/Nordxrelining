"use client";

import { useState } from "react";
import { FaqPreview } from "./FaqPreview";
import { addFaq, updateFaq, deleteFaq } from "@/app/admin/(authenticated)/content/faq/actions";
import { Trash2, Edit2, Plus, Save, X } from "lucide-react";

export function FaqManager({ initialFaqs }: { initialFaqs: any[] }) {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (faq: any) => {
    setCurrentId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  const handleCancel = () => {
    setCurrentId(null);
    setQuestion("");
    setAnswer("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("question", question);
    formData.append("answer", answer);

    if (currentId) {
      await updateFaq(currentId, formData);
      setFaqs(faqs.map(f => f.id === currentId ? { ...f, question, answer } : f));
    } else {
      await addFaq(formData);
      // Optimistic update - in a real app you might want to re-fetch to get the actual ID
      setFaqs([...faqs, { id: Date.now(), question, answer, order_index: faqs.length }]);
    }
    
    handleCancel();
    setIsSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Är du säker på att du vill ta bort denna FAQ?")) {
      await deleteFaq(id);
      setFaqs(faqs.filter(f => f.id !== id));
      if (currentId === id) handleCancel();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column: Controls */}
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-slate-50">
            <h2 className="text-lg font-bold text-gray-900">
              {currentId ? "Redigera FAQ" : "Lägg till ny FAQ"}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fråga
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="T.ex. Hur lång tid tar det?"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Svar
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                placeholder="Skriv det detaljerade svaret här..."
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {currentId ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {isSubmitting ? "Sparar..." : currentId ? "Spara ändringar" : "Lägg till FAQ"}
              </button>
              
              {currentId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl flex items-center gap-2 transition-all"
                >
                  <X className="w-5 h-5" />
                  Avbryt
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List of existing FAQs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-slate-50">
            <h2 className="text-lg font-bold text-gray-900">Befintliga FAQ ({faqs.length})</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            {faqs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Inga frågor upplagda ännu.</div>
            ) : (
              faqs.map((faq) => (
                <div key={faq.id} className="p-5 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1 line-clamp-1">{faq.question}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Redigera"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Ta bort"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Live Preview */}
      <div className="lg:sticky lg:top-8 h-full">
        <FaqPreview question={question} answer={answer} />
      </div>
    </div>
  );
}
