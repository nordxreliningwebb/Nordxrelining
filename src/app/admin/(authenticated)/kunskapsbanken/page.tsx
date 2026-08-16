import { supabaseAdmin } from "@/lib/supabase-server";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteKnowledgeButton from "@/components/admin/DeleteKnowledgeButton";

export const revalidate = 0; // Ensure fresh data on load

export default async function KnowledgeListPage() {
  const { data: posts, error } = await supabaseAdmin
    .from("knowledge_posts")
    .select("id, title, category, author, publish_date")
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Error fetching knowledge posts:", error);
  }

  return (
    <div className="h-full flex flex-col font-inter">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Kunskapsbanken</h1>
          <p className="mt-2 text-gray-500">Hantera alla inlägg i Kunskapsbanken.</p>
        </div>
        <Link
          href="/admin/kunskapsbanken/new"
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Skapa nytt inlägg
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {(!posts || posts.length === 0) ? (
          <div className="p-8 text-center text-gray-500">
            Inga inlägg hittades. Klicka på "Skapa nytt inlägg" för att börja.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                  <th className="px-6 py-4">Titel</th>
                  <th className="px-6 py-4">Ämne</th>
                  <th className="px-6 py-4">Författare</th>
                  <th className="px-6 py-4">Datum</th>
                  <th className="px-6 py-4 text-right">Åtgärd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {post.category || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {post.author || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {post.publish_date ? new Date(post.publish_date).toLocaleDateString("sv-SE") : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          href={`/admin/kunskapsbanken/edit/${post.id}`}
                          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Ändra
                        </Link>
                        <DeleteKnowledgeButton postId={post.id} />
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
