import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// 1. Copy dist/index.html to ./index.html
fs.copyFileSync(path.join(root, 'dist', 'index.html'), path.join(root, 'index.html'));

// 2. Copy dist/assets to ./assets
fs.cpSync(path.join(root, 'dist', 'assets'), path.join(root, 'assets'), { recursive: true });

// 3. Copy dist to ./docs
fs.cpSync(path.join(root, 'dist'), path.join(root, 'docs'), { recursive: true });

console.log('Successfully synced dist to root and docs for GitHub Pages!');
