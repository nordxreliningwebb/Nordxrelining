const fs = require('fs');

['public/projekt.html', 'public/kunskapsbanken.html'].forEach(file => {
    if (fs.existsSync(file)) {
        let html = fs.readFileSync(file, 'utf8');
        
        const oldPadding = 'padding: 120px 0 60px 0 !important;';
        const newPadding = 'padding: 4.5rem 0 60px 0 !important;'; 
        
        if (html.includes(oldPadding)) {
            html = html.replace(new RegExp(oldPadding, 'g'), newPadding);
            fs.writeFileSync(file, html, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
});
