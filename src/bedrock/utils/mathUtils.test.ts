import { lerp, smooth, clamp } from './mathUtils';

describe('mathUtils', () => {
    describe('lerp', () => {
        test('interpolates between two values', () => {
            expect(lerp(0, 10, 0.5)).toBe(5);
            expect(lerp(0, 10, 0)).toBe(0);
            expect(lerp(0, 10, 1)).toBe(10);
        });
    });

    describe('smooth', () => {
        test('smoothly interpolates between values', () => {
            expect(smooth(0, 10, 0.5)).toBeCloseTo(5);
            expect(smooth(0, 10, 0)).toBe(0);
            expect(smooth(0, 10, 1)).toBe(10);
        });
    });

    describe('clamp', () => {
        test('clamps value between min and max', () => {
            expect(clamp(5, 0, 10)).toBe(5);
            expect(clamp(-1, 0, 10)).toBe(0);
            expect(clamp(11, 0, 10)).toBe(10);
        });
    });
});