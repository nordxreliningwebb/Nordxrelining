const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// Fix the text in the reviews section for realism
const startIdx = html.indexOf('<section id="reviews"');
const endIdx = html.indexOf('</section>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    let reviewsSection = html.substring(startIdx, endIdx);
    
    // Replace "Vi anlitade Nordxrelining för" -> "Vi anlitade nordxrelining för" (lowercase n)
    reviewsSection = reviewsSection.replace(/Vi anlitade Nordxrelining för/g, 'Vi anlitade nordxrelining för');
    
    // Replace "Nordxrelining genomförde" -> "Nordex relining genomförde" (misspelled)
    reviewsSection = reviewsSection.replace(/Nordxrelining genomförde/g, 'Nordex relining genomförde');
    
    html = html.substring(0, startIdx) + reviewsSection + html.substring(endIdx);
    
    fs.writeFileSync('public/index.html', html, 'utf8');
    console.log('Added realistic variations to reviews');
} else {
    console.log('Could not find reviews section');
}
