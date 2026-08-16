"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-server";

// Autentiserings-gateway: Kontrollerar sessionen innan vi tillåter anrop
async function getAdminClient() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("Obehörig åtkomst. Endast administratörer kan utföra denna åtgärd.");
  }
  
  // Returnerar Service Role-klienten för själva databasoperationen 
  // eftersom databasen saknar RLS write-policies för authenticated users.
  return supabaseAdmin;
}

export async function savePricePlanAction(formData: any) {
  try {
    const supabase = await getAdminClient();
    const pricePlanData = {
      id: formData.id || crypto.randomUUID(),
      name: formData.name,
      price: formData.price,
      description: formData.description,
      features: formData.features || [],
      isPopular: formData.isPopular,
      category: formData.category || "Privatpersoner",
      campaign_text: formData.campaign_text || null,
      cta_text: formData.cta_text || null,
      cta_link: formData.cta_link || null,
      sort_order: parseInt(formData.sort_order) || 0,
      published: formData.published,
      updatedAt: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("price_plans")
      .upsert([pricePlanData], { onConflict: 'id' });

    if (error) {
      console.error("Server Action Supabase Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin/priser");

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern." };
  }
}

export async function deletePricePlanAction(id: string) {
  try {
    const supabase = await getAdminClient();
    const { error } = await supabase
      .from("price_plans")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete Server Action Supabase Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin/priser");

    return { success: true };
  } catch (error: any) {
    console.error("Delete Server Action Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern vid borttagning." };
  }
}

export async function togglePricePlanStatusAction(id: string, published: boolean) {
  try {
    const supabase = await getAdminClient();
    const { error } = await supabase
      .from("price_plans")
      .update({ published, updatedAt: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      console.error("Toggle Status Server Action Supabase Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin/priser");

    return { success: true };
  } catch (error: any) {
    console.error("Toggle Status Server Action Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern vid uppdatering av status." };
  }
}

export async function bulkSavePricePlansAction(plans: any[], category: string) {
  try {
    const supabase = await getAdminClient();
    // Process all plans to ensure they have the correct category, ids and updatedAt
    const plansToUpsert = plans.map(plan => ({
      id: plan.id || crypto.randomUUID(),
      name: plan.name || "",
      price: plan.price || "",
      description: plan.description || "",
      features: plan.features || [],
      isPopular: plan.isPopular || false,
      category: category,
      campaign_text: plan.isPopular ? (plan.campaign_text || null) : null,
      cta_text: plan.cta_text || null,
      cta_link: plan.cta_link || null,
      sort_order: plan.sort_order,
      published: plan.published ?? true,
      updatedAt: new Date().toISOString()
    }));

    const { error } = await supabase
      .from("price_plans")
      .upsert(plansToUpsert, { onConflict: 'id' });

    if (error) {
      console.error("Bulk Save Server Action Supabase Error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/admin/priser");

    return { success: true };
  } catch (error: any) {
    console.error("Bulk Save Server Action Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern." };
  }
}
