
const fs = require("fs");
let content = fs.readFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", "utf8");
content = content.replace(/autoplay=""/g, "autoPlay");
content = content.replace(/loop=""/g, "loop");
content = content.replace(/muted=""/g, "muted");
content = content.replace(/playsinline=""/g, "playsInline");
content = content.replace(/for=/g, "htmlFor=");
content = content.replace(/class=/g, "className=");
fs.writeFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", content);

