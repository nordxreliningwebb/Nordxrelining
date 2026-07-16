const fs = require('fs');

let html = fs.readFileSync('public/stamspolning.html', 'utf8');

// 1. Mirror SVG path
html = html.replace(/d="M 1200 -100 L 1200 400 Q 1200 550 1050 550 L 350 550 Q 200 550 200 700 L 200 1800"/g, 
                    'd="M 200 -100 L 200 400 Q 200 550 350 550 L 1050 550 Q 1200 550 1200 700 L 1200 1800"');

// 2. Swap Top Row
// The top row currently has "content-left intro-text-box" then "empty-right"
const topRowRegex = /<div class="row-top" style="display: grid; grid-template-columns: 1\.1fr 0\.9fr;(.*?)<div class="content-left intro-text-box"(.*?)>(.*?)<\/div>\s*<div class="empty-right"><\/div>/s;
html = html.replace(topRowRegex, (match, gridStyle, leftStyle, leftContent) => {
    return `<div class="row-top" style="display: grid; grid-template-columns: 0.9fr 1.1fr;${gridStyle}<div class="empty-left"></div>\n            <div class="content-right intro-text-box"${leftStyle}>${leftContent}</div>`;
});

// 3. Swap Bottom Row
// The bottom row currently has "empty-left" then "content-right steps-box"
const bottomRowRegex = /<div class="row-bottom" style="display: grid; grid-template-columns: 0\.8fr 1\.2fr;(.*?)<div class="empty-left"><\/div>\s*<div class="content-right steps-box"(.*?)>(.*?)<\/div>\s*<\/div>/s;
html = html.replace(bottomRowRegex, (match, gridStyle, rightStyle, rightContent) => {
    return `<div class="row-bottom" style="display: grid; grid-template-columns: 1.2fr 0.8fr;${gridStyle}<div class="content-left steps-box"${rightStyle}>${rightContent}</div>\n            <div class="empty-right"></div>\n        </div>`;
});

// 4. Update CSS animation
// Replace the @keyframes and .animated-water-flow block
const cssRegex = /@keyframes water-flow-anim \{.*?\}\s*\.animated-water-flow \{.*?\}\s*\.content-right \{.*?margin-top: -2rem;.*?\}/s;
const newCss = `.animated-water-flow {
            /* Dashed pattern */
            stroke-dasharray: 30 60;
            /* Scroll-based offset mapping */
            stroke-dashoffset: calc(var(--scroll-progress, 0) * -2000);
            transition: stroke-dashoffset 0.1s ease-out;
        }
        .content-left.steps-box {
            margin-top: -2rem;
        }`;
html = html.replace(cssRegex, newCss);

fs.writeFileSync('public/stamspolning.html', html, 'utf8');
console.log('Successfully swapped layout and restored scroll animation.');
