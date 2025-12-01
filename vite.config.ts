/**
 * vite.config.ts
 * Vite configuration for the p5.js boilerplate
 *
 * Dependencies: vitest/config
 * Exports: defineConfig()
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "./",
  test: {
    environment: "jsdom",
  },
});
