"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { person } from "@/data/resume";
import { navLinks } from "@/lib/nav";
import { toggleTheme } from "./ThemeToggle";
import { SearchIcon } from "../ui/Icons";

type Command = { id: string; label: string; group: "Go to" | "Actions" | "Secret"; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
    } else {
      setQuery("");
      setIndex(0);
      setNotice("");
      returnFocus.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const close = () => setOpen(false);
    const goTo = (id: string) => () => {
      close();
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "auto" }));
    };
    const openUrl = (url: string) => () => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    };

    const list: Command[] = [
      { id: "home", label: "Home", group: "Go to", run: goTo("home") },
      ...navLinks.map((l) => ({ id: l.id, label: l.label, group: "Go to" as const, run: goTo(l.id) })),
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        run: () =>
          navigator.clipboard
            .writeText(person.email)
            .then(() => setNotice("Email copied to clipboard"))
            .catch(() => setNotice(person.email)),
      },
      { id: "resume", label: "Download resume", group: "Actions", run: openUrl(person.resumeUrl) },
      { id: "github", label: "Open GitHub", group: "Actions", run: openUrl(person.github) },
      { id: "linkedin", label: "Open LinkedIn", group: "Actions", run: openUrl(person.linkedin) },
      {
        id: "theme",
        label: "Toggle light / dark theme",
        group: "Actions",
        run: () => {
          toggleTheme();
          close();
        },
      },
    ];

    if (query.trim().toLowerCase() === "oee") {
      list.unshift({
        id: "oee",
        label: "Availability × Performance × Quality",
        group: "Secret",
        run: () => setNotice("This portfolio's OEE: 100%. Zero downtime, zero defects. (The real one is in my projects.)"),
      });
    }
    return list;
  }, [query]);

  const results = commands.filter(
    (c) => c.group === "Secret" || c.label.toLowerCase().includes(query.trim().toLowerCase())
  );
  const safeIndex = Math.min(index, Math.max(results.length - 1, 0));

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      results[safeIndex]?.run();
    } else if (e.key === "Tab") e.preventDefault();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-bg/70 p-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.15 }}
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="card w-full max-w-lg overflow-hidden shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <SearchIcon className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                  setNotice("");
                }}
                onKeyDown={onInputKey}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={results[safeIndex] ? `cmd-${results[safeIndex].id}` : undefined}
                aria-label="Search commands"
                placeholder="Jump to a section or run an action…"
                className="h-14 w-full bg-transparent text-fg placeholder:text-muted focus:outline-none"
              />
            </div>

            <ul id="palette-list" role="listbox" className="max-h-72 overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-6 text-center text-muted">No matching commands</li>}
              {results.map((cmd, i) => (
                <li
                  key={cmd.id}
                  id={`cmd-${cmd.id}`}
                  role="option"
                  aria-selected={i === safeIndex}
                  onMouseMove={() => setIndex(i)}
                  onClick={cmd.run}
                  className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 ${
                    i === safeIndex ? "bg-accent/15 text-fg" : "text-muted"
                  }`}
                >
                  <span>{cmd.label}</span>
                  <span className="font-mono text-step--1 opacity-70">{cmd.group}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-step--1 text-muted">
              <span aria-live="polite">{notice || "↑↓ navigate · Enter select · Esc close"}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
