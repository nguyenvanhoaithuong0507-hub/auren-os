import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";

const BG = "#0f0f0f";
const CARD = "#161616";
const CARD2 = "#262626";
const BORDER = "rgba(255,255,255,0.06)";
const BORDER2 = "rgba(255,255,255,0.10)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM = "#6f6f6f";

const APPS = [
  {
    id: "workspace",
    name: "AuRen Workspace",
    tagline: "AI agent development environment",
    desc: "Xây dựng và triển khai AI agents. Code editor thông minh, debug loop, tích hợp GitHub và các công cụ phát triển đầy đủ.",
    path: "/workspace/",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: "#0f62fe",
    badge: "MAIN",
    badgeColor: "#0f62fe",
    stats: [{ label: "Tools", val: "50+" }, { label: "Libraries", val: "50+" }, { label: "Extensions", val: "30+" }],
  },
  {
    id: "aurenhub",
    name: "AuRenHub",
    tagline: "Community skills & plugins marketplace",
    desc: "Khám phá và cài đặt skills, plugins từ cộng đồng. Hơn 16 skills và 12 plugins được xây dựng bởi các developers.",
    path: "/aurenhub/",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.1 11.9 1 10.5 1S8 2.1 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7S4.99 16.2 3.5 16.2H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.4 0 2.5-1.1 2.5-2.5S21.9 11 20.5 11z"/>
      </svg>
    ),
    color: "#818cf8",
    badge: "HUB",
    badgeColor: "#818cf8",
    stats: [{ label: "Skills", val: "16" }, { label: "Plugins", val: "12" }, { label: "Publishers", val: "8" }],
  },
  {
    id: "dashboard",
    name: "AI Platform Dashboard",
    tagline: "Analytics & insights for AI platforms",
    desc: "Bảng điều khiển phân tích toàn diện cho các nền tảng AI 2024–2026. Dữ liệu thị trường, xu hướng và so sánh.",
    path: "/",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    color: "#f59e0b",
    badge: "DATA",
    badgeColor: "#f59e0b",
    stats: [{ label: "Platforms", val: "20+" }, { label: "Metrics", val: "50+" }, { label: "Charts", val: "15+" }],
  },
  {
    id: "slides",
    name: "AI Platforms Slides",
    tagline: "2024–2026 AI landscape presentation",
    desc: "Bộ slides chuyên nghiệp về hệ sinh thái AI development platforms từ 2024 đến 2026. Phân tích xu hướng và dự đoán.",
    path: "/slides/",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    color: "#ec4899",
    badge: "SLIDES",
    badgeColor: "#ec4899",
    stats: [{ label: "Slides", val: "20+" }, { label: "Charts", val: "8+" }, { label: "Insights", val: "30+" }],
  },
  {
    id: "simulator",
    name: "Debug Loop Simulator",
    tagline: "AI self-healing debug loop visualization",
    desc: "Mô phỏng vòng lặp debug AI tự chữa lành. Visualize quá trình detect → patch → verify trong thời gian thực.",
    path: "/simulator/",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    color: "#ef4444",
    badge: "SIM",
    badgeColor: "#ef4444",
    stats: [{ label: "Phases", val: "3" }, { label: "Steps", val: "12" }, { label: "Real-time", val: "✓" }],
  },
];

export default function PortalPage() {
  const [, navigate] = useLocation();

  function go(path: string) {
    if (path.startsWith("/aurenhub")) {
      navigate(path.replace("/aurenhub", "") || "/");
    } else {
      window.location.href = path;
    }
  }

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`
        *{box-sizing:border-box}
        .app-card:hover{border-color:rgba(255,255,255,0.14)!important;transform:translateY(-4px);background:#262626!important}
        .app-card{transition:all 0.2s ease}
        .app-btn:hover{opacity:0.85}
        .app-btn{transition:opacity 0.15s}
      `}</style>

      <Navbar />

      <main style={{ padding: "32px 20px 80px", maxWidth: 760, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 20, border: `1px solid ${ACCENT}30`, backgroundColor: `${ACCENT}0a`, marginBottom: 16 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: ACCENT, display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 11, color: ACCENT, fontWeight: 600, letterSpacing: "0.08em" }}>AuRen OS • Platform Portal</span>
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
          <h1 style={{ fontSize: "clamp(1.8rem,7vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 12, color: "#fff" }}>
            Tất cả ứng dụng<br /><span style={{ color: ACCENT }}>AuRen OS</span>
          </h1>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
            Hệ sinh thái phát triển AI hoàn chỉnh. Chọn ứng dụng để bắt đầu.
          </p>
        </div>

        {/* Main app card — Workspace */}
        <div className="app-card" onClick={() => go(APPS[0].path)}
          style={{ backgroundColor: CARD, border: `1px solid ${BORDER2}`, borderRadius: 18, padding: "22px 20px", marginBottom: 14, cursor: "pointer", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: "100%", background: `radial-gradient(ellipse at top right, ${APPS[0].color}12 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: `${APPS[0].color}18`, border: `1px solid ${APPS[0].color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: APPS[0].color, flexShrink: 0 }}>
              {APPS[0].icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{APPS[0].name}</span>
                <span style={{ fontSize: 9, fontWeight: 800, backgroundColor: `${APPS[0].color}20`, color: APPS[0].color, borderRadius: 4, padding: "2px 7px" }}>{APPS[0].badge}</span>
              </div>
              <p style={{ fontSize: 12, color: MUTED, marginBottom: 14, lineHeight: 1.6 }}>{APPS[0].desc}</p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {APPS[0].stats.map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: APPS[0].color }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: DIM }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <span style={{ fontSize: 18, color: ACCENT, flexShrink: 0, marginTop: 4 }}>→</span>
          </div>
        </div>

        {/* Grid for other apps */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {APPS.slice(1).map(app => (
            <div key={app.id} className="app-card" onClick={() => go(app.path)}
              style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "18px 16px", cursor: "pointer", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: "100%", background: `radial-gradient(ellipse at top right, ${app.color}10 0%, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ width: 44, height: 44, borderRadius: 11, backgroundColor: `${app.color}16`, border: `1px solid ${app.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: app.color, marginBottom: 12 }}>
                {app.icon}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{app.name}</span>
              </div>
              <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.55, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{app.desc}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {app.stats.map(s => (
                  <div key={s.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: app.color }}>{s.val}</div>
                    <div style={{ fontSize: 9, color: DIM }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", bottom: 14, right: 14, fontSize: 12, color: app.color }}>→</div>
            </div>
          ))}
        </div>

        {/* API Server info */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: "rgba(100,200,100,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m8 17 4-4 4 4"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>API Server</span>
              <span style={{ fontSize: 9, backgroundColor: "rgba(74,222,128,0.15)", color: "#4ade80", borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>RUNNING</span>
            </div>
            <p style={{ fontSize: 11, color: MUTED }}>Express 5 + Drizzle ORM · <span style={{ color: DIM }}>localhost:5000/api/healthz</span></p>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#4ade80", animation: "pulse 2s infinite", flexShrink: 0 }} />
        </div>

        {/* GitHub CTA */}
        <div style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}20`, borderRadius: 16, padding: "22px 20px", textAlign: "center" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill={TEXT} style={{ marginBottom: 10 }}>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
          </svg>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: TEXT, marginBottom: 6 }}>Mã nguồn mở trên GitHub</h3>
          <p style={{ fontSize: 12, color: MUTED, marginBottom: 16, lineHeight: 1.6 }}>
            Toàn bộ source code của AuRen OS. Đóng góp, fork, và xây dựng kỹ năng của riêng bạn.
          </p>
          <button onClick={() => window.open("https://github.com", "_blank")}
            style={{ padding: "10px 24px", borderRadius: 9, border: `1px solid ${ACCENT}40`, backgroundColor: "transparent", color: ACCENT, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Xem trên GitHub →
          </button>
        </div>
      </main>
    </div>
  );
}
