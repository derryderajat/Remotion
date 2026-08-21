import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, font, radius } from "../theme";
import { LogoMark } from "./Logo";

// Small shared presentational bits: animated headline, caption chip, watermark,
// WhatsApp + Web badges, and a spring helper.

export const useEnter = (delay = 0, damping = 14) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.7 } });
};

export const Headline: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  align?: "left" | "center";
  maxWidth?: number;
}> = ({ children, delay = 0, size = 72, color = colors.ink, align = "center", maxWidth = 900 }) => {
  const e = useEnter(delay);
  return (
    <div
      style={{
        fontFamily: font.family,
        fontWeight: 800,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: -1.5,
        color,
        textAlign: align,
        maxWidth,
        transform: `translateY(${interpolate(e, [0, 1], [40, 0])}px)`,
        opacity: e,
      }}
    >
      {children}
    </div>
  );
};

export const CaptionChip: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const e = useEnter(delay, 13);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "22px 40px",
        borderRadius: radius.xl,
        background: colors.white,
        boxShadow: "0 20px 50px rgba(20,70,160,0.18)",
        border: `2px solid ${colors.chipBlueBg}`,
        fontFamily: font.family,
        fontWeight: 700,
        fontSize: 42,
        color: colors.ink,
        transform: `translateY(${interpolate(e, [0, 1], [50, 0])}px) scale(${interpolate(
          e,
          [0, 1],
          [0.9, 1],
        )})`,
        opacity: e,
      }}
    >
      {children}
    </div>
  );
};

export const Watermark: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        right: 44,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 22px 12px 14px",
        borderRadius: radius.xl,
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 8px 24px rgba(20,70,160,0.14)",
        zIndex: 50,
      }}
    >
      <LogoMark size={38} radius={11} />
      <span
        style={{
          fontFamily: font.family,
          fontWeight: 700,
          fontSize: 24,
          color: colors.ink,
        }}
      >
        Recehin
      </span>
    </div>
  );
};

export const WaIcon: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="18" fill={colors.whatsapp} />
    <path
      d="M32 15c-9.4 0-17 7.6-17 17 0 3 .8 5.9 2.3 8.4L15 49l8.9-2.3c2.4 1.3 5.2 2 8.1 2 9.4 0 17-7.6 17-17s-7.6-16.7-17-16.7z"
      fill="#fff"
    />
    <path
      d="M40.8 36.3c-.5-.3-2.9-1.4-3.3-1.6-.4-.2-.8-.3-1.1.3-.3.5-1.2 1.6-1.5 1.9-.3.3-.6.4-1 .1-2.5-1.2-4.1-2.2-5.7-5-.4-.7.4-.7 1.2-2.2.1-.3.1-.5 0-.8-.1-.3-1.1-2.7-1.5-3.6-.4-.9-.8-.8-1.1-.8h-1c-.3 0-.8.1-1.2.6-.4.5-1.6 1.5-1.6 3.8s1.6 4.4 1.9 4.7c.2.3 3.2 4.9 7.8 6.9 2.9 1.2 4 1.3 5.5 1.1.9-.1 2.9-1.2 3.3-2.3.4-1.1.4-2.1.3-2.3-.1-.2-.4-.3-.9-.5z"
      fill={colors.whatsapp}
    />
  </svg>
);

export const WebIcon: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="18" fill={colors.blue} />
    <circle cx="32" cy="32" r="15" stroke="#fff" strokeWidth="3.4" />
    <path
      d="M17 32h30M32 17c4.5 4.4 4.5 25.6 0 30M32 17c-4.5 4.4-4.5 25.6 0 30"
      stroke="#fff"
      strokeWidth="3.4"
      fill="none"
    />
  </svg>
);

// A pill that reads "WhatsApp & Web".
export const ChannelPill: React.FC<{ delay?: number; scale?: number }> = ({ delay = 0, scale = 1 }) => {
  const e = useEnter(delay, 13);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 18,
        padding: "18px 34px",
        borderRadius: radius.xl,
        background: colors.white,
        boxShadow: "0 18px 44px rgba(20,70,160,0.18)",
        transform: `scale(${scale * interpolate(e, [0, 1], [0.9, 1])})`,
        opacity: e,
      }}
    >
      <WaIcon size={56} />
      <span style={{ fontFamily: font.family, fontWeight: 700, fontSize: 40, color: colors.ink }}>
        &amp;
      </span>
      <WebIcon size={56} />
    </div>
  );
};
