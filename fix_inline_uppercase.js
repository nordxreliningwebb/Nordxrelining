const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('public').filter(f => f.endsWith('.html'));

for (let f of files) {
    const filePath = path.join('public', f);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Replace text-transform: uppercase in <style> blocks
    html = html.replace(/<style>([\s\S]*?)<\/style>/gi, (match, css) => {
        const blocks = css.split('}');
        let cssChanged = false;
        for (let i = 0; i < blocks.length; i++) {
            let b = blocks[i];
            if (b.toLowerCase().includes('uppercase') && (b.includes('.btn') || b.includes('button') || b.includes('.cta') || b.includes('cta-btn'))) {
                // Ensure it's not a section title or something else
                if (!b.includes('.section-title') && !b.includes('subtitle') && !b.includes('.nav') && !b.includes('label')) {
                    blocks[i] = b.replace(/text-transform:\s*uppercase\s*!?;?/g, '/* removed uppercase */');
                    cssChanged = true;
                }
            }
        }
        if (cssChanged) {
            changed = true;
            return '<style>' + blocks.join('}') + '</style>';
        }
        return match;
    });

    if (changed) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log('Fixed inline CSS in: ' + f);
    }
}
