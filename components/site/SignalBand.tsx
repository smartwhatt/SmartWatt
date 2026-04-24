"use client";

import { useEffect, useState } from "react";
import { useContent } from "./SiteContentProvider";
import { Container, Section, Surface } from "./primitives";

const SAMPLE_COUNT = 96;

function seedBars(count: number, seed: number) {
  let value = seed * 9301 + 49297;
  const random = () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };

  return Array.from({ length: count }, (_, index) => {
    const time = index / count;
    const envelope =
      0.35 +
      0.4 * Math.sin(time * Math.PI * 1.6) +
      0.2 * Math.sin(time * Math.PI * 5 + seed);

    return Math.max(0.12, Math.min(1, envelope + (random() - 0.5) * 0.3));
  });
}

export default function SignalBand() {
  const { signal } = useContent();
  const caption = signal.caption || "three things shipping right now ↓";

  const [frame, setFrame] = useState(1);
  const [bars, setBars] = useState(() => seedBars(SAMPLE_COUNT, 1));
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setFrame((current) => {
        const next = current + 1;
        setBars(seedBars(SAMPLE_COUNT, next));
        return next;
      });
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <Section className="pt-0">
      <Container>
        <Surface
          className="p-5 sm:p-6"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <div className="mb-4 flex flex-col gap-2 font-mono text-[0.62rem] tracking-widest text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
            <span>signal / live / {SAMPLE_COUNT} samples</span>
            <span className="text-[var(--color-accent)]">
              ● tracking / frame {frame.toString().padStart(4, "0")}
            </span>
          </div>

          <div className="flex h-28 items-end gap-1 border-y border-[var(--color-rule)] py-3 sm:h-32">
            {bars.map((height, index) => {
              const isAccent = index % 11 === 0;

              return (
                <div
                  key={index}
                  className={[
                    "min-w-0 flex-1 rounded-sm transition-all duration-500 ease-out",
                    isAccent ? "bg-[var(--color-accent)]" : "bg-[var(--color-accent2)]",
                    hovering || isAccent ? "opacity-100" : "opacity-60",
                  ].join(" ")}
                  style={{
                    height: `${height * 100}%`,
                    transitionDelay: `${index * 4}ms`,
                  }}
                />
              );
            })}
          </div>

          <div className="mt-3 flex flex-col gap-2 font-mono text-[0.62rem] tracking-widest text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
            <span>t = 0</span>
            <span className="text-[var(--color-accent-strong)]">{caption}</span>
            <span>t = now</span>
          </div>
        </Surface>
      </Container>
    </Section>
  );
}
