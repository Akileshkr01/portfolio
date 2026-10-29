"use client";

import { useState } from "react";
import { person, site } from "@/data/resume";
import { stripPlaceholder } from "@/lib/utils";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import { CalendarIcon, CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, MailIcon } from "../ui/Icons";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "w-full rounded-md border border-line bg-bg px-4 py-3 text-fg placeholder:text-muted/70 transition focus:border-accent focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const endpoint = stripPlaceholder(site.formspreeEndpoint);
  const calendly = stripPlaceholder(site.calendlyUrl);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy my email:", person.email);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;

    if (!endpoint) {
      const subject = `Hello from ${data.get("name")}`;
      const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
      window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="06 · Contact"
      title="Let's talk about your next hire."
      description="I'm actively looking for software and GenAI roles. The fastest way to reach me is email."
      className="bg-surface/40"
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${person.email}`} className="btn btn-primary">
              <MailIcon width={18} height={18} /> {person.email}
            </a>
            <button type="button" onClick={copyEmail} className="btn btn-ghost" aria-live="polite">
              {copied ? <CheckIcon width={18} height={18} /> : <CopyIcon width={18} height={18} />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>

          <ul className="space-y-3">
            <li>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-muted transition hover:text-accent"
              >
                <LinkedinIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-muted transition hover:text-accent"
              >
                <GithubIcon /> GitHub
              </a>
            </li>
            {calendly && (
              <li>
                <a
                  href={calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-muted transition hover:text-accent"
                >
                  <CalendarIcon /> Book a 20-minute call
                </a>
              </li>
            )}
          </ul>

          <p className="text-step--1 text-muted">
            Based in {person.location}
            {person.openToRelocation ? ". Open to relocation." : "."}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">
                Name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={field} />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block font-medium">
                Message
              </label>
              <textarea id="message" name="message" rows={5} required className={field} />
            </div>

            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60">
              {status === "sending" ? "Sending…" : "Send message"}
            </button>

            <p role="status" aria-live="polite" className="min-h-[1.5rem] text-step--1">
              {status === "sent" && <span className="text-accent">Thanks! Your message was sent. I&apos;ll reply soon.</span>}
              {status === "mailto" && <span className="text-accent">Opening your email app to send the message.</span>}
              {status === "error" && (
                <span className="text-fg">
                  Something went wrong. Please email me directly at{" "}
                  <a href={`mailto:${person.email}`} className="text-accent underline">
                    {person.email}
                  </a>
                  .
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
