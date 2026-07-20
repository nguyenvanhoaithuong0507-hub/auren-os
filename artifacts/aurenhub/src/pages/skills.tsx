import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { SKILLS } from "@/data/catalog";
import { AuRenMascot } from "@/components/AuRenMascot";
import { AppIcon } from "@/components/AppIcon";

const BG = "#0f0f0f";
const CARD = "#161616";
const CARD2 = "#262626";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

const ALL_TAGS = Array.from(new Set(SKILLS.flatMap(s => s.tags))).sort();

export default function SkillsPage() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [sort, setSort] = useState<"installs" | "rating" | "name">("installs");

  const filtered = SKILLS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchTag = activeTag === "all" || s.tags.includes(activeTag);
    return matchSearch && matchTag;
  }).sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "rating") return b.rating - a.rating;
    return parseInt(b.installs) - parseInt(a.installs);
  });

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}input{outline:none}input::placeholder{color:#6f6f6f}.skill-row:hover{border-color:rgba(0,207,171,0.25)!important;background:#262626!important}.skill-row{transition:all 0.15s}`}</style>
      <Navbar onSearch={setSearch} />
      <main style={{ padding: "24px 20px 80px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Skills</h1>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "monospace" }}>{filtered.length}/{SKILLS.length}</span>
        </div>
        <p style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>Community-built skills for AuRen. Install in seconds.</p>

        {/* Filter tags */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
          {["all", ...ALL_TAGS].map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${activeTag === tag ? ACCENT : "rgba(255,255,255,0.07)"}`, backgroundColor: activeTag === tag ? `${ACCENT}14` : "transparent", color: activeTag === tag ? ACCENT : MUTED, fontSize: 11, cursor: "pointer", transition: "all 0.15s" }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {(["installs", "rating", "name"] as const).map(s => (
            <button key={s} onClick={() => setSort(s)}
              style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${sort === s ? ACCENT : "rgba(255,255,255,0.07)"}`, backgroundColor: sort === s ? `${ACCENT}14` : "transparent", color: sort === s ? ACCENT : MUTED, fontSize: 11, cursor: "pointer", transition: "all 0.15s" }}>
              {s === "installs" ? "Most installed" : s === "rating" ? "Top rated" : "A–Z"}
            </button>
          ))}
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(skill => (
            <div key={skill.id} className="skill-row" onClick={() => navigate(`/skills/${skill.id}`)}
              style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: skill.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, border: `1px solid ${skill.color}18` }}>
                <AppIcon name={skill.iconName ?? "tool"} color={skill.color} size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{skill.name}</span>
                  {skill.trending && <span style={{ fontSize: 9, backgroundColor: `${ACCENT}18`, color: ACCENT, borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>TRENDING</span>}
                  {skill.featured && <span style={{ fontSize: 9, backgroundColor: "rgba(251,191,36,0.15)", color: "#fbbf24", borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>FEATURED</span>}
                </div>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.55, marginBottom: 8, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{skill.desc}</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: DIM2 }}>{skill.publisher}</span>
                  <span style={{ fontSize: 10, color: DIM2 }}>↓ {skill.installs}</span>
                  <span style={{ fontSize: 10, color: "#fbbf24" }}>★ {skill.rating}</span>
                  {skill.tags.slice(0, 2).map(t => (
                    <span key={t} style={{ fontSize: 9, color: DIM2, backgroundColor: "rgba(255,255,255,0.04)", border: `1px solid rgba(255,255,255,0.06)`, padding: "1px 6px", borderRadius: 3 }}>{t}</span>
                  ))}
                </div>
              </div>
              <span style={{ fontSize: 12, color: ACCENT, flexShrink: 0 }}>→</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 20px", color: DIM2 }}>
              <AuRenMascot size={52} />
              <p>No skills found for "{search}"</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
