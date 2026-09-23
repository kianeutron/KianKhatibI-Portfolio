import { describe, expect, it } from 'vitest';
import { caseStudies } from '@/constants';
import { buildTranscript } from './caseStudyTranscript';

describe('buildTranscript', () => {
  it('starts with the title and ends with an end-of-file marker', () => {
    for (const study of caseStudies) {
      const lines = buildTranscript(study);
      expect(lines[0]).toEqual({ kind: 'heading', text: study.title });
      const last = lines.at(-1);
      expect(last).toMatchObject({ kind: 'muted' });
      expect(last && 'text' in last && last.text).toContain('END OF FILE');
    }
  });

  it('emits one numbered system line per section', () => {
    const [study] = caseStudies;
    if (!study) throw new Error('expected at least one case study');
    const systemLines = buildTranscript(study).filter((line) => line.kind === 'system');
    expect(systemLines).toHaveLength(study.sections.length);
  });

  it('has unique slugs and file names', () => {
    expect(new Set(caseStudies.map((study) => study.slug)).size).toBe(caseStudies.length);
    expect(new Set(caseStudies.map((study) => study.fileName)).size).toBe(caseStudies.length);
  });
});
