import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { CLIPS } from "./theme";
import { FootageClip } from "./components/FootageClip";

// Plain, text-free cut — just the footage, cross-dissolved. No cards, no
// captions, no pill, no audio.
// Total = (102+102+120+108) - 3*12 = 432 - 36 = 396 frames (13.2s).
export const MRT_PLAIN_DURATION = 396;

export const MrtVlogPlain: React.FC = () => {
  const t = () => (
    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 12 })}
    />
  );
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={102}>
          <FootageClip src={CLIPS.A} trimBefore={0} playbackRate={0.92} durationInFrames={102} origin="center 60%" plain />
        </TransitionSeries.Sequence>
        {t()}
        <TransitionSeries.Sequence durationInFrames={102}>
          <FootageClip src={CLIPS.B} trimBefore={6} playbackRate={0.82} durationInFrames={102} plain />
        </TransitionSeries.Sequence>
        {t()}
        <TransitionSeries.Sequence durationInFrames={120}>
          <FootageClip src={CLIPS.B} trimBefore={69} playbackRate={0.82} durationInFrames={120} plain />
        </TransitionSeries.Sequence>
        {t()}
        <TransitionSeries.Sequence durationInFrames={108}>
          <FootageClip src={CLIPS.B} trimBefore={159} playbackRate={0.6} durationInFrames={108} kenBurns={0.08} plain />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
