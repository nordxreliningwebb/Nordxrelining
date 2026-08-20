const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Add import
if (!content.includes('import { supabase }')) {
    content = content.replace('import { getActiveCampaign, getPublicFAQs } from "@/lib/data";', 'import { getActiveCampaign, getPublicFAQs } from "@/lib/data";\nimport { supabase } from "@/lib/supabase";');
}

// 2. Fetch projects logic
const fetchLogic = `
  let recentProjects: any[] = [];
  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(4);
    if (data) recentProjects = data;
  } catch (err) {
    console.warn("Could not fetch projects for homepage:", err);
  }

  const sliderProjects = [];
  for (let i = 0; i < 4; i++) {
    if (i < recentProjects.length) {
      sliderProjects.push({ ...recentProjects[i], isPlaceholder: false });
    } else {
      sliderProjects.push({
        id: \`placeholder-\${i}\`,
        isPlaceholder: true,
        title: "Information uppdateras snart",
        excerpt: "Här kommer vi inom kort att presentera fler spännande projekt. Håll utkik för framtida uppdateringar från oss på Nordxrelining.",
      });
    }
  }
`;

if (!content.includes('let recentProjects: any[] = [];')) {
    content = content.replace('const homeFaqs = faqs.slice(0, 5);', 'const homeFaqs = faqs.slice(0, 5);\n' + fetchLogic);
}

// 3. Replace the slider wrapper
const newSliderWrapper = `<div className="project-slider-wrapper">
                    {sliderProjects.map((project, index) => {
                        const isPlaceholder = project.isPlaceholder;
                        const coverImage = isPlaceholder ? "" : (project.images?.[0] || '/construction.jpg');
                        const date = isPlaceholder ? "" : (project.publish_date ? new Date(project.publish_date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Pågående');
                        const title = project.title || project.name || 'Utan titel';
                        const desc = project.excerpt || project.description || '';
                        const slug = project.slug || '#';
                        const location = project.location || '';
                        
                        return (
                            <div key={project.id || index} className={\`project-slider-card \${index === 0 ? 'active ' : ''}anim-fade-up\`} data-index={index}>
                                <div className="project-slider-image" style={{ backgroundImage: coverImage ? \`url('\${coverImage}')\` : 'none', backgroundColor: coverImage ? 'transparent' : '#f1f5f9', backgroundSize: "cover", backgroundPosition: "center" }}></div>
                                <div className="project-slider-content">
                                    {!isPlaceholder && (
                                        <div className="project-meta">
                                            <span className="project-date">{date}</span>
                                        </div>
                                    )}
                                    <h3 className="anim-fade-up">{title}</h3>
                                    {!isPlaceholder && location && (
                                        <div className="project-location">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            {location}
                                        </div>
                                    )}
                                    <p className="anim-fade-up">{desc}</p>
                                    {!isPlaceholder && (
                                        <a href={\`/projekt/\${slug}\`} className="project-btn">Läs mer om projektet</a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>`;

const sliderRegex = /<div className="project-slider-wrapper">[\s\S]*?<\/div>\s*<div className="project-slider-pagination">/;
content = content.replace(sliderRegex, newSliderWrapper + '\n                \n                <div className="project-slider-pagination">');

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Fixed projects slider');
