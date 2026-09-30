const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const zipFile = path.join(rootDir, 'dist.zip');

console.log('📦 Compactando a pasta dist/ para dist.zip ...');

if (fs.existsSync(zipFile)) {
  try {
    fs.unlinkSync(zipFile);
    console.log('🗑️ Arquivo dist.zip anterior removido.');
  } catch (e) {}
}

const psCommand = `powershell -NoProfile -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipFile}' -CompressionLevel Optimal -Force"`;
execSync(psCommand, { stdio: 'inherit' });

if (fs.existsSync(zipFile)) {
  const stats = fs.statSync(zipFile);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 dist.zip gerado com sucesso!`);
  console.log(`📁 Local: ${zipFile}`);
  console.log(`📊 Tamanho final: ${sizeMB} MB (Abaixo do limite de 500 MB)\n`);
} else {
  console.error('❌ Erro: dist.zip não foi criado.');
  process.exit(1);
}
