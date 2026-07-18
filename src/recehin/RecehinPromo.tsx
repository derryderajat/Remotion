import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
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

// Set to false to render a clean, music-free master.
const WITH_MUSIC = true;

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
        <Audio src={staticFile("music/bed.mp3")} volume={0.5} />
      ) : null}
    </AbsoluteFill>
  );
};
