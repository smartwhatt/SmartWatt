"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cx("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}
      {...props}
    />
  );
}

export function Section({
  className,
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return <section className={cx("py-16 sm:py-20 lg:py-24", className)} {...props} />;
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cx(
        "font-mono text-[0.68rem] tracking-[0.32em] text-[var(--color-accent)]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
        <h2 className="text-4xl font-light leading-none tracking-[-0.08em] text-[var(--color-ink)] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
      {meta ? (
        <div className="font-mono text-[0.72rem] tracking-[0.22em] text-[var(--color-muted)]">
          {meta}
        </div>
      ) : null}
    </div>
  );
}

export function PillButton({
  active = false,
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & {
  active?: boolean;
}) {
  return (
    <button
      className={cx(
        "rounded-full border px-4 py-2 font-mono text-[0.68rem] tracking-[0.22em] transition",
        active
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-bg)]"
          : "border-[var(--color-rule)] text-[var(--color-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]",
        className,
      )}
      {...props}
    />
  );
}

export function ActionLink({
  invert = false,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"a"> & {
  invert?: boolean;
}) {
  return (
    <a
      className={cx(
        "inline-flex items-center justify-center rounded-full border px-5 py-3 font-mono text-[0.7rem] tracking-[0.24em] transition duration-200 hover:-translate-y-0.5",
        invert
          ? "border-[var(--color-ink)] bg-[var(--color-ink)] !text-[var(--color-bg)]"
          : "border-[var(--color-rule)] text-[var(--color-ink)] hover:border-[var(--color-ink)]",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function Surface({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cx(
        "h-fit self-start rounded-[2rem] border border-[var(--color-rule)] bg-[var(--color-surface)]",
        className,
      )}
      {...props}
    />
  );
}

export function FormLabel({
  label,
  error,
}: {
  label: string;
  error?: string;
}) {
  return (
    <label className="mb-2 flex items-center justify-between font-mono text-[0.62rem] tracking-[0.24em] text-[var(--color-muted)]">
      <span>{label}</span>
      {error ? <span className="normal-case tracking-normal text-[#ff8f8f]">{error}</span> : null}
    </label>
  );
}
