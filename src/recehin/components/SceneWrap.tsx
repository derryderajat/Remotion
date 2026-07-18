import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type Dir = "right" | "left" | "up" | "down" | "scale";

// Quick, beat-synced enter motion so hard cuts read as fast whip/slide
// transitions while keeping every scene on an exact frame boundary.
export const SceneWrap: React.FC<{
  children: React.ReactNode;
  dir?: Dir;
  durationInFrames: number;
}> = ({ children, dir = "right", durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200, stiffness: 140, mass: 0.6 } });
  // gentle settle-out near the very end for a soft cut
  const out = interpolate(frame, [durationInFrames - 7, durationInFrames], [1, 0.985], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outOpacity = interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dist = 120;
  let tx = 0;
  let ty = 0;
  let scale = out;
  if (dir === "right") tx = interpolate(enter, [0, 1], [dist, 0]);
  if (dir === "left") tx = interpolate(enter, [0, 1], [-dist, 0]);
  if (dir === "up") ty = interpolate(enter, [0, 1], [dist, 0]);
  if (dir === "down") ty = interpolate(enter, [0, 1], [-dist, 0]);
  if (dir === "scale") scale = interpolate(enter, [0, 1], [1.08, 1]) * out;

  return (
    <AbsoluteFill
      style={{
        transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
        opacity: Math.min(enter + 0.15, 1) * outOpacity,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
