import React from "react";
import { CarouselShell, BrandLockup, SwipeCue, Dots } from "./CarouselShell";
import { colors, font, radius } from "../theme";

const Sticker: React.FC<{
  x: number;
  y: number;
  rot: number;
  emoji: string;
  label: string;
}> = ({ x, y, rot, emoji, label }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `rotate(${rot}deg)`,
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 26px",
      borderRadius: radius.xl,
      background: colors.white,
      boxShadow: "0 20px 46px rgba(20,70,160,0.16)",
      fontFamily: font.family,
      fontWeight: 700,
      fontSize: 30,
      color: colors.inkSoft,
    }}
  >
    <span style={{ fontSize: 40 }}>{emoji}</span>
    {label}
  </div>
);

// SLIDE 1 — HOOK. One relatable problem that stops the scroll.
export const Slide1Hook: React.FC = () => {
  return (
    <CarouselShell tint={0.1}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <BrandLockup />
        <Dots active={0} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Sticker x={620} y={30} rot={7} emoji="🧾" label="struk numpuk" />
        <Sticker x={0} y={70} rot={-6} emoji="😵‍💫" label="saldo tipis" />

        <div
          style={{
            fontFamily: font.family,
            fontWeight: 800,
            fontSize: 108,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: colors.ink,
          }}
        >
          Gaji masuk,
          <br />
          kok cepet{" "}
          <span
            style={{
              background: `linear-gradient(120deg, ${colors.blue}, ${colors.blueLight})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            tipis
          </span>{" "}
          lagi? 😮‍💨
        </div>

        <div
          style={{
            marginTop: 44,
            fontFamily: font.family,
            fontWeight: 600,
            fontSize: 46,
            lineHeight: 1.35,
            color: colors.inkSoft,
            maxWidth: 840,
          }}
        >
          Bukan kamu boros — pengeluaran receh tiap hari cuma{" "}
          <span style={{ color: colors.ink, fontWeight: 800 }}>nggak kecatat.</span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <SwipeCue label="Geser buat solusinya" />
      </div>
    </CarouselShell>
  );
};
