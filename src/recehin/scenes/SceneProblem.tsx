import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/Layout";
import { CaptionChip, Headline } from "../components/Bits";
import { colors, font, radius } from "../theme";

// A messy, tilted receipt/note card for the "manual is a pain" motif.
const MessyNote: React.FC<{
  x: number;
  y: number;
  rot: number;
  delay: number;
  label: string;
  emoji: string;
}> = ({ x, y, rot, delay, label, emoji }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: { damping: 11, mass: 0.7 } });
  const wobble = Math.sin((frame + delay) / 9) * 1.6;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 250,
        padding: "26px 24px",
        borderRadius: radius.md,
        background: colors.white,
        boxShadow: "0 22px 50px rgba(20,70,160,0.16)",
        transform: `rotate(${rot + wobble}deg) scale(${e}) translateY(${interpolate(
          e,
          [0, 1],
          [60, 0],
        )}px)`,
        opacity: e,
        fontFamily: font.family,
      }}
    >
      <div style={{ fontSize: 54 }}>{emoji}</div>
      <div style={{ fontWeight: 700, fontSize: 30, color: colors.ink, marginTop: 8 }}>{label}</div>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
        {[0.9, 0.65, 0.8].map((w, i) => (
          <div
            key={i}
            style={{
              height: 12,
              width: `${w * 100}%`,
              borderRadius: 6,
              background: "#E4ECFA",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// [00:04–00:09] PROBLEM — manual note-taking is messy, easy to forget.
export const SceneProblem: React.FC = () => {
  return (
    <SceneShell justify="space-between" tint={0.2}>
      <Headline size={70}>
        Cape nyatet <span style={{ color: colors.blue }}>manual</span>?
        <br />
        Sama. 😮‍💨
      </Headline>

      <div style={{ position: "relative", width: 900, height: 720 }}>
        <MessyNote x={60} y={40} rot={-9} delay={6} label="Struk numpuk" emoji="🧾" />
        <MessyNote x={470} y={90} rot={8} delay={12} label="Spreadsheet ribet" emoji="📊" />
        <MessyNote x={120} y={380} rot={7} delay={18} label="Catatan lupa" emoji="📝" />
        <MessyNote x={520} y={410} rot={-7} delay={24} label="Hitung manual" emoji="🧮" />
      </div>

      <CaptionChip delay={30}>Ribet. Gampang lupa. Gampang males.</CaptionChip>
    </SceneShell>
  );
};
