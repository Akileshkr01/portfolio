import { testimonials } from "@/data/resume";
import Reveal from "../ui/Reveal";
import Section from "../ui/Section";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials" eyebrow="Recommendations" title="What others say." className="bg-surface/40">
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="card h-full p-6 sm:p-8">
              <blockquote className="text-step-1">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6">
                <p className="font-medium">{t.name}</p>
                <p className="text-step--1 text-muted">{t.title}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
