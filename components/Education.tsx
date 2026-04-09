"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { AnimationConfig, SiteContent } from "@/lib/content";

type EducationProps = {
  site: SiteContent;
  motionConfig: AnimationConfig;
};

export default function Education({ site, motionConfig }: EducationProps) {
  if (site.education.length === 0 && site.certifications.length === 0) {
    return null;
  }

  return (
    <motion.article
      className="surface-card h-full p-5 md:p-6"
      initial={{ opacity: 0, y: motionConfig.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: motionConfig.duration }}
    >
      <h2 className="section-title text-2xl">{site.ui.section_titles.education}</h2>

      <div className="mt-5 space-y-4">
        {site.education.map((entry, index) => (
          <div className="rounded-[var(--radius)] border border-white/10 bg-black/10 p-4" key={`${entry.institution}-${index}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{entry.institution}</h3>
                {entry.degree ? <p className="mt-1 muted-copy">{entry.degree}</p> : null}
                {entry.score ? <p className="mt-2 text-sm muted-copy">{entry.score}</p> : null}
                {entry.duration ? <p className="mt-1 text-sm muted-copy">{entry.duration}</p> : null}
              </div>

              {entry.logo ? (
                <Image
                  alt={`${entry.institution} logo`}
                  className="rounded"
                  height={38}
                  src={entry.logo}
                  width={38}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {site.certifications.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] muted-copy">
            {site.ui.labels.certifications_label}
          </h3>
          <ul className="mt-3 space-y-2 text-sm muted-copy">
            {site.certifications.map((certification, index) => (
              <li key={`${certification.name}-${index}`}>
                <span className="text-[color:var(--text-primary)]">{certification.name}</span>
                {certification.issuer ? ` - ${certification.issuer}` : ""}
                {certification.year ? ` (${certification.year})` : ""}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </motion.article>
  );
}
