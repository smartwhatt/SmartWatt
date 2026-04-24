"use client";

import { useEffect, useState } from "react";
import { useContent } from "./SiteContentProvider";
import { Container } from "./primitives";

const links = ["Index", "Work", "Research", "Education", "Contact"] as const;

export default function Nav() {
  const { meta } = useContent();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition",
        scrolled
          ? "border-[var(--color-rule)] bg-[color-mix(in_srgb,var(--color-bg)_78%,transparent)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      ].join(" ")}
    >
      <Container className="flex min-h-18 items-center justify-between gap-6 py-4 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">
        <a href="#top" className="shrink-0 text-[var(--color-ink)]">
          {meta.shortName}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="transition hover:text-[var(--color-ink)]"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {meta.available ? (
            <span className="text-[var(--color-accent)]">● available</span>
          ) : null}
        </div>
      </Container>
    </nav>
  );
}
