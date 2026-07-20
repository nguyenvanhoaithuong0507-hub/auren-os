import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { ViewTransition } from "react";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const PROMPTS = [
  "SaaS Dashboard",
  "E-commerce Store",
  "REST API",
  "Landing Page",
  "Auth System",
  "Real-time Chat",
  "Blog CMS",
  "Admin Panel",
];

const RECENT_PROJECTS = [
  { id: 1, name: "commerce-tool", desc: "Full-stack e-commerce with Stripe & inventory", tags: ["React", "Node.js", "Postgres"], status: "running", updated: "2 min ago", lang: "TypeScript" },
  { id: 2, name: "auth-gateway", desc: "JWT + OAuth2 authentication service", tags: ["Express", "Redis", "JWT"], status: "running", updated: "1 hr ago", lang: "TypeScript" },
  { id: 3, name: "analytics-dash", desc: "Realtime analytics dashboard with WebSockets", tags: ["Next.js", "Recharts", "Prisma"], status: "stopped", updated: "3 hr ago", lang: "TypeScript" },
  { id: 4, name: "ml-pipeline", desc: "AI inference pipeline with self-healing loops", tags: ["FastAPI", "Celery", "Redis"], status: "running", updated: "Yesterday", lang: "Python" },
  { id: 5, name: "cms-headless", desc: "Headless CMS API with rich text and media", tags: ["Strapi", "PostgreSQL", "S3"], status: "stopped", updated: "2 days ago", lang: "JavaScript" },
  { id: 6, name: "chat-realtime", desc: "WebSocket chat with rooms and presence", tags: ["Socket.io", "React", "MongoDB"], status: "running", updated: "3 days ago", lang: "JavaScript" },
];

const THINKING_STEPS = [
  "Analyzing intent...",
  "Planning architecture...",
  "Generating project structure...",
  "Writing 24 files...",
  "Running tests (0/18 passing)...",
  "Self-healing: iteration 1/3...",
  "Patching: auth middleware + JWT...",
  "Tests: 18/18 passing ✓",
  "Deploying to production...",
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572a5",
};

export default function WorkspacePage() {
  const [, navigate] = useLocation();
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkStep, setThinkStep] = useState(0);
  const [thinkDone, setThinkDone] = useState(false);
  const [builtName, setBuiltName] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const thinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleBuild() {
    if (!input.trim()) return;
    setBuiltName(input.trim());
    setIsThinking(true);
    setThinkStep(0);
    setThinkDone(false);
    let step = 0;
    thinkRef.current = setInterval(() => {
      step++;
      setThinkStep(step);
      if (step >= THINKING_STEPS.length - 1) {
        clearInterval(thinkRef.current!);
        setTimeout(() => { setThinkDone(true); }, 900);
      }
    }, 900);
  }

  function handleReset() {
    setIsThinking(false);
    setThinkDone(false);
    setInput("");
    setThinkStep(0);
  }

  function handlePrompt(p: string) {
    setInput(`Build me a ${p.toLowerCase()} application with authentication, database, and responsive UI`);
    textareaRef.current?.focus();
  }

  useEffect(() => () => { if (thinkRef.current) clearInterval(thinkRef.current); }, []);

  return (
    <ViewTransition default="none" enter="fade-in">
      <div className="flex min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
        <style>{`
          *{box-sizing:border-box}
          textarea{resize:none;outline:none}
          textarea::placeholder{color:hsl(0, 0%, 45.1%)}
          .proj-card:hover{border-color:rgba(0,217,255,0.28)!important;background:rgba(0,217,255,0.03)!important}
          .prompt-pill:hover{border-color:rgba(0,217,255,0.4)!important;color:hsl(0, 0%, 3.6%)!important}
          .icon-btn:hover{background:rgba(0,0,0,0.06)!important}
          @keyframes thinking-dot{0%,80%,100%{transform:scale(0.6);opacity:0.35}40%{transform:scale(1);opacity:1}}
          @keyframes slide-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
          @keyframes scan{0%{top:0}100%{top:100%}}
          @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
          @media(max-width:767px){.desktop-sidebar{display:none!important}}
        `}</style>

        <Sidebar active="home" />

        <div className="flex-1 flex flex-col min-w-0">

          {/* Header breadcrumb */}
          <header className="px-5 h-12 border-b border-border flex items-center justify-between flex-shrink-0 bg-background/90 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">workspace</span>
              <span className="text-muted">/</span>
              <span className="text-foreground font-medium">build</span>
            </div>
            <button
              onClick={() => handleReset()}
              className="flex items-center gap-1.5 px-3 py-1 rounded border border-border bg-secondary text-foreground text-xs cursor-pointer hover:bg-muted transition-smooth">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1L7.2 4H11L8.4 6.2L9.5 9.5L6 7.5L2.5 9.5L3.6 6.2L1 4H4.8Z"/></svg>
              New
            </button>
          </header>

          <main className="flex-1 overflow-y-auto pb-20">

          {isThinking ? (
            /* ── THINKING STATE ── */
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "52px 20px", animation: "slide-in 0.4s ease" }}>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 11, color: ACCENT, fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                  {thinkDone ? "BUILD COMPLETE" : "BUILDING"}
                </div>
                <h2 style={{ fontSize: "clamp(1.3rem,3vw,1.8rem)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                  {builtName.length > 50 ? builtName.substring(0, 50) + "..." : builtName}
                </h2>
              </div>

              {/* Thinking animation */}
              <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 22px", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: thinkDone ? ACCENT : ACCENT, animation: thinkDone ? "none" : `thinking-dot 1.4s ease-in-out ${i * 0.22}s infinite`, opacity: thinkDone ? 1 : undefined }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace" }}>
                    {thinkDone ? "all systems operational" : "auren is thinking..."}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {THINKING_STEPS.slice(0, thinkStep + 1).map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, animation: i === thinkStep && !thinkDone ? "slide-in 0.3s ease" : "none" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${i < thinkStep || thinkDone ? ACCENT : BORDER}`, backgroundColor: i < thinkStep || (thinkDone && i === THINKING_STEPS.length - 1) ? `${ACCENT}18` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {(i < thinkStep || thinkDone) && (
                          <svg width="8" height="8" viewBox="0 0 10 10" fill={ACCENT}><path d="M2 5L4 7L8 3"/></svg>
                        )}
                      </div>
                      <span style={{ fontSize: 12, color: i === thinkStep && !thinkDone ? TEXT : i < thinkStep || thinkDone ? MUTED : DIMMED, fontFamily: "'JetBrains Mono',monospace", transition: "color 0.3s" }}>
                        → {step}
                      </span>
                      {i === thinkStep && !thinkDone && (
                        <span style={{ fontSize: 12, color: ACCENT, animation: "blink 1s ease infinite" }}>▋</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {thinkDone && (
                <div style={{ animation: "slide-in 0.5s ease" }}>
                  <div style={{ backgroundColor: `${ACCENT}0a`, border: `1px solid ${ACCENT}30`, borderRadius: 10, padding: "18px 22px", marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
                      <span style={{ fontSize: 12, color: ACCENT, fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>DEPLOYED SUCCESSFULLY</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[
                        { label: "Status", value: "Live · Production" },
                        { label: "Build time", value: "8.4 seconds" },
                        { label: "Tests", value: "18/18 passing" },
                        { label: "Files", value: "24 generated" },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <div style={{ fontSize: 10, color: DIMMED, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: 13, color: TEXT, fontFamily: "'JetBrains Mono',monospace" }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={handleReset} style={{ flex: 1, padding: "11px", borderRadius: 7, border: `1px solid ${BORDER}`, backgroundColor: "rgba(255,255,255,0.04)", color: TEXT, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                      Build Another
                    </button>
                    <button style={{ flex: 1, padding: "11px", borderRadius: 7, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                      Open Project →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── BUILD INPUT STATE ── */
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 0" }}>

              <h1 style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 36, textAlign: "center" }}>
                What will you build<br />today?
              </h1>

              {/* Input box */}
              <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden", marginBottom: 16, boxShadow: "0 4px 32px rgba(0,0,0,0.4)" }}>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleBuild(); }}
                  placeholder="Describe an app, API, or service to create..."
                  rows={4}
                  style={{ width: "100%", backgroundColor: "transparent", padding: "18px 18px 6px", fontSize: 14, color: TEXT, border: "none", fontFamily: "'Inter',system-ui,sans-serif", lineHeight: 1.6 }}
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {[
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>, title: "Template" },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v7a9 3 0 0 0 18 0V5"/><path d="M3 12v4a9 3 0 0 0 18 0v-4"/></svg>, title: "Database" },
                      { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title: "Deploy" },
                    ].map(({ icon, title }) => (
                      <button key={title} title={title} className="icon-btn" style={{ padding: "6px 8px", borderRadius: 6, border: "none", backgroundColor: "transparent", color: MUTED, cursor: "pointer", display: "flex", alignItems: "center", transition: "background 0.15s" }}>
                        {icon}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleBuild}
                    disabled={!input.trim()}
                    style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", borderRadius: 7, border: "none", backgroundColor: input.trim() ? ACCENT : DIMMED, color: input.trim() ? BG : "#666", fontSize: 13, fontWeight: 700, cursor: input.trim() ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.15s", letterSpacing: "0.01em" }}>
                    Launch
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 6H10M7 3L10 6L7 9"/></svg>
                  </button>
                </div>
              </div>

              {/* Prompt pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 40, justifyContent: "center" }}>
                {PROMPTS.map(p => (
                  <button key={p} onClick={() => handlePrompt(p)} className="prompt-pill"
                    style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${BORDER}`, backgroundColor: "transparent", color: MUTED, fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                    {p}
                  </button>
                ))}
              </div>

              {/* Recent projects */}
              <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 32 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Recent Projects</span>
                  <button style={{ fontSize: 11, color: ACCENT, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>View all →</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {RECENT_PROJECTS.map(proj => (
                    <div key={proj.id} className="proj-card" style={{ padding: "14px 16px", borderRadius: 9, border: `1px solid ${BORDER}`, backgroundColor: CARD, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: proj.status === "running" ? ACCENT : DIMMED, flexShrink: 0, boxShadow: proj.status === "running" ? `0 0 6px ${ACCENT}` : "none" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT, fontFamily: "'JetBrains Mono',monospace" }}>{proj.name}</span>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: LANG_COLORS[proj.lang] || DIMMED }} title={proj.lang} />
                        </div>
                        <div style={{ fontSize: 11, color: MUTED, marginBottom: 5 }}>{proj.desc}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {proj.tags.map(t => (
                            <span key={t} style={{ fontSize: 10, color: MUTED, backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, padding: "1px 7px", borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: 10, color: DIMMED, flexShrink: 0, textAlign: "right" }}>
                        {proj.updated}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
          </main>

          <MobileNav active="home" />
        </div>
      </div>
    </ViewTransition>
  );
}
