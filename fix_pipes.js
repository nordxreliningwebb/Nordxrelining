const fs = require('fs');

const cssToAdd = `
/* ============================
   GLOBAL PIPE FRAME STYLES
   ============================ */
.p-pipe { position: absolute; z-index: 20; }
.p-pipe.p-top { 
    top: 0; left: 0; right: 0; height: 16px; 
    background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); 
}
.p-pipe.p-bottom { 
    bottom: 0; left: 0; right: 0; height: 16px; 
    background: linear-gradient(to top, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); 
}
.p-pipe.p-left { 
    left: 0; top: 0; bottom: 0; width: 16px; 
    background: linear-gradient(to right, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); 
}
.p-pipe.p-right { 
    right: 0; top: 0; bottom: 0; width: 16px; 
    background: linear-gradient(to left, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); 
}

/* Corners */
.p-corner { position: absolute; width: 16px; height: 16px; z-index: 21; }
.p-tl { top: 0; left: 0; background: radial-gradient(circle at bottom right, #f3f4f6 20%, #9ca3af 60%, #6b7280 90%); border-top-left-radius: 24px; }
.p-tr { top: 0; right: 0; background: radial-gradient(circle at bottom left, #f3f4f6 20%, #9ca3af 60%, #6b7280 90%); border-top-right-radius: 24px; }
.p-bl { bottom: 0; left: 0; background: radial-gradient(circle at top right, #f3f4f6 20%, #9ca3af 60%, #6b7280 90%); border-bottom-left-radius: 24px; }
.p-br { bottom: 0; right: 0; background: radial-gradient(circle at top left, #f3f4f6 20%, #9ca3af 60%, #6b7280 90%); border-bottom-right-radius: 24px; }

/* Muffs */
.p-muff { position: absolute; width: 22px; height: 20px; z-index: 22; border-radius: 2px; }
.p-muff::after { content: ''; position: absolute; width: 4px; height: 24px; border-radius: 2px; }
.p-pipe.p-top .p-muff { top: 50%; transform: translateY(-50%); background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05); }
.p-pipe.p-top .p-muff::after { right: 0; top: 50%; transform: translateY(-50%); background: linear-gradient(to bottom, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: -1px 0 2px rgba(0,0,0,0.1); }
.p-pipe.p-bottom .p-muff { top: 50%; transform: translateY(-50%); background: linear-gradient(to top, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: -2px 0 4px rgba(0,0,0,0.1), 2px 0 4px rgba(0,0,0,0.05); }
.p-pipe.p-bottom .p-muff::after { right: 0; top: 50%; transform: translateY(-50%); background: linear-gradient(to top, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: -1px 0 2px rgba(0,0,0,0.1); }

/* Muffs Vert */
.p-muff-v { position: absolute; width: 20px; height: 22px; z-index: 22; border-radius: 2px; }
.p-muff-v::after { content: ''; position: absolute; width: 24px; height: 4px; border-radius: 2px; }
.p-pipe.p-left .p-muff-v { left: 50%; transform: translateX(-50%); background: linear-gradient(to right, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: 0 -2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05); }
.p-pipe.p-left .p-muff-v::after { bottom: 0; left: 50%; transform: translateX(-50%); background: linear-gradient(to right, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: 0 -1px 2px rgba(0,0,0,0.1); }
.p-pipe.p-right .p-muff-v { left: 50%; transform: translateX(-50%); background: linear-gradient(to left, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: 0 -2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05); }
.p-pipe.p-right .p-muff-v::after { bottom: 0; left: 50%; transform: translateX(-50%); background: linear-gradient(to left, #9ca3af 0%, #f3f4f6 30%, #d1d5db 50%, #9ca3af 80%, #6b7280 100%); box-shadow: 0 -1px 2px rgba(0,0,0,0.1); }
`;

let css = fs.readFileSync('public/style.css', 'utf8');
if (!css.includes('GLOBAL PIPE FRAME STYLES')) {
    fs.appendFileSync('public/style.css', cssToAdd);
}

let tsx = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');
const corners = `
                                <div className="p-corner p-tl"></div>
                                <div className="p-corner p-tr"></div>
                                <div className="p-corner p-bl"></div>
                                <div className="p-corner p-br"></div>
`;
if (!tsx.includes('p-corner p-tl')) {
    tsx = tsx.replace('<div className="p-pipe p-top">', corners + '<div className="p-pipe p-top">');
    // Ensure muffs have styles
    tsx = tsx.replace('<div className="p-pipe p-top">\n                                    <div className="p-muff"></div>', '<div className="p-pipe p-top">\n                                    <div className="p-muff" style={{ left: "20%" }}></div><div className="p-muff" style={{ right: "20%" }}></div>');
    tsx = tsx.replace('<div className="p-pipe p-bottom">\n                                    <div className="p-muff"></div>', '<div className="p-pipe p-bottom">\n                                    <div className="p-muff" style={{ left: "50%", transform: "translateX(-50%) translateY(-50%)" }}></div>');
    tsx = tsx.replace('<div className="p-pipe p-left">\n                                    <div className="p-muff-v"></div>', '<div className="p-pipe p-left">\n                                    <div className="p-muff-v" style={{ top: "30%" }}></div>');
    tsx = tsx.replace('<div className="p-pipe p-right">\n                                    <div className="p-muff-v"></div>', '<div className="p-pipe p-right">\n                                    <div className="p-muff-v" style={{ top: "70%" }}></div>');
    fs.writeFileSync('src/app/kontakt/page.tsx', tsx);
}
console.log('Pipe frame deployed');
