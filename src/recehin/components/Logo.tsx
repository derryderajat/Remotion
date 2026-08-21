import React from "react";
import { colors } from "../theme";

// Recehin mark — 2026 refresh: a solid black stylised "R" (built from rounded
// ribbon strokes) set on a golden-yellow rounded squircle with a soft light rim.

export const LogoMark: React.FC<{
  size?: number;
  withPlate?: boolean;
  plateColor?: string;
  markColor?: string;
  radius?: number;
}> = ({ size = 300, withPlate = true, plateColor = colors.brandYellow, markColor = colors.logoInk, radius }) => {
  const r = radius ?? size * 0.235;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {withPlate ? (
        <>
          {/* soft light rim around the squircle */}
          <rect
            x="6"
            y="6"
            width="500"
            height="500"
            rx={(r / size) * 512}
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="10"
          />
          <rect x="10" y="10" width="492" height="492" rx={(r / size) * 500} fill={plateColor} />
        </>
      ) : null}

      {/* lower-left foot / descender accent */}
      <path
        d="M150 300
           C150 286 161 275 175 275
           L214 275
           C228 275 239 286 239 300
           L239 392
           C239 406 228 417 214 417
           L175 417
           C161 417 150 406 150 392
           Z"
        fill={markColor}
      />

      {/* the bowl of the R (top loop) */}
      <path
        d="M150 138
           C150 124 161 113 175 113
           L300 113
           C352 113 394 155 394 207
           C394 259 352 301 300 301
           L214 301
           L214 245
           L300 245
           C321 245 338 228 338 207
           C338 186 321 169 300 169
           L214 169
           L214 392
           C214 406 203 417 189 417
           L175 417
           C161 417 150 406 150 392
           Z"
        fill={markColor}
      />

      {/* the diagonal leg of the R */}
      <path
        d="M243 250
           C255 240 273 241 284 253
           L392 373
           C403 385 402 404 390 415
           C378 425 360 424 349 412
           L241 292
           C230 280 231 261 243 250
           Z"
        fill={markColor}
      />
    </svg>
  );
};
