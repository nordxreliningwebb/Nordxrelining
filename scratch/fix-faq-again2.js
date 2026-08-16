const fs = require('fs');

let editorPath = 'src/components/admin/FAQEditor.tsx';
let editorCode = fs.readFileSync(editorPath, 'utf8');
editorCode = editorCode.replace(/VA lj kategori\.\.\./g, 'Välj kategori...');
editorCode = editorCode.replace(/RA rinspektion/g, 'Rörinspektion');
fs.writeFileSync(editorPath, editorCode);

let actionsPath = 'src/app/admin/(authenticated)/faq/actions.ts';
let actionsCode = fs.readFileSync(actionsPath, 'utf8');
if (!actionsCode.includes('revalidatePath("/faq")')) {
  actionsCode = actionsCode.replace('revalidatePath("/admin/faq");', 'revalidatePath("/admin/faq");\n    revalidatePath("/faq");');
}
fs.writeFileSync(actionsPath, actionsCode);

let listPath = 'src/components/public/FAQListClient.tsx';
let listCode = fs.readFileSync(listPath, 'utf8');
listCode = listCode.replace(/RA-RINSPEKTION/g, 'RÖRINSPEKTION');
listCode = listCode.replace(/Inga frAgor i denna kategori A nnu./g, 'Inga frågor i denna kategori ännu.');
fs.writeFileSync(listPath, listCode);

console.log('Fixed encoding and revalidation');
