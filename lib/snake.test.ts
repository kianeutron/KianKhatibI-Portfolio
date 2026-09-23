import { describe, expect, it } from 'vitest';
import {
  BOARD_SIZE,
  createInitialState,
  pickFoodCell,
  snakeReducer,
  tickInterval,
  type Point,
  type SnakeAction,
  type SnakeState,
} from './snake';

const run = (state: SnakeState, ...actions: SnakeAction[]) => actions.reduce(snakeReducer, state);
const tick: SnakeAction = { type: 'tick', random: 0 };
const running = (overrides: Partial<SnakeState> = {}): SnakeState => ({
  ...createInitialState(0),
  status: 'running',
  ...overrides,
});

describe('createInitialState', () => {
  it('starts in standby with a three-segment snake heading right', () => {
    const state = createInitialState(0.5);
    expect(state.status).toBe('standby');
    expect(state.snake).toHaveLength(3);
    expect(state.direction).toBe('right');
    expect(state.score).toBe(0);
  });

  it('never places food on the snake', () => {
    for (const random of [0, 0.25, 0.5, 0.99]) {
      const { snake, food } = createInitialState(random);
      expect(snake).not.toContainEqual(food);
    }
  });
});

describe('pickFoodCell', () => {
  it('returns null when the board is full', () => {
    const full: Point[] = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => ({
      x: i % BOARD_SIZE,
      y: Math.floor(i / BOARD_SIZE),
    }));
    expect(pickFoodCell(full, 0.5)).toBeNull();
  });
});

describe('movement', () => {
  it('moves one cell per tick without growing', () => {
    const state = running({ food: { x: 0, y: 0 } });
    const next = run(state, tick);
    expect(next.snake[0]).toEqual({ x: 10, y: 10 });
    expect(next.snake).toHaveLength(3);
  });

  it('ignores ticks unless running', () => {
    const state = createInitialState(0);
    expect(run(state, tick)).toBe(state);
  });

  it('starts running on the first turn from standby', () => {
    expect(run(createInitialState(0), { type: 'turn', direction: 'up' }).status).toBe('running');
  });

  it('rejects a 180 degree reversal', () => {
    const state = running();
    expect(run(state, { type: 'turn', direction: 'left' })).toBe(state);
  });

  it('cannot reverse by chaining two turns within one tick', () => {
    // Heading right: `up` is legal, but `left` still reverses the direction actually moved.
    const next = run(running(), { type: 'turn', direction: 'up' }, { type: 'turn', direction: 'left' });
    expect(next.nextDirection).toBe('up');
    expect(run(next, tick).status).toBe('running');
  });
});

describe('eating and scoring', () => {
  it('grows and scores when reaching food, then places new food', () => {
    const state = running({ food: { x: 10, y: 10 } });
    const next = run(state, { type: 'tick', random: 0 });
    expect(next.snake).toHaveLength(4);
    expect(next.score).toBe(1);
    expect(next.food).not.toBeNull();
    expect(next.snake).not.toContainEqual(next.food);
  });
});

describe('game over', () => {
  it('ends on a wall hit and records the best score', () => {
    const state = running({
      snake: [
        { x: BOARD_SIZE - 1, y: 5 },
        { x: BOARD_SIZE - 2, y: 5 },
      ],
      score: 4,
      food: { x: 0, y: 0 },
    });
    const next = run(state, tick);
    expect(next.status).toBe('over');
    expect(next.bestScore).toBe(4);
  });

  it('ends when the snake runs into itself', () => {
    const state = running({
      snake: [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 6, y: 6 },
        { x: 6, y: 5 },
        { x: 6, y: 4 },
      ],
      direction: 'up',
      nextDirection: 'right',
      food: { x: 0, y: 0 },
    });
    expect(run(state, tick).status).toBe('over');
  });

  it('ignores turns after game over and restarts with the best score kept', () => {
    const over = running({ status: 'over', bestScore: 7 });
    expect(run(over, { type: 'turn', direction: 'up' })).toBe(over);
    const restarted = run(over, { type: 'start', random: 0 });
    expect(restarted.status).toBe('running');
    expect(restarted.bestScore).toBe(7);
    expect(restarted.score).toBe(0);
  });
});

describe('pause', () => {
  it('toggles between running and paused only', () => {
    const paused = run(running(), { type: 'togglePause' });
    expect(paused.status).toBe('paused');
    expect(run(paused, { type: 'togglePause' }).status).toBe('running');
    const standby = createInitialState(0);
    expect(run(standby, { type: 'togglePause' })).toBe(standby);
  });
});

describe('tickInterval', () => {
  it('speeds up with score and bottoms out at 72ms', () => {
    expect(tickInterval(0)).toBe(150);
    expect(tickInterval(10)).toBeLessThan(tickInterval(0));
    expect(tickInterval(18)).toBe(78);
    expect(tickInterval(1000)).toBe(78);
    expect(tickInterval(1000)).toBeGreaterThanOrEqual(72);
  });
});
