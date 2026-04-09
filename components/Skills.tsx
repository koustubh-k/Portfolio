"use client";

import { motion } from "framer-motion";

import type { AnimationConfig, SiteContent } from "@/lib/content";
import { hexToRgba } from "@/lib/color";

type SkillsProps = {
  site: SiteContent;
  motionConfig: AnimationConfig;
};

export default function Skills({ site, motionConfig }: SkillsProps) {
  if (site.skills.length === 0) {
    return null;
  }

  const hoverBorderColor = hexToRgba(site.theme.accent_secondary, 0.75);
  const hoverGlow = `0 0 14px ${hexToRgba(site.theme.accent_secondary, 0.2)}`;
  const baseBorderColor = "rgba(255, 255, 255, 0.15)";

  return (
    <section className="section-shell py-14" id="skills">
      <h2 className="section-title">{site.ui.section_titles.skills}</h2>

      <div className="mt-8 space-y-5">
        {site.skills.map((group, index) => (
          <motion.article
            className="surface-card p-5 md:p-6"
            key={`${group.category}-${index}`}
            initial={{ opacity: 0, y: motionConfig.distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: motionConfig.duration, delay: index * motionConfig.stagger }}
          >
            <h3 className="text-lg font-semibold md:text-xl">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {group.items.map((skill) => (
                <motion.span
                  className="rounded-full border border-white/15 px-3 py-1.5 text-sm muted-copy"
                  key={skill}
                  style={{ borderColor: baseBorderColor, boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: hoverBorderColor,
                    boxShadow: hoverGlow,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
