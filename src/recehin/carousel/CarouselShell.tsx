import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "../components/Background";
import { LogoMark } from "../components/Logo";
import { colors, font, radius } from "../theme";

// Top-left brand lockup, shared across all three slides for consistency.
export const BrandLockup: React.FC<{ dark?: boolean }> = ({ dark = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    <div style={{ filter: "drop-shadow(0 10px 22px rgba(20,70,160,0.25))" }}>
      <LogoMark size={78} />
    </div>
    <span
      style={{
        fontFamily: font.family,
        fontWeight: 800,
        fontSize: 46,
        letterSpacing: -1,
        color: dark ? colors.white : colors.ink,
      }}
    >
      Recehin
    </span>
  </div>
);

// "Swipe" cue for the bottom of slides 1 & 2.
export const SwipeCue: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      padding: "18px 34px",
      borderRadius: radius.xl,
      background: colors.white,
      boxShadow: "0 16px 40px rgba(20,70,160,0.16)",
      fontFamily: font.family,
      fontWeight: 700,
      fontSize: 34,
      color: colors.blue,
    }}
  >
    {label}
    <span style={{ fontSize: 38 }}>→</span>
  </div>
);

// Slide indicator dots (1 of 3, etc).
export const Dots: React.FC<{ active: number }> = ({ active }) => (
  <div style={{ display: "flex", gap: 12 }}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: i === active ? 44 : 16,
          height: 16,
          borderRadius: 8,
          background: i === active ? colors.blue : "rgba(30,111,240,0.25)",
        }}
      />
    ))}
  </div>
);

export const CarouselShell: React.FC<{
  children: React.ReactNode;
  tint?: number;
}> = ({ children, tint = 0 }) => (
  <AbsoluteFill>
    <Background tint={tint} />
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "78px 78px 70px",
      }}
    >
      {children}
    </AbsoluteFill>
  </AbsoluteFill>
);
