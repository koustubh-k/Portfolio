"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

import type { AnimationConfig, SiteContent } from "@/lib/content";

type HeroProps = {
  site: SiteContent;
  motionConfig: AnimationConfig;
};

export default function Hero({ site, motionConfig }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef({ x: 24, y: 38 });
  const currentRef = useRef({ x: 24, y: 38 });
  const rafRef = useRef<number | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 24, y: 38 });

  useEffect(() => {
    const tick = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08;

      setSpotlight({
        x: currentRef.current.x,
        y: currentRef.current.y,
      });

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const socialLinks = useMemo(
    () => [
      { label: "GitHub", href: site.github, icon: Github },
      { label: "LinkedIn", href: site.linkedin, icon: Linkedin },
      { label: "Email", href: site.email ? `mailto:${site.email}` : "", icon: Mail },
    ].filter((item) => item.href),
    [site.email, site.github, site.linkedin],
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
      onMouseMove={(event) => {
        const bounds = sectionRef.current?.getBoundingClientRect();
        if (!bounds) {
          return;
        }

        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        targetRef.current = { x, y };
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, var(--accent-glow-36), transparent 62%)`,
        }}
      />

      <div className="section-shell relative z-10 grid items-center gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          {site.availability ? (
            <motion.p
              className="mb-5 inline-flex rounded-full border border-[color:var(--accent-secondary)]/60 bg-[color:var(--accent-secondary)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
              initial={{ opacity: 0, y: motionConfig.distance }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionConfig.duration }}
            >
              {site.availability}
            </motion.p>
          ) : null}

          <motion.h1
            className="section-title text-4xl md:text-6xl"
            initial={{ opacity: 0, y: motionConfig.distance }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionConfig.duration, delay: 0.06 }}
            style={{ color: "var(--text-primary)" }}
          >
            {site.name}
          </motion.h1>

          {site.title ? (
            <motion.p
              className="mt-3 text-xl font-medium"
              initial={{ opacity: 0, y: motionConfig.distance }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionConfig.duration, delay: 0.12 }}
              style={{ color: "var(--accent-primary)" }}
            >
              {site.title}
            </motion.p>
          ) : null}

          {site.tagline ? (
            <motion.p
              className="mt-5 max-w-2xl text-base leading-relaxed muted-copy md:text-lg"
              initial={{ opacity: 0, y: motionConfig.distance }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionConfig.duration, delay: 0.18 }}
            >
              {site.tagline}
            </motion.p>
          ) : null}

          <motion.div
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: motionConfig.distance }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionConfig.duration, delay: 0.24 }}
          >
            <div className="relative inline-flex rounded-[var(--radius)] p-[1px]">
              <span
                className="absolute inset-0 animate-[spin_3.2s_linear_infinite] rounded-[var(--radius)]"
                style={{
                  background:
                    "conic-gradient(from 180deg, var(--accent-primary), var(--accent-primary-25), var(--accent-primary))",
                }}
              />
              <a
                className="relative inline-flex h-12 min-w-[150px] items-center justify-center rounded-[var(--radius)] bg-[color:var(--bg-base)] px-5 text-sm font-semibold"
                href="#projects"
              >
                {site.ui.labels.view_projects_button}
              </a>
            </div>

            {site.show_resume_button && site.resume_file ? (
              <a
                className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-[var(--radius)] border border-white/20 px-5 text-sm font-semibold"
                download
                href={site.resume_file}
              >
                {site.ui.labels.download_resume_button}
              </a>
            ) : null}
          </motion.div>

          {socialLinks.length > 0 ? (
            <motion.div
              className="mt-7 flex items-center gap-3"
              initial={{ opacity: 0, y: motionConfig.distance }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionConfig.duration, delay: 0.3 }}
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] border border-white/20 text-[color:var(--text-secondary)] transition hover:-translate-y-1 hover:text-[color:var(--text-primary)]"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </motion.div>
          ) : null}
        </div>

        <motion.aside
          className="surface-card relative max-w-xl overflow-hidden p-6"
          initial={{ opacity: 0, y: motionConfig.distance }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionConfig.duration, delay: 0.2 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/85" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/85" />
          </div>

          <p className="mono-tag text-sm text-[color:var(--text-secondary)]">{site.ui.labels.terminal_title}</p>
          <p className="mono-tag mt-4 text-base md:text-lg">
            {site.ui.labels.terminal_command}
            <span className="ml-1 inline-block h-5 w-[2px] animate-pulse align-middle bg-[color:var(--accent-secondary)]" />
          </p>
          <p className="mt-6 text-sm leading-relaxed muted-copy">
            {site.ui.labels.terminal_description}
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
