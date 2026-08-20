const fs = require('fs');
const newCSS = `

/* Team Member Card Animation */
.team-member-card {
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.team-member-card:hover {
    transform: translateY(-12px);
}
`;
let css = fs.readFileSync('public/style.css', 'utf8');
if (!css.includes('.team-member-card:hover')) {
    fs.appendFileSync('public/style.css', newCSS);
    console.log('Added team member card animation');
} else {
    console.log('Already exists');
}
