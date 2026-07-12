import { useState, useRef } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { SKILLS, PLUGINS, SUGGESTION_PILLS } from "@/data/catalog";
import { AuRenMascot, AuRenMark } from "@/components/AuRenMascot";
import { AppIcon } from "@/components/AppIcon";

const BG = "#0f0f0f";
const CARD = "#161616";
const CARD2 = "#262626";
const BORDER = "rgba(255,255,255,0.06)";
const BORDER2 = "rgba(255,255,255,0.09)";
const ACCENT = "#0f62fe";
const TEXT = "#f4f4f4";
const MUTED = "#a8a8a8";
const DIM = "#262626";
const DIM2 = "#6f6f6f";

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ fontSize: 11, color: "#fbbf24" }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#6b7280", marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function SkillCard({ skill, onClick }: { skill: typeof SKILLS[0]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 200, flexShrink: 0, padding: "18px 16px",
        backgroundColor: hovered ? CARD2 : CARD,
        border: `1px solid ${hovered ? BORDER2 : BORDER}`,
        borderRadius: 3, cursor: "pointer",
        transition: "all 0.15s ease",
        transform: hovered ? "translateY(-3px)" : "none",
      }}>
      {/* Icon */}
      <div style={{ width: 44, height: 44, borderRadius: 3, backgroundColor: skill.color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, border: `1px solid ${skill.color}35`, boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.03)` }}>
        <AppIcon name={skill.iconName ?? "tool"} color={skill.color} size={22} />
      </div>
      {/* Name */}
      <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 6, lineHeight: 1.3 }}>{skill.name}</div>
      {/* Desc */}
      <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.55, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{skill.desc}</p>
      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: DIM2 }}>↓ {skill.installs}</span>
        <StarRating rating={skill.rating} />
      </div>
      {/* Publisher */}
      <div style={{ fontSize: 10, color: DIM2, marginTop: 6 }}>{skill.publisher}</div>
    </div>
  );
}

function PluginCard({ plugin }: { plugin: typeof PLUGINS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 180, flexShrink: 0, padding: "16px 14px",
        backgroundColor: hovered ? CARD2 : CARD,
        border: `1px solid ${hovered ? BORDER2 : BORDER}`,
        borderRadius: 3, cursor: "pointer",
        transition: "all 0.15s ease",
        transform: hovered ? "translateY(-3px)" : "none",
      }}>
      <div style={{ width: 38, height: 38, borderRadius: 3, backgroundColor: plugin.color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, border: `1px solid ${plugin.color}35` }}>
        <AppIcon name={plugin.iconName ?? "plugins"} color={plugin.color} size={19} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 5 }}>{plugin.name}</div>
      <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.5, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{plugin.desc}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: DIM2 }}>↓ {plugin.installs}</span>
        <StarRating rating={plugin.rating} />
      </div>
    </div>
  );
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  function scroll(dir: "left" | "right") {
    if (ref.current) ref.current.scrollBy({ left: dir === "left" ? -250 : 250, behavior: "smooth" });
  }
  return (
    <div style={{ position: "relative" }}>
      <div ref={ref} style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}`}</style>
        {children}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

  const featuredSkills = SKILLS.filter(s => s.featured);
  const trendingSkills = SKILLS.filter(s => s.trending && !s.featured);
  const featuredPlugins = PLUGINS.filter(p => p.featured);
  const morePlugins = PLUGINS.filter(p => !p.featured).slice(0, 8);

  return (
    <div style={{ backgroundColor: BG, minHeight: "100dvh", color: TEXT }}>
      <style>{`
        *{box-sizing:border-box}
        input{outline:none}
        input::placeholder{color:#6f6f6f}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes glow{0%,100%{filter:drop-shadow(0 0 12px rgba(0,207,171,0.3))}50%{filter:drop-shadow(0 0 24px rgba(0,207,171,0.6))}}
        ::-webkit-scrollbar{display:none}
        scrollbar-width:none;
        .pill-tag:hover{border-color:${ACCENT}!important;color:${ACCENT}!important}
        .pill-tag{transition:all 0.15s}
      `}</style>

      <Navbar onSearch={setSearch} />

      {/* ─── HERO ─── */}
      <section style={{ padding: "48px 20px 40px", textAlign: "center" }}>
        {/* Mascot — new kawaii design */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <AuRenMascot size={72} animate />
        </div>

        {/* Tag line */}
        <p style={{ fontSize: 11, color: MUTED, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 18, fontWeight: 500 }}>
          ĐƯỢC XÂY DỰNG BỞI CỘNG ĐỒNG.
        </p>

        {/* Big title — teal accent like ClawHub's red */}
        <h1 style={{ fontSize: "clamp(2.6rem,11vw,4rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 18, color: ACCENT }}>
          Trang bị&nbsp;•&nbsp;Cài đặt&nbsp;•&nbsp;<br />Khai phóng.
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "clamp(14px,3.5vw,16px)", color: MUTED, lineHeight: 1.7, maxWidth: 340, margin: "0 auto 28px" }}>
          Công cụ được hàng nghìn người xây dựng, sẵn sàng trong một tìm kiếm.
        </p>

        {/* Big search bar */}
        <div style={{ maxWidth: 540, margin: "0 auto 16px", display: "flex", borderRadius: 3, overflow: "hidden", border: `1.5px solid ${ACCENT}40`, backgroundColor: CARD }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DIM2} strokeWidth="2" style={{ flexShrink: 0, marginRight: 10 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="What are you looking for?"
              style={{ flex: 1, padding: "14px 0", backgroundColor: "transparent", border: "none", color: TEXT, fontSize: 14 }}
            />
          </div>
          <button style={{ padding: "0 20px", backgroundColor: ACCENT, color: BG, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            Tìm kiếm
          </button>
        </div>

        {/* Suggestion pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", maxWidth: 480, margin: "0 auto" }}>
          {SUGGESTION_PILLS.map(pill => (
            <button key={pill} className="pill-tag" onClick={() => setSearch(pill)}
              style={{ padding: "5px 12px", borderRadius: 2, border: `1px solid ${BORDER2}`, backgroundColor: "transparent", color: MUTED, fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}>
              {pill}
            </button>
          ))}
        </div>
      </section>

      {/* ─── FEATURED SKILLS ─── */}
      <section style={{ padding: "0 20px 36px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase" }}>FEATURED SKILLS</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span onClick={() => navigate("/skills")} style={{ fontSize: 12, color: ACCENT, cursor: "pointer" }}>View all →</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {featuredSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} onClick={() => navigate(`/skills/${skill.id}`)} />
          ))}
        </div>
      </section>

      {/* ─── TRENDING SKILLS ─── */}
      <section style={{ padding: "0 20px 36px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase" }}>TRENDING</span>
            <span style={{ fontSize: 9, backgroundColor: `${ACCENT}20`, color: ACCENT, borderRadius: 4, padding: "2px 6px", fontWeight: 700 }}>HOT</span>
          </div>
          <span onClick={() => navigate("/skills")} style={{ fontSize: 12, color: ACCENT, cursor: "pointer" }}>View all →</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {trendingSkills.map(skill => (
            <SkillCard key={skill.id} skill={skill} onClick={() => navigate(`/skills/${skill.id}`)} />
          ))}
          <div style={{ width: 10, flexShrink: 0 }} />
        </div>
      </section>

      {/* ─── FEATURED PLUGINS ─── */}
      <section style={{ padding: "0 20px 36px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase" }}>FEATURED PLUGINS</span>
          <span onClick={() => navigate("/plugins")} style={{ fontSize: 12, color: ACCENT, cursor: "pointer" }}>View all →</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {featuredPlugins.map(plugin => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
      </section>

      {/* ─── MORE PLUGINS ─── */}
      <section style={{ padding: "0 20px 36px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase", marginBottom: 14 }}>
          MORE PLUGINS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {morePlugins.map(plugin => (
            <div key={plugin.id} style={{ padding: "14px", backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 3, display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
              <div style={{ width: 34, height: 34, borderRadius: 3, backgroundColor: plugin.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <AppIcon name={plugin.iconName ?? "plugins"} color={plugin.color} size={17} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 2 }}>{plugin.name}</div>
                <div style={{ fontSize: 10, color: DIM2 }}>↓ {plugin.installs}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STATS BANNER ─── */}
      <section style={{ margin: "0 20px 36px", backgroundColor: `${ACCENT}08`, border: `1px solid ${ACCENT}20`, borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { val: `${SKILLS.length}+`, label: "Skills" },
            { val: `${PLUGINS.length}+`, label: "Plugins" },
            { val: "8", label: "Publishers" },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, color: ACCENT, letterSpacing: "-0.04em" }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: "0 20px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: TEXT, marginBottom: 10, letterSpacing: "-0.02em" }}>
          Xây dựng kỹ năng của riêng bạn
        </h2>
        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 20, maxWidth: 320, marginInline: "auto" }}>
          Đóng góp cho cộng đồng AuRenHub. Kỹ năng của bạn có thể đạt tới hàng ngàn người dùng.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ padding: "12px 24px", borderRadius: 9, border: "none", backgroundColor: ACCENT, color: BG, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            Bắt đầu xây dựng →
          </button>
          <button style={{ padding: "12px 24px", borderRadius: 9, border: `1px solid ${BORDER}`, backgroundColor: "transparent", color: TEXT, fontSize: 13, cursor: "pointer" }}>
            Đọc tài liệu
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "24px 20px 40px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", marginBottom: 18 }}>
          {[
            { label: "Skills",       href: "/skills" },
            { label: "Plugins",      href: "/plugins" },
            { label: "Publishers",   href: "/publishers" },
            { label: "Collections",  href: "/collections" },
            { label: "Showcase",     href: "/showcase" },
            { label: "Blog",         href: "/blog" },
            { label: "Changelog",    href: "/changelog" },
            { label: "About",        href: "/about" },
            { label: "Docs",         href: "/docs" },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              style={{ fontSize: 11, color: ACCENT, padding: "2px 8px", textDecoration: "none", opacity: 0.85 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}>
              {label}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 11, color: DIM2, lineHeight: 1.9 }}>
          · Được xây dựng bởi <span style={{ color: TEXT, fontWeight: 600 }}>AuRen</span>, một hệ điều hành AI cá nhân với một linh hồn,
          qua <span style={{ color: ACCENT }}>AuRenHub</span> &amp; cộng đồng.<br />
          <span style={{ color: DIM2 }}>Dự án độc lập, không liên kết với Anthropic.</span>
          <span style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 6 }}><AuRenMark size={13} /></span>
        </p>
      </footer>
    </div>
  );
}
