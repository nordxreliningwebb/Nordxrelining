const fs = require('fs');
const lines = fs.readFileSync('C:/Users/Jesper/.gemini/antigravity/brain/86ac86da-23b6-4931-a274-b301816d1f3b/.system_generated/logs/transcript.jsonl', 'utf8').split('\n');
for(let line of lines) {
    if(!line) continue;
    const obj = JSON.parse(line);
    if(obj.step_index === 682) {
        const code = obj.tool_calls[0].args.CodeContent;
        // code looks like: const fs = require('fs');\n...const newSvg = `\n<style>...\n</svg>...`
        const match = code.match(/const newSvg = `([\s\S]*?)`;/);
        if(match) {
            fs.writeFileSync('extracted_svg.txt', match[1].trim());
            console.log('Saved extracted_svg.txt');
        }
        break;
    }
}
