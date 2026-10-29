import type { Metadata } from "next";
import Link from "next/link";
import { person } from "@/data/resume";
import { ArrowRightIcon } from "@/components/ui/Icons";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div aria-hidden="true" className="bg-mesh absolute inset-0 -z-20" />
      <div aria-hidden="true" className="bg-blueprint absolute inset-0 -z-10" />

      <div className="container-page">
        <p className="eyebrow">Error 404 · Unplanned downtime</p>
        <h1 className="mt-4 text-step-5 font-semibold">This page is offline.</h1>
        <p className="mt-6 max-w-xl text-step-1 text-muted">
          The link you followed doesn&apos;t lead anywhere. Production resumes at the home page.
        </p>

        <dl className="card mt-8 grid max-w-md grid-cols-3 divide-x divide-line text-center">
          {[
            { k: "Availability", v: "0%" },
            { k: "Performance", v: "n/a" },
            { k: "Quality", v: "100%" },
          ].map(({ k, v }) => (
            <div key={k} className="p-4">
              <dt className="font-mono text-step--1 uppercase tracking-wider text-muted">{k}</dt>
              <dd className="mt-1 font-display text-step-2 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-step--1 text-muted">OEE = A × P × Q. Today&apos;s score: not great.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to {person.name.split(" ")[0]}&apos;s portfolio <ArrowRightIcon width={18} height={18} />
          </Link>
          <a href={`mailto:${person.email}`} className="btn btn-ghost">
            Report a broken link
          </a>
        </div>
      </div>
    </section>
  );
}
