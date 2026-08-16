"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteCampaignAction } from "@/app/admin/(authenticated)/kampanjer/actions";

export default function DeleteCampaignButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Är du säker på att du vill ta bort denna kampanj?")) {
      setIsDeleting(true);
      await deleteCampaignAction(id);
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50 disabled:opacity-50"
      title="Ta bort kampanj"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
