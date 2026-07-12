import { useState, type ReactElement } from "react";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const BG = "#090a10";
const CARD = "#111521";
const BORDER = "#1a1f2e";
const ACCENT = "#00cfab";
const TEXT = "#dce2f0";
const MUTED = "#8892a4";
const DIMMED = "#3a4155";

function LibLogo({ name, color }: { name: string; color: string }) {
  const logos: Record<string, ReactElement> = {
    "shadcn/ui": <svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="3" width="8" height="8" rx="1.5" fill="none" stroke="white" strokeWidth="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5" fill="none" stroke="white" strokeWidth="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5" fill="none" stroke="white" strokeWidth="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5" fill="white"/></svg>,
    "Radix UI": <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><circle cx="9" cy="9" r="5" stroke="white" strokeWidth="1.5"/><circle cx="17" cy="17" r="4" fill="white"/><line x1="13" y1="13" x2="20" y2="20" stroke="white" strokeWidth="1.5"/></svg>,
    "Material UI": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 7l9-5 9 5v5l-9 5-9-5V7z" fill="none" stroke="#007fff" strokeWidth="1.5"/><path d="M3 12l9 5 9-5" fill="none" stroke="#007fff" strokeWidth="1.5"/></svg>,
    "Tailwind CSS": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5C11.26 8.69 12 9.48 12.78 10.3c1.28 1.35 2.77 2.7 5.72 2.7 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-0.76-.19-1.5-.98-2.28-1.8C16.44 7.35 14.95 6 12 6zM6 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.5.98 2.28 1.8C8.06 17.65 9.55 19 12.5 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.5-.98-2.28-1.8C10.44 13.35 8.95 12 6 12z" fill="#06b6d4"/></svg>,
    "Framer Motion": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 3h14v7l-7 4L5 10V3z" fill="#bb4b96"/><path d="M5 14l7 4v6l-7-4v-6z" fill="#bb4b96" fillOpacity=".7"/><path d="M12 18l7-4v6l-7 4v-6z" fill="#bb4b96" fillOpacity=".4"/></svg>,
    "Zustand": <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" stroke="#764abc" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="4" fill="#764abc"/></svg>,
    "React Query": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2l3 7h7l-5.5 4.5 2 7L12 17l-6.5 3.5 2-7L2 9h7z" fill="none" stroke="#ff4154" strokeWidth="1.5"/></svg>,
    "Zod": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 5h16l-8 14-8-14z" fill="none" stroke="#3e67b1" strokeWidth="1.5"/><path d="M4 5h9L9 12H4z" fill="#3e67b1" fillOpacity=".4"/></svg>,
    "GSAP": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 12h18M12 3v18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" stroke="#88ce02" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    "Three.js": <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 2L2 20h20L12 2z" stroke="#049ef4" strokeWidth="1.5"/><path d="M7 14h10M9.5 9.5l5 5" stroke="#049ef4" strokeWidth="1.2"/></svg>,
    "Recharts": <svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="14" width="4" height="7" rx="1" fill="#22c55e"/><rect x="10" y="9" width="4" height="12" rx="1" fill="#22c55e" fillOpacity=".8"/><rect x="17" y="4" width="4" height="17" rx="1" fill="#22c55e" fillOpacity=".6"/></svg>,
    "D3.js": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 20 C8 20 8 4 12 4 C16 4 16 20 21 20" stroke="#f68e27" strokeWidth="2" fill="none"/></svg>,
    "Axios": <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="9" stroke="#5a29e4" strokeWidth="1.5" fill="none"/><path d="M8 12h8M12 8l4 4-4 4" stroke="#5a29e4" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    "date-fns": <svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#770c56" strokeWidth="1.5" fill="none"/><line x1="3" y1="9" x2="21" y2="9" stroke="#770c56" strokeWidth="1.2"/><line x1="8" y1="2" x2="8" y2="6" stroke="#770c56" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="#770c56" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    "Jotai": <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="8" r="5" stroke="white" strokeWidth="1.5" fill="none"/><path d="M12 13v8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 17h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    "React Hook Form": <svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="6" width="18" height="3" rx="1.5" fill="#ec5990"/><rect x="3" y="11" width="12" height="3" rx="1.5" fill="#ec5990" fillOpacity=".7"/><rect x="3" y="16" width="15" height="3" rx="1.5" fill="#ec5990" fillOpacity=".4"/></svg>,
    "clsx": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6L6 18" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/></svg>,
    "immer": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" fill="none" stroke="#00e7c3" strokeWidth="1.5"/><path d="M9 12l2 2 4-4" stroke="#00e7c3" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
  };

  const logo = logos[name];
  if (logo) return logo;
  const initial = name.charAt(0).toUpperCase();
  return (
    <ViewTransition default="none" enter="fade-in">
    <div style={{ width: 22, height: 22, borderRadius: 5, backgroundColor: color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color }}>
      {initial}
    </div>
  );
}

const LIBRARY_CATEGORIES = [
  {
    id: "ui", label: "UI Components", icon: "🎨",
    libs: [
      { name: "shadcn/ui", desc: "Beautifully designed accessible components", badge: "Hot", lang: "TypeScript", weekly: "2.1M", color: "#ffffff" },
      { name: "Radix UI", desc: "Unstyled accessible component primitives", badge: "Popular", lang: "TypeScript", weekly: "8.4M", color: "#ffffff" },
      { name: "Material UI", desc: "Google Material Design React components", badge: "Stable", lang: "TypeScript", weekly: "22M", color: "#007fff" },
      { name: "Tailwind CSS", desc: "Utility-first CSS framework", badge: "Hot", lang: "CSS", weekly: "11M", color: "#06b6d4" },
      { name: "Mantine", desc: "Full featured React component library", badge: "Trending", lang: "TypeScript", weekly: "1.8M", color: "#339af0" },
      { name: "Ant Design", desc: "Enterprise-level design system", badge: "Enterprise", lang: "TypeScript", weekly: "18M", color: "#0170fe" },
      { name: "DaisyUI", desc: "Tailwind CSS component library", badge: "Rising", lang: "CSS", weekly: "980K", color: "#5a0ef6" },
      { name: "Headless UI", desc: "Completely unstyled accessible UI components", badge: "Stable", lang: "TypeScript", weekly: "7.2M", color: "#ffffff" },
    ],
  },
  {
    id: "state", label: "State Management", icon: "🔄",
    libs: [
      { name: "Zustand", desc: "Small, fast and scalable state management", badge: "Hot", lang: "TypeScript", weekly: "6.1M", color: "#764abc" },
      { name: "Jotai", desc: "Primitive and flexible state for React", badge: "Trending", lang: "TypeScript", weekly: "1.7M", color: "#ffffff" },
      { name: "Redux Toolkit", desc: "Official, opinionated Redux toolset", badge: "Popular", lang: "TypeScript", weekly: "12M", color: "#764abc" },
      { name: "XState", desc: "State machines and statecharts for JS/TS", badge: "Stable", lang: "TypeScript", weekly: "2.5M", color: "#2b3e50" },
      { name: "MobX", desc: "Simple, scalable state management", badge: "Stable", lang: "TypeScript", weekly: "3.4M", color: "#de3f24" },
      { name: "Valtio", desc: "Proxy-state management for React", badge: "Rising", lang: "TypeScript", weekly: "720K", color: "#3d75b0" },
      { name: "Nanostores", desc: "Tiny state manager with atomic stores", badge: "Rising", lang: "TypeScript", weekly: "310K", color: "#44a1b0" },
      { name: "Recoil", desc: "Experimental state management by Meta", badge: "Stable", lang: "TypeScript", weekly: "1.1M", color: "#1877f2" },
    ],
  },
  {
    id: "data", label: "Data Fetching", icon: "📡",
    libs: [
      { name: "React Query", desc: "Powerful async state management", badge: "Hot", lang: "TypeScript", weekly: "7.8M", color: "#ff4154" },
      { name: "SWR", desc: "React Hooks for data fetching by Vercel", badge: "Popular", lang: "TypeScript", weekly: "5.1M", color: "#ffffff" },
      { name: "Axios", desc: "Promise based HTTP client", badge: "Popular", lang: "TypeScript", weekly: "51M", color: "#5a29e4" },
      { name: "tRPC", desc: "End-to-end typesafe APIs made easy", badge: "Trending", lang: "TypeScript", weekly: "1.6M", color: "#398ccb" },
      { name: "Apollo Client", desc: "GraphQL client for React", badge: "Stable", lang: "TypeScript", weekly: "4.3M", color: "#311c87" },
      { name: "Ky", desc: "Tiny HTTP client based on Fetch API", badge: "Rising", lang: "TypeScript", weekly: "1.4M", color: "#f97316" },
      { name: "ofetch", desc: "Better fetch API with retry and error handling", badge: "Rising", lang: "TypeScript", weekly: "8.5M", color: "#2dd4bf" },
      { name: "GraphQL Request", desc: "Minimal GraphQL client", badge: "Stable", lang: "TypeScript", weekly: "3.2M", color: "#e535ab" },
    ],
  },
  {
    id: "forms", label: "Forms & Validation", icon: "📝",
    libs: [
      { name: "React Hook Form", desc: "Performant forms with easy validation", badge: "Hot", lang: "TypeScript", weekly: "11M", color: "#ec5990" },
      { name: "Zod", desc: "TypeScript-first schema validation", badge: "Hot", lang: "TypeScript", weekly: "17M", color: "#3e67b1" },
      { name: "Formik", desc: "Build forms without tears in React", badge: "Stable", lang: "TypeScript", weekly: "4.8M", color: "#172b4d" },
      { name: "Yup", desc: "Dead simple Object schema validation", badge: "Stable", lang: "TypeScript", weekly: "12M", color: "#0052cc" },
      { name: "Valibot", desc: "Modular and type-safe schema library", badge: "New", lang: "TypeScript", weekly: "620K", color: "#eab308" },
      { name: "Conform", desc: "Type-safe form validation with Remix", badge: "New", lang: "TypeScript", weekly: "180K", color: "#06b6d4" },
    ],
  },
  {
    id: "animation", label: "Animation", icon: "✨",
    libs: [
      { name: "Framer Motion", desc: "Production-ready motion library for React", badge: "Popular", lang: "TypeScript", weekly: "5.4M", color: "#bb4b96" },
      { name: "GSAP", desc: "Professional-grade animation library", badge: "Popular", lang: "JavaScript", weekly: "1.9M", color: "#88ce02" },
      { name: "Three.js", desc: "3D library for WebGL rendering", badge: "Popular", lang: "TypeScript", weekly: "2.1M", color: "#049ef4" },
      { name: "Auto Animate", desc: "Zero-config animation drop-in", badge: "Rising", lang: "TypeScript", weekly: "250K", color: "#7c3aed" },
      { name: "Motion One", desc: "A new animation API for the web", badge: "Rising", lang: "TypeScript", weekly: "430K", color: "#ec4899" },
      { name: "Lottie React", desc: "Render After Effects animations in React", badge: "Stable", lang: "TypeScript", weekly: "710K", color: "#00c1d4" },
    ],
  },
  {
    id: "charts", label: "Charts", icon: "📊",
    libs: [
      { name: "Recharts", desc: "Composable charting library for React", badge: "Popular", lang: "TypeScript", weekly: "4.2M", color: "#22c55e" },
      { name: "Chart.js", desc: "Simple yet flexible chart library", badge: "Popular", lang: "TypeScript", weekly: "8.3M", color: "#ff6384" },
      { name: "D3.js", desc: "Data-driven documents in the browser", badge: "Stable", lang: "TypeScript", weekly: "6.1M", color: "#f68e27" },
      { name: "Tremor", desc: "React components to build dashboards", badge: "Trending", lang: "TypeScript", weekly: "310K", color: "#6366f1" },
      { name: "Visx", desc: "Expressive, low-level viz primitives", badge: "Stable", lang: "TypeScript", weekly: "1.2M", color: "#1e80ff" },
      { name: "Victory", desc: "Composable charting components for React", badge: "Stable", lang: "TypeScript", weekly: "580K", color: "#f4f0eb" },
    ],
  },
  {
    id: "utils", label: "Utilities", icon: "🔨",
    libs: [
      { name: "date-fns", desc: "Modern JavaScript date utility library", badge: "Popular", lang: "TypeScript", weekly: "26M", color: "#770c56" },
      { name: "clsx", desc: "Utility for constructing className strings", badge: "Popular", lang: "TypeScript", weekly: "42M", color: "#3b82f6" },
      { name: "immer", desc: "Create next immutable state by mutating", badge: "Popular", lang: "TypeScript", weekly: "14M", color: "#00e7c3" },
      { name: "Lodash", desc: "JavaScript utility library", badge: "Stable", lang: "TypeScript", weekly: "60M", color: "#3492ff" },
      { name: "uuid", desc: "Generate RFC-compliant UUIDs", badge: "Popular", lang: "TypeScript", weekly: "68M", color: "#0277bd" },
      { name: "nanoid", desc: "Tiny, secure URL-friendly unique ID generator", badge: "Trending", lang: "TypeScript", weekly: "34M", color: "#4ee066" },
      { name: "dayjs", desc: "Minimalist date library (2KB)", badge: "Popular", lang: "TypeScript", weekly: "22M", color: "#ff8c00" },
      { name: "zod", desc: "TypeScript-first schema validation", badge: "Hot", lang: "TypeScript", weekly: "17M", color: "#3e67b1" },
    ],
  },
];

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Hot:       { bg: "rgba(239,68,68,0.1)",   text: "#f87171" },
  Popular:   { bg: "rgba(0,207,171,0.1)",   text: "#00cfab" },
  Trending:  { bg: "rgba(251,191,36,0.1)",  text: "#fbbf24" },
  New:       { bg: "rgba(167,139,250,0.1)", text: "#a78bfa" },
  Rising:    { bg: "rgba(99,102,241,0.1)",  text: "#818cf8" },
  Stable:    { bg: "rgba(107,114,128,0.12)",text: "#9ca3af" },
    </ViewTransition>
  Enterprise:{ bg: "rgba(59,130,246,0.1)",  text: "#60a5fa" },
};

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"logo" | "grid">("logo");

  const filteredCats = LIBRARY_CATEGORIES.map(cat => ({
    ...cat,
    libs: cat.libs.filter(l =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => (activeCategory === "all" || cat.id === activeCategory) && cat.libs.length > 0);

  const totalLibs = LIBRARY_CATEGORIES.reduce((s, c) => s + c.libs.length, 0);

  return (
    <div style={{ display: "flex", minHeight: "100dvh", backgroundColor: BG, color: TEXT, fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden" }}>
      <style>{`
        .lib-card:hover{border-color:rgba(0,207,171,0.28)!important;background:rgba(0,207,171,0.04)!important;transform:translateY(-2px)}
        .lib-card{transition:all 0.15s ease;cursor:pointer}
        .logo-lib:hover{border-color:rgba(0,207,171,0.4)!important;background:rgba(0,207,171,0.05)!important;transform:translateY(-3px) scale(1.02)}
        .logo-lib{transition:all 0.18s ease;cursor:pointer}
        input::placeholder{color:${DIMMED}}
        input{outline:none}
        @media(max-width:767px){.desktop-sidebar{display:none!important}}
      `}</style>

      <Sidebar active="library" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ padding: "0 24px", height: 48, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, backgroundColor: "rgba(9,10,16,0.9)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: MUTED, fontSize: 13 }}>workspace</span>
            <span style={{ color: DIMMED, fontSize: 13 }}>/</span>
            <span style={{ color: TEXT, fontWeight: 500, fontSize: 13 }}>library</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace" }}>{totalLibs} libraries</span>
            <div style={{ display: "flex", borderRadius: 6, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
              {(["logo", "grid"] as const).map(m => (
                <button key={m} onClick={() => setViewMode(m)} style={{ padding: "4px 10px", border: "none", backgroundColor: viewMode === m ? ACCENT : "transparent", color: viewMode === m ? BG : MUTED, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>
                  {m === "logo" ? "Logo" : "Grid"}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: "24px 20px 90px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <h1 style={{ fontSize: "clamp(1.3rem,3vw,1.9rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Library Catalog</h1>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>{totalLibs}+ curated libraries across {LIBRARY_CATEGORIES.length} categories.</p>

            <div style={{ position: "relative", marginBottom: 16 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={DIMMED} strokeWidth="2" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search libraries..."
                style={{ width: "100%", padding: "10px 14px 10px 36px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT, fontSize: 13, fontFamily: "inherit" }} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
              {[{ id: "all", label: "All" }, ...LIBRARY_CATEGORIES.map(c => ({ id: c.id, label: c.label }))].map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  style={{ padding: "5px 13px", borderRadius: 6, border: `1px solid ${activeCategory === cat.id ? ACCENT : BORDER}`, backgroundColor: activeCategory === cat.id ? `${ACCENT}14` : "transparent", color: activeCategory === cat.id ? ACCENT : MUTED, fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                  {cat.label}
                </button>
              ))}
            </div>

            {filteredCats.map(cat => (
              <div key={cat.id} style={{ marginBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${BORDER}` }}>
                  <span style={{ fontSize: 16 }}>{cat.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{cat.label}</span>
                  <span style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace" }}>({cat.libs.length})</span>
                </div>

                {viewMode === "logo" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 10 }}>
                    {cat.libs.map(lib => {
                      const badge = BADGE_COLORS[lib.badge] || BADGE_COLORS.Stable;
                      return (
                        <div key={lib.name} className="logo-lib"
                          style={{ padding: "16px 10px 12px", borderRadius: 10, border: `1px solid ${BORDER}`, backgroundColor: CARD, textAlign: "center", position: "relative" }}>
                          <div style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: "50%", backgroundColor: badge.text }} title={lib.badge} />
                          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: lib.color + "18", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${lib.color}20` }}>
                              <LibLogo name={lib.name} color={lib.color} />
                            </div>
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: TEXT, marginBottom: 3, lineHeight: 1.3 }}>{lib.name}</div>
                          <div style={{ fontSize: 9, color: DIMMED, fontFamily: "'JetBrains Mono',monospace" }}>{lib.weekly}/wk</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 10 }}>
                    {cat.libs.map(lib => {
                      const badge = BADGE_COLORS[lib.badge] || BADGE_COLORS.Stable;
                      return (
                        <div key={lib.name} className="lib-card"
                          style={{ padding: "14px 16px", borderRadius: 8, border: `1px solid ${BORDER}`, backgroundColor: CARD }}>
                          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 7 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 32, height: 32, borderRadius: 7, backgroundColor: lib.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <LibLogo name={lib.name} color={lib.color} />
                              </div>
                              <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{lib.name}</span>
                            </div>
                            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, backgroundColor: badge.bg, color: badge.text, fontWeight: 600, whiteSpace: "nowrap", marginLeft: 6 }}>{lib.badge}</span>
                          </div>
                          <p style={{ fontSize: 11, color: MUTED, margin: "0 0 10px", lineHeight: 1.55 }}>{lib.desc}</p>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <span style={{ fontSize: 10, color: DIMMED, fontFamily: "'JetBrains Mono',monospace", backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, padding: "1px 6px", borderRadius: 3 }}>{lib.lang}</span>
                            <span style={{ fontSize: 10, color: DIMMED }}>↗ {lib.weekly}/wk</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>

      <MobileNav active="library" />
    </div>
  );
}
