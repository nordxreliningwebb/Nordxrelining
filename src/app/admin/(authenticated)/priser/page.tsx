import { supabaseAdmin } from "@/lib/supabase-server";
import BulkPricePlanEditor, { PricePlan } from "@/components/admin/BulkPricePlanEditor";

export const revalidate = 0; // Ensure fresh data on load

export default async function PricePlansBulkPage() {
  const { data: plans, error } = await supabaseAdmin
    .from("price_plans")
    .select("id, name, price, description, features, isPopular, category, campaign_text, cta_text, cta_link, sort_order, published")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching price plans:", error);
  }

  // Typecast or default empty array
  const allPlans: PricePlan[] = plans || [];

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col font-inter">
      <div className="mb-6 flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Prisplaner & Paket</h1>
          <p className="mt-2 text-gray-500">
            Redigera alla 3 paketen för Privatpersoner och Företag samtidigt.
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
        <BulkPricePlanEditor allPlans={allPlans} />
      </div>
    </div>
  );
}
