import Link from 'next/link';

export default function UnsubscribeSuccessPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Avregistrerad från nyhetsbrevet
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Du har nu avregistrerats från vårt nyhetsbrev och kommer inte längre att ta emot utskick från oss. Om detta var ett misstag kan du alltid registrera dig igen på vår hemsida.
        </p>
        <Link 
          href="/" 
          className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#b8860b] hover:bg-[#a6790a] transition-colors w-full"
        >
          Tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
}
