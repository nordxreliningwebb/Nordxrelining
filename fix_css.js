const fs = require('fs');

function fixCSS() {
  let file = 'public/style.css';
  let c = fs.readFileSync(file, 'utf8');

  // We want to target the specific media query at max-width: 768px for the slider
  // In style.css it looks like:
  /*
  @media (max-width: 768px) {
      .project-slider-card {
          grid-template-columns: 1fr;
      }
      .project-slider-image {
          min-height: 250px;
      }
      .project-slider-content {
          padding: 2rem 1.5rem;
      }
  }
  */

  let replacement = `  @media (max-width: 768px) {
      .project-slider-card {
          grid-template-columns: 1fr;
          min-height: auto;
      }
      .project-slider-image {
          min-height: 200px;
          height: 200px;
      }
      .project-slider-content {
          padding: 1.5rem 1.25rem;
      }
  }`;

  // It's possible we can just replace the whole block by exact string or regex.
  c = c.replace(/@media\s*\(max-width:\s*768px\)\s*\{\s*\.project-slider-card\s*\{\s*grid-template-columns:\s*1fr;\s*\}\s*\.project-slider-image\s*\{\s*min-height:\s*250px;\s*\}\s*\.project-slider-content\s*\{\s*padding:\s*2rem\s*1\.5rem;\s*\}\s*\}/, replacement);

  // If the regex didn't match, we can just append it at the end to override
  if (!c.includes('min-height: auto')) {
    console.log("Regex didn't match, appending to end of file to override");
    c += `\n/* Mobile slider height fix */\n${replacement}\n`;
  }

  // Also, remove min-height from global if we want, but global 500px is fine for desktop.
  
  fs.writeFileSync(file, c);
  console.log('Fixed CSS in ' + file);
}

fixCSS();
