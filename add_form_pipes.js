const fs = require('fs');
let tsx = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');

const pipeHTML = `
                                {/* Pipe Frame */}
                                <div className="p-pipe p-top">
                                    <div className="p-muff" style={{ left: "20%" }}></div><div className="p-muff" style={{ right: "20%" }}></div>
                                </div>
                                <div className="p-pipe p-bottom">
                                    <div className="p-muff" style={{ left: "50%", transform: "translateX(-50%) translateY(-50%)" }}></div>
                                </div>
                                <div className="p-pipe p-left">
                                    <div className="p-muff-v" style={{ top: "30%" }}></div>
                                </div>
                                <div className="p-pipe p-right">
                                    <div className="p-muff-v" style={{ top: "70%" }}></div>
                                </div>
                                <div className="p-corner p-tl"></div>
                                <div className="p-corner p-tr"></div>
                                <div className="p-corner p-bl"></div>
                                <div className="p-corner p-br"></div>
`;

tsx = tsx.replace(
    '<div className="contact-form-card" style={{ transitionDelay: "0.4s" }}>', 
    '<div className="contact-form-card" style={{ transitionDelay: "0.4s" }}>\n' + pipeHTML
);

fs.writeFileSync('src/app/kontakt/page.tsx', tsx, 'utf8');
console.log('Added pipes to form card');
