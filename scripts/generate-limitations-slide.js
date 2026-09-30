import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { jsPDF } from 'jspdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// Create a 16:9 Widescreen Presentation Slide (297mm x 167mm)
const doc = new jsPDF({
  orientation: 'landscape',
  unit: 'mm',
  format: [297, 167],
});

const W = 297;
const H = 167;

// 1. Dark Slide Background
doc.setFillColor(8, 12, 24);
doc.rect(0, 0, W, H, 'F');

// Top gradient-style accent stripes
doc.setFillColor(244, 63, 94); // Rose Red for Limitations
doc.rect(0, 0, W * 0.45, 3, 'F');
doc.setFillColor(139, 92, 246); // Electric Purple
doc.rect(W * 0.45, 0, W * 0.3, 3, 'F');
doc.setFillColor(0, 240, 255); // Cyber Cyan
doc.rect(W * 0.75, 0, W * 0.25, 3, 'F');

// 2. Slide Header Area
doc.setFillColor(22, 32, 56);
doc.roundedRect(18, 12, 68, 8, 2, 2, 'F');
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(244, 63, 94);
doc.text('STUDYNEST CHROMA  •  S1 PROJECT', 22, 17.3);

doc.setFont('helvetica', 'bold');
doc.setFontSize(25);
doc.setTextColor(255, 255, 255);
doc.text('PROJECT LIMITATIONS', 18, 31);

doc.setFont('helvetica', 'normal');
doc.setFontSize(11);
doc.setTextColor(148, 163, 184);
doc.text('Academic & Technical Constraints Identified During Semester 1 Development', 18, 38.5);

// Divider line
doc.setDrawColor(51, 65, 85);
doc.setLineWidth(0.4);
doc.line(18, 43, W - 18, 43);

// 3. Four 2x2 Grid Cards for Limitations
const cards = [
  {
    num: '01',
    title: 'Unfamiliarity with Amrita Question Papers',
    badge: 'ACADEMIC  •  S1 PERSPECTIVE',
    accent: [244, 63, 94], // Rose
    points: [
      'Being Semester 1 (S1) students, we do not yet have a complete idea of official Amrita exam question paper patterns.',
      'Lack of prior experience with mid-term and end-semester question weightages across different subjects.',
    ],
  },
  {
    num: '02',
    title: 'Uncertainty in Coursework Reference Materials',
    badge: 'CURRICULUM ALIGNMENT',
    accent: [245, 158, 11], // Amber
    points: [
      'We do not yet know the exact supplementary references or lecture materials followed by every faculty member at Amrita.',
      'Some textbooks and external links are standard engineering references rather than classroom-specific notes.',
    ],
  },
  {
    num: '03',
    title: 'Need for Material Fine-Tuning & Less Redundancy',
    badge: 'CONTENT DEPTH',
    accent: [139, 92, 246], // Purple
    points: [
      'Current unit summaries and study resources are general and need fine-tuning to remove overlapping or redundant topics.',
      'Requires a more detailed, step-by-step learning approach tailored to Amrita coursework.',
    ],
  },
  {
    num: '04',
    title: 'Browser-Based Local Storage Quota (5 MB)',
    badge: 'TECHNICAL CONSTRAINT',
    accent: [0, 240, 255], // Cyan
    points: [
      'Files uploaded or exchanged in the Admin section are saved in browser localStorage (capped at 5 MB per device).',
      'Uploaded files stay on the local browser until a shared cloud database is integrated in future updates.',
    ],
  },
];

const marginX = 18;
const startY = 48;
const gapX = 10;
const gapY = 6;
const cardW = (W - marginX * 2 - gapX) / 2;
const cardH = 43;

cards.forEach((c, idx) => {
  const col = idx % 2;
  const row = Math.floor(idx / 2);
  const x = marginX + col * (cardW + gapX);
  const y = startY + row * (cardH + gapY);

  // Card surface
  doc.setFillColor(15, 22, 41);
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.4);
  doc.roundedRect(x, y, cardW, cardH, 3, 3, 'FD');

  // Left accent bar
  doc.setFillColor(c.accent[0], c.accent[1], c.accent[2]);
  doc.roundedRect(x, y, 3.5, cardH, 1.5, 1.5, 'F');

  // Number badge & Category tag
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(c.accent[0], c.accent[1], c.accent[2]);
  doc.text(`${c.num}  •  ${c.badge}`, x + 8, y + 8);

  // Card Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(248, 250, 252);
  doc.text(c.title, x + 8, y + 15.5);

  // Bullet points
  let py = y + 23;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.2);
  doc.setTextColor(203, 213, 225);

  c.points.forEach((pt) => {
    const lines = doc.splitTextToSize(`•  ${pt}`, cardW - 14);
    doc.text(lines, x + 8, py);
    py += lines.length * 4.5 + 2.2;
  });
});

// 4. Bottom Summary Takeaway Bar
const barY = 149;
doc.setFillColor(22, 32, 56);
doc.setDrawColor(0, 240, 255);
doc.setLineWidth(0.3);
doc.roundedRect(marginX, barY, W - marginX * 2, 11, 2, 2, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(0, 240, 255);
doc.text('KEY TAKEAWAY:', marginX + 6, barY + 7);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(241, 245, 249);
doc.text(
  'As we progress beyond S1 and gain deeper familiarity with Amrita exams and coursework, these limitations directly guide our future improvements.',
  marginX + 36,
  barY + 7
);

const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

const targets = [
  path.join(root, 'StudyNest_Limitations_Slide.pdf'),
  path.resolve(root, '..', 'studynest-pro', 'StudyNest_Limitations_Slide.pdf'),
  'C:\\Users\\krish\\.gemini\\antigravity\\brain\\ebc9a7c1-a0fe-4a5e-8663-472b22b5ba7b\\StudyNest_Limitations_Slide.pdf',
];

for (const t of targets) {
  fs.writeFileSync(t, pdfBuffer);
  console.log(`Saved Slide PDF -> ${t}`);
}
