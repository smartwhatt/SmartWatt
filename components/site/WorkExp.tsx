"use client";

import { useState } from "react";
import { useContent } from "./ThemeProvider";
import type { WorkKind } from "@/lib/types";

export function Work() {
  const c = useContent();
  const all = c.work;

  const [filter, setFilter] = useState<"all" | WorkKind>("all");
  const filtered =
    filter === "all" ? all : all.filter((w) => w.kind === filter);

  return (
    <section
      id="work"
      style={{ padding: "80px 48px", maxWidth: 1280, margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 36,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-accent)",
              letterSpacing: 1.5,
              // textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Selected Work
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.5vw, 56px)",
              letterSpacing: -1.5,
              margin: 0,
            }}
          >
            Things I&apos;ve{" "}
            <em
              style={{
                color: "var(--color-accent)",
                fontWeight: 500,
                fontStyle: "normal",
              }}
            >
              shipped
            </em>
            , written, or researched.
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {(
            [
              ["all", "All"],
              ["research", "Research"],
              ["engineering", "Engineering"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              style={{
                padding: "8px 14px",
                background: filter === k ? "var(--color-ink)" : "transparent",
                color: filter === k ? "var(--color-bg)" : "var(--color-muted)",
                border: `1px solid ${filter === k ? "var(--color-ink)" : "var(--color-rule)"}`,
                borderRadius: 2,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: 1,
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-rule)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "90px 1fr 1fr 100px 100px",
            padding: "14px 0",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--color-muted)",
            letterSpacing: 1.2,
            textTransform: "uppercase",
            borderBottom: "1px solid var(--color-rule-soft)",
          }}
        >
          <span>№</span>
          <span>Title</span>
          <span>Venue / Role</span>
          <span>Kind</span>
          <span style={{ textAlign: "right" }}>Year</span>
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              padding: "40px 0",
              color: "var(--color-muted)",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          >
            No entries for this filter.
          </div>
        )}

        {filtered.map((row, i) => {
          const hasLink = row.link?.trim();
          return (
            <a
              key={row.id || i}
              href={hasLink || "#"}
              onClick={hasLink ? undefined : (e) => e.preventDefault()}
              target={hasLink ? "_blank" : undefined}
              rel={hasLink ? "noreferrer" : undefined}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr 1fr 100px 100px",
                padding: "24px 0",
                borderBottom: "1px solid var(--color-rule)",
                fontSize: 16,
                alignItems: "baseline",
                textDecoration: "none",
                color: "var(--color-ink)",
                transition: "background 0.25s, padding 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-bg-alt)";
                e.currentTarget.style.paddingLeft = "12px";
                e.currentTarget.style.paddingRight = "12px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.paddingLeft = "0";
                e.currentTarget.style.paddingRight = "0";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-muted)",
                }}
              >
                {row.displayId}
              </span>
              <span
                style={{
                  fontWeight: 500,
                  paddingRight: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {row.thumbnail && (
                  <img
                    src={row.thumbnail}
                    alt=""
                    style={{
                      width: 36,
                      height: 36,
                      objectFit: "cover",
                      borderRadius: 2,
                      border: "1px solid var(--color-rule)",
                      flexShrink: 0,
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                )}
                <span>{row.title}</span>
              </span>
              <span
                style={{
                  color: "var(--color-muted)",
                  fontSize: 14,
                  paddingRight: 24,
                }}
              >
                {row.venue}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--color-muted)",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                · {row.kind}
              </span>
              <span
                style={{
                  textAlign: "right",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--color-muted)",
                }}
              >
                {row.year} →
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function Experience() {
  const c = useContent();
  const exp = c.experience;

  return (
    <section
      id="research"
      style={{ padding: "80px 48px", maxWidth: 1280, margin: "0 auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 48,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--color-accent)",
              letterSpacing: 1.5,
              // textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Experience &amp; Research
          </div>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.5vw, 56px)",
              letterSpacing: -1.5,
              margin: 0,
            }}
          >
            Where I&apos;ve been
            <br />
            <em
              style={{
                color: "var(--color-accent)",
                fontWeight: 500,
                fontStyle: "normal",
              }}
            >
              working
            </em>{" "}
            &amp;{" "}
            <em
              style={{
                color: "var(--color-accent)",
                fontWeight: 500,
                fontStyle: "normal",
              }}
            >
              thinking
            </em>
            .
          </h2>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--color-muted)",
            letterSpacing: 1,
            // textTransform: "uppercase",
          }}
        >
          {exp.length} entries
        </div>
      </div>

      {exp.map((row, i) => (
        <div
          key={row.id || i}
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            padding: "32px 0",
            borderTop: "1px solid var(--color-rule)",
            gap: 32,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--color-muted)",
              paddingTop: 6,
              letterSpacing: 0.5,
            }}
          >
            {row.period}
          </div>
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                marginBottom: 6,
                color: "var(--color-ink)",
              }}
            >
              {row.role}
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--color-accent)",
                marginBottom: 12,
                fontFamily: "var(--font-mono)",
                letterSpacing: 0.3,
              }}
            >
              {row.org}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "var(--color-muted)",
                lineHeight: 1.6,
                maxWidth: 760,
              }}
            >
              {row.description}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
