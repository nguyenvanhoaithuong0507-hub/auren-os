import Navbar from "@/components/Navbar";

const BG = "#0f0f0f";
const CARD = "#161616";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

const POSTS = [
  {
    slug: "auren-os-vision",
    tag: "Vision",
    tagColor: "#7AA2F7",
    date: "May 2026",
    title: "AuRen OS: Một AI cá nhân với linh hồn",
    excerpt: "Tại sao chúng tôi xây dựng AuRen không phải là một chatbot khác — mà là một hệ điều hành AI với tính cách, bộ nhớ, và khả năng tự tiến hóa.",
    readMin: 6,
    author: { name: "AuRen Team", avatar: "🤖" },
  },
  {
    slug: "skill-sdk-v2",
    tag: "Engineering",
    tagColor: "#9ECE6A",
    date: "Apr 2026",
    title: "Skill SDK v2: Viết kỹ năng nhanh hơn 3×",
    excerpt: "Chúng tôi đã viết lại toàn bộ runtime cho skills — streaming, tool-calling, và hot-reload trong một pipeline nhỏ hơn 12KB.",
    readMin: 8,
    author: { name: "Core Team", avatar: "⚙️" },
  },
  {
    slug: "community-milestone-1k",
    tag: "Community",
    tagColor: "#E0AF68",
    date: "Apr 2026",
    title: "1.000 kỹ năng đầu tiên trên AuRenHub",
    excerpt: "Một cột mốc quan trọng: cộng đồng đã xuất bản hơn 1.000 skills chỉ trong 6 tuần đầu. Những điều chúng tôi học được.",
    readMin: 4,
    author: { name: "AuRen Community", avatar: "🌏" },
  },
  {
    slug: "self-healing-deep-dive",
    tag: "Research",
    tagColor: "#BB9AF7",
    date: "Mar 2026",
    title: "Vòng lặp tự chữa lỗi: Làm thế nào AuRen debug chính nó",
    excerpt: "Phân tích kỹ thuật về cơ chế self-healing loop trong OpenClaw — từ lỗi runtime đến bản vá tự động trong dưới 3 giây.",
    readMin: 12,
    author: { name: "Research Lab", avatar: "🔬" },
  },
  {
    slug: "plugin-architecture",
    tag: "Engineering",
    tagColor: "#9ECE6A",
    date: "Mar 2026",
    title: "Kiến trúc Plugin: Sandbox an toàn cho code bên thứ ba",
    excerpt: "Plugins trên AuRenHub chạy trong một sandbox WebAssembly với quyền hạn tối thiểu. Đây là cách hoạt động.",
    readMin: 9,
    author: { name: "Core Team", avatar: "⚙️" },
  },
  {
    slug: "aurenhub-launch",
    tag: "Announcement",
    tagColor: "#F7768E",
    date: "Feb 2026",
    title: "Ra mắt AuRenHub: Marketplace cho trí tuệ cộng đồng",
    excerpt: "Từ hôm nay bất kỳ ai cũng có thể xuất bản kỹ năng AI của mình và chia sẻ với toàn bộ cộng đồng AuRen.",
    readMin: 3,
    author: { name: "AuRen Team", avatar: "🤖" },
  },
];

export default function BlogPage() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}.post-card{transition:border-color 0.15s,background 0.15s}.post-card:hover{border-color:rgba(0,207,171,0.22)!important;background:#111117!important}`}</style>
      <Navbar />

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>AuRenHub Blog</div>
          <h1 style={{ fontSize: "1.9rem", fontWeight: 900, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.15 }}>
            Suy nghĩ, kỹ thuật<br />
            <span style={{ color: ACCENT }}>& cộng đồng</span>
          </h1>
          <p style={{ color: MUTED, fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>
            Bài viết từ đội ngũ AuRen về AI, kỹ năng, và tương lai của lập trình.
          </p>
        </div>

        {/* Featured */}
        <div className="post-card" onClick={() => {}}
          style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 24, marginBottom: 24, cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: POSTS[0].tagColor, background: `${POSTS[0].tagColor}18`, padding: "3px 8px", borderRadius: 4 }}>{POSTS[0].tag}</span>
            <span style={{ fontSize: 10, color: DIM2 }}>{POSTS[0].date} · {POSTS[0].readMin} phút đọc</span>
          </div>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.02em", color: TEXT, margin: "0 0 10px" }}>{POSTS[0].title}</h2>
          <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: "0 0 16px" }}>{POSTS[0].excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>{POSTS[0].author.avatar}</span>
            <span style={{ fontSize: 11, color: DIM2 }}>{POSTS[0].author.name}</span>
          </div>
        </div>

        {/* Rest */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {POSTS.slice(1).map(p => (
            <div key={p.slug} className="post-card" onClick={() => {}}
              style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 20px", cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.tagColor, background: `${p.tagColor}18`, padding: "2px 7px", borderRadius: 4 }}>{p.tag}</span>
                  <span style={{ fontSize: 10, color: DIM2 }}>{p.date} · {p.readMin} phút</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, letterSpacing: "-0.01em", marginBottom: 4 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{p.excerpt}</div>
              </div>
              <span style={{ fontSize: 20, marginTop: 2, flexShrink: 0 }}>{p.author.avatar}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
