import "./index.css";
import { Composition } from "remotion";
import { RecehinPromo } from "./recehin/RecehinPromo";
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./recehin/theme";
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
    </>
  );
};
