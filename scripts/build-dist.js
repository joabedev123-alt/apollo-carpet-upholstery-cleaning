const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

console.log('🚀 Iniciando processo de Build e geração da pasta dist/ ...');

// 1. Limpar e preparar diretório dist
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
    } catch (e) {
      // Ignora pequenos locks transitórios no Windows
    }
  }
}

cleanDir(distDir);

// Função recursiva de cópia (ignora arquivos .zip)
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

// 2. Copiar index.html
const indexHtmlSrc = path.join(rootDir, 'index.html');
const indexHtmlDest = path.join(distDir, 'index.html');
if (fs.existsSync(indexHtmlSrc)) {
  console.log('📄 Copiando index.html...');
  fs.copyFileSync(indexHtmlSrc, indexHtmlDest);
}

// 3. Copiar diretórios estáticos
const dirsToCopy = ['css', 'js', 'assets', 'public'];
dirsToCopy.forEach(dirName => {
  const src = path.join(rootDir, dirName);
  const dest = path.join(distDir, dirName);
  if (fs.existsSync(src)) {
    console.log(`📁 Copiando pasta ${dirName}/ para dist/${dirName}/...`);
    copyDirRecursive(src, dest);
  }
});

// 4. Copiar flags para a raiz de dist/flags também (para compatibilidade total)
const flagsSrc = path.join(rootDir, 'public', 'flags');
const flagsDest = path.join(distDir, 'flags');
if (fs.existsSync(flagsSrc)) {
  console.log('🚩 Sincronizando flags para dist/flags/...');
  copyDirRecursive(flagsSrc, flagsDest);
}

// 5. Copiar video_01.mp4 para raiz de dist se existir
const videoSrc = path.join(rootDir, 'assets', 'video_01.mp4');
const videoDest = path.join(distDir, 'video_01.mp4');
if (fs.existsSync(videoSrc)) {
  console.log('🎥 Sincronizando video_01.mp4 para dist/video_01.mp4...');
  fs.copyFileSync(videoSrc, videoDest);
}

// 6. Contagem de arquivos no dist/
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
console.log(`\n✅ Build de produção concluída com sucesso!`);
console.log(`📦 Diretório dist/ gerado contendo ${totalFiles} arquivos prontos para deploy e produção.\n`);
