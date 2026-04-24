"use client";

import { Fragment } from "react";
import { useContent } from "./SiteContentProvider";
import { ActionLink, Container, Section, Surface } from "./primitives";

function parseHeadline(str: string) {
  if (!str) return null;

  const parts = str.split(/(\[[^\]]+\]|\{[^}]+\})/g);

  return parts.map((part, index) => {
    if (/^\[.+\]$/.test(part)) {
      return (
        <em key={index} className="font-medium not-italic text-accent">
          {part.slice(1, -1)}
        </em>
      );
    }

    if (/^\{.+\}$/.test(part)) {
      return (
        <span key={index} className="font-medium">
          {part.slice(1, -1)}
        </span>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function Lines({ text }: { text: string }) {
  if (!text) return null;

  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {line}
          {index < lines.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero() {
  const { hero, meta } = useContent();

  return (
    <Section id="index" className="pt-32 sm:pt-40 lg:pt-44">
      <Container>
        <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[0.72rem] tracking-[0.28em] text-accent sm:mb-10">
          <span>{meta.name}</span>
          {meta.location ? (
            <span className="text-muted">/ {meta.location}</span>
          ) : null}
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <div>
            <h1 className="max-w-5xl text-[clamp(2.1rem,5.4vw,4.4rem)] font-light leading-none tracking-[-0.055em] text-ink">
              {parseHeadline(hero.headlineLine1)}
              <br />
              {parseHeadline(hero.headlineLine2)}
              <br />
              {parseHeadline(hero.headlineLine3)}
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {hero.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ActionLink href="#work" invert>
                View work →
              </ActionLink>
              <ActionLink href="#contact">Get in touch</ActionLink>
            </div>
          </div>

          <Surface className="relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-accent),transparent)] opacity-60" />
            <div className="space-y-7 border-l border-(--color-rule) pl-5 sm:pl-6">
              {hero.currently ? (
                <div>
                  <div className="mb-3 font-mono text-[0.62rem] tracking-[0.24em] text-muted">
                    Currently
                  </div>
                  <div className="text-sm leading-7 text-ink">
                    <Lines text={hero.currently} />
                  </div>
                </div>
              ) : null}

              {hero.openTo ? (
                <div>
                  <div className="mb-3 font-mono text-[0.62rem] tracking-[0.24em] text-muted">
                    Open to
                  </div>
                  <div className="text-sm leading-7 text-ink">
                    <Lines text={hero.openTo} />
                  </div>
                </div>
              ) : null}

              {hero.stack ? (
                <div>
                  <div className="mb-3 font-mono text-[0.62rem] tracking-[0.24em] text-muted">
                    Stack
                  </div>
                  <div className="font-mono text-xs leading-7 text-muted">
                    <Lines text={hero.stack} />
                  </div>
                </div>
              ) : null}
            </div>
          </Surface>
        </div>
      </Container>
    </Section>
  );
}
