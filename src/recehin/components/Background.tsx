import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors, gradient } from "../theme";

// Soft branded backdrop: white→light-blue gradient with slow-drifting blurred
// blue blobs and a faint dotted grid for a playful, modern feel.
export const Background: React.FC<{ tint?: number }> = ({ tint = 0 }) => {
  const frame = useCurrentFrame();
  const drift = (speed: number, amp: number, phase: number) =>
    Math.sin((frame / speed) + phase) * amp;

  return (
    <AbsoluteFill style={{ background: gradient.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          opacity: 0.5,
          backgroundImage: `radial-gradient(${colors.blue}14 1.5px, transparent 1.5px)`,
          backgroundSize: "46px 46px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -160 + drift(70, 40, 0),
          left: -140 + drift(90, 50, 1),
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: colors.blueLight,
          filter: "blur(120px)",
          opacity: 0.28 + tint * 0.1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200 + drift(80, 46, 2),
          right: -160 + drift(100, 40, 0.5),
          width: 720,
          height: 720,
          borderRadius: "50%",
          background: colors.blue,
          filter: "blur(140px)",
          opacity: 0.22 + tint * 0.1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 780 + drift(60, 60, 3),
          right: -120 + drift(75, 40, 1.5),
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "#8FC0FF",
          filter: "blur(120px)",
          opacity: 0.25,
        }}
      />
    </AbsoluteFill>
  );
};
