import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dirsToConvert = [
  path.join(rootDir, 'public', 'assets'),
  path.join(rootDir, 'src', 'assets')
];

async function convertImages() {
  for (const dir of dirsToConvert) {
    if (!fs.existsSync(dir)) continue;
    
    const files = getAllFiles(dir);
    for (const file of files) {
      if (file.includes('favicon')) continue;
      
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const webpPath = file.substring(0, file.lastIndexOf('.')) + '.webp';
        
        console.log(`Converting: ${file}`);
        try {
          await sharp(file)
            .webp({ quality: 80 })
            .toFile(webpPath);
            
          // Delete original
          fs.unlinkSync(file);
          console.log(`Deleted original: ${file}`);
        } catch (e) {
          console.error(`Error converting ${file}:`, e);
        }
      }
    }
  }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function updateReferences() {
  const codeDirs = [
    path.join(rootDir, 'src'),
    path.join(rootDir, 'public', 'data'),
    path.join(rootDir, 'scripts')
  ];
  
  for (const dir of codeDirs) {
    if (!fs.existsSync(dir)) continue;
    
    const files = getAllFiles(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.js', '.jsx', '.json', '.mjs', '.css'].includes(ext)) {
        let content = fs.readFileSync(file, 'utf8');
        
        const originalContent = content;
        // Basic regex to replace image extensions, careful to not touch urls outside our control
        // We will replace .jpg, .jpeg, .png to .webp
        // Exclude favicons
        
        content = content.replace(/\/(assets\/[a-zA-Z0-9_./-]+)\.(jpg|jpeg|png)/g, (match, p1) => {
          if (p1.includes('favicon')) return match;
          return `/${p1}.webp`;
        });

        // Also handle relative imports like '../assets/logo.webp' -> '../assets/logo.webp'
        content = content.replace(/(\.\.\/assets\/[a-zA-Z0-9_./-]+)\.(jpg|jpeg|png)/g, (match, p1) => {
          if (p1.includes('favicon')) return match;
          return `${p1}.webp`;
        });
        
        content = content.replace(/(\.\.\/\.\.\/assets\/[a-zA-Z0-9_./-]+)\.(jpg|jpeg|png)/g, (match, p1) => {
          if (p1.includes('favicon')) return match;
          return `${p1}.webp`;
        });

        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          console.log(`Updated references in: ${file}`);
        }
      }
    }
  }
}

async function main() {
  console.log('Starting image conversion...');
  await convertImages();
  console.log('Starting reference updates...');
  await updateReferences();
  console.log('Done!');
}

main();
