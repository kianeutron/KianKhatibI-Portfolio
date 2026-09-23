import { describe, expect, it } from 'vitest';
import { INITIAL_WINDOWS, WINDOW_DEFINITIONS, getWindowDefinition } from './windowDefinitions';
import { createInitialState, windowManagerReducer, type WindowAction } from './windowManager';

const run = (...actions: WindowAction[]) => actions.reduce(windowManagerReducer, createInitialState());

describe('window definitions', () => {
  it('has unique ids', () => {
    const ids = WINDOW_DEFINITIONS.map((definition) => definition.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('throws on unknown ids', () => {
    expect(() => getWindowDefinition('nope' as never)).toThrow(/Unknown window id/);
  });
});

describe('createInitialState', () => {
  it('opens only the initial windows and focuses the last one', () => {
    const state = createInitialState();
    const open = WINDOW_DEFINITIONS.filter(({ id }) => state.windows[id].open).map(({ id }) => id);
    expect(open.sort()).toEqual([...INITIAL_WINDOWS].sort());
    expect(state.activeId).toBe(INITIAL_WINDOWS.at(-1));
  });
});

describe('windowManagerReducer', () => {
  it('opens a window on top and makes it active', () => {
    const state = run({ type: 'open', id: 'skills' });
    expect(state.windows.skills.open).toBe(true);
    expect(state.activeId).toBe('skills');
    for (const { id } of WINDOW_DEFINITIONS) {
      if (id !== 'skills') expect(state.windows.skills.z).toBeGreaterThan(state.windows[id].z);
    }
  });

  it('gives every focus a strictly higher z-index, even for rapid successive actions', () => {
    const state = run({ type: 'open', id: 'skills' }, { type: 'open', id: 'contact' }, { type: 'focus', id: 'skills' });
    expect(state.windows.skills.z).toBeGreaterThan(state.windows.contact.z);
    expect(state.activeId).toBe('skills');
  });

  it('restores a minimized window when it is opened or focused', () => {
    const minimized = run({ type: 'minimize', id: 'computer' });
    expect(minimized.windows.computer.minimized).toBe(true);
    expect(windowManagerReducer(minimized, { type: 'focus', id: 'computer' }).windows.computer.minimized).toBe(false);
  });

  it('closes a window without touching others', () => {
    const state = run({ type: 'close', id: 'welcome' });
    expect(state.windows.welcome.open).toBe(false);
    expect(state.windows.computer.open).toBe(true);
  });

  it('toggles maximize and un-minimizes', () => {
    const maximized = run({ type: 'minimize', id: 'computer' }, { type: 'toggleMaximize', id: 'computer' });
    expect(maximized.windows.computer).toMatchObject({ maximized: true, minimized: false });
    expect(windowManagerReducer(maximized, { type: 'toggleMaximize', id: 'computer' }).windows.computer.maximized).toBe(
      false,
    );
  });

  it('moves a window but clamps it to the visible area', () => {
    const moved = run({ type: 'move', id: 'computer', x: 120, y: 200 });
    expect(moved.windows.computer).toMatchObject({ x: 120, y: 200 });
    const clamped = run({ type: 'move', id: 'computer', x: -50, y: -50 });
    expect(clamped.windows.computer.x).toBe(0);
    expect(clamped.windows.computer.y).toBeGreaterThanOrEqual(0);
  });

  it('does not move a maximized window', () => {
    const state = run({ type: 'toggleMaximize', id: 'computer' });
    expect(windowManagerReducer(state, { type: 'move', id: 'computer', x: 10, y: 10 })).toBe(state);
  });
});
