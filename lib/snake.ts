/**
 * Pure Snake game rules. The reducer is deterministic: randomness is passed in
 * through actions so the game can be tested and replayed.
 */

export interface Point {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';
export type SnakeStatus = 'standby' | 'running' | 'paused' | 'over';

export const BOARD_SIZE = 20;

const DELTAS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
};

const START_SNAKE: readonly Point[] = [
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];

export interface SnakeState {
  snake: readonly Point[];
  food: Point | null;
  /** Direction the snake moved on the last tick; turns are validated against it. */
  direction: Direction;
  /** Direction requested for the next tick. */
  nextDirection: Direction;
  score: number;
  bestScore: number;
  status: SnakeStatus;
}

export type SnakeAction =
  | { type: 'start'; random: number }
  | { type: 'turn'; direction: Direction }
  | { type: 'togglePause' }
  | { type: 'tick'; random: number };

export const isSamePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

/** Picks a free cell using `random` in [0, 1); `null` when the board is full. */
export function pickFoodCell(snake: readonly Point[], random: number): Point | null {
  const free: Point[] = [];
  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const cell = { x, y };
      if (!snake.some((segment) => isSamePoint(segment, cell))) free.push(cell);
    }
  }
  return free[Math.floor(random * free.length)] ?? null;
}

export function createInitialState(random: number, bestScore = 0): SnakeState {
  return {
    snake: START_SNAKE,
    food: pickFoodCell(START_SNAKE, random),
    direction: 'right',
    nextDirection: 'right',
    score: 0,
    bestScore,
    status: 'standby',
  };
}

/** Milliseconds between ticks; the game speeds up as the score grows. */
export function tickInterval(score: number): number {
  return Math.max(72, 150 - Math.min(score, 18) * 4);
}

function advance(state: SnakeState, random: number): SnakeState {
  const head = state.snake[0];
  if (!head) return state;

  const delta = DELTAS[state.nextDirection];
  const nextHead = { x: head.x + delta.x, y: head.y + delta.y };
  const hitWall = nextHead.x < 0 || nextHead.x >= BOARD_SIZE || nextHead.y < 0 || nextHead.y >= BOARD_SIZE;
  const ateFood = state.food !== null && isSamePoint(nextHead, state.food);
  // The tail cell is vacated on a normal move, so only check it when growing.
  const body = ateFood ? state.snake : state.snake.slice(0, -1);
  const hitSelf = body.some((segment) => isSamePoint(segment, nextHead));

  if (hitWall || hitSelf) {
    return { ...state, status: 'over', bestScore: Math.max(state.bestScore, state.score) };
  }

  const grown = [nextHead, ...state.snake];
  const snake = ateFood ? grown : grown.slice(0, -1);
  const score = ateFood ? state.score + 1 : state.score;
  const food = ateFood ? pickFoodCell(snake, random) : state.food;
  const boardFull = ateFood && food === null;

  return {
    ...state,
    snake,
    food,
    score,
    direction: state.nextDirection,
    bestScore: boardFull ? Math.max(state.bestScore, score) : state.bestScore,
    status: boardFull ? 'over' : state.status,
  };
}

export function snakeReducer(state: SnakeState, action: SnakeAction): SnakeState {
  switch (action.type) {
    case 'start':
      return { ...createInitialState(action.random, state.bestScore), status: 'running' };

    case 'turn': {
      if (state.status === 'over' || OPPOSITES[state.direction] === action.direction) return state;
      return {
        ...state,
        nextDirection: action.direction,
        status: state.status === 'standby' ? 'running' : state.status,
      };
    }

    case 'togglePause':
      if (state.status === 'running') return { ...state, status: 'paused' };
      if (state.status === 'paused') return { ...state, status: 'running' };
      return state;

    case 'tick':
      return state.status === 'running' ? advance(state, action.random) : state;
  }
}
