import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import FrontendLayout from '@/components/FrontendLayout';
import BlockRenderer from '@/components/public/BlockRenderer';

export const revalidate = 60;

export async function generateStaticParams() {
  const { data: articles } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  return articles?.map((article) => ({
    slug: article.slug,
  })) || [];
}

async function getArticle(slug: string) {
  const { data: article, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !article) {
    return null;
  }
  return article;
}

export default async function KnowledgeBankArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  // Parse blocks if they exist, otherwise use legacy content
  let blocks = [];
  if (article.blocks) {
    try {
      blocks = typeof article.blocks === 'string' ? JSON.parse(article.blocks) : article.blocks;
    } catch (e) {
      console.error("Failed to parse blocks:", e);
    }
  }

  return (
    <FrontendLayout>
      <div className="min-h-screen bg-slate-50 font-inter">
        {/* Article Header */}
        <section className="pt-32 pb-12 px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
          <Link href="/kunskapsbanken" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#0ea5e9] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tillbaka till Kunskapsbanken
          </Link>
          
          {article.category && (
            <div className="mb-4">
              <span className="bg-[#0ea5e9]/10 text-[#0ea5e9] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
            </div>
          )}
          
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
            {article.author && (
              <div className="flex items-center gap-3">
                {article.author_image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={article.author_image} alt={article.author} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div className="text-sm font-semibold text-slate-900">{article.author}</div>
              </div>
            )}
            
            {article.publish_date && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                {new Date(article.publish_date).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.image_url && (
        <section className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 relative z-10">
          <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-xl border border-white/20">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {blocks && blocks.length > 0 ? (
             <BlockRenderer blocks={blocks} />
          ) : (
            <div 
              className="prose prose-lg prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-[#0e172a] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Behöver du hjälp med relining?</h2>
          <p className="text-slate-300 mb-8">
            Kontakta oss idag för en kostnadsfri rådgivning och inspektion av dina rör.
          </p>
          <Link href="/kontakt" className="inline-block bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-3 px-8 rounded-full transition-colors">
            Kontakta Oss
          </Link>
        </div>
      </section>
      </div>
    </FrontendLayout>
  );
}
