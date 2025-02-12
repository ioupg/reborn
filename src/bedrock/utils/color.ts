import { lerp, smooth } from './math';

export function hexToRGBA(hex: string): number {
    const val = parseInt(hex.slice(1), 16);
    return (255 << 24) | ((val & 0xff) << 16) | ((val >> 8 & 0xff) << 8) | ((val >> 16) & 0xff);
}

export function lerpRGBA(c1: number, c2: number, t: number, interp: typeof lerp = lerp): number {
    const r = Math.floor(interp((c1 >> 24) & 0xff, (c2 >> 24) & 0xff, t));
    const g = Math.floor(interp((c1 >> 16) & 0xff, (c2 >> 16) & 0xff, t));
    const b = Math.floor(interp((c1 >> 8) & 0xff, (c2 >> 8) & 0xff, t));
    const a = Math.floor(interp(c1 & 0xff, c2 & 0xff, t));
    return (r << 24) | (g << 16) | (b << 8) | a;
}

export function lerpPalette(colorArray: number[], palSize: number): Uint32Array {
    const result = new Uint32Array(palSize);
    const step = 1 / colorArray.length;
    for (let i = 0; i < palSize; i++) {
        const t = i / palSize;
        const index = Math.floor(t / step);
        const colorA = colorArray[index];
        const colorB = colorArray[(index + 1) % colorArray.length];
        result[i] = lerpRGBA(colorA, colorB, (t % step) / step, smooth);
    }
    return result;
}