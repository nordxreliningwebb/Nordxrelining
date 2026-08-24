const fs = require('fs');

const reorderAside = (content, middleStr, bottomStr) => {
    // We want to reorder the aside blocks.
    // The current order is typically: Fakta, Projektledare (or Författare), Innehåll
    // We want: Fakta, Innehåll, Projektledare (or Författare)
    
    // First, let's fix the lg:hidden bug
    content = content.replace(
        /className="lg:hidden flex flex-col gap-6 mb-8 w-full"/g,
        'className="flex flex-col gap-6 mb-8 w-full lg:!hidden"'
    );

    const asideRegex = /<aside className="lg:col-span-1 w-full pt-6 md:pt-10 anim-stagger-parent">([\s\S]*?)<\/aside>/;
    const match = content.match(asideRegex);
    if (!match) return content;
    
    let asideContent = match[1];
    
    // Extract the three blocks from aside
    // Block 1: Fakta
    const block1Match = asideContent.match(/\{\/\* (PROJEKTFAKTA|FAKTA) \*\/\}[\s\S]*?(?=\{\/\* (PROJEKTLEDARE|FA.RFATTARE|INNEHA.LL) \*\/\})/);
    // Block 2: Innehåll
    const block2Match = asideContent.match(/\{\/\* INNEHA.LL \*\/\}[\s\S]*?\}\)[\s\S]*?\}[\s\S]*?<\/div>[\s\S]*?\)\}/); 
    // Wait, regex might fail to capture closing tags. Let's do something simpler.
    
    // It's safer to just split by the comments!
    // The comments are: {/* PROJEKTFAKTA */}, {/* PROJEKTLEDARE */} or {/* FÄRFATTARE */}, {/* INNEHÅLL */}
    
    let split1 = asideContent.split('{/* PROJEKTFAKTA */}');
    if (split1.length < 2) split1 = asideContent.split('{/* FAKTA */}');
    
    if (split1.length >= 2) {
        let beforeFakta = split1[0];
        let rest1 = split1[1];
        
        let split2 = rest1.split(/\{\/\* (PROJEKTLEDARE|FÄRFATTARE|FA.RFATTARE) \*\/\}/);
        if (split2.length >= 3) {
            let faktaStr = split2[0];
            let authorHeader = split2[1]; // The captured group
            let rest2 = split2[2];
            
            let split3 = rest2.split(/\{\/\* INNEHÅLL \*\/|\{\/\* INNEHA\.LL \*\/\}/);
            if (split3.length >= 2) {
                let authorStr = split3[0];
                let innehallStr = split3[1];
                
                // Reassemble!
                let newAsideContent = beforeFakta + 
                    '{/* PROJEKTFAKTA */}' + faktaStr + 
                    '{/* INNEHÅLL */}' + innehallStr + 
                    '{/* ' + authorHeader + ' */}' + authorStr;
                
                content = content.replace(match[1], newAsideContent);
            }
        }
    }
    
    return content;
};

let pFile = 'src/app/projekt/[slug]/page.tsx';
if (fs.existsSync(pFile)) {
    let content = fs.readFileSync(pFile, 'utf8');
    content = reorderAside(content);
    fs.writeFileSync(pFile, content);
    console.log("Updated projekt");
}

let kFile = 'src/app/kunskapsbanken/[slug]/page.tsx';
if (fs.existsSync(kFile)) {
    let content = fs.readFileSync(kFile, 'utf8');
    content = reorderAside(content);
    fs.writeFileSync(kFile, content);
    console.log("Updated kunskapsbanken");
}
