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
      noLoop: vi.fn(),
      randomSeed: vi.fn(),
      random: vi.fn(() => 0.5),
      floor: vi.fn((n: number) => Math.floor(n)),
      background: vi.fn(),
      noise: vi.fn(() => 0),
      push: vi.fn(),
      blendMode: vi.fn(),
      fill: vi.fn(),
      circle: vi.fn(),
      pop: vi.fn(),
      stroke: vi.fn(),
      noFill: vi.fn(),
      strokeWeight: vi.fn(),
      rectMode: vi.fn(),
      rect: vi.fn(),
      color: vi.fn(() => ({
        setAlpha: vi.fn(),
      })),
      SCREEN: 1,
      CENTER: 0,
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
