import React from "react";
import { interpolate } from "remotion";
import { SceneShell } from "../components/Layout";
import { Headline, useEnter, WaIcon, WebIcon } from "../components/Bits";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors, font } from "../theme";

const Labeled: React.FC<{
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
  delay: number;
}> = ({ children, icon, label, delay }) => {
  const e = useEnter(delay, 15);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        transform: `translateY(${interpolate(e, [0, 1], [70, 0])}px) scale(${interpolate(
          e,
          [0, 1],
          [0.9, 1],
        )})`,
        opacity: e,
      }}
    >
      {children}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {icon}
        <span style={{ fontFamily: font.family, fontWeight: 700, fontSize: 40, color: colors.ink }}>
          {label}
        </span>
      </div>
    </div>
  );
};

// [00:50–00:56] TAGLINE — WhatsApp & Web side by side.
export const SceneTagline: React.FC = () => {
  return (
    <SceneShell justify="space-between" tint={0.15}>
      <Headline size={62}>
        Ada di <span style={{ color: colors.blue }}>genggamanmu</span>,
        <br />
        kapan aja.
      </Headline>

      <div style={{ display: "flex", gap: 44, alignItems: "flex-start" }}>
        <Labeled icon={<WaIcon size={54} />} label="WhatsApp" delay={8}>
          <PhoneFrame trimBefore={59 * 30} playbackRate={0.4} width={340} kenBurns={0.03} localDuration={180} />
        </Labeled>
        <Labeled icon={<WebIcon size={54} />} label="Web" delay={20}>
          <PhoneFrame trimBefore={84 * 30} playbackRate={0.4} width={340} kenBurns={0.03} localDuration={180} />
        </Labeled>
      </div>

      <div style={{ height: 10 }} />
    </SceneShell>
  );
};
