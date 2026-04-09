"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import type { AnimationConfig, SiteContent } from "@/lib/content";

type AchievementsProps = {
  site: SiteContent;
  motionConfig: AnimationConfig;
};

type ParsedStat = {
  value: number;
  suffix: string;
};

function parseNumericStat(text: string): ParsedStat | null {
  const match = text.match(/(\d[\d,]*)(\+)?/);
  if (!match) {
    return null;
  }

  const parsed = Number.parseInt(match[1].replace(/,/g, ""), 10);
  if (Number.isNaN(parsed)) {
    return null;
  }

  return {
    value: parsed,
    suffix: match[2] ?? "",
  };
}

function CountUp({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    let frameId = 0;
    const start = performance.now();
    const duration = 1000;

    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(frame);
      }
    };

    frameId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [active, value]);

  return (
    <span className="text-sm font-semibold" style={{ color: "var(--accent-secondary)" }}>
      {current}
      {suffix}
    </span>
  );
}

export default function Achievements({ site, motionConfig }: AchievementsProps) {
  const [animateStats, setAnimateStats] = useState(false);

  const parsedStats = useMemo(() => site.achievements.map((entry) => parseNumericStat(entry)), [site.achievements]);

  if (site.achievements.length === 0) {
    return null;
  }

  return (
    <motion.article
      className="surface-card h-full p-5 md:p-6"
      initial={{ opacity: 0, y: motionConfig.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: motionConfig.duration }}
      onViewportEnter={() => setAnimateStats(true)}
    >
      <h2 className="section-title text-2xl">{site.ui.section_titles.achievements}</h2>

      <ul className="mt-5 space-y-3">
        {site.achievements.map((achievement, index) => {
          const stat = parsedStats[index];
          return (
            <li
              className="rounded-[var(--radius)] border-l-2 border-[color:var(--accent-primary)] bg-black/10 p-4"
              key={`${achievement}-${index}`}
            >
              <p className="text-sm leading-relaxed muted-copy md:text-base">{achievement}</p>
              {stat ? (
                <p className="mt-2">
                  <CountUp active={animateStats} suffix={stat.suffix} value={stat.value} />
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </motion.article>
  );
}
