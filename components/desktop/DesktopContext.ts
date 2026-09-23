'use client';

import { createContext, useContext } from 'react';
import type { WindowId } from './windowDefinitions';

export interface DesktopActions {
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
}

const DesktopActionsContext = createContext<DesktopActions | null>(null);

export const DesktopActionsProvider = DesktopActionsContext.Provider;

export function useDesktopActions(): DesktopActions {
  const actions = useContext(DesktopActionsContext);
  if (!actions) throw new Error('useDesktopActions must be used inside <Desktop>');
  return actions;
}

/** Whether the window that renders this component is the focused, visible one. */
const WindowActiveContext = createContext(true);

export const WindowActiveProvider = WindowActiveContext.Provider;

export function useIsWindowActive(): boolean {
  return useContext(WindowActiveContext);
}
