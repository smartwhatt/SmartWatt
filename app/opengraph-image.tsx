import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadTtfFont(family: string, weight: number): Promise<ArrayBuffer> {
  // Request via old CSS API — returns TTF URLs (the format satori requires)
  const css = await fetch(
    `https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${weight}&subset=latin`,
    { headers: { "User-Agent": "Mozilla/4.0" } },
  ).then((r) => r.text());

  const url = css.match(/src:\s*url\(([^)]+\.ttf)\)/)?.[1];
  if (!url) throw new Error(`Could not extract TTF URL for ${family} ${weight}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OgImage() {
  const [profileData, fontData] = await Promise.all([
    readFile(path.join(process.cwd(), "public/img/profile.png")),
    loadTtfFont("Ubuntu", 300),
  ]);

  const profileSrc = `data:image/png;base64,${profileData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#0d1115",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Ubuntu, sans-serif",
      }}
    >
      {/* top accent bar */}
      <div
        style={{
          height: 3,
          background:
            "linear-gradient(90deg, #6ba1ee 0%, rgba(107,161,238,0.2) 60%, transparent 100%)",
        }}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          gap: 60,
        }}
      >
        {/* left — text */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.28em",
              color: "#6ba1ee",
              textTransform: "uppercase",
              marginBottom: 24,
              fontFamily: "Ubuntu, monospace",
            }}
          >
            smartwatt.me
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 52,
              fontWeight: 300,
              color: "#f4f1ec",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              marginBottom: 20,
            }}
          >
            <span>Smart</span>
            <span>Wattanapornmongkol</span>
          </div>

          <div
            style={{
              fontSize: 18,
              color: "#7a8390",
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            Engineer &amp; AI Researcher
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["Chulalongkorn University"].map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  color: "#6ba1ee",
                  background: "rgba(107,161,238,0.12)",
                  border: "1px solid rgba(107,161,238,0.25)",
                  borderRadius: 999,
                  padding: "6px 16px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* right — profile photo */}
        <div
          style={{
            width: 228,
            height: 228,
            borderRadius: 9999,
            border: "2px solid rgba(107,161,238,0.3)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileSrc}
            width={220}
            height={220}
            style={{ borderRadius: 9999, objectFit: "cover" }}
          />
        </div>
      </div>

      {/* bottom rule */}
      <div
        style={{
          borderTop: "1px solid rgba(244,241,236,0.08)",
          margin: "0 80px",
          paddingBottom: 32,
        }}
      />
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Ubuntu",
          data: fontData,
          weight: 300,
          style: "normal",
        },
      ],
    },
  );
}
