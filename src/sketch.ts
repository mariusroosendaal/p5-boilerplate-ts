/**
 * sketch.ts
 * Karel Martens-inspired geometric grid sketch
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
  const columns = 8;
  const rows = 8;
  const cellSize = CANVAS_DIMENSIONS.width / columns;

  // Per-cell configuration determined at setup
  const cellConfigs: {
    symmetry: number;
    shapes: string[];
    sizes: number[];
    colors: string[];
    numCircles: number[];
    arcAngles: number[];
    wedgeAngles: number[];
  }[] = [];

  return (p: p5) => {
    p.setup = () => {
      p.createCanvas(CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height).parent(
        "app",
      );
      p.noStroke();
      p.randomSeed(42); // Fixed seed for consistent results

      // Generate unique configuration for each cell
      for (let i = 0; i < rows * columns; i++) {
        const symmetries = [4, 6, 8];
        const symmetry = p.random(symmetries);
        const shapeTypes = [
          "circles",
          "bars",
          "arcs",
          "wedges",
          "spokes",
          "cross",
        ];

        // Randomly select 2-4 shape types per cell
        const numShapes = p.floor(p.random(2, 5));
        const shapes: string[] = [];
        for (let j = 0; j < numShapes; j++) {
          shapes.push(p.random(shapeTypes));
        }

        // Random sizes for variation
        const sizes = [
          p.random(0.3, 0.8),
          p.random(0.4, 0.7),
          p.random(0.2, 0.6),
        ];

        // Random color selection (2-3 colors per cell)
        const numColors = p.floor(p.random(2, 4));
        const colors: string[] = [];
        for (let j = 0; j < numColors; j++) {
          colors.push(p.random(COLOR_PALETTE));
        }

        // Pre-generate random parameters for drawing functions
        const numCircles = [
          p.floor(p.random(2, 4)),
          p.floor(p.random(2, 4)),
          p.floor(p.random(2, 4)),
        ];
        const arcAngleOptions = [p.PI / 2, p.PI / 3, p.PI / 4];
        const arcAngles = [
          p.random(arcAngleOptions),
          p.random(arcAngleOptions),
          p.random(arcAngleOptions),
        ];
        const wedgeAngleOptions = [p.PI / 3, p.PI / 4, p.PI / 6];
        const wedgeAngles = [
          p.random(wedgeAngleOptions),
          p.random(wedgeAngleOptions),
          p.random(wedgeAngleOptions),
        ];

        cellConfigs.push({
          symmetry,
          shapes,
          sizes,
          colors,
          numCircles,
          arcAngles,
          wedgeAngles,
        });
      }
    };

    p.draw = () => {
      p.background(255); // White background
      p.blendMode(p.MULTIPLY); // Multiply for overlapping colors

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const idx = y * columns + x;
          const config = cellConfigs[idx];
          const cx = x * cellSize + cellSize / 2;
          const cy = y * cellSize + cellSize / 2;

          p.push();
          p.translate(cx, cy);

          // Draw each shape type with the cell's configuration
          config.shapes.forEach((shapeType, shapeIdx) => {
            const size = config.sizes[shapeIdx % config.sizes.length];
            const color = config.colors[shapeIdx % config.colors.length];

            drawSymmetricShape(
              p,
              shapeType,
              config.symmetry,
              size * cellSize * 0.4,
              color,
              config.numCircles[shapeIdx % config.numCircles.length],
              config.arcAngles[shapeIdx % config.arcAngles.length],
              config.wedgeAngles[shapeIdx % config.wedgeAngles.length],
            );
          });

          p.pop();
        }
      }

      p.noLoop(); // Static image
    };
  };
}

/**
 * Draws a shape with radial symmetry
 */
function drawSymmetricShape(
  p: p5,
  shapeType: string,
  symmetry: number,
  size: number,
  color: string,
  numCircles: number,
  arcAngle: number,
  wedgeAngle: number,
): void {
  const angle = p.TWO_PI / symmetry;

  for (let i = 0; i < symmetry; i++) {
    p.push();
    p.rotate(i * angle);

    p.fill(color);

    switch (shapeType) {
      case "circles":
        drawConcentricCircles(p, size, numCircles);
        break;
      case "bars":
        drawRotatedBar(p, size);
        break;
      case "arcs":
        drawArc(p, size, arcAngle);
        break;
      case "wedges":
        drawWedge(p, size, wedgeAngle);
        break;
      case "spokes":
        drawSpoke(p, size);
        break;
      case "cross":
        drawCross(p, size);
        break;
    }

    p.pop();
  }
}

/**
 * Draw concentric circles
 */
function drawConcentricCircles(p: p5, size: number, numCircles: number): void {
  for (let i = 0; i < numCircles; i++) {
    const r = size * (1 - i * 0.3);
    p.circle(0, 0, r);
  }
}

/**
 * Draw a rotated rectangular bar
 */
function drawRotatedBar(p: p5, size: number): void {
  const w = size * 0.15;
  const h = size;
  p.rect(-w / 2, 0, w, h);
}

/**
 * Draw a circular arc
 */
function drawArc(p: p5, size: number, arcAngle: number): void {
  const startAngle = 0;
  const endAngle = arcAngle;
  p.arc(0, 0, size, size, startAngle, endAngle, p.PIE);
}

/**
 * Draw a wedge (pie slice)
 */
function drawWedge(p: p5, size: number, wedgeAngle: number): void {
  p.arc(0, 0, size, size, -wedgeAngle / 2, wedgeAngle / 2, p.PIE);
}

/**
 * Draw a radial spoke (line from center)
 */
function drawSpoke(p: p5, size: number): void {
  const w = size * 0.1;
  p.rect(-w / 2, 0, w, size * 0.8);
}

/**
 * Draw a cross shape
 */
function drawCross(p: p5, size: number): void {
  const w = size * 0.15;
  const h = size * 0.6;
  // Vertical bar
  p.rect(-w / 2, -h / 2, w, h);
  // Horizontal bar
  p.push();
  p.rotate(p.PI / 2);
  p.rect(-w / 2, -h / 2, w, h);
  p.pop();
}
