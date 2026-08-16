"use client";

import { useState } from 'react';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { deleteFAQAction } from '@/app/admin/(authenticated)/faq/actions';
import { useRouter } from 'next/navigation';

export default function DeleteFAQButton({ faqId }: { faqId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteFAQAction(faqId);
      if (res.success) {
        setShowModal(false);
        router.refresh();
      } else {
        alert(res.error || "Ett fel uppstod");
      }
    } catch (err: any) {
      alert("Något gick fel");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
      >
        <Trash2 className="w-4 h-4" />
        Ta bort
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm transition-opacity">
          
          {/* Modal Container */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all scale-100 opacity-100 flex flex-col items-center p-6 text-center">
            
            {/* Warning Icon - Centered */}
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6 text-red-600">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            {/* Modal Content - Centered */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Är du helt säker?</h3>
            <p className="text-gray-600 mb-8 max-w-xs">
              Detta kommer att radera frågan permanent från databasen. Denna åtgärd kan inte ångras.
            </p>
            
            {/* Modal Actions - Centered */}
            <div className="flex justify-center gap-3 w-full">
              <button 
                onClick={() => setShowModal(false)}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors w-1/2"
              >
                Nej, avbryt
              </button>
              
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 w-1/2 shadow-sm"
              >
                {isDeleting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
                Ja, ta bort
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
