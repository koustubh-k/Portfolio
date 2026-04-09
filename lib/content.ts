import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { hexToRgba } from "./color";

export type AnimationSpeed = "subtle" | "medium" | "heavy";

export type ThemeTokens = {
  accent_primary: string;
  accent_secondary: string;
  accent_glow: string;
  bg_base: string;
  bg_surface: string;
  bg_surface_2: string;
  text_primary: string;
  text_secondary: string;
  font_heading: string;
  font_body: string;
  font_mono: string;
  border_radius: string;
  animation_speed: AnimationSpeed;
};

export type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  duration: string;
  logo: string;
  highlights: string[];
};

export type ProjectItem = {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  role: string;
  github: string;
  live: string;
  badge: string;
  year: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  score: string;
  duration: string;
  logo: string;
};

export type CertificationItem = {
  name: string;
  issuer: string;
  year: string;
};

export type NavLinkItem = {
  label: string;
  href: string;
};

export type UiSectionTitles = {
  about: string;
  experience: string;
  projects: string;
  skills: string;
  education: string;
  achievements: string;
  contact: string;
};

export type UiLabels = {
  resume_button: string;
  view_projects_button: string;
  download_resume_button: string;
  featured_projects_label: string;
  github_button: string;
  github_repositories_label: string;
  role_prefix: string;
  no_repo_description: string;
  repository_button: string;
  live_button: string;
  certifications_label: string;
  send_message_button: string;
  sending_message_button: string;
  terminal_title: string;
  terminal_command: string;
  terminal_description: string;
  footer_edit_note: string;
  footer_built_by_prefix: string;
  name_label: string;
  email_label: string;
  message_label: string;
  pinned_repo_token_hint: string;
  contact_submit_success: string;
  contact_submit_error: string;
  contact_required_fields_error: string;
  contact_invalid_email_error: string;
  contact_service_unavailable_error: string;
  contact_invalid_payload_error: string;
  contact_email_send_error: string;
};

export type UiContent = {
  nav_links: NavLinkItem[];
  section_titles: UiSectionTitles;
  labels: UiLabels;
};

export type GitHubProjectsMode = "pinned_only" | "pinned_plus_manual" | "manual_only";

export type GitHubProjectsConfig = {
  mode: GitHubProjectsMode;
  manual_repo_names: string[];
  exclude_repo_names: string[];
  max_items: number;
};

export type SiteContent = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  availability: string;
  profile_photo: string;
  bio: string;
  interests: string[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: string[];
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  show_contact_form: boolean;
  resume_file: string;
  show_resume_button: boolean;
  github_projects: GitHubProjectsConfig;
  ui: UiContent;
  theme: ThemeTokens;
};

export type AnimationConfig = {
  duration: number;
  distance: number;
  stagger: number;
};

const DEFAULT_THEME: ThemeTokens = {
  accent_primary: "#7F5AF0",
  accent_secondary: "#2CB67D",
  accent_glow: "#7F5AF0",
  bg_base: "#0F0E17",
  bg_surface: "#1A1A2E",
  bg_surface_2: "#16213E",
  text_primary: "#FFFFFE",
  text_secondary: "#A7A9BE",
  font_heading: "'Space Grotesk', sans-serif",
  font_body: "'Inter', sans-serif",
  font_mono: "'Fira Code', monospace",
  border_radius: "12px",
  animation_speed: "medium",
};

const DEFAULT_NAV_LINKS: NavLinkItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const DEFAULT_UI_SECTION_TITLES: UiSectionTitles = {
  about: "About",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
  achievements: "Achievements",
  contact: "Contact",
};

const DEFAULT_UI_LABELS: UiLabels = {
  resume_button: "Resume",
  view_projects_button: "View Projects",
  download_resume_button: "Download Resume",
  featured_projects_label: "Featured Builds",
  github_button: "GitHub",
  github_repositories_label: "GitHub Repositories",
  role_prefix: "Role",
  no_repo_description: "No description added for this repository yet.",
  repository_button: "Repository",
  live_button: "Live",
  certifications_label: "Certifications",
  send_message_button: "Send Message",
  sending_message_button: "Sending...",
  terminal_title: "Terminal",
  terminal_command: "$ npm run build-the-future",
  terminal_description: "Building reliable software from backend APIs to applied AI systems.",
  footer_edit_note: "Edit portfolio-content.md to update anything here.",
  footer_built_by_prefix: "Built by",
  name_label: "Name",
  email_label: "Email",
  message_label: "Message",
  pinned_repo_token_hint:
    "Pinned repositories could not be loaded. Add GITHUB_TOKEN (classic token with read:user scope) to enable pinned repo sync.",
  contact_submit_success: "Message sent successfully. Thanks for reaching out.",
  contact_submit_error: "Something went wrong. Please try again.",
  contact_required_fields_error: "Name, email, and message are required.",
  contact_invalid_email_error: "Please provide a valid email address.",
  contact_service_unavailable_error:
    "Email service is not configured yet. Set RESEND_API_KEY to enable contact notifications.",
  contact_invalid_payload_error: "Invalid request payload.",
  contact_email_send_error: "Unable to send email right now. Please try again.",
};

const DEFAULT_GITHUB_PROJECTS: GitHubProjectsConfig = {
  mode: "pinned_only",
  manual_repo_names: [],
  exclude_repo_names: [],
  max_items: 6,
};

const DEFAULT_ANIMATION: Record<AnimationSpeed, AnimationConfig> = {
  subtle: { duration: 0.3, distance: 12, stagger: 0.05 },
  medium: { duration: 0.5, distance: 20, stagger: 0.1 },
  heavy: { duration: 0.8, distance: 32, stagger: 0.14 },
};

const CONTENT_PATH_CANDIDATES = [
  path.join(process.cwd(), "portfolio-content.md"),
  path.join(process.cwd(), "..", "portfolio-content.md"),
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") {
      return true;
    }

    if (normalized === "false") {
      return false;
    }
  }

  return fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => asString(item))
    .filter((item) => item.length > 0);
}

function asNumber(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function asTheme(value: unknown, source: Record<string, unknown>): ThemeTokens {
  const themeSource = isRecord(value) ? value : source;
  const animationSpeed = asString(themeSource.animation_speed, DEFAULT_THEME.animation_speed);

  const speed: AnimationSpeed =
    animationSpeed === "subtle" || animationSpeed === "medium" || animationSpeed === "heavy"
      ? animationSpeed
      : "medium";

  return {
    accent_primary: asString(themeSource.accent_primary, DEFAULT_THEME.accent_primary),
    accent_secondary: asString(themeSource.accent_secondary, DEFAULT_THEME.accent_secondary),
    accent_glow: asString(themeSource.accent_glow, DEFAULT_THEME.accent_glow),
    bg_base: asString(themeSource.bg_base, DEFAULT_THEME.bg_base),
    bg_surface: asString(themeSource.bg_surface, DEFAULT_THEME.bg_surface),
    bg_surface_2: asString(themeSource.bg_surface_2, DEFAULT_THEME.bg_surface_2),
    text_primary: asString(themeSource.text_primary, DEFAULT_THEME.text_primary),
    text_secondary: asString(themeSource.text_secondary, DEFAULT_THEME.text_secondary),
    font_heading: asString(themeSource.font_heading, DEFAULT_THEME.font_heading),
    font_body: asString(themeSource.font_body, DEFAULT_THEME.font_body),
    font_mono: asString(themeSource.font_mono, DEFAULT_THEME.font_mono),
    border_radius: asString(themeSource.border_radius, DEFAULT_THEME.border_radius),
    animation_speed: speed,
  };
}

function asExperience(value: unknown): ExperienceItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((item) => ({
      company: asString(item.company),
      role: asString(item.role),
      location: asString(item.location),
      duration: asString(item.duration),
      logo: asString(item.logo),
      highlights: asStringArray(item.highlights),
    }))
    .filter((item) => item.company && item.role);
}

function asProjects(value: unknown): ProjectItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((item) => ({
      name: asString(item.name),
      tagline: asString(item.tagline),
      description: asString(item.description),
      stack: asStringArray(item.stack),
      role: asString(item.role),
      github: asString(item.github),
      live: asString(item.live),
      badge: asString(item.badge),
      year: asString(item.year),
    }))
    .filter((item) => item.name.length > 0);
}

function asSkills(value: unknown): SkillGroup[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((item) => ({
      category: asString(item.category),
      items: asStringArray(item.items),
    }))
    .filter((item) => item.category.length > 0 && item.items.length > 0);
}

function asEducation(value: unknown): EducationItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((item) => ({
      institution: asString(item.institution),
      degree: asString(item.degree),
      score: asString(item.score),
      duration: asString(item.duration),
      logo: asString(item.logo),
    }))
    .filter((item) => item.institution.length > 0);
}

function asCertifications(value: unknown): CertificationItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item): CertificationItem | null => {
      if (typeof item === "string") {
        return {
          name: item.trim(),
          issuer: "",
          year: "",
        };
      }

      if (!isRecord(item)) {
        return null;
      }

      const name = asString(item.name);
      if (!name) {
        return null;
      }

      return {
        name,
        issuer: asString(item.issuer),
        year: asString(item.year),
      };
    })
    .filter((item): item is CertificationItem => item !== null);
}

function asNavLinks(value: unknown): NavLinkItem[] {
  if (!Array.isArray(value)) {
    return DEFAULT_NAV_LINKS;
  }

  const links = value
    .filter(isRecord)
    .map((item) => ({
      label: asString(item.label),
      href: asString(item.href),
    }))
    .filter((item) => item.label.length > 0 && item.href.length > 0);

  return links.length > 0 ? links : DEFAULT_NAV_LINKS;
}

function asUi(value: unknown): UiContent {
  if (!isRecord(value)) {
    return {
      nav_links: DEFAULT_NAV_LINKS,
      section_titles: DEFAULT_UI_SECTION_TITLES,
      labels: DEFAULT_UI_LABELS,
    };
  }

  const sectionTitlesSource = isRecord(value.section_titles) ? value.section_titles : {};
  const labelsSource = isRecord(value.labels) ? value.labels : {};

  return {
    nav_links: asNavLinks(value.nav_links),
    section_titles: {
      about: asString(sectionTitlesSource.about, DEFAULT_UI_SECTION_TITLES.about),
      experience: asString(sectionTitlesSource.experience, DEFAULT_UI_SECTION_TITLES.experience),
      projects: asString(sectionTitlesSource.projects, DEFAULT_UI_SECTION_TITLES.projects),
      skills: asString(sectionTitlesSource.skills, DEFAULT_UI_SECTION_TITLES.skills),
      education: asString(sectionTitlesSource.education, DEFAULT_UI_SECTION_TITLES.education),
      achievements: asString(sectionTitlesSource.achievements, DEFAULT_UI_SECTION_TITLES.achievements),
      contact: asString(sectionTitlesSource.contact, DEFAULT_UI_SECTION_TITLES.contact),
    },
    labels: {
      resume_button: asString(labelsSource.resume_button, DEFAULT_UI_LABELS.resume_button),
      view_projects_button: asString(labelsSource.view_projects_button, DEFAULT_UI_LABELS.view_projects_button),
      download_resume_button: asString(
        labelsSource.download_resume_button,
        DEFAULT_UI_LABELS.download_resume_button,
      ),
      featured_projects_label: asString(
        labelsSource.featured_projects_label,
        DEFAULT_UI_LABELS.featured_projects_label,
      ),
      github_button: asString(labelsSource.github_button, DEFAULT_UI_LABELS.github_button),
      github_repositories_label: asString(
        labelsSource.github_repositories_label,
        DEFAULT_UI_LABELS.github_repositories_label,
      ),
      role_prefix: asString(labelsSource.role_prefix, DEFAULT_UI_LABELS.role_prefix),
      no_repo_description: asString(
        labelsSource.no_repo_description,
        DEFAULT_UI_LABELS.no_repo_description,
      ),
      repository_button: asString(labelsSource.repository_button, DEFAULT_UI_LABELS.repository_button),
      live_button: asString(labelsSource.live_button, DEFAULT_UI_LABELS.live_button),
      certifications_label: asString(
        labelsSource.certifications_label,
        DEFAULT_UI_LABELS.certifications_label,
      ),
      send_message_button: asString(
        labelsSource.send_message_button,
        DEFAULT_UI_LABELS.send_message_button,
      ),
      sending_message_button: asString(
        labelsSource.sending_message_button,
        DEFAULT_UI_LABELS.sending_message_button,
      ),
      terminal_title: asString(labelsSource.terminal_title, DEFAULT_UI_LABELS.terminal_title),
      terminal_command: asString(labelsSource.terminal_command, DEFAULT_UI_LABELS.terminal_command),
      terminal_description: asString(
        labelsSource.terminal_description,
        DEFAULT_UI_LABELS.terminal_description,
      ),
      footer_edit_note: asString(labelsSource.footer_edit_note, DEFAULT_UI_LABELS.footer_edit_note),
      footer_built_by_prefix: asString(
        labelsSource.footer_built_by_prefix,
        DEFAULT_UI_LABELS.footer_built_by_prefix,
      ),
      name_label: asString(labelsSource.name_label, DEFAULT_UI_LABELS.name_label),
      email_label: asString(labelsSource.email_label, DEFAULT_UI_LABELS.email_label),
      message_label: asString(labelsSource.message_label, DEFAULT_UI_LABELS.message_label),
      pinned_repo_token_hint: asString(
        labelsSource.pinned_repo_token_hint,
        DEFAULT_UI_LABELS.pinned_repo_token_hint,
      ),
      contact_submit_success: asString(
        labelsSource.contact_submit_success,
        DEFAULT_UI_LABELS.contact_submit_success,
      ),
      contact_submit_error: asString(
        labelsSource.contact_submit_error,
        DEFAULT_UI_LABELS.contact_submit_error,
      ),
      contact_required_fields_error: asString(
        labelsSource.contact_required_fields_error,
        DEFAULT_UI_LABELS.contact_required_fields_error,
      ),
      contact_invalid_email_error: asString(
        labelsSource.contact_invalid_email_error,
        DEFAULT_UI_LABELS.contact_invalid_email_error,
      ),
      contact_service_unavailable_error: asString(
        labelsSource.contact_service_unavailable_error,
        DEFAULT_UI_LABELS.contact_service_unavailable_error,
      ),
      contact_invalid_payload_error: asString(
        labelsSource.contact_invalid_payload_error,
        DEFAULT_UI_LABELS.contact_invalid_payload_error,
      ),
      contact_email_send_error: asString(
        labelsSource.contact_email_send_error,
        DEFAULT_UI_LABELS.contact_email_send_error,
      ),
    },
  };
}

function asGitHubProjectsConfig(value: unknown): GitHubProjectsConfig {
  if (!isRecord(value)) {
    return DEFAULT_GITHUB_PROJECTS;
  }

  const modeValue = asString(value.mode, DEFAULT_GITHUB_PROJECTS.mode);
  const mode: GitHubProjectsMode =
    modeValue === "pinned_only" || modeValue === "pinned_plus_manual" || modeValue === "manual_only"
      ? modeValue
      : DEFAULT_GITHUB_PROJECTS.mode;

  const maxItems = Math.max(0, asNumber(value.max_items, DEFAULT_GITHUB_PROJECTS.max_items));

  return {
    mode,
    manual_repo_names: asStringArray(value.manual_repo_names),
    exclude_repo_names: asStringArray(value.exclude_repo_names),
    max_items: maxItems,
  };
}

function resolveContentPath(): string {
  const foundPath = CONTENT_PATH_CANDIDATES.find((candidate) => fs.existsSync(candidate));

  if (!foundPath) {
    throw new Error(
      "Unable to locate portfolio-content.md. Expected it in the project root or one directory above.",
    );
  }

  return foundPath;
}

function parseRawContent(rawFile: string): Record<string, unknown> {
  const normalized = rawFile.replace(/\r\n/g, "\n");
  const wrapped = normalized.trimStart().startsWith("---")
    ? normalized
    : `---\n${normalized}\n---`;

  const parsed = matter(wrapped).data;

  if (!isRecord(parsed)) {
    throw new Error("portfolio-content.md parsed to an unexpected format.");
  }

  return parsed;
}

const loadSiteContent = cache((): SiteContent => {
  const contentPath = resolveContentPath();
  const rawFile = fs.readFileSync(contentPath, "utf8");
  const parsed = parseRawContent(rawFile);

  const theme = asTheme(parsed.theme, parsed);
  const ui = asUi(parsed.ui);
  const githubProjects = asGitHubProjectsConfig(parsed.github_projects);

  return {
    name: asString(parsed.name),
    title: asString(parsed.title),
    tagline: asString(parsed.tagline),
    location: asString(parsed.location),
    availability: asString(parsed.availability),
    profile_photo: asString(parsed.profile_photo),
    bio: asString(parsed.bio),
    interests: asStringArray(parsed.interests),
    experience: asExperience(parsed.experience),
    projects: asProjects(parsed.projects),
    skills: asSkills(parsed.skills),
    education: asEducation(parsed.education),
    certifications: asCertifications(parsed.certifications),
    achievements: asStringArray(parsed.achievements),
    email: asString(parsed.email),
    phone: asString(parsed.phone),
    website: asString(parsed.website),
    linkedin: asString(parsed.linkedin),
    github: asString(parsed.github),
    twitter: asString(parsed.twitter),
    show_contact_form: asBoolean(parsed.show_contact_form, true),
    resume_file: asString(parsed.resume_file),
    show_resume_button: asBoolean(parsed.show_resume_button, true),
    github_projects: githubProjects,
    ui,
    theme,
  };
});

export function getSiteContent(): SiteContent {
  return loadSiteContent();
}

export function getAnimationConfig(speed: AnimationSpeed): AnimationConfig {
  return DEFAULT_ANIMATION[speed] ?? DEFAULT_ANIMATION.medium;
}

export function getThemeCssVariables(theme: ThemeTokens): Record<string, string> {
  return {
    "--accent-primary": theme.accent_primary,
    "--accent-primary-12": hexToRgba(theme.accent_primary, 0.12),
    "--accent-primary-25": hexToRgba(theme.accent_primary, 0.25),
    "--accent-primary-26": hexToRgba(theme.accent_primary, 0.26),
    "--accent-primary-55": hexToRgba(theme.accent_primary, 0.55),
    "--accent-secondary": theme.accent_secondary,
    "--accent-secondary-10": hexToRgba(theme.accent_secondary, 0.1),
    "--accent-secondary-20": hexToRgba(theme.accent_secondary, 0.2),
    "--accent-secondary-70": hexToRgba(theme.accent_secondary, 0.7),
    "--accent-glow": theme.accent_glow,
    "--accent-glow-36": hexToRgba(theme.accent_glow, 0.36),
    "--bg-base": theme.bg_base,
    "--bg-surface": theme.bg_surface,
    "--bg-surface-85": hexToRgba(theme.bg_surface, 0.85),
    "--bg-surface-90": hexToRgba(theme.bg_surface, 0.9),
    "--bg-surface-2": theme.bg_surface_2,
    "--text-primary": theme.text_primary,
    "--text-secondary": theme.text_secondary,
    "--font-heading": theme.font_heading,
    "--font-body": theme.font_body,
    "--font-mono": theme.font_mono,
    "--radius": theme.border_radius,
  };
}
