import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AppIcon } from "./AppIcon";

describe("AppIcon", () => {
  it("renders an svg with the default size (20) and default color (currentColor)", () => {
    const { container } = render(<AppIcon name="home" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("width", "20");
    expect(svg).toHaveAttribute("height", "20");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("aria-hidden", "true");

    const path = svg?.querySelector("path");
    expect(path).toHaveAttribute("stroke", "currentColor");
  });

  it("applies a custom size and color", () => {
    const { container } = render(<AppIcon name="home" size={32} color="#0f62fe" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");

    const paths = container.querySelectorAll("path");
    paths.forEach(p => expect(p).toHaveAttribute("stroke", "#0f62fe"));
  });

  it("renders the correct number of path segments for a known multi-path icon", () => {
    // "database" has 3 path definitions in the icon map
    const { container } = render(<AppIcon name="database" />);
    expect(container.querySelectorAll("path")).toHaveLength(3);
  });

  it("renders a single path for a known single-path icon", () => {
    // "skills" has exactly 1 path definition
    const { container } = render(<AppIcon name="skills" />);
    expect(container.querySelectorAll("path")).toHaveLength(1);
  });

  it("falls back to the 'tool' icon when given an unknown name", () => {
    const { container: unknown } = render(<AppIcon name="not-a-real-icon" />);
    const { container: fallback } = render(<AppIcon name="tool" />);
    expect(unknown.innerHTML).toBe(fallback.innerHTML);
  });

  it("falls back to the 'tool' icon for an empty string name", () => {
    const { container: empty } = render(<AppIcon name="" />);
    const { container: fallback } = render(<AppIcon name="tool" />);
    expect(empty.innerHTML).toBe(fallback.innerHTML);
  });

  it("renders every documented icon name without throwing and produces at least one path", () => {
    const iconNames = [
      "tool", "git", "mail", "spider", "calendar", "mic", "eye", "document",
      "shield", "chart", "database", "rocket", "notion", "x", "play", "hash",
      "cloud", "calculator", "globe", "image", "news", "map", "music",
      "bitcoin", "qr", "food", "flight", "home", "portal", "skills",
      "plugins", "users", "collection", "showcase", "edit", "changelog",
      "info", "docs",
    ];

    for (const name of iconNames) {
      const { container } = render(<AppIcon name={name} />);
      const paths = container.querySelectorAll("path");
      expect(paths.length).toBeGreaterThan(0);
    }
  });

  it("uses square line caps and miter line joins for stroke styling", () => {
    const { container } = render(<AppIcon name="mail" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("stroke-linecap", "square");
    expect(path).toHaveAttribute("stroke-linejoin", "miter");
    expect(path).toHaveAttribute("stroke-width", "1.75");
  });
});