'use client';

import { useEffect, useReducer } from 'react';
import { XpButton } from '@/components/ui/XpButton';
import { cx } from '@/lib/cx';
import { initialCalculatorState, keyboardKeyToKeypadKey, pressKey } from '@/lib/calculator';
import { useIsWindowActive } from '../DesktopContext';
import styles from './CalculatorApp.module.css';

/** Keypad layout, four keys per row; `null` renders an empty grid cell. */
// prettier-ignore
const KEYPAD: ReadonlyArray<string | null> = [
  'C', '⌫', '/', '*',
  '7', '8', '9', '-',
  '4', '5', '6', '+',
  '1', '2', '3', '=',
  '0', '.', null,
];

const OPERATOR_KEYS = new Set(['/', '*', '-', '+', 'C', '⌫']);

export function CalculatorApp() {
  const [state, press] = useReducer(pressKey, initialCalculatorState);
  const isActive = useIsWindowActive();

  useEffect(() => {
    if (!isActive) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest('input, textarea')) return;

      const key = keyboardKeyToKeypadKey(event.key);
      if (key === null) return;
      event.preventDefault();
      press(key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return (
    <div className={styles.calculator}>
      <output className={styles.display} aria-live="polite">
        {state.display}
      </output>
      <div className={styles.keys}>
        {KEYPAD.map((key, index) =>
          key === null ? (
            <span key={`gap-${index}`} />
          ) : (
            <XpButton
              key={key}
              variant="key"
              className={cx(OPERATOR_KEYS.has(key) && styles.operator, key === '=' && styles.equals)}
              onClick={() => press(key)}
            >
              {key}
            </XpButton>
          ),
        )}
      </div>
    </div>
  );
}
