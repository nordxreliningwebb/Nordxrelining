"use server";

import { supabaseAdmin } from "@/lib/supabase-server";

export async function saveEmployeeAction(formData: any) {
  try {
    const employeeData = {
      id: formData.id || crypto.randomUUID(),
      name: formData.name,
      role: formData.role,
      image_url: formData.image_url || null,
      sort_order: formData.sort_order || 0,
      published: formData.published ?? true,
      updatedAt: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from("employees")
      .upsert([employeeData], { onConflict: 'id' });

    if (error) {
      console.error("Server Action Supabase Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern." };
  }
}

export async function deleteEmployeeAction(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("employees")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete Server Action Supabase Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Delete Server Action Exception:", error);
    return { success: false, error: error.message || "Ett oväntat fel uppstod på servern vid borttagning." };
  }
}
