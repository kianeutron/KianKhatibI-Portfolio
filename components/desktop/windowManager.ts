import { INITIAL_WINDOWS, WINDOW_DEFINITIONS, type WindowId } from './windowDefinitions';

/** Minimum on-screen position a dragged window may reach. */
const MIN_X = 0;
const MIN_Y = 36;

export interface WindowState {
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  z: number;
}

export interface WindowManagerState {
  windows: Record<WindowId, WindowState>;
  activeId: WindowId | null;
  topZ: number;
}

export type WindowAction =
  | { type: 'open'; id: WindowId }
  | { type: 'close'; id: WindowId }
  | { type: 'minimize'; id: WindowId }
  | { type: 'toggleMaximize'; id: WindowId }
  | { type: 'focus'; id: WindowId }
  | { type: 'move'; id: WindowId; x: number; y: number };

export function createInitialState(): WindowManagerState {
  const windows = Object.fromEntries(
    WINDOW_DEFINITIONS.map(({ id, x, y }): [WindowId, WindowState] => [
      id,
      { open: false, minimized: false, maximized: false, x, y, z: 1 },
    ]),
  ) as Record<WindowId, WindowState>;

  let topZ = 1;
  for (const id of INITIAL_WINDOWS) {
    topZ += 1;
    windows[id] = { ...windows[id], open: true, z: topZ };
  }

  return { windows, activeId: INITIAL_WINDOWS.at(-1) ?? null, topZ };
}

function patch(state: WindowManagerState, id: WindowId, changes: Partial<WindowState>): WindowManagerState {
  return { ...state, windows: { ...state.windows, [id]: { ...state.windows[id], ...changes } } };
}

/** Raises a window above all others and makes it the active one. */
function raise(state: WindowManagerState, id: WindowId, changes: Partial<WindowState>): WindowManagerState {
  const z = state.topZ + 1;
  return { ...patch(state, id, { ...changes, z }), activeId: id, topZ: z };
}

export function windowManagerReducer(state: WindowManagerState, action: WindowAction): WindowManagerState {
  switch (action.type) {
    case 'open':
      return raise(state, action.id, { open: true, minimized: false });

    case 'focus':
      return raise(state, action.id, { minimized: false });

    case 'close':
      return patch(state, action.id, { open: false });

    case 'minimize':
      return patch(state, action.id, { minimized: true });

    case 'toggleMaximize':
      return {
        ...patch(state, action.id, { maximized: !state.windows[action.id].maximized, minimized: false }),
        activeId: action.id,
      };

    case 'move': {
      if (state.windows[action.id].maximized) return state;
      return patch(state, action.id, { x: Math.max(MIN_X, action.x), y: Math.max(MIN_Y, action.y) });
    }
  }
}
