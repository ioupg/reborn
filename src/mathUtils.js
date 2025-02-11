export function lerp(a, b, t) {
    return a + (b - a) * t;
}

export function smooth(a, b, t) {
    return lerp(a, b, t * t * (3 - 2 * t));
}

export function clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
