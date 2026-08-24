import { Layers, BookOpenText, Rocket, MessageCircleQuestion } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase-server";

export const revalidate = 0; // Ensure data is always fresh

export default async function AdminDashboard() {
  // Fetch counts from Supabase
  const [{ count: projectsCount }, { count: knowledgeCount }, { count: campaignsCount }, { count: faqCount }] = await Promise.all([
    supabaseAdmin.from("projects").select("*", { count: 'exact', head: true }),
    supabaseAdmin.from("knowledge_posts").select("*", { count: 'exact', head: true }),
    supabaseAdmin.from("campaigns").select("*", { count: 'exact', head: true }),
    supabaseAdmin.from("faq_items").select("*", { count: 'exact', head: true }),
  ]);

  return (
    <div className="space-y-8 font-inter">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="mt-2 text-gray-500">Översikt över webbplatsens innehåll och statistik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Project Stat Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
            <Layers strokeWidth={1.5} className="w-7 h-7 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Antalet Projekt</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{projectsCount || 0}</p>
          </div>
        </div>

        {/* Knowledge Stat Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
            <BookOpenText strokeWidth={1.5} className="w-7 h-7 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Kunskapsbank</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{knowledgeCount || 0}</p>
          </div>
        </div>

        {/* Campaigns Stat Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
            <Rocket strokeWidth={1.5} className="w-7 h-7 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Aktiva Kampanjer</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{campaignsCount || 0}</p>
          </div>
        </div>

        {/* FAQ Stat Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
            <MessageCircleQuestion strokeWidth={1.5} className="w-7 h-7 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">FAQ Frågor</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{faqCount || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Välkommen till nya CMS:et</h3>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Detta är din centrala kontrollpanel. Använd menyn till vänster för att navigera mellan olika sektioner och hantera webbplatsens innehåll. 
        </p>
      </div>
    </div>
  );
}
