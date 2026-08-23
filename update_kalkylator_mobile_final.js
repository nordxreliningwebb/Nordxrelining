const fs = require('fs');
const file = 'public/kalkylator.css';
let content = fs.readFileSync(file, 'utf8');

const mobileOverrides = `
/* MOBILE OVERRIDES FROM USER REQUEST */
@media (max-width: 768px) {
    /* Layout - MUST have huge padding to clear the pipes */
    .calc-card {
        padding: 40px 42px !important; /* Increased drastically so content clears the pipes completely */
    }

    /* Headings */
    .view-title {
        font-size: 1.1rem !important; /* Even smaller heading */
        margin-bottom: 8px !important;
        line-height: 1.3 !important;
    }
    .view-subtitle {
        font-size: 0.85rem !important;
        margin-bottom: 20px !important;
        padding-bottom: 0 !important;
        line-height: 1.4 !important;
    }
    
    /* Option Cards */
    .option-card {
        padding: 12px 10px !important; 
        min-height: auto !important;
    }
    .option-title {
        font-size: 0.85rem !important;
        margin-bottom: 2px !important;
        white-space: normal !important; 
    }
    .option-desc {
        font-size: 0.75rem !important;
        line-height: 1.2 !important;
    }
    
    /* Make icons visually the same size */
    .option-icon {
        margin-bottom: 8px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    .option-icon svg {
        height: 26px !important;
        width: auto !important;
        transform: none !important;
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
        font-size: 0.85rem !important;
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
        padding: 12px 10px !important;
        border-radius: 6px !important;
        height: auto !important;
    }
    
    .action-row {
        gap: 12px !important;
        padding-top: 1rem !important;
    }
}
`;

// Remove previous overrides if we run this multiple times
let cleanContent = content.replace(/\/\* MOBILE OVERRIDES FROM USER REQUEST \*\/[\s\S]*?(?=\z|$)/, '');

fs.writeFileSync(file, cleanContent.trim() + '\n' + mobileOverrides);
console.log('Appended final mobile overrides');
