const fs = require('fs');
const file = 'public/kalkylator.css';
let content = fs.readFileSync(file, 'utf8');

const mobileOverrides = `
/* MOBILE OVERRIDES FROM USER REQUEST */
@media (max-width: 768px) {
    /* Headings */
    .view-title {
        font-size: 1.25rem !important;
        margin-bottom: 8px !important;
    }
    .view-subtitle {
        font-size: 0.9rem !important;
        margin-bottom: 20px !important;
        padding-bottom: 0 !important;
    }
    
    /* Option Cards (Step 1) */
    .option-card {
        padding: 10px 8px !important;
        min-height: auto !important;
    }
    .option-title {
        font-size: 0.9rem !important;
        margin-bottom: 2px !important;
    }
    .option-desc {
        font-size: 0.75rem !important;
        line-height: 1.2 !important;
    }
    .option-icon {
        font-size: 1.5rem !important;
        margin-bottom: 5px !important;
    }
    .option-icon svg {
        transform: scale(0.7) !important;
        transform-origin: center !important;
    }
    
    /* Option Cards (Step 4 - distance) */
    .distance-card {
        padding: 8px !important;
        font-size: 0.85rem !important;
    }

    /* Qty Items (Step 3) */
    .qty-item {
        padding: 10px 15px !important;
    }
    .qty-item span {
        font-size: 0.9rem !important;
    }
    .qty-btn {
        width: 28px !important;
        height: 28px !important;
        font-size: 1rem !important;
    }
    
    /* Action Buttons */
    .action-row .btn-back,
    .action-row .btn-primary,
    .action-row a.btn-primary {
        font-size: 0.85rem !important;
        padding: 10px 8px !important;
        border-radius: 6px !important;
        height: auto !important;
    }
    
    .action-row {
        gap: 8px !important;
        padding-top: 1rem !important;
    }
    
    /* Layout */
    .calc-card {
        padding: 15px 10px !important;
    }
}
`;

// Remove previous overrides if we run this multiple times
let cleanContent = content.replace(/\/\* MOBILE OVERRIDES FROM USER REQUEST \*\/[\s\S]*?(?=\z|$)/, '');

fs.writeFileSync(file, cleanContent.trim() + '\n' + mobileOverrides);
console.log('Appended comprehensive mobile overrides');
