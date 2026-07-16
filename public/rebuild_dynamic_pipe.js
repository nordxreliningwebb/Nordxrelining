const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'stamspolning.html');
let html = fs.readFileSync(filePath, 'utf8');

// The new HTML structure we want to inject.
// We will extract the SVG definitions and nozzle groups to use in JS, but for now we put a placeholder overlay.

const newContentStart = `
<section class="service-page-content" id="stamspolning-content" style="padding: 100px 0; background: #ffffff; position: relative; overflow: hidden;">
    
    <!-- SVG OVERLAY FOR DYNAMIC PIPE -->
    <svg id="dynamic-pipe-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
        <defs id="dynamic-pipe-defs">
            <!-- Gradients and filters will be injected here by main.js or kept here -->
        </defs>
        <!-- The dynamically drawn pipe path -->
        <g id="dynamic-pipe-group"></g>
        
        <!-- The nozzle and spray -->
        <g id="dynamic-nozzle" style="opacity: 0;">
            <!-- nozzle elements will be appended here -->
        </g>
    </svg>

    <div class="container layout-wrapper" style="max-width: 1400px; width: 95%; margin: 0 auto; position: relative; z-index: 2;">
        
        <!-- Top Right Text Block -->
        <div class="intro-text-block" id="intro-text" style="max-width: 650px; margin-left: auto; margin-bottom: 8rem;">
`;

const newContentMiddle = `
        </div>
        
        <!-- Bottom Left Text Block -->
        <div class="steps-text-block" id="steg-for-steg-heading" style="max-width: 650px; margin-right: auto; margin-bottom: 4rem;">
`;

const newContentEnd = `
        </div>
    </div>
</section>
`;

// Extract everything from <h2 style="font-size: 2.5rem;... to before <h3 style="font-size: 2rem; ... Så här går det till
const introMatch = html.match(/<h2 style="font-size: 2\.5rem;.*?<\/h3>.*?<p style="font-size: 1\.125rem;.*?<\/p>/s);
// Actually, it's easier to just find the split point.
const h2Index = html.indexOf('<h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: #0f172a;">Underhållsspolning &amp; Förebyggande Åtgärder</h2>');
const stegIndex = html.indexOf('<h3 style="font-size: 2rem; margin-bottom: 1.5rem; color: #0f172a; padding-top: 2rem; border-top: 1px solid #e2e8f0;">Så här går det till – Steg för Steg</h3>');
const contentRightEnd = html.indexOf('</div>', html.indexOf('</div>', html.indexOf('</div>', html.indexOf('<!-- Steg 4 -->')) + 10) + 10);
// finding the exact end of service-page-content is easier using regex or just indexOf CTA
const ctaIndex = html.indexOf('<section class="service-cta"');

if (h2Index !== -1 && stegIndex !== -1) {
    const introText = html.substring(h2Index, stegIndex);
    
    // We need to find the end of the steps container.
    const stepsEndStr = '<!-- Right Column: Text & Steps -->';
    
    // Actually, let's extract the exact blocks we need.
    const stepsStart = stegIndex;
    // Find the end of process-steps-container
    const processStepsEndIndex = html.indexOf('</div>', html.indexOf('</div>', html.indexOf('<!-- Steg 4 -->')) + 10);
    // Find the end of the entire service-page-content section
    const sectionEndIndex = html.indexOf('</section>', processStepsEndIndex) + 10;
    
    const stepsText = html.substring(stepsStart, sectionEndIndex - 10); // rough estimate, we will clean it up
    
    // Find the start of service-page-content
    const sectionStartIndex = html.indexOf('<section class="service-page-content"');
    
    // We need to save the SVG defs and nozzle to inject them into main.js or keep them in HTML.
    const svgMatch = html.match(/<svg.*?class="stamspolning-svg".*?>(.*?)<\/svg>/s);
    let svgDefs = '';
    let svgNozzle = '';
    let svgSpray = '';
    let svgDirt1 = '';
    let svgDirt2 = '';
    if (svgMatch) {
        const svgContent = svgMatch[1];
        const defsMatch = svgContent.match(/<defs>(.*?)<\/defs>/s);
        if (defsMatch) svgDefs = defsMatch[1];
        
        const sprayMatch = svgContent.match(/<g class="spray-particles">(.*?)<\/g>/s);
        if (sprayMatch) svgSpray = sprayMatch[0];
        
        const nozzleMatch = svgContent.match(/<!-- Premium Vector Nozzle -->(.*?<\/g>\s*<\/g>)/s); // careful
        // let's extract nozzle by just looking at the original file
    }
}

// Alternatively, let's just use string replacements on the specific file since it's well-known.
let newHtml = html;

// 1. Replace the top part of the section down to the intro h2
const sectionTopRegex = /<section class="service-page-content"[^>]*>[\s\S]*?(?=<h2 style="font-size: 2\.5rem)/;
newHtml = newHtml.replace(sectionTopRegex, newContentStart);

// 2. Replace the boundary between intro and steps
const boundaryRegex = /(?=<h3 style="font-size: 2rem;[^>]*>Så här går det till – Steg för Steg<\/h3>)/;
newHtml = newHtml.replace(boundaryRegex, newContentMiddle);

// 3. Replace the end of the section
const sectionBottomRegex = /<\/div>\s*<\/div>\s*<\/div>\s*<\/section>(?=\s*<section class="service-cta")/s;
newHtml = newHtml.replace(sectionBottomRegex, newContentEnd);

// 4. Extract SVG elements we need to save before we did the replacement?
// Wait, newHtml already erased the SVG! We need the SVG definitions.
const oldSvgMatch = html.match(/<defs>([\s\S]*?)<\/defs>/);
if (oldSvgMatch) {
    newHtml = newHtml.replace('<!-- Gradients and filters will be injected here by main.js or kept here -->', oldSvgMatch[1]);
}

const oldSprayMatch = html.match(/(<g class="spray-particles">[\s\S]*?<\/g>)/);
const oldNozzleMatch = html.match(/(<!-- Premium Vector Nozzle -->[\s\S]*?<!-- Spinning Head -->[\s\S]*?<\/g>\s*<\/g>)/);

let dynamicNozzleInner = '';
if (oldSprayMatch) dynamicNozzleInner += oldSprayMatch[1] + '\n';
if (oldNozzleMatch) dynamicNozzleInner += oldNozzleMatch[1] + '\n';

newHtml = newHtml.replace('<!-- nozzle elements will be appended here -->', dynamicNozzleInner);

// Let's write it to a temporary file to check it
fs.writeFileSync(path.join(__dirname, 'stamspolning_temp.html'), newHtml);
console.log("Written to stamspolning_temp.html. Reviewing extraction...");
