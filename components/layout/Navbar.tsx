"use client";

import { useEffect, useState } from "react";
import { person } from "@/data/resume";
import { navLinks } from "@/lib/nav";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon, SearchIcon } from "../ui/Icons";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = ["home", ...navLinks.map((l) => l.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          aria-label={`${person.name}, back to top`}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface font-mono text-step--1 font-semibold text-accent"
        >
          {person.initials}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "location" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-step--1 font-medium transition-colors",
                    active === link.id ? "text-fg" : "text-muted hover:text-fg"
                  )}
                >
                  {link.label}
                  {active === link.id && (
                    <span aria-hidden="true" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            aria-label="Open command palette"
            className="hidden h-11 items-center gap-2 rounded-md border border-line bg-surface px-3 text-muted transition hover:border-accent hover:text-fg sm:inline-flex"
          >
            <SearchIcon width={16} height={16} />
            <kbd className="font-mono text-step--1">Ctrl/⌘ K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line bg-surface md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line md:hidden">
          <ul className="container-page py-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? "location" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-3 font-medium",
                    active === link.id ? "bg-surface text-accent" : "text-muted"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
