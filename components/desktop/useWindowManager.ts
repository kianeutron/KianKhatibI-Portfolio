'use client';

import { useMemo, useReducer } from 'react';
import type { WindowId } from './windowDefinitions';
import { createInitialState, windowManagerReducer } from './windowManager';

export function useWindowManager() {
  const [state, dispatch] = useReducer(windowManagerReducer, undefined, createInitialState);

  const actions = useMemo(
    () => ({
      openWindow: (id: WindowId) => dispatch({ type: 'open', id }),
      closeWindow: (id: WindowId) => dispatch({ type: 'close', id }),
      minimizeWindow: (id: WindowId) => dispatch({ type: 'minimize', id }),
      toggleMaximize: (id: WindowId) => dispatch({ type: 'toggleMaximize', id }),
      focusWindow: (id: WindowId) => dispatch({ type: 'focus', id }),
      moveWindow: (id: WindowId, x: number, y: number) => dispatch({ type: 'move', id, x, y }),
    }),
    [],
  );

  return { state, actions };
}
