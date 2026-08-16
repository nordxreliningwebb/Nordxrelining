import React from "react";
import FAQEditor from "@/components/admin/FAQEditor";
import { supabaseAdmin } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

interface EditFAQPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditFAQPage({ params }: EditFAQPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetch existing faq
  const { data: faq, error } = await supabaseAdmin
    .from("faq_items")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !faq) {
    console.error("Error fetching faq item:", error);
    notFound();
  }

  return <FAQEditor initialData={faq} />;
}
