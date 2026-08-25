import { supabaseAdmin } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import FrontendLayout from '@/components/FrontendLayout';
import BlockRenderer from '@/components/public/BlockRenderer';

export const dynamic = 'force-dynamic';

async function getArticle(slug: string) {
  const { data: article, error } = await supabaseAdmin
    .from('knowledge_posts')
    .select('*')
    .eq('slug', decodeURIComponent(slug))
    .single();

  if (error || !article) {
    return null;
  }
  return article;
}

export default async function KnowledgeBankArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Formatting variables
  const category = (article.category || 'Ej angiven');
  const catStr = category.charAt(0).toUpperCase() + category.slice(1);
  const dateStr = article.publish_date ? new Date(article.publish_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Ej angiven';
  const bgImage = article.images?.[0] || '/construction.jpg';
  const authorAvatar = article.author_image;
  const authorName = article.author || 'Namn Saknas';
  const title = article.title || 'Utan titel';
  const excerpt = article.excerpt || '';

  // Parse Content Blocks
  let blocks: any[] = [];
  if (article.content) {
    try {
      blocks = typeof article.content === 'string' ? JSON.parse(article.content) : article.content;
    } catch (e) {
      console.error("Failed to parse blocks:", e);
    }
  }

  // Extract Headings for TOC
  const toc = Array.isArray(blocks)
    ? blocks
        .filter((b: any) => b.type === 'heading')
        .map((block: any) => ({
          id: block.id,
          text: block.content || 'Ny rubrik',
          level: Number(block.level)
        }))
    : [];

  return (
    <FrontendLayout>
      <div className="min-h-screen bg-[#faf8f5] font-inter pb-1">
      <main id="main-content" className="w-full" style={{ marginTop: "-85px", paddingTop: "115px" }}>
        <style dangerouslySetInnerHTML={{__html: `
          .editor-content, figure { max-width: 100%; overflow: hidden; }
          .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
          .text-2xl { font-size: 1.5rem; line-height: 2rem; }
          .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
          .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
          .font-bold { font-weight: 700; }
          .font-medium { font-weight: 500; }
          .text-gray-900 { color: #111827; }
          .text-gray-800 { color: #1f2937; }
          .text-gray-600 { color: #4b5563; }
          .text-gray-500 { color: #6b7280; }
          .text-gray-400 { color: #9ca3af; }
          .text-slate-900 { color: #0f172a; }
          .text-slate-500 { color: #64748b; }
          .text-blue-600 { color: #2563eb; }
          .hover\\:text-blue-600:hover { color: #2563eb; }
          .mt-16 { margin-top: 4rem; }
          .mt-10 { margin-top: 2.5rem; }
          .mt-8 { margin-top: 2rem; }
          .pt-10 { padding-top: 2.5rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-4 { margin-bottom: 1rem; }
          .my-8 { margin-top: 2rem; margin-bottom: 2rem; }
          @keyframes customFadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .hero-anim { animation: customFadeUp 0.8s cubic-bezier(0.42, 0, 0.58, 1) forwards; }
          .article-anim { animation: customFadeUp 0.8s cubic-bezier(0.42, 0, 0.58, 1) 0.1s forwards; opacity: 0; }
          .sidebar-anim-1 { animation: customFadeUp 0.8s cubic-bezier(0.42, 0, 0.58, 1) 0.2s forwards; opacity: 0; }
          .sidebar-anim-2 { animation: customFadeUp 0.8s cubic-bezier(0.42, 0, 0.58, 1) 0.3s forwards; opacity: 0; }
          .sidebar-anim-3 { animation: customFadeUp 0.8s cubic-bezier(0.42, 0, 0.58, 1) 0.4s forwards; opacity: 0; }
          .pl-4 { padding-left: 1rem; }
          .p-4 { padding: 1rem; }
          .p-6 { padding: 1.5rem; }
          .pb-2 { padding-bottom: 0.5rem; }
          .bg-white { background-color: #ffffff; }
          .bg-gray-50 { background-color: #f9fafb; }
          .bg-gray-100 { background-color: #f3f4f6; }
          .border { border-width: 1px; }
          .border-b { border-bottom-width: 1px; }
          .border-gray-50 { border-color: #f9fafb; }
          .border-gray-100 { border-color: #f3f4f6; }
          .border-gray-200 { border-color: #e5e7eb; }
          .border-white { border-color: #ffffff; }
          .rounded-2xl { border-radius: 1rem; }
          .rounded-full { border-radius: 9999px; }
          .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
          .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .items-center { align-items: center; }
          .justify-center { justify-content: center; }
          .gap-4 { gap: 1rem; }
          .gap-10 { gap: 2.5rem; }
          .gap-y-3 { row-gap: 0.75rem; }
          .w-full { width: 100%; }
          .w-20 { width: 5rem; }
          .w-16 { width: 4rem; }
          .h-auto { height: auto; }
          .h-16 { height: 4rem; }
          .max-w-\\[320px\\] { max-width: 320px; }
          .min-w-0 { min-width: 0; }
          .shrink-0 { flex-shrink: 0; }
          .object-cover { object-fit: cover; }
          .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .leading-relaxed { line-height: 1.625; }
          .whitespace-pre-wrap { white-space: pre-wrap; }
          .sticky { position: sticky; }
          .top-8 { top: 2rem; }
          .ml-auto { margin-left: auto; }
          .transition-colors { transition-property: background-color, border-color, color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
          .font-outfit { font-family: 'Outfit', sans-serif; }
          .tracking-wide { letter-spacing: 0.025em; }
          .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.75rem; margin-bottom: 0; }
          .journal-content ul { list-style-type: disc; margin-left: 1.25rem; padding-left: 0.5rem; }
          .journal-content li { margin-bottom: 0.25rem; }
          .journal-content em, .journal-content i { font-style: italic; }
          .journal-content a { color: #2563eb; text-decoration: underline; }
          .journal-content strong { font-weight: 700; }
        `}} />

        <div className="container" style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', padding: '0' }}>
            <div className="pt-10">
                <div id="dynamic-hero" className="rounded-3xl overflow-hidden relative flex flex-col justify-center items-center shadow-lg hero-anim" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('${bgImage}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '500px' }}>
                    <div className="relative z-10 w-full max-w-4xl flex flex-col gap-4 text-center items-center" style={{ padding: "3rem 2rem" }}>
                        <h1 className="font-extrabold text-white tracking-tight leading-snug max-w-4xl mx-auto" style={{ fontSize: "3rem", lineHeight: "1.2", marginBottom: "0.5rem" }}>{title}</h1>
                        <div className="text-gray-100 font-light max-w-3xl mx-auto flex flex-col gap-4" style={{ fontSize: "1.25rem" }}>
                            {(excerpt || '').split(/\n+/).filter(Boolean).map((paragraph: string, idx: number) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10" style={{ marginBottom: '6rem' }}>
                <article className="lg:col-span-2 w-full bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 article-anim" id="project-content">
                    {blocks && blocks.length > 0 ? (
                       <BlockRenderer blocks={blocks} />
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: article.content || '<p>Inget innehåll tillgängligt.</p>' }} />
                    )}
                </article>

                <aside className="lg:col-span-1 w-full pt-6 md:pt-10 anim-stagger-parent">
                    <div className="sticky top-32 h-max flex flex-col gap-6 w-full">
                        
                        {/* FAKTA OM INLÄGGET */}
                        <div className="w-full sidebar-anim-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 font-outfit tracking-wide border-b border-gray-200 pb-2">Fakta om inlägget</h4>
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-y-3">
                                <div className="flex items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                                    <span className="w-20 shrink-0 text-sm text-slate-500 font-medium">Ämne</span>
                                    <span className="text-sm font-bold text-slate-900 truncate">{catStr}</span>
                                </div>
                                <div className="flex items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                                    <span className="w-20 shrink-0 text-sm text-slate-500 font-medium">Datum</span>
                                    <span className="text-sm font-bold text-slate-900 truncate">{dateStr}</span>
                                </div>
                            </div>
                        </div>

                        {/* INNEHÅLL */}
                        {toc.length > 0 && (
                            <div className="w-full sidebar-anim-3">
                                <nav className="journal-toc bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4 font-outfit tracking-wide border-b border-gray-200 pb-2">Innehåll</h4>
                                    <ul className="space-y-3">
                                      {toc.map((item, idx) => (
                                        <li key={idx}>
                                          <a 
                                            href={`#${item.id}`} 
                                            style={{
                                              marginLeft: item.level === 3 ? '1.5rem' : '0rem',
                                              color: item.level === 3 ? '#4B5563' : '#111827',
                                              fontWeight: item.level === 3 ? '400' : '500',
                                              fontSize: item.level === 3 ? '0.875rem' : '1rem'
                                            }}
                                            className="block hover:text-blue-600 transition-colors"
                                          >
                                            {item.text}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                </nav>
                            </div>
                        )}
{/* FÖRFATTARE */}
                        <div className="w-full sidebar-anim-2">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 font-outfit tracking-wide border-b border-gray-200 pb-2">Författare</h4>
                            <div className="journal-author-card flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                {authorAvatar ? (
                                    <img src={authorAvatar} alt="Ansvarig" className="journal-avatar w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm shrink-0" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center text-gray-400 shrink-0">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                    </div>
                                )}
                                <div className="journal-author-info flex flex-col justify-center min-w-0">
                                    <span className="journal-author-name font-bold text-gray-900 text-sm truncate">{authorName}</span>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </aside>
            </div>
        </div>

        <section className="nordx-landing-cta" style={{ background: '#0284c7', color: '#ffffff', padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden', marginTop: 0, zIndex: 2, width: '100%', display: 'block' }}>
            <style dangerouslySetInnerHTML={{__html: `
                .nordx-landing-cta h2, .nordx-landing-cta p { text-transform: none !important; }
                .nordx-landing-cta p { font-weight: 400 !important; }
                .nordx-landing-cta .cta-btn-header-match {
                    background: #ffffff !important;
                    color: #000000 !important;
                    border: 1px solid #ffffff !important;
                    border-radius: 6px !important;
                    padding: 0.75rem 1.75rem !important;
                    font-weight: 600 !important;
                    font-size: 1rem !important;
                    transition: all 0.3s ease !important;
                    text-decoration: none;
                    display: inline-block;
                    text-transform: none !important;
                    box-shadow: none !important;
                }
                .nordx-landing-cta .cta-btn-header-match:hover {
                    background: #ffffff !important;
                    color: #000000 !important;
                    border: 1px solid #ffffff !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
                    transform: translateY(-4px) !important;
                }
            `}} />
            <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', color: '#ffffff', lineHeight: 1.2 }} className="anim-mask-text">
                    <span className="anim-mask-inner">Vill du veta mer om våra tjänster?</span>
                </h2>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem', opacity: 0.9 }} className="anim-fade-up">
                    Läs mer i kunskapsbanken eller kontakta oss för experthjälp kring rörinspektion, stamspolning och relining.
                </p>
                <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Link href="/kontakt" className="cta-btn-header-match anim-fade-up">Kontakta oss</Link>
                    <a href="tel:+46727222232" className="cta-btn-header-match anim-fade-up">Ring oss</a>
                </div>
            </div>
        </section>
      </main>
      </div>
    </FrontendLayout>
  );
}
