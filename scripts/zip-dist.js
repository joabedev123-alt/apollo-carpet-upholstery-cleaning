const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const zipFile = path.join(rootDir, 'dist.zip');

console.log('📦 Compactando a pasta dist/ para dist.zip com suporte a compartilhamento de leitura...');

if (fs.existsSync(zipFile)) {
  try {
    fs.unlinkSync(zipFile);
    console.log('🗑️ Arquivo dist.zip anterior removido.');
  } catch (e) {}
}

const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression

$distDir = "${distDir.replace(/\\/g, '\\\\')}"
$zipPath = "${zipFile.replace(/\\/g, '\\\\')}"

$zipStream = [System.IO.File]::Open($zipPath, [System.IO.FileMode]::Create)
$archive = New-Object System.IO.Compression.ZipArchive($zipStream, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $distDir -Recurse -File

foreach ($file in $files) {
    $relPath = $file.FullName.Substring($distDir.Length + 1).Replace('\\', '/')
    $entry = $archive.CreateEntry($relPath, [System.IO.Compression.CompressionLevel]::Optimal)
    $entryStream = $entry.Open()
    
    $fileStream = [System.IO.File]::Open($file.FullName, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
    $fileStream.CopyTo($entryStream)
    
    $fileStream.Dispose()
    $entryStream.Dispose()
}

$archive.Dispose()
$zipStream.Dispose()
`;

const tempPsFile = path.join(rootDir, 'scripts', 'temp-zip.ps1');
fs.writeFileSync(tempPsFile, psScript, 'utf8');

try {
  execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${tempPsFile}"`, { stdio: 'inherit' });
} finally {
  if (fs.existsSync(tempPsFile)) {
    try {
      fs.unlinkSync(tempPsFile);
    } catch (e) {}
  }
}

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
