"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function saveCampaignAction(data: any, id?: string) {
  try {
    const payload = {
      name: data.name,
      title: data.title,
      description: data.description,
      discount: data.discount,
      badgeText: data.badgeText,
      countdownDate: new Date(data.countdownDate).toISOString(),
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
      isActive: data.isActive,
      updatedAt: new Date().toISOString()
    };

    if (id) {
      const { error } = await supabaseAdmin
        .from("campaigns")
        .update(payload)
        .eq("id", id);
        
      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin
        .from("campaigns")
        .insert({
          id: crypto.randomUUID(),
          ...payload
        });
        
      if (error) throw error;
    }

    revalidatePath("/admin/kampanjer");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("Save Campaign Error:", error);
    return { success: false, error: error.message || "Ett fel uppstod när kampanjen skulle sparas." };
  }
}

export async function toggleCampaignStatusAction(id: string, currentStatus: boolean) {
  try {
    const { error } = await supabaseAdmin
      .from("campaigns")
      .update({ 
        isActive: !currentStatus,
        updatedAt: new Date().toISOString()
      })
      .eq("id", id);

    if (error) {
      console.error("Toggle Campaign Status Supabase Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/kampanjer");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Toggle Campaign Status Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern vid uppdatering av status." };
  }
}

export async function deleteCampaignAction(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("campaigns")
      .delete()
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/admin/kampanjer");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Delete Campaign Error:", error);
    return { success: false, error: error.message || "Kunde inte ta bort kampanjen." };
  }
}
