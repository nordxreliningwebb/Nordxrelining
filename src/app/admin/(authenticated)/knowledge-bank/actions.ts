"use server";

import { supabaseAdmin } from "@/lib/supabase-server";

export async function saveKnowledgeBankAction(formData: any) {
  try {
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
      .insert([
        {
          id: crypto.randomUUID(),
          title: formData.title,
          slug: formData.title.toLowerCase().replace(/[^a-z0-9äöåÄÖÅ]+/g, '-').replace(/(^-|-$)+/g, ''),
          excerpt: formData.excerpt,
          description: formData.excerpt,
          category: formData.category,
          publish_date: formData.date ? new Date(formData.date).toISOString() : null,
          author: formData.authorName,
          author_image: formData.authorAvatar,
          featuredImage: formData.coverImage,
          image_url: formData.coverImage,
          content: formData.contentJson, // Save blocks as JSON string
          published: formData.published ?? true,
          updatedAt: new Date().toISOString()
        }
      ]);

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
