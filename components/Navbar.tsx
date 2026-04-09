"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

import type { SiteContent } from "@/lib/content";

type NavbarProps = {
  site: SiteContent;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "KK";
}

export default function Navbar({ site }: NavbarProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 14);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const initials = useMemo(() => getInitials(site.name), [site.name]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          hasScrolled ? "pt-3" : "pt-0"
        }`}
      >
        <nav
          className={`section-shell flex h-16 items-center justify-between transition-all duration-300 ${
            hasScrolled
              ? "surface-card bg-[color-mix(in_srgb,var(--bg-surface)_85%,transparent)] backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <a
            href="#"
            className="mono-tag text-lg font-semibold tracking-widest"
            style={{ color: "var(--accent-primary)" }}
          >
            {initials}
          </a>

          <ul className="hidden items-center gap-6 text-sm text-[color:var(--text-secondary)] md:flex">
            {site.ui.nav_links.map((link) => (
              <li key={link.href}>
                <a
                  className="transition-colors hover:text-[color:var(--text-primary)]"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {site.show_resume_button && site.resume_file ? (
              <a
                className="hidden h-11 min-w-[116px] items-center justify-center rounded-[var(--radius)] border border-[color:var(--accent-primary)] px-4 text-sm font-medium md:inline-flex"
                href={site.resume_file}
                download
              >
                {site.ui.labels.resume_button}
              </a>
            ) : null}

            <button
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-white/20 md:hidden"
              onClick={() => setMenuOpen((previous) => !previous)}
              type="button"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 flex min-h-screen flex-col bg-[color:var(--bg-base)]/95 px-8 pt-28 backdrop-blur-xl md:hidden">
          <ul className="flex flex-1 flex-col gap-7 text-2xl" role="list">
            {site.ui.nav_links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {site.show_resume_button && site.resume_file ? (
            <a
              className="mb-10 inline-flex h-12 w-full items-center justify-center rounded-[var(--radius)] border border-[color:var(--accent-primary)]"
              download
              href={site.resume_file}
              onClick={() => setMenuOpen(false)}
            >
              {site.ui.labels.resume_button}
            </a>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
