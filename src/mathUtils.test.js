import { lerp, smooth, clamp } from './mathUtils';

describe('Math Utilities', () => {
    describe('lerp', () => {
        test('interpolates at t=0', () => {
            expect(lerp(0, 10, 0)).toBe(0);
        });

        test('interpolates at t=1', () => {
            expect(lerp(0, 10, 1)).toBe(10);
        });

        test('interpolates at t=0.5', () => {
            expect(lerp(0, 10, 0.5)).toBe(5);
        });
    });

    describe('smooth', () => {
        test('smooth interpolation at t=0', () => {
            expect(smooth(0, 10, 0)).toBe(0);
        });

        test('smooth interpolation at t=1', () => {
            expect(smooth(0, 10, 1)).toBe(10);
        });

        test('smooth interpolation at t=0.5', () => {
            const result = smooth(0, 10, 0.5);
            expect(result).toBeCloseTo(5, 2);
        });
    });

    describe('clamp', () => {
        test('returns value when within range', () => {
            expect(clamp(5, 0, 10)).toBe(5);
        });

        test('returns min when value is below range', () => {
            expect(clamp(-5, 0, 10)).toBe(0);
        });

        test('returns max when value is above range', () => {
            expect(clamp(15, 0, 10)).toBe(10);
        });
    });
});