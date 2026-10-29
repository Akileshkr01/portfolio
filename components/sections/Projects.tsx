"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/resume";
import { cn, stripPlaceholder } from "@/lib/utils";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import ProjectModal from "../ui/ProjectModal";
import { ArrowRightIcon, ExternalIcon, GithubIcon } from "../ui/Icons";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      eyebrow="03 · Featured work"
      title="Projects with a problem, a build, and an outcome."
      description="Open any card for the full case study."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.08}
            className={cn((i === 0 || (projects.length % 2 === 0 && i === projects.length - 1)) && "md:col-span-2")}
      >
            <article className="card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lift sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-step--1 text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-step--1 text-accent">{p.role}</span>
              </div>

              <h3 className={cn("mt-4 font-semibold", i === 0 ? "text-step-3" : "text-step-2")}>{p.title}</h3>
              <p className="mt-2 text-muted">{p.tagline}</p>

              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="eyebrow">Problem</dt>
                  <dd className="mt-1">{p.problem}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Outcome</dt>
                  <dd className="mt-1">{p.outcome}</dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                <button type="button" onClick={() => setSelected(p)} className="btn btn-primary">
                  Read case study <ArrowRightIcon width={18} height={18} />
                </button>
                {stripPlaceholder(p.github) && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} source code on GitHub`}
                    className="btn btn-ghost"
                  >
                    <GithubIcon width={18} height={18} /> Code
                  </a>
                )}
                {stripPlaceholder(p.live) && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} live demo`}
                    className="btn btn-ghost"
                  >
                    <ExternalIcon width={18} height={18} /> Live
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
