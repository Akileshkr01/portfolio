"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/resume";
import { stripPlaceholder } from "@/lib/utils";
import Tag from "./Tag";
import { CloseIcon, ExternalIcon, GithubIcon } from "./Icons";

type ProjectModalProps = { project: Project | null; onClose: () => void };

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const reduce = useReducedMotion();
  const open = project !== null;
  const duration = reduce ? 0 : 0.25;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-b-none p-6 shadow-lift sm:rounded-b-lg sm:p-8"
            initial={{ opacity: 0, y: reduce ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 32 }}
            transition={{ duration }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Case study</p>
                <h3 id="project-modal-title" className="mt-2 text-step-3 font-semibold">
                  {project.title}
                </h3>
                <p className="mt-2 text-muted">{project.tagline}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line hover:border-accent"
              >
                <CloseIcon />
              </button>
            </div>

            <dl className="mt-8 space-y-6">
              <div>
                <dt className="eyebrow">Problem</dt>
                <dd className="mt-2">{project.problem}</dd>
              </div>
              <div>
                <dt className="eyebrow">Role</dt>
                <dd className="mt-2">{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow">What I built</dt>
                <dd className="mt-2">
                  <ul className="list-disc space-y-2 pl-5 marker:text-accent">
                    {project.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Outcome</dt>
                <dd className="mt-2">{project.outcome}</dd>
              </div>
              <div>
                <dt className="eyebrow">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {stripPlaceholder(project.github) && (
                <a className="btn btn-ghost" href={project.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon /> Source code
                </a>
              )}
              {stripPlaceholder(project.live) && (
                <a className="btn btn-primary" href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalIcon /> Live demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
