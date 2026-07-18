import { useLocation, useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import { SKILLS } from "@/data/catalog";
import { AuRenMascot } from "@/components/AuRenMascot";
import { AppIcon } from "@/components/AppIcon";

const BG = "#0f0f0f";
const CARD = "#161616";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

export default function SkillDetailPage() {
  const [, navigate] = useLocation();
  const [, params] = useRoute("/skills/:id");
  const skill = SKILLS.find(s => s.id === params?.id);

  if (!skill) return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, color: TEXT }}>
      <Navbar />
      <AuRenMascot size={64} />
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Skill not found</h1>
      <button onClick={() => navigate("/skills")} style={{ padding: "10px 22px", borderRadius: 8, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>← Back to Skills</button>
    </div>
  );

  const related = SKILLS.filter(s => s.id !== skill.id && s.tags.some(t => skill.tags.includes(t))).slice(0, 3);

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}`}</style>
      <Navbar />
      <main style={{ padding: "24px 20px 80px", maxWidth: 620, margin: "0 auto" }}>
        {/* Back */}
        <button onClick={() => navigate("/skills")} style={{ display: "flex", alignItems: "center", gap: 6, color: MUTED, fontSize: 12, backgroundColor: "transparent", border: "none", cursor: "pointer", marginBottom: 20, padding: 0 }}>
          <span>←</span> Back to Skills
        </button>

        {/* Header */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, backgroundColor: skill.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0, border: `1px solid ${skill.color}25` }}>
            <AppIcon name={skill.iconName ?? "tool"} color={skill.color} size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>{skill.name}</h1>
              {skill.trending && <span style={{ fontSize: 9, backgroundColor: `${ACCENT}18`, color: ACCENT, borderRadius: 4, padding: "2px 7px", fontWeight: 700 }}>TRENDING</span>}
              {skill.featured && <span style={{ fontSize: 9, backgroundColor: "rgba(251,191,36,0.15)", color: "#fbbf24", borderRadius: 4, padding: "2px 7px", fontWeight: 700 }}>FEATURED</span>}
            </div>
            <p style={{ fontSize: 12, color: MUTED }}>{skill.publisher}</p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {[
            { label: "Downloads", val: skill.installs },
            { label: "Rating", val: `★ ${skill.rating}` },
            { label: "Version", val: skill.version || "1.0.0" },
            { label: "Updated", val: skill.updated || "Recently" },
          ].map(stat => (
            <div key={stat.label} style={{ padding: "10px 14px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, textAlign: "center", flex: "1 1 80px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{stat.val}</div>
              <div style={{ fontSize: 9, color: DIM2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Install button */}
        <button style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 20, letterSpacing: "0.02em" }}>
          ↓ Cài đặt Skill
        </button>

        {/* Description */}
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 16px", marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 10 }}>Mô tả</h2>
          <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.75 }}>{skill.longDesc || skill.desc}</p>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 12, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Tags</h2>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {skill.tags.map(t => (
              <span key={t} style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${BORDER}`, color: MUTED, fontSize: 12 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Related skills */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 12, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Related Skills</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {related.map(r => (
                <div key={r.id} onClick={() => navigate(`/skills/${r.id}`)}
                  style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, cursor: "pointer" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: r.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}><AppIcon name={r.iconName ?? "tool"} color={r.color} size={16} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 2 }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: DIM2 }}>{r.publisher} · ↓ {r.installs}</div>
                  </div>
                  <span style={{ fontSize: 12, color: ACCENT }}>→</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
