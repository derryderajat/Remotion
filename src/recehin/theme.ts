// Central design tokens for the Recehin promo video.
// One brand system: blue gradient on soft white, rounded everything, Poppins.

export const FPS = 30;
export const DURATION_IN_FRAMES = 1800; // 60s
export const WIDTH = 1080;
export const HEIGHT = 1920;

// Instagram carousel format (4:5).
export const CAROUSEL_W = 1080;
export const CAROUSEL_H = 1350;

export const colors = {
  blue: "#1E6FF0",
  blueLight: "#4A9EFF",
  blueDeep: "#0B4FC0",
  ink: "#0E1B33",
  inkSoft: "#5B6B85",
  bg0: "#FFFFFF",
  bg1: "#EAF1FF",
  bg2: "#F4F8FF",
  white: "#FFFFFF",
  whatsapp: "#25D366",
  chipBlueBg: "rgba(30,111,240,0.10)",
  // Brand logo (2026 refresh): black "R" on a golden-yellow squircle.
  brandYellow: "#F5B300",
  brandYellowDeep: "#E0A200",
  logoInk: "#171512",
};

// Canonical product URL (shown on CTAs / posters).
export const DOMAIN = "recehin.id";

export const gradient = {
  brand: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.blueLight} 100%)`,
  brandDeep: `linear-gradient(135deg, ${colors.blueDeep} 0%, ${colors.blue} 60%, ${colors.blueLight} 100%)`,
  bg: `linear-gradient(180deg, ${colors.bg0} 0%, ${colors.bg2} 45%, ${colors.bg1} 100%)`,
};

export const font = {
  family: "Poppins, sans-serif",
};

export const radius = {
  sm: 18,
  md: 28,
  lg: 44,
  xl: 64,
  phone: 56,
};

// Implied musical grid: 120 BPM => 1 beat = 0.5s = 15 frames.
export const BEAT = 15;

// Scene boundaries (in frames) — exact mapping of the brief's timeline.
export const scenes = {
  hook: { from: 0, durationInFrames: 120 }, // 0.00–4.00
  problem: { from: 120, durationInFrames: 150 }, // 4.00–9.00
  intro: { from: 270, durationInFrames: 150 }, // 9.00–14.00
  demoTeks: { from: 420, durationInFrames: 300 }, // 14.00–24.00
  demoStruk: { from: 720, durationInFrames: 240 }, // 24.00–32.00
  insight: { from: 960, durationInFrames: 300 }, // 32.00–42.00
  mimpi: { from: 1260, durationInFrames: 240 }, // 42.00–50.00
  tagline: { from: 1500, durationInFrames: 180 }, // 50.00–56.00
  cta: { from: 1680, durationInFrames: 120 }, // 56.00–60.00
} as const;

// The provided screen recording is 850x1920 @ 30fps, ~88s long.
export const FOOTAGE = {
  src: "footage.mp4",
  width: 850,
  height: 1920,
  fps: 30,
};
