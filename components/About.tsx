"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { AnimationConfig, SiteContent } from "@/lib/content";

type AboutProps = {
  site: SiteContent;
  motionConfig: AnimationConfig;
};

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function About({ site, motionConfig }: AboutProps) {
  return (
    <section className="section-shell py-14" id="about">
      <motion.div
        className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]"
        initial={{ opacity: 0, y: motionConfig.distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: motionConfig.duration }}
      >
        <div className="surface-card flex min-h-[250px] items-center justify-center overflow-hidden p-6 md:min-h-[300px]">
          {site.profile_photo ? (
            <Image
              alt={`${site.name} profile photo`}
              className="h-auto w-[220px] rounded-[var(--radius)] object-cover sm:w-[250px] md:w-[280px]"
              height={420}
              quality={75}
              src={site.profile_photo}
              width={320}
              sizes="(max-width: 640px) 220px, (max-width: 768px) 250px, 280px"
            />
          ) : (
            <div className="flex h-56 w-56 items-center justify-center rounded-full border border-[color:var(--accent-primary)]/50 bg-[color:var(--bg-surface-2)] text-6xl font-bold">
              {initialsFromName(site.name)}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="section-title">{site.ui.section_titles.about}</h2>

          {site.bio ? (
            <p className="text-base leading-relaxed muted-copy md:text-lg">{site.bio}</p>
          ) : null}

          {site.interests.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {site.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border px-4 py-2 text-sm"
                  style={{
                    borderColor: "color-mix(in srgb, var(--accent-secondary) 70%, transparent)",
                    color: "var(--text-primary)",
                    boxShadow: "0 0 20px color-mix(in srgb, var(--accent-secondary) 20%, transparent)",
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
}
