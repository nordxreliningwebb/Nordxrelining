const fs = require('fs');

['public/projekt.html', 'public/kunskapsbanken.html'].forEach(file => {
    if (fs.existsSync(file)) {
        let html = fs.readFileSync(file, 'utf8');
        
        const oldGap = 'gap: 2rem !important;';
        const newGap = 'gap: 4.5rem !important;'; // Increased gap for mobile to push the pipe frame down
        
        if (html.includes(oldGap)) {
            html = html.replace(new RegExp(oldGap, 'g'), newGap);
            fs.writeFileSync(file, html, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
