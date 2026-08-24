const fs = require('fs');

const oldHero = `<div id="dynamic-hero" className="rounded-3xl overflow-hidden relative flex flex-col justify-end shadow-lg hero-anim" style={{ background: \`linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 50%, rgba(15, 23, 42, 0.1) 100%), url('\${bgImage}')\`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '500px' }}>
                    <div className="relative z-10 w-full max-w-4xl flex flex-col gap-4" style={{ padding: "2.5rem 1.5rem", paddingBottom: "2rem" }}>
                        <h1 className="font-extrabold text-white tracking-tight leading-snug max-w-4xl" style={{ fontSize: "2.5rem", lineHeight: "1.2", marginBottom: "0.5rem" }}>{title}</h1>
                        <p className="text-gray-200 font-light max-w-3xl" style={{ fontSize: "1.125rem" }}>{excerpt}</p>
                    </div>
                </div>`;

const newHero = `<div id="dynamic-hero" className="rounded-3xl overflow-hidden relative flex flex-col justify-center items-center shadow-lg hero-anim" style={{ background: \`linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('\${bgImage}')\`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '500px' }}>
                    <div className="relative z-10 w-full max-w-4xl flex flex-col gap-4 text-center items-center" style={{ padding: "3rem 2rem" }}>
                        <h1 className="font-extrabold text-white tracking-tight leading-snug max-w-4xl mx-auto" style={{ fontSize: "3rem", lineHeight: "1.2", marginBottom: "0.5rem" }}>{title}</h1>
                        <p className="text-gray-100 font-light max-w-3xl mx-auto" style={{ fontSize: "1.25rem" }}>{excerpt}</p>
                    </div>
                </div>`;

const files = [
    'src/app/projekt/[slug]/page.tsx',
    'src/app/kunskapsbanken/[slug]/page.tsx'
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        if (content.includes(oldHero)) {
            content = content.replace(oldHero, newHero);
            fs.writeFileSync(file, content);
            console.log(`Updated ${file}`);
        } else {
            console.log(`Could not find oldHero in ${file}`);
        }
    }
}
