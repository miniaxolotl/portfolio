import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Elias Mawa — Thoughtful software. Built for real life.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OpenGraphImage = async () => {
  const [sans, serif] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/dm-sans-400.woff")),
    readFile(join(process.cwd(), "src/app/fonts/instrument-serif-400.woff")),
  ]);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#191c18",
        color: "#eeeee5",
        padding: "66px 76px",
        fontFamily: "DM Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#adb1a2",
        }}
      >
        <span>Elias Mawa / Engineer & maker</span>
        <span>mawa.dev</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 72,
          fontFamily: "Instrument Serif",
          fontSize: 94,
          lineHeight: 1.08,
        }}
      >
        <span>Thoughtful software.</span>
        <span style={{ color: "#cad8af" }}>Built for real life.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          borderTop: "1px solid #363d30",
          paddingTop: 26,
          fontSize: 22,
          color: "#adb1a2",
        }}
      >
        Web. Mobile. Developer tools. / Edmonton, Canada.
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: sans, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
      ],
    },
  );
};

export default OpenGraphImage;
