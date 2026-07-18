import React from "react";
import { CarouselShell, BrandLockup, SwipeCue, Dots } from "./CarouselShell";
import { PhoneFrame } from "../components/PhoneFrame";
import { WaIcon, WebIcon } from "../components/Bits";
import { colors, font, gradient, radius } from "../theme";

const Feature: React.FC<{ emoji: string; title: string; body: string }> = ({
  emoji,
  title,
  body,
}) => (
  <div
    style={{
      display: "flex",
      gap: 22,
      alignItems: "flex-start",
      padding: "26px 28px",
      borderRadius: radius.md,
      background: colors.white,
      boxShadow: "0 16px 40px rgba(20,70,160,0.10)",
    }}
  >
    <div
      style={{
        minWidth: 78,
        height: 78,
        borderRadius: 20,
        background: "rgba(30,111,240,0.10)",
        display: "grid",
        placeItems: "center",
        fontSize: 42,
      }}
    >
      {emoji}
    </div>
    <div style={{ fontFamily: font.family }}>
      <div style={{ fontWeight: 800, fontSize: 40, color: colors.ink, lineHeight: 1.1 }}>
        {title}
      </div>
      <div style={{ fontWeight: 500, fontSize: 31, color: colors.inkSoft, marginTop: 6, lineHeight: 1.28 }}>
        {body}
      </div>
    </div>
  </div>
);

// SLIDE 2 — VALUE. The solution + the 3 core features, with real UI proof.
export const Slide2Value: React.FC = () => {
  return (
    <CarouselShell tint={0.08}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <BrandLockup />
        <Dots active={1} />
      </div>

      <div style={{ marginTop: 26 }}>
        <div
          style={{
            fontFamily: font.family,
            fontWeight: 800,
            fontSize: 72,
            letterSpacing: -1.5,
            color: colors.ink,
            lineHeight: 1.05,
          }}
        >
          Catat duit cukup dari{" "}
          <span
            style={{
              background: gradient.brand,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            WhatsApp
          </span>
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: font.family,
            fontWeight: 600,
            fontSize: 36,
            color: colors.inkSoft,
          }}
        >
          Recehin nyatet & nganalisa, kamu tinggal santai.
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 40,
          alignItems: "center",
          marginTop: 26,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22, flex: 1 }}>
          <Feature emoji="✍️" title="Ketik kayak chat" body="Tulis pengeluaran biasa, langsung kecatat rapi." />
          <Feature emoji="📸" title="Foto struk" body="AI baca & rinci item + nominalnya otomatis." />
          <Feature emoji="🧠" title="Insight & budget" body="Pola belanja, reminder, sampai forecast." />
        </div>

        <div style={{ filter: "drop-shadow(0 30px 60px rgba(20,70,160,0.22))" }}>
          <PhoneFrame trimBefore={60 * 30} playbackRate={0.02} width={330} kenBurns={0.02} localDuration={300} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 26px",
            borderRadius: radius.xl,
            background: colors.white,
            boxShadow: "0 14px 34px rgba(20,70,160,0.14)",
            fontFamily: font.family,
            fontWeight: 700,
            fontSize: 30,
            color: colors.ink,
          }}
        >
          <WaIcon size={42} /> WhatsApp &nbsp;&amp;&nbsp; <WebIcon size={42} /> Web
        </div>
        <SwipeCue label="Lanjut" />
      </div>
    </CarouselShell>
  );
};
