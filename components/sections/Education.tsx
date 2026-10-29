import { achievements, certifications, education } from "@/data/resume";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";
import Tag from "../ui/Tag";

export default function Education() {
  return (
    <Section id="education" eyebrow="05 · Education" title="Trained as an engineer, certified as a builder.">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <article className="card h-full p-6 sm:p-8">
            <p className="font-mono text-step--1 text-muted">{education.period}</p>
            <h3 className="mt-2 text-step-2 font-semibold">{education.degree}</h3>
            <p className="mt-1 text-accent">{education.school}</p>
            <p className="text-step--1 text-muted">{education.location}</p>

            <p className="mt-6 font-display text-step-4 font-semibold leading-none">
              {education.cgpa}
              <span className="ml-2 font-mono text-step--1 font-normal text-muted">CGPA</span>
            </p>

            <p className="eyebrow mt-8">Relevant coursework</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <li key={c}>
                  <Tag>{c}</Tag>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.1} className="space-y-6">
          <div className="card p-6">
            <h3 className="eyebrow">Certifications</h3>
            <ul className="mt-4 space-y-3">
              {certifications.map((c) => (
                <li key={c.name}>
                  <p className="font-medium">{c.name}</p>
                  <p className="text-step--1 text-muted">{c.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h3 className="eyebrow">Achievements</h3>
            <ul className="mt-4 space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hl" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
