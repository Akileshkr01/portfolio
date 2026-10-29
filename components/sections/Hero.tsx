"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { coreStrengths, education, person, site } from "@/data/resume";
import { stripPlaceholder } from "@/lib/utils";
import { ArrowRightIcon, CalendarIcon, DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "../ui/Icons";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const specRows = [
  { label: "Role", value: person.role },
  { label: "Base", value: `${person.location}${person.openToRelocation ? " · open to relocation" : ""}` },
  { label: "Education", value: `${education.degree}, CGPA ${education.cgpa}` },
  { label: "Core stack", value: coreStrengths.join(" · ") },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const calendly = stripPlaceholder(site.calendlyUrl);

  return (
    <section id="home" aria-label="Introduction" className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div aria-hidden="true" className="bg-mesh absolute inset-0 -z-20" />
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10" />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <motion.div variants={container} initial={reduce ? "show" : "hidden"} animate="show">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-step--1 text-accent">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {person.availability}
            </span>
          </motion.div>

          <motion.p variants={item} className="eyebrow mt-6">
            {person.name} · {person.role}
          </motion.p>

          <motion.h1 variants={item} className="mt-4 text-step-5 font-semibold">
            {person.headline}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-step-1 text-muted">
            {person.valueProp}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              View work <ArrowRightIcon width={18} height={18} />
            </a>
            <a href={person.resumeUrl} download className="btn btn-ghost">
              <DownloadIcon width={18} height={18} /> Download resume
            </a>
            {calendly ? (
              <a href={calendly} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <CalendarIcon width={18} height={18} /> Book a call
              </a>
            ) : (
              <a href={`mailto:${person.email}`} className="btn btn-ghost">
                <MailIcon width={18} height={18} /> Email me
              </a>
            )}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-2">
            {[
              { label: "GitHub", href: person.github, Icon: GithubIcon },
              { label: "LinkedIn", href: person.linkedin, Icon: LinkedinIcon },
              { label: "Email", href: `mailto:${person.email}`, Icon: MailIcon },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-fg"
              >
                <Icon />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.aside
          aria-label="Profile summary"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="card relative p-6 sm:p-8"
        >
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent/40 font-display text-step-2 font-semibold text-accent-fg"
            >
              {person.initials}
            </div>
            <div>
              <p className="font-display text-step-1 font-semibold">{person.name}</p>
              <p className="font-mono text-step--1 text-muted">SPEC SHEET</p>
            </div>
          </div>
          <dl className="mt-6 divide-y divide-line">
            {specRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3">
                <dt className="font-mono text-step--1 uppercase tracking-wider text-muted">{row.label}</dt>
                <dd className="text-step-0">{row.value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>
    </section>
  );
}
