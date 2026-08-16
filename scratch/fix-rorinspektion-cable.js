const fs = require('fs');
let file = fs.readFileSync('src/app/rorinspektion/page.tsx', 'utf8');

const regex = /\{\/\* Rörålen är borttagen eftersom den dras rak och skär genom röret \*\/\}/;
const fix = `        {/* Rörålen (kabeln) som följer efter kameran */}
        <g id="camera-cable-group">
            <path id="camera-cable-path" d="" fill="none" className="camera-cable"></path>
            {/* Gul varningsrand längs kabeln */}
            <path id="camera-cable-stripe" d="" fill="none" className="cable-stripe"></path>
        </g>`;

if(regex.test(file)) {
    file = file.replace(regex, fix);
    fs.writeFileSync('src/app/rorinspektion/page.tsx', file);
    console.log('Restored orange cable group');
} else {
    console.log('Regex not found');
}
