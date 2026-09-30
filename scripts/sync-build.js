import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// Add cache-busting version query to dist/index.html so browsers & GitHub Pages CDN load new changes immediately
const distHtmlPath = path.join(root, 'dist', 'index.html');
const version = Date.now();
let html = fs.readFileSync(distHtmlPath, 'utf8');
html = html
  .replace('./assets/index.js', `./assets/index.js?v=${version}`)
  .replace('./assets/index.css', `./assets/index.css?v=${version}`);
fs.writeFileSync(distHtmlPath, html, 'utf8');

// 1. Copy dist/index.html to ./index.html
fs.copyFileSync(distHtmlPath, path.join(root, 'index.html'));

// 2. Copy dist/assets to ./assets
fs.cpSync(path.join(root, 'dist', 'assets'), path.join(root, 'assets'), { recursive: true });

// 3. Copy dist to ./docs
fs.cpSync(path.join(root, 'dist'), path.join(root, 'docs'), { recursive: true });

console.log(`Successfully synced dist (v=${version}) to root and docs for GitHub Pages!`);
