import { supabaseAdmin } from "@/lib/supabase-server";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteFAQButton from "@/components/admin/DeleteFAQButton";

export const revalidate = 0; // Ensure fresh data on load

export default async function FAQListPage() {
  const { data: faqs, error } = await supabaseAdmin
    .from("faq_items")
    .select("id, question, category, sort_order, published")
    .order("sort_order", { ascending: true })
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching FAQs:", error);
  }

  return (
    <div className="h-full flex flex-col font-inter">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">FAQ</h1>
          <p className="mt-2 text-gray-500">Hantera vanliga frågor och svar.</p>
        </div>
        <Link
          href="/admin/faq/new"
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Lägg till ny fråga
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {(!faqs || faqs.length === 0) ? (
          <div className="p-8 text-center text-gray-500">
            Inga frågor hittades. Klicka på "Lägg till ny fråga" för att börja.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                  <th className="px-6 py-4">Ordning</th>
                  <th className="px-6 py-4">Fråga</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Åtgärd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-mono">
                      {faq.sort_order}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{faq.question}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {faq.category || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${faq.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {faq.published ? 'Publicerad' : 'Dold'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          href={`/admin/faq/edit/${faq.id}`}
                          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Ändra
                        </Link>
                        <DeleteFAQButton faqId={faq.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
