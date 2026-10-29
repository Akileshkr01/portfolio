import { metrics } from "@/data/resume";
import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";

export default function ProofBar() {
  return (
    <section aria-label="Key numbers" className="border-y border-line bg-surface/60">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08} className="px-2 sm:px-6 lg:border-l lg:border-line lg:first:border-l-0">
              <dt className="eyebrow">{m.label}</dt>
              <dd className="mt-2">
                <span className="block font-display text-step-4 font-semibold leading-none">
                  <Counter value={m.value} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
                </span>
                <span className="mt-2 block text-step--1 text-muted">{m.note}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
