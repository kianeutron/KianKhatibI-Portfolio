'use client';

import { useCallback, useEffect, useState } from 'react';
import { START_ZONE_SELECTOR } from './StartMenu';

/** Start-menu open state that also dismisses on any pointer press outside the start zone. */
export function useStartMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dismissOutside = (event: PointerEvent) => {
      if (!(event.target as Element).closest(START_ZONE_SELECTOR)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  return { isOpen, close, toggle };
}
