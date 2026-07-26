import React from "react";
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { mrtColors, mrtFont } from "../theme";

// Full-bleed vertical clip with a slow Ken-Burns push, legibility scrims,
// a persistent location pill, and a story-style caption that springs in.
export const FootageClip: React.FC<{
  src: string;
  trimBefore: number;
  playbackRate: number;
  durationInFrames: number;
  caption?: string;
  kenBurns?: number;
  origin?: string;
  plain?: boolean; // hide all text/overlays for a clean footage-only cut
}> = ({
  src,
  trimBefore,
  playbackRate,
  durationInFrames,
  caption,
  kenBurns = 0.05,
  origin = "center center",
  plain = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1 + kenBurns], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const capIn = spring({ frame: frame - 8, fps, config: { damping: 14, mass: 0.6 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: origin }}>
        <OffthreadVideo
          src={staticFile(src)}
          trimBefore={trimBefore}
          playbackRate={playbackRate}
          muted
          toneMapped={false}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {plain ? null : (
        <>
      {/* top + bottom scrims for text legibility */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(6,16,28,0.55) 0%, rgba(6,16,28,0) 20%, rgba(6,16,28,0) 62%, rgba(6,16,28,0.72) 100%)",
        }}
      />

      {/* location pill */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 26px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.16)",
          border: "1.5px solid rgba(255,255,255,0.35)",
          backdropFilter: "blur(8px)",
          fontFamily: mrtFont,
          fontWeight: 700,
          fontSize: 34,
          color: mrtColors.white,
          textShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        📍 MRT Jakarta
      </div>

      {caption ? (
        <div
          style={{
            position: "absolute",
            left: 60,
            bottom: 120,
            transform: `translateY(${interpolate(capIn, [0, 1], [40, 0])}px)`,
            opacity: capIn,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "16px 30px",
              borderRadius: 20,
              background: "rgba(18,181,176,0.92)",
              fontFamily: mrtFont,
              fontWeight: 800,
              fontSize: 46,
              color: mrtColors.white,
              letterSpacing: -0.5,
              boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
            }}
          >
            {caption}
          </span>
        </div>
      ) : null}
        </>
      )}
    </AbsoluteFill>
  );
};
