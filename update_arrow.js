const fs = require('fs');

function updateArrow() {
    let file = 'src/components/FrontendLayout.tsx';
    let c = fs.readFileSync(file, 'utf8');

    // We want to replace:
    // <a href="#" className={`mobile-menu-link ${isMobileSubmenuOpen ? 'active' : ''}`} id="mobile-submenu-toggle" onClick={(e) => { e.preventDefault(); setIsMobileSubmenuOpen(!isMobileSubmenuOpen); }}>
    //     Tjänster <span className="arrow">...</span>
    // </a>

    // Because 'Tjänster' might have encoding issues, let's use a more flexible regex:
    const regex = /<a href="#" className=\{`mobile-menu-link \$\{isMobileSubmenuOpen \? 'active' : ''\}`\} id="mobile-submenu-toggle" onClick=\{\(e\) => \{ e\.preventDefault\(\); setIsMobileSubmenuOpen\(!isMobileSubmenuOpen\); \}\}>\s*Tj.*?nster\s*<span className="arrow">.*?<\/span>\s*<\/a>/s;

    const newStr = `<a href="#" className={\`mobile-menu-link \${isMobileSubmenuOpen ? 'active' : ''}\`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} id="mobile-submenu-toggle" onClick={(e) => { e.preventDefault(); setIsMobileSubmenuOpen(!isMobileSubmenuOpen); }}>
                        Tjänster 
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease', transform: isMobileSubmenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </a>`;

    c = c.replace(regex, newStr);

    fs.writeFileSync(file, c);
    console.log("Updated FrontendLayout.tsx");
}

updateArrow();
