"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-server";

export async function saveFAQAction(formData: any) {
  try {
    const faqData = {
      id: formData.id || crypto.randomUUID(),
      question: formData.question,
      answer: formData.answer,
      category: formData.category,
      sort_order: parseInt(formData.sort_order) || 0,
      published: true,
      updatedAt: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from("faq_items")
      .upsert([faqData], { onConflict: 'id' });

    if (error) {
      console.error("Server Action Supabase Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin/faq");
    revalidatePath("/faq");

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern." };
  }
}

export async function deleteFAQAction(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("faq_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete Server Action Supabase Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin/faq");
    revalidatePath("/faq");

    return { success: true };
  } catch (error: any) {
    console.error("Delete Server Action Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern vid borttagning." };
  }
}
