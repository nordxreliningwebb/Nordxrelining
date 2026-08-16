
const fs = require("fs");
let content = fs.readFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", "utf8");
content = content.replace(/<br>/g, "<br />");
content = content.replace(/<hr>/g, "<hr />");
// Also check for unclosed img
content = content.replace(/<img([^>]+?)(?<!\/)>/g, "<img$1 />");
content = content.replace(/<input([^>]+?)(?<!\/)>/g, "<input$1 />");
fs.writeFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", content);

