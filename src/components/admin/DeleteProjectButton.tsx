"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProjectAction } from "@/app/admin/(authenticated)/projekt/actions";

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteProjectAction(projectId);
    
    if (result.success) {
      setIsOpen(false);
      router.refresh();
    } else {
      alert(result.error || "Ett fel uppstod vid borttagning.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
      >
        <Trash2 className="w-4 h-4" />
        Ta bort
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-auto animate-in fade-in zoom-in duration-200 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ta bort projekt</h3>
            <p className="text-gray-600 text-sm mb-6">
              Är du säker på att du vill ta bort det här projektet? Denna åtgärd går inte att ångra.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Nej, avbryt
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                Ja, ta bort
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
