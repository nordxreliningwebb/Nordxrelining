const fs = require('fs');

function updateCSS() {
    let file = 'public/style.css';
    let c = fs.readFileSync(file, 'utf8');

    // Remove any previous mobile fix blocks
    const mobileFixRegex = /\/\* =========================================\s*PROJECT SLIDER MOBILE LAYOUT FIX\s*========================================= \*\/[\s\S]*?(?=\z|$)/;
    c = c.replace(mobileFixRegex, '');

    // The user wants the image and the text box to be EXACTLY the same height (lika stora).
    // The user wants elements to always be in the exact same place (button at bottom, date at top).
    // The user wants max 3 lines for title and 3 lines for excerpt with ellipsis.
    
    // We set card height: 460px.
    // Image height: 230px.
    // Content height: 230px.
    
    let customStyles = `
/* =========================================
   PROJECT SLIDER MOBILE LAYOUT FIX
   ========================================= */
@media (max-width: 768px) {
    .project-slider-card {
        grid-template-columns: 1fr !important;
        height: 460px !important;
        min-height: 460px !important;
    }
    
    .project-slider-image {
        height: 230px !important;
        min-height: 230px !important;
    }
    
    .project-slider-content {
        height: 230px !important;
        min-height: 230px !important;
        padding: 1rem 1.25rem !important;
        display: flex !important;
        flex-direction: column !important;
    }
    
    /* Meta (Date / Category) */
    .project-slider-content .project-meta {
        margin-bottom: 0.5rem !important;
    }
    
    /* Title */
    .project-slider-content h3 {
        font-size: 1.25rem !important;
        line-height: 1.2 !important;
        margin-bottom: 0.5rem !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
    }
    
    /* Excerpt */
    .project-slider-content p {
        font-size: 0.95rem !important;
        line-height: 1.5 !important;
        margin-bottom: 0.5rem !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
    }
    
    /* CTA Button */
    .project-slider-content .project-btn {
        margin-top: auto !important; /* Pushes to bottom */
        padding: 0.6rem 1rem !important;
        font-size: 0.95rem !important;
    }
}
`;

    c = c.trim() + '\n' + customStyles;
    
    fs.writeFileSync(file, c);
    console.log("Updated style.css");
}

updateCSS();
