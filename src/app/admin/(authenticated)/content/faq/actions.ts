"use server";

import { supabaseAdmin } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function addFaq(formData: FormData) {
  const question = formData.get("question")?.toString();
  const answer = formData.get("answer")?.toString();

  if (!question || !answer) {
    throw new Error("Fråga och svar måste fyllas i");
  }

  const { error } = await supabaseAdmin.from("faqs").insert([
    {
      id: crypto.randomUUID(),
      question,
      answer,
      updatedAt: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error("Error adding FAQ:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/content/faq");
  revalidatePath("/vanliga-fragor");
}

export async function updateFaq(id: number | string, formData: FormData) {
  const question = formData.get("question")?.toString();
  const answer = formData.get("answer")?.toString();

  if (!question || !answer) {
    throw new Error("Fråga och svar måste fyllas i");
  }

  const { error } = await supabaseAdmin
    .from("faqs")
    .update({
      question,
      answer,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating FAQ:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/content/faq");
  revalidatePath("/vanliga-fragor");
}

export async function deleteFaq(id: number | string) {
  const { error } = await supabaseAdmin.from("faqs").delete().eq("id", id);

  if (error) {
    console.error("Error deleting FAQ:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/content/faq");
  revalidatePath("/vanliga-fragor");
}
