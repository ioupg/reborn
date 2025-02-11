import { hexToRGBA, lerpPalette } from './color';

const fancyColors = [
    "#f5c851", "#63a48e", "#f2eac3", "#e73427", "#0e7395", "#efd1b5",
    "#559b88", "#efad2e", "#f2d692", "#2597a4", "#e56c30", "#446269",
];

// Precalculate cos values
const cosTable = (() => {
    const table = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
        table[i] = Math.cos(i / 256 * Math.PI * 2);
    }
    return table;
})();

// Initialize canvas and its size
const canvas = document.getElementById("display");
canvas.width = 320;
canvas.height = 320;

// Grab transparent pixel buffer
const ctx = canvas.getContext("2d");
const imageData = ctx.createImageData(canvas.width, canvas.height);
const buffer = new Uint32Array(imageData.data.buffer);

// Our Plazma Effect
const plazmaParams = {
    spots: [1, 2, 3, 4],
    speeds: [0.2, 1.3, 1.4, 2.5],
    palette: lerpPalette(fancyColors.map(hexToRGBA), 256)
};

function drawPlasma() {
    const palette = plazmaParams.palette;
    let p1 = plazmaParams.spots[0];
    let p2 = plazmaParams.spots[1];
    let ofs0 = 0;
    let ofs1 = 1;
    for(let y = 0; y < canvas.height; y++) {
        let p3 = plazmaParams.spots[2];
        let p4 = plazmaParams.spots[3];
        const vwave = cosTable[Math.floor(p1) % 256] + cosTable[Math.floor(p2) % 256];
        for(let x = 0; x < canvas.width; x+=2) {
            {
                const waves = vwave + cosTable[Math.floor(p3) % 256] + cosTable[Math.floor(p4) % 256];
                p3 += 0.4;
                p4 += 0.3;
                const color = palette[(Math.floor(waves * 64) & 0xff)];
                buffer[y * canvas.width + x+ ofs0] = color;
            }
            {
                const waves = vwave + cosTable[Math.floor(p3) % 256] + cosTable[Math.floor(p4) % 256];
                p3 += 0.4;
                p4 += 0.3;
                const color = palette[(Math.floor(waves * 64) & 0xff)];
                buffer[y * canvas.width + x + ofs1] = color;
            }
        }
        [ofs0, ofs1] = [ofs1, ofs0];
        
        p1 += 0.2;
        p2 += 0.5;
    }
}

// Animation loop
let runAnimation = true;

function animate() {
    drawPlasma();
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(animate);

    if (runAnimation) {
        for(let i = 0; i < 4; i++) {
            plazmaParams.spots[i] = (plazmaParams.spots[i]+ plazmaParams.speeds[i]) % 256;
        }
    }
}

window.addEventListener("keypress", (k) => {
    if (k.key == " ") {
        runAnimation = !runAnimation;
    }
});

requestAnimationFrame(animate);