import { supabaseAdmin } from "@/lib/supabase-server";
import ProjectEditor from "@/components/admin/ProjectEditor";
import { notFound } from "next/navigation";

export const revalidate = 0; // Ensure fresh data on load

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  const { data: project, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    console.error("Error fetching project:", error);
    notFound();
  }

  return <ProjectEditor initialData={project} />;
}
