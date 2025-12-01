/**
 * main.ts
 * Bootstraps the p5.js sketch inside the Vite application shell
 *
 * Dependencies: p5.js, sketch.ts, constants.ts, style.css
 * Exports: none
 */
import "./style.css";
import p5 from "p5";
import { createSketch } from "./sketch";
import { APP_VERSION } from "./constants";

const mountSketch = () => new p5(createSketch());
let sketchInstance = mountSketch();

document.documentElement.setAttribute("data-app-version", APP_VERSION);

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    if (sketchInstance) {
      sketchInstance.remove();
    }
    sketchInstance = mountSketch();
  });

  import.meta.hot.dispose(() => {
    if (sketchInstance) {
      sketchInstance.remove();
    }
  });
}
