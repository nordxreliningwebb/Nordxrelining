import { Layers, BookOpenText, Rocket, MessageCircleQuestion, Sparkles } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-server";

export const revalidate = 0; // Ensure fresh data on load

export default async function AdminDashboard() {
  // Fetch actual counts from the database
  const [
    { count: projectsCount },
    { count: knowledgeCount },
    { count: campaignsCount },
    { count: faqCount }
  ] = await Promise.all([
    supabaseAdmin.from("projects").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("knowledge_posts").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("campaigns").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("faq_items").select("*", { count: "exact", head: true })
  ]);

  return (
    <div className="space-y-8 font-inter">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="mt-2 text-gray-500">Översikt över webbplatsens innehåll och statistik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Stat Cards with Real Data and Hover Effects */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md hover:border-blue-100 group">
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Layers strokeWidth={1.5} className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Antalet projekt</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{projectsCount || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md hover:border-indigo-100 group">
          <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <BookOpenText strokeWidth={1.5} className="w-7 h-7 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Kunskapsbank</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{knowledgeCount || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md hover:border-amber-100 group">
          <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <Rocket strokeWidth={1.5} className="w-7 h-7 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Aktiva Kampanjer</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{campaignsCount || 0}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md hover:border-emerald-100 group">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            <MessageCircleQuestion strokeWidth={1.5} className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">FAQ Frågor</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{faqCount || 0}</p>
          </div>
        </div>
      </div>
      
      {/* Premium Welcome Box */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl p-10 mt-8 border border-slate-700">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-emerald-500 opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-sm font-medium mb-4 backdrop-blur-sm border border-white/5">
              <Sparkles className="w-4 h-4" />
              <span>Nordxrelining Admin</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">Välkommen till ditt nya CMS</h3>
            <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
              Här har du full kontroll över hemsidans innehåll. Använd sidomenyn för att skapa engagerande projekt, dela kunskap och hålla era kunder uppdaterade med de senaste kampanjerna.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center">
             <div className="w-32 h-32 bg-white/5 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-emerald-400 opacity-20 rounded-full blur-xl"></div>
                <Layers className="w-14 h-14 text-white drop-shadow-lg relative z-10" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
