const fs = require('fs');

// Fix Kontakt
let kontaktContent = fs.readFileSync('src/app/kontakt/page.tsx', 'utf8');
const kontaktStyle = `
    <style dangerouslySetInnerHTML={{ __html: \`
        @media (max-width: 900px) {
            .contact-hero-section {
                padding-top: 94px !important;
            }
        }
    \`}} />
`;
kontaktContent = kontaktContent.replace(
  /<section className="contact-hero-section" style={{ paddingTop: "160px", backgroundColor: "#faf8f5" }}>/,
  `<section className="contact-hero-section" style={{ paddingTop: "160px", backgroundColor: "#faf8f5" }}>${kontaktStyle}`
);
fs.writeFileSync('src/app/kontakt/page.tsx', kontaktContent);

// Fix Priser
let priserContent = fs.readFileSync('src/app/priser/page.tsx', 'utf8');
const priserStyle = `
    <style dangerouslySetInnerHTML={{ __html: \`
        @media (max-width: 900px) {
            .pricing-section {
                padding-top: 94px !important;
            }
        }
    \`}} />
`;
priserContent = priserContent.replace(
  /<section className="pricing-section section-padding w-full" aria-label="Prispaket Privat" style={{ background: "#faf8f5", paddingTop: "8rem" }}>/,
  `<section className="pricing-section section-padding w-full" aria-label="Prispaket Privat" style={{ background: "#faf8f5", paddingTop: "8rem" }}>${priserStyle}`
);
fs.writeFileSync('src/app/priser/page.tsx', priserContent);

