import { log as mylog } from './logger';

mylog('Hello, ','world!');

function hexToRGBA(hex) {
    const val = parseInt(hex.slice(1), 16);
    return (255 << 24) | ((val & 0xff) << 16) | ((val >> 8 & 0xff) << 8) | ((val >> 16) & 0xff);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function lerpRGBA(c1, c2, t) {
    const r1 = (c1 >> 24) & 0xff;
    const g1 = (c1 >> 16) & 0xff;
    const b1 = (c1 >> 8) & 0xff;
    const a1 = c1 & 0xff;
    const r2 = (c2 >> 24) & 0xff;
    const g2 = (c2 >> 16) & 0xff;
    const b2 = (c2 >> 8) & 0xff;
    const a2 = c2 & 0xff;
    const r = Math.floor(lerp(r1, r2, t));
    const g = Math.floor(lerp(g1, g2, t));
    const b = Math.floor(lerp(b1, b2, t));
    const a = Math.floor(lerp(a1, a2, t));
    return (r << 24) | (g << 16) | (b << 8) | a;
}

function lerpPalette(colorArray, palSize) {
    const result = new Uint32Array(palSize);
    const step = 1 / colorArray.length;
    for (let i = 0; i < palSize; i++) {
        const t = i / palSize;
        const index = Math.floor(t / step);
        const colorA = colorArray[index];
        const colorB = colorArray[(index + 1) % colorArray.length];
        result[i] = lerpRGBA(colorA, colorB, (t % step) / step);
    }
    return result;
}

const colors = [
    "#f5c851", "#63a48e", "#f2eac3", "#e73427", "#0e7395", "#efd1b5",
    "#559b88", "#efad2e", "#f2d692", "#2597a4", "#e56c30", "#446269",
];

const palette = lerpPalette(colors.map(hexToRGBA), 256);

const cosTable = (() => {
    const table = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
        table[i] = Math.cos(i / 256 * Math.PI * 2);
    }
    return table;
})();

let spots = [1, 2, 3, 4];
const spootsSpeed = [0.2, 1.3, 1.4, 2.5];

const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

const imageData = ctx.createImageData(canvas.width, canvas.height);
const buffer = new Uint32Array(imageData.data.buffer);

function drawPlasma() {
    let p1 = spots[0];
    let p2 = spots[1];
    for(let y = 0; y < canvas.height; y++) {
        let p3 = spots[2];
        let p4 = spots[3];
        const vwave = cosTable[Math.floor(p1) % 256] + cosTable[Math.floor(p2) % 256];
        for(let x = 0; x < canvas.width; x++) {
            const waves = vwave + cosTable[Math.floor(p3) % 256] + cosTable[Math.floor(p4) % 256];
            p3 += 0.4;
            p4 += 0.3;
            const color = palette[(Math.floor(waves * 64) & 0xff)];
            buffer[y * canvas.width + x] = color;
        }
        p1 += 0.2;
        p2 += 0.6;
    }
}

function animate() {
    drawPlasma();
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(animate);

    for(let i = 0; i < 4; i++) {
        spots[i] += spootsSpeed[i];
    }
}

requestAnimationFrame(animate);