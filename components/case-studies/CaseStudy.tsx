import { caseStudies } from '@/constants';
import type { CaseStudySlug } from '@/types';
import { CaseStudyConsole, type CaseStudyLayout } from './CaseStudyConsole';

const bySlug = new Map(caseStudies.map((study) => [study.slug, study]));

interface CaseStudyProps {
  slug: CaseStudySlug;
  layout?: CaseStudyLayout | undefined;
}

export function CaseStudy({ slug, layout }: CaseStudyProps) {
  const study = bySlug.get(slug);
  if (!study) throw new Error(`Unknown case study: ${slug}`);
  return <CaseStudyConsole study={study} layout={layout} />;
}
