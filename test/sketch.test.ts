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
      translate: vi.fn(),
      rotate: vi.fn(),
      rect: vi.fn(),
      rectMode: vi.fn(),
      triangle: vi.fn(),
      TWO_PI: Math.PI * 2,
      CENTER: 1,
      MULTIPLY: 2,
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
