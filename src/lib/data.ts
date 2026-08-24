import { supabaseAdmin } from "./supabase-server";

export async function getPublicFAQs() {
  try {
    const { data, error } = await supabaseAdmin
      .from("faq_items")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
}

export async function getPublicPricePlans() {
  try {
    const { data, error } = await supabaseAdmin
      .from("price_plans")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching price plans:", error);
    return [];
  }
}

export async function getActiveCampaign() {
  try {
    const { data, error } = await supabaseAdmin
      .from("campaigns")
      .select("*")
      .eq("isActive", true)
      .order("updatedAt", { ascending: false });
      
    if (error) throw error;
    // Return all active campaigns
    return data || [];
  } catch (error) {
    console.error("Error fetching active campaigns:", error);
    return [];
  }
}
