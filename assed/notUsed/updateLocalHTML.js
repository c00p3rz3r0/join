const fs = require('fs');

const templateContent = fs.readFileSync('html-template.html', 'utf8');
const templateHead = /<head>([\s\S]*)<\/head>/i.exec(templateContent)[0];

const filesToUpdate = ['Contact.html', 'Addtask.html', 'Board.html', 'index.html'];

filesToUpdate.forEach(file => {
    let fileContent = fs.readFileSync(file, 'utf8');
    fileContent = fileContent.replace(/<head>([\s\S]*)<\/head>/i, templateHead);
    fs.writeFileSync(file, fileContent);
    console.log(`Updated ${file}`);
});
