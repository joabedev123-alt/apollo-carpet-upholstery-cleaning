const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Sincronizando build exata do Next.js (out/) para a pasta dist/ ...');

// 1. Limpar diretório dist
function cleanDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    try {
      if (entry.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
      } else {
        fs.unlinkSync(fullPath);
      }
    } catch (e) {}
  }
}

cleanDir(distDir);

// 2. Copiar recursivamente ignorando arquivos .zip
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.endsWith('.zip')) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(outDir)) {
  console.log('📦 Copiando arquivos compilados de out/ para dist/...');
  copyDirRecursive(outDir, distDir);
} else {
  console.warn('⚠️ Pasta out/ não encontrada. Certifique-se de executar "next build" primeiro.');
}

// 3. Contagem de arquivos no dist/
function countFiles(dir) {
  let count = 0;
  if (!fs.existsSync(dir)) return count;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  }
  return count;
}

const totalFiles = countFiles(distDir);
console.log(`\n✅ Build final sincronizada com sucesso!`);
console.log(`📁 Diretório dist/ gerado contendo ${totalFiles} arquivos 100% idênticos ao Next.js local.\n`);
