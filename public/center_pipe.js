const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const targetCode = `
        const wrapper = container.querySelector('.layout-wrapper');
        const wrapperRect = wrapper.getBoundingClientRect();
        
        const startX = wrapperRect.left - cRect.left + 60; 
`;

const replaceCode = `
        const wrapper = container.querySelector('.layout-wrapper');
        const wrapperRect = wrapper.getBoundingClientRect();
        
        let startX = wrapperRect.left - cRect.left + 60;
        const heroCard = document.querySelector('.swoosh-hero .container > div > div:first-child');
        if (heroCard) {
            const heroRect = heroCard.getBoundingClientRect();
            startX = heroRect.left + (heroRect.width / 2) - cRect.left;
        }
`;

jsContent = jsContent.replace(targetCode, replaceCode);

// Wait, I should also ensure we don't turn left if the steps are on the right, but steps are on left, right?
// Wait! If startX is ~ 25% of the screen.
// turn2X = wrapperRect.right - cRect.left - 60; (This is ~95% of screen, far right edge)
// The pipe goes: startX, goes down to turn1Y, turns RIGHT to turn2X, goes down.
// Since startX is 25%, and turn2X is 95%, it turns to the right!
// That means it will successfully cross over the empty space in the middle to the right side!
// This is exactly what we want.

fs.writeFileSync(jsPath, jsContent);
console.log("Updated startX to center under the hero card.");
