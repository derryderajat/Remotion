import React from "react";
import { OffthreadVideo, staticFile, useCurrentFrame, interpolate } from "remotion";
import { colors, radius, FOOTAGE } from "../theme";

// A rounded device card that holds a trimmed slice of the screen recording.
// The footage (850x1920) is shown at its native aspect inside the bezel, with
// a gentle Ken-Burns zoom to keep otherwise-static screens feeling alive.
export const PhoneFrame: React.FC<{
  trimBefore: number; // source frame to start from (30fps)
  playbackRate?: number;
  width?: number;
  kenBurns?: number; // extra zoom amount over the scene
  local?: number; // frames since scene start, for the zoom ramp
  localDuration?: number;
  muted?: boolean;
}> = ({
  trimBefore,
  playbackRate = 1,
  width = 600,
  kenBurns = 0.06,
  local,
  localDuration = 300,
  muted = true,
}) => {
  const frame = useCurrentFrame();
  const t = local ?? frame;
  const innerH = (width * FOOTAGE.height) / FOOTAGE.width;
  const zoom = interpolate(t, [0, localDuration], [1, 1 + kenBurns], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bezel = 16;

  return (
    <div
      style={{
        width: width + bezel * 2,
        padding: bezel,
        borderRadius: radius.phone,
        background: "linear-gradient(160deg,#ffffff, #eaf1ff)",
        boxShadow:
          "0 40px 90px rgba(20,70,160,0.28), 0 8px 20px rgba(20,70,160,0.12), inset 0 0 0 1.5px rgba(255,255,255,0.9)",
      }}
    >
      <div
        style={{
          width,
          height: innerH,
          borderRadius: radius.phone - bezel,
          overflow: "hidden",
          background: colors.white,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${zoom})`,
            transformOrigin: "center 30%",
          }}
        >
          <OffthreadVideo
            src={staticFile(FOOTAGE.src)}
            trimBefore={trimBefore}
            playbackRate={playbackRate}
            muted={muted}
            toneMapped={false}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};
