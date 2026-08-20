const fs = require('fs');
let content = fs.readFileSync('src/components/public/BlockRenderer.tsx', 'utf8');

// Add break-words to h2, h3, and the main text div
content = content.replace(/className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-gray-900"/g, 'className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-gray-900 break-words"');
content = content.replace(/className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800"/g, 'className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-gray-800 break-words"');
content = content.replace(/className="text-lg text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap/g, 'className="text-lg text-gray-600 leading-relaxed mb-6 whitespace-pre-wrap break-words');

fs.writeFileSync('src/components/public/BlockRenderer.tsx', content, 'utf8');
console.log('Added break-words to BlockRenderer');
