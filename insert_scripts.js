const fs = require('fs');
let f = 'src/app/layout.tsx';
let c = fs.readFileSync(f, 'utf8');

const headTag = '<head>';
const headReplacement = `<head>
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="beforeInteractive" />
        <Script id="google-translate-init" strategy="beforeInteractive">
          {\`window.googleTranslateElementInit = function() { new window.google.translate.TranslateElement({pageLanguage: 'sv', autoDisplay: false}, 'google_translate_element'); };\`}
        </Script>`;

c = c.replace(headTag, headReplacement);

// We should replace `<body ...>` but since it has classes, let's just find `<body`
c = c.replace(/<body([^>]*)>/, '<body$1>\n        <div id="google_translate_element" style={{ display: "none" }}></div>');

fs.writeFileSync(f, c);
