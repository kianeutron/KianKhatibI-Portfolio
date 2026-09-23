/**
 * Pure calculator logic: an expression evaluator and the keypad state machine.
 * Kept free of React so it can be unit-tested in isolation.
 */

export const OPERATORS = ['+', '-', '*', '/'] as const;
export type Operator = (typeof OPERATORS)[number];

export const ERROR_DISPLAY = 'Error';

const PRECEDENCE: Record<Operator, number> = { '+': 1, '-': 1, '*': 2, '/': 2 };
const TOKEN_PATTERN = /\d+\.?\d*|\.\d+|[+\-*/]/g;
const OPERATOR_PATTERN = /[+\-*/]/;
const TRAILING_OPERATOR_PATTERN = /[+\-*/]$/;

export class CalculatorError extends Error {}

function isOperator(value: string): value is Operator {
  return (OPERATORS as readonly string[]).includes(value);
}

function tokenize(expression: string): string[] {
  const compact = expression.replace(/\s+/g, '');
  const tokens = compact.match(TOKEN_PATTERN) ?? [];

  if (!compact || tokens.join('') !== compact || TRAILING_OPERATOR_PATTERN.test(compact)) {
    throw new CalculatorError('Invalid expression');
  }
  return tokens;
}

function applyOperator(operator: Operator, left: number, right: number): number {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      if (right === 0) throw new CalculatorError('Cannot divide by zero');
      return left / right;
  }
}

/** Evaluates `+ - * /` expressions with standard precedence (shunting-yard). */
export function evaluateExpression(expression: string): string {
  const values: number[] = [];
  const operators: Operator[] = [];

  const reduceTop = () => {
    const operator = operators.pop();
    const right = values.pop();
    const left = values.pop();
    if (operator === undefined || left === undefined || right === undefined) {
      throw new CalculatorError('Invalid expression');
    }
    values.push(applyOperator(operator, left, right));
  };

  for (const token of tokenize(expression)) {
    if (!isOperator(token)) {
      values.push(Number(token));
      continue;
    }
    for (
      let top = operators.at(-1);
      top !== undefined && PRECEDENCE[top] >= PRECEDENCE[token];
      top = operators.at(-1)
    ) {
      reduceTop();
    }
    operators.push(token);
  }
  while (operators.length > 0) reduceTop();

  const [result] = values;
  if (values.length !== 1 || result === undefined || !Number.isFinite(result)) {
    throw new CalculatorError('Invalid expression');
  }
  return Number(result.toPrecision(12)).toString();
}

export interface CalculatorState {
  display: string;
  /** True right after `=`, so the next digit starts a fresh expression. */
  justEvaluated: boolean;
}

export const initialCalculatorState: CalculatorState = { display: '0', justEvaluated: false };

const isDigit = (key: string) => /^\d$/.test(key);
const isReset = (state: CalculatorState) => state.justEvaluated || state.display === ERROR_DISPLAY;

/** Applies one keypad key (`0-9 . + - * / = C ⌫`) to the calculator state. */
export function pressKey(state: CalculatorState, key: string): CalculatorState {
  const { display } = state;

  if (isDigit(key)) {
    const next = isReset(state) || display === '0' ? key : `${display}${key}`;
    return { display: next, justEvaluated: false };
  }

  if (key === '.') {
    if (isReset(state)) return { display: '0.', justEvaluated: false };
    const currentNumber = display.split(OPERATOR_PATTERN).pop() ?? '';
    return { display: currentNumber.includes('.') ? display : `${display}.`, justEvaluated: false };
  }

  if (isOperator(key)) {
    if (display === ERROR_DISPLAY) return { display: '0', justEvaluated: false };
    const base = TRAILING_OPERATOR_PATTERN.test(display) ? display.slice(0, -1) : display;
    return { display: `${base}${key}`, justEvaluated: false };
  }

  if (key === 'C') return initialCalculatorState;

  if (key === '⌫') {
    const canDelete = display.length > 1 && display !== ERROR_DISPLAY;
    return { display: canDelete ? display.slice(0, -1) : '0', justEvaluated: false };
  }

  if (key === '=') {
    try {
      return { display: evaluateExpression(display), justEvaluated: true };
    } catch (error) {
      if (error instanceof CalculatorError) return { display: ERROR_DISPLAY, justEvaluated: true };
      throw error;
    }
  }

  return state;
}

/** Maps a physical keyboard key to a keypad key, or `null` when it is not a calculator key. */
export function keyboardKeyToKeypadKey(key: string): string | null {
  const aliases: Record<string, string> = { Enter: '=', Escape: 'C', Backspace: '⌫' };
  const mapped = aliases[key] ?? key;
  return isDigit(mapped) || mapped === '.' || mapped === '=' || mapped === 'C' || mapped === '⌫' || isOperator(mapped)
    ? mapped
    : null;
}
