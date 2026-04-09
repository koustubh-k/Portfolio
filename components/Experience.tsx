"use client";

import Image from "next/image";
import { Briefcase } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import type { AnimationConfig, SiteContent } from "@/lib/content";

type ExperienceProps = {
  site: SiteContent;
  motionConfig: AnimationConfig;
};

export default function Experience({ site, motionConfig }: ExperienceProps) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(timelineRef, { once: true, margin: "-15% 0px -15% 0px" });

  if (site.experience.length === 0) {
    return null;
  }

  return (
    <section className="section-shell py-14" id="experience">
      <h2 className="section-title">{site.ui.section_titles.experience}</h2>

      <div ref={timelineRef} className="relative mt-8 pl-10 md:pl-14">
        <motion.span
          aria-hidden
          className="absolute left-2 top-0 w-[2px] origin-top md:left-4"
          style={{
            background: "linear-gradient(var(--accent-primary), var(--accent-secondary))",
            height: "100%",
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: motionConfig.duration + 0.25, ease: "easeOut" }}
        />

        <div className="space-y-7">
          {site.experience.map((item, index) => (
            <motion.article
              className="surface-card relative p-5 md:p-6"
              key={`${item.company}-${item.role}-${index}`}
              initial={{ opacity: 0, y: motionConfig.distance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: motionConfig.duration, delay: index * motionConfig.stagger }}
            >
              <span
                aria-hidden
                className="absolute -left-[35px] top-6 flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--accent-primary)] bg-[color:var(--bg-base)] md:-left-[47px]"
              >
                {item.logo ? (
                  <Image
                    alt={`${item.company} logo`}
                    height={18}
                    src={item.logo}
                    width={18}
                  />
                ) : (
                  <Briefcase size={12} />
                )}
              </span>

              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-sm muted-copy">{item.company}{item.location ? ` - ${item.location}` : ""}</p>
                </div>
                {item.duration ? <p className="text-sm muted-copy">{item.duration}</p> : null}
              </header>

              {item.highlights.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed muted-copy md:text-base">
                  {item.highlights.map((highlight) => (
                    <li className="flex gap-2" key={highlight}>
                      <span className="pt-[2px]" style={{ color: "var(--accent-secondary)" }}>
                        -
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
