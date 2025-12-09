/**
 * sketch.ts
 * Karel Martens-inspired Icon Viewer generator
 * Creates a single composition with overlapping geometric shapes
 *
 * Dependencies: p5.js, constants.ts
 * Exports: createSketch()
 */
import type p5 from "p5";
import { CANVAS_DIMENSIONS, COLOR_PALETTE } from "./constants";

type SketchInitializer = (p: p5) => void;

interface Shape {
  type: "circle" | "rect";
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
}

/**
 * Creates the configured sketch function for p5 instance mode.
 * @returns {SketchInitializer}
 */
export function createSketch(): SketchInitializer {
  return (p: p5) => {
    const shapes: Shape[] = [];

    /**
     * Generate a random composition of geometric shapes
     */
    const generateComposition = () => {
      shapes.length = 0; // Clear existing shapes
      p.randomSeed(42); // Fixed seed for reproducible composition

      const shapeCount = p.floor(p.random(30, 50));

      for (let i = 0; i < shapeCount; i += 1) {
        const shapeType = p.random() > 0.6 ? "circle" : "rect";
        const x = p.random(0, CANVAS_DIMENSIONS.width);
        const y = p.random(0, CANVAS_DIMENSIONS.height);
        const size = p.random(40, 180);
        const colorIdx = p.floor(p.random(COLOR_PALETTE.length));
        const color = COLOR_PALETTE[colorIdx];
        const alpha = p.random(0.4, 0.85);

        shapes.push({ type: shapeType, x, y, size, color, alpha });
      }
    };

    p.setup = () => {
      p.createCanvas(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height).parent(
        "app",
      );
      p.noLoop(); // Static composition, no animation
      generateComposition();
    };

    p.draw = () => {
      // White background like modernist print design
      p.background(255);

      // Draw all shapes with transparency and layering
      for (const shape of shapes) {
        p.push();

        // Parse color and add alpha
        const c = p.color(shape.color);
        c.setAlpha(shape.alpha * 255);
        p.fill(c);

        // Optional subtle stroke for definition
        if (p.random() > 0.7) {
          p.stroke(0, 20);
          p.strokeWeight(1);
        } else {
          p.noStroke();
        }

        if (shape.type === "circle") {
          p.circle(shape.x, shape.y, shape.size);
        } else {
          p.rectMode(p.CENTER);
          p.rect(shape.x, shape.y, shape.size, shape.size);
        }

        p.pop();
      }

      // Add some outlined shapes for visual interest
      p.push();
      p.noFill();
      for (let i = 0; i < 10; i += 1) {
        const x = p.random(CANVAS_DIMENSIONS.width);
        const y = p.random(CANVAS_DIMENSIONS.height);
        const size = p.random(80, 200);
        const colorIdx = p.floor(p.random(COLOR_PALETTE.length));
        const strokeColor = p.color(COLOR_PALETTE[colorIdx]);
        strokeColor.setAlpha(180);
        p.stroke(strokeColor);
        p.strokeWeight(p.random(2, 6));

        if (p.random() > 0.5) {
          p.circle(x, y, size);
        } else {
          p.rectMode(p.CENTER);
          p.rect(x, y, size, size);
        }
      }
      p.pop();
    };
  };
}
