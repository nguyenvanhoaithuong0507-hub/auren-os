import { useState } from "react";
import Navbar from "@/components/Navbar";
import { AppIcon } from "@/components/AppIcon";

const BG = "#0f0f0f";
const CARD = "#161616";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

const COLLECTIONS = [
  {
    id: "devops-starter",
    emoji: "rocket",
    color: "#7AA2F7",
    name: "DevOps Starter Pack",
    curator: "AuRen Team",
    verified: true,
    desc: "Tất cả skills cần thiết để triển khai, monitor và tự động hóa hạ tầng từ terminal.",
    skills: ["docker-gen", "ci-helper", "log-analyzer", "alert-builder"],
    count: 8,
    installs: 2840,
  },
  {
    id: "viet-dev",
    emoji: "globe",
    color: "#F7768E",
    name: "Bộ công cụ lập trình Việt",
    curator: "@nguyenviet",
    verified: false,
    desc: "Skills được tối ưu cho lập trình viên Việt Nam — giao tiếp tiếng Việt, tài liệu tiếng Việt.",
    skills: ["viet-doc-gen", "viet-reviewer", "viet-naming"],
    count: 5,
    installs: 1920,
  },
  {
    id: "fullstack-next",
    emoji: "skills",
    color: "#9ECE6A",
    name: "Full-Stack Next.js Kit",
    curator: "AuRen Team",
    verified: true,
    desc: "Từ thiết kế DB đến deploy: skills cho toàn bộ quy trình xây dựng app Next.js hiện đại.",
    skills: ["schema-gen", "api-builder", "auth-helper", "deploy-vercel"],
    count: 11,
    installs: 3410,
  },
  {
    id: "ai-research",
    emoji: "tool",
    color: "#BB9AF7",
    name: "AI Research Toolkit",
    curator: "@research-lab",
    verified: false,
    desc: "Skills để đọc paper, tóm tắt, so sánh và trích xuất insight từ tài liệu khoa học.",
    skills: ["paper-summarizer", "citation-builder", "insight-extractor"],
    count: 6,
    installs: 1250,
  },
  {
    id: "content-creator",
    emoji: "edit",
    color: "#E0AF68",
    name: "Content Creator Bundle",
    curator: "@dothuy",
    verified: false,
    desc: "Viết blog, thread Twitter, script video và tối ưu SEO — tất cả bằng giọng văn của bạn.",
    skills: ["blog-writer", "thread-gen", "seo-optimizer", "tone-matcher"],
    count: 7,
    installs: 1640,
  },
  {
    id: "data-science",
    emoji: "chart",
    color: "#E0AF68",
    name: "Data Science Essentials",
    curator: "AuRen Team",
    verified: true,
    desc: "Phân tích dữ liệu, vẽ biểu đồ, và xây dựng pipeline ML trong terminal.",
    skills: ["data-analyst", "chart-builder", "ml-pipeline"],
    count: 9,
    installs: 2100,
  },
];

export default function CollectionsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}.col-card{transition:border-color 0.15s,background 0.15s}.col-card:hover{border-color:rgba(0,207,171,0.22)!important;background:#111117!important}`}</style>
      <Navbar />

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.14em", color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Tích lũy</div>
            <h1 style={{ fontSize: "1.9rem", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 8px", lineHeight: 1.15 }}>
              Bộ sưu tập <span style={{ color: ACCENT }}>được tuyển chọn</span>
            </h1>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
              Nhóm skills được tổ chức theo mục đích sử dụng — cài một lần, dùng cả bộ.
            </p>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {(["grid", "list"] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${view === v ? ACCENT : BORDER}`, backgroundColor: view === v ? `${ACCENT}18` : "transparent", color: view === v ? ACCENT : MUTED, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {v === "grid" ? "⊞" : "☰"}
              </button>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div style={view === "grid" ? { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 } : { display: "flex", flexDirection: "column", gap: 10 }}>
          {COLLECTIONS.map(c => (
            <div key={c.id} className="col-card"
              style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: view === "grid" ? 22 : "16px 20px", cursor: "pointer", ...(view === "list" ? { display: "flex", alignItems: "center", gap: 16 } : {}) }}>
              {view === "grid" ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: `${c.color}18`, border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}><AppIcon name={c.emoji} color={c.color} size={22} /></div>
                    {c.verified && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, background: `${ACCENT}18`, padding: "2px 8px", borderRadius: 4 }}>✓ Chính thức</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: TEXT, marginBottom: 6, letterSpacing: "-0.01em" }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>{c.desc}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 14 }}>
                    {c.skills.map(s => <span key={s} style={{ fontSize: 9, color: DIM2, background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, padding: "2px 7px", borderRadius: 4, fontFamily: "monospace" }}>{s}</span>)}
                    {c.count > c.skills.length && <span style={{ fontSize: 9, color: DIM2, padding: "2px 7px" }}>+{c.count - c.skills.length}</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 10, color: DIM2 }}>{c.curator}</span>
                    <span style={{ fontSize: 10, color: MUTED }}>↓ {c.installs.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${c.color}18`, border: `1px solid ${c.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}><AppIcon name={c.emoji} color={c.color} size={22} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.desc}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 11, color: MUTED }}>{c.count} skills</div>
                    <div style={{ fontSize: 10, color: DIM2 }}>↓ {c.installs.toLocaleString()}</div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
