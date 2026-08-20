const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf8');

const oldCss = \/* --- Animated Intro Waves --- */
.intro-waves-container {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 120px;
    overflow: hidden;
    line-height: 0;
    z-index: 10;
}
.intro-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
    pointer-events: none;
}
.intro-wave-1 {
    fill: #ffffff;
    opacity: 0.25;
    animation: wave-sway 14s linear infinite;
    bottom: 10px;
}
.intro-wave-2 {
    fill: #ffffff;
    opacity: 0.5;
    animation: wave-sway 10s linear infinite;
    bottom: 5px;
}
.intro-wave-3 {
    fill: #ffffff;
    opacity: 1;
    animation: wave-sway 7s linear infinite;
}
@media (max-width: 768px) {
    .intro-waves-container {
        height: 60px;
    }
    .intro-wave-1 { bottom: 5px; }
    .intro-wave-2 { bottom: 2px; }
}\;

const newCss = \/* --- Animated Intro Waves --- */
.intro-waves-container {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 220px;
    overflow: hidden;
    line-height: 0;
    z-index: 10;
    transform: rotate(180deg);
}
.intro-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 160px;
    pointer-events: none;
}
.intro-wave-1 {
    fill: #0284c7;
    opacity: 0.25;
    animation: wave-sway 14s linear infinite;
    bottom: 40px;
}
.intro-wave-2 {
    fill: #0284c7;
    opacity: 0.5;
    animation: wave-sway 10s linear infinite;
    bottom: 20px;
}
.intro-wave-3 {
    fill: #0284c7;
    opacity: 1;
    animation: wave-sway 7s linear infinite;
    bottom: 0px;
}
@media (max-width: 768px) {
    .intro-waves-container {
        height: 120px;
    }
    .intro-wave {
        height: 90px;
    }
    .intro-wave-1 { bottom: 20px; }
    .intro-wave-2 { bottom: 10px; }
}\;

css = css.replace(oldCss, newCss);
fs.writeFileSync('public/style.css', css, 'utf8');
console.log('CSS Fixed');

