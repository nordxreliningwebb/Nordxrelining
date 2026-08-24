const fs = require('fs');

const fixSyntax = (file) => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Fix for preview syntax
    content = content.replace(
        /\{\(\{props\.subheading \|\| '([^']+)'\}\)\.split/g,
        "{(props.subheading || '$1').split"
    );

    // Also check for the frontend pages which might have `{({excerpt}).split`
    content = content.replace(
        /\{\(\{excerpt\}\)\.split/g,
        "{(excerpt || '').split"
    );

    // Actually, in the frontend we hardcoded `{(excerpt || '').split(/\n+/)...`
    // Wait, let's look at the frontend diff too.
    fs.writeFileSync(file, content);
};

fixSyntax('src/components/admin/ProjectLivePreview.tsx');
fixSyntax('src/components/admin/KnowledgeLivePreview.tsx');
fixSyntax('src/app/projekt/[slug]/page.tsx');
fixSyntax('src/app/kunskapsbanken/[slug]/page.tsx');
