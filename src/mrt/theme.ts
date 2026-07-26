// "First time naik MRT Jakarta" — short vertical vlog, no audio.
export const MRT_FPS = 30;
export const MRT_W = 1080;
export const MRT_H = 1920;
export const MRT_DURATION = 600; // 20s

export const mrtColors = {
  ink: "#0B1B2B",
  white: "#FFFFFF",
  // MRT Jakarta-ish deep blue / teal accents
  blue: "#1B4F8A",
  blueDeep: "#0A2A4E",
  teal: "#12B5B0",
  accent: "#39D0C8",
};

export const mrtFont = "Poppins, sans-serif";

// One clip per segment. trimBefore is in composition frames (seconds*30);
// playbackRate maps the chosen source span onto the on-screen duration.
export const CLIPS = {
  A: "mrt/clipA.mp4", // ~3.1s POV, shoes walking (rotated to portrait)
  B: "mrt/clipB.mp4", // ~10.7s corridor -> gate tap -> reader close-up
};
