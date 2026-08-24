const fs = require('fs');

const swapBlocks = (file, middleMarker, bottomMarker) => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    content = content.replace(
        /className="lg:hidden flex flex-col gap-6 mb-8 w-full"/g,
        'className="flex flex-col gap-6 mb-8 w-full lg:!hidden"'
    );
    
    const regexStr = `(\\{/\\* ${middleMarker} \\*/\\}[\\s\\S]*?)(?=\\{/\\* ${bottomMarker} \\*/\\})`;
    const middleRegex = new RegExp(regexStr);
    const middleMatch = content.match(middleRegex);
    
    if (middleMatch) {
        const middleContent = middleMatch[1];
        content = content.replace(middleContent, '');
        
        content = content.replace(
            /(\s*<\/div>\s*<\/aside>)/,
            `\n${middleContent}$1`
        );
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Failed to match in ${file}`);
    }
};

swapBlocks('src/app/projekt/[slug]/page.tsx', 'PROJEKTLEDARE', 'INNEHÅLL');
swapBlocks('src/app/kunskapsbanken/[slug]/page.tsx', 'FÖRFATTARE', 'INNEHÅLL');
