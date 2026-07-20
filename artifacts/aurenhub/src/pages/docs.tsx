import { useState } from "react";
import Navbar from "@/components/Navbar";

const BG = "#0f0f0f";
const CARD = "#161616";
const CARD2 = "#111117";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

const SECTIONS = [
  { id: "quickstart", label: "Bắt đầu nhanh" },
  { id: "skill-api", label: "Skill API" },
  { id: "plugin-api", label: "Plugin API" },
  { id: "auth", label: "Xác thực" },
  { id: "publish", label: "Xuất bản" },
  { id: "sdk", label: "SDK Reference" },
];

const CODE_SKILL = `import { defineSkill } from "@aurenhub/sdk";

export default defineSkill({
  name: "my-skill",
  version: "1.0.0",
  description: "Skill của tôi",

  async run({ prompt, context }) {
    const result = await context.llm({
      system: "Bạn là trợ lý hữu ích.",
      user: prompt,
    });
    return result.text;
  },
});`;

const CODE_PUBLISH = `# Đăng nhập AuRenHub
auren hub login

# Build & validate
auren hub build

# Xuất bản
auren hub publish --name "my-skill" --version 1.0.0`;

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("quickstart");
  const [copied, setCopied] = useState(false);

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT, display: "flex", flexDirection: "column" }}>
      <style>{`*{box-sizing:border-box}code{font-family:'DM Mono','Fira Mono',monospace}.doc-link{transition:all 0.12s;cursor:pointer}.doc-link:hover{color:#f4f4f4!important;background:rgba(255,255,255,0.04)!important}`}</style>
      <Navbar />

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ width: 200, flexShrink: 0, borderRight: `1px solid ${BORDER}`, padding: "28px 0", position: "sticky", top: 52, height: "calc(100dvh - 52px)", overflowY: "auto" }}>
          <div style={{ padding: "0 16px 16px", fontSize: 10, letterSpacing: "0.12em", color: DIM2, fontWeight: 700, textTransform: "uppercase" }}>Tài liệu</div>
          {SECTIONS.map(s => (
            <button key={s.id} className="doc-link" onClick={() => setActiveSection(s.id)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 16px", border: "none", background: activeSection === s.id ? `${ACCENT}12` : "transparent", color: activeSection === s.id ? ACCENT : MUTED, fontSize: 12, borderLeft: activeSection === s.id ? `2px solid ${ACCENT}` : "2px solid transparent" }}>
              {s.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "36px 28px 80px", maxWidth: 680 }}>
          {activeSection === "quickstart" && (
            <>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 8 }}>Bắt đầu nhanh</h1>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.8, marginBottom: 28 }}>
                Tạo và xuất bản skill đầu tiên của bạn trong dưới 10 phút.
              </p>

              <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: ACCENT, color: BG, fontSize: 11, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>1</span>
                Cài đặt CLI
              </h2>
              <div style={{ background: "#0d0e17", borderRadius: 10, border: `1px solid ${BORDER}`, padding: "14px 18px", marginBottom: 24, position: "relative" }}>
                <code style={{ color: "#9ECE6A", fontSize: 13 }}>npm install -g @aurenhub/cli</code>
                <button onClick={() => copy("npm install -g @aurenhub/cli")}
                  style={{ position: "absolute", right: 12, top: 12, background: "rgba(255,255,255,0.06)", border: `1px solid ${BORDER}`, borderRadius: 6, color: copied ? ACCENT : MUTED, fontSize: 10, padding: "4px 8px", cursor: "pointer" }}>
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: ACCENT, color: BG, fontSize: 11, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>2</span>
                Tạo skill đầu tiên
              </h2>
              <div style={{ background: "#0d0e17", borderRadius: 10, border: `1px solid ${BORDER}`, padding: "16px 18px", marginBottom: 24, overflowX: "auto" }}>
                <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.75, color: "#C0CAF5" }}>{CODE_SKILL}</pre>
              </div>

              <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: ACCENT, color: BG, fontSize: 11, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>3</span>
                Xuất bản
              </h2>
              <div style={{ background: "#0d0e17", borderRadius: 10, border: `1px solid ${BORDER}`, padding: "16px 18px", marginBottom: 32, overflowX: "auto" }}>
                <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.75, color: "#9ECE6A" }}>{CODE_PUBLISH}</pre>
              </div>

              <div style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}20`, borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginBottom: 6 }}>💡 Mẹo</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.7 }}>
                  Dùng <code style={{ color: ACCENT, background: `${ACCENT}15`, padding: "1px 5px", borderRadius: 3 }}>auren hub dev</code> để xem skill của bạn trong trình duyệt trước khi xuất bản.
                </div>
              </div>
            </>
          )}

          {activeSection !== "quickstart" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🚧</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 8 }}>{SECTIONS.find(s => s.id === activeSection)?.label}</div>
              <p style={{ fontSize: 12, color: MUTED, maxWidth: 260, lineHeight: 1.7 }}>
                Phần này đang được biên soạn. Theo dõi changelog để nhận thông báo.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
