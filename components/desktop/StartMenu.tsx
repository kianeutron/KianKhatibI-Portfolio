import { IconGlyph } from '@/components/ui/IconGlyph';
import { START_MENU_ITEMS } from './shortcuts';
import { getWindowDefinition, type WindowId } from './windowDefinitions';
import styles from './StartMenu.module.css';

/** Elements inside this zone (menu and Start button) do not dismiss the menu when clicked. */
export const START_ZONE_SELECTOR = '[data-start-zone]';

export function StartMenu({ onOpen }: { onOpen: (id: WindowId) => void }) {
  return (
    <div className={styles.menu} data-start-zone="">
      <div className={styles.header}>
        <span className={styles.avatar}>KK</span>
        <strong>Kian Khatibi</strong>
      </div>
      <div className={styles.items}>
        {START_MENU_ITEMS.map(({ id, label }) => (
          <button type="button" key={id} onClick={() => onOpen(id)}>
            <IconGlyph kind={getWindowDefinition(id).icon} scale={0.58} />
            {label}
          </button>
        ))}
      </div>
      <div className={styles.footer}>
        <span>All Programs</span>
        <span>Shut Down</span>
      </div>
    </div>
  );
}
