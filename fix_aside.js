const fs = require('fs');

const files = [
    'src/app/projekt/[slug]/page.tsx',
    'src/app/kunskapsbanken/[slug]/page.tsx'
];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Fix the duplicate mobile block bug by using lg:!hidden or by just forcing display none
    content = content.replace(
        /className="lg:hidden flex flex-col gap-6 mb-8 w-full"/g,
        'className="flex flex-col gap-6 mb-8 w-full lg:hidden" style={{ display: "none" }}'
    );
    // Wait, inline style display: none will hide it everywhere! We need it on mobile.
    // Let's replace the whole class string
    content = content.replace(
        /className="lg:hidden flex flex-col gap-6 mb-8 w-full"/g,
        'className="flex flex-col gap-6 mb-8 w-full lg:!hidden"'
    );
    
    // Now, reorder the Aside elements: Projektfakta, Innehåll, Projektledare (or Författare)
    // Actually, writing a regex to swap two large chunks of HTML is risky.
    // I will do it manually with string manipulation.
}
