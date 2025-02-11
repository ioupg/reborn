import { add } from './adder';

describe('add', () => {
    test('adds two positive numbers', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('adds a positive and negative number', () => {
        expect(add(5, -3)).toBe(2);
    });

    test('adds two negative numbers', () => {
        expect(add(-1, -2)).toBe(-3);
    });

    test('adds zero to a number', () => {
        expect(add(5, 0)).toBe(5);
    });

    test('adds decimal numbers', () => {
        expect(add(1.5, 2.7)).toBeCloseTo(4.2);
    });
});