import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font, gradient } from "../theme";
import { LogoMark } from "./Logo";

// Animated Recehin lockup: the mark springs/rotates in, a soft glow pulses,
// and the wordmark slides up beneath it.
export const LogoReveal: React.FC<{
  size?: number;
  showWord?: boolean;
  delay?: number;
}> = ({ size = 300, showWord = true, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const pop = spring({ frame: f, fps, config: { damping: 12, mass: 0.8 } });
  const word = spring({ frame: f - 8, fps, config: { damping: 15 } });
  const rot = interpolate(pop, [0, 1], [-12, 0]);
  const glow = 0.4 + Math.sin(frame / 12) * 0.12;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: -size * 0.22,
            borderRadius: "50%",
            background: colors.blueLight,
            filter: "blur(70px)",
            opacity: glow * pop,
          }}
        />
        <div
          style={{
            transform: `scale(${pop}) rotate(${rot}deg)`,
            filter: "drop-shadow(0 30px 60px rgba(20,70,160,0.35))",
          }}
        >
          <LogoMark size={size} />
        </div>
      </div>
      {showWord ? (
        <div
          style={{
            transform: `translateY(${interpolate(word, [0, 1], [40, 0])}px)`,
            opacity: word,
            fontFamily: font.family,
            fontWeight: 800,
            fontSize: size * 0.34,
            letterSpacing: -2,
            background: gradient.brandDeep,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Recehin
        </div>
      ) : null}
    </div>
  );
};
