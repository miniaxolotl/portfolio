import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import profile from "@/data/profile.json";

export const alt = `${profile.name} — Thoughtful software. Built for real life. — ${profile.location}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OpenGraphImage = async () => {
  const [sans, bold] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/dm-sans-400.woff")),
    readFile(join(process.cwd(), "src/app/fonts/dm-sans-700.woff")),
  ]);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#1a1512",
        color: "#f5f0e6",
        padding: "66px 76px",
        fontFamily: "DM Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#b3a896",
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
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-2px",
        }}
      >
        <span>Thoughtful software.</span>
        <span style={{ color: "#9caf88" }}>Built for real life.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          borderTop: "1px solid #3d352a",
          paddingTop: 26,
          fontSize: 22,
          color: "#b3a896",
        }}
      >
        Web. Mobile. Developer tools. / {profile.location}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: sans, weight: 400, style: "normal" },
        { name: "DM Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
};

export default OpenGraphImage;
