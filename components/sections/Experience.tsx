"use client";

import { useState } from "react";
import { experience } from "@/data/resume";
import { cn } from "@/lib/utils";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import Tag from "../ui/Tag";

export default function Experience() {
  const [active, setActive] = useState(0);
  const role = experience[active];
  const tabbed = experience.length > 1;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((a) => (a + 1) % experience.length);
    if (e.key === "ArrowLeft") setActive((a) => (a - 1 + experience.length) % experience.length);
  };

  return (
    <Section
      id="experience"
      eyebrow="02 · Experience"
      title="Where I've shipped."
      className="bg-surface/40"
    >
      <Reveal>
        {tabbed && (
          <div role="tablist" aria-label="Roles" onKeyDown={onKey} className="mb-6 flex flex-wrap gap-2">
            {experience.map((r, i) => (
              <button
                key={r.company + r.period}
                role="tab"
                id={`tab-${i}`}
                aria-selected={i === active}
                aria-controls={`panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  "min-h-[44px] rounded-md border px-4 py-2 font-medium transition",
                  i === active ? "border-accent bg-accent/10 text-accent" : "border-line text-muted hover:text-fg"
                )}
              >
                {r.company}
              </button>
            ))}
          </div>
        )}

        <article
          role={tabbed ? "tabpanel" : undefined}
          id={`panel-${active}`}
          aria-labelledby={tabbed ? `tab-${active}` : undefined}
          className="card relative p-6 sm:p-8"
        >
          <span aria-hidden="true" className="absolute left-0 top-8 h-12 w-1 rounded-r-full bg-accent" />
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-step-2 font-semibold">{role.title}</h3>
              <p className="mt-1 text-step-1 text-accent">{role.company}</p>
            </div>
            <div className="text-right font-mono text-step--1 text-muted">
              <p>{role.period}</p>
              <p>{role.location}</p>
            </div>
          </div>

          <p className="mt-4 text-muted">{role.summary}</p>

          <ul className="mt-6 space-y-3">
            {role.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {role.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
