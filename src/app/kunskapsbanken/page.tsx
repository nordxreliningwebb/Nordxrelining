import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User } from 'lucide-react';
import FrontendLayout from '@/components/FrontendLayout';

export const revalidate = 60; // ISR revalidation

async function getArticles() {
  const { data: articles, error } = await supabase
    .from('blog_posts')
    .select('title, slug, excerpt, category, publish_date, author, image_url')
    .eq('published', true)
    .order('publish_date', { ascending: false });

  if (error) {
    console.error('Error fetching knowledge bank articles:', error);
    return [];
  }
  return articles || [];
}

export default async function KnowledgeBankPage() {
  const articles = await getArticles();

  return (
    <FrontendLayout>
      <div className="min-h-screen bg-slate-50 font-inter">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 lg:px-8 bg-gradient-to-b from-[#0e172a] to-[#1e293b] text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Kunskapsbanken
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto">
              Lär dig mer om rörinspektion, stamspolning och relining genom våra guider, nyheter och faktaartiklar.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {articles.length === 0 ? (
              <div className="text-center text-slate-500 py-12">
                Inga artiklar publicerade ännu. Kom tillbaka snart!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article: any) => (
                  <Link
                    key={article.slug}
                    href={`/kunskapsbanken/${article.slug}`}
                    className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                  {/* Image Container */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    {article.image_url ? (
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                        <ImageIcon className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                    {article.category && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                        {article.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0ea5e9] transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-slate-600 mb-6 line-clamp-3 text-sm">
                      {article.excerpt}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        {article.publish_date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(article.publish_date).toLocaleDateString('sv-SE')}
                          </span>
                        )}
                        {article.author && (
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {article.author}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      </div>
    </FrontendLayout>
  );
}

// Minimal mock icon for when no image exists (since we imported it from lucide but didn't declare it if not imported)
function ImageIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  );
}
