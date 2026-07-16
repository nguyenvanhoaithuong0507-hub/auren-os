import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const githubDir = join(import.meta.dirname, "..", "..", ".github");

/**
 * Minimal parser for the flat `key: value` YAML maps used by FUNDING.yml and
 * issue template front matter. Strips full-line and trailing comments, and
 * distinguishes an explicit empty string (`''`) from an unset value (nothing
 * after the colon).
 */
function parseFlatYaml(text: string): Record<string, string | null> {
  const result: Record<string, string | null> = {};
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;

    const key = match[1];
    let rawValue = match[2];
    const commentIndex = rawValue.indexOf("#");
    if (commentIndex !== -1) {
      rawValue = rawValue.slice(0, commentIndex);
    }
    rawValue = rawValue.trim();

    if (rawValue === "") {
      result[key] = null;
      continue;
    }

    const quoted = rawValue.match(/^'(.*)'$|^"(.*)"$/);
    result[key] = quoted ? quoted[1] ?? quoted[2] ?? "" : rawValue;
  }
  return result;
}

function splitFrontMatter(markdown: string): { frontMatter: string; body: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  assert.ok(match, "expected file to start with YAML front matter delimited by ---");
  return { frontMatter: match![1], body: match![2] };
}

describe(".github/FUNDING.yml", () => {
  const raw = readFileSync(join(githubDir, "FUNDING.yml"), "utf8");
  const funding = parseFlatYaml(raw);

  it("declares every supported funding platform key exactly once", () => {
    const expectedKeys = [
      "github",
      "patreon",
      "open_collective",
      "ko_fi",
      "tidelift",
      "community_bridge",
      "liberapay",
      "issuehunt",
      "lfx_crowdfunding",
      "polar",
      "buy_me_a_coffee",
      "thanks_dev",
      "custom",
    ];

    assert.deepEqual(Object.keys(funding).sort(), expectedKeys.slice().sort());
  });

  it("leaves every funding platform unset in the placeholder template", () => {
    for (const [key, value] of Object.entries(funding)) {
      assert.equal(value, null, `expected "${key}" to be unset`);
    }
  });

  it("does not accidentally duplicate a key", () => {
    const keys = [...raw.matchAll(/^([A-Za-z0-9_]+):/gm)].map((m) => m[1]);
    assert.deepEqual(keys, [...new Set(keys)]);
  });
});

describe(".github/ISSUE_TEMPLATE/feature_request.md", () => {
  const raw = readFileSync(
    join(githubDir, "ISSUE_TEMPLATE", "feature_request.md"),
    "utf8",
  );
  const { frontMatter, body } = splitFrontMatter(raw);
  const metadata = parseFlatYaml(frontMatter);

  it("declares the expected issue template metadata", () => {
    assert.equal(metadata.name, "Feature request");
    assert.equal(metadata.about, "Suggest an idea for this project");
    assert.equal(metadata.title, "");
    assert.equal(metadata.labels, "");
    assert.equal(metadata.assignees, "");
  });

  it("includes the standard feature-request prompt sections in order", () => {
    const sectionHeadings = [...body.matchAll(/^\*\*(.+)\*\*$/gm)].map(
      (m) => m[1],
    );

    assert.deepEqual(sectionHeadings, [
      "Is your feature request related to a problem? Please describe.",
      "Describe the solution you'd like",
      "Describe alternatives you've considered",
      "Additional context",
    ]);
  });
});

describe(".github/ISSUE_TEMPLATE directory", () => {
  it("no longer ships the old bug_report.md template", () => {
    assert.equal(
      existsSync(join(githubDir, "ISSUE_TEMPLATE", "bug_report.md")),
      false,
    );
  });

  it("still ships the feature_request.md template as a regular file", () => {
    const path = join(githubDir, "ISSUE_TEMPLATE", "feature_request.md");
    assert.ok(existsSync(path));
  });
});