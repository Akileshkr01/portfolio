import type { ComponentType, SVGProps } from "react";
import { coreStrengths, skillGroups } from "@/data/resume";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import Tag from "../ui/Tag";
import { CloudIcon, CodeIcon, CpuIcon, DatabaseIcon, GlobeIcon, SparklesIcon } from "../ui/Icons";

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Languages: CodeIcon,
  Web: GlobeIcon,
  Databases: DatabaseIcon,
  "GenAI / LLM": SparklesIcon,
  "Cloud & Tools": CloudIcon,
  "CS Fundamentals": CpuIcon,
};

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="04 · Skills"
      title="The toolkit, grouped honestly."
      description="No percentage bars. Just what I use and where it shows up in my projects."
      className="bg-surface/40"
    >
      <Reveal className="mb-10">
        <p className="eyebrow">Core strengths</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {coreStrengths.map((s, i) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-md border border-accent/40 bg-accent/10 px-4 py-2.5 font-medium"
            >
              <span className="font-mono text-step--1 text-accent">{String(i + 1).padStart(2, "0")}</span>
              {s}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.category] ?? CodeIcon;
          return (
            <Reveal key={group.category} delay={i * 0.06}>
              <div className="card h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/60">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon />
                  </span>
                  <h3 className="text-step-1 font-semibold">{group.category}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
