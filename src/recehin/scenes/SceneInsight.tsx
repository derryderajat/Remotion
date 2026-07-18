import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/Layout";
import { CaptionChip, Headline, useEnter } from "../components/Bits";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, font, radius } from "../theme";

const FloatBadge: React.FC<{
  x: number;
  y: number;
  delay: number;
  emoji: string;
  text: string;
}> = ({ x, y, delay, emoji, text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - delay, fps, config: { damping: 12 } });
  const bob = Math.sin((frame + delay) / 14) * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bob,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 24px",
        borderRadius: radius.xl,
        background: colors.white,
        boxShadow: "0 20px 44px rgba(20,70,160,0.22)",
        border: `2px solid ${colors.chipBlueBg}`,
        transform: `scale(${e})`,
        opacity: e,
        fontFamily: font.family,
        fontWeight: 700,
        fontSize: 30,
        color: colors.ink,
        zIndex: 30,
      }}
    >
      <span style={{ fontSize: 34 }}>{emoji}</span>
      {text}
    </div>
  );
};

// [00:32–00:42] AI INSIGHT & BUDGETING — not just logging: insight & advice.
// Footage: source 82s–88s (donut by category, income-vs-expense bars,
// top categories & a 3-month spending forecast).
export const SceneInsight: React.FC = () => {
  const phoneE = useEnter(6, 15);
  return (
    <SceneShell justify="space-between" tint={0.15}>
      <Headline size={60}>
        Nggak cuma nyatet — <span style={{ color: colors.blue }}>dia mikir</span> 🧠
      </Headline>

      <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
        <div
          style={{
            transform: `translateY(${interpolate(phoneE, [0, 1], [70, 0])}px) scale(${interpolate(
              phoneE,
              [0, 1],
              [0.94, 1],
            )})`,
            opacity: phoneE,
          }}
        >
          <PhoneFrame
            trimBefore={82 * 30}
            playbackRate={0.6}
            width={520}
            kenBurns={0.04}
            localDuration={300}
          />
        </div>
        <FloatBadge x={-30} y={60} delay={40} emoji="📊" text="Pola pengeluaran" />
        <FloatBadge x={470} y={300} delay={58} emoji="🔮" text="Forecast 3 bulan" />
        <FloatBadge x={-40} y={640} delay={76} emoji="🎯" text="Ingetin budget" />
      </div>

      <CaptionChip delay={20}>AI insight buat budgeting-mu 🧠</CaptionChip>
    </SceneShell>
  );
};
