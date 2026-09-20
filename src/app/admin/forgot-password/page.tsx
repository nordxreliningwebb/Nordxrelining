"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("Ett oväntat fel uppstod.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0284c7] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <a href="/" title="Gå tillbaka till hemsidan" className="transition-transform hover:scale-105">
            <img src="/logo.png" alt="Nordx Relining" className="h-24 w-auto filter brightness-0 invert" />
          </a>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-100">
          
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 font-outfit">Glömt lösenord?</h2>
            <p className="mt-2 text-sm text-gray-600">
              Skriv in din e-postadress så skickar vi en länk för att återställa lösenordet.
            </p>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700 text-sm rounded-r-md">
                <p className="font-semibold">Återställningslänk skickad!</p>
                <p className="mt-1">
                  Kolla din inkorg (och skräppost). Klicka på länken i mailet för att välja ett nytt lösenord.
                </p>
              </div>
              <button
                onClick={() => router.push("/admin/login")}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-[#0284c7] bg-blue-50 hover:bg-blue-100 transition-all"
              >
                Tillbaka till inloggning
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded-r-md">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
                  E-postadress
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                    placeholder="admin@nordxrelining.se"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0284c7] transition-all disabled:opacity-50"
                >
                  {loading ? "Skickar..." : "Skicka återställningslänk"}
                </button>
              </div>
              
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => router.push("/admin/login")}
                  className="text-sm font-medium text-[#0284c7] hover:text-[#0369a1]"
                >
                  Avbryt och gå tillbaka
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
