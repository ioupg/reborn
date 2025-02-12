export function lerp<T extends number>(a: T, b: T, t: number): number {
    return a + (b - a) * t;
}

export function smooth<T extends number>(a: T, b: T, t: number): number {
    return lerp(a, b, t * t * (3 - 2 * t));
}

export function clamp<T extends number>(x: T, min: T, max: T): T {
    return Math.min(Math.max(x, min), max) as T;
}