const fs = require("fs");

function convertToJSX(html) {
  // Convert class to className
  let jsx = html.replace(/class=/g, "className=");
  
  // Convert for to htmlFor
  jsx = jsx.replace(/for=/g, "htmlFor=");

  // Convert inline styles from string to object (naive approach for known styles)
  jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
    const styles = p1.split(";").filter(s => s.trim()).map(s => {
      const [key, val] = s.split(":");
      if (!key || !val) return "";
      const camelKey = key.trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
      return `${camelKey}: "${val.trim().replace(/"/g, "'")}"`;
    }).filter(s => s).join(", ");
    return `style={{ ${styles} }}`;
  });

  // Self-close tags
  jsx = jsx.replace(/<img([^>]*[^/])>/g, "<img$1 />");
  jsx = jsx.replace(/<input([^>]*[^/])>/g, "<input$1 />");
  jsx = jsx.replace(/<br([^>]*[^/])>/g, "<br$1 />");
  jsx = jsx.replace(/<hr([^>]*[^/])>/g, "<hr$1 />");

  // Fix SVG attributes
  jsx = jsx.replace(/stroke-width=/g, "strokeWidth=");
  jsx = jsx.replace(/stroke-linecap=/g, "strokeLinecap=");
  jsx = jsx.replace(/stroke-linejoin=/g, "strokeLinejoin=");
  jsx = jsx.replace(/fill-rule=/g, "fillRule=");
  jsx = jsx.replace(/clip-rule=/g, "clipRule=");
  jsx = jsx.replace(/stroke-dasharray=/g, "strokeDasharray=");
  jsx = jsx.replace(/stroke-dashoffset=/g, "strokeDashoffset=");

  // Fix HTML comments
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");
  
  // Fix tabindex to tabIndex
  jsx = jsx.replace(/tabindex=/g, "tabIndex=");

  return jsx;
}

function processFile(inputFile, outputFile, componentName, isIndex) {
  const content = fs.readFileSync(inputFile, "utf8");
  
  // Extract between </header> and <footer
  const headerEnd = content.indexOf("</header>");
  const footerStart = content.indexOf("<footer");
  
  let innerHtml = "";
  if (headerEnd !== -1 && footerStart !== -1) {
    innerHtml = content.substring(headerEnd + "</header>".length, footerStart);
  } else {
    // Fallback: extract between <body> and </body>
    const bodyStart = content.indexOf("<body");
    const bodyEnd = content.indexOf("</body>");
    if (bodyStart !== -1 && bodyEnd !== -1) {
      const bodyInnerStart = content.indexOf(">", bodyStart) + 1;
      innerHtml = content.substring(bodyInnerStart, bodyEnd);
    } else {
      innerHtml = content;
    }
  }

  // Remove the old campaign popup from innerHtml to replace with the dynamic one
  if (isIndex) {
    innerHtml = innerHtml.replace(/<div className="campaign-popup-overlay" id="campaign-popup">[\s\S]*?\{\/\* \/Campaign Popup \*\/\}/g, "");
    innerHtml = innerHtml.replace(/<div className="campaign-popup-overlay" id="campaign-popup">[\s\S]*?<script>/g, "<script>");
  }

  let jsxContent = convertToJSX(innerHtml);

  // Remove scripts from JSX since we use Next.js Script or effects
  jsxContent = jsxContent.replace(/<script[\s\S]*?<\/script>/g, "");

  const template = `import React from "react";
import FrontendLayout from "@/components/FrontendLayout";
${isIndex ? `import CampaignPopupClient from "@/components/public/CampaignPopupClient";\nimport { getActiveCampaign } from "@/lib/data";` : ""}

export default async function ${componentName}() {
  ${isIndex ? "const campaign = await getActiveCampaign();" : ""}
  return (
    <FrontendLayout>
      ${jsxContent}
      ${isIndex ? "<CampaignPopupClient campaign={campaign} />" : ""}
    </FrontendLayout>
  );
}
`;

  fs.writeFileSync(outputFile, template);
  console.log(`Converted ${inputFile} to ${outputFile}`);
}

processFile("D:/Antigravity/Nordx Relining/Nordxrelining/public/index.html", "D:/Antigravity/Nordx Relining/Nordxrelining/src/app/page.tsx", "HomePage", true);
processFile("D:/Antigravity/Nordx Relining/Nordxrelining/public/faq.html", "D:/Antigravity/Nordx Relining/Nordxrelining/src/app/faq/page.tsx", "FAQPage", false);
processFile("D:/Antigravity/Nordx Relining/Nordxrelining/public/priser.html", "D:/Antigravity/Nordx Relining/Nordxrelining/src/app/priser/page.tsx", "PriserPage", false);
