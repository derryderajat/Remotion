import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Background } from "../components/Background";
import { LogoMark } from "../components/Logo";
import { colors, font, gradient, radius, DOMAIN } from "../theme";

// A polished, ad-ready poster (still, 1080x1920) that frames the REAL Recehin
// web dashboard screenshot (public/marketing/dashboard.png) inside a device
// card on the brand background, with a headline and a channel line. Render as
// a single PNG for use as a static ad / thumbnail.

// Real screenshot is 850x1920 and includes the phone's browser chrome (with the
// old recehin.my.id URL). We clip a clean window of just the app UI so the poster
// shows pure product — no stale URL bar.
const SRC_W = 850;
const SRC_H = 1920;
const PhoneStill: React.FC<{ src: string; width: number; cropTop?: number; viewH?: number }> = ({
  src,
  width,
  cropTop = 300, // source px to hide from the top (notch + browser bar + AI-insight sliver)
  viewH = 980, // source px tall window to show
}) => {
  const bezel = 16;
  const scale = width / SRC_W;
  const renderedH = SRC_H * scale;
  return (
    <div
      style={{
        width: width + bezel * 2,
        padding: bezel,
        borderRadius: radius.phone,
        background: "linear-gradient(160deg,#ffffff, #eaf1ff)",
        boxShadow:
          "0 50px 110px rgba(20,70,160,0.32), 0 10px 24px rgba(20,70,160,0.14), inset 0 0 0 1.5px rgba(255,255,255,0.9)",
      }}
    >
      <div
        style={{
          width,
          height: viewH * scale,
          borderRadius: radius.phone - bezel,
          overflow: "hidden",
          background: colors.white,
          position: "relative",
        }}
      >
        <Img
          src={src}
          style={{
            position: "absolute",
            top: -cropTop * scale,
            left: 0,
            width,
            height: renderedH,
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export const DashboardPoster: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: colors.bg0 }}>
      <Background tint={0.18} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "110px 70px 90px",
        }}
      >
        {/* brand lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 34 }}>
          <LogoMark size={78} />
          <span
            style={{
              fontFamily: font.family,
              fontWeight: 800,
              fontSize: 58,
              letterSpacing: -2,
              color: colors.ink,
            }}
          >
            Recehin
          </span>
        </div>

        <div
          style={{
            fontFamily: font.family,
            fontWeight: 800,
            fontSize: 74,
            lineHeight: 1.06,
            letterSpacing: -1.8,
            textAlign: "center",
            color: colors.ink,
            maxWidth: 900,
          }}
        >
          Semua duitmu,
          <br />
          <span style={{ color: colors.blue }}>dalam satu dashboard.</span>
        </div>

        <div
          style={{
            marginTop: 18,
            fontFamily: font.family,
            fontWeight: 600,
            fontSize: 36,
            color: colors.inkSoft,
            textAlign: "center",
          }}
        >
          Kategori otomatis · tren 6 bulan · forecast AI
        </div>

        <div style={{ marginTop: 54 }}>
          <PhoneStill src={staticFile("marketing/dashboard.png")} width={640} viewH={1300} />
        </div>
      </AbsoluteFill>

      {/* bottom channel bar */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            padding: "22px 52px",
            borderRadius: radius.xl,
            background: gradient.brand,
            color: colors.white,
            fontFamily: font.family,
            fontWeight: 800,
            fontSize: 40,
            boxShadow: "0 26px 60px rgba(20,70,160,0.4)",
          }}
        >
          {DOMAIN}
        </div>
      </div>
    </AbsoluteFill>
  );
};
