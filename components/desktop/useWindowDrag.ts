'use client';

import { useCallback, useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react';
import type { WindowId } from './windowDefinitions';

interface DragSession {
  id: WindowId;
  offsetX: number;
  offsetY: number;
}

/** Drag-to-move for window title bars, using window-level pointer listeners while a drag is active. */
export function useWindowDrag(onMove: (id: WindowId, x: number, y: number) => void) {
  const [session, setSession] = useState<DragSession | null>(null);

  useEffect(() => {
    if (!session) return undefined;

    const handleMove = (event: PointerEvent) => {
      onMove(session.id, event.clientX - session.offsetX, event.clientY - session.offsetY);
    };
    const handleEnd = () => setSession(null);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleEnd);
    window.addEventListener('pointercancel', handleEnd);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleEnd);
      window.removeEventListener('pointercancel', handleEnd);
    };
  }, [session, onMove]);

  return useCallback((event: ReactPointerEvent<HTMLElement>, id: WindowId) => {
    if ((event.target as HTMLElement).closest('button')) return;
    const frame = event.currentTarget.parentElement?.getBoundingClientRect();
    if (frame) setSession({ id, offsetX: event.clientX - frame.left, offsetY: event.clientY - frame.top });
  }, []);
}
