const fs = require('fs');

// 1. Update src/app/projekt/page.tsx for line clamping
const projektPage = 'src/app/projekt/page.tsx';
let pContent = fs.readFileSync(projektPage, 'utf8');

// Replace <h2> line clamp
pContent = pContent.replace(
    /<h2 className="anim-mask-text"><span className="anim-mask-inner">\{latestProject\.title \|\| latestProject\.name \|\| 'Utan titel'\}<\/span><\/h2>/,
    `<h2 className="anim-mask-text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{latestProject.title || latestProject.name || 'Utan titel'}</h2>`
);

// Replace <p> line clamp
pContent = pContent.replace(
    /<p>\{latestProject\.excerpt \|\| latestProject\.description \|\| ''\}<\/p>/,
    `<p style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{latestProject.excerpt || latestProject.description || ''}</p>`
);
fs.writeFileSync(projektPage, pContent);
console.log('Updated projekt/page.tsx');

// 2. Update src/app/projekt/[slug]/page.tsx for slug decoding
const singlePage = 'src/app/projekt/[slug]/page.tsx';
let sContent = fs.readFileSync(singlePage, 'utf8');

// In generateMetadata
sContent = sContent.replace(
    /\.eq\('slug', resolvedParams\.slug\)/g,
    `.eq('slug', decodeURIComponent(resolvedParams.slug))`
);

fs.writeFileSync(singlePage, sContent);
console.log('Updated projekt/[slug]/page.tsx');
