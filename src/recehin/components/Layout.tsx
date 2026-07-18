import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { Watermark } from "./Bits";

// Standard vertical scene: branded background + corner watermark + a padded
// column with a top (headline), middle (visual) and bottom (caption) zone.
export const SceneShell: React.FC<{
  children: React.ReactNode;
  tint?: number;
  watermark?: boolean;
  justify?: React.CSSProperties["justifyContent"];
}> = ({ children, tint = 0, watermark = true, justify = "space-between" }) => {
  return (
    <AbsoluteFill>
      <Background tint={tint} />
      {watermark ? <Watermark /> : null}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: justify,
          padding: "150px 70px 130px",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
