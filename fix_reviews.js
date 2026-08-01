const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Fix the text "Nordx" -> "Nordxrelining" in the reviews section
const startIdx = html.indexOf('<section id="reviews"');
const endIdx = html.indexOf('</section>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    let reviewsSection = html.substring(startIdx, endIdx);
    
    // Replace "Nordx " with "Nordxrelining "
    reviewsSection = reviewsSection.replace(/Nordx /g, 'Nordxrelining ');
    
    html = html.substring(0, startIdx) + reviewsSection + html.substring(endIdx);
    
    // Fix the marquee padding
    html = html.replace('padding-left: 10vw;', '/* padding-left removed to avoid empty left space */');
    
    // To ensure the left side isn't "empty", we can start the keyframes slightly shifted,
    // but usually just removing the left padding fixes the "empty on the left" issue
    // since the first card will sit flush with the left edge.
    
    fs.writeFileSync('public/index.html', html, 'utf8');
    console.log('Fixed reviews text and marquee padding');
} else {
    console.log('Could not find reviews section');
}
