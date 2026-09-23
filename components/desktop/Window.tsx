'use client';

import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { IconGlyph } from '@/components/ui/IconGlyph';
import { XpButton } from '@/components/ui/XpButton';
import { cx } from '@/lib/cx';
import { WindowActiveProvider } from './DesktopContext';
import type { WindowDefinition } from './windowDefinitions';
import type { WindowState } from './windowManager';
import styles from './Window.module.css';

type WindowStyle = CSSProperties & Record<`--window-${string}`, string | number>;

interface WindowProps {
  definition: WindowDefinition;
  state: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onTitlePointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
  children: ReactNode;
}

export function Window({
  definition,
  state,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onTitlePointerDown,
  children,
}: WindowProps) {
  const { title, icon, variant, width, height } = definition;
  const style: WindowStyle = {
    '--window-x': `${state.x}px`,
    '--window-y': `${state.y}px`,
    '--window-width': `${width}px`,
    '--window-height': `${height}px`,
    '--window-z': state.z,
  };

  return (
    <section
      className={cx(
        styles.window,
        styles[variant],
        state.minimized && styles.minimized,
        state.maximized && styles.maximized,
      )}
      style={style}
      aria-label={`${title} window`}
      onPointerDown={onFocus}
    >
      <div className={styles.titlebar} onPointerDown={onTitlePointerDown}>
        <span className={styles.titleIcon}>
          <IconGlyph kind={icon} scale={0.44} />
        </span>
        <strong>{title}</strong>
        <div className={styles.controls}>
          <XpButton variant="icon" aria-label="Minimize" onClick={onMinimize}>
            _
          </XpButton>
          <XpButton variant="icon" aria-label="Maximize" onClick={onToggleMaximize}>
            □
          </XpButton>
          <XpButton variant="icon" aria-label="Close" onClick={onClose}>
            ×
          </XpButton>
        </div>
      </div>
      <div className={styles.body}>
        <WindowActiveProvider value={isActive && !state.minimized}>{children}</WindowActiveProvider>
      </div>
    </section>
  );
}
