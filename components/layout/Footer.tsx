import { person } from "@/data/resume";
import { navLinks } from "@/lib/nav";
import { ArrowUpIcon, GithubIcon, LinkedinIcon, MailIcon } from "../ui/Icons";

const socials = [
  { label: "GitHub", href: person.github, Icon: GithubIcon },
  { label: "LinkedIn", href: person.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${person.email}`, Icon: MailIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-step-1 font-semibold">{person.name}</p>
          <p className="mt-1 text-muted">{person.role}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-muted transition-colors hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface transition hover:-translate-y-0.5 hover:border-accent"
            >
              <Icon />
            </a>
          ))}
          <a
            href="#home"
            aria-label="Back to top"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface transition hover:-translate-y-0.5 hover:border-accent"
          >
            <ArrowUpIcon />
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="container-page flex flex-wrap justify-between gap-2 py-6 font-mono text-step--1 text-muted">
          <span>© {new Date().getFullYear()} {person.name}</span>
          <span>
            Built with{" "}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Next.js
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
