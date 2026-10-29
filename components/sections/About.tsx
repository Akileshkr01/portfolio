import { about } from "@/data/resume";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function About() {
  return (
    <Section id="about" eyebrow="01 · About" title="Engineer first, then developer.">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-5 text-step-1 text-muted">
          {about.story.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="card border-l-4 border-l-accent p-6">
            <p className="eyebrow">What I&apos;m looking for</p>
            <p className="mt-3 text-step-0">{about.lookingFor}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
