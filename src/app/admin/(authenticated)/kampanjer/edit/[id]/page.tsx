import { supabaseAdmin } from "@/lib/supabase-server";
import CampaignEditor from "@/components/admin/CampaignEditor";
import { notFound } from "next/navigation";

export const revalidate = 0; // Ensure fresh data on load

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: campaign, error } = await supabaseAdmin
    .from("campaigns")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !campaign) {
    console.error("Error fetching campaign:", error);
    notFound();
  }

  return (
    <div className="h-[calc(100vh-6rem)]">
      <CampaignEditor initialData={campaign} />
    </div>
  );
}
