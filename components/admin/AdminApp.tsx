"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { logout, saveContent } from "@/lib/actions";
import type { SiteContent } from "@/lib/types";
import { Btn } from "./primitives";
import { ContactSection, EducationSection, ExperienceSection, WorkSection } from "./sections-items";
import { BasicsSection, StatusSection } from "./sections-top";

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
  const [content, setContent] = useState<SiteContent>(() => {
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

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem("sw-admin-draft", JSON.stringify(content));
        setSavedAt(Date.now());
      } catch {}
    }, 400);

    return () => window.clearTimeout(id);
  }, [content]);

  const update = useCallback((fn: (c: SiteContent) => SiteContent) => {
    setContent((prev) => fn(prev));
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
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
        showToast("Published. Site changes are live.");
      }
    });
  };

  const resetToDraft = () => {
    if (!confirm("Discard all edits and revert to the last-published content?")) return;
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
    <div className="min-h-screen bg-[var(--adm-bg)] text-[var(--adm-ink)]">
      <div className="sticky top-0 z-20 border-b border-[var(--adm-rule)] bg-[color-mix(in_srgb,var(--adm-bg)_93%,transparent)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-6 py-4">
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--adm-accent)]">
            ● editing
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--adm-ink)]">
              <span className="font-medium">{content.meta.name || "Your profile"}</span>
              <span className="text-[var(--adm-muted)]">{dirty ? "unpublished changes" : "up to date"}</span>
              {savedAt ? (
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--adm-muted-soft)]">
                  draft saved
                </span>
              ) : null}
            </div>
            <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[var(--adm-muted-soft)]">
              {userEmail}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Btn variant="default" onClick={resetToDraft} disabled={!dirty || saving}>
              Reset
            </Btn>
            <Btn variant="accent" onClick={publish} disabled={saving}>
              {saving ? "Saving…" : "Publish →"}
            </Btn>
            <Btn variant="ghost" onClick={handleLogout} title="Sign out">
              Sign out
            </Btn>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8 pb-20">
        <div className="mb-8 border-b border-[var(--adm-rule)] pb-6">
          <div className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--adm-muted)]">
            Your profile · edit like a resume, publish when ready
          </div>
          <h1 className="text-4xl font-light tracking-[-0.05em] text-[var(--adm-ink)]">
            Hello, <span className="font-medium">{content.meta.name.split(" ")[0] || "there"}</span>.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--adm-muted)]">
            Update any section below. Changes autosave as a local draft in this browser. When you&apos;re ready, hit{" "}
            <strong className="font-medium text-[var(--adm-ink)]">Publish</strong> to sync the database immediately.
          </p>

          {dirty ? (
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--adm-accent)_30%,transparent)] bg-[var(--adm-accent-dim)] px-4 py-3 text-sm text-[var(--adm-ink)]">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--adm-accent)]">
                ● unpublished
              </span>
              <span className="flex-1">You have edits that aren&apos;t in the database yet.</span>
              <Btn variant="accent" onClick={publish} disabled={saving} className="px-3 py-1.5">
                {saving ? "Saving…" : "Publish →"}
              </Btn>
            </div>
          ) : null}
        </div>

        <BasicsSection content={content} update={update} />
        <StatusSection content={content} update={update} />
        <WorkSection content={content} update={update} />
        <ExperienceSection content={content} update={update} />
        <EducationSection content={content} update={update} />
        <ContactSection content={content} update={update} />
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 rounded-xl border border-[var(--adm-rule)] bg-[var(--adm-card)] px-4 py-3 text-sm text-[var(--adm-ink)] shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
