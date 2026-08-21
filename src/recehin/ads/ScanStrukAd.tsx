import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { Watermark, Headline, CaptionChip, useEnter, WaIcon } from "../components/Bits";
import { PhoneFrame } from "../components/PhoneFrame";
import { LogoReveal } from "../components/LogoReveal";
import { colors, font, gradient, radius, DOMAIN } from "../theme";

// ─────────────────────────────────────────────────────────────────────────────
// SHORT ADS CUT — "Scan struk" (15s, 9:16, 1080x1920)
// A tight, autoplay-muted-friendly ad focused on ONE feature: snap a receipt,
// let the AI read it. Real screen-recording footage as proof. Captions carry
// the whole message so it works with sound off.
//
//   0.0–2.0s  Hook   — "Males nyatet belanjaan?"
//   2.0–12.0s Demo   — real footage: receipt photo -> AI reads -> "Kuitansi Tercatat"
//  12.0–15.0s CTA    — logo + WhatsApp + recehin.id
// ─────────────────────────────────────────────────────────────────────────────

export const SCANSTRUK_FPS = 30;
export const SCANSTRUK_DURATION = 450; // 15s

const HOOK = 60; // 2s
const DEMO = 300; // 10s
// CTA = 90 (3s)

// ── Hook ─────────────────────────────────────────────────────────────────────
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const receipt = useEnter(6, 12);
  const out = interpolate(frame, [HOOK - 12, HOOK], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <Background tint={0.15} />
      <Watermark />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          padding: "0 90px",
        }}
      >
        <div
          style={{
            fontSize: 150,
            transform: `scale(${receipt}) rotate(${interpolate(receipt, [0, 1], [-18, 0])}deg)`,
            opacity: receipt,
            filter: "drop-shadow(0 24px 40px rgba(20,70,160,0.25))",
          }}
        >
          🧾
        </div>
        <Headline size={92} align="center">
          Abis belanja,
          <br />
          <span style={{ color: colors.blue }}>males nyatet?</span>
        </Headline>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ── Demo ─────────────────────────────────────────────────────────────────────
// Steps light up as the footage plays through the scan flow.
const Step: React.FC<{ from: number; children: React.ReactNode }> = ({ from, children }) => {
  const frame = useCurrentFrame();
  if (frame < from) return null;
  return (
    <Sequence from={from} name="step">
      <div style={{ position: "absolute", bottom: 140, width: "100%", display: "grid", placeItems: "center" }}>
        <CaptionChip>{children}</CaptionChip>
      </div>
    </Sequence>
  );
};

const Demo: React.FC = () => {
  const enter = useEnter(2, 14);
  return (
    <AbsoluteFill>
      <Background tint={0.1} />
      <Watermark />
      <div style={{ position: "absolute", top: 120, width: "100%", display: "grid", placeItems: "center" }}>
        <Headline size={72}>
          <span style={{ color: colors.blue }}>Foto struk</span>, beres.
        </Headline>
      </div>
      <AbsoluteFill style={{ display: "grid", placeItems: "center" }}>
        <div
          style={{
            transform: `translateY(${interpolate(enter, [0, 1], [80, 0])}px) scale(${interpolate(
              enter,
              [0, 1],
              [0.92, 1],
            )})`,
            opacity: enter,
          }}
        >
          {/* Source ~64s–76s: receipt photo sent -> "lagi dibaca" -> AI result. */}
          <PhoneFrame
            trimBefore={64 * 30}
            playbackRate={1.2}
            width={600}
            kenBurns={0.04}
            localDuration={DEMO}
          />
        </div>
      </AbsoluteFill>

      <Step from={8}>1 · Jepret struknya 📸</Step>
      <Step from={120}>2 · AI baca otomatis 🤖</Step>
      <Step from={210}>3 · Langsung kecatat ✅</Step>
    </AbsoluteFill>
  );
};

// ── CTA ──────────────────────────────────────────────────────────────────────
const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = spring({ frame: frame - 18, fps, config: { damping: 14 } });
  const url = spring({ frame: frame - 34, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill>
      <Background tint={0.2} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          padding: "0 80px",
        }}
      >
        <LogoReveal size={260} />
        <div
          style={{
            transform: `translateY(${interpolate(line, [0, 1], [40, 0])}px) scale(${line})`,
            opacity: line,
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            padding: "24px 46px",
            borderRadius: radius.xl,
            background: gradient.brand,
            color: colors.white,
            fontFamily: font.family,
            fontWeight: 800,
            fontSize: 46,
            boxShadow: "0 26px 60px rgba(20,70,160,0.4)",
          }}
        >
          <WaIcon size={52} /> Catat lewat WhatsApp
        </div>
        <div
          style={{
            opacity: url,
            transform: `translateY(${interpolate(url, [0, 1], [24, 0])}px)`,
            fontFamily: font.family,
            fontWeight: 700,
            fontSize: 46,
            color: colors.blue,
          }}
        >
          {DOMAIN}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ScanStrukAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg0 }}>
      <Sequence durationInFrames={HOOK} name="Hook">
        <Hook />
      </Sequence>
      <Sequence from={HOOK} durationInFrames={DEMO} name="Demo">
        <Demo />
      </Sequence>
      <Sequence from={HOOK + DEMO} name="CTA">
        <Cta />
      </Sequence>

      {/* Soft music bed (loudness-normalized). Ads autoplay muted, so captions
          carry the message — this is just ambience for the sound-on view. */}
      <Audio src={staticFile("music/bed.mp3")} volume={0.5} />
    </AbsoluteFill>
  );
};
