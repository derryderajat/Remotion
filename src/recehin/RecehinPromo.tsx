import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile } from "remotion";
import { scenes } from "./theme";
import { SceneWrap } from "./components/SceneWrap";
import { SceneHook } from "./scenes/SceneHook";
import { SceneProblem } from "./scenes/SceneProblem";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneDemoTeks } from "./scenes/SceneDemoTeks";
import { SceneDemoStruk } from "./scenes/SceneDemoStruk";
import { SceneInsight } from "./scenes/SceneInsight";
import { SceneMimpi } from "./scenes/SceneMimpi";
import { SceneTagline } from "./scenes/SceneTagline";
import { SceneCta } from "./scenes/SceneCta";

const order = [
  { key: "hook", el: <SceneHook />, dir: "scale" as const },
  { key: "problem", el: <SceneProblem />, dir: "right" as const },
  { key: "intro", el: <SceneIntro />, dir: "up" as const },
  { key: "demoTeks", el: <SceneDemoTeks />, dir: "right" as const },
  { key: "demoStruk", el: <SceneDemoStruk />, dir: "left" as const },
  { key: "insight", el: <SceneInsight />, dir: "up" as const },
  { key: "mimpi", el: <SceneMimpi />, dir: "right" as const },
  { key: "tagline", el: <SceneTagline />, dir: "left" as const },
  { key: "cta", el: <SceneCta />, dir: "scale" as const },
];

const WITH_MUSIC = true;
const WITH_VO = true;

// Voiceover: one clip per scene (public/vo/voN.mp3). Replace these files with a
// natural neural voice via scripts/generate_vo.py — same filenames, no code
// change needed. `dur` (frames) is the approx clip length, used only to duck
// the music under the VO.
const VO = [
  { file: "vo/vo1.mp3", from: scenes.hook.from + 4, dur: 100 },
  { file: "vo/vo2.mp3", from: scenes.problem.from + 6, dur: 136 },
  { file: "vo/vo3.mp3", from: scenes.intro.from + 6, dur: 137 },
  { file: "vo/vo4.mp3", from: scenes.demoTeks.from + 10, dur: 151 },
  { file: "vo/vo5.mp3", from: scenes.demoStruk.from + 8, dur: 146 },
  { file: "vo/vo6.mp3", from: scenes.insight.from + 8, dur: 274 },
  { file: "vo/vo7.mp3", from: scenes.mimpi.from + 8, dur: 223 },
  { file: "vo/vo8.mp3", from: scenes.tagline.from + 6, dur: 145 },
  { file: "vo/vo9.mp3", from: scenes.cta.from + 4, dur: 104 },
];

// Music volume: base level, ducked toward `duck` while any VO clip is playing,
// with short cross-ramps so the dips are smooth.
const musicVolume = (frame: number): number => {
  const base = WITH_VO ? 1.0 : 0.9;
  const duck = 0.5;
  const ramp = 10;
  let v = base;
  for (const clip of VO) {
    const start = clip.from;
    const end = clip.from + clip.dur;
    if (frame >= start - ramp && frame <= end + ramp) {
      const d = interpolate(
        frame,
        [start - ramp, start, end, end + ramp],
        [base, duck, duck, base],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
      v = Math.min(v, d);
    }
  }
  return v;
};

export const RecehinPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#FFFFFF" }}>
      {order.map(({ key, el, dir }) => {
        const s = scenes[key as keyof typeof scenes];
        return (
          <Sequence key={key} from={s.from} durationInFrames={s.durationInFrames} name={key}>
            <SceneWrap dir={dir} durationInFrames={s.durationInFrames}>
              {el}
            </SceneWrap>
          </Sequence>
        );
      })}

      {WITH_MUSIC ? (
        <Audio src={staticFile("music/bed.mp3")} volume={(f) => musicVolume(f)} />
      ) : null}

      {WITH_VO
        ? VO.map((clip) => (
            <Sequence key={clip.file} from={clip.from} name={`vo-${clip.file}`}>
              <Audio src={staticFile(clip.file)} volume={1} />
            </Sequence>
          ))
        : null}
    </AbsoluteFill>
  );
};
