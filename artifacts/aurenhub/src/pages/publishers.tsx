import { useState } from "react";
import Navbar from "@/components/Navbar";
import { PUBLISHERS } from "@/data/catalog";

const BG = "#0f0f0f";
const CARD = "#161616";
const CARD2 = "#262626";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

export default function PublishersPage() {
  const [search, setSearch] = useState("");

  const filtered = PUBLISHERS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.handle.toLowerCase().includes(search.toLowerCase()) ||
    p.bio.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}.pub-card:hover{border-color:rgba(0,207,171,0.25)!important;background:#262626!important}.pub-card{transition:all 0.15s}`}</style>
      <Navbar onSearch={setSearch} />
      <main style={{ padding: "24px 20px 80px", maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 6 }}>Publishers</h1>
        <p style={{ fontSize: 13, color: MUTED, marginBottom: 24 }}>Teams and individuals building for AuRenHub.</p>

        {/* Top publisher banner */}
        <div style={{ backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}20`, borderRadius: 16, padding: "20px", marginBottom: 24, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: ACCENT + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: ACCENT, flexShrink: 0 }}>A</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: TEXT }}>AuRen Labs</span>
              <span style={{ fontSize: 9, backgroundColor: ACCENT, color: BG, borderRadius: 4, padding: "1px 6px", fontWeight: 800 }}>OFFICIAL</span>
            </div>
            <p style={{ fontSize: 12, color: MUTED }}>Official AuRen team. Building the core skill ecosystem.</p>
            <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
              <span style={{ fontSize: 11, color: MUTED }}>8 skills · 3 plugins</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(pub => (
            <div key={pub.id} className="pub-card"
              style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 16px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, cursor: "pointer" }}>
              {/* Avatar */}
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: pub.color + "20", border: `1px solid ${pub.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: pub.color, flexShrink: 0 }}>
                {pub.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{pub.name}</span>
                  {pub.verified && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill={ACCENT}><path d="M9 12l2 2 4-4M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
                  )}
                </div>
                <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.5, marginBottom: 6, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{pub.bio}</p>
                <div style={{ display: "flex", gap: 14 }}>
                  <span style={{ fontSize: 11, color: DIM2 }}>{pub.skills} skills</span>
                  <span style={{ fontSize: 11, color: DIM2 }}>{pub.plugins} plugins</span>
                  <span style={{ fontSize: 11, color: DIM2 }}>{pub.handle}</span>
                </div>
              </div>
              <span style={{ fontSize: 12, color: ACCENT, flexShrink: 0 }}>→</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 32, padding: "24px 20px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: TEXT, marginBottom: 8 }}>Trở thành Publisher</h2>
          <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, marginBottom: 16, maxWidth: 280, margin: "0 auto 16px" }}>
            Xây dựng kỹ năng và plugin cho cộng đồng AuRen. Tiếp cận hàng nghìn người dùng.
          </p>
          <button style={{ padding: "11px 24px", borderRadius: 9, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            Đăng ký Publisher →
          </button>
        </div>
      </main>
    </div>
  );
}
