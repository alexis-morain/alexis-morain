#!/usr/bin/env node
// Refreshes the <!-- OSS_PRS:START --> ... <!-- OSS_PRS:END --> block in README.md
// with every PR `alexis-morain` opened on a repo he does not own.
//
// Own repos are excluded on purpose: this section is about upstream work.

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const USER = "alexis-morain";
const MARK_START = "<!-- OSS_PRS:START -->";
const MARK_END = "<!-- OSS_PRS:END -->";
const PER_REPO = 4; // most recent PRs listed per project

// One line per upstream project, written by hand so the table says something
// the repo description does not. Unknown repos fall back to their description.
const BLURBS = {
  "CapSoftware/Cap": "Open source Loom alternative",
  "gatzenga/Shelv": "Native Navidrome player for Apple platforms",
  "V1ck3s/octo-fiesta": "Subsonic proxy that merges several music sources",
  "KyleKun/one_second_diary": "Minimalist video diary, one second a day",
  "ManiMatter/decluttarr": "Download queue cleaner for the \\*arr stack",
  "motis-project/motis": "Multimodal routing and map tiles engine",
  "vorssaint/vorssaint-utils": "macOS menu bar toolkit",
};

const gh = (args) => JSON.parse(execSync(`gh ${args}`, { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }));

// The search API caps at 100 per page; walk pages until one comes back short.
const items = [];
for (let page = 1; page <= 5; page++) {
  const res = gh(
    `api -X GET search/issues -f q='is:pr author:${USER}' -f per_page=100 -f page=${page}`,
  );
  items.push(...res.items);
  if (res.items.length < 100) break;
}

const prs = items
  .map((it) => {
    const [owner, name] = it.repository_url.split("/").slice(-2);
    return {
      repo: `${owner}/${name}`,
      owner,
      number: it.number,
      title: it.title.replace(/^\[[^\]]+\]\s*/, ""),
      url: it.html_url,
      merged: Boolean(it.pull_request?.merged_at),
      open: it.state === "open",
      at: it.pull_request?.merged_at || it.created_at,
    };
  })
  .filter((pr) => pr.owner !== USER) // upstream only
  .filter((pr) => pr.merged || pr.open); // a superseded PR is noise, not a contribution

if (!prs.length) {
  console.log("No upstream PRs found — leaving README untouched.");
  process.exit(0);
}

const byRepo = new Map();
for (const pr of prs) {
  if (!byRepo.has(pr.repo)) byRepo.set(pr.repo, []);
  byRepo.get(pr.repo).push(pr);
}

// Most recently active project first.
const repos = [...byRepo.entries()]
  .map(([repo, list]) => {
    list.sort((a, b) => b.number - a.number);
    return {
      repo,
      list,
      merged: list.filter((p) => p.merged).length,
      open: list.filter((p) => p.open).length,
      last: list.reduce((m, p) => (p.at > m ? p.at : m), ""),
    };
  })
  .sort((a, b) => b.merged - a.merged || b.open - a.open || b.last.localeCompare(a.last));

const totalMerged = prs.filter((p) => p.merged).length;
const totalOpen = prs.filter((p) => p.open).length;

const blurbFor = (repo) => {
  if (BLURBS[repo]) return BLURBS[repo];
  try {
    return gh(`api repos/${repo} --jq .description`) || "—";
  } catch {
    return "—";
  }
};

const out = [
  "<!-- This section is auto-updated daily by .github/workflows/update-readme.yml -->",
  "",
  `**${totalMerged} pull requests merged upstream**, ${totalOpen} in review, across ${repos.length} projects.`,
  "",
  "| Project | What it is | Merged | In review |",
  "|---|---|:--:|:--:|",
  ...repos.map(
    (r) =>
      `| **[${r.repo.split("/")[1]}](https://github.com/${r.repo})** | ${blurbFor(r.repo)} | ${r.merged} | ${r.open || "—"} |`,
  ),
  "",
  "<details>",
  "<summary><b>Every pull request, most recent first</b></summary>",
  "",
];

for (const r of repos) {
  out.push(`**[${r.repo}](https://github.com/${r.repo})**`, "");
  for (const pr of r.list.slice(0, PER_REPO)) {
    const tag = pr.merged ? "✅ *merged*" : "🔵 *in review*";
    out.push(`- **[#${pr.number}](${pr.url})** — ${pr.title} · ${tag}`);
  }
  if (r.list.length > PER_REPO) {
    out.push(
      `- *…and ${r.list.length - PER_REPO} more on [${r.repo.split("/")[1]}](https://github.com/${r.repo}/pulls?q=is%3Apr+author%3A${USER})*`,
    );
  }
  out.push("");
}

out.push("</details>");

const block = `${MARK_START}\n${out.join("\n")}\n${MARK_END}`;

const readme = readFileSync("README.md", "utf8");
const re = new RegExp(`${MARK_START}[\\s\\S]*?${MARK_END}`);
if (!re.test(readme)) {
  console.error("Markers not found in README.md");
  process.exit(1);
}
writeFileSync("README.md", readme.replace(re, block));
console.log(`Updated: ${prs.length} PRs across ${repos.length} upstream repos.`);
