'use client';

import { useEffect, useMemo, useReducer } from 'react';
import {
  BOARD_SIZE,
  createInitialState,
  isSamePoint,
  snakeReducer,
  tickInterval,
  type Direction,
  type SnakeStatus,
} from '@/lib/snake';
import { cx } from '@/lib/cx';
import styles from './SnakeGame.module.css';

const KEY_TO_DIRECTION: Record<string, Direction> = {
  arrowup: 'up',
  w: 'up',
  arrowdown: 'down',
  s: 'down',
  arrowleft: 'left',
  a: 'left',
  arrowright: 'right',
  d: 'right',
};

const STATUS_LABEL: Record<SnakeStatus, string> = {
  standby: 'STANDBY',
  running: 'RUNNING',
  paused: 'PAUSED',
  over: 'SIGNAL LOST',
};

const PAD_BUTTONS: ReadonlyArray<{ direction: Direction; glyph: string; label: string }> = [
  { direction: 'up', glyph: '▲', label: 'Move up' },
  { direction: 'left', glyph: '◀', label: 'Move left' },
  { direction: 'down', glyph: '▼', label: 'Move down' },
  { direction: 'right', glyph: '▶', label: 'Move right' },
];

const pad = (value: number) => String(value).padStart(3, '0');

interface SnakeGameProps {
  /** When false, keyboard input is ignored (e.g. the hosting window lost focus). */
  active?: boolean;
}

export default function SnakeGame({ active = true }: SnakeGameProps) {
  const [state, dispatch] = useReducer(snakeReducer, undefined, () => createInitialState(Math.random()));
  const { snake, food, score, bestScore, status } = state;

  useEffect(() => {
    if (!active) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const direction = KEY_TO_DIRECTION[key];

      if (direction) {
        event.preventDefault();
        dispatch({ type: 'turn', direction });
      } else if (key === ' ' || key === 'p') {
        event.preventDefault();
        dispatch({ type: 'togglePause' });
      } else if (key === 'enter' && (status === 'standby' || status === 'over')) {
        event.preventDefault();
        dispatch({ type: 'start', random: Math.random() });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, status]);

  useEffect(() => {
    if (status !== 'running') return undefined;
    const timer = window.setInterval(() => dispatch({ type: 'tick', random: Math.random() }), tickInterval(score));
    return () => window.clearInterval(timer);
  }, [status, score]);

  const snakeCells = useMemo(() => new Set(snake.map(({ x, y }) => `${x}:${y}`)), [snake]);
  const head = snake[0];
  const label = STATUS_LABEL[status];
  const start = () => dispatch({ type: 'start', random: Math.random() });

  return (
    <section className={styles.game} aria-label="Retro Snake game">
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>KIAN_OS // ARCADE UNIT 01</p>
          <h2>SNAKE.EXE</h2>
        </div>
        <div className={styles.status} data-state={status}>
          {label}
        </div>
      </header>

      <div className={styles.scorebar}>
        <span>
          SCORE <strong>{pad(score)}</strong>
        </span>
        <span>
          HI-SCORE <strong>{pad(Math.max(bestScore, score))}</strong>
        </span>
        <span className={styles.controlsHint}>ARROWS / WASD / P</span>
      </div>

      <div className={styles.playfieldWrap}>
        <div className={styles.playfield} role="grid" aria-label={`Snake board. ${label}. Score ${score}.`}>
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
            const cell = { x: index % BOARD_SIZE, y: Math.floor(index / BOARD_SIZE) };
            const isHead = head !== undefined && isSamePoint(head, cell);
            const isSnake = isHead || snakeCells.has(`${cell.x}:${cell.y}`);
            const isFood = food !== null && isSamePoint(food, cell);

            return (
              <span
                key={index}
                role="gridcell"
                className={cx(styles.cell, isSnake && styles.snake, isHead && styles.head, isFood && styles.food)}
              />
            );
          })}

          {status === 'standby' && <Overlay glyph="◆" title="INSERT COIN" hint="PRESS START OR MOVE" />}
          {status === 'paused' && <Overlay glyph="Ⅱ" title="PAUSED" hint="PRESS P TO RESUME" />}
          {status === 'over' && <Overlay glyph="×" title="GAME OVER" hint="PRESS ENTER OR RESTART" />}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.actionButton} onClick={start}>
          {status === 'over' ? 'RESTART' : 'START / RESET'}
        </button>
        <button
          type="button"
          className={styles.actionButton}
          onClick={() => dispatch({ type: 'togglePause' })}
          disabled={status !== 'running' && status !== 'paused'}
        >
          {status === 'paused' ? 'RESUME' : 'PAUSE'}
        </button>
      </div>

      <div className={styles.dpad} aria-label="Touch controls">
        {PAD_BUTTONS.map(({ direction, glyph, label: buttonLabel }) => (
          <button
            key={direction}
            type="button"
            className={cx(styles.padButton, styles[direction])}
            aria-label={buttonLabel}
            onClick={() => dispatch({ type: 'turn', direction })}
          >
            {glyph}
          </button>
        ))}
      </div>

      <p className={styles.footer}>EAT THE PIXEL // AVOID THE VOID // P TO PAUSE</p>
    </section>
  );
}

function Overlay({ glyph, title, hint }: { glyph: string; title: string; hint: string }) {
  return (
    <div className={styles.overlay}>
      <span className={styles.overlayGlyph}>{glyph}</span>
      <strong>{title}</strong>
      <span>{hint}</span>
    </div>
  );
}
