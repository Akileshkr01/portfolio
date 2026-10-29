import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("section-pad", className)}>
      <div className="container-page">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 text-step-3 font-semibold">
            {title}
          </h2>
          {description && <p className="mt-4 text-muted">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
