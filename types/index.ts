export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights?: string[];
  technologies: string[];
}

export type SkillCategoryId = 'frontend' | 'backend' | 'ai' | 'databases' | 'security' | 'architecture' | 'tooling';

export type SkillStatus = 'CORE' | 'PROFICIENT' | 'ACTIVE' | 'WORKING' | 'INSTALLED' | 'READY' | 'ENABLED' | 'TOOLKIT';

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
}

export interface SkillItem {
  name: string;
  status: SkillStatus;
  detail: string;
}

export interface SkillPanel {
  title: string;
  items: readonly SkillItem[];
  capabilities: readonly string[];
  /** Optional terminal-style status line shown under the panel. */
  runtimeNote?: string;
}

export type CaseStudySlug = 'case-01' | 'case-02' | 'case-03';

export type CaseStudyVisual = 'architecture' | 'reconstruction';

export interface CaseStudySection {
  label: string;
  title?: string;
  paragraphs: readonly string[];
  bullets: readonly string[];
  visual?: CaseStudyVisual;
}

export interface CaseStudy {
  /** Display id used in the transcript, e.g. "CASE 01". */
  id: string;
  slug: CaseStudySlug;
  fileName: string;
  windowTitle: string;
  title: string;
  sections: readonly CaseStudySection[];
}

export type ContactIconKey = 'email' | 'github' | 'linkedin';

export interface ContactLink {
  iconKey: ContactIconKey;
  label: string;
  href: string;
  display: string;
}
