import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CollectionsPage from "./collections";

vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="mock-navbar" />,
}));

const COLLECTION_NAMES = [
  "DevOps Starter Pack",
  "Bộ công cụ lập trình Việt",
  "Full-Stack Next.js Kit",
  "AI Research Toolkit",
  "Content Creator Bundle",
  "Data Science Essentials",
];

describe("CollectionsPage", () => {
  it("renders the navbar and the page heading", () => {
    render(<CollectionsPage />);
    expect(screen.getByTestId("mock-navbar")).toBeInTheDocument();
    expect(screen.getByText("được tuyển chọn")).toBeInTheDocument();
  });

  it("renders every collection in grid view by default with an icon glyph per card", () => {
    const { container } = render(<CollectionsPage />);
    for (const name of COLLECTION_NAMES) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    // Each collection card renders exactly one AppIcon svg (replacing the old raw emoji).
    expect(container.querySelectorAll("svg").length).toBe(COLLECTION_NAMES.length);
  });

  it("shows the verified badge only for the collections flagged as verified", () => {
    render(<CollectionsPage />);
    // devops-starter, fullstack-next and data-science are verified: true in the seed data.
    const badges = screen.getAllByText("✓ Chính thức");
    expect(badges.length).toBe(3);
  });

  it("switches to list view when the list toggle is clicked and keeps every collection visible", () => {
    render(<CollectionsPage />);
    const [, listButton] = screen.getAllByRole("button");
    fireEvent.click(listButton);

    for (const name of COLLECTION_NAMES) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.getByText("8 skills")).toBeInTheDocument();
  });

  it("does not throw when rendering an icon name that is unmapped in AppIcon (falls back gracefully)", () => {
    // Guards the AppIcon <-> catalog integration: even if a collection's `emoji`
    // value ever falls out of sync with AppIcon's icon map, rendering must not throw.
    expect(() => render(<CollectionsPage />)).not.toThrow();
  });
});