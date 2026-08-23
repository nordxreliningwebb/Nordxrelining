const fs = require('fs');
const file = 'src/app/kalkylator/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const styleBlock = `
            <style dangerouslySetInnerHTML={{__html: \`
                body.light-theme { background-color: #faf8f5 !important; }
                
                @media (max-width: 768px) {
                    .calc-card { padding: 40px 42px !important; }
                    .view-title { font-size: 1.1rem !important; margin-bottom: 8px !important; line-height: 1.3 !important; }
                    .view-subtitle { font-size: 0.85rem !important; margin-bottom: 20px !important; padding-bottom: 0 !important; line-height: 1.4 !important; }
                    .option-card { padding: 12px 10px !important; min-height: auto !important; }
                    .option-title { font-size: 0.85rem !important; margin-bottom: 2px !important; white-space: normal !important; }
                    .option-desc { font-size: 0.75rem !important; line-height: 1.2 !important; }
                    .option-icon { margin-bottom: 8px !important; display: flex !important; align-items: center !important; justify-content: center !important; }
                    .option-icon svg { height: 26px !important; width: auto !important; transform: none !important; }
                    .distance-card { padding: 8px !important; font-size: 0.85rem !important; }
                    .qty-item { padding: 10px 15px !important; }
                    .qty-item span { font-size: 0.85rem !important; }
                    .qty-btn { width: 28px !important; height: 28px !important; font-size: 1rem !important; }
                    .action-row .btn-back, .action-row .btn-primary, .action-row a.btn-primary { font-size: 0.85rem !important; padding: 12px 10px !important; border-radius: 6px !important; height: auto !important; }
                    .action-row { gap: 12px !important; padding-top: 1rem !important; }
                }
            \`}} />
`;

// Use regex to replace the old style tag
content = content.replace(/<style dangerouslySetInnerHTML={{__html: `body\.light-theme \{ background-color: #faf8f5 !important; \}`}} \/>/, styleBlock.trim());

fs.writeFileSync(file, content);
console.log("Injected style block into KalkylatorPage");
