import Link from 'next/link';

export default function UnsubscribePage({ searchParams }: { searchParams: { error?: string } }) {
  const isError = searchParams.error === 'true' || searchParams.error === 'missing_id';

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-2xl text-center border border-gray-100">
        <div className="mb-6 flex justify-center">
          {isError ? (
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {isError ? "Ett fel uppstod" : "Avregistrerad"}
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {isError 
            ? "Vi kunde tyvärr inte hitta din prenumeration, eller så är du redan avregistrerad." 
            : "Du har nu avregistrerats från vårt nyhetsbrev och kommer inte längre att ta emot några utskick från oss."}
        </p>

        <Link 
          href="/" 
          className="inline-block w-full px-6 py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors focus:ring-4 focus:ring-slate-200"
        >
          Tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
}
