import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneShell } from "../components/Layout";
import { CaptionChip, Headline, useEnter } from "../components/Bits";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, font, gradient, radius } from "../theme";

// Animated goal / "dream" card whose savings progress bar fills up.
const DreamCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - 10, fps, config: { damping: 13 } });
  const progress = interpolate(frame, [26, 150], [0.12, 0.68], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const amount = Math.round(interpolate(progress, [0, 1], [0, 12_000_000]) / 1000) * 1000;
  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");
  return (
    <div
      style={{
        width: 620,
        padding: 44,
        borderRadius: radius.lg,
        background: colors.white,
        boxShadow: "0 40px 90px rgba(20,70,160,0.22)",
        transform: `translateY(${interpolate(e, [0, 1], [60, 0])}px) scale(${e})`,
        opacity: e,
        fontFamily: font.family,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 92,
            height: 92,
            borderRadius: 24,
            background: gradient.brand,
            display: "grid",
            placeItems: "center",
            fontSize: 50,
          }}
        >
          💻
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 42, color: colors.ink }}>Beli Laptop Baru</div>
          <div style={{ fontWeight: 600, fontSize: 30, color: colors.inkSoft, marginTop: 4 }}>
            Target Rp 12.000.000
          </div>
        </div>
      </div>

      <div style={{ marginTop: 38 }}>
        <div
          style={{
            height: 34,
            width: "100%",
            borderRadius: 20,
            background: "#E8F0FF",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              borderRadius: 20,
              background: gradient.brand,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 18,
            fontWeight: 700,
            fontSize: 34,
          }}
        >
          <span style={{ color: colors.blue }}>{fmt(amount)}</span>
          <span style={{ color: colors.inkSoft }}>{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

// [00:42–00:50] MENULIS MIMPI — write your dream, Recehin helps chase it.
// Footage: source ~41s (web menu showing the "Mimpiku" section) as a small
// supporting device; the animated goal card is the hero.
export const SceneMimpi: React.FC = () => {
  const phoneE = useEnter(30, 15);
  return (
    <SceneShell justify="space-between" tint={0.1}>
      <Headline size={60}>
        Tulis <span style={{ color: colors.blue }}>mimpimu</span> di sini ✨
      </Headline>

      <div style={{ position: "relative", width: 940, height: 900 }}>
        <div style={{ position: "absolute", left: 0, top: 90 }}>
          <DreamCard />
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            transform: `translateY(${interpolate(phoneE, [0, 1], [60, 0])}px) rotate(4deg)`,
            opacity: phoneE,
          }}
        >
          <PhoneFrame
            trimBefore={Math.round(41.6 * 30)}
            playbackRate={0.14}
            width={250}
            kenBurns={0.03}
            localDuration={240}
          />
        </div>
      </div>

      <CaptionChip delay={20}>Kejar bareng Recehin, receh demi receh ✨</CaptionChip>
    </SceneShell>
  );
};
