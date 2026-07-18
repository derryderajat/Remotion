import React from "react";
import { SceneShell } from "../components/Layout";
import { CaptionChip, Headline, useEnter } from "../components/Bits";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors } from "../theme";
import { interpolate } from "remotion";

// [00:14–00:24] DEMO INPUT TEKS — type an expense like a normal chat.
// Footage: source 51s–61s (typing "Beli nasi padang 35K / Beli susu"
// -> bot replies "2 Transaksi Tercatat!" with an itemised breakdown).
export const SceneDemoTeks: React.FC = () => {
  const phoneE = useEnter(6, 15);
  return (
    <SceneShell justify="space-between">
      <Headline size={62}>
        Ketik aja kayak <span style={{ color: colors.blue }}>chat biasa</span>
      </Headline>

      <div
        style={{
          transform: `translateY(${interpolate(phoneE, [0, 1], [70, 0])}px) scale(${interpolate(
            phoneE,
            [0, 1],
            [0.94, 1],
          )})`,
          opacity: phoneE,
        }}
      >
        <PhoneFrame
          trimBefore={51 * 30}
          playbackRate={1}
          width={560}
          kenBurns={0.05}
          localDuration={300}
        />
      </div>

      <CaptionChip delay={16}>Ketik, langsung kecatat ✍️</CaptionChip>
    </SceneShell>
  );
};
