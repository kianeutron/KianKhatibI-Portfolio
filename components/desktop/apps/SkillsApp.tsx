'use client';

import { useState } from 'react';
import { skillCategories, skillPanels } from '@/constants';
import { BlinkingCursor } from '@/components/ui/BlinkingCursor';
import { cx } from '@/lib/cx';
import type { SkillCategoryId } from '@/types';
import styles from './SkillsApp.module.css';

/** "System Properties" window presenting skills as categorised hardware-style readouts. */
export function SkillsApp() {
  const [activeCategory, setActiveCategory] = useState<SkillCategoryId>('frontend');
  const panel = skillPanels[activeCategory];

  return (
    <div className={styles.properties}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <small>Build 2026.09</small>
          <span className={styles.sidebarLabel}>MODULES</span>
          <div className={styles.modules}>
            {skillCategories.map((category) => {
              const isActive = category.id === activeCategory;
              return (
                <button
                  type="button"
                  key={category.id}
                  className={cx(styles.module, isActive && styles.moduleActive)}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {isActive ? '>' : ' '} {category.label}
                </button>
              );
            })}
          </div>
        </aside>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <span>{panel.title}</span>
            <small>READ_ONLY // PROFILE</small>
          </div>
          <div className={styles.rows}>
            {panel.items.map((item) => (
              <div className={styles.row} key={item.name} title={`${item.name} // ${item.detail}`}>
                <span>{item.name}</span>
                <small>{item.detail}</small>
                <b>{item.status}</b>
              </div>
            ))}
          </div>
          <div className={styles.capabilities}>
            <div className={styles.rule}>── CAPABILITIES ─────────────────</div>
            {panel.capabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
          {panel.runtimeNote && (
            <div className={styles.runtime}>
              &gt; {panel.runtimeNote}
              <BlinkingCursor />
            </div>
          )}
        </section>
      </div>
      <footer className={styles.footer}>
        <span>
          MEM: 64K <i>██████</i>
        </span>
      </footer>
    </div>
  );
}
