"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, GitFork, Star } from "lucide-react";

import type { AnimationConfig, SiteContent } from "@/lib/content";
import { hexToRgba } from "@/lib/color";
import { extractGitHubUsername, type GitHubRepo } from "@/lib/github";

type ProjectsProps = {
  site: SiteContent;
  motionConfig: AnimationConfig;
  githubRepos: GitHubRepo[];
  pinnedTokenMissing: boolean;
};

function normalizeRepoUrl(url: string): string {
  return url.trim().replace(/\/+$/, "").toLowerCase();
}

function dateLabel(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

export default function Projects({ site, motionConfig, githubRepos, pinnedTokenMissing }: ProjectsProps) {
  const accentPrimaryGlow = hexToRgba(site.theme.accent_primary, 0.35);
  const accentSecondaryBorder = hexToRgba(site.theme.accent_secondary, 0.55);

  const featuredRepoUrls = new Set(
    site.projects.map((project) => normalizeRepoUrl(project.github)).filter(Boolean),
  );

  const dynamicRepos = githubRepos.filter((repo) => !featuredRepoUrls.has(normalizeRepoUrl(repo.url)));

  if (site.projects.length === 0 && dynamicRepos.length === 0) {
    return null;
  }

  const githubUsername = extractGitHubUsername(site.github);

  return (
    <section className="section-shell py-14" id="projects">
      <h2 className="section-title">{site.ui.section_titles.projects}</h2>

      {site.projects.length > 0 ? (
        <>
          <p className="mt-2 text-sm muted-copy">{site.ui.labels.featured_projects_label}</p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {site.projects.map((project, index) => (
              <motion.article
                className="surface-card flex h-full flex-col p-5 md:p-6"
                key={`${project.name}-${index}`}
                initial={{ opacity: 0, y: motionConfig.distance }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: `0 22px 38px ${accentPrimaryGlow}` }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: motionConfig.duration, delay: index * 0.08 }}
              >
                {project.badge ? (
                  <p className="mb-4 inline-flex w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
                    {project.badge}
                  </p>
                ) : null}

                <h3 className="text-xl font-semibold">{project.name}</h3>

                {project.tagline ? (
                  <p className="mt-2 text-sm" style={{ color: "var(--accent-primary)" }}>
                    {project.tagline}
                  </p>
                ) : null}

                {project.description ? (
                  <p className="mt-4 text-sm leading-relaxed muted-copy md:text-base">{project.description}</p>
                ) : null}

                {project.stack.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((stackItem) => (
                      <span
                        className="mono-tag rounded-full border px-3 py-1 text-xs"
                        key={stackItem}
                        style={{ borderColor: accentSecondaryBorder, color: "var(--text-secondary)" }}
                      >
                        {stackItem}
                      </span>
                    ))}
                  </div>
                ) : null}

                {project.role ? (
                  <p className="mt-5 text-sm muted-copy">
                    <span className="font-semibold text-[color:var(--text-primary)]">{site.ui.labels.role_prefix}: </span>
                    {project.role}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.github ? (
                    <a
                      className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] border border-white/20 px-3 text-sm"
                      href={project.github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Github size={16} />
                      {site.ui.labels.github_button}
                    </a>
                  ) : null}

                  {project.live ? (
                    <a
                      className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] border border-[color:var(--accent-primary)] px-3 text-sm"
                      href={project.live}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <ExternalLink size={16} />
                      {site.ui.labels.live_button}
                    </a>
                  ) : null}

                  {project.year ? <span className="ml-auto text-xs muted-copy">{project.year}</span> : null}
                </div>
              </motion.article>
            ))}
          </div>
        </>
      ) : null}

      {dynamicRepos.length > 0 ? (
        <>
          <p className="mt-10 text-sm muted-copy">
            {githubUsername
              ? `${site.ui.labels.github_repositories_label} (${githubUsername})`
              : site.ui.labels.github_repositories_label}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {dynamicRepos.map((repo, index) => {
              const tags = repo.topics.length > 0 ? repo.topics.slice(0, 5) : repo.language ? [repo.language] : [];

              return (
                <motion.article
                  className="surface-card flex h-full flex-col p-5 md:p-6"
                  key={repo.id}
                  initial={{ opacity: 0, y: motionConfig.distance }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, boxShadow: `0 22px 38px ${accentPrimaryGlow}` }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: motionConfig.duration, delay: index * 0.05 }}
                >
                  <h3 className="text-xl font-semibold">{repo.name}</h3>

                  {repo.description ? (
                    <p className="mt-3 text-sm leading-relaxed muted-copy md:text-base">{repo.description}</p>
                  ) : (
                    <p className="mt-3 text-sm leading-relaxed muted-copy md:text-base">
                      {site.ui.labels.no_repo_description}
                    </p>
                  )}

                  {tags.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          className="mono-tag rounded-full border px-3 py-1 text-xs"
                          key={`${repo.id}-${tag}`}
                          style={{ borderColor: accentSecondaryBorder, color: "var(--text-secondary)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex items-center gap-4 text-xs muted-copy">
                    <span className="inline-flex items-center gap-1">
                      <Star size={13} />
                      {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork size={13} />
                      {repo.forks}
                    </span>
                    {repo.updatedAt ? <span className="ml-auto">Updated {dateLabel(repo.updatedAt)}</span> : null}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] border border-white/20 px-3 text-sm"
                      href={repo.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Github size={16} />
                      {site.ui.labels.repository_button}
                    </a>

                    {repo.homepage ? (
                      <a
                        className="inline-flex h-10 items-center gap-2 rounded-[var(--radius)] border border-[color:var(--accent-primary)] px-3 text-sm"
                        href={repo.homepage}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <ExternalLink size={16} />
                        {site.ui.labels.live_button}
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </>
      ) : null}

      {pinnedTokenMissing && dynamicRepos.length === 0 && site.github_projects.mode !== "manual_only" ? (
        <p className="mt-6 text-sm text-amber-200">{site.ui.labels.pinned_repo_token_hint}</p>
      ) : null}
    </section>
  );
}
