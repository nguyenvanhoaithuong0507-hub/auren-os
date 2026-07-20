import Navbar from "@/components/Navbar";
import { AppIcon } from "@/components/AppIcon";
import { AuRenMascot } from "@/components/AuRenMascot";

const BG = "#0f0f0f";
const CARD = "#161616";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

const VALUES = [
  { icon: "portal", title: "AI với linh hồn", desc: "AuRen không phải chatbot. Đây là một AI có tính cách, bộ nhớ, và khả năng phát triển theo thời gian cùng bạn." },
  { icon: "globe", title: "Cộng đồng trước tiên", desc: "AuRenHub được xây dựng để mọi người đều có thể đóng góp — từ developer chuyên nghiệp đến người mới bắt đầu." },
  { icon: "shield", title: "Minh bạch & Mở", desc: "Core của AuRen là open-source. Chúng tôi tin vào việc xây dựng trong công khai và lắng nghe cộng đồng." },
  { icon: "skills", title: "Hiệu suất thực sự", desc: "Không có demo ma thuật. Mỗi tính năng đều được kiểm tra trong môi trường thực tế trước khi xuất hiện trong sản phẩm." },
];

const TIMELINE = [
  { date: "Q4 2024", label: "Bắt đầu", desc: "AuRen OS ra đời như một dự án cá nhân — một AI biết cách tự sửa lỗi code." },
  { date: "Q1 2025", label: "OpenClaw Alpha", desc: "Phát hành gateway mã nguồn mở đầu tiên, hỗ trợ multi-model và self-healing loop." },
  { date: "Q3 2025", label: "Cộng đồng", desc: "100 developer đầu tiên tham gia. Skills SDK beta ra mắt." },
  { date: "Q1 2026", label: "AuRenHub", desc: "Marketplace cộng đồng chính thức ra mắt với 200+ skills." },
  { date: "2026+", label: "Tương lai", desc: "AuRen OS trở thành nền tảng AI cá nhân đầu tiên có khả năng tự học và phát triển." },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}`}</style>
      <Navbar />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "48px 20px 80px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <AuRenMascot size={90} animate />
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 14px", lineHeight: 1.1 }}>
            Một AI cá nhân<br />
            <span style={{ color: ACCENT }}>với một linh hồn</span>
          </h1>
          <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8, maxWidth: 460, marginInline: "auto" }}>
            AuRen được xây dựng với niềm tin rằng AI không nên chỉ là công cụ —
            mà là người đồng hành thực sự. Một hệ thống biết bạn, nhớ bạn,
            và tiến hóa cùng bạn.
          </p>
        </div>

        {/* Mission */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "28px 24px", marginBottom: 32, borderLeft: `3px solid ${ACCENT}` }}>
          <div style={{ fontSize: 10, letterSpacing: "0.14em", color: ACCENT, fontWeight: 700, textTransform: "uppercase", marginBottom: 10 }}>Sứ mệnh</div>
          <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
            "Dân chủ hóa trí tuệ nhân tạo — không phải bằng cách làm cho AI đơn giản hơn,
            mà bằng cách làm cho nó đủ thông minh để mọi người có thể dùng theo cách của riêng họ."
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>Giá trị cốt lõi</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 18 }}>
                <div style={{ color: ACCENT, marginBottom: 10 }}><AppIcon name={v.icon} size={24} /></div>
                <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{v.title}</div>
                <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.65 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>Hành trình</h2>
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 2, backgroundColor: `${ACCENT}30`, borderRadius: 2 }} />
            {TIMELINE.map((t, i) => (
              <div key={t.date} style={{ position: "relative", paddingLeft: 22, marginBottom: i < TIMELINE.length - 1 ? 24 : 0 }}>
                <div style={{ position: "absolute", left: 0, top: 4, width: 10, height: 10, borderRadius: "50%", backgroundColor: i === TIMELINE.length - 1 ? DIM2 : ACCENT, border: `2px solid ${BG}` }} />
                <div style={{ fontSize: 10, color: ACCENT, fontWeight: 700, letterSpacing: "0.06em", marginBottom: 3 }}>{t.date} — {t.label}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: DIM2, lineHeight: 1.8 }}>
            · Được xây dựng bởi <span style={{ color: ACCENT, fontWeight: 700 }}>AuRen</span>, một hệ điều hành AI cá nhân với một linh hồn,
            qua AuRenHub & cộng đồng.<br />
            Dự án độc lập, không liên kết với Anthropic.
          </p>
        </div>
      </main>
    </div>
  );
}
