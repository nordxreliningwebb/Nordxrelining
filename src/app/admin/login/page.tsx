import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0284c7] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <a href="http://localhost:3000" title="Gå tillbaka till hemsidan" className="transition-transform hover:scale-105">
            <img src="/logo.png" alt="Nordx Relining" className="h-24 w-auto filter brightness-0 invert" />
          </a>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-100">
          <form className="space-y-6" action={login}>
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
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                  placeholder="admin@nordxrelining.se"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                Lösenord
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0284c7] transition-all"
              >
                Logga in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
