import type { ReactNode } from 'react';
import styles from './AppPanel.module.css';

interface AppPanelProps {
  title: string;
  meta: string;
  children: ReactNode;
}

/** Scrollable window content with a title strip, shared by the Experience and Contact apps. */
export function AppPanel({ title, meta, children }: AppPanelProps) {
  return (
    <div className={styles.panel}>
      <header className={styles.header}>
        {title} <span>{meta}</span>
      </header>
      {children}
    </div>
  );
}
