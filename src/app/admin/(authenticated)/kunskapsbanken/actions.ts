"use server";

import { supabaseAdmin } from "@/lib/supabase-server";

export async function saveKnowledgeAction(formData: any) {
  try {
    const postId = formData.id || crypto.randomUUID();
    const baseSlug = formData.title.toLowerCase().replace(/[^a-z0-9äöåÄÖÅ]+/g, '-').replace(/(^-|-$)+/g, '');
    const uniqueSlug = `${baseSlug}-${postId.split('-')[0]}`;

    // Prepare data
    const knowledgeData = {
      id: postId,
      title: formData.title,
      excerpt: formData.subheading,
      category: formData.category,
      publish_date: formData.date ? new Date(formData.date).toISOString() : null,
      author: formData.authorName,
      images: formData.coverImage ? [formData.coverImage] : [],
      author_image: formData.authorAvatar,
      content: formData.contentJson, // We pass the JSON string directly
      slug: uniqueSlug,
      updatedAt: new Date().toISOString()
    };

    const { data, error } = await supabaseAdmin
      .from("knowledge_posts")
      .upsert([knowledgeData], { onConflict: 'id' });

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

export async function deleteKnowledgeAction(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("knowledge_posts")
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
