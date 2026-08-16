"use client";

import { useTransition } from "react";
import { toggleCampaignStatusAction } from "@/app/admin/(authenticated)/kampanjer/actions";

export default function ToggleCampaignStatusButton({ 
  id, 
  isActive 
}: { 
  id: string, 
  isActive: boolean 
}) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(() => {
      toggleCampaignStatusAction(id, isActive);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        isActive ? 'bg-green-500' : 'bg-gray-300'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isActive ? "Avaktivera kampanj" : "Aktivera kampanj"}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
