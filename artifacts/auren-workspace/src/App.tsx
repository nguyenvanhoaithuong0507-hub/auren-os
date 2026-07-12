import { useEffect, useRef } from "react";
import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import LandingPage from "@/pages/landing";
import WorkspacePage from "@/pages/workspace";
import ToolsPage from "@/pages/tools";
import LibraryPage from "@/pages/library";
import ProjectsPage from "@/pages/projects";
import ExtensionsPage from "@/pages/extensions";
import ProfilePage from "@/pages/profile";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Try to get Clerk publishable key from environment or derive from host
const clerkPubKey = 
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 
  publishableKeyFromHost(
    window.location.hostname,
    import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  );

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL || undefined;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

// Only throw error if we're in a production environment
if (!clerkPubKey && import.meta.env.PROD) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY in production");
}

if (!clerkPubKey) {
  console.warn("[v0] Clerk is not configured. Using fallback configuration for development.");
}

const BG = "#0d0e14";
const CARD = "#16171e";
const ACCENT = "#00cfab";
const TEXT = "#e8eaf2";
const MUTED = "#8892a4";
const BORDER = "rgba(255,255,255,0.08)";

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: ACCENT,
    colorForeground: TEXT,
    colorMutedForeground: MUTED,
    colorDanger: "#ff6b6b",
    colorBackground: CARD,
    colorInput: "rgba(255,255,255,0.05)",
    colorInputForeground: TEXT,
    colorNeutral: BORDER,
    fontFamily: "'Inter', system-ui, sans-serif",
    borderRadius: "10px",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "rounded-2xl w-[440px] max-w-full overflow-hidden",
    card: "!shadow-none !border-0 !rounded-none",
    footer: "!shadow-none !border-0 !rounded-none",
    headerTitle: { color: "#ffffff", fontWeight: "800", letterSpacing: "-0.03em" },
    headerSubtitle: { color: MUTED },
    socialButtonsBlockButtonText: { color: TEXT, fontWeight: "600" },
    formFieldLabel: { color: MUTED, fontSize: "12px" },
    footerActionLink: { color: ACCENT },
    footerActionText: { color: MUTED },
    dividerText: { color: "#3a4155" },
    identityPreviewEditButton: { color: ACCENT },
    formFieldSuccessText: { color: ACCENT },
    alertText: { color: TEXT },
    logoBox: "flex justify-center py-2",
    logoImage: "w-12 h-12",
    socialButtonsBlockButton: {
      border: `1px solid ${BORDER}`,
      backgroundColor: "rgba(255,255,255,0.04)",
    },
    formButtonPrimary: { backgroundColor: ACCENT, color: BG, fontWeight: "700" },
    formFieldInput: {
      backgroundColor: "rgba(255,255,255,0.04)",
      border: `1px solid ${BORDER}`,
      color: TEXT,
    },
    footerAction: { backgroundColor: "transparent" },
    dividerLine: { backgroundColor: BORDER },
    alert: { backgroundColor: `${ACCENT}0d`, border: `1px solid ${ACCENT}25` },
    otpCodeFieldInput: {
      backgroundColor: "rgba(255,255,255,0.04)",
      border: `1px solid ${BORDER}`,
      color: TEXT,
    },
    formFieldRow: {},
    main: {},
  },
};

function SignInPage() {
  return (
    <div style={{
      minHeight: "100dvh",
      backgroundColor: BG,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 20px",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <style>{`.cl-formFieldInput::placeholder { color: #3a4155; opacity: 1; }`}</style>
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
        fallbackRedirectUrl={`${basePath}/build`}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div style={{
      minHeight: "100dvh",
      backgroundColor: BG,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 20px",
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <style>{`.cl-formFieldInput::placeholder { color: #3a4155; opacity: 1; }`}</style>
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
        fallbackRedirectUrl={`${basePath}/build`}
      />
    </div>
  );
}

function PrivatePage({ component: Component }: { component: React.ComponentType }) {
  return (
    <>
      <Show when="signed-in">
        <Component />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/login">
        <Redirect to="/sign-in" />
      </Route>
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />
      <Route path="/build">{() => <PrivatePage component={WorkspacePage} />}</Route>
      <Route path="/projects">{() => <PrivatePage component={ProjectsPage} />}</Route>
      <Route path="/tools">{() => <PrivatePage component={ToolsPage} />}</Route>
      <Route path="/library">{() => <PrivatePage component={LibraryPage} />}</Route>
      <Route path="/extensions">{() => <PrivatePage component={ExtensionsPage} />}</Route>
      <Route path="/profile">{() => <PrivatePage component={ProfilePage} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  if (!clerkPubKey) {
    // Fallback for development without Clerk configuration
    return (
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    );
  }

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      signInFallbackRedirectUrl={`${basePath}/build`}
      signUpFallbackRedirectUrl={`${basePath}/build`}
      localization={{
        signIn: {
          start: {
            title: "Đăng nhập AuRen",
            subtitle: "Chào mừng trở lại — tiếp tục với tài khoản của bạn",
          },
        },
        signUp: {
          start: {
            title: "Tạo tài khoản AuRen",
            subtitle: "Bắt đầu miễn phí với AuRen Agent",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <AppRoutes />
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}
