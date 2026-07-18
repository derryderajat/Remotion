import React from "react";
import { CarouselShell, Dots } from "./CarouselShell";
import { LogoMark } from "../components/Logo";
import { WaIcon, WebIcon } from "../components/Bits";
import { colors, font, gradient, radius } from "../theme";

const Action: React.FC<{ emoji: string; children: React.ReactNode }> = ({ emoji, children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 20,
      padding: "24px 30px",
      borderRadius: radius.lg,
      background: colors.white,
      boxShadow: "0 16px 40px rgba(20,70,160,0.12)",
      fontFamily: font.family,
      fontWeight: 700,
      fontSize: 38,
      color: colors.ink,
    }}
  >
    <span style={{ fontSize: 46 }}>{emoji}</span>
    <span>{children}</span>
  </div>
);

// SLIDE 3 — CTA. Tell the audience exactly what to do next.
export const Slide3Cta: React.FC = () => {
  return (
    <CarouselShell tint={0.16}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Dots active={2} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 34,
        }}
      >
        <div style={{ filter: "drop-shadow(0 24px 54px rgba(20,70,160,0.30))" }}>
          <LogoMark size={200} />
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: font.family,
            fontWeight: 800,
            fontSize: 68,
            letterSpacing: -1.5,
            lineHeight: 1.06,
            color: colors.ink,
          }}
        >
          Mulai atur duitmu,
          <br />
          <span
            style={{
              background: gradient.brand,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            receh demi receh
          </span>{" "}
          ✨
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", marginTop: 8 }}>
          <Action emoji="💬">
            Komen <b style={{ color: colors.blue }}>“RECEH”</b> — kukirim caranya
          </Action>
          <Action emoji="🔖">Simpan &amp; share ke bestie kamu</Action>
          <Action emoji="🔗">Cobain langsung — link di bio</Action>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 22,
          padding: "22px 40px",
          borderRadius: radius.xl,
          background: gradient.brandDeep,
          boxShadow: "0 22px 50px rgba(20,70,160,0.34)",
          fontFamily: font.family,
          fontWeight: 700,
          fontSize: 34,
          color: colors.white,
        }}
      >
        <WaIcon size={46} />
        wa.me/6285122022325
        <span style={{ opacity: 0.6 }}>·</span>
        <WebIcon size={46} />
        recehin.my.id
      </div>
    </CarouselShell>
  );
};
