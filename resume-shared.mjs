// Shared building blocks used by all resume-generator variants.
// Keep factual content (name, contact, dates, companies, education) identical
// across every variant — only emphasis, ordering, and headline should differ.

import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx';
import fs from 'fs';

// Twips conversion helpers (1 inch = 1440 twips, 1 pt = 20 twips)
export const twip = inches => Math.round(inches * 1440);
export const pt   = points => points * 20;

// ─── Style constants ──────────────────────────────────────────────
export const FONT   = 'Calibri';
export const DARK   = '1A1A2E';
export const ACCENT = '17558F';
export const BODY   = '374151';
export const LIGHT  = '6B7280';

// ─── Helpers ─────────────────────────────────────────────────────
export function hr() {
  return new Paragraph({
    spacing: { before: pt(2), after: pt(2) },
    border: { bottom: { color: ACCENT, size: 6, style: BorderStyle.SINGLE, space: 1 } },
    children: [],
  });
}

export function sectionTitle(text) {
  return [
    new Paragraph({
      spacing: { before: pt(10), after: pt(2) },
      children: [new TextRun({ text: text.toUpperCase(), bold: true, size: pt(11), color: ACCENT, font: FONT })],
    }),
    hr(),
  ];
}

export function para(runs, spacingAfter = 0) {
  return new Paragraph({
    spacing: { after: pt(spacingAfter) },
    children: Array.isArray(runs) ? runs : [runs],
  });
}

export function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: pt(10.5), color: BODY, ...opts });
}

export function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { before: pt(1), after: pt(1) },
    children: [run(text)],
  });
}

export function leftRight(left, right) {
  return new Paragraph({
    spacing: { before: pt(5), after: pt(2) },
    children: [
      new TextRun({ text: left, bold: true, size: pt(11), color: DARK, font: FONT }),
      new TextRun({ text: `\t${right}`, size: pt(10), color: LIGHT, font: FONT }),
    ],
    tabStops: [{ type: 'right', position: twip(6.5) }],
  });
}

// ─── Two-column skills grid (visual layout matching print/PDF version) ───
// rows: array of { label, value } — split roughly in half across two columns.
export function skillsGrid(rows) {
  const mid = Math.ceil(rows.length / 2);
  const colA = rows.slice(0, mid);
  const colB = rows.slice(mid);

  const cellParas = items => items.map(({ label, value }) =>
    new Paragraph({
      spacing: { after: pt(4) },
      children: [
        new TextRun({ text: `${label}:  `, bold: true, size: pt(10.5), color: DARK, font: FONT }),
        new TextRun({ text: value, size: pt(10.5), color: BODY, font: FONT }),
      ],
    })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { right: 200 },
            children: cellParas(colA),
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            margins: { left: 200 },
            children: cellParas(colB),
          }),
        ],
      }),
    ],
  });
}

// ─── Fixed factual header (identical across every variant) ───────
export function buildHeader(headline) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: pt(1) },
      children: [new TextRun({ text: 'MOHAMMED SOHAIL', bold: true, size: pt(22), color: DARK, font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: pt(2) },
      children: [new TextRun({ text: headline, size: pt(12), color: ACCENT, font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: pt(2) },
      children: [new TextRun({ text: 'Hyderabad, Telangana  |  +91 9347587937  |  sohailmohammedsohail268@gmail.com', size: pt(10), color: LIGHT, font: FONT })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: pt(12) },
      children: [new TextRun({ text: 'LinkedIn: linkedin.com/in/mohammed-sohail-34b248286/  |  GitHub: github.com/Mohammed-Sohail123', size: pt(10), color: ACCENT, font: FONT })],
    }),
  ];
}

// ─── Fixed factual education (identical across every variant) ────
export const educationSection = [
  ...sectionTitle('Education'),
  leftRight('B.E. in Computer Science & Engineering — Holy Mary Inst. of Technology (JNTUH)', '2024 | 68%'),
  leftRight('XII (Diploma) — Government Polytechnic, Kotagiri (SBTET)', '2021 | 78.69%'),
  leftRight('X (SSC) — Vasu High School, Bodhan', '2018 | 88.73%'),
  new Paragraph({ spacing: { after: pt(4) }, children: [] }),
];

// ─── Fixed factual languages (identical across every variant) ────
export const languagesSection = [
  ...sectionTitle('Languages'),
  para(run('English (Professional), Hindi (Professional), Urdu (Native), Telugu (Conversational)'), 4),
];

// ─── Write helper ──────────────────────────────────────────────────
export function writeResume(children, outFile) {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: {
            width:  twip(8.5),   // US Letter width
            height: twip(11),    // US Letter height
          },
          margin: {
            top:    twip(0.7),
            bottom: twip(0.7),
            left:   twip(0.85),
            right:  twip(0.85),
          },
        },
      },
      children,
    }],
  });

  return Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(outFile, buffer);
    console.log(`✅  Resume saved → ${outFile}`);
  }).catch(err => {
    console.error('❌  Error:', err.message);
  });
}
