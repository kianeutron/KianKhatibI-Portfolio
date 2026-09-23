import { caseStudies } from '@/constants';
import type { CaseStudySlug } from '@/types';
import type { IconKind } from '@/components/ui/IconGlyph';

export type WindowId =
  | 'welcome'
  | 'computer'
  | 'experience'
  | 'skills'
  | 'contact'
  | 'terminal'
  | 'case-studies'
  | 'snake'
  | 'calculator'
  | CaseStudySlug;

/** Layout treatment of a window; each maps to a body style in `Window.module.css`. */
export type WindowVariant = 'default' | 'dialog' | 'game' | 'document';

export interface WindowDefinition {
  id: WindowId;
  title: string;
  icon: IconKind;
  variant: WindowVariant;
  x: number;
  y: number;
  width: number;
  height: number;
}

type Geometry = Pick<WindowDefinition, 'x' | 'y' | 'width' | 'height'>;

const geometry = (x: number, y: number, width: number, height: number): Geometry => ({ x, y, width, height });

const caseStudyWindow = (index: number): Geometry => geometry(120 + index * 30, 70 + index * 20, 780, 660);

const staticDefinitions: readonly WindowDefinition[] = [
  { id: 'welcome', title: 'Welcome', icon: 'documents', variant: 'dialog', ...geometry(610, 285, 520, 390) },
  { id: 'computer', title: 'My Computer', icon: 'computer', variant: 'default', ...geometry(300, 170, 560, 420) },
  {
    id: 'terminal',
    title: 'Administrator: Command Prompt',
    icon: 'terminal',
    variant: 'default',
    ...geometry(80, 390, 610, 300),
  },
  { id: 'experience', title: 'Experience', icon: 'experience', variant: 'default', ...geometry(390, 110, 620, 480) },
  { id: 'skills', title: 'System Properties', icon: 'gear', variant: 'default', ...geometry(190, 80, 900, 650) },
  { id: 'contact', title: 'Outlook Express', icon: 'mail', variant: 'default', ...geometry(450, 150, 520, 390) },
  { id: 'case-studies', title: 'Case Studies', icon: 'folder', variant: 'default', ...geometry(300, 90, 620, 400) },
  { id: 'snake', title: 'Snake.exe', icon: 'snake', variant: 'game', ...geometry(180, 60, 680, 820) },
  { id: 'calculator', title: 'Calculator', icon: 'calculator', variant: 'default', ...geometry(520, 120, 320, 470) },
];

const caseStudyDefinitions: readonly WindowDefinition[] = caseStudies.map((study, index) => ({
  id: study.slug,
  title: study.windowTitle,
  icon: 'terminal',
  variant: 'document',
  ...caseStudyWindow(index),
}));

export const WINDOW_DEFINITIONS: readonly WindowDefinition[] = [...staticDefinitions, ...caseStudyDefinitions];

const byId = new Map(WINDOW_DEFINITIONS.map((definition) => [definition.id, definition]));

export function getWindowDefinition(id: WindowId): WindowDefinition {
  const definition = byId.get(id);
  if (!definition) throw new Error(`Unknown window id: ${id}`);
  return definition;
}

/** Windows that are open when the desktop first loads, in stacking order (last is focused). */
export const INITIAL_WINDOWS: readonly WindowId[] = ['computer', 'welcome'];
