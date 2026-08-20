const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const replacement = `                        <svg className="anim-star-pop" style={{ animationDelay: '0ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg className="anim-star-pop" style={{ animationDelay: '100ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg className="anim-star-pop" style={{ animationDelay: '200ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg className="anim-star-pop" style={{ animationDelay: '300ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                        <svg className="anim-star-pop" style={{ animationDelay: '400ms' }} viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;

content = content.replace(/(<svg viewBox="0 0 24 24" fill="#fbbf24" width="32" height="32"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"><\/path><\/svg>\s*){5}/g, replacement + '\n');
fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Replaced stars in page.tsx');
