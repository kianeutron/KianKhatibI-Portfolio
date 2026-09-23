import { IconGlyph } from '@/components/ui/IconGlyph';
import { DESKTOP_SHORTCUTS } from './shortcuts';
import { getWindowDefinition, type WindowId } from './windowDefinitions';
import styles from './DesktopIcons.module.css';

const TOUCH_QUERY = '(hover: none), (pointer: coarse)';

/** Touch devices have no reliable double-click, so a single tap opens; mouse users double-click. */
const isTouchInput = () => window.matchMedia(TOUCH_QUERY).matches;

/** Double-click (single tap on touch, or Enter) a shortcut to open its window. */
export function DesktopIcons({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <div className={styles.icons} aria-label="Desktop shortcuts">
      {DESKTOP_SHORTCUTS.map(({ id, label }) => (
        <button
          type="button"
          className={styles.icon}
          key={id}
          onClick={() => isTouchInput() && onOpen(id)}
          onDoubleClick={() => onOpen(id)}
          onKeyDown={(event) => event.key === 'Enter' && onOpen(id)}
        >
          <IconGlyph kind={getWindowDefinition(id).icon} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
