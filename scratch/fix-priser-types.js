
const fs = require("fs");
let content = fs.readFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/priser/page.tsx", "utf8");
content = content.replace(/privatePlans\.map\(\(plan, idx\)/g, "privatePlans.map((plan: any, idx: number)");
content = content.replace(/businessPlans\.map\(\(plan, idx\)/g, "businessPlans.map((plan: any, idx: number)");
fs.writeFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/priser/page.tsx", content);

