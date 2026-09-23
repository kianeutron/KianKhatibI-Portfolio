'use client';

import { caseStudies } from '@/constants';
import { useDesktopActions } from '../DesktopContext';
import { FileExplorer, type ExplorerFile } from './FileExplorer';

const caseFiles: readonly ExplorerFile[] = caseStudies.map((study) => ({
  id: study.slug,
  label: study.fileName,
  icon: 'documents',
}));

export function CaseStudiesFolderApp() {
  const { openWindow, closeWindow } = useDesktopActions();

  const backToDesktop = () => {
    openWindow('computer');
    closeWindow('case-studies');
  };

  return (
    <FileExplorer
      address="C:\Users\Kian\Desktop\Case Studies"
      searchLabel="Search case studies"
      emptyMessage="No matching case files"
      files={caseFiles}
      onOpen={openWindow}
      onBack={backToDesktop}
    />
  );
}
