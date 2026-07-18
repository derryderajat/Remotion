import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "../components/Background";
import { LogoReveal } from "../components/LogoReveal";
import { CaptionChip, Headline } from "../components/Bits";
import { colors } from "../theme";

// [00:00–00:04] HOOK — logo reveal on clean background + hook question.
export const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();
  const logoShift = interpolate(frame, [30, 55], [0, -120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          gap: 60,
        }}
      >
        <div style={{ transform: `translateY(${logoShift}px)` }}>
          <LogoReveal size={260} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            transform: `translateY(${logoShift}px)`,
          }}
        >
          <Headline delay={40} size={76} color={colors.ink}>
            Duitmu ke mana aja
            <br />
            bulan ini? 🤔
          </Headline>
          <CaptionChip delay={58}>Uang bulanan sering raib?</CaptionChip>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
