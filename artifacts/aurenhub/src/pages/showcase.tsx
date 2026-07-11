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

const FILTERS = ["Tất cả", "App", "Tool", "Bot", "Workflow", "Plugin"];

const PROJECTS = [
  { id: 1, name: "DevLog AI", desc: "Tự động tổng hợp nhật ký commit thành changelog có thể đọc được bằng tiếng Việt.", author: "@nguyenviet", skill: "git-summarizer", category: "Tool", stars: 342, color: "#7AA2F7", emoji: "changelog" },
  { id: 2, name: "CodeReview Bot", desc: "Bot Telegram nhận PR link và trả về code review chi tiết trong 10 giây.", author: "@tranbao", skill: "code-reviewer", category: "Bot", stars: 289, color: "#9ECE6A", emoji: "portal" },
  { id: 3, name: "SQL Whisperer", desc: "Chuyển câu hỏi tiếng Việt thành SQL query tối ưu, hỗ trợ PostgreSQL và MySQL.", author: "@lehoang", skill: "sql-gen", category: "Tool", stars: 215, color: "#E0AF68", emoji: "database" },
  { id: 4, name: "Notion AI Sync", desc: "Đồng bộ ghi chú Notion với AuRen context — AuRen nhớ mọi thứ bạn đã ghi.", author: "@phamthanh", skill: "notion-bridge", category: "Workflow", stars: 198, color: "#BB9AF7", emoji: "edit" },
  { id: 5, name: "UX Critic", desc: "Upload ảnh màn hình và nhận phân tích UX chuyên nghiệp kèm gợi ý cải thiện.", author: "@dothuy", skill: "vision-analyst", category: "App", stars: 176, color: "#F7768E", emoji: "image" },
  { id: 6, name: "StandupBot", desc: "Gửi standup report tự động lên Slack vào 9h sáng mỗi ngày từ task list của bạn.", author: "@vuonganh", skill: "scheduler + slack", category: "Bot", stars: 154, color: "#9ECE6A", emoji: "cloud" },
  { id: 7, name: "DocWriter", desc: "Tạo README và JSDoc đầy đủ cho toàn bộ codebase chỉ với một lệnh.", author: "@hoangminh", skill: "doc-gen", category: "Tool", stars: 143, color: "#7AA2F7", emoji: "docs" },
  { id: 8, name: "DataDive", desc: "Upload CSV và trò chuyện với dữ liệu bằng tiếng Việt. Xuất chart PNG ngay lập tức.", author: "@ngoctram", skill: "data-analyst", category: "App", stars: 128, color: "#E0AF68", emoji: "chart" },
];

export default function ShowcasePage() {
  const [filter, setFilter] = useState("Tất cả");
  const filtered = filter === "Tất cả" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}.sc-card{transition:border-color 0.15s,transform 0.15s}.sc-card:hover{border-color:rgba(0,207,171,0.25)!important;transform:translateY(-2px)}.filter-btn{transition:all 0.12s;cursor:pointer}`}</style>
      <Navbar />

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Trưng bày cộng đồng</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1.15 }}>
            Được xây dựng bởi<br />
            <span style={{ color: ACCENT }}>cộng đồng AuRen</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 13, lineHeight: 1.6 }}>
            Những dự án thực sự từ người dùng AuRen trên toàn thế giới.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
          {FILTERS.map(f => (
            <button key={f} className="filter-btn" onClick={() => setFilter(f)}
              style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === f ? ACCENT : BORDER}`, backgroundColor: filter === f ? `${ACCENT}18` : "transparent", color: filter === f ? ACCENT : MUTED, fontSize: 12, fontWeight: filter === f ? 700 : 400 }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {filtered.map(p => (
            <div key={p.id} className="sc-card"
              style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 20, cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: `${p.color}18`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                  <AppIcon name={p.emoji} color={p.color} size={22} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: DIM2 }}>
                  <span style={{ fontSize: 13 }}>⭐</span> {p.stars}
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: TEXT, marginBottom: 6, letterSpacing: "-0.01em" }}>{p.name}</div>
              <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, color: DIM2 }}>{p.author}</span>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: p.color, background: `${p.color}15`, padding: "2px 7px", borderRadius: 4 }}>{p.skill}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: DIM2 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <p>Không có dự án nào trong danh mục này.</p>
          </div>
        )}

        {/* Submit CTA */}
        <div style={{ marginTop: 48, padding: 24, background: `${ACCENT}08`, border: `1px solid ${ACCENT}25`, borderRadius: 14, textAlign: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: TEXT, marginBottom: 8 }}>Bạn đã xây dựng điều gì đó với AuRen?</div>
          <p style={{ fontSize: 12, color: MUTED, marginBottom: 16, lineHeight: 1.6 }}>Chia sẻ dự án của bạn với cộng đồng. Đăng ký miễn phí.</p>
          <button style={{ padding: "10px 22px", borderRadius: 8, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            Gửi dự án của bạn →
          </button>
        </div>
      </main>
    </div>
  );
}
