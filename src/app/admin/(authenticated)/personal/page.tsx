import { supabaseAdmin } from "@/lib/supabase-server";
import Link from "next/link";
import { Plus, Users, Pencil, Trash2, GripVertical } from "lucide-react";
import { deleteEmployeeAction } from "./actions";

export const dynamic = 'force-dynamic';

export default async function PersonalPage() {
  const { data: employees, error } = await supabaseAdmin
    .from("employees")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching employees:", error);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Personal & Team</h1>
            <p className="text-slate-500">Hantera vilka som syns på Om oss-sidan.</p>
          </div>
        </div>
        <Link 
          href="/admin/personal/new"
          className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          Lägg till medarbetare
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Sortering</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Medarbetare</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600">Status</th>
                <th className="px-6 py-4 font-semibold text-sm text-slate-600 text-right">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!employees || employees.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Inga medarbetare inlagda ännu.
                  </td>
                </tr>
              ) : (
                employees.map((employee: any) => (
                  <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <GripVertical className="w-4 h-4" />
                        <span className="font-mono text-sm">{employee.sort_order}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {employee.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={employee.image_url} 
                            alt={employee.name} 
                            className="w-10 h-10 rounded-full object-cover bg-slate-100 border border-slate-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                            {employee.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-slate-900">{employee.name}</div>
                          <div className="text-sm text-slate-500">{employee.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        employee.published 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {employee.published ? 'Publicerad' : 'Dold'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/admin/personal/${employee.id}/edit`}
                          className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Redigera"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        
                        <form action={async () => {
                          "use server";
                          await deleteEmployeeAction(employee.id);
                        }}>
                          <button 
                            type="submit"
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Ta bort"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
