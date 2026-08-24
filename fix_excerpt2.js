const fs = require('fs');

const fixExcerptSpacing = (file, isFrontend) => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    if (isFrontend) {
        // We replace:
        // <p className="text-gray-100 font-light max-w-3xl mx-auto whitespace-pre-wrap" style={{ fontSize: "1.25rem" }}>{excerpt}</p>
        // With a div that maps over split paragraphs
        const oldStr = /<p className="text-gray-100 font-light max-w-3xl mx-auto whitespace-pre-wrap" style={{ fontSize: "1\.25rem" }}>\{excerpt\}<\/p>/g;
        
        const newStr = `<div className="text-gray-100 font-light max-w-3xl mx-auto flex flex-col gap-4" style={{ fontSize: "1.25rem" }}>
                            {(excerpt || '').split(/\\n+/).filter(Boolean).map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>`;
        content = content.replace(oldStr, newStr);
    } else {
        // For previews:
        // <p className="journal-hero-excerpt text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-inter whitespace-pre-wrap">{props.subheading || 'Här visas ...'}</p>
        
        // Let's do a generic replace for the preview
        const oldStr = /<p className="journal-hero-excerpt text-lg md:text-xl text-white\/90 max-w-2xl mx-auto font-inter whitespace-pre-wrap">(\{props\.subheading \|\| '[^']+'\})<\/p>/g;
        
        const newStr = `<div className="journal-hero-excerpt text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-inter flex flex-col gap-4">
                    {($1).split(/\\n+/).filter(Boolean).map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                  </div>`;
        
        content = content.replace(oldStr, newStr);
    }

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
};

fixExcerptSpacing('src/app/projekt/[slug]/page.tsx', true);
fixExcerptSpacing('src/app/kunskapsbanken/[slug]/page.tsx', true);
fixExcerptSpacing('src/components/admin/ProjectLivePreview.tsx', false);
fixExcerptSpacing('src/components/admin/KnowledgeLivePreview.tsx', false);
