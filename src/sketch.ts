/**
 * sketch.ts
 * Primary p5 sketch that renders a looping geometric pattern
 *
 * Dependencies: p5.js, constants.ts
 * Exports: createSketch()
 */
import type p5 from "p5";
import { CANVAS_DIMENSIONS, COLOR_PALETTE } from "./constants";

type SketchInitializer = (p: p5) => void;

/**
 * Creates the configured sketch function for p5 instance mode.
 * @returns {SketchInitializer}
 */
export function createSketch(): SketchInitializer {
  return (p: p5) => {
    let tick = 0;
    const centerX = CANVAS_DIMENSIONS.width / 2;
    const centerY = CANVAS_DIMENSIONS.height / 2;

    p.setup = () => {
      p.createCanvas(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height).parent(
        "app",
      );
      p.noiseSeed(Math.random() * 1_000_000);
      p.noStroke();
    };

    p.draw = () => {
      p.background("#030712");
      tick += 0.01;

      // Layer 1: 4 rotation-symmetrical squares
      p.push();
      p.blendMode(p.MULTIPLY);
      p.fill(COLOR_PALETTE[0]);
      p.translate(centerX, centerY);
      for (let i = 0; i < 4; i += 1) {
        p.push();
        p.rotate((p.TWO_PI / 4) * i + tick);
        const squareSize = 200 + p.noise(tick) * 50;
        p.rectMode(p.CENTER);
        p.rect(150, 0, squareSize, squareSize);
        p.pop();
      }
      p.pop();

      // Layer 2: One large circle
      p.push();
      p.blendMode(p.MULTIPLY);
      p.fill(COLOR_PALETTE[2]);
      const circleSize = 400 + p.noise(tick + 100) * 100;
      p.circle(centerX, centerY, circleSize);
      p.pop();

      // Layer 3: Triangle stack
      p.push();
      p.blendMode(p.MULTIPLY);
      p.fill(COLOR_PALETTE[4]);
      const triangleCount = 5;
      for (let i = 0; i < triangleCount; i += 1) {
        const size = 150 - i * 25 + p.noise(tick + i * 10) * 20;
        const yOffset = centerY - 100 + i * 40;
        p.triangle(
          centerX - size / 2,
          yOffset + size / 2,
          centerX + size / 2,
          yOffset + size / 2,
          centerX,
          yOffset - size / 2,
        );
      }
      p.pop();
    };
  };
}
