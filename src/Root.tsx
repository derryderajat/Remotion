import "./index.css";
import { Composition } from "remotion";
import { RecehinPromo } from "./recehin/RecehinPromo";
import { CAROUSEL_H, CAROUSEL_W, DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./recehin/theme";
import { Slide1Hook } from "./recehin/carousel/Slide1Hook";
import { Slide2Value } from "./recehin/carousel/Slide2Value";
import { Slide3Cta } from "./recehin/carousel/Slide3Cta";
import { MrtVlog } from "./mrt/MrtVlog";
import { MRT_DURATION, MRT_FPS, MRT_H, MRT_W } from "./mrt/theme";
import "./recehin/fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RecehinPromo"
        component={RecehinPromo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />

      {/* Instagram carousel — 3 static slides at 4:5 (1080x1350) */}
      <Composition
        id="CarouselSlide1"
        component={Slide1Hook}
        durationInFrames={90}
        fps={FPS}
        width={CAROUSEL_W}
        height={CAROUSEL_H}
      />
      <Composition
        id="CarouselSlide2"
        component={Slide2Value}
        durationInFrames={90}
        fps={FPS}
        width={CAROUSEL_W}
        height={CAROUSEL_H}
      />
      <Composition
        id="CarouselSlide3"
        component={Slide3Cta}
        durationInFrames={90}
        fps={FPS}
        width={CAROUSEL_W}
        height={CAROUSEL_H}
      />

      {/* First-time-riding-MRT vlog — ~20s vertical, no audio */}
      <Composition
        id="MrtVlog"
        component={MrtVlog}
        durationInFrames={MRT_DURATION}
        fps={MRT_FPS}
        width={MRT_W}
        height={MRT_H}
      />
    </>
  );
};
