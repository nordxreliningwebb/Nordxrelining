const fs = require('fs');

const fixExcerpt = (file) => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // For frontend pages
    content = content.replace(
        /<p className="text-gray-100 font-light max-w-3xl mx-auto" style={{ fontSize: "1.25rem" }}>\{excerpt\}<\/p>/g,
        '<p className="text-gray-100 font-light max-w-3xl mx-auto whitespace-pre-wrap" style={{ fontSize: "1.25rem" }}>{excerpt}</p>'
    );
    
    // For backend previews
    content = content.replace(
        /<p className="journal-hero-excerpt text-lg md:text-xl text-white\/90 max-w-2xl mx-auto font-inter">\{props\.subheading \|\| 'Här visas utdraget\.'\}<\/p>/g,
        '<p className="journal-hero-excerpt text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-inter whitespace-pre-wrap">{props.subheading || \'Här visas utdraget.\'}</p>'
    );
    
    content = content.replace(
        /<p className="journal-hero-excerpt text-lg md:text-xl text-white\/90 max-w-2xl mx-auto font-inter">\{props\.subheading \|\| 'Här visas en kort sammanfattning eller underrubrik för projektet\.'\}<\/p>/g,
        '<p className="journal-hero-excerpt text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-inter whitespace-pre-wrap">{props.subheading || \'Här visas en kort sammanfattning eller underrubrik för projektet.\'}</p>'
    );

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
};

fixExcerpt('src/app/projekt/[slug]/page.tsx');
fixExcerpt('src/app/kunskapsbanken/[slug]/page.tsx');
fixExcerpt('src/components/admin/ProjectLivePreview.tsx');
fixExcerpt('src/components/admin/KnowledgeLivePreview.tsx');
