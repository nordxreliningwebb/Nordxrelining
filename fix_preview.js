const fs = require('fs');
const files = [
  'src/components/admin/ProjectLivePreview.tsx',
  'src/components/admin/KnowledgeLivePreview.tsx'
];

const oldHero = `  const heroStyle = {
    background: props.coverImage 
      ? \`linear-gradient(rgba(27, 38, 59, 0.4), rgba(27, 38, 59, 0.4)), url('\${props.coverImage}')\`
      : '#0284c7', 
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };`;

const newHero = `  const heroStyle: React.CSSProperties = {
    backgroundImage: props.coverImage 
      ? \`linear-gradient(rgba(27, 38, 59, 0.4), rgba(27, 38, 59, 0.4)), url('\${props.coverImage}')\`
      : 'none', 
    backgroundColor: props.coverImage ? 'transparent' : '#0284c7',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };`;

for (let file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(oldHero)) {
      content = content.replace(oldHero, newHero);
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    } else {
      console.log(`Could not find oldHero in ${file}. Manual inspection needed.`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}
