const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const packageJsonRaw = fs
  .readFileSync(path.join(rootDir, 'package.json'), 'utf8')
  .replace(/^\uFEFF/, '');
const packageJson = JSON.parse(packageJsonRaw);

const slug = packageJson.name;
const version = packageJson.version || '0.0.0';

function loadDotEnv() {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    if (!key) {
      continue;
    }

    const value = trimmed
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^"(.*)"$/, '$1')
      .replace(/^'(.*)'$/, '$1');

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

const localPluginDir = process.env.LOCAL_WP_PLUGIN_DIR;

const releaseDir = path.join(rootDir, 'release');
const stageRoot = path.join(releaseDir, slug);
const zipFile = path.join(releaseDir, `${slug}-${version}.zip`);

const SKIP_BUILD = process.argv.includes('--skip-build');
const CLEAN_ONLY = process.argv.includes('--clean-only');

function readJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  return JSON.parse(raw);
}

function fail(message) {
  console.error(`\n[release] Hata: ${message}`);
  process.exit(1);
}

function runCommand(command, args, options = {}) {
  const executable =
    process.platform === 'win32' && command === 'npm'
      ? 'npm.cmd'
      : process.platform === 'win32' && command === 'tar'
        ? 'tar.exe'
        : command;

  const result = spawnSync(executable, args, {
    stdio: 'inherit',
    shell: false,
    ...options
  });

  if (result.status !== 0) {
    fail(`Komut başarısız: ${executable} ${args.join(' ')}`);
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function cleanDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
}

function copyFileRelative(relativePath) {
  const source = path.join(rootDir, relativePath);
  if (!fs.existsSync(source)) {
    return;
  }

  const target = path.join(stageRoot, relativePath);
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

function copyDirRecursive(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    return;
  }

  ensureDir(targetDir);
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(sourcePath, targetPath);
      continue;
    }

    ensureDir(path.dirname(targetPath));
    fs.copyFileSync(sourcePath, targetPath);
  }
}

function cleanBlockBuildDirs() {
  const blocksDir = path.join(rootDir, 'includes', 'blocks');
  if (!fs.existsSync(blocksDir)) {
    return;
  }

  const blockFolders = fs
    .readdirSync(blocksDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  for (const blockName of blockFolders) {
    const buildDir = path.join(blocksDir, blockName, 'build');
    if (fs.existsSync(buildDir)) {
      cleanDir(buildDir);
    }
  }
}

function copyIncludesNonBlocks() {
  const includesDir = path.join(rootDir, 'includes');
  if (!fs.existsSync(includesDir)) {
    return;
  }

  const entries = fs.readdirSync(includesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'blocks') {
      continue;
    }

    const sourcePath = path.join(includesDir, entry.name);
    const targetPath = path.join(stageRoot, 'includes', entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(sourcePath, targetPath);
    } else {
      ensureDir(path.dirname(targetPath));
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function collectFileRefsFromBlockJson(value, collector) {
  if (typeof value === 'string' && value.startsWith('file:')) {
    collector.add(value.replace(/^file:\.?\//, ''));
    return;
  }

  if (Array.isArray(value)) {
    value.forEach(item => collectFileRefsFromBlockJson(item, collector));
    return;
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach(item => collectFileRefsFromBlockJson(item, collector));
  }
}

function includeCompanionBuildFiles(relativePath, collector) {
  if (!relativePath.endsWith('.js')) {
    return;
  }

  const assetPath = relativePath.replace(/\.js$/, '.asset.php');
  const mapPath = relativePath.replace(/\.js$/, '.js.map');

  collector.add(assetPath);
  collector.add(mapPath);
}

function copyBlockDistributionFiles() {
  const blocksDir = path.join(rootDir, 'includes', 'blocks');
  if (!fs.existsSync(blocksDir)) {
    return;
  }

  const blockFolders = fs
    .readdirSync(blocksDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);

  for (const blockName of blockFolders) {
    const blockRoot = path.join(blocksDir, blockName);
    const blockJsonPath = path.join(blockRoot, 'block.json');

    if (!fs.existsSync(blockJsonPath)) {
      continue;
    }

    const blockConfig = readJsonFile(blockJsonPath);
    const filesToCopy = new Set([
      'block.json',
      'style.css',
      'script.js',
      'render.php',
      `class-${blockName}-block.php`
    ]);

    collectFileRefsFromBlockJson(blockConfig, filesToCopy);
    Array.from(filesToCopy).forEach(filePath => includeCompanionBuildFiles(filePath, filesToCopy));

    for (const relativePath of filesToCopy) {
      const normalized = relativePath.replace(/^\//, '');
      const sourcePath = path.join(blockRoot, normalized);

      if (!fs.existsSync(sourcePath)) {
        continue;
      }

      const targetPath = path.join(stageRoot, 'includes', 'blocks', blockName, normalized);

      if (fs.statSync(sourcePath).isDirectory()) {
        copyDirRecursive(sourcePath, targetPath);
      } else {
        ensureDir(path.dirname(targetPath));
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  }
}

function createZipArchive() {
  if (fs.existsSync(zipFile)) {
    fs.rmSync(zipFile, { force: true });
  }

  runCommand('tar', ['-a', '-c', '-f', zipFile, '-C', releaseDir, slug], {
    cwd: rootDir
  });
}

function deployToLocalWordPress() {
  if (!localPluginDir) {
    fail(
      'LOCAL_WP_PLUGIN_DIR tanımlı değil. Proje köküne `.env` dosyası ekleyip bu değişkeni ayarlayın.'
    );
  }

  const normalizedTarget = path.normalize(localPluginDir).toLowerCase();
  if (!normalizedTarget.endsWith(path.sep + slug)) {
    fail(
      `LOCAL_WP_PLUGIN_DIR güvenlik kontrolünü geçemedi. Yol ${slug} ile bitmeli: ${localPluginDir}`
    );
  }

  cleanDir(localPluginDir);
  copyDirRecursive(stageRoot, localPluginDir);
}

function prepareStageFiles() {
  cleanDir(stageRoot);
  ensureDir(stageRoot);

  ['ert-content-tools.php', 'readme.txt', 'uninstall.php'].forEach(copyFileRelative);
  copyDirRecursive(path.join(rootDir, 'assets'), path.join(stageRoot, 'assets'));
  copyDirRecursive(path.join(rootDir, 'languages'), path.join(stageRoot, 'languages'));
  copyIncludesNonBlocks();
  copyBlockDistributionFiles();
}

function ensureBuildPrerequisites() {
  const wpScriptsBin = path.join(
    rootDir,
    'node_modules',
    '@wordpress',
    'scripts',
    'bin',
    'wp-scripts.js'
  );

  if (!fs.existsSync(wpScriptsBin)) {
    fail(
      '@wordpress/scripts bulunamadı. Build adımı atlanmadı; bağımlılık eksik olduğu için durduruldu. Önce `npm install` çalıştırın.'
    );
  }

  return wpScriptsBin;
}

function run() {
  console.log('\n[release] Build + package + local deploy başlatılıyor...');

  if (CLEAN_ONLY) {
    cleanBlockBuildDirs();
    console.log('[release] Blok build klasörleri temizlendi.');
    return;
  }

  if (!SKIP_BUILD) {
    const wpScriptsBin = ensureBuildPrerequisites();
    cleanBlockBuildDirs();
    runCommand(process.execPath, [wpScriptsBin, 'build'], { cwd: rootDir });
  }

  ensureDir(releaseDir);
  prepareStageFiles();
  createZipArchive();
  deployToLocalWordPress();

  console.log(`[release] ZIP oluşturuldu: ${zipFile}`);
  console.log(`[release] Local plugin güncellendi: ${localPluginDir}`);
  console.log('[release] Tamamlandı.');
}

run();