import { caseStudies } from '@/constants';
import type { CaseStudySlug } from '@/types';
import { CaseStudyConsole } from './CaseStudyConsole';

const bySlug = new Map(caseStudies.map((study) => [study.slug, study]));

export function CaseStudy({ slug }: { slug: CaseStudySlug }) {
  const study = bySlug.get(slug);
  if (!study) throw new Error(`Unknown case study: ${slug}`);
  return <CaseStudyConsole study={study} />;
}
