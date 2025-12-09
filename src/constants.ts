/**
 * constants.ts
 * Shared configuration for the p5.js boilerplate
 *
 * Dependencies: none
 * Exports: APP_VERSION, CANVAS_DIMENSIONS, COLOR_PALETTE
 */
export const APP_VERSION = "v0.0.0";

export const CANVAS_DIMENSIONS = Object.freeze({
  width: 640,
  height: 640,
});

// Karel Martens-inspired color palette - bold, modernist colors
export const COLOR_PALETTE = Object.freeze([
  "#E63946", // Red
  "#F1C40F", // Yellow
  "#3498DB", // Blue
  "#2ECC71", // Green
  "#9B59B6", // Purple
  "#E67E22", // Orange
  "#1ABC9C", // Turquoise
  "#34495E", // Dark Gray
]);
