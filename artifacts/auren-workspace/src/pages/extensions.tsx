import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const BG = "#090a10";
const CARD = "#111521";
const BORDER = "#1a1f2e";
const ACCENT = "#00cfab";
const TEXT = "#dce2f0";
const MUTED = "#8892a4";
const DIMMED = "#3a4155";

const EXTENSION_CATEGORIES = [
  "Tất cả", "AI & LLM", "Ngôn ngữ", "Gỡ lỗi", "Định dạng", "Git", "Giao diện", "Cơ sở dữ liệu", "Kiểm tra", "Triển khai",
];

const EXTENSIONS = [
  { id: 1, name: "AuRen Copilot", publisher: "AuRen AI", desc: "Gợi ý code AI thông minh với context toàn dự án, tự động hoàn thiện và giải thích code.", category: "AI & LLM", installs: "2.4M", rating: 4.9, icon: "🤖", color: ACCENT, featured: true, enabled: true },
  { id: 2, name: "GitHub Copilot", publisher: "GitHub", desc: "AI pair programmer để gợi ý toàn bộ dòng code hoặc toàn bộ hàm trong các trình soạn thảo.", category: "AI & LLM", installs: "18M", rating: 4.8, icon: "⌀", color: "#fff", featured: false, enabled: false },
  { id: 3, name: "Prettier", publisher: "Prettier", desc: "Định dạng code theo phong cách nhất quán với hỗ trợ nhiều ngôn ngữ.", category: "Định dạng", installs: "45M", rating: 4.9, icon: "✨", color: "#f7a8c4", featured: false, enabled: true },
  { id: 4, name: "ESLint", publisher: "Microsoft", desc: "Kiểm tra và sửa lỗi JavaScript/TypeScript, phát hiện vấn đề sớm trong quá trình phát triển.", category: "Ngôn ngữ", installs: "38M", rating: 4.7, icon: "🔍", color: "#4b32c3", featured: false, enabled: true },
  { id: 5, name: "GitLens", publisher: "GitKraken", desc: "Siêu sức mạnh Git ngay trong VS Code — lịch sử file, blame, so sánh nhánh và nhiều hơn nữa.", category: "Git", installs: "22M", rating: 4.8, icon: "🔮", color: "#e9f04b", featured: false, enabled: false },
  { id: 6, name: "Tailwind CSS IntelliSense", publisher: "Tailwind Labs", desc: "Tự động hoàn thiện class Tailwind, gợi ý hover, cú pháp highlight và phát hiện lỗi linting.", category: "Giao diện", installs: "9M", rating: 4.9, icon: "💨", color: "#06b6d4", featured: false, enabled: true },
  { id: 7, name: "Prisma", publisher: "Prisma", desc: "Hỗ trợ cú pháp Prisma schema, tự động hoàn thiện, jump-to-definition và preview trực tiếp.", category: "Cơ sở dữ liệu", installs: "4.2M", rating: 4.8, icon: "▲", color: "#5a67d8", featured: false, enabled: false },
  { id: 8, name: "Docker", publisher: "Microsoft", desc: "Đơn giản hóa việc xây dựng, quản lý và triển khai ứng dụng containerized.", category: "Triển khai", installs: "14M", rating: 4.6, icon: "🐳", color: "#2496ed", featured: false, enabled: true },
  { id: 9, name: "Error Lens", publisher: "usernamehw", desc: "Cải thiện đánh dấu lỗi bằng cách hiển thị lỗi/cảnh báo/info trực tiếp trên dòng code.", category: "Gỡ lỗi", installs: "11M", rating: 4.8, icon: "🚨", color: "#f87171", featured: false, enabled: true },
  { id: 10, name: "Vitest", publisher: "zxch3n", desc: "Giao diện kiểm tra Vitest với trực quan hóa coverage, chạy test inline và watchmode.", category: "Kiểm tra", installs: "1.8M", rating: 4.7, icon: "⚡", color: "#729b1b", featured: false, enabled: false },
  { id: 11, name: "REST Client", publisher: "Huachao Mao", desc: "Gửi HTTP request và xem phản hồi trực tiếp trong VS Code, hỗ trợ file .http và .rest.", category: "Gỡ lỗi", installs: "12M", rating: 4.7, icon: "🌐", color: "#60a5fa", featured: false, enabled: false },
  { id: 12, name: "Auto Rename Tag", publisher: "Jun Han", desc: "Tự động đổi tên thẻ HTML/XML được ghép đôi khi bạn đổi tên thẻ mở hoặc đóng.", category: "Ngôn ngữ", installs: "17M", rating: 4.5, icon: "🏷️", color: "#a78bfa", featured: false, enabled: true },
  { id: 13, name: "Import Cost", publisher: "Wix", desc: "Hiển thị kích thước inline của package được import/require trong trình soạn thảo.", category: "Ngôn ngữ", installs: "5.7M", rating: 4.6, icon: "📦", color: "#fbbf24", featured: false, enabled: false },
  { id: 14, name: "Codeium", publisher: "Codeium", desc: "Trợ lý code AI miễn phí với tốc độ hoàn thiện siêu nhanh, hỗ trợ 70+ ngôn ngữ.", category: "AI & LLM", installs: "6.1M", rating: 4.6, icon: "💡", color: "#06d6a0", featured: false, enabled: false },
  { id: 15, name: "Thunder Client", publisher: "Ranga Vadhineni", desc: "Client REST API nhẹ cho VS Code với GUI đẹp, hỗ trợ GraphQL và bộ sưu tập.", category: "Kiểm tra", installs: "8.4M", rating: 4.8, icon: "⚡", color: "#818cf8", featured: false, enabled: true },
];

export default function ExtensionsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [enabled, setEnabled] = useState<Record<number, boolean>>(
    Object.fromEntries(EXTENSIONS.map(e => [e.id, e.enabled]))
  );
  const [installing, setInstalling] = useState<number | null>(null);
  const [installed, setInstalled] = useState<Set<number>>(new Set(EXTENSIONS.filter(e => e.enabled).map(e => e.id)));

  function toggle(id: number) {
    setEnabled(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function handleInstall(id: number) {
    if (installed.has(id)) return;
    setInstalling(id);
    setTimeout(() => {
      setInstalling(null);
      setInstalled(prev => new Set([...prev, id]));
      setEnabled(prev => ({ ...prev, [id]: true }));
    }, 1500);
  }

  const filtered = EXTENSIONS.filter(ext => {
    const matchSearch = ext.name.toLowerCase().includes(search.toLowerCase()) || ext.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Tất cả" || ext.category === activeCategory;
    return matchSearch && matchCat;
  });

  const enabledCount = Object.values(enabled).filter(Boolean).length;

  return (
    <ViewTransition default="none" enter="fade-in">
    <div style={{ display: "flex", minHeight: "100dvh", backgroundColor: BG, color: TEXT, fontFamily: "'Inter',system-ui,sans-serif", overflowX: "hidden" }}>
      <style>{`
        *{box-sizing:border-box}
        .ext-card:hover{border-color:rgba(0,207,171,0.2)!important}
        .ext-card{transition:all 0.15s}
        input{outline:none}
        input::placeholder{color:${DIMMED}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .toggle-track{transition:background 0.2s}
        .toggle-thumb{transition:left 0.2s}
        @media(max-width:767px){.desktop-sidebar{display:none!important}}
      `}</style>

      <Sidebar active="extensions" />

      <div style={{ flex: 1, display: "flex", minWidth: 0 }}>
        {/* Left panel — categories */}
        <div style={{ width: 200, borderRight: `1px solid ${BORDER}`, flexShrink: 0, overflowY: "auto", padding: "16px 0", display: "flex", flexDirection: "column", gap: 2 }} className="ext-sidebar">
          <div style={{ padding: "0 14px", marginBottom: 10 }}>
            <div style={{ position: "relative" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={DIMMED} strokeWidth="2" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm tiện ích..."
                style={{ width: "100%", padding: "8px 10px 8px 30px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 7, color: TEXT, fontSize: 12, fontFamily: "inherit" }} />
            </div>
          </div>
          {EXTENSION_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: "7px 16px", border: "none", backgroundColor: activeCategory === cat ? `${ACCENT}14` : "transparent", color: activeCategory === cat ? ACCENT : MUTED, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textAlign: "left", borderLeft: activeCategory === cat ? `2px solid ${ACCENT}` : "2px solid transparent", transition: "all 0.15s" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <header style={{ padding: "0 24px", height: 48, borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, backgroundColor: "rgba(9,10,16,0.9)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: MUTED, fontSize: 13 }}>workspace</span>
              <span style={{ color: DIMMED, fontSize: 13 }}>/</span>
              <span style={{ color: TEXT, fontWeight: 500, fontSize: 13 }}>extensions</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, color: MUTED, fontFamily: "'JetBrains Mono',monospace" }}>{enabledCount} đã bật · {installed.size} đã cài</span>
            </div>
          </header>

          <main style={{ flex: 1, overflowY: "auto", padding: "20px 20px 90px" }}>
            {/* Featured */}
            {activeCategory === "Tất cả" && !search && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontWeight: 600 }}>Được đề xuất</div>
                {EXTENSIONS.filter(e => e.featured).map(ext => (
                  <div key={ext.id} className="ext-card" style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}30`, borderRadius: 10, padding: "16px 18px", marginBottom: 10, display: "flex", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 9, backgroundColor: `${ext.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{ext.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{ext.name}</span>
                        <span style={{ fontSize: 9, backgroundColor: ACCENT, color: BG, borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>FEATURED</span>
                      </div>
                      <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.55, marginBottom: 10 }}>{ext.desc}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 10, color: DIMMED }}>{ext.publisher}</span>
                        <span style={{ fontSize: 10, color: DIMMED }}>↓ {ext.installs}</span>
                        <span style={{ fontSize: 10, color: "#fbbf24" }}>★ {ext.rating}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      {/* Toggle */}
                      <Toggle checked={enabled[ext.id]} onChange={() => toggle(ext.id)} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Extensions list */}
            <div style={{ fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontWeight: 600 }}>
              {activeCategory === "Tất cả" ? "Tất cả tiện ích" : activeCategory} ({filtered.filter(e => !e.featured || search || activeCategory !== "Tất cả").length})
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filtered.filter(e => !e.featured || search || activeCategory !== "Tất cả").map(ext => {
                const isInstalled = installed.has(ext.id);
                const isInstalling = installing === ext.id;
                return (
                  <div key={ext.id} className="ext-card" style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 9, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: `${ext.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{ext.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{ext.name}</span>
                        <span style={{ fontSize: 9, color: MUTED, backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, padding: "1px 6px", borderRadius: 4 }}>{ext.category}</span>
                      </div>
                      <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.5, marginBottom: 5, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{ext.desc}</p>
                      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, color: DIMMED }}>{ext.publisher}</span>
                        <span style={{ fontSize: 10, color: DIMMED }}>↓ {ext.installs}</span>
                        <span style={{ fontSize: 10, color: "#fbbf24" }}>★ {ext.rating}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      {isInstalled ? (
                        <Toggle checked={!!enabled[ext.id]} onChange={() => toggle(ext.id)} />
                      ) : (
                        <button onClick={() => handleInstall(ext.id)} disabled={isInstalling}
                          style={{ padding: "6px 12px", borderRadius: 6, border: `1px solid ${isInstalling ? DIMMED : BORDER}`, backgroundColor: "transparent", color: isInstalling ? DIMMED : ACCENT, fontSize: 11, cursor: isInstalling ? "wait" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                          {isInstalling ? (
                            <div style={{ width: 10, height: 10, border: `1.5px solid ${DIMMED}`, borderTopColor: ACCENT, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                          ) : null}
                          {isInstalling ? "Đang cài..." : "Cài đặt"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      <MobileNav active="extensions" />
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} style={{ width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer", padding: 0, position: "relative", backgroundColor: checked ? ACCENT : "#2a2f3d", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#fff", position: "absolute", top: 3, left: checked ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.4)" }} />
    </button>
  );
}
