#!/usr/bin/env node
// Refreshes the <!-- CAP_PRS:START --> ... <!-- CAP_PRS:END --> block in README.md
// with the latest PRs authored by `alexis-morain` on CapSoftware/Cap.

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const USER = "alexis-morain";
const REPO = "CapSoftware/Cap";
const MARK_START = "<!-- CAP_PRS:START -->";
const MARK_END = "<!-- CAP_PRS:END -->";

const query = `repo:${REPO} author:${USER} is:pr`;
const raw = execSync(
  `gh pr list --repo ${REPO} --search "${query}" --state all --limit 20 --json number,title,state,mergedAt,url`,
  { encoding: "utf8" },
);
const prs = JSON.parse(raw);

if (!prs.length) {
  console.log("No PRs found — leaving README untouched.");
  process.exit(0);
}

const ICONS = { merged: "✅", open: "🔵", closed: "⚪" };
const labelFor = (pr) =>
  pr.mergedAt ? ICONS.merged + " merged" :
  pr.state === "OPEN" ? ICONS.open + " open" :
  ICONS.closed + " closed";

const lines = [
  "<!-- This section is auto-updated daily by .github/workflows/update-readme.yml -->",
  "",
  `**[CapSoftware/Cap](https://github.com/${REPO})** — recent contributions:`,
  "",
  ...prs
    .sort((a, b) => (b.mergedAt || "z").localeCompare(a.mergedAt || "z") || b.number - a.number)
    .map((pr) => `- ${labelFor(pr).split(" ")[0]} **[#${pr.number}](${pr.url})** — ${pr.title} · *${labelFor(pr).split(" ").slice(1).join(" ")}*`),
];

const block = `${MARK_START}\n${lines.join("\n")}\n\n${MARK_END}`;

const readme = readFileSync("README.md", "utf8");
const re = new RegExp(`${MARK_START}[\\s\\S]*?${MARK_END}`);
if (!re.test(readme)) {
  console.error("Markers not found in README.md");
  process.exit(1);
}
writeFileSync("README.md", readme.replace(re, block));
console.log(`Updated ${prs.length} PRs.`);
