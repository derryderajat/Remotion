import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "../components/Background";
import { LogoReveal } from "../components/LogoReveal";
import { ChannelPill } from "../components/Bits";
import { colors, font, gradient, radius } from "../theme";

// [00:56–01:00] CTA / OUTRO — full-screen logo, channels, and the URLs.
export const SceneCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cta = spring({ frame: frame - 26, fps, config: { damping: 13 } });
  const url = spring({ frame: frame - 40, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill>
      <Background tint={0.2} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 46,
          padding: "0 80px",
        }}
      >
        <LogoReveal size={300} />

        <div
          style={{
            transform: `translateY(${interpolate(cta, [0, 1], [40, 0])}px) scale(${cta})`,
            opacity: cta,
            padding: "26px 56px",
            borderRadius: radius.xl,
            background: gradient.brand,
            color: colors.white,
            fontFamily: font.family,
            fontWeight: 800,
            fontSize: 46,
            boxShadow: "0 26px 60px rgba(20,70,160,0.4)",
          }}
        >
          Coba Recehin sekarang →
        </div>

        <div style={{ transform: `scale(${interpolate(cta, [0, 1], [0.8, 1])})`, opacity: cta }}>
          <ChannelPill delay={30} />
        </div>

        <div
          style={{
            opacity: url,
            transform: `translateY(${interpolate(url, [0, 1], [24, 0])}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            fontFamily: font.family,
            fontWeight: 600,
            fontSize: 38,
            color: colors.inkSoft,
          }}
        >
          <span>wa.me/628xxxxxxx</span>
          <span style={{ color: colors.blue, fontWeight: 700 }}>recehin.id</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
