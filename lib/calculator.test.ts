import { describe, expect, it } from 'vitest';
import {
  CalculatorError,
  ERROR_DISPLAY,
  evaluateExpression,
  initialCalculatorState,
  keyboardKeyToKeypadKey,
  pressKey,
  type CalculatorState,
} from './calculator';

const pressAll = (keys: string[], start: CalculatorState = initialCalculatorState) => keys.reduce(pressKey, start);

describe('evaluateExpression', () => {
  it.each([
    ['1+2', '3'],
    ['12+3*2', '18'],
    ['10-4-3', '3'],
    ['8/2/2', '2'],
    ['2*3+4*5', '26'],
    ['1.5+.5', '2'],
    ['5.', '5'],
    [' 7 * 6 ', '42'],
  ])('%s = %s', (expression, expected) => {
    expect(evaluateExpression(expression)).toBe(expected);
  });

  it('rounds floating point noise', () => {
    expect(evaluateExpression('0.1+0.2')).toBe('0.3');
  });

  it('rejects division by zero', () => {
    expect(() => evaluateExpression('5/0')).toThrow(CalculatorError);
  });

  it.each(['', '+', '5+', '*3', '5**2', '5+-2', 'abc', '1..2'])('rejects malformed input %j', (expression) => {
    expect(() => evaluateExpression(expression)).toThrow(CalculatorError);
  });
});

describe('pressKey', () => {
  it('replaces the initial zero with the first digit', () => {
    expect(pressAll(['7']).display).toBe('7');
  });

  it('builds and evaluates an expression', () => {
    expect(pressAll(['1', '2', '+', '3', '=']).display).toBe('15');
  });

  it('starts a fresh expression with a digit after evaluating', () => {
    expect(pressAll(['2', '+', '2', '=', '9']).display).toBe('9');
  });

  it('continues from the result when an operator follows evaluation', () => {
    expect(pressAll(['2', '+', '2', '=', '*', '3', '=']).display).toBe('12');
  });

  it('replaces a trailing operator instead of stacking them', () => {
    expect(pressAll(['5', '+', '*']).display).toBe('5*');
  });

  it('allows only one decimal point per number', () => {
    expect(pressAll(['1', '.', '5', '.']).display).toBe('1.5');
    expect(pressAll(['1', '.', '5', '+', '2', '.']).display).toBe('1.5+2.');
  });

  it('shows an error for invalid results and recovers on the next digit', () => {
    const errored = pressAll(['5', '/', '0', '=']);
    expect(errored.display).toBe(ERROR_DISPLAY);
    expect(pressKey(errored, '4').display).toBe('4');
  });

  it('supports backspace and clear', () => {
    expect(pressAll(['1', '2', '⌫']).display).toBe('1');
    expect(pressAll(['1', '⌫']).display).toBe('0');
    expect(pressAll(['1', '2', 'C'])).toEqual(initialCalculatorState);
  });

  it('ignores unknown keys', () => {
    expect(pressAll(['x'])).toEqual(initialCalculatorState);
  });
});

describe('keyboardKeyToKeypadKey', () => {
  it.each([
    ['5', '5'],
    ['+', '+'],
    ['Enter', '='],
    ['Escape', 'C'],
    ['Backspace', '⌫'],
  ])('maps %s to %s', (key, expected) => {
    expect(keyboardKeyToKeypadKey(key)).toBe(expected);
  });

  it('returns null for keys that are not calculator keys', () => {
    expect(keyboardKeyToKeypadKey('a')).toBeNull();
    expect(keyboardKeyToKeypadKey('Tab')).toBeNull();
  });
});
