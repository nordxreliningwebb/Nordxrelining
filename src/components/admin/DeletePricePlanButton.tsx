"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deletePricePlanAction } from "@/app/admin/(authenticated)/priser/actions";
import { useRouter } from "next/navigation";

export default function DeletePricePlanButton({ planId }: { planId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Är du säker på att du vill ta bort den här prisplanen?")) {
      return;
    }

    setIsDeleting(true);
    const result = await deletePricePlanAction(planId);
    
    if (result.success) {
      router.refresh();
    } else {
      alert("Ett fel uppstod: " + result.error);
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 border border-red-200"
      title="Ta bort prisplan"
    >
      <Trash2 className="w-4 h-4" />
      {isDeleting ? "Tar bort..." : "Ta bort"}
    </button>
  );
}
