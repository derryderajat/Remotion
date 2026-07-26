import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { CLIPS } from "./theme";
import { FootageClip } from "./components/FootageClip";
import { IntroCard, OutroCard } from "./components/Cards";

// ~20s vertical vlog assembled from the two unique clips, cross-dissolved.
// No audio. Total = sum(durations) - 5*12 (transitions) = 660 - 60 = 600.
export const MrtVlog: React.FC = () => {
  const t = () => (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 12 })}
    />
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={78}>
          <IntroCard />
        </TransitionSeries.Sequence>
        {t()}

        {/* Clip A — POV shoes walking into the station (~3.1s source) */}
        <TransitionSeries.Sequence durationInFrames={102}>
          <FootageClip
            src={CLIPS.A}
            trimBefore={0}
            playbackRate={0.92}
            durationInFrames={102}
            caption="Berangkat 👟"
            origin="center 60%"
          />
        </TransitionSeries.Sequence>
        {t()}

        {/* Clip B — walking the corridor toward the gates */}
        <TransitionSeries.Sequence durationInFrames={102}>
          <FootageClip
            src={CLIPS.B}
            trimBefore={6}
            playbackRate={0.82}
            durationInFrames={102}
            caption="Menuju gate"
          />
        </TransitionSeries.Sequence>
        {t()}

        {/* Clip B — at the gate, tapping the card */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <FootageClip
            src={CLIPS.B}
            trimBefore={69}
            playbackRate={0.82}
            durationInFrames={120}
            caption="Tap kartu dulu 💳"
          />
        </TransitionSeries.Sequence>
        {t()}

        {/* Clip B — close-up of the reader "Tempelkan Tiket" */}
        <TransitionSeries.Sequence durationInFrames={102}>
          <FootageClip
            src={CLIPS.B}
            trimBefore={159}
            playbackRate={0.62}
            durationInFrames={102}
            caption="Tempelkan tiket ✅"
            kenBurns={0.08}
          />
        </TransitionSeries.Sequence>
        {t()}

        <TransitionSeries.Sequence durationInFrames={156}>
          <OutroCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
