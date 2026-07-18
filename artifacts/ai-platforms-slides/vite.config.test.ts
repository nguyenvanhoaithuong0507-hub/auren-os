import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// vite.config.ts statically imports several build-time-only packages. We stub
// them out so the config factory's *logic* (env-var validation, defaults,
// conditional plugin wiring) can be exercised without a real Vite/plugin
// toolchain being installed.
vi.mock("vite", () => ({
  defineConfig: (config: unknown) => config,
}));
vi.mock("@vitejs/plugin-react", () => ({
  default: () => ({ name: "mock-react-plugin" }),
}));
vi.mock("@tailwindcss/vite", () => ({
  default: () => ({ name: "mock-tailwind-plugin" }),
}));
vi.mock("@replit/vite-plugin-runtime-error-modal", () => ({
  default: () => ({ name: "mock-runtime-error-overlay" }),
}));
vi.mock("@replit/vite-plugin-cartographer", () => ({
  cartographer: () => ({ name: "mock-cartographer" }),
}));
vi.mock("@replit/vite-plugin-dev-banner", () => ({
  devBanner: () => ({ name: "mock-dev-banner" }),
}));

type ConfigFn = (env: { command: "build" | "serve" }) => Promise<{
  base: string;
  plugins: unknown[];
  server: { port: number; strictPort: boolean };
  preview: { port: number };
}>;

async function loadConfigFn(): Promise<ConfigFn> {
  vi.resetModules();
  const mod = await import("./vite.config");
  return mod.default as unknown as ConfigFn;
}

describe("ai-platforms-slides vite.config", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env.PORT;
    delete process.env.BASE_PATH;
    delete process.env.REPL_ID;
    process.env.NODE_ENV = "test";
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("throws when PORT is missing for non-build commands (e.g. dev/serve)", async () => {
    const configFn = await loadConfigFn();
    process.env.BASE_PATH = "/slides/";
    await expect(configFn({ command: "serve" })).rejects.toThrow(
      /PORT environment variable is required/,
    );
  });

  it("throws when BASE_PATH is missing for non-build commands", async () => {
    const configFn = await loadConfigFn();
    process.env.PORT = "3002";
    await expect(configFn({ command: "serve" })).rejects.toThrow(
      /BASE_PATH environment variable is required/,
    );
  });

  it("does not require PORT or BASE_PATH for the build command and falls back to defaults", async () => {
    const configFn = await loadConfigFn();
    const config = await configFn({ command: "build" });
    expect(config.base).toBe("/");
    expect(config.server.port).toBe(3000);
    expect(config.preview.port).toBe(3000);
  });

  it("throws for a non-numeric PORT value", async () => {
    const configFn = await loadConfigFn();
    process.env.PORT = "not-a-number";
    process.env.BASE_PATH = "/slides/";
    await expect(configFn({ command: "serve" })).rejects.toThrow(
      /Invalid PORT value/,
    );
  });

  it("throws for a zero or negative PORT value", async () => {
    const configFn = await loadConfigFn();
    process.env.BASE_PATH = "/slides/";

    process.env.PORT = "0";
    await expect(configFn({ command: "serve" })).rejects.toThrow(/Invalid PORT value/);

    process.env.PORT = "-5";
    await expect(configFn({ command: "serve" })).rejects.toThrow(/Invalid PORT value/);
  });

  it("uses the provided PORT and BASE_PATH when both are present", async () => {
    const configFn = await loadConfigFn();
    process.env.PORT = "4322";
    process.env.BASE_PATH = "/slides/";
    const config = await configFn({ command: "serve" });
    expect(config.base).toBe("/slides/");
    expect(config.server.port).toBe(4322);
    expect(config.server.strictPort).toBe(true);
    expect(config.preview.port).toBe(4322);
  });

  it("does not include the Replit-only cartographer/dev-banner plugins when REPL_ID is unset", async () => {
    const configFn = await loadConfigFn();
    process.env.PORT = "3002";
    process.env.BASE_PATH = "/slides/";
    const config = await configFn({ command: "serve" });
    // react, runtimeErrorOverlay, tailwindcss only
    expect(config.plugins).toHaveLength(3);
  });

  it("falls back to port 3000 and base '/' for a plain `vite build` invocation with no env vars set", async () => {
    const configFn = await loadConfigFn();
    const config = await configFn({ command: "build" });
    expect(config.server.port).toBe(3000);
    expect(config.base).toBe("/");
  });
});