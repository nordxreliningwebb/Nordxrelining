const fs = require('fs');
const file = 'public/kalkylator.css';
let content = fs.readFileSync(file, 'utf8');

const mobileOverrides = `
/* MOBILE OVERRIDES FROM USER REQUEST */
@media (max-width: 768px) {
    .view-title {
        font-size: 1.4rem !important;
        margin-bottom: 10px !important;
    }
    .view-subtitle {
        font-size: 0.95rem !important;
        margin-bottom: 25px !important;
    }
    .option-card {
        padding: 12px 10px !important;
        min-height: auto !important;
    }
    .option-title {
        font-size: 0.95rem !important;
        margin-bottom: 4px !important;
    }
    .option-desc {
        font-size: 0.8rem !important;
    }
    .option-icon {
        font-size: 1.8rem !important;
        margin-bottom: 8px !important;
    }
    
    /* Smaller CTA buttons */
    .action-row .btn-back,
    .action-row .btn-primary {
        font-size: 0.85rem !important;
        padding: 10px 5px !important;
        border-radius: 6px !important;
    }
    .action-row {
        gap: 8px !important;
        padding-top: 1.5rem !important;
    }
    .calc-card {
        padding: 20px 12px !important;
    }
}
`;

// Remove previous overrides if we run this multiple times
const cleanContent = content.replace(/\/\* MOBILE OVERRIDES FROM USER REQUEST \*\/[\s\S]*?(?=\z|$)/, '');

fs.writeFileSync(file, cleanContent.trim() + '\n' + mobileOverrides);
console.log('Appended mobile overrides');
