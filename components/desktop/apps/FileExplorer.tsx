'use client';

import { useState } from 'react';
import { IconGlyph, type IconKind } from '@/components/ui/IconGlyph';
import { XpButton } from '@/components/ui/XpButton';
import type { WindowId } from '../windowDefinitions';
import styles from './FileExplorer.module.css';

export interface ExplorerFile {
  id: WindowId;
  label: string;
  icon: IconKind;
}

interface FileExplorerProps {
  address: string;
  searchLabel: string;
  emptyMessage: string;
  files: readonly ExplorerFile[];
  onOpen: (id: WindowId) => void;
  /** Enables the back button when provided. */
  onBack?: () => void;
}

/** Explorer-style window: navigation toolbar, searchable file grid. */
export function FileExplorer({ address, searchLabel, emptyMessage, files, onOpen, onBack }: FileExplorerProps) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const visibleFiles = normalizedQuery
    ? files.filter((file) => file.label.toLowerCase().includes(normalizedQuery))
    : files;

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <XpButton variant="icon" disabled aria-label="Menu">
          ☰
        </XpButton>
        <XpButton variant="icon" disabled={!onBack} aria-label="Back" onClick={onBack}>
          ←
        </XpButton>
        <XpButton variant="icon" disabled aria-label="Forward">
          →
        </XpButton>
        <div className={styles.address}>
          <IconGlyph kind="folder" scale={0.56} />
          {address}
        </div>
        <input
          className={styles.search}
          aria-label={searchLabel}
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className={styles.fileGrid}>
        {visibleFiles.map((file) => (
          <button type="button" className={styles.file} key={file.id} onClick={() => onOpen(file.id)}>
            <IconGlyph kind={file.icon} scale={1.1} />
            <span>{file.label}</span>
          </button>
        ))}
        {visibleFiles.length === 0 && <p className={styles.empty}>{emptyMessage}</p>}
      </div>
    </div>
  );
}
