import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import FrontendLayout from '@/components/FrontendLayout';
import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projekt | Nordxrelining',
  description: 'Vi hjälper dig med relining, stamspolning och rörinspektion i hela Sverige. Se våra tidigare projekt.',
};

export const revalidate = 60; // SSR cache invalidation every 60 seconds

export default async function ProjektPage() {
  let projects: any[] = [];
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      // Don't use console.error which triggers Next.js dev overlay, use console.warn or just log the message
      console.warn("Kunde inte hämta projekt (tabellen kanske inte finns än eller RLS blockerar):", error.message);
    } else if (data) {
      projects = data;
    }
  } catch (err: any) {
    console.warn("Ett systemfel uppstod vid hämtning av projekt:", err.message);
  }

  const latestProject = projects.length > 0 ? projects[0] : null;
  const remainingProjects = projects.length > 1 ? projects.slice(1) : [];

  return (
    <FrontendLayout>
      <main id="main-content">
        <section className="swoosh-hero" style={{ backgroundColor: '#faf8f5', padding: '160px 0 100px 0', overflow: 'hidden' }}>
            <div className="container" style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', padding: '0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    
                    <div style={{ background: '#ffffff', borderRadius: '32px', padding: '4rem 3rem', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', zIndex: 2, position: 'relative' }} className="anim-fade-left">
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: "'Inter', sans-serif", fontWeight: 700, color: '#0b0b0b', lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            <span className="">Projekt</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#475569', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                            Håll dig uppdaterad med det senaste från Nordxrelining. Här delar vi spännande referensprojekt, insikter från branschen och uppdateringar kring våra relining-, stamspolnings- och rörinspektionsprojekt runt om i Sverige.
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

                        {latestProject ? (
                        <Link href={`/projekt/${latestProject.slug || '#'}`} className="featured-project anim-scale-down-container" style={{ position: 'relative', zIndex: 10, margin: 0, width: '100%', height: '100%', minHeight: '450px', borderRadius: 0, boxShadow: 'none' }}>
                            <img src={latestProject.images?.[0] || "/proj-relining-featured.png"} alt={latestProject.title || latestProject.name || "Projekt"} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
                            <div className="featured-project-overlay" style={{ zIndex: 3 }}>
                                <div className="featured-project-meta">
                                    <span className="category" style={{ textTransform: 'capitalize' }}>{latestProject.category || 'Okategoriserad'}</span>
                                    <span className="date">{latestProject.publish_date ? new Date(latestProject.publish_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Pågående'}</span>
                                </div>
                                <h2 className="anim-mask-text"><span className="anim-mask-inner">{latestProject.title || latestProject.name || 'Utan titel'}</span></h2>
                                <p>{latestProject.excerpt || latestProject.description || ''}</p>
                                <span className="featured-project-btn">Läs inlägg</span>
                            </div>
                        </Link>
                        ) : (
                        <div className="featured-project anim-scale-down-container" style={{ position: 'relative', zIndex: 10, margin: 0, width: '100%', height: '100%', minHeight: '450px', borderRadius: 0, boxShadow: 'none', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: '#64748b', fontFamily: "'Inter', sans-serif" }}>Inget utvalt projekt ännu</p>
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
                    
                    {/* Filter Navigation (Client-side logic won't work perfectly without React state, but let's keep it static for now or use generic CSS filtering if we don't convert to a full client component) */}
                    <div className="nordx-filter-nav" style={{ marginTop: 0 }}>
                        <button className="nordx-filter-btn active" data-filter="all" aria-selected="true">ALLA</button>
                        <button className="nordx-filter-btn" data-filter="relining" aria-selected="false">RELINING</button>
                        <button className="nordx-filter-btn" data-filter="stamspolning" aria-selected="false">STAMSPOLNING</button>
                        <button className="nordx-filter-btn" data-filter="rorinspektion" aria-selected="false">RÖRINSPEKTION</button>
                    </div>

                    <div className="projects-grid-3" id="dynamic-projects-grid">
                        {!remainingProjects || remainingProjects.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: '#64748b', fontFamily: "'Inter', sans-serif" }}>
                                {projects.length === 0 ? "Inga projekt har publicerats ännu." : "Inga fler projekt har publicerats."}
                            </div>
                        ) : (
                            remainingProjects.map((project) => {
                                const category = (project.category || '').toLowerCase();
                                const coverImage = project.images?.[0] || '/construction.jpg';
                                const date = project.publish_date ? new Date(project.publish_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Pågående';
                                const title = project.title || project.name || 'Utan titel';
                                const desc = project.excerpt || project.description || '';
                                const slug = project.slug || '#';

                                return (
                                    <Link key={project.id} href={`/projekt/${slug}`} className="project-card-v2 premium-blog-card visible" data-category={category}>
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
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', color: '#ffffff', lineHeight: 1.2 }} className="anim-mask-text"><span className="anim-mask-inner">Bli vårt nästa lyckade projekt</span></h2>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem', opacity: 0.9 }} className="anim-fade-up">Låt oss ta hand om ert rörsystem precis som vi gjort för hundratals andra nöjda kunder. Hör av er för en förutsättningslös dialog.</p>
                <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Link href="/kontakt.html" className="cta-btn-header-match anim-fade-up">Kontakta oss</Link>
                    <a href="tel:+46703185110" className="cta-btn-header-match anim-fade-up">Ring oss</a>
                </div>
            </div>
        </section>
      </main>
      
      <Script id="project-filter-logic" strategy="afterInteractive">
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
