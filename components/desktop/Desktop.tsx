'use client';

import { useMemo } from 'react';
import { ClockWidget } from './ClockWidget';
import { DesktopActionsProvider } from './DesktopContext';
import { DesktopIcons } from './DesktopIcons';
import { StartMenu } from './StartMenu';
import { Taskbar } from './Taskbar';
import { Wallpaper } from './Wallpaper';
import { Window } from './Window';
import { renderWindowContent } from './windowContent';
import { WINDOW_DEFINITIONS, type WindowId } from './windowDefinitions';
import { useStartMenu } from './useStartMenu';
import { useWindowDrag } from './useWindowDrag';
import { useWindowManager } from './useWindowManager';
import styles from './Desktop.module.css';

/** The portfolio shell: a classic desktop with draggable windows, a taskbar and a start menu. */
export default function Desktop() {
  const { state, actions } = useWindowManager();
  const { openWindow, closeWindow, minimizeWindow, toggleMaximize, focusWindow, moveWindow } = actions;
  const startMenu = useStartMenu();
  const beginDrag = useWindowDrag(moveWindow);

  const openDefinitions = WINDOW_DEFINITIONS.filter((definition) => state.windows[definition.id].open);
  const openIds = openDefinitions.map((definition) => definition.id);

  const desktopActions = useMemo(() => ({ openWindow, closeWindow }), [openWindow, closeWindow]);

  const openAndCloseMenu = (id: WindowId) => {
    startMenu.close();
    openWindow(id);
  };

  return (
    <DesktopActionsProvider value={desktopActions}>
      <main className={styles.desktop}>
        <Wallpaper />
        <DesktopIcons onOpen={openWindow} />
        <ClockWidget />

        {openDefinitions.map((definition) => (
          <Window
            key={definition.id}
            definition={definition}
            state={state.windows[definition.id]}
            isActive={state.activeId === definition.id}
            onFocus={() => focusWindow(definition.id)}
            onClose={() => closeWindow(definition.id)}
            onMinimize={() => minimizeWindow(definition.id)}
            onToggleMaximize={() => toggleMaximize(definition.id)}
            onTitlePointerDown={(event) => beginDrag(event, definition.id)}
          >
            {renderWindowContent(definition.id)}
          </Window>
        ))}

        {startMenu.isOpen && <StartMenu onOpen={openAndCloseMenu} />}

        <Taskbar
          windows={state.windows}
          openIds={openIds}
          activeId={state.activeId}
          startOpen={startMenu.isOpen}
          onToggleStart={startMenu.toggle}
          onOpen={openWindow}
          onFocus={focusWindow}
        />
      </main>
    </DesktopActionsProvider>
  );
}
