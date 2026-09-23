'use client';

import { IconGlyph } from '@/components/ui/IconGlyph';
import { cx } from '@/lib/cx';
import { useNow } from './useNow';
import { getWindowDefinition, type WindowId } from './windowDefinitions';
import type { WindowManagerState } from './windowManager';
import styles from './Taskbar.module.css';

const TIME_FORMAT = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });

function TrayClock() {
  const now = useNow(30_000);
  return <time className={styles.trayClock}>{now ? TIME_FORMAT.format(now) : ''}</time>;
}

interface TaskbarProps {
  windows: WindowManagerState['windows'];
  openIds: readonly WindowId[];
  activeId: WindowId | null;
  startOpen: boolean;
  onToggleStart: () => void;
  onOpen: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
}

export function Taskbar({ windows, openIds, activeId, startOpen, onToggleStart, onOpen, onFocus }: TaskbarProps) {
  return (
    <footer className={styles.taskbar}>
      <button
        type="button"
        className={cx(styles.startButton, startOpen && styles.startPressed)}
        aria-expanded={startOpen}
        data-start-zone=""
        onClick={onToggleStart}
      >
        <span className={styles.flag} aria-hidden="true">
          ▰
        </span>
        START
      </button>

      <div className={styles.tasks}>
        {openIds.map((id) => {
          const { title, icon } = getWindowDefinition(id);
          const { minimized } = windows[id];
          return (
            <button
              type="button"
              key={id}
              className={cx(styles.task, activeId === id && !minimized && styles.taskActive)}
              aria-label={title}
              title={title}
              onClick={() => (minimized ? onOpen(id) : onFocus(id))}
            >
              <IconGlyph kind={icon} scale={0.62} />
            </button>
          );
        })}
      </div>

      <div className={styles.tray}>
        <span className={styles.trayChevron} aria-hidden="true">
          ▴
        </span>
        <span className={styles.trayStatus} aria-hidden="true">
          ◉
        </span>
        <TrayClock />
      </div>
    </footer>
  );
}
