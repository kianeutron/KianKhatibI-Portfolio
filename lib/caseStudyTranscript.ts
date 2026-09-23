import type { CaseStudy, CaseStudyVisual } from '@/types';

export type TranscriptTextKind = 'system' | 'muted' | 'output' | 'heading';

export type TranscriptLine = { kind: TranscriptTextKind; text: string } | { kind: 'visual'; visual: CaseStudyVisual };

/** Flattens a case study into terminal lines (headings, prose, bullets, diagrams). */
export function buildTranscript(study: CaseStudy): TranscriptLine[] {
  const fileId = study.id.replace(/\s+/g, '_');
  const lines: TranscriptLine[] = [
    { kind: 'heading', text: study.title },
    { kind: 'output', text: '' },
  ];

  study.sections.forEach((section, index) => {
    lines.push({ kind: 'system', text: `${fileId}/${String(index + 1).padStart(2, '0')} // ${section.label}` });
    if (section.title) lines.push({ kind: 'heading', text: section.title });
    for (const paragraph of section.paragraphs) lines.push({ kind: 'output', text: paragraph });
    for (const bullet of section.bullets) lines.push({ kind: 'muted', text: `  > ${bullet}` });
    if (section.visual) lines.push({ kind: 'visual', visual: section.visual });
    lines.push({ kind: 'output', text: '' });
  });

  lines.push({ kind: 'muted', text: `END ${fileId} // END OF FILE` });
  return lines;
}
