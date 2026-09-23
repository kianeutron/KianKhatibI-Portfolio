'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { CaseStudy } from '@/components/case-studies/CaseStudy';
import { useIsWindowActive } from './DesktopContext';
import type { WindowId } from './windowDefinitions';
import { CalculatorApp } from './apps/CalculatorApp';
import { CaseStudiesFolderApp } from './apps/CaseStudiesFolderApp';
import { CommandPromptApp } from './apps/CommandPromptApp';
import { ComputerApp } from './apps/ComputerApp';
import { ContactApp } from './apps/ContactApp';
import { ExperienceApp } from './apps/ExperienceApp';
import { SkillsApp } from './apps/SkillsApp';
import { WelcomeApp } from './apps/WelcomeApp';

const SnakeGame = dynamic(() => import('@/components/games/SnakeGame'), { ssr: false });

function SnakeApp() {
  return <SnakeGame active={useIsWindowActive()} />;
}

/** Maps each window id to the content it renders. Windows only mount their content while open. */
const WINDOW_CONTENT: Record<WindowId, () => ReactNode> = {
  welcome: () => <WelcomeApp />,
  computer: () => <ComputerApp />,
  experience: () => <ExperienceApp />,
  skills: () => <SkillsApp />,
  contact: () => <ContactApp />,
  terminal: () => <CommandPromptApp />,
  calculator: () => <CalculatorApp />,
  snake: () => <SnakeApp />,
  'case-studies': () => <CaseStudiesFolderApp />,
  'case-01': () => <CaseStudy slug="case-01" />,
  'case-02': () => <CaseStudy slug="case-02" />,
  'case-03': () => <CaseStudy slug="case-03" />,
};

export function renderWindowContent(id: WindowId): ReactNode {
  return WINDOW_CONTENT[id]();
}
