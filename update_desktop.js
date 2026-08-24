const fs = require('fs');
const file = 'src/app/kalkylator/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update Water Animation Speed
content = content.replace(
    /transition: 'height 1\.5s cubic-bezier\(0\.4, 0, 0\.2, 1\)'/,
    "transition: 'height 3.5s linear'"
);

// 2. Add 'step3-grid' class to Step 3's options-grid
const step3Regex = /(\{currentStep === 3 && \([\s\S]*?<div className="options-grid)(">\s*\{\[\s*\{ id: "Platta på mark")/;
content = content.replace(step3Regex, "$1 step3-grid$2");

// 3. Update the inline style block to include desktop fixes
const oldMediaDesktop = /@media \(min-width: 769px\) \{\s*\.step6-actions \{ display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center; padding-top: 0; \}\s*\.step6-primary-group \{ display: flex; gap: 15px; \}\s*\.step6-actions \.btn-primary \{ padding: 14px 24px; font-size: 1rem; font-weight: 600; border: 1px solid #0284c7; box-shadow: none; text-align: center; \}\s*\}/;

const newMediaDesktop = `@media (min-width: 769px) {
                    .calc-card { padding: 60px 70px !important; }
                    .btn-back { padding: 14px 30px !important; font-size: 1rem !important; }
                    .step3-grid { display: flex !important; flex-wrap: wrap; justify-content: center; }
                    .step3-grid .option-card { flex: 1 1 calc(33.333% - 15px); max-width: calc(33.333% - 15px); min-width: 180px; }
                    
                    .step6-actions { display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: center; padding-top: 0; }
                    .step6-primary-group { display: flex; gap: 15px; }
                    .step6-actions .btn-primary { padding: 14px 24px; font-size: 1rem; font-weight: 600; border: 1px solid #0284c7; box-shadow: none; text-align: center; }
                }`;

content = content.replace(oldMediaDesktop, newMediaDesktop);

fs.writeFileSync(file, content);
console.log("Applied desktop layout, step 3 grid, and water animation fixes.");
