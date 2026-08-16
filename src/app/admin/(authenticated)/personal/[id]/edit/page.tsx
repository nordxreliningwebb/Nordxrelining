import EmployeeEditor from "@/components/admin/EmployeeEditor";
import { supabaseAdmin } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const { data: employee, error } = await supabaseAdmin
    .from("employees")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !employee) {
    notFound();
  }

  return <EmployeeEditor initialData={employee} />;
}
