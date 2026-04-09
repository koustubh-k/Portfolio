import { cache } from "react";
import type { GitHubProjectsConfig } from "@/lib/content";

export type GitHubRepo = {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  updatedAt: string;
};

export type GitHubRepoResult = {
  repos: GitHubRepo[];
  tokenMissingForPinned: boolean;
};

type GitHubApiRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  archived: boolean;
  visibility?: string;
};

type GitHubGraphQlPinnedResponse = {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<{ name?: string | null }>;
      };
    };
  };
};

export function extractGitHubUsername(profileUrl: string): string {
  const fallback = profileUrl
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/^github\.com\//i, "")
    .split(/[/?#]/)[0];

  try {
    const parsed = new URL(profileUrl);
    if (!/github\.com$/i.test(parsed.hostname)) {
      return "";
    }

    return parsed.pathname.split("/").filter(Boolean)[0] ?? fallback;
  } catch {
    return fallback;
  }
}

async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const endpoint = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`;

  const response = await fetch(endpoint, {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as unknown;
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .filter(
      (repo): repo is GitHubApiRepo =>
        typeof repo === "object" &&
        repo !== null &&
        "id" in repo &&
        "name" in repo &&
        "html_url" in repo &&
        "pushed_at" in repo,
    )
    .filter((repo) => !repo.archived && repo.visibility !== "private")
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description ?? "",
      url: repo.html_url,
      homepage: repo.homepage ?? "",
      language: repo.language ?? "",
      topics: Array.isArray(repo.topics) ? repo.topics.filter(Boolean) : [],
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      updatedAt: repo.pushed_at,
    }))
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function fetchPinnedRepoNamesViaGraphQl(username: string, token: string): Promise<string[]> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({
      query: `
        query($login: String!) {
          user(login: $login) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                }
              }
            }
          }
        }
      `,
      variables: {
        login: username,
      },
    }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as GitHubGraphQlPinnedResponse;
  const nodes = payload.data?.user?.pinnedItems?.nodes ?? [];

  return nodes
    .map((node) => (typeof node?.name === "string" ? node.name : ""))
    .filter((name) => name.length > 0);
}

async function fetchPinnedRepoNamesFromProfile(username: string): Promise<string[]> {
  const response = await fetch(`https://github.com/${encodeURIComponent(username)}`, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return [];
  }

  const html = await response.text();
  const sectionStart = html.indexOf("js-pinned-items-reorder-container");
  if (sectionStart < 0) {
    return [];
  }

  const sectionEnd = html.indexOf("</ol>", sectionStart);
  const pinnedSection = html.slice(sectionStart, sectionEnd > sectionStart ? sectionEnd : sectionStart + 12000);
  const hrefRegex = new RegExp(`href=\"/${escapeRegex(username)}/([^\"/?#]+)\"`, "g");

  const names: string[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null = hrefRegex.exec(pinnedSection);
  while (match) {
    const repoName = decodeURIComponent(match[1] ?? "").trim();
    const normalized = normalizeName(repoName);
    if (repoName && !seen.has(normalized)) {
      seen.add(normalized);
      names.push(repoName);
    }

    match = hrefRegex.exec(pinnedSection);
  }

  return names;
}

async function fetchPinnedRepoNames(username: string): Promise<{ names: string[]; tokenMissing: boolean }> {
  const token = process.env.GITHUB_TOKEN?.trim() ?? "";

  if (token) {
    const viaApi = await fetchPinnedRepoNamesViaGraphQl(username, token);
    if (viaApi.length > 0) {
      return { names: viaApi, tokenMissing: false };
    }
  }

  const viaProfile = await fetchPinnedRepoNamesFromProfile(username);
  if (viaProfile.length > 0) {
    return { names: viaProfile, tokenMissing: false };
  }

  return { names: [], tokenMissing: !token };
}

const loadGitHubRepos = cache(
  async (githubProfileUrl: string, config: GitHubProjectsConfig): Promise<GitHubRepoResult> => {
    const username = extractGitHubUsername(githubProfileUrl);
    if (!username) {
      return { repos: [], tokenMissingForPinned: false };
    }

    try {
      const allRepos = await fetchRepos(username);
      const manualNames = new Set(config.manual_repo_names.map(normalizeName).filter(Boolean));
      const excludedNames = new Set(config.exclude_repo_names.map(normalizeName).filter(Boolean));

      let pinnedNames: string[] = [];
      let tokenMissingForPinned = false;

      if (config.mode !== "manual_only") {
        const pinnedResult = await fetchPinnedRepoNames(username);
        pinnedNames = pinnedResult.names;
        tokenMissingForPinned = pinnedResult.tokenMissing && pinnedResult.names.length === 0;
      }

      const pinnedSet = new Set(pinnedNames.map(normalizeName));

      let selectedNameSet = new Set<string>();
      if (config.mode === "pinned_only") {
        selectedNameSet = pinnedSet;
      }

      if (config.mode === "manual_only") {
        selectedNameSet = manualNames;
      }

      if (config.mode === "pinned_plus_manual") {
        selectedNameSet = new Set<string>();
        pinnedSet.forEach((name) => {
          selectedNameSet.add(name);
        });
        manualNames.forEach((name) => {
          selectedNameSet.add(name);
        });
      }

      const filtered = allRepos.filter((repo) => {
        const normalizedName = normalizeName(repo.name);
        if (excludedNames.has(normalizedName)) {
          return false;
        }

        return selectedNameSet.has(normalizedName);
      });

      const limited =
        config.max_items > 0
          ? filtered.slice(0, config.max_items)
          : filtered;

      return {
        repos: limited,
        tokenMissingForPinned,
      };
    } catch {
      return { repos: [], tokenMissingForPinned: false };
    }
  },
);

export async function getGitHubRepos(
  githubProfileUrl: string,
  config: GitHubProjectsConfig,
): Promise<GitHubRepoResult> {
  return loadGitHubRepos(githubProfileUrl, config);
}
