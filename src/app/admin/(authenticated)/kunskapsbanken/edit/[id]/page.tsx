import React from "react";
import KnowledgeEditor from "@/components/admin/KnowledgeEditor";
import { supabaseAdmin } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

interface EditKnowledgePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditKnowledgePage({ params }: EditKnowledgePageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetch existing knowledge post
  const { data: post, error } = await supabaseAdmin
    .from("knowledge_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    console.error("Error fetching knowledge post:", error);
    notFound();
  }

  // Parse content JSON if it's stored as a string
  let parsedContent = null;
  if (post.content) {
    try {
      parsedContent = typeof post.content === 'string' ? JSON.parse(post.content) : post.content;
    } catch (e) {
      console.warn("Could not parse content as JSON for post:", id);
      parsedContent = post.content;
    }
  }

  // Transform data to match Editor schema
  const initialData = {
    id: post.id,
    title: post.title,
    subheading: post.excerpt || "", // Mapping excerpt to subheading for the editor state
    category: post.category || "",
    date: post.publish_date ? new Date(post.publish_date).toISOString().split('T')[0] : "",
    authorName: post.author || "",
    authorAvatar: post.author_image || "",
    coverImage: (post.images && post.images.length > 0) ? post.images[0] : "",
    contentJson: parsedContent
  };

  return <KnowledgeEditor initialData={initialData} />;
}
