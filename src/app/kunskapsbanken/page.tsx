import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import FrontendLayout from '@/components/FrontendLayout';
import { supabaseAdmin } from '@/lib/supabase-server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kunskapsbanken | Nordxrelining',
  description: 'Lär dig mer om rörinspektion, stamspolning och relining genom våra guider, nyheter och faktaartiklar.',
};

export const dynamic = 'force-dynamic';

export default async function KnowledgeBankPage() {
  let articles: any[] = [];
  try {
    const { data, error } = await supabaseAdmin
      .from('knowledge_posts')
      .select('*')
      .order('publish_date', { ascending: false });

    if (error) {
      console.warn("Kunde inte hämta artiklar:", error.message);
    } else if (data) {
      articles = data;
    }
  } catch (err: any) {
    console.warn("Ett systemfel uppstod vid hämtning av artiklar:", err.message);
  }

  const latestArticle = articles.length > 0 ? articles[0] : null;
  const remainingArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <FrontendLayout>
      <main id="main-content">
        <section className="swoosh-hero" style={{ backgroundColor: '#faf8f5', padding: '160px 0 100px 0', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', padding: '0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    
                    <div style={{ background: '#ffffff', borderRadius: '32px', padding: '4rem 3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', zIndex: 2, position: 'relative' }} className="anim-fade-left">
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: "'Inter', sans-serif", fontWeight: 700, color: '#0b0b0b', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            <span className="">Kunskapsbanken</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#475569', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                            I vår kunskapsbank delar vi med oss av vår expertis. Läs våra guider, branschnyheter och experttips kring allt som rör stamspolning, relining och rörinspektion för att hålla dina fastigheters rörsystem i toppskick.
                        </p>
                    </div>

                    <div className="pipe-popup-wrapper anim-fade-right" style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.12))', zIndex: 2 }}>
                        <div className="p-pipe p-top">
                            <div className="p-muff" style={{ left: '15%' }}></div>
                            <div className="p-muff" style={{ right: '15%' }}></div>
                        </div>
                        <div className="p-pipe p-bottom">
                            <div className="p-muff" style={{ left: '50%', transform: 'translateY(-50%) translateX(-50%)' }}></div>
                        </div>
                        <div className="p-pipe p-left">
                            <div className="p-muff-v" style={{ top: '25%' }}></div>
                        </div>
                        <div className="p-pipe p-right">
                            <div className="p-muff-v" style={{ top: '75%' }}></div>
                        </div>
                        
                        <div className="p-corner p-tl"></div>
                        <div className="p-corner p-tr"></div>
                        <div className="p-corner p-bl"></div>
                        <div className="p-corner p-br"></div>

                        {latestArticle ? (
                        <Link href={`/kunskapsbanken/${latestArticle.slug || '#'}`} className="featured-project anim-scale-down-container" style={{ position: 'relative', zIndex: 10, margin: 0, width: '100%', height: '100%', minHeight: '450px', borderRadius: 0, boxShadow: 'none' }}>
                            <img src={(latestArticle.images && latestArticle.images.length > 0) ? latestArticle.images[0] : "/proj-relining-featured.png"} alt={latestArticle.title || "Artikel"} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                            <div className="featured-project-overlay" style={{ zIndex: 3 }}>
                                <div className="featured-project-meta">
                                    <span className="category" style={{ textTransform: 'capitalize' }}>{latestArticle.category || 'Okategoriserad'}</span>
                                    <span className="date">{latestArticle.publish_date ? new Date(latestArticle.publish_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Inget datum'}</span>
                                </div>
                                <h2 className="anim-mask-text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{latestArticle.title || 'Utan titel'}</h2>
                                <p style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{latestArticle.excerpt || ''}</p>
                                <span className="featured-project-btn">Läs inlägg</span>
                            </div>
                        </Link>
                        ) : (
                        <div className="featured-project anim-scale-down-container" style={{ position: 'relative', zIndex: 10, margin: 0, width: '100%', height: '100%', minHeight: '450px', borderRadius: 0, boxShadow: 'none', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: '#64748b', fontFamily: "'Inter', sans-serif" }}>Ingen artikel utvald ännu</p>
                        </div>
                        )}
                    </div>

                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                @media (max-width: 900px) {
                    .swoosh-hero > .container > div {
                        grid-template-columns: 1fr !important;
                        gap: 4.5rem !important;
                    }
                    .swoosh-hero {
                        margin-top: -85px !important;
                        padding: 115px 0 60px 0 !important;
                    }
                }
            `}} />
        </section>

        <section className="service-page-content" id="projects-content" style={{ padding: '100px 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
            <div className="container layout-wrapper" style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                
                <div className="projects-section" style={{ padding: 0, width: '100%' }}>
                    
                    {/* Filter Navigation */}
                    <div className="nordx-filter-nav" style={{ marginTop: 0 }}>
                        <button className="nordx-filter-btn active" data-filter="all" aria-selected="true">ALLA</button>
                        <button className="nordx-filter-btn" data-filter="tips" aria-selected="false">TIPS &amp; RÅD</button>
                        <button className="nordx-filter-btn" data-filter="nyheter" aria-selected="false">NYHETER</button>
                        <button className="nordx-filter-btn" data-filter="fakta" aria-selected="false">FAKTA</button>
                    </div>

                    <div className="projects-grid-3" id="dynamic-projects-grid">
                        {!remainingArticles || remainingArticles.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: '#64748b', fontFamily: "'Inter', sans-serif" }}>
                                {articles.length === 0 ? "Inga artiklar har publicerats ännu." : "Inga fler artiklar har publicerats."}
                            </div>
                        ) : (
                            remainingArticles.map((article: any) => {
                                const getCategoryKey = (cat: string) => {
                                    if (!cat) return 'okategoriserad';
                                    const c = cat.toLowerCase();
                                    if (c.includes('tips')) return 'tips';
                                    if (c.includes('nyhet')) return 'nyheter';
                                    if (c.includes('fakta')) return 'fakta';
                                    return c.replace(/[^a-z0-9]/g, '');
                                };
                                const category = (article.category || '').toLowerCase();
                                const coverImage = (article.images && article.images.length > 0) ? article.images[0] : '/proj-stamspolning.png';
                                const date = article.publish_date ? new Date(article.publish_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Okänt datum';
                                const title = article.title || 'Utan titel';
                                const desc = article.excerpt || '';
                                const slug = article.slug || '#';

                                return (
                                    <Link 
                                        key={article.id || slug} 
                                        href={`/kunskapsbanken/${slug}`} 
                                        className="project-card-v2 premium-blog-card visible" 
                                        data-category={getCategoryKey(article.category)}
                                    >
                                        <div className="project-card-v2-media anim-scale-down-container">
                                            <img src={coverImage} alt={title} className="anim-scale-down" />
                                        </div>
                                        <div className="project-card-v2-content">
                                            <div className="project-card-v2-meta">
                                                <span>{date}</span> | <span style={{ textTransform: 'capitalize' }}>{category}</span>
                                            </div>
                                            <h3 className="anim-fade-up">{title}</h3>
                                            <p className="anim-fade-up">{desc}</p>
                                            <span className="project-card-v2-btn">Läs mer</span>
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
                
            </div>
        </section>

        {/* CTA SECTION */}
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
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', color: '#ffffff', lineHeight: 1.2 }} className="anim-mask-text"><span className="anim-mask-inner">Har du frågor om rör och avlopp?</span></h2>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem', opacity: 0.9 }} className="anim-fade-up">Låt oss ta hand om ert rörsystem precis som vi gjort för hundratals andra nöjda kunder. Hör av er för en förutsättningslös dialog.</p>
                <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Link href="/kontakt" className="cta-btn-header-match anim-fade-up">Kontakta oss</Link>
                    <a href="tel:+46703185110" className="cta-btn-header-match anim-fade-up">Ring oss</a>
                </div>
            </div>
        </section>
      </main>
      
      <Script id="article-filter-logic" strategy="afterInteractive">
        {`
            // Re-bind filter events for dynamically rendered cards
            const filterBtns = document.querySelectorAll('.nordx-filter-btn');
            const grid = document.getElementById('dynamic-projects-grid');
            if (filterBtns && grid) {
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        filterBtns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        const filterVal = btn.getAttribute('data-filter');
                        const allCards = grid.querySelectorAll('.project-card-v2');
                        
                        allCards.forEach(card => {
                            if (filterVal === 'all') {
                                card.style.display = 'block';
                                setTimeout(() => card.classList.add('visible'), 50);
                            } else {
                                if (card.getAttribute('data-category') === filterVal) {
                                    card.style.display = 'block';
                                    setTimeout(() => card.classList.add('visible'), 50);
                                } else {
                                    card.classList.remove('visible');
                                    setTimeout(() => card.style.display = 'none', 300);
                                }
                            }
                        });
                    });
                });
            }
        `}
      </Script>
    </FrontendLayout>
  );
}
