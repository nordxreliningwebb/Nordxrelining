const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

const NEW_CSS = `
/* --- PREMIUM SCROLL ANIMATIONS --- */

.anim-transitioning,
.anim-mask-text.anim-transitioning .anim-mask-inner {
    transition-duration: 2.0s !important;
    transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1) !important;
    transition-property: opacity, transform !important;
    will-change: opacity, transform;
}

.anim-fade-up:not(.anim-active),
.anim-fade-left:not(.anim-active),
.anim-fade-right:not(.anim-active),
.anim-stagger-child:not(.anim-active),
.anim-stagger-item:not(.anim-active),
.anim-scale-down:not(.anim-active) {
    opacity: 0 !important;
    pointer-events: none;
}

.anim-fade-up:not(.anim-active),
.anim-stagger-child:not(.anim-active) {
    transform: translateY(20px) !important;
}

.anim-fade-left:not(.anim-active) {
    transform: translateX(-20px) !important;
}

.anim-fade-right:not(.anim-active) {
    transform: translateX(20px) !important;
}

.anim-scale-down-container {
    overflow: hidden !important;
}
.anim-scale-down:not(.anim-active) {
    transform: scale(1.05) !important;
}

.anim-mask-text {
    overflow: hidden;
    display: block;
    padding-bottom: 0.1em;
    margin-bottom: -0.1em;
}
.anim-mask-inner {
    display: inline-block;
}
.anim-mask-text:not(.anim-active) .anim-mask-inner {
    transform: translateY(100%) !important;
}
`;

const stylePath = path.join(PUBLIC_DIR, 'style.css');
if (fs.existsSync(stylePath)) {
    let css = fs.readFileSync(stylePath, 'utf8');
    const startIdx = css.indexOf('/* --- PREMIUM SCROLL ANIMATIONS --- */');
    if (startIdx !== -1) {
        css = css.substring(0, startIdx) + NEW_CSS;
        fs.writeFileSync(stylePath, css, 'utf8');
        console.log('Applied gentle slow fading easing and reduced travel distance to style.css');
    } else {
        console.log('Could not find marker in style.css');
    }
}
