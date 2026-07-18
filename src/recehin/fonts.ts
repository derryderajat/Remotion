import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Load Poppins from locally bundled woff2 files (public/fonts) so rendering
// never depends on network access to Google Fonts.
const weights: { weight: string; file: string }[] = [
  { weight: "400", file: "fonts/poppins-400.woff2" },
  { weight: "500", file: "fonts/poppins-500.woff2" },
  { weight: "600", file: "fonts/poppins-600.woff2" },
  { weight: "700", file: "fonts/poppins-700.woff2" },
  { weight: "800", file: "fonts/poppins-800.woff2" },
];

export const poppinsReady = Promise.all(
  weights.map(({ weight, file }) =>
    loadFont({
      family: "Poppins",
      url: staticFile(file),
      weight,
      style: "normal",
    }),
  ),
);
