const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "app", "pages");

function limparPastas(dir) {
  const itens = fs.readdirSync(dir);

  itens.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      limparPastas(fullPath);
    } else {
      // Se o arquivo NÃO contém ".component" ele será deletado
      if (!item.includes(".component")) {
        console.log("🗑 Apagando:", fullPath);
        fs.unlinkSync(fullPath);
      }
    }
  });
}

console.log("🚀 Limpando arquivos duplicados...");
limparPastas(baseDir);
console.log("✔ Limpeza finalizada!");
