import Link from "next/link";
import { Plus, Edit3, Clock } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-server";
import DeleteCampaignButton from "@/components/admin/DeleteCampaignButton";
import ToggleCampaignStatusButton from "@/components/admin/ToggleCampaignStatusButton";

export const revalidate = 0; // Ensure fresh data on load

export default async function CampaignsPage() {
  const { data: campaigns, error } = await supabaseAdmin
    .from("campaigns")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching campaigns:", error);
  }

  const activeCampaigns = campaigns?.filter(c => c.isActive) || [];
  const draftCampaigns = campaigns?.filter(c => !c.isActive) || [];

  return (
    <div className="font-inter">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Kampanjer</h1>
          <p className="mt-2 text-gray-500">
            Skapa och hantera tidsbegränsade kampanjer. Endast en kampanj bör vara LIVE åt gången.
          </p>
        </div>
        <Link
          href="/admin/kampanjer/new"
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Skapa Kampanj
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kampanjnamn</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Slutdatum (Timer)</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Växla Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Åtgärder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {campaigns?.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{campaign.name}</div>
                  <div className="text-sm text-gray-500">{campaign.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-[#0284c7]" />
                    {new Date(campaign.countdownDate).toLocaleString("sv-SE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {campaign.isActive ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      LIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                      MALL
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <ToggleCampaignStatusButton id={campaign.id} isActive={campaign.isActive} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/kampanjer/edit/${campaign.id}`}
                      className="text-gray-400 hover:text-[#0284c7] transition-colors p-2 rounded-lg hover:bg-blue-50"
                      title="Redigera kampanj"
                    >
                      <Edit3 className="w-5 h-5" />
                    </Link>
                    <DeleteCampaignButton id={campaign.id} />
                  </div>
                </td>
              </tr>
            ))}
            {(!campaigns || campaigns.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Inga kampanjer hittades. Klicka på "Skapa Kampanj" för att lägga till en ny.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
