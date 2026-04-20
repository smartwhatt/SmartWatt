"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import { saveContent, logout } from "@/lib/actions";
import { BasicsSection, StatusSection } from "./sections-top";
import {
  WorkSection,
  ExperienceSection,
  EducationSection,
  ContactSection,
} from "./sections-items";
import { Btn } from "./primitives";
import type { SiteContent } from "@/lib/types";

function deepEqual(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function AdminApp({
  initial,
  userEmail,
}: {
  initial: SiteContent;
  userEmail: string;
}) {
  const [mode, setModeRaw] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "dark";
    return (
      (localStorage.getItem("sw-admin-theme") as "light" | "dark") || "dark"
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-admin-theme", mode);
    try {
      localStorage.setItem("sw-admin-theme", mode);
    } catch {}
  }, [mode]);

  // Apply on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-admin-theme", mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMode = () =>
    setModeRaw((m) => (m === "light" ? "dark" : "light"));

  // ── Content state ───────────────────────────────────────────
  const [content, setContent] = useState<SiteContent>(() => {
    // Restore draft from localStorage if newer than server data
    try {
      const raw = localStorage.getItem("sw-admin-draft");
      if (raw) return JSON.parse(raw) as SiteContent;
    } catch {}
    return initial;
  });
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [saving, startSaving] = useTransition();

  const dirty = !deepEqual(content, initial);

  // Autosave draft
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem("sw-admin-draft", JSON.stringify(content));
        setSavedAt(Date.now());
      } catch {}
    }, 400);
    return () => clearTimeout(id);
  }, [content]);

  const update = useCallback((fn: (c: SiteContent) => SiteContent) => {
    setContent((prev) => fn(prev));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const publish = () => {
    startSaving(async () => {
      const res = await saveContent(content);
      if (res?.error) {
        showToast(`Error: ${res.error}`);
      } else {
        try {
          localStorage.removeItem("sw-admin-draft");
        } catch {}
        showToast("Published — site will reflect changes immediately.");
      }
    });
  };

  const resetToDraft = () => {
    if (!confirm("Discard all edits and revert to the last-published content?"))
      return;
    setContent(initial);
    try {
      localStorage.removeItem("sw-admin-draft");
    } catch {}
    showToast("Reset to published content.");
  };

  const handleLogout = () => {
    startSaving(async () => {
      await logout();
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--adm-bg)",
        color: "var(--adm-ink)",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "color-mix(in srgb, var(--adm-bg) 93%, transparent)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--adm-rule)",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--adm-accent)",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            ● editing
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              flex: 1,
              minWidth: 0,
              color: "var(--adm-ink)",
            }}
          >
            {content.meta.name || "Your profile"}
            <span
              style={{
                color: "var(--adm-muted)",
                fontWeight: 400,
                marginLeft: 10,
                fontSize: 13,
              }}
            >
              {dirty ? "· unpublished changes" : "· up to date"}
              {savedAt && (
                <span
                  style={{
                    marginLeft: 8,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--adm-muted-soft)",
                  }}
                >
                  {" "}
                  draft saved
                </span>
              )}
            </span>
            <span
              style={{
                marginLeft: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--adm-muted-soft)",
              }}
            >
              {userEmail}
            </span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Btn variant="ghost" onClick={toggleMode} title="Toggle theme">
              {mode === "light" ? "◐" : "◑"}
            </Btn>
            <Btn
              variant="default"
              onClick={resetToDraft}
              disabled={!dirty || saving}
            >
              Reset
            </Btn>
            <Btn variant="accent" onClick={publish} disabled={saving}>
              {saving ? "Saving…" : "Publish →"}
            </Btn>
            <Btn variant="ghost" onClick={handleLogout} title="Sign out">
              ⎋
            </Btn>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div
        style={{ maxWidth: 960, margin: "0 auto", padding: "28px 24px 80px" }}
      >
        {/* Profile header */}
        <div
          style={{
            marginBottom: 28,
            paddingBottom: 20,
            borderBottom: "1px solid var(--adm-rule)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--adm-muted)",
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Your profile · edit like a resume, publish when ready
          </div>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 300,
              letterSpacing: -1.2,
              margin: "0 0 12px",
              color: "var(--adm-ink)",
            }}
          >
            Hello,{" "}
            <span style={{ fontWeight: 500 }}>
              {content.meta.name.split(" ")[0] || "there"}
            </span>
            .
          </h1>
          <p
            style={{
              color: "var(--adm-muted)",
              fontSize: 15,
              margin: 0,
              maxWidth: 620,
              lineHeight: 1.55,
            }}
          >
            Update any section below. Changes autosave as a draft in this
            browser. When you&apos;re happy, hit{" "}
            <strong style={{ color: "var(--adm-ink)", fontWeight: 500 }}>
              Publish
            </strong>{" "}
            to push everything to the database — the site reflects it
            immediately.
          </p>
          {dirty && (
            <div
              style={{
                marginTop: 18,
                padding: "12px 16px",
                background: "var(--adm-accent-dim)",
                border:
                  "1px solid color-mix(in srgb, var(--adm-accent) 30%, transparent)",
                borderRadius: 4,
                fontSize: 13,
                color: "var(--adm-ink)",
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--adm-accent)",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                ● unpublished
              </span>
              <span style={{ flex: 1 }}>
                You have edits that aren&apos;t in the database yet.
              </span>
              <Btn
                variant="accent"
                onClick={publish}
                disabled={saving}
                style={{ padding: "6px 12px" }}
              >
                {saving ? "Saving…" : "Publish →"}
              </Btn>
            </div>
          )}
        </div>

        <BasicsSection content={content} update={update} />
        <StatusSection content={content} update={update} />
        <WorkSection content={content} update={update} />
        <ExperienceSection content={content} update={update} />
        <EducationSection content={content} update={update} />
        <ContactSection content={content} update={update} />
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--adm-ink)",
            color: "var(--adm-bg)",
            padding: "12px 18px",
            borderRadius: 4,
            fontSize: 13,
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            zIndex: 100,
            fontFamily: "var(--font-sans)",
            maxWidth: 480,
            animation: "fadein 0.3s",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
