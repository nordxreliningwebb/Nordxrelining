const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

const marker = '/* Visual alignment tweak for badge */\n.cta-box-header { margin-top: 6px !important; }';
const idx = css.indexOf(marker);

if (idx !== -1) {
    css = css.substring(0, idx + marker.length) + '\n\n' +
`@keyframes star-pop {
    0% { transform: scale(0); opacity: 0; }
    40% { transform: scale(1.6); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}
.anim-star-pop {
    transform-origin: center;
    transform-box: fill-box;
    opacity: 0;
    transform: scale(0);
}
.anim-star-pop.anim-active {
    animation: star-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
`;
    fs.writeFileSync('public/style.css', css, 'utf8');
    console.log('Fixed syntax error');
} else {
    console.log('Marker not found');
}
