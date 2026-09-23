import type { CSSProperties } from 'react';
import { cx } from '@/lib/cx';
import styles from './IconGlyph.module.css';

export type IconKind =
  'computer' | 'folder' | 'documents' | 'experience' | 'gear' | 'mail' | 'terminal' | 'snake' | 'calculator';

interface IconGlyphProps {
  kind: IconKind;
  /**
   * Multiplier of the 43×38 base artwork; the layout box scales with it.
   * A parent can enlarge every glyph by setting `--glyph-zoom`.
   */
  scale?: number;
  className?: string;
}

type GlyphStyle = CSSProperties & { '--glyph-scale': number };

/** Pixel-art desktop icon drawn purely with CSS (see `IconGlyph.module.css`). */
export function IconGlyph({ kind, scale = 1, className }: IconGlyphProps) {
  const style: GlyphStyle = { '--glyph-scale': scale };

  return (
    <span className={cx(styles.box, className)} style={style} aria-hidden="true">
      <span className={cx(styles.glyph, styles[kind])}>
        <span />
      </span>
    </span>
  );
}
