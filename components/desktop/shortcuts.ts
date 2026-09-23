import type { WindowId } from './windowDefinitions';

interface Shortcut {
  id: WindowId;
  label: string;
}

export const DESKTOP_SHORTCUTS: readonly Shortcut[] = [
  { id: 'computer', label: 'My Computer' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
  { id: 'terminal', label: 'Command Prompt' },
  { id: 'snake', label: 'Snake.exe' },
  { id: 'calculator', label: 'Calculator' },
];

export const START_MENU_ITEMS: readonly Shortcut[] = [
  { id: 'computer', label: 'My Computer' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills & Expertise' },
  { id: 'contact', label: 'Contact' },
  { id: 'snake', label: 'Snake.exe' },
  { id: 'calculator', label: 'Calculator' },
];
