"use client";

import { useState } from "react";
import type { WorkKind } from "@/lib/types";
import { useContent } from "./SiteContentProvider";
import { Container, PillButton, Section, SectionHeading, Surface } from "./primitives";

export function Work() {
  const { work } = useContent();
  const [filter, setFilter] = useState<"all" | WorkKind>("all");

  const filtered = filter === "all" ? work : work.filter((item) => item.kind === filter);

  return (
    <Section id="work">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Selected Work"
          title={
            <>
              Things I&apos;ve <em className="font-medium not-italic text-[var(--color-accent)]">shipped</em>, written, or researched.
            </>
          }
        />

        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", "All"],
              ["research", "Research"],
              ["engineering", "Engineering"],
            ] as const
          ).map(([key, label]) => (
            <PillButton key={key} active={filter === key} onClick={() => setFilter(key)}>
              {label}
            </PillButton>
          ))}
        </div>

        <Surface className="overflow-hidden">
          <div className="hidden grid-cols-[5rem_minmax(0,1.4fr)_minmax(0,1fr)_6rem_5rem] gap-4 border-b border-[var(--color-rule-soft)] px-6 py-4 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-[var(--color-muted)] lg:grid">
            <span>№</span>
            <span>Title</span>
            <span>Venue / Role</span>
            <span>Kind</span>
            <span className="text-right">Year</span>
          </div>

          {filtered.length === 0 ? (
            <div className="px-6 py-12 font-mono text-sm text-[var(--color-muted)]">
              No entries for this filter.
            </div>
          ) : null}

          {filtered.map((item, index) => {
            const hasLink = Boolean(item.link?.trim());

            return (
              <a
                key={item.id || index}
                href={hasLink ? item.link : "#"}
                onClick={hasLink ? undefined : (event) => event.preventDefault()}
                target={hasLink ? "_blank" : undefined}
                rel={hasLink ? "noreferrer" : undefined}
                className="group grid gap-4 border-b border-[var(--color-rule)] px-6 py-6 transition hover:bg-[var(--color-bg-alt)] sm:px-8 lg:grid-cols-[5rem_minmax(0,1.4fr)_minmax(0,1fr)_6rem_5rem] lg:items-start"
              >
                <span className="font-mono text-xs text-[var(--color-muted)]">
                  {item.displayId}
                </span>

                <span className="flex items-start gap-4 pr-0 lg:pr-6">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="mt-0.5 h-11 w-11 rounded-md border border-[var(--color-rule)] object-cover"
                    />
                  ) : null}
                  <span className="text-lg font-medium text-[var(--color-ink)] transition group-hover:translate-x-1">
                    {item.title}
                  </span>
                </span>

                <span className="pr-0 text-sm leading-6 text-[var(--color-muted)] lg:pr-6">
                  {item.venue}
                </span>

                <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {item.kind}
                </span>

                <span className="font-mono text-xs text-[var(--color-muted)] lg:text-right">
                  {item.year} →
                </span>
              </a>
            );
          })}
        </Surface>
      </Container>
    </Section>
  );
}

export function Experience() {
  const { experience } = useContent();

  return (
    <Section id="research">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Experience & Research"
          meta={`${experience.length} entries`}
          title={
            <>
              Where I&apos;ve been <br className="hidden sm:block" />
              <em className="font-medium not-italic text-[var(--color-accent)]">working</em> &amp;{" "}
              <em className="font-medium not-italic text-[var(--color-accent)]">thinking</em>.
            </>
          }
        />

        <div className="space-y-4">
          {experience.map((item, index) => (
            <Surface
              key={item.id || index}
              className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-8"
            >
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {item.period}
              </div>

              <div>
                <h3 className="text-2xl font-medium text-[var(--color-ink)]">
                  {item.role}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {item.org}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  {item.description}
                </p>
              </div>
            </Surface>
          ))}
        </div>
      </Container>
    </Section>
  );
}
