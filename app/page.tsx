import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import { getAnimationConfig, getSiteContent } from "@/lib/content";
import { getGitHubRepos } from "@/lib/github";

export default async function Home() {
  const site = getSiteContent();
  const motionConfig = getAnimationConfig(site.theme.animation_speed);
  const githubResult = await getGitHubRepos(site.github, site.github_projects);

  return (
    <main className="relative pb-12">
      <Navbar site={site} />
      <Hero site={site} motionConfig={motionConfig} />
      <About site={site} motionConfig={motionConfig} />
      <Experience site={site} motionConfig={motionConfig} />
      <Projects
        githubRepos={githubResult.repos}
        pinnedTokenMissing={githubResult.tokenMissingForPinned}
        motionConfig={motionConfig}
        site={site}
      />
      <Skills site={site} motionConfig={motionConfig} />

      <section className="section-shell grid gap-8 py-14 md:grid-cols-2 md:gap-10" id="education">
        <Education site={site} motionConfig={motionConfig} />
        <Achievements site={site} motionConfig={motionConfig} />
      </section>

      <Contact site={site} motionConfig={motionConfig} />

      <footer className="section-shell mt-10 border-t border-white/10 py-6 text-center text-sm muted-copy">
        <p>{`${site.ui.labels.footer_built_by_prefix} ${site.name} - ${new Date().getFullYear()}`}</p>
        <p className="mt-2">{site.ui.labels.footer_edit_note}</p>
      </footer>
    </main>
  );
}
