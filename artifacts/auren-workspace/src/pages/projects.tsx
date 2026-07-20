import { useState } from "react";
import { useLocation } from "wouter";
import { ViewTransition } from "react";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const BG = "#090a10";
const CARD = "#111521";
const BORDER = "#1a1f2e";
const ACCENT = "#00cfab";
const TEXT = "#dce2f0";
const MUTED = "#8892a4";
const DIMMED = "#3a4155";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572a5",
  Rust: "#ce4a09",
  Go: "#00aed8",
};

const PROJECTS = [
  { id: 1, name: "commerce-tool", desc: "Full-stack e-commerce platform with Stripe payments, inventory management, and real-time dashboard", tags: ["React", "Node.js", "Postgres", "Stripe"], status: "running", updated: "2 min ago", lang: "TypeScript", size: "2.4 MB", files: 128, commits: 47 },
  { id: 2, name: "auth-gateway", desc: "JWT + OAuth2 authentication service with rate limiting, refresh tokens, and multi-provider support", tags: ["Express", "Redis", "JWT", "OAuth2"], status: "running", updated: "1 hr ago", lang: "TypeScript", size: "840 KB", files: 62, commits: 23 },
  { id: 3, name: "analytics-dash", desc: "Realtime analytics dashboard with WebSockets, custom metrics, and automated reporting", tags: ["Next.js", "Recharts", "Prisma", "Socket.io"], status: "stopped", updated: "3 hr ago", lang: "TypeScript", size: "3.1 MB", files: 215, commits: 89 },
  { id: 4, name: "ml-pipeline", desc: "AI inference pipeline with self-healing loops, queue management, and distributed processing", tags: ["FastAPI", "Celery", "Redis", "PyTorch"], status: "running", updated: "Yesterday", lang: "Python", size: "1.8 MB", files: 94, commits: 31 },
  { id: 5, name: "cms-headless", desc: "Headless CMS API with rich text editor, media upload, versioning, and webhook support", tags: ["Strapi", "PostgreSQL", "S3", "GraphQL"], status: "stopped", updated: "2 days ago", lang: "JavaScript", size: "5.2 MB", files: 347, commits: 156 },
  { id: 6, name: "chat-realtime", desc: "WebSocket chat application with rooms, presence indicators, message reactions, and file sharing", tags: ["Socket.io", "React", "MongoDB", "Redis"], status: "running", updated: "3 days ago", lang: "TypeScript", size: "1.6 MB", files: 88, commits: 42 },
  { id: 7, name: "task-automator", desc: "Browser automation toolkit for scraping, form filling, and end-to-end workflow testing", tags: ["Playwright", "Node.js", "SQLite"], status: "stopped", updated: "5 days ago", lang: "TypeScript", size: "920 KB", files: 55, commits: 18 },
  { id: 8, name: "api-gateway", desc: "Microservices API gateway with routing, load balancing, auth middleware, and rate limiting", tags: ["Nginx", "Node.js", "Redis", "Prometheus"], status: "stopped", updated: "1 week ago", lang: "TypeScript", size: "740 KB", files: 48, commits: 27 },
];

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "running" | "stopped">("all");
  const [downloading, setDownloading] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState<Set<number>>(new Set());

  const filtered = PROJECTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  function handleDownload(proj: typeof PROJECTS[0]) {
    setDownloading(proj.id);
    setTimeout(() => {
      setDownloading(null);
      setDownloaded(prev => new Set([...prev, proj.id]));
      // Simulate file download
      const blob = new Blob([`# ${proj.name}\n\n${proj.desc}\n\nTags: ${proj.tags.join(", ")}\nLanguage: ${proj.lang}\nFiles: ${proj.files}\nSize: ${proj.size}\n`], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${proj.name}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      setTimeout(() => setDownloaded(prev => { const next = new Set(prev); next.delete(proj.id); return next; }), 3000);
    }, 1800);
  }

  return (
    <ViewTransition default="none" enter="fade-in">
      <div style={{ display: "flex", minHeight: "100dvh", backgroundColor: BG, color: TEXT, fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden" }}>
      <style>{`
        *{box-sizing:border-box}
        .proj-card:hover{border-color:rgba(0,207,171,0.28)!important;background:rgba(0,207,171,0.02)!important}
        .proj-card{transition:all 0.15s}
        .dl-btn:hover{background:rgba(0,207,171,0.12)!important}
        input{outline:none}
        input::placeholder{color:${DIMMED}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @media(max-width:767px){.desktop-sidebar{display:none!important}}
      `}</style>

      <Sidebar active="projects" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ padding: "0 24px", height: 48, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, backgroundColor: "rgba(9,10,16,0.9)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: MUTED, fontSize: 13 }}>workspace</span>
            <span style={{ color: DIMMED, fontSize: 13 }}>/</span>
            <span style={{ color: TEXT, fontWeight: 500, fontSize: 13 }}>projects</span>
          </div>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace" }}>{PROJECTS.length} dự án</span>
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: "28px 24px 90px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h1 style={{ fontSize: "clamp(1.3rem,3vw,1.9rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>Dự án của tôi</h1>
                <p style={{ fontSize: 13, color: MUTED }}>Quản lý và tải xuống các dự án của bạn dưới dạng file ZIP.</p>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                + Dự án mới
              </button>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 10, marginTop: 20, marginBottom: 16, flexWrap: "wrap" }}>
              <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={DIMMED} strokeWidth="2" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm dự án..."
                  style={{ width: "100%", padding: "9px 13px 9px 34px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT, fontSize: 12, fontFamily: "inherit" }} />
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {(["all", "running", "stopped"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    style={{ padding: "8px 14px", borderRadius: 7, border: `1px solid ${filter === f ? ACCENT : BORDER}`, backgroundColor: filter === f ? `${ACCENT}14` : "transparent", color: filter === f ? ACCENT : MUTED, fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                    {f === "all" ? "Tất cả" : f === "running" ? "Đang chạy" : "Đã dừng"}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 10, marginBottom: 24 }}>
              {[
                { label: "Tổng dự án", value: PROJECTS.length },
                { label: "Đang chạy", value: PROJECTS.filter(p => p.status === "running").length, color: ACCENT },
                { label: "Tổng file", value: PROJECTS.reduce((s, p) => s + p.files, 0).toLocaleString() },
                { label: "Tổng commits", value: PROJECTS.reduce((s, p) => s + p.commits, 0) },
              ].map(stat => (
                <div key={stat.label} style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 9, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>{stat.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: stat.color || TEXT, fontFamily: "'JetBrains Mono',monospace" }}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Projects list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map(proj => {
                const isDl = downloading === proj.id;
                const isDone = downloaded.has(proj.id);
                return (
                  <div key={proj.id} className="proj-card" style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Name row */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: proj.status === "running" ? ACCENT : DIMMED, flexShrink: 0, boxShadow: proj.status === "running" ? `0 0 6px ${ACCENT}` : "none" }} />
                          <span style={{ fontSize: 14, fontWeight: 700, color: TEXT, fontFamily: "'JetBrains Mono',monospace" }}>{proj.name}</span>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: LANG_COLORS[proj.lang] || DIMMED, flexShrink: 0 }} title={proj.lang} />
                          <span style={{ fontSize: 10, color: DIMMED }}>{proj.lang}</span>
                        </div>
                        {/* Desc */}
                        <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 10 }}>{proj.desc}</p>
                        {/* Tags */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                          {proj.tags.map(t => (
                            <span key={t} style={{ fontSize: 10, color: MUTED, backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, padding: "2px 7px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>
                          ))}
                        </div>
                        {/* Meta */}
                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                          {[
                            { icon: "📁", val: `${proj.files} files` },
                            { icon: "💾", val: proj.size },
                            { icon: "⌥", val: `${proj.commits} commits` },
                            { icon: "🕐", val: proj.updated },
                          ].map(m => (
                            <span key={m.val} style={{ fontSize: 10, color: DIMMED, display: "flex", alignItems: "center", gap: 4 }}>
                              <span>{m.icon}</span>{m.val}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Download button */}
                      <button onClick={() => handleDownload(proj)} disabled={isDl} className="dl-btn"
                        style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 7, border: `1px solid ${isDone ? ACCENT : BORDER}`, backgroundColor: isDone ? `${ACCENT}14` : "transparent", color: isDone ? ACCENT : MUTED, fontSize: 12, cursor: isDl ? "wait" : "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.15s" }}>
                        {isDl ? (
                          <div style={{ width: 13, height: 13, border: `2px solid ${DIMMED}`, borderTopColor: ACCENT, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                        ) : isDone ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                          <DownloadIcon />
                        )}
                        {isDl ? "Đang tải..." : isDone ? "Đã tải" : "Tải ZIP"}
                      </button>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px 20px", color: DIMMED }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>📂</div>
                  <p>Không tìm thấy dự án nào</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <MobileNav active="projects" />
      </div>
    </ViewTransition>
  );
}
