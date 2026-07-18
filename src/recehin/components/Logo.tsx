import React from "react";
import { colors } from "../theme";

// Faithful SVG recreation of the Recehin mark: a blue-gradient stylised "R"
// built from rounded ribbon strokes, with a translucent overlap that darkens
// where the bowl and leg cross — set in a white rounded squircle.

export const LogoMark: React.FC<{
  size?: number;
  withPlate?: boolean;
  plateColor?: string;
  radius?: number;
}> = ({ size = 300, withPlate = true, plateColor = "#FFFFFF", radius }) => {
  const r = radius ?? size * 0.235;
  const id = React.useId().replace(/[:]/g, "");
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`g-main-${id}`} x1="150" y1="110" x2="380" y2="410" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={colors.blueLight} />
          <stop offset="1" stopColor={colors.blue} />
        </linearGradient>
        <linearGradient id={`g-deep-${id}`} x1="360" y1="120" x2="240" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={colors.blue} />
          <stop offset="1" stopColor={colors.blueDeep} />
        </linearGradient>
        <linearGradient id={`g-foot-${id}`} x1="150" y1="300" x2="150" y2="430" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={colors.blueLight} />
          <stop offset="1" stopColor="#BFDBFF" />
        </linearGradient>
      </defs>

      {withPlate ? (
        <rect x="0" y="0" width="512" height="512" rx={(r / size) * 512} fill={plateColor} />
      ) : null}

      {/* light lower-left foot / descender accent */}
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
        fill={`url(#g-foot-${id})`}
        opacity="0.9"
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
        fill={`url(#g-main-${id})`}
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
        fill={`url(#g-deep-${id})`}
      />

      {/* overlap shadow where leg meets bowl */}
      <path
        d="M214 245 L300 245 C312 245 322 251 328 260 L268 292 L214 292 Z"
        fill={colors.blueDeep}
        opacity="0.28"
      />
    </svg>
  );
};
