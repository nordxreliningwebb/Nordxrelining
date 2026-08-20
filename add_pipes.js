const fs = require('fs');
let content = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');

// 1. Inject pipes right after the Watermark
const pipesHTML = `
                                {/* Pipe Frame */}
                                <div className="p-pipe p-top">
                                    <div className="p-muff"></div>
                                </div>
                                <div className="p-pipe p-bottom">
                                    <div className="p-muff"></div>
                                </div>
                                <div className="p-pipe p-left">
                                    <div className="p-muff-v"></div>
                                </div>
                                <div className="p-pipe p-right">
                                    <div className="p-muff-v"></div>
                                </div>
`;
content = content.replace('</svg>\n                                </div>\n', '</svg>\n                                </div>\n' + pipesHTML);

// 2. Inject opening hours list item right before the end of the ul
const openingHoursHTML = `
                                    <li className="anim-stagger-child" style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", border: "1px solid rgba(255, 255, 255, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        </div>
                                        <div>
                                            <span className="label" style={{ display: "block", fontSize: "0.8rem", opacity: 0.85, marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Öppettider & Jour</span>
                                            <span className="value" style={{ display: "block", fontSize: "1.25rem", fontWeight: 700, color: "white" }}>Jour 24/7 året om</span>
                                        </div>
                                    </li>
`;
content = content.replace('</a></span>\n                                        </div>\n                                    </li>\n                                </ul>', '</a></span>\n                                        </div>\n                                    </li>\n' + openingHoursHTML + '                                </ul>');

fs.writeFileSync('src/app/kontakt/page.tsx', content, 'utf8');
console.log('Added pipes and opening hours');
