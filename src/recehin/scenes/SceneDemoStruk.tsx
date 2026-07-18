import React from "react";
import { SceneShell } from "../components/Layout";
import { CaptionChip, Headline, useEnter } from "../components/Bits";
import { PhoneFrame } from "../components/PhoneFrame";
import { colors } from "../theme";
import { interpolate } from "remotion";

// [00:24–00:32] DEMO UPLOAD STRUK — snap a receipt, AI reads it.
// Footage: source 62s–72s (receipt photo uploaded -> bot replies
// "Kuitansi Tercatat! ALFAMART..." with parsed item + total).
export const SceneDemoStruk: React.FC = () => {
  const phoneE = useEnter(6, 15);
  return (
    <SceneShell justify="space-between" tint={0.1}>
      <Headline size={62}>
        Males ngetik? <span style={{ color: colors.blue }}>Foto struk</span> aja
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
          trimBefore={62 * 30}
          playbackRate={1.25}
          width={560}
          kenBurns={0.05}
          localDuration={240}
        />
      </div>

      <CaptionChip delay={16}>Jepret struk, beres 📸</CaptionChip>
    </SceneShell>
  );
};
