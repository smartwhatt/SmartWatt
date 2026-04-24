"use client";

import { useState } from "react";
import { useContent } from "./SiteContentProvider";
import { Container, Eyebrow, FormLabel, Section, SectionHeading, Surface } from "./primitives";

export function Education() {
  const { education } = useContent();

  return (
    <Section id="education">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              A long <em className="font-medium not-italic text-[var(--color-accent)]">quiet</em> path.
            </>
          }
        />

        <div className="relative pl-6 sm:pl-8">
          <div className="absolute bottom-2 left-0 top-2 w-px bg-[var(--color-rule)]" />
          <div className="space-y-6">
            {education.map((item, index) => (
              <div
                key={item.id || index}
                className="relative grid gap-3 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-6"
              >
                <div
                  className={[
                    "absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border",
                    index === 0
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                      : "border-[var(--color-muted)] bg-[var(--color-bg)]",
                  ].join(" ")}
                />
                <div className="font-mono text-xs tracking-[0.16em] text-[var(--color-muted)]">
                  {item.year}
                </div>
                <Surface className="p-5 sm:p-6">
                  <h3 className="text-xl font-medium text-[var(--color-ink)]">
                    {item.school}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                    {item.description}
                  </p>
                </Surface>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function Contact() {
  const { contact } = useContent();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Required";
    if (!form.email.trim() || !/.+@.+\..+/.test(form.email)) nextErrors.email = "Valid email required";
    if (!form.subject.trim()) nextErrors.subject = "Required";
    if (!form.body.trim() || form.body.length < 10) nextErrors.body = "A few sentences please";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", subject: "", body: "" });
      window.setTimeout(() => setSent(false), 6000);
    }
  };

  const inputClassName =
    "w-full border-0 border-b bg-transparent px-0 py-3 text-base text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]";

  return (
    <Section id="contact">
      <Container className="space-y-10">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let&apos;s <em className="font-medium not-italic text-[var(--color-accent)]">talk</em>.
            </>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Surface className="p-6 sm:p-8">
            {contact.intro ? (
              <p className="max-w-xl text-base leading-8 text-[var(--color-muted)]">
                {contact.intro}
              </p>
            ) : null}

            <div className="mt-8 border-t border-[var(--color-rule)]">
              {contact.methods.map((method, index) => (
                <div
                  key={method.id || index}
                  className="grid gap-2 border-b border-[var(--color-rule)] py-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"
                >
                  <div className="font-mono text-[0.68rem] tracking-[0.22em] text-[var(--color-muted)]">
                    {method.label}
                  </div>

                  {method.href ? (
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-fit border-b border-[var(--color-accent)] pb-1 text-sm text-[var(--color-ink)] transition hover:text-[var(--color-accent-strong)]"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <span className="text-sm text-[var(--color-ink)]">{method.value}</span>
                  )}
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="relative overflow-hidden p-6 sm:p-8">
            {sent ? (
              <div className="absolute inset-0 z-10 flex animate-fadein flex-col justify-center bg-[var(--color-bg)]/95 p-8 backdrop-blur-sm">
                <Eyebrow className="mb-3">● message received</Eyebrow>
                <div className="text-3xl font-medium text-[var(--color-ink)]">Thank you.</div>
                <div className="mt-2 max-w-md text-sm leading-7 text-[var(--color-muted)]">
                  I&apos;ll reply as soon as I can, usually within a couple of days.
                </div>
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="space-y-6">
              {(["name", "email", "subject"] as const).map((key) => (
                <div key={key}>
                  <FormLabel label={key} error={errors[key]} />
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={form[key]}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, [key]: event.target.value }))
                    }
                    className={`${inputClassName} ${errors[key] ? "border-b-[#ff8f8f]" : "border-b-[var(--color-rule)]"}`}
                  />
                </div>
              ))}

              <div>
                <FormLabel label="Message" error={errors.body} />
                <textarea
                  rows={5}
                  value={form.body}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, body: event.target.value }))
                  }
                  className={`${inputClassName} min-h-32 resize-y ${errors.body ? "border-b-[#ff8f8f]" : "border-b-[var(--color-rule)]"}`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center rounded-full border border-[var(--color-ink)] bg-[var(--color-ink)] px-5 py-3 font-mono text-[0.68rem] tracking-[0.24em] text-[var(--color-bg)] transition hover:-translate-y-0.5"
              >
                Send message →
              </button>
            </form>
          </Surface>
        </div>
      </Container>
    </Section>
  );
}

export function Footer() {
  const { meta } = useContent();

  return (
    <footer className="mt-12 border-t border-[var(--color-rule)] py-8 sm:mt-16 sm:py-10">
      <Container className="flex flex-col gap-3 font-mono text-[0.68rem] tracking-[0.22em] text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {meta.copyrightYear || new Date().getFullYear()} {meta.name}
        </span>
        <span className="flex flex-wrap items-center gap-2 sm:justify-end">
          <span>
            {meta.location}
            {meta.timezone ? ` / ${meta.timezone}` : ""}
          </span>
          {meta.available ? <span className="text-[var(--color-accent)]">●</span> : null}
        </span>
      </Container>
    </footer>
  );
}
