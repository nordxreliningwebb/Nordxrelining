import { supabaseAdmin } from "@/lib/supabase-server";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export const revalidate = 0; // Ensure fresh data on load

export default async function ProjectsListPage() {
  const { data: projects, error } = await supabaseAdmin
    .from("projects")
    .select("id, title, category, city, publish_date")
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <div className="h-full flex flex-col font-inter">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Projekt</h1>
          <p className="mt-2 text-gray-500">Hantera alla projekt på webbplatsen.</p>
        </div>
        <Link
          href="/admin/projekt/new"
          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Skapa nytt projektinlägg
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {(!projects || projects.length === 0) ? (
          <div className="p-8 text-center text-gray-500">
            Inga projekt hittades. Klicka på "Skapa nytt projektinlägg" för att börja.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
                  <th className="px-6 py-4">Titel</th>
                  <th className="px-6 py-4">Kategori / Tjänst</th>
                  <th className="px-6 py-4">Ort</th>
                  <th className="px-6 py-4">Datum</th>
                  <th className="px-6 py-4 text-right">Åtgärd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{project.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {project.category || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {project.city || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {project.publish_date ? new Date(project.publish_date).toLocaleDateString("sv-SE") : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          href={`/admin/projekt/edit/${project.id}`}
                          className="bg-[#0284c7] hover:bg-[#026aa2] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2 shadow-sm"
                        >
                          <Edit className="w-4 h-4" />
                          Ändra
                        </Link>
                        <DeleteProjectButton projectId={project.id} />
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
