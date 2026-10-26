import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadTtfFont(family: string, weight: number): Promise<ArrayBuffer> {
  // The legacy CSS endpoint returns TTF URLs, which is the format satori needs.
  const css = await fetch(
    `https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${weight}&subset=latin`,
    { headers: { "User-Agent": "Mozilla/4.0" } },
  ).then((r) => r.text());

  const url = css.match(/src:\s*url\(([^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`Could not extract TTF URL for ${family} ${weight}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OgImage() {
  const [profileData, serif, sans] = await Promise.all([
    readFile(path.join(process.cwd(), "public/img/profile.png")),
    loadTtfFont("Source Serif 4", 600),
    loadTtfFont("Instrument Sans", 400),
  ]);

  const profileSrc = `data:image/png;base64,${profileData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f8f7f3",
        borderTop: "4px solid #5c6a55",
        display: "flex",
        flexDirection: "column",
        color: "#1c1c18",
      }}
    >

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          gap: 56,
          padding: "52px 64px 34px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: 14,
              borderBottom: "1px solid #dedbd2",
              fontFamily: "Instrument Sans",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b6961",
            }}
          >
            <span>smartwatt.me</span>
            <span>Bangkok · UTC+7</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontFamily: "Source Serif 4",
                fontSize: 58,
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
              }}
            >
              Smart
            </span>
            <span
              style={{
                fontFamily: "Source Serif 4",
                fontSize: 58,
                fontWeight: 600,
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
              }}
            >
              Wattanapornmongkol
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 14,
              borderTop: "1px solid #dedbd2",
              fontFamily: "Instrument Sans",
              fontSize: 14,
              color: "#6b6961",
            }}
          >
            <span>Researcher, engineer &amp; teacher</span>
            <span>Chulalongkorn University</span>
          </div>
        </div>

        <div
          style={{
            width: 240,
            height: 300,
            alignSelf: "center",
            display: "flex",
            flexShrink: 0,
            border: "1px solid #dedbd2",
          }}
        >
          <img
            src={profileSrc}
            alt=""
            width={240}
            height={300}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 64px 22px",
          fontFamily: "Instrument Sans",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#6b6961",
        }}
      >
        <span>Language · data · systems · teaching</span>
        <span>Content from cv-resume</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Source Serif 4", data: serif, weight: 600, style: "normal" },
        { name: "Instrument Sans", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
