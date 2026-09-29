import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildProjectPresentationDoc } from '../src/utils/pdfGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const doc = buildProjectPresentationDoc();
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

const targets = [
  path.join(root, 'StudyNest_Classroom_Presentation.pdf'),
  path.join(root, 'public', 'StudyNest_Classroom_Presentation.pdf'),
  path.resolve(root, '..', 'studynest-pro', 'StudyNest_Classroom_Presentation.pdf'),
  path.resolve(root, '..', 'studynest-chroma', 'StudyNest_Classroom_Presentation.pdf'),
  'C:\\Users\\krish\\.gemini\\antigravity\\brain\\ebc9a7c1-a0fe-4a5e-8663-472b22b5ba7b\\StudyNest_Classroom_Presentation.pdf'
];

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, pdfBuffer);
  console.log(`Saved PDF (${(pdfBuffer.length / 1024).toFixed(1)} KB) -> ${target}`);
}
