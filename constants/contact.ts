import type { ContactLink } from '@/types';

export const contactInfo = {
  email: 'kiankhatibi770@gmail.com',
  github: 'https://github.com/kianeutron',
  linkedin: 'https://www.linkedin.com/in/kian-khatibi-604164338',
} as const;

export const contactLinks: readonly ContactLink[] = [
  { iconKey: 'email', label: 'Email', href: `mailto:${contactInfo.email}`, display: contactInfo.email },
  { iconKey: 'github', label: 'GitHub', href: contactInfo.github, display: 'GitHub' },
  { iconKey: 'linkedin', label: 'LinkedIn', href: contactInfo.linkedin, display: 'LinkedIn' },
];
