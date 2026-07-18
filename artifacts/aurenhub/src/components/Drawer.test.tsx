import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Drawer from "./Drawer";

const navigateMock = vi.fn();
const signOutMock = vi.fn().mockResolvedValue(undefined);

type MockUser = {
  firstName?: string | null;
  username?: string | null;
  imageUrl?: string | null;
  primaryEmailAddress?: { emailAddress: string } | null;
} | null;

let mockAuthState: { isSignedIn: boolean; user: MockUser } = { isSignedIn: false, user: null };

vi.mock("wouter", () => ({
  useLocation: () => ["/", navigateMock],
}));

vi.mock("@clerk/react", () => ({
  useUser: () => mockAuthState,
  useClerk: () => ({ signOut: signOutMock }),
}));

describe("Drawer", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    signOutMock.mockClear();
    mockAuthState = { isSignedIn: false, user: null };
  });

  it("only renders the drawer panel (no backdrop) when closed", () => {
    const { container } = render(<Drawer open={false} onClose={() => {}} />);
    expect(container.children.length).toBe(1);
  });

  it("renders a backdrop in addition to the panel when open", () => {
    const { container } = render(<Drawer open onClose={() => {}} />);
    expect(container.children.length).toBe(2);
  });

  it("renders all nav links with their icons when open", () => {
    render(<Drawer open onClose={() => {}} />);
    const labels = [
      "Home", "Portal", "Skills", "Plugins", "Publishers",
      "Collections", "Showcase", "Blog", "Changelog", "About", "Docs",
    ];
    for (const label of labels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("navigates to the link href and closes the drawer when a nav link is clicked", () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} />);
    fireEvent.click(screen.getByText("Docs"));
    expect(navigateMock).toHaveBeenCalledWith("/docs");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when the backdrop is clicked", () => {
    const onClose = vi.fn();
    const { container } = render(<Drawer open onClose={onClose} />);
    const backdrop = container.children[0] as HTMLElement;
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows the sign-in prompt when the user is not signed in", () => {
    render(<Drawer open onClose={() => {}} />);
    expect(screen.getByText(/Đăng nhập để cài đặt/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeInTheDocument();
  });

  it("navigates to /sign-in and closes the drawer when the login button is clicked", () => {
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "Đăng nhập" }));
    expect(navigateMock).toHaveBeenCalledWith("/sign-in");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows user info and a logout button when signed in", () => {
    mockAuthState = {
      isSignedIn: true,
      user: { firstName: "Linh", username: "linh123", imageUrl: null, primaryEmailAddress: { emailAddress: "linh@example.com" } },
    };
    render(<Drawer open onClose={() => {}} />);
    expect(screen.getByText("Linh")).toBeInTheDocument();
    expect(screen.getByText("linh@example.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Đăng xuất/ })).toBeInTheDocument();
  });

  it("signs out, closes the drawer, and navigates home on logout", async () => {
    mockAuthState = {
      isSignedIn: true,
      user: { firstName: "Linh", username: "linh123", imageUrl: null, primaryEmailAddress: { emailAddress: "linh@example.com" } },
    };
    const onClose = vi.fn();
    render(<Drawer open onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /Đăng xuất/ }));
    await waitFor(() => expect(signOutMock).toHaveBeenCalledTimes(1));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("falls back to the username initial when firstName is missing", () => {
    mockAuthState = {
      isSignedIn: true,
      user: { firstName: null, username: "zed", imageUrl: null, primaryEmailAddress: { emailAddress: "zed@example.com" } },
    };
    render(<Drawer open onClose={() => {}} />);
    expect(screen.getByText("zed")).toBeInTheDocument();
    expect(screen.getByText("Z")).toBeInTheDocument();
  });
});