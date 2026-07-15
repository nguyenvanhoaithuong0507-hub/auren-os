import Navbar from "@/components/Navbar";

const BG = "#0f0f0f";
const CARD = "#161616";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

type ChangeType = "new" | "fix" | "improvement" | "breaking";

const TYPE_META: Record<ChangeType, { label: string; color: string }> = {
  new:         { label: "Mới", color: "#9ECE6A" },
  fix:         { label: "Sửa lỗi", color: "#F7768E" },
  improvement: { label: "Cải thiện", color: "#7AA2F7" },
  breaking:    { label: "Breaking", color: "#E0AF68" },
};

const RELEASES: { version: string; date: string; highlight: string; changes: { type: ChangeType; text: string }[] }[] = [
  {
    version: "v2.1.0",
    date: "12 tháng 5, 2026",
    highlight: "Mascot AuRen + Branding thống nhất",
    changes: [
      { type: "new", text: "Mascot kawaii AuRen thay thế logo tam giác trên toàn bộ nền tảng." },
      { type: "new", text: "Trang Blog, Showcase, About, Docs, Collections và Changelog." },
      { type: "improvement", text: "Footer credit text được cập nhật với thông tin dự án chính xác hơn." },
      { type: "fix", text: "Sửa lỗi `AuRenHubMascot` undefined trên trang login." },
      { type: "fix", text: "Sửa lỗi duplicate style attribute trong dashboard.tsx." },
    ],
  },
  {
    version: "v2.0.0",
    date: "28 tháng 4, 2026",
    highlight: "Marquee testimonials + Scroll-reveal animations",
    changes: [
      { type: "new", text: "Dual-row marquee testimonials trên landing page AuRen Workspace." },
      { type: "new", text: "Scroll-reveal animations với stagger delay cho tất cả section." },
      { type: "new", text: "Ngăn Chrome auto-translate brand names với `translate='no'`." },
      { type: "improvement", text: "4-tab install section: macOS/Linux, Windows Beta, Android, iOS." },
    ],
  },
  {
    version: "v1.8.2",
    date: "14 tháng 4, 2026",
    highlight: "Publisher portal và Drawer navigation",
    changes: [
      { type: "new", text: "Trang Publisher Portal để quản lý skills đã xuất bản." },
      { type: "new", text: "Drawer navigation với user profile và quick links." },
      { type: "improvement", text: "Cải thiện hiệu suất tải trang Skills và Plugins lên 40%." },
      { type: "fix", text: "Sửa lỗi search không phân biệt dấu tiếng Việt." },
    ],
  },
  {
    version: "v1.7.0",
    date: "2 tháng 4, 2026",
    highlight: "OAuth GitHub login",
    changes: [
      { type: "new", text: "Đăng nhập bằng GitHub — không cần tạo tài khoản riêng." },
      { type: "new", text: "Trang Skills Detail với rating, reviews và related skills." },
      { type: "improvement", text: "Dark mode được tối ưu cho OLED display." },
    ],
  },
  {
    version: "v1.5.0",
    date: "15 tháng 3, 2026",
    highlight: "Ra mắt AuRenHub Beta",
    changes: [
      { type: "new", text: "Marketplace Skills với 200+ skills từ cộng đồng." },
      { type: "new", text: "Marketplace Plugins — mở rộng khả năng của AuRen." },
      { type: "new", text: "Danh sách Publishers với profile và rating." },
      { type: "breaking", text: "API v1 bị thay thế bởi API v2. Migration guide ở docs." },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}`}</style>
      <Navbar />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Changelog</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 10px", lineHeight: 1.15 }}>
            Những gì mới nhất trong<br />
            <span style={{ color: ACCENT }}>AuRenHub</span>
          </h1>
          <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
            Nhật ký cập nhật và tính năng mới. Theo dõi để không bỏ lỡ gì.
          </p>
        </div>

        {/* Releases */}
        <div style={{ position: "relative", paddingLeft: 20 }}>
          <div style={{ position: "absolute", left: 7, top: 10, bottom: 10, width: 2, backgroundColor: `${ACCENT}20`, borderRadius: 2 }} />

          {RELEASES.map((r, i) => (
            <div key={r.version} style={{ position: "relative", paddingLeft: 26, marginBottom: i < RELEASES.length - 1 ? 40 : 0 }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: 0, top: 6, width: 14, height: 14, borderRadius: "50%", backgroundColor: i === 0 ? ACCENT : "#1a1b22", border: `2px solid ${i === 0 ? ACCENT : BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {i === 0 && <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: BG }} />}
              </div>

              {/* Version header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: TEXT, letterSpacing: "-0.02em", fontFamily: "'DM Mono',monospace" }}>{r.version}</span>
                {i === 0 && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, background: `${ACCENT}18`, padding: "2px 8px", borderRadius: 4 }}>Latest</span>}
                <span style={{ fontSize: 11, color: DIM2 }}>{r.date}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 14 }}>{r.highlight}</div>

              {/* Changes */}
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
                {r.changes.map((c, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 16px", borderBottom: j < r.changes.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: TYPE_META[c.type].color, background: `${TYPE_META[c.type].color}18`, padding: "2px 7px", borderRadius: 4, flexShrink: 0, marginTop: 1 }}>{TYPE_META[c.type].label}</span>
                    <span style={{ fontSize: 12, color: MUTED, lineHeight: 1.65 }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
