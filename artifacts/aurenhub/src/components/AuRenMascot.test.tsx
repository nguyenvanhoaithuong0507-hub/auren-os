import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AuRenMascot, AuRenMark } from "./AuRenMascot";

describe("AuRenMascot", () => {
  it("renders an svg at the default size of 80 when no size is given", () => {
    const { container } = render(<AuRenMascot />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("width", "80");
    expect(svg).toHaveAttribute("height", "80");
    expect(svg).toHaveAttribute("viewBox", "0 0 120 120");
  });

  it("renders at a custom size", () => {
    const { container } = render(<AuRenMascot size={128} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "128");
    expect(svg).toHaveAttribute("height", "128");
  });

  it("does not apply an animation style by default", () => {
    const { container } = render(<AuRenMascot size={64} />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("style") ?? "").not.toContain("animation");
  });

  it("applies the float/glow animation style when animate is true", () => {
    const { container } = render(<AuRenMascot size={64} animate />);
    const svg = container.querySelector("svg");
    const style = svg?.getAttribute("style") ?? "";
    expect(style).toContain("auren-float");
    expect(style).toContain("auren-glow");
  });

  it("renders the brand gradient defs used for the glyph", () => {
    const { container } = render(<AuRenMascot />);
    expect(container.querySelector("#auren-blue")).not.toBeNull();
    expect(container.querySelector("#auren-core")).not.toBeNull();
  });

  it("marks the svg as aria-hidden since it is decorative", () => {
    const { container } = render(<AuRenMascot />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});

describe("AuRenMark", () => {
  it("renders at the default size of 26 when no size is given", () => {
    const { container } = render(<AuRenMark />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "26");
    expect(svg).toHaveAttribute("height", "26");
  });

  it("renders at a custom size", () => {
    const { container } = render(<AuRenMark size={40} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "40");
    expect(svg).toHaveAttribute("height", "40");
  });

  it("never animates, even though AuRenMascot supports animation", () => {
    const { container } = render(<AuRenMark size={40} />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("style") ?? "").not.toContain("animation");
  });

  it("renders markup identical in shape to AuRenMascot at the same size (shared glyph)", () => {
    const { container: mark } = render(<AuRenMark size={80} />);
    const { container: mascot } = render(<AuRenMascot size={80} />);
    expect(mark.innerHTML).toBe(mascot.innerHTML);
  });
});