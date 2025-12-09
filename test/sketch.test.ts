/**
 * sketch.test.ts
 * Ensures the sketch creates canvases with the configured dimensions.
 *
 * Dependencies: vitest, src/sketch.ts, src/constants.ts, p5
 * Exports: none
 */
import type p5 from "p5";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CANVAS_DIMENSIONS } from "../src/constants";
import { createSketch } from "../src/sketch";

describe("createSketch", () => {
  let parentSpy: ReturnType<typeof vi.fn>;
  let pStub: p5;

  const DEFAULT_SYMMETRY = 4;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    parentSpy = vi.fn();

    const canvasStub = { parent: parentSpy };

    pStub = {
      createCanvas: vi.fn(() => canvasStub),
      noiseSeed: vi.fn(),
      noStroke: vi.fn(),
      background: vi.fn(),
      noise: vi.fn(() => 0),
      push: vi.fn(),
      blendMode: vi.fn(),
      fill: vi.fn(),
      circle: vi.fn(),
      pop: vi.fn(),
      stroke: vi.fn(),
      noFill: vi.fn(),
      randomSeed: vi.fn(),
      random: vi.fn((arg) => {
        if (Array.isArray(arg)) return arg[0];
        if (typeof arg === "number") return arg;
        return DEFAULT_SYMMETRY;
      }),
      floor: vi.fn((n) => Math.floor(n)),
      translate: vi.fn(),
      rotate: vi.fn(),
      rect: vi.fn(),
      arc: vi.fn(),
      noLoop: vi.fn(),
      SCREEN: 1,
      MULTIPLY: 2,
      TWO_PI: Math.PI * 2,
      PI: Math.PI,
      PIE: "pie",
    } as unknown as p5;
  });

  it("creates a canvas sized from CANVAS_DIMENSIONS", () => {
    const sketch = createSketch();
    sketch(pStub);
    expect(typeof pStub.setup).toBe("function");

    pStub.setup?.();

    expect(pStub.createCanvas).toHaveBeenCalledWith(
      CANVAS_DIMENSIONS.width,
      CANVAS_DIMENSIONS.height,
    );
    expect(parentSpy).toHaveBeenCalledWith("app");
  });
});
