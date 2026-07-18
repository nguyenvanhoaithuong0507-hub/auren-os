import { useState } from "react";
import Navbar from "@/components/Navbar";
import { PLUGINS } from "@/data/catalog";
import { AuRenMascot } from "@/components/AuRenMascot";
import { AppIcon } from "@/components/AppIcon";

const BG = "#0f0f0f";
const CARD = "#161616";
const BORDER = "rgba(255,255,255,0.06)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM2 = "#6f6f6f";

export default function PluginsPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const ALL_TAGS = Array.from(new Set(PLUGINS.flatMap(p => p.tags))).sort();

  const filtered = PLUGINS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "all" || p.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`*{box-sizing:border-box}input{outline:none}input::placeholder{color:#6f6f6f}.pl-card:hover{border-color:rgba(0,207,171,0.25)!important;background:#262626!important}.pl-card{transition:all 0.15s}`}</style>
      <Navbar onSearch={setSearch} />
      <main style={{ padding: "24px 20px 80px", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>Plugins</h1>
          <span style={{ fontSize: 11, color: MUTED, fontFamily: "monospace" }}>{filtered.length}/{PLUGINS.length}</span>
        </div>
        <p style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>Extend AuRen with one-click plugins from the community.</p>

        {/* Filter */}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 20 }}>
          {["all", ...ALL_TAGS].map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              style={{ padding: "5px 12px", borderRadius: 20, border: `1px solid ${activeTag === tag ? ACCENT : "rgba(255,255,255,0.07)"}`, backgroundColor: activeTag === tag ? `${ACCENT}14` : "transparent", color: activeTag === tag ? ACCENT : MUTED, fontSize: 11, cursor: "pointer", transition: "all 0.15s" }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Featured */}
        {activeTag === "all" && !search && (
          <>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase", marginBottom: 12 }}>FEATURED</div>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 24, scrollbarWidth: "none" }}>
              {PLUGINS.filter(p => p.featured).map(plugin => (
                <div key={plugin.id} style={{ width: 180, flexShrink: 0, padding: "18px 16px", backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}25`, borderRadius: 14, cursor: "pointer" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: plugin.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 10 }}><AppIcon name={plugin.iconName ?? "plugins"} color={plugin.color} size={18} /></div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 5 }}>{plugin.name}</div>
                  <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.5, marginBottom: 10 }}>{plugin.desc}</p>
                  <button style={{ width: "100%", padding: "7px", borderRadius: 6, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Install</button>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase", marginBottom: 12 }}>ALL PLUGINS</div>
          </>
        )}

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {filtered.filter(p => activeTag !== "all" || search || !p.featured).map(plugin => (
            <div key={plugin.id} className="pl-card"
              style={{ padding: "14px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 10, cursor: "pointer" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: plugin.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}><AppIcon name={plugin.iconName ?? "plugins"} color={plugin.color} size={18} /></div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{plugin.name}</div>
                  <div style={{ fontSize: 10, color: DIM2 }}>★ {plugin.rating}</div>
                </div>
              </div>
              <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.5, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{plugin.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, color: DIM2 }}>↓ {plugin.installs}</span>
                <button style={{ padding: "4px 10px", borderRadius: 5, border: `1px solid ${ACCENT}40`, backgroundColor: "transparent", color: ACCENT, fontSize: 10, fontWeight: 700, cursor: "pointer" }}>Install</button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px", color: DIM2 }}>
            <AuRenMascot size={52} />
            <p>No plugins found</p>
          </div>
        )}
      </main>
    </div>
  );
}
