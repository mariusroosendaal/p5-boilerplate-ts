/**
 * sketch.js
 * Primary p5 sketch that renders a looping geometric pattern
 *
 * Dependencies: p5.js, constants.js
 * Exports: createSketch()
 */
import { CANVAS_DIMENSIONS, COLOR_PALETTE } from './constants.js';

/**
 * Creates the configured sketch function for p5 instance mode.
 * @returns {(p: import('p5')) => void}
 */
export function createSketch() {
  const columns = 8;
  const rows = 8;
  const cellSize = CANVAS_DIMENSIONS.width / columns;

  return (p) => {
    let tick = 0;

    p.setup = () => {
      p.createCanvas(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height).parent('app');
      p.noiseSeed(Math.random() * 1_000_000);
      p.noStroke();
    };

    p.draw = () => {
      p.background('#030712');
      tick += 0.01;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const idx = (x + y) % COLOR_PALETTE.length;
          const color = COLOR_PALETTE[idx];
          const cx = x * cellSize + cellSize / 2;
          const cy = y * cellSize + cellSize / 2;
          const noiseOffset = p.noise(x * 0.2, y * 0.2, tick);
          const radius = cellSize * 0.35 + noiseOffset * cellSize * 0.15;

          // Draw layered circles with additive blending for softness
          p.push();
          p.blendMode(p.SCREEN);
          p.fill(color);
          p.circle(cx, cy, radius);
          p.pop();

          p.push();
          p.stroke(255, 255, 255, 35);
          p.noFill();
          p.circle(cx, cy, radius * 1.4);
          p.pop();
        }
      }
    };
  };
}
