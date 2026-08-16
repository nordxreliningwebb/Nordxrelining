
const fs = require("fs");
let content = fs.readFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", "utf8");

content = content.replace(/<style>([\s\S]*?)<\/style>/g, (match, inner) => {
  // escape backticks and ${}
  const escaped = inner.replace(/`/g, "\\`").replace(/\$/g, "\\$");
  return `<style dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />`;
});

fs.writeFileSync("D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", content);

