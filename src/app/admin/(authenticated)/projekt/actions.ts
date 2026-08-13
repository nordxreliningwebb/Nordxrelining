"use server";

import { supabaseAdmin } from "@/lib/supabase-server";

export async function saveProjectAction(formData: any) {
  try {
    // Prepare data
    const projectData = {
      id: formData.id || crypto.randomUUID(),
      title: formData.title,
      name: formData.title,
      excerpt: formData.subheading,
      category: formData.category,
      city: formData.city,
      publish_date: formData.date ? new Date(formData.date).toISOString() : null,
      author: formData.authorName,
      client: formData.clientName,
      images: formData.coverImage ? [formData.coverImage] : [],
      author_image: formData.authorAvatar,
      content: formData.contentJson, // We pass the JSON string directly
      slug: formData.title.toLowerCase().replace(/[^a-z0-9äöåÄÖÅ]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: formData.subheading,
      updatedAt: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from("projects")
      .upsert([projectData], { onConflict: 'id' });

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

export async function deleteProjectAction(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("projects")
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
