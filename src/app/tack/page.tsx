'use client';

import React, { useEffect } from 'react';
import FrontendLayout from "@/components/FrontendLayout";
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TackPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <FrontendLayout>
      <main className="flex-1 flex flex-col justify-center items-center py-24 bg-[#FAF9F6] min-h-[70vh]">
        <div className="max-w-md w-full mx-auto px-6 flex flex-col items-center text-center gap-10">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
            <CheckCircle className="w-12 h-12 text-green-600" strokeWidth={2} />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Tack för din förfrågan!
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
            Vi har tagit emot ditt meddelande och vårt team återkommer till dig inom 24 timmar.
          </p>
        </div>
      </main>
    </FrontendLayout>
  );
}
