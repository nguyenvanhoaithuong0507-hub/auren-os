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

// Inline SVG logos for major tools
function ToolLogo({ name, color }: { name: string; color: string }) {
  const logos: Record<string, ReactElement> = {
    React: <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><circle cx="12" cy="12" r="2.5" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg>,
    "Next.js": <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><circle cx="12" cy="12" r="10"/><path d="M8 8h2l4 6V8h2v8h-2L10 10v6H8z" fill="#0d0e14"/></svg>,
    "Vue.js": <svg viewBox="0 0 24 24" width="22" height="22"><polygon points="12,2 2,20 22,20" fill="none" stroke="#42b883" strokeWidth="2"/><polygon points="12,7 6.5,17 17.5,17" fill="none" stroke="#35495e" strokeWidth="2"/></svg>,
    "Svelte": <svg viewBox="0 0 24 24" width="22" height="22"><path d="M20.3 4.3c-2.2-3.1-6.6-4-9.7-1.9L4.5 7.5C2.1 9.1 1.3 12.3 2.7 14.8c-.5.8-.8 1.7-.8 2.7 0 2.8 2.2 5 5 5 .9 0 1.7-.2 2.4-.6l6.1-5.1c2.4-1.6 3.2-4.8 1.8-7.3.5-.8.8-1.7.8-2.7-.1-.6-.2-2-2.7-3z" fill="#ff3e00"/></svg>,
    Angular: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2L2 7l1.6 13.2L12 22l8.4-1.8L22 7 12 2z" fill="#dd0031"/><path d="M12 2v20l8.4-1.8L22 7 12 2z" fill="#c3002f"/><path d="M12 5.7L7.4 16h2.2l.8-2.2h3.2l.8 2.2h2.2L12 5.7zm1.3 6.3h-2.6L12 9l1.3 3z" fill="white"/></svg>,
    Astro: <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M8.5 9.5L12 3l3.5 6.5c.5.9-.1 2-.9 2.4L12 13l-2.6-1.1c-.8-.4-1.4-1.5-.9-2.4z" fill="#ff5d01"/><path d="M12 13c0 0-4 2-5 5h10c-1-3-5-5-5-5z" fill="#ff5d01"/></svg>,
    Remix: <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M5 3h7c2.8 0 5 2.2 5 5v2c0 1.8-.9 3.3-2.3 4.3L18 21h-3.5l-2.8-6H8v6H5V3zm3 3v5h4c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2H8z"/></svg>,
    Solid: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2c-1.8 4-5 6-8 8 0 6 4 10 8 12 4-2 8-6 8-12-3-2-6.2-4-8-8z" fill="#2c4f7c"/></svg>,
    Node: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.2l6.8 3.8v7.6L12 19.5l-6.8-3.9V8L12 4.2z" fill="#339933"/></svg>,
    Express: <svg viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M4 12h16M12 4v16" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" fill="none"/></svg>,
    NestJS: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M14.4 2.5c-.6-.3-1.3-.1-1.6.5L10 8.5 7.2 3c-.3-.6-1-.8-1.6-.5-.6.3-.8 1-.5 1.6l4 8c.2.4.6.6 1 .6s.8-.2 1-.6l1-2 1 2c.2.4.6.6 1 .6s.8-.2 1-.6l4-8c.3-.6.1-1.3-.5-1.6H14.4z" fill="#e0234e"/></svg>,
    FastAPI: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2L2 12h7v10l13-13h-7z" fill="#009688"/></svg>,
    Django: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="4" fill="#092e20"/><path d="M8 4h2v12.5c0 2.5-1 3.5-3.5 3.5V18c1.5 0 1.5-.5 1.5-2V4zm4 0h2v8H12V4zm0 10h2c0 2.5-1 6-4 6v-2c2 0 2-2 2-4z" fill="#44b78b"/></svg>,
    PostgreSQL: <svg viewBox="0 0 24 24" width="22" height="22"><ellipse cx="12" cy="7" rx="8" ry="4" stroke="#336791" strokeWidth="1.5" fill="#336791" fillOpacity=".2"/><path d="M4 7v10c0 2.2 3.6 4 8 4s8-1.8 8-4V7" stroke="#336791" strokeWidth="1.5" fill="none"/></svg>,
    MongoDB: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2c0 0-7 6-7 13 0 4 3 7 7 7s7-3 7-7C19 8 12 2 12 2z" fill="#47a248"/><path d="M12 4v16" stroke="#3a8a3f" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    Redis: <svg viewBox="0 0 24 24" width="22" height="22"><ellipse cx="12" cy="9" rx="8" ry="3" fill="#dc382d" fillOpacity=".8"/><path d="M4 9v6c0 1.7 3.6 3 8 3s8-1.3 8-3V9" stroke="#dc382d" strokeWidth="1.5" fill="none"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="#dc382d" strokeWidth="1" fill="none"/></svg>,
    Supabase: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2l9 16H3L12 2z" fill="#3ecf8e"/><path d="M12 8l4 8H8l4-8z" fill="#1e8a55"/></svg>,
    Docker: <svg viewBox="0 0 24 24" width="22" height="22"><rect x="2" y="10" width="4" height="3" rx=".5" fill="#2496ed"/><rect x="7" y="10" width="4" height="3" rx=".5" fill="#2496ed"/><rect x="12" y="10" width="4" height="3" rx=".5" fill="#2496ed"/><rect x="7" y="6" width="4" height="3" rx=".5" fill="#2496ed"/><rect x="12" y="6" width="4" height="3" rx=".5" fill="#2496ed"/><path d="M2 14s1 3 5 3h8c4 0 6-3 6-3" stroke="#2496ed" strokeWidth="1.2" fill="none"/></svg>,
    Vercel: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2L22 20H2L12 2z" fill="white"/></svg>,
    AWS: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 15c-2 0-3-1-3-3s1.5-3 3-3c0-2 1.5-4 4-4s4 2 4 4c2 0 3 1 3 3s-1 3-3 3H7z" fill="#ff9900"/></svg>,
    Vite: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M22 4L12 20 9 14l7-10h6z" fill="#646cff"/><path d="M15 4L8 20l-6-2L12 4h3z" fill="#ff7c3c"/></svg>,
    Kubernetes: <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="10" stroke="#326ce5" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="3" fill="#326ce5"/><line x1="12" y1="2" x2="12" y2="9" stroke="#326ce5" strokeWidth="1.5"/><line x1="12" y1="15" x2="12" y2="22" stroke="#326ce5" strokeWidth="1.5"/><line x1="2" y1="12" x2="9" y2="12" stroke="#326ce5" strokeWidth="1.5"/><line x1="15" y1="12" x2="22" y2="12" stroke="#326ce5" strokeWidth="1.5"/></svg>,
    "GitHub Actions": <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="10" fill="none" stroke="#2088ff" strokeWidth="1.5"/><path d="M9 12l2 2 4-4" stroke="#2088ff" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>,
    Terraform: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M9 2l6 3.5V13L9 9.5V2z" fill="#7b42bc"/><path d="M16.5 6l6 3.5v7.5l-6-3.5V6z" fill="#7b42bc" fillOpacity=".7"/><path d="M1.5 6l6 3.5v7.5l-6-3.5V6z" fill="#7b42bc" fillOpacity=".7"/><path d="M9 15l6 3.5V22L9 18.5V15z" fill="#7b42bc" fillOpacity=".5"/></svg>,
    Prometheus: <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="10" stroke="#e6522c" strokeWidth="1.5" fill="none"/><path d="M8 16c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#e6522c" strokeWidth="1.5" fill="none"/><circle cx="12" cy="9" r="2" fill="#e6522c"/></svg>,
    "Ollama": <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/><circle cx="9" cy="10" r="2" fill="white"/><circle cx="15" cy="10" r="2" fill="white"/><path d="M9 15c1 1.5 5 1.5 6 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>,
    "LangChain": <svg viewBox="0 0 24 24" width="22" height="22"><rect x="2" y="9" width="8" height="6" rx="3" stroke="#1c3c3c" strokeWidth="1.5" fill="none"/><rect x="14" y="9" width="8" height="6" rx="3" stroke="#1c3c3c" strokeWidth="1.5" fill="none"/><line x1="10" y1="12" x2="14" y2="12" stroke="#1c3c3c" strokeWidth="2"/></svg>,
  };

  const logo = logos[name];
  if (logo) return logo;
  
  // Fallback: colored initial
  const initial = name.charAt(0).toUpperCase();
  return (
    <ViewTransition default="none" enter="fade-in">
    <div style={{ width: 22, height: 22, borderRadius: 5, backgroundColor: color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color }}>
      {initial}
    </div>
  );
}

const TOOL_CATEGORIES = [
  {
    id: "frontend", label: "Frontend", icon: "⚡",
    tools: [
      { name: "React", desc: "Component-based UI library by Meta", badge: "Popular", color: "#61dafb", stars: "225K" },
      { name: "Next.js", desc: "Full-stack React framework by Vercel", badge: "Trending", color: "#ffffff", stars: "130K" },
      { name: "Vue.js", desc: "Progressive JavaScript framework", badge: "Stable", color: "#42b883", stars: "208K" },
      { name: "Nuxt.js", desc: "Intuitive Vue framework for production", badge: "Stable", color: "#00dc82", stars: "54K" },
      { name: "Svelte", desc: "Cybernetically enhanced web apps", badge: "Rising", color: "#ff3e00", stars: "80K" },
      { name: "Astro", desc: "Content-focused web framework", badge: "New", color: "#ff5d01", stars: "47K" },
      { name: "Remix", desc: "Full-stack web framework by Shopify", badge: "Stable", color: "#212121", stars: "30K" },
      { name: "Angular", desc: "TypeScript-based web framework by Google", badge: "Enterprise", color: "#dd0031", stars: "96K" },
      { name: "Solid", desc: "Simple and performant reactivity for UIs", badge: "Rising", color: "#2c4f7c", stars: "32K" },
      { name: "SvelteKit", desc: "Full-stack Svelte application framework", badge: "Rising", color: "#ff3e00", stars: "19K" },
    ],
  },
  {
    id: "backend", label: "Backend", icon: "⚙️",
    tools: [
      { name: "Node", desc: "JavaScript runtime built on Chrome V8", badge: "Popular", color: "#339933", stars: "106K" },
      { name: "Express", desc: "Fast, minimalist web framework for Node", badge: "Popular", color: "#ffffff", stars: "65K" },
      { name: "NestJS", desc: "Progressive Node.js framework", badge: "Enterprise", color: "#e0234e", stars: "68K" },
      { name: "FastAPI", desc: "High-performance Python API framework", badge: "Trending", color: "#009688", stars: "78K" },
      { name: "Django", desc: "The web framework for perfectionists", badge: "Stable", color: "#092e20", stars: "81K" },
      { name: "Hono", desc: "Ultrafast web framework for any JS runtime", badge: "New", color: "#e36002", stars: "21K" },
      { name: "Remix", desc: "Full-stack React framework", badge: "Stable", color: "#212121", stars: "30K" },
      { name: "tRPC", desc: "End-to-end typesafe APIs made easy", badge: "Trending", color: "#398ccb", stars: "36K" },
    ],
  },
  {
    id: "database", label: "Database", icon: "🗄️",
    tools: [
      { name: "PostgreSQL", desc: "Advanced open-source relational database", badge: "Popular", color: "#336791", stars: "15K" },
      { name: "MongoDB", desc: "Document-oriented NoSQL database", badge: "Popular", color: "#47a248", stars: "26K" },
      { name: "Redis", desc: "In-memory data store and cache", badge: "Popular", color: "#dc382d", stars: "65K" },
      { name: "Supabase", desc: "Open-source Firebase alternative", badge: "Trending", color: "#3ecf8e", stars: "72K" },
      { name: "Drizzle ORM", desc: "TypeScript-first headless ORM", badge: "Trending", color: "#c5f74f", stars: "24K" },
      { name: "Prisma", desc: "Next-generation ORM for Node.js & TS", badge: "Popular", color: "#5a67d8", stars: "38K" },
      { name: "SQLite", desc: "Embedded SQL database engine", badge: "Stable", color: "#003b57", stars: "5K" },
      { name: "Turso", desc: "SQLite at the edge", badge: "New", color: "#4ff8d2", stars: "11K" },
    ],
  },
  {
    id: "cloud", label: "Cloud & Deploy", icon: "☁️",
    tools: [
      { name: "Docker", desc: "Containerization platform", badge: "Essential", color: "#2496ed", stars: "28K" },
      { name: "Kubernetes", desc: "Container orchestration system", badge: "Enterprise", color: "#326ce5", stars: "110K" },
      { name: "Vercel", desc: "Frontend cloud platform", badge: "Popular", color: "#ffffff", stars: "13K" },
      { name: "AWS", desc: "Amazon Web Services cloud platform", badge: "Enterprise", color: "#ff9900", stars: "N/A" },
      { name: "GitHub Actions", desc: "CI/CD automation platform", badge: "Popular", color: "#2088ff", stars: "15K" },
      { name: "Terraform", desc: "Infrastructure as code", badge: "Popular", color: "#7b42bc", stars: "42K" },
      { name: "Prometheus", desc: "Monitoring and alerting toolkit", badge: "Popular", color: "#e6522c", stars: "54K" },
      { name: "Cloudflare", desc: "Serverless at the edge", badge: "Trending", color: "#f38020", stars: "4K" },
    ],
  },
  {
    id: "ai", label: "AI / LLM", icon: "🤖",
    tools: [
      { name: "OpenAI", desc: "GPT-4o, embeddings, DALL-E", badge: "Popular", color: "#412991", stars: "N/A" },
      { name: "Anthropic", desc: "Claude — safe & constitutional AI", badge: "Trending", color: "#d97706", stars: "N/A" },
      { name: "LangChain", desc: "Framework for LLM applications", badge: "Popular", color: "#1c3c3c", stars: "93K" },
      { name: "Ollama", desc: "Run LLMs locally on your machine", badge: "Trending", color: "#ffffff", stars: "96K" },
      { name: "Pinecone", desc: "Vector database for AI applications", badge: "Trending", color: "#4285f4", stars: "N/A" },
      { name: "HuggingFace", desc: "AI model hub and ML libraries", badge: "Popular", color: "#ff9d0b", stars: "130K" },
      { name: "Replicate", desc: "Run AI models in the cloud", badge: "Stable", color: "#ffffff", stars: "N/A" },
      { name: "Vercel AI", desc: "AI streaming SDK for Next.js", badge: "Trending", color: "#ffffff", stars: "12K" },
    ],
  },
  {
    id: "build", label: "Build Tools", icon: "🏗️",
    tools: [
      { name: "Vite", desc: "Next generation frontend tooling", badge: "Popular", color: "#646cff", stars: "68K" },
      { name: "Bun", desc: "All-in-one JavaScript runtime & toolkit", badge: "Trending", color: "#f9f1e1", stars: "74K" },
      { name: "pnpm", desc: "Fast, disk-space efficient package manager", badge: "Popular", color: "#f69220", stars: "30K" },
      { name: "Turborepo", desc: "High-performance monorepo build system", badge: "Trending", color: "#ef4444", stars: "26K" },
      { name: "esbuild", desc: "Extremely fast JS/TS bundler", badge: "Popular", color: "#ffcf00", stars: "38K" },
      { name: "webpack", desc: "Module bundler for JavaScript", badge: "Stable", color: "#1c78c0", stars: "64K" },
      { name: "Biome", desc: "Formatter and linter for the web", badge: "New", color: "#60a5fa", stars: "15K" },
      { name: "tsup", desc: "Bundle TypeScript without config", badge: "Rising", color: "#fbbf24", stars: "9K" },
    ],
  },
];

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  Popular:   { bg: "rgba(0,207,171,0.1)",   text: "#00cfab" },
  Trending:  { bg: "rgba(251,191,36,0.1)",  text: "#fbbf24" },
  New:       { bg: "rgba(167,139,250,0.1)", text: "#a78bfa" },
  Rising:    { bg: "rgba(99,102,241,0.1)",  text: "#818cf8" },
  Stable:    { bg: "rgba(107,114,128,0.12)",text: "#9ca3af" },
  Enterprise:{ bg: "rgba(59,130,246,0.1)",  text: "#60a5fa" },
    </ViewTransition>
  Essential: { bg: "rgba(239,68,68,0.1)",   text: "#f87171" },
};

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "logo">("logo");

  const filteredCats = TOOL_CATEGORIES.map(cat => ({
    ...cat,
    tools: cat.tools.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.desc.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => (activeCategory === "all" || cat.id === activeCategory) && cat.tools.length > 0);

  const totalTools = TOOL_CATEGORIES.reduce((s, c) => s + c.tools.length, 0);

  return (
    <div style={{ display: "flex", minHeight: "100dvh", backgroundColor: BG, color: TEXT, fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden" }}>
      <style>{`
        .tool-card:hover{border-color:rgba(0,207,171,0.3)!important;background:rgba(0,207,171,0.04)!important;transform:translateY(-2px)}
        .tool-card{transition:all 0.15s ease;cursor:pointer}
        .logo-card:hover{border-color:rgba(0,207,171,0.4)!important;background:rgba(0,207,171,0.05)!important;transform:translateY(-3px) scale(1.02)}
        .logo-card{transition:all 0.18s ease;cursor:pointer}
        input::placeholder{color:${DIMMED}}
        input{outline:none}
        @media(max-width:767px){.desktop-sidebar{display:none!important}}
      `}</style>

      <Sidebar active="tools" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ padding: "0 24px", height: 48, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, backgroundColor: "rgba(9,10,16,0.9)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: MUTED, fontSize: 13 }}>workspace</span>
            <span style={{ color: DIMMED, fontSize: 13 }}>/</span>
            <span style={{ color: TEXT, fontWeight: 500, fontSize: 13 }}>tools</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace" }}>{totalTools} tools</span>
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
            <h1 style={{ fontSize: "clamp(1.3rem,3vw,1.9rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Tool Catalog</h1>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>{totalTools}+ tools across {TOOL_CATEGORIES.length} categories.</p>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={DIMMED} strokeWidth="2" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..."
                style={{ width: "100%", padding: "10px 14px 10px 36px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT, fontSize: 13, fontFamily: "inherit" }} />
            </div>

            {/* Category filter */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 28 }}>
              {[{ id: "all", label: "All" }, ...TOOL_CATEGORIES.map(c => ({ id: c.id, label: c.label }))].map(cat => (
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
                  <span style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace" }}>({cat.tools.length})</span>
                </div>

                {viewMode === "logo" ? (
                  /* Logo grid — icon-first square cards */
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(110px,1fr))", gap: 10 }}>
                    {cat.tools.map(tool => {
                      const badge = BADGE_COLORS[tool.badge] || BADGE_COLORS.Stable;
                      return (
                        <div key={tool.name} className="logo-card"
                          style={{ padding: "16px 10px 12px", borderRadius: 10, border: `1px solid ${BORDER}`, backgroundColor: CARD, textAlign: "center", position: "relative" }}>
                          {/* Badge dot */}
                          <div style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: "50%", backgroundColor: badge.text }} title={tool.badge} />
                          {/* Logo */}
                          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: tool.color + "18", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 12px ${tool.color}20` }}>
                              <ToolLogo name={tool.name} color={tool.color} />
                            </div>
                          </div>
                          {/* Name */}
                          <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 3, lineHeight: 1.3 }}>{tool.name}</div>
                          {/* Stars */}
                          {tool.stars !== "N/A" && (
                            <div style={{ fontSize: 9, color: DIMMED, fontFamily: "'JetBrains Mono',monospace" }}>★ {tool.stars}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Grid view — horizontal card with description */
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 10 }}>
                    {cat.tools.map(tool => {
                      const badge = BADGE_COLORS[tool.badge] || BADGE_COLORS.Stable;
                      return (
                        <div key={tool.name} className="tool-card"
                          style={{ padding: "14px 16px", borderRadius: 8, border: `1px solid ${BORDER}`, backgroundColor: CARD }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 7, backgroundColor: tool.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <ToolLogo name={tool.name} color={tool.color} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{tool.name}</span>
                                <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, backgroundColor: badge.bg, color: badge.text, fontWeight: 600 }}>{tool.badge}</span>
                              </div>
                            </div>
                          </div>
                          <p style={{ fontSize: 11, color: MUTED, margin: "0 0 8px", lineHeight: 1.55 }}>{tool.desc}</p>
                          {tool.stars !== "N/A" && (
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ fontSize: 10, color: DIMMED }}>★ {tool.stars}</span>
                            </div>
                          )}
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

      <MobileNav active="tools" />
    </div>
  );
}
