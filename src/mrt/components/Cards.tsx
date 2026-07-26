import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { mrtColors, mrtFont } from "../theme";

const CardBg: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 40) * 30;
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${mrtColors.blueDeep} 0%, ${mrtColors.blue} 55%, ${mrtColors.teal} 130%)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 300 + drift,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: mrtColors.accent,
          filter: "blur(120px)",
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200 - drift,
          left: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: mrtColors.blue,
          filter: "blur(120px)",
          opacity: 0.5,
        }}
      />
      {/* faint moving "rail" lines for motion */}
      <AbsoluteFill
        style={{
          opacity: 0.06,
          backgroundImage:
            "repeating-linear-gradient(180deg, #fff 0 2px, transparent 2px 60px)",
          transform: `translateY(${(frame * 2) % 60}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const IntroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame: frame - 4, fps, config: { damping: 14 } });
  const b = spring({ frame: frame - 14, fps, config: { damping: 15 } });
  const c = spring({ frame: frame - 24, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill>
      <CardBg />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 26,
          padding: "0 90px",
          fontFamily: mrtFont,
          textAlign: "center",
        }}
      >
        <div
          style={{
            transform: `scale(${a})`,
            opacity: a,
            fontSize: 52,
            fontWeight: 700,
          }}
        >
          🚆
        </div>
        <div
          style={{
            transform: `translateY(${interpolate(b, [0, 1], [50, 0])}px)`,
            opacity: b,
            fontWeight: 800,
            fontSize: 96,
            lineHeight: 1.03,
            letterSpacing: -2,
            color: mrtColors.white,
            textShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          PERTAMA KALI
          <br />
          NAIK MRT
        </div>
        <div
          style={{
            transform: `translateY(${interpolate(c, [0, 1], [30, 0])}px)`,
            opacity: c,
            fontWeight: 600,
            fontSize: 42,
            color: "rgba(255,255,255,0.82)",
            letterSpacing: 6,
          }}
        >
          JAKARTA
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const OutroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = spring({ frame: frame - 4, fps, config: { damping: 14 } });
  const b = spring({ frame: frame - 16, fps, config: { damping: 15 } });
  const c = spring({ frame: frame - 28, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill>
      <CardBg />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "0 90px",
          fontFamily: mrtFont,
          textAlign: "center",
        }}
      >
        <div style={{ transform: `scale(${a})`, opacity: a, fontSize: 92 }}>✅</div>
        <div
          style={{
            transform: `translateY(${interpolate(b, [0, 1], [50, 0])}px)`,
            opacity: b,
            fontWeight: 800,
            fontSize: 84,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: mrtColors.white,
            textShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          Akhirnya naik
          <br />
          MRT Jakarta 🚇
        </div>
        <div
          style={{
            transform: `translateY(${interpolate(c, [0, 1], [30, 0])}px)`,
            opacity: c,
            marginTop: 6,
            padding: "16px 34px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.16)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            fontWeight: 700,
            fontSize: 44,
            color: mrtColors.white,
          }}
        >
          #MRTJakarta #FirstTime
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
