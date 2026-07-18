import { describe, it, expect } from "vitest";
import { SKILLS, PLUGINS, PUBLISHERS, SUGGESTION_PILLS } from "./catalog";

// Mirrors the icon names supported by AppIcon (src/components/AppIcon.tsx).
// Kept in sync manually since AppIcon does not export its icon map.
const KNOWN_ICON_NAMES = new Set([
  "tool", "git", "mail", "spider", "calendar", "mic", "eye", "document",
  "shield", "chart", "database", "rocket", "notion", "x", "play", "hash",
  "cloud", "calculator", "globe", "image", "news", "map", "music",
  "bitcoin", "qr", "food", "flight", "home", "portal", "skills",
  "plugins", "users", "collection", "showcase", "edit", "changelog",
  "info", "docs",
]);

describe("catalog data: SKILLS", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(SKILLS)).toBe(true);
    expect(SKILLS.length).toBeGreaterThan(0);
  });

  it("has unique ids", () => {
    const ids = SKILLS.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("defines an iconName for every skill and it maps to a known AppIcon icon", () => {
    for (const skill of SKILLS) {
      expect(skill.iconName, `missing iconName for skill "${skill.id}"`).toBeDefined();
      expect(KNOWN_ICON_NAMES.has(skill.iconName as string), `unknown iconName "${skill.iconName}" for skill "${skill.id}"`).toBe(true);
    }
  });

  it("has a rating between 0 and 5 for every skill", () => {
    for (const skill of SKILLS) {
      expect(skill.rating).toBeGreaterThanOrEqual(0);
      expect(skill.rating).toBeLessThanOrEqual(5);
    }
  });

  it("has non-empty required string fields", () => {
    for (const skill of SKILLS) {
      expect(skill.name.length).toBeGreaterThan(0);
      expect(skill.desc.length).toBeGreaterThan(0);
      expect(skill.publisher.length).toBeGreaterThan(0);
      expect(skill.color.length).toBeGreaterThan(0);
    }
  });

  it("has at least one tag for every skill", () => {
    for (const skill of SKILLS) {
      expect(Array.isArray(skill.tags)).toBe(true);
      expect(skill.tags.length).toBeGreaterThan(0);
    }
  });

  it("includes the self-healing agent with the expected metadata", () => {
    const skill = SKILLS.find(s => s.id === "self-healing");
    expect(skill).toBeDefined();
    expect(skill?.iconName).toBe("tool");
    expect(skill?.color).toBe("#0f62fe");
    expect(skill?.featured).toBe(true);
  });
});

describe("catalog data: PLUGINS", () => {
  it("is a non-empty array", () => {
    expect(Array.isArray(PLUGINS)).toBe(true);
    expect(PLUGINS.length).toBeGreaterThan(0);
  });

  it("has unique ids", () => {
    const ids = PLUGINS.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("defines an iconName for every plugin and it maps to a known AppIcon icon", () => {
    for (const plugin of PLUGINS) {
      expect(plugin.iconName, `missing iconName for plugin "${plugin.id}"`).toBeDefined();
      expect(KNOWN_ICON_NAMES.has(plugin.iconName as string), `unknown iconName "${plugin.iconName}" for plugin "${plugin.id}"`).toBe(true);
    }
  });

  it("has a rating between 0 and 5 for every plugin", () => {
    for (const plugin of PLUGINS) {
      expect(plugin.rating).toBeGreaterThanOrEqual(0);
      expect(plugin.rating).toBeLessThanOrEqual(5);
    }
  });
});

describe("catalog data: PUBLISHERS", () => {
  it("is a non-empty array with unique ids", () => {
    expect(PUBLISHERS.length).toBeGreaterThan(0);
    const ids = PUBLISHERS.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has non-negative skills and plugins counts", () => {
    for (const publisher of PUBLISHERS) {
      expect(publisher.skills).toBeGreaterThanOrEqual(0);
      expect(publisher.plugins).toBeGreaterThanOrEqual(0);
    }
  });

  it("reflects the rebranded AuRen Labs accent color", () => {
    const auren = PUBLISHERS.find(p => p.id === "auren-labs");
    expect(auren?.color).toBe("#0f62fe");
  });
});

describe("catalog data: SUGGESTION_PILLS", () => {
  it("is a non-empty array of non-empty strings", () => {
    expect(SUGGESTION_PILLS.length).toBeGreaterThan(0);
    for (const pill of SUGGESTION_PILLS) {
      expect(typeof pill).toBe("string");
      expect(pill.length).toBeGreaterThan(0);
    }
  });
});