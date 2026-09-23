'use client';

import { useDesktopActions } from '../DesktopContext';
import { getWindowDefinition, type WindowId } from '../windowDefinitions';
import { FileExplorer, type ExplorerFile } from './FileExplorer';

const FILES: ReadonlyArray<{ id: WindowId; label: string }> = [
  { id: 'experience', label: 'Experience' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'snake', label: 'Snake.exe' },
  { id: 'calculator', label: 'Calculator' },
];

const explorerFiles: readonly ExplorerFile[] = FILES.map(({ id, label }) => ({
  id,
  label,
  icon: getWindowDefinition(id).icon,
}));

export function ComputerApp() {
  const { openWindow } = useDesktopActions();

  return (
    <FileExplorer
      address="C:\Users\Kian\Desktop"
      searchLabel="Search files"
      emptyMessage="No matching files"
      files={explorerFiles}
      onOpen={openWindow}
    />
  );
}
