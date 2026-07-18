import React from "react";
import { SceneShell } from "../components/Layout";
import { ChannelPill, Headline, useEnter } from "../components/Bits";
import { LogoReveal } from "../components/LogoReveal";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, font } from "../theme";
import { interpolate, useCurrentFrame } from "remotion";

// [00:09–00:14] INTRO SOLUSI — meet Recehin, lives in WhatsApp & Web.
export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const phoneE = useEnter(30, 14);
  return (
    <SceneShell justify="space-evenly" watermark>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <LogoReveal size={150} showWord={false} />
        <Headline size={64} delay={6}>
          Kenalin, <span style={{ color: colors.blue }}>Recehin</span>
        </Headline>
        <div
          style={{
            fontFamily: font.family,
            fontWeight: 600,
            fontSize: 38,
            color: colors.inkSoft,
            opacity: interpolate(frame, [16, 34], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Pencatat keuangan yang hidup di
        </div>
        <ChannelPill delay={22} />
      </div>

      <div
        style={{
          transform: `translateY(${interpolate(phoneE, [0, 1], [80, 0])}px) scale(${interpolate(
            phoneE,
            [0, 1],
            [0.92, 1],
          )})`,
          opacity: phoneE,
        }}
      >
        <PhoneFrame trimBefore={0} playbackRate={0.8} width={440} kenBurns={0.05} localDuration={150} />
      </div>
    </SceneShell>
  );
};
