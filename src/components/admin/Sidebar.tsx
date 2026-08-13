"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutGrid, 
  Layers, 
  BookOpenText, 
  MessageCircleQuestion, 
  Tag, 
  Rocket,
  LogOut
} from "lucide-react";
import { signout } from "@/app/admin/login/actions";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
  { name: "Projekt", href: "/admin/projekt", icon: Layers },
  { name: "Kunskapsbank", href: "/admin/knowledge-bank", icon: BookOpenText },
  { name: "FAQ", href: "/admin/faq", icon: MessageCircleQuestion },
  { name: "Priser", href: "/admin/pricing", icon: Tag },
  { name: "Kampanjer", href: "/admin/campaigns", icon: Rocket },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0284c7] text-white flex flex-col h-screen fixed left-0 top-0 z-40 shadow-xl">
      <div className="p-6 border-b border-white/10 flex flex-col gap-4">
        <Link href="/">
          <img src="/logo.png" alt="Nordx Relining" className="h-8 w-auto filter brightness-0 invert" />
        </Link>
      </div>

      <div className="px-6 pt-6">
        <span className="font-outfit font-bold text-sm tracking-widest text-white/50 uppercase">Admin CMS</span>
      </div>
      <nav className="flex-1 p-4 space-y-2 mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-white/20 text-white shadow-lg font-semibold" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon 
                strokeWidth={1.5}
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-white" : "text-white/70 group-hover:text-white"
                )} 
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <form action={signout}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-red-500/20 transition-all group"
          >
            <LogOut strokeWidth={1.5} className="w-5 h-5 group-hover:text-red-300" />
            <span className="font-medium group-hover:text-red-300">Logga ut</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
