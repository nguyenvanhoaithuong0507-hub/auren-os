import { useEffect, useRef } from "react";
import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import HomePage from "@/pages/home";
import SkillsPage from "@/pages/skills";
import PluginsPage from "@/pages/plugins";
import PublishersPage from "@/pages/publishers";
import SkillDetailPage from "@/pages/skill-detail";
import PortalPage from "@/pages/portal";
import BlogPage from "@/pages/blog";
import ShowcasePage from "@/pages/showcase";
import AboutPage from "@/pages/about";
import DocsPage from "@/pages/docs";
import CollectionsPage from "@/pages/collections";
import ChangelogPage from "@/pages/changelog";
import ProfilePage from "@/pages/profile";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const BG = "#0f0f0f";
const CARD = "#161616";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const BORDER = "rgba(255,255,255,0.07)";

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
    colorInput: "rgba(255,255,255,0.04)",
    colorInputForeground: TEXT,
    colorNeutral: BORDER,
    fontFamily: "'IBM Plex Sans', 'IBM Plex Sans', 'Inter', system-ui, sans-serif",
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
    dividerText: { color: "#6f6f6f" },
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
      fontFamily: "'IBM Plex Sans', 'IBM Plex Sans', 'Inter', system-ui, sans-serif",
    }}>
      <style>{`.cl-formFieldInput::placeholder { color: #6f6f6f; opacity: 1; }`}</style>
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
        fallbackRedirectUrl={`${basePath}/portal`}
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
      fontFamily: "'IBM Plex Sans', 'IBM Plex Sans', 'Inter', system-ui, sans-serif",
    }}>
      <style>{`.cl-formFieldInput::placeholder { color: #6f6f6f; opacity: 1; }`}</style>
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
        fallbackRedirectUrl={`${basePath}/portal`}
      />
    </div>
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

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      signInFallbackRedirectUrl={`${basePath}/portal`}
      signUpFallbackRedirectUrl={`${basePath}/portal`}
      localization={{
        signIn: {
          start: {
            title: "Đăng nhập AuRenHub",
            subtitle: "Truy cập kho skills & plugins",
          },
        },
        signUp: {
          start: {
            title: "Tham gia AuRenHub",
            subtitle: "Cài đặt skills và plugins miễn phí",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/login">
            <Redirect to="/sign-in" />
          </Route>
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route path="/portal">
            <>
              <Show when="signed-in">
                <PortalPage />
              </Show>
              <Show when="signed-out">
                <Redirect to="/sign-in" />
              </Show>
            </>
          </Route>
          <Route path="/skills" component={SkillsPage} />
          <Route path="/skills/:id" component={SkillDetailPage} />
          <Route path="/plugins" component={PluginsPage} />
          <Route path="/publishers" component={PublishersPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/showcase" component={ShowcasePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/docs" component={DocsPage} />
          <Route path="/collections" component={CollectionsPage} />
          <Route path="/changelog" component={ChangelogPage} />
          <Route path="/profile">
            <>
              <Show when="signed-in">
                <ProfilePage />
              </Show>
              <Show when="signed-out">
                <Redirect to="/sign-in" />
              </Show>
            </>
          </Route>
          <Route component={NotFound} />
        </Switch>
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
