'use client';

import { XpButton } from '@/components/ui/XpButton';
import { useDesktopActions } from '../DesktopContext';
import styles from './WelcomeApp.module.css';

export function WelcomeApp() {
  const { closeWindow } = useDesktopActions();

  return (
    <div className={styles.dialog}>
      <div className={styles.infoIcon} aria-hidden="true">
        i
      </div>
      <div className={styles.message}>
        <h1>Welcome to Kian&apos;s PC</h1>
        <p>
          This is my personal corner of the internet built like an old desktop, filled with the software, systems,
          experiments, and projects I&apos;ve worked on.
        </p>
        <p>
          Most of my work lives somewhere between full-stack engineering, AI systems, backend architecture, and
          application security.
        </p>
        <p>Double-click around. Open things. Explore the system.</p>
      </div>
      <div className={styles.actions}>
        <XpButton onClick={() => closeWindow('welcome')}>OK</XpButton>
      </div>
    </div>
  );
}
