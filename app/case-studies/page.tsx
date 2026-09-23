import type { Metadata } from 'next';
import { CaseStudy } from '@/components/case-studies/CaseStudy';

export const metadata: Metadata = {
  title: 'Case Studies - Kian Khatibi',
};

export default function CaseStudiesPage() {
  return (
    <main>
      <CaseStudy slug="case-01" layout="page" />
    </main>
  );
}
